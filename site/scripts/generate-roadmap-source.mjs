import fs from "node:fs";
import path from "node:path";
import { parse, stringify } from "yaml";

const root = process.cwd();
const sourceRootCandidates = [
  path.join(root, "roadmap-source"),
  path.join(root, "..", "roadmap-source"),
];
const sourceRoot = sourceRootCandidates.find((candidate) => fs.existsSync(candidate)) ?? sourceRootCandidates[0];
const inputRoot = path.join(sourceRoot, "input");
const generatedRoot = path.join(sourceRoot, "generated");

const inputFolders = {
  organizations: path.join(inputRoot, "organizations"),
  releases: path.join(inputRoot, "releases"),
  roadmapItems: path.join(inputRoot, "roadmap-items"),
};

function parseFrontmatter(filePath) {
  const raw = fs.readFileSync(filePath, "utf8");
  const match = raw.match(/^---\r?\n([\s\S]*?)\r?\n---\r?\n?([\s\S]*)$/);

  if (!match) {
    throw new Error(`${path.relative(sourceRoot, filePath)} is missing YAML frontmatter`);
  }

  return {
    frontmatter: parse(match[1]) ?? {},
    sections: parseSections(match[2]),
  };
}

function parseSections(body) {
  const sections = new Map();
  let currentTitle;
  let currentLines = [];

  function commit() {
    if (currentTitle) {
      sections.set(currentTitle.toLowerCase(), currentLines.join("\n").trim());
    }
  }

  for (const line of body.split(/\r?\n/)) {
    const heading = line.match(/^##\s+(.+?)\s*$/);

    if (heading) {
      commit();
      currentTitle = heading[1].trim();
      currentLines = [];
      continue;
    }

    if (currentTitle) {
      currentLines.push(line);
    }
  }

  commit();
  return sections;
}

function section(markdown, name) {
  return markdown.sections.get(name.toLowerCase())?.trim();
}

function scalar(value) {
  if (value === undefined || value === null || value === "") {
    return undefined;
  }

  if (value instanceof Date) {
    return value.toISOString().slice(0, 10);
  }

  return String(value);
}

function array(value) {
  if (value === undefined || value === null) {
    return [];
  }

  if (Array.isArray(value)) {
    return value.map((item) => scalar(item)).filter(Boolean);
  }

  return [scalar(value)].filter(Boolean);
}

function bool(value) {
  return value === undefined ? undefined : Boolean(value);
}

function listItems(text) {
  if (!text) {
    return [];
  }

  return text
    .split(/\r?\n/)
    .map((line) => line.trim())
    .filter((line) => line.startsWith("- "))
    .map((line) => line.slice(2).trim())
    .filter(Boolean);
}

function links(text) {
  return listItems(text)
    .map((item) => {
      const markdownLink = item.match(/^\[(.+?)\]\((https?:\/\/.+?)\)$/);
      if (markdownLink) {
        return { label: markdownLink[1].trim(), url: markdownLink[2].trim() };
      }

      const labelAndUrl = item.match(/^(.+?):\s*(https?:\/\/.+?)$/);
      if (labelAndUrl) {
        return { label: labelAndUrl[1].trim(), url: labelAndUrl[2].trim() };
      }

      return undefined;
    })
    .filter(Boolean);
}

function compact(object) {
  return Object.fromEntries(
    Object.entries(object).filter(([, value]) => {
      if (value === undefined || value === null || value === "") {
        return false;
      }

      if (Array.isArray(value) && value.length === 0) {
        return false;
      }

      return true;
    }),
  );
}

function readMarkdownFolder(folder) {
  if (!fs.existsSync(folder)) {
    return [];
  }

  return fs
    .readdirSync(folder)
    .filter((fileName) => fileName.endsWith(".md"))
    .sort((a, b) => a.localeCompare(b))
    .map((fileName) => ({
      fileName,
      filePath: path.join(folder, fileName),
      markdown: parseFrontmatter(path.join(folder, fileName)),
    }));
}

function buildOrganizations() {
  return readMarkdownFolder(inputFolders.organizations).map(({ markdown }) => {
    const frontmatter = markdown.frontmatter;

    return compact({
      id: scalar(frontmatter.id),
      name: scalar(frontmatter.name),
      shortName: scalar(frontmatter.shortName),
      color: scalar(frontmatter.color),
      logo: scalar(frontmatter.logo),
      website: scalar(frontmatter.website),
      blurb: section(markdown, "Blurb") ?? scalar(frontmatter.blurb),
    });
  });
}

function buildReleases() {
  return readMarkdownFolder(inputFolders.releases).map(({ markdown }) => {
    const frontmatter = markdown.frontmatter;

    return compact({
      id: scalar(frontmatter.id),
      version: scalar(frontmatter.version),
      status: scalar(frontmatter.status),
      releaseType: scalar(frontmatter.releaseType),
      tagName: scalar(frontmatter.tagName),
      date: scalar(frontmatter.date),
      summary: section(markdown, "Summary") ?? scalar(frontmatter.summary),
      labels: array(frontmatter.labels),
      highlights: listItems(section(markdown, "Highlights")),
      sourceUrl: scalar(frontmatter.sourceUrl),
      support: section(markdown, "Support") ?? scalar(frontmatter.support),
      includedRoadmapItems: array(frontmatter.includedRoadmapItems),
      releaseNotesUrl: scalar(frontmatter.releaseNotesUrl),
      verificationSummary: section(markdown, "Verification") ?? scalar(frontmatter.verificationSummary),
    });
  });
}

function buildRoadmapItems() {
  return readMarkdownFolder(inputFolders.roadmapItems).map(({ markdown }) => {
    const frontmatter = markdown.frontmatter;

    return compact({
      id: scalar(frontmatter.id),
      title: scalar(frontmatter.title),
      summary: section(markdown, "Summary") ?? scalar(frontmatter.summary),
      description: section(markdown, "Description") ?? scalar(frontmatter.description),
      theme: scalar(frontmatter.theme),
      status: scalar(frontmatter.status),
      proposingOrgs: array(frontmatter.proposingOrgs),
      owner: scalar(frontmatter.owner),
      targetWindow: scalar(frontmatter.targetWindow),
      targetRelease: scalar(frontmatter.targetRelease),
      tags: array(frontmatter.tags),
      userValue: section(markdown, "User value") ?? scalar(frontmatter.userValue),
      links: links(section(markdown, "Links")),
      lastUpdated: scalar(frontmatter.lastUpdated),
      featured: bool(frontmatter.featured),
      showOnOrganizations: bool(frontmatter.showOnOrganizations),
    });
  });
}

function writeYaml(fileName, value) {
  fs.mkdirSync(generatedRoot, { recursive: true });
  const header = "# Generated from roadmap-source/input/*.md. Do not edit by hand.\n";
  fs.writeFileSync(
    path.join(generatedRoot, fileName),
    header +
      stringify(value, {
        lineWidth: 100,
        singleQuote: false,
      }),
  );
}

const outputs = {
  "organizations.yml": buildOrganizations(),
  "releases.yml": buildReleases(),
  "roadmap-items.yml": buildRoadmapItems(),
};

for (const [fileName, value] of Object.entries(outputs)) {
  writeYaml(fileName, value);
}

console.log(
  [
    "Generated roadmap source:",
    `${outputs["organizations.yml"].length} organizations`,
    `${outputs["releases.yml"].length} releases`,
    `${outputs["roadmap-items.yml"].length} roadmap items`,
  ].join(" "),
);
