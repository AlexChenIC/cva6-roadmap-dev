import fs from "node:fs";
import path from "node:path";
import { parse } from "yaml";
import type {
  Organization,
  PartnerNeed,
  Pillar,
  Project,
  Release,
  RoadmapItem,
  RoadmapStrategy,
} from "@/lib/types";

const sourceRoot = path.join(process.cwd(), "..", "roadmap-source");
const generatedFiles = new Set(["organizations.yml", "partner-needs.yml", "releases.yml", "roadmap-items.yml"]);

function readYaml<T>(fileName: string): T {
  const generatedPath = path.join(sourceRoot, "generated", fileName);
  const filePath = generatedFiles.has(fileName) && fs.existsSync(generatedPath)
    ? generatedPath
    : path.join(sourceRoot, fileName);

  return parse(fs.readFileSync(filePath, "utf8")) as T;
}

export const roadmapSource = {
  strategy: readYaml<RoadmapStrategy>("strategy.yml"),
  organizations: readYaml<Organization[]>("organizations.yml"),
  pillars: readYaml<Pillar[]>("pillars.yml"),
  projects: readYaml<Project[]>("projects.yml"),
  releases: readYaml<Release[]>("releases.yml"),
  roadmapItems: readYaml<RoadmapItem[]>("roadmap-items.yml"),
  partnerNeeds: readYaml<PartnerNeed[]>("partner-needs.yml"),
};
