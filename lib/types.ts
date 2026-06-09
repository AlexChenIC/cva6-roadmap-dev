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
}

export interface Release {
  id: string;
  version: string;
  status: "released" | "planned";
  date?: string;
  summary?: string;
}

export interface Pillar {
  id: string;
  title: string;
  description: string;
  icon: string;
}
