export type Lane = "available" | "in-progress" | "planned" | "future";

export type LifecycleStatus =
  | "Released"
  | "In Progress"
  | "Verification"
  | "Planned"
  | "Proposed"
  | "Idea"
  | "Deferred";

export type Theme =
  | "Architecture & ISA"
  | "Security"
  | "Safety & Certification"
  | "Verification"
  | "Performance"
  | "Tooling & Ecosystem";

export interface Organization {
  id: string;
  name: string;
  shortName: string;
  color: string;
  logo?: string;
  tags?: string[];
  website?: string;
  blurb?: string;
}

export interface RoadmapItem {
  id: string;
  title: string;
  summary: string;
  description?: string;
  theme: Theme;
  status: LifecycleStatus;
  proposingOrgs: string[];
  owner?: string;
  targetWindow?: string;
  targetRelease?: string;
  tags: string[];
  userValue?: string;
  links?: { label: string; url: string }[];
  lastUpdated: string;
  featured?: boolean;
  showOnOrganizations?: boolean;
}

export interface RoadmapStrategy {
  organizationName: string;
  roadmapName: string;
  roadmapCycle: string;
  visionSummary: string;
  missionSummary: string;
  strategicFocus: Theme[];
  decisionCadence: string;
  sourcePolicy: string;
}

export interface Release {
  id: string;
  version: string;
  status: "released" | "planned";
  releaseType?: "stable" | "preview" | "planned";
  tagName?: string;
  date?: string;
  summary?: string;
  labels?: string[];
  highlights?: string[];
  sourceUrl?: string;
  support?: string;
  includedRoadmapItems?: string[];
  releaseNotesUrl?: string;
  verificationSummary?: string;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export interface Project {
  id: string;
  name: string;
  slug: string;
  summary: string;
  description: string;
  maturity: string;
  status: string;
  owner: string;
  repositoryUrl: string;
  docsUrl?: string;
  participatingOrgs: string[];
  strategicPillars: Theme[];
  defaultBranch: string;
  nextRelease?: string;
}
