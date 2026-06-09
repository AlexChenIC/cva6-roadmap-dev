import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";

const root = process.cwd();
const sourceRoot = path.join(root, "roadmap-source");

const themes = new Set([
  "Architecture & ISA",
  "Security",
  "Safety & Certification",
  "Verification",
  "Performance",
  "Tooling & Ecosystem",
]);

const lifecycleStatuses = new Set([
  "Released",
  "In Progress",
  "Verification",
  "Planned",
  "Proposed",
  "Idea",
  "Deferred",
]);

const releaseStatuses = new Set(["released", "planned"]);
const releaseTypes = new Set(["stable", "preview", "planned"]);
const partnerStatuses = new Set(["candidate", "under-review", "accepted", "declined"]);
const partnerSourceTypes = new Set(["meeting-synthesis", "partner-proposal", "maintainer-note"]);

const errors = [];

function readYaml(fileName) {
  const filePath = path.join(sourceRoot, fileName);

  if (!fs.existsSync(filePath)) {
    errors.push(`${fileName}: missing file`);
    return undefined;
  }

  try {
    return parse(fs.readFileSync(filePath, "utf8"));
  } catch (error) {
    errors.push(`${fileName}: cannot parse YAML (${error.message})`);
    return undefined;
  }
}

function assert(condition, message) {
  if (!condition) {
    errors.push(message);
  }
}

function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function isString(value) {
  return typeof value === "string" && value.trim().length > 0;
}

function isStringArray(value) {
  return Array.isArray(value) && value.every(isString);
}

function isValidId(value) {
  return isString(value) && /^[a-z0-9][a-z0-9-]*$/.test(value);
}

function isValidDate(value) {
  return isString(value) && /^\d{4}-\d{2}-\d{2}$/.test(value);
}

function isValidUrl(value) {
  if (!isString(value)) {
    return false;
  }

  try {
    const parsed = new URL(value);
    return parsed.protocol === "https:" || parsed.protocol === "http:";
  } catch {
    return false;
  }
}

function uniqueIds(items, label) {
  const ids = new Set();

  for (const item of items) {
    if (!isValidId(item?.id)) {
      errors.push(`${label}: invalid id "${item?.id ?? ""}"`);
      continue;
    }

    if (ids.has(item.id)) {
      errors.push(`${label}: duplicate id "${item.id}"`);
    }

    ids.add(item.id);
  }

  return ids;
}

function validateLinks(links, label) {
  if (links === undefined) {
    return;
  }

  assert(Array.isArray(links), `${label}: links/evidence must be an array`);
  if (!Array.isArray(links)) {
    return;
  }

  links.forEach((link, index) => {
    assert(isObject(link), `${label}: link ${index} must be an object`);
    assert(isString(link?.label), `${label}: link ${index} missing label`);
    assert(isValidUrl(link?.url), `${label}: link ${index} has invalid url`);
  });
}

const strategy = readYaml("strategy.yml");
const organizations = readYaml("organizations.yml") ?? [];
const pillars = readYaml("pillars.yml") ?? [];
const projects = readYaml("projects.yml") ?? [];
const releases = readYaml("releases.yml") ?? [];
const roadmapItems = readYaml("roadmap-items.yml") ?? [];
const partnerNeeds = readYaml("partner-needs.yml") ?? [];

assert(isObject(strategy), "strategy.yml: root must be an object");
assert(Array.isArray(organizations), "organizations.yml: root must be an array");
assert(Array.isArray(pillars), "pillars.yml: root must be an array");
assert(Array.isArray(projects), "projects.yml: root must be an array");
assert(Array.isArray(releases), "releases.yml: root must be an array");
assert(Array.isArray(roadmapItems), "roadmap-items.yml: root must be an array");
assert(Array.isArray(partnerNeeds), "partner-needs.yml: root must be an array");

const organizationIds = uniqueIds(Array.isArray(organizations) ? organizations : [], "organizations.yml");
const pillarIds = uniqueIds(Array.isArray(pillars) ? pillars : [], "pillars.yml");
const projectIds = uniqueIds(Array.isArray(projects) ? projects : [], "projects.yml");
const releaseIds = uniqueIds(Array.isArray(releases) ? releases : [], "releases.yml");
const releaseVersions = new Set(releases.map((release) => release.version).filter(isString));
const roadmapItemIds = uniqueIds(Array.isArray(roadmapItems) ? roadmapItems : [], "roadmap-items.yml");
uniqueIds(Array.isArray(partnerNeeds) ? partnerNeeds : [], "partner-needs.yml");

if (isObject(strategy)) {
  assert(isString(strategy.organizationName), "strategy.yml: organizationName is required");
  assert(isString(strategy.roadmapName), "strategy.yml: roadmapName is required");
  assert(isString(strategy.roadmapCycle), "strategy.yml: roadmapCycle is required");
  assert(isString(strategy.visionSummary), "strategy.yml: visionSummary is required");
  assert(isString(strategy.missionSummary), "strategy.yml: missionSummary is required");
  assert(isString(strategy.decisionCadence), "strategy.yml: decisionCadence is required");
  assert(isString(strategy.sourcePolicy), "strategy.yml: sourcePolicy is required");
  assert(isStringArray(strategy.strategicFocus), "strategy.yml: strategicFocus must be a string array");
  (strategy.strategicFocus ?? []).forEach((theme) => {
    assert(themes.has(theme), `strategy.yml: unknown strategicFocus "${theme}"`);
  });
}

organizations.forEach((org) => {
  assert(isString(org.name), `organizations.yml:${org.id}: name is required`);
  assert(isString(org.shortName), `organizations.yml:${org.id}: shortName is required`);
  assert(isString(org.color) && /^#[0-9A-Fa-f]{6}$/.test(org.color), `organizations.yml:${org.id}: color must be hex`);
  if (org.website !== undefined) {
    assert(isValidUrl(org.website), `organizations.yml:${org.id}: website is invalid`);
  }
});

pillars.forEach((pillar) => {
  assert(isString(pillar.title), `pillars.yml:${pillar.id}: title is required`);
  assert(themes.has(pillar.title), `pillars.yml:${pillar.id}: title is not an allowed theme`);
  assert(isString(pillar.icon), `pillars.yml:${pillar.id}: icon is required`);
  assert(isString(pillar.description), `pillars.yml:${pillar.id}: description is required`);
});

projects.forEach((project) => {
  assert(isString(project.name), `projects.yml:${project.id}: name is required`);
  assert(isValidId(project.slug), `projects.yml:${project.id}: slug must be URL-safe`);
  assert(isString(project.summary), `projects.yml:${project.id}: summary is required`);
  assert(isString(project.description), `projects.yml:${project.id}: description is required`);
  assert(isString(project.owner), `projects.yml:${project.id}: owner is required`);
  assert(isValidUrl(project.repositoryUrl), `projects.yml:${project.id}: repositoryUrl is invalid`);
  if (project.docsUrl !== undefined) {
    assert(isValidUrl(project.docsUrl), `projects.yml:${project.id}: docsUrl is invalid`);
  }
  assert(isStringArray(project.participatingOrgs), `projects.yml:${project.id}: participatingOrgs must be strings`);
  (project.participatingOrgs ?? []).forEach((orgId) => {
    assert(organizationIds.has(orgId), `projects.yml:${project.id}: unknown organization "${orgId}"`);
  });
  assert(isStringArray(project.strategicPillars), `projects.yml:${project.id}: strategicPillars must be strings`);
  (project.strategicPillars ?? []).forEach((theme) => {
    assert(themes.has(theme), `projects.yml:${project.id}: unknown strategic pillar "${theme}"`);
  });
});

roadmapItems.forEach((item) => {
  assert(isString(item.title), `roadmap-items.yml:${item.id}: title is required`);
  assert(isString(item.summary), `roadmap-items.yml:${item.id}: summary is required`);
  assert(themes.has(item.theme), `roadmap-items.yml:${item.id}: unknown theme "${item.theme}"`);
  assert(lifecycleStatuses.has(item.status), `roadmap-items.yml:${item.id}: unknown status "${item.status}"`);
  assert(isStringArray(item.proposingOrgs), `roadmap-items.yml:${item.id}: proposingOrgs must be strings`);
  (item.proposingOrgs ?? []).forEach((orgId) => {
    assert(organizationIds.has(orgId), `roadmap-items.yml:${item.id}: unknown organization "${orgId}"`);
  });
  assert(isString(item.owner), `roadmap-items.yml:${item.id}: owner is required`);
  assert(isStringArray(item.tags), `roadmap-items.yml:${item.id}: tags must be strings`);
  assert(isValidDate(item.lastUpdated), `roadmap-items.yml:${item.id}: lastUpdated must be YYYY-MM-DD`);
  if (item.targetRelease !== undefined) {
    assert(releaseVersions.has(item.targetRelease), `roadmap-items.yml:${item.id}: unknown targetRelease "${item.targetRelease}"`);
  }
  validateLinks(item.links, `roadmap-items.yml:${item.id}`);
});

releases.forEach((release) => {
  assert(isString(release.version), `releases.yml:${release.id}: version is required`);
  assert(releaseStatuses.has(release.status), `releases.yml:${release.id}: unknown status "${release.status}"`);
  if (release.releaseType !== undefined) {
    assert(releaseTypes.has(release.releaseType), `releases.yml:${release.id}: unknown releaseType "${release.releaseType}"`);
  }
  if (release.releaseNotesUrl !== undefined) {
    assert(isValidUrl(release.releaseNotesUrl), `releases.yml:${release.id}: releaseNotesUrl is invalid`);
  }
  assert(
    release.includedRoadmapItems === undefined || isStringArray(release.includedRoadmapItems),
    `releases.yml:${release.id}: includedRoadmapItems must be strings`,
  );
  (release.includedRoadmapItems ?? []).forEach((itemId) => {
    assert(roadmapItemIds.has(itemId), `releases.yml:${release.id}: unknown roadmap item "${itemId}"`);
  });
});

partnerNeeds.forEach((need) => {
  assert(isString(need.title), `partner-needs.yml:${need.id}: title is required`);
  assert(isString(need.summary), `partner-needs.yml:${need.id}: summary is required`);
  assert(partnerSourceTypes.has(need.sourceType), `partner-needs.yml:${need.id}: unknown sourceType "${need.sourceType}"`);
  assert(partnerStatuses.has(need.status), `partner-needs.yml:${need.id}: unknown status "${need.status}"`);
  assert(isStringArray(need.proposingOrgs), `partner-needs.yml:${need.id}: proposingOrgs must be strings`);
  (need.proposingOrgs ?? []).forEach((orgId) => {
    assert(organizationIds.has(orgId), `partner-needs.yml:${need.id}: unknown organization "${orgId}"`);
  });
  assert(
    isStringArray(need.relatedRoadmapItems),
    `partner-needs.yml:${need.id}: relatedRoadmapItems must be strings`,
  );
  (need.relatedRoadmapItems ?? []).forEach((itemId) => {
    assert(roadmapItemIds.has(itemId), `partner-needs.yml:${need.id}: unknown roadmap item "${itemId}"`);
  });
  assert(
    isStringArray(need.requestedCapabilities) && need.requestedCapabilities.length > 0,
    `partner-needs.yml:${need.id}: requestedCapabilities must not be empty`,
  );
  validateLinks(need.evidence, `partner-needs.yml:${need.id}`);
});

if (errors.length > 0) {
  console.error("Roadmap source validation failed:");
  errors.forEach((error) => console.error(`- ${error}`));
  process.exit(1);
}

console.log(
  [
    "Roadmap source validation passed:",
    `${organizationIds.size} organizations`,
    `${pillarIds.size} pillars`,
    `${projectIds.size} projects`,
    `${roadmapItemIds.size} roadmap items`,
    `${releaseIds.size} releases`,
    `${partnerNeeds.length} partner needs`,
  ].join(" "),
);
