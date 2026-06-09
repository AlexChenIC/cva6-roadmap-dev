# 开源组织 Roadmap Protocol 信息架构设计规范

## 文档目的

本文档定义一套适合开源组织使用的 Roadmap Protocol 信息架构与数据设计规范，目标是支持多个项目方长期共同维护 roadmap，并向公众稳定、清晰地展示组织级目标、项目级计划、功能级进展与分支级 feature 演进。[cite:32][cite:59][cite:51]

该规范强调三件事：第一，roadmap 必须对外透明，但不能退化成杂乱的 issue 列表；第二，roadmap 必须支持多项目、多组织、多层级维护；第三，roadmap 必须同时服务公众理解、贡献者参与和项目治理。[cite:32][cite:59][cite:54]

## 参考的外部源

### 1. OpenProject Public Roadmap

- URL: <https://www.openproject.org/roadmap/>
- 价值：公开展示 recently released、currently working on、planning topics，并强调 roadmap 是面向社区透明发布的公共界面。[cite:32]
- 借鉴点：适合组织级 roadmap 首页；适合展示高层主题、状态分层和时间相关信息。[cite:32]

### 2. OpenProject Roadmap User Guide

- URL: <https://www.openproject.org/docs/user-guide/roadmap/>
- 价值：说明 roadmap 是按 version 聚合 work packages 的 overview，并能展示每个 version 的进度与状态。[cite:52]
- 借鉴点：适合做 release-oriented roadmap 视图；适合把 roadmap item 与 version、progress、work package 关联。[cite:52]

### 3. CNCF Contributors: Roadmaps as a way to encourage contributions

- URL: <https://contribute.cncf.io/projects/best-practices/community/contributor-growth/open-source-roadmaps/>
- 价值：明确提出 roadmap 应发布到项目 repo，并可帮助吸引贡献者、保留贡献者、暴露进行中的工作和计划中的工作。[cite:59]
- 借鉴点：适合 roadmap protocol 的协作原则；适合要求 roadmap item 带 owner、状态、入口链接与贡献入口。[cite:59]

### 4. Rust Project Goals

- URL: <https://rust-lang.github.io/rust-project-goals/2026/index.html>
- 价值：Rust 将 goals、roadmaps、point of contact、tracking issue、task owners 和 regular updates 连接起来，形成结构化公开计划体系。[cite:51]
- 借鉴点：适合组织级 initiative 与项目级 roadmap 的绑定；适合引入 point of contact、tracking issue、task owner 与 updates 机制。[cite:51]

### 5. Rust Foundation Strategic Plan

- URL: <https://rustfoundation.org/strategic-plan/>
- 价值：展示组织级 vision、mission 与 multi-year pillars，说明长期战略目标不应只由工程 issue 拼装而成。[cite:54]
- 借鉴点：适合把 roadmap 分成 strategic pillar、program、project、feature 多层结构。[cite:54]

### 6. OpenProject Blog: Roadmap 2024

- URL: <https://www.openproject.org/blog/roadmap-2024/>
- 价值：强调为了提高透明度与可发现性，在社区 overview 页中加入 roadmap widget。[cite:47]
- 借鉴点：适合首页加入 roadmap highlights widget，而不是要求用户总是进入完整 roadmap 页面。[cite:47]

## 设计目标

Roadmap Protocol 应满足以下目标：

- 让公众在几分钟内理解组织的年度目标、主要主题、重要项目和即将发布内容。[cite:32][cite:54]
- 让各项目方能以统一格式提交和维护 roadmap item，而不是各写各的自由文本。[cite:59][cite:51]
- 让 feature 可以挂接到 project、sub-branch、release、verification 和 owner，形成可追踪结构。[cite:52][cite:51]
- 让 roadmap 同时支持高层展示与细节下钻，避免首页过载或项目详情失真。[cite:32][cite:47]

## 信息架构总览

建议采用四层信息架构：

1. **Organization / Strategy Layer**：组织愿景、年度重点、战略支柱、重点 program。[cite:54]
2. **Project Layer**：各开源项目或子项目的 roadmap 摘要、状态和 owner。[cite:32][cite:59]
3. **Feature Layer**：项目内 feature、epic、capability、sub-branch feature 的结构化目录。[cite:51][cite:52]
4. **Execution Layer**：issue、PR、spec、verification result、release milestone、decision record 等执行证据。[cite:51][cite:59]

这四层的核心原则是“上层表达方向，下层承载证据”。公众默认看到 Strategy / Project / Feature 摘要，贡献者和维护者再按需进入 Execution Layer。[cite:32][cite:59]

## 顶层页面结构

建议的顶层导航如下：

- Home
- Roadmap
- Projects
- Features
- Releases
- Governance
- Contributors
- Updates / Changelog

这种结构兼顾组织展示、项目浏览、功能下钻和治理透明；其中 Roadmap 是对外核心入口，而 Projects 与 Features 分别承担“项目视图”和“能力视图”。[cite:32][cite:54][cite:59]

## 页面模块清单

### 1. Home

#### 目标
首页用于向社会公众快速表达组织的方向、重点计划和当前状态，不承载全部细节。[cite:47][cite:54]

#### 页面模块
- Hero / Overview：组织愿景、年度主题、当前 roadmap 周期。[cite:54]
- Strategic Pillars：3-6 个战略重点卡片，如 Security、Safety、Verification、Tooling、Ecosystem。[cite:54]
- Roadmap Highlights Widget：近期已完成、进行中、即将开始的重点 roadmap item。[cite:47][cite:32]
- Project Portfolio Snapshot：项目卡片列表，展示每个项目的状态、owner、近期重点。[cite:32]
- Upcoming Releases：未来 1-3 个发布窗口。[cite:52]
- Contribution CTA：如何参与、如何提案、如何跟踪变更。[cite:59]

#### 字段设计
- organization_name
- roadmap_cycle
- vision_summary
- mission_summary
- strategic_pillars[]
- highlighted_roadmap_items[]
- highlighted_projects[]
- upcoming_releases[]
- contribution_entry_links[]

### 2. Roadmap

#### 目标
Roadmap 页面是对外核心页面，负责表达“组织准备做什么、为什么做、由谁负责、预计何时发生”。[cite:32][cite:51]

#### 推荐视图
- Timeline View：按 quarter / half / year 展示。[cite:32]
- Theme View：按 strategic pillar / capability 分类展示。[cite:54]
- Status Board View：按 Proposed / Planned / In Progress / Verification / Released 展示。[cite:59]
- Hierarchy View：按 Organization > Project > Branch > Feature 展示。[cite:51]

#### 页面模块
- Filter Bar：按 project、theme、status、release、organization、branch 过滤。
- Roadmap Summary Bar：item 总数、进行中数量、即将发布数量、风险项数量。
- Roadmap Item List / Timeline / Board。
- Item Detail Drawer：展示 item 详情、依赖、证据、更新记录。

#### 字段设计：RoadmapItem
- roadmap_id
- title
- summary
- description
- strategic_pillar
- theme
- project_id
- subproject_id
- branch_id
- parent_item_id
- item_type（initiative / epic / feature / milestone）
- status
- priority
- target_window
- target_release
- owner_id
- participating_orgs[]
- point_of_contact
- dependencies[]
- related_features[]
- related_releases[]
- related_specs[]
- related_issues[]
- related_prs[]
- related_verification_items[]
- community_relevance
- public_notes
- last_updated_at
- update_frequency

### 3. Projects

#### 目标
Projects 页面负责展示“有哪些项目”以及“每个项目当前往哪里走”，避免 roadmap 全部堆在一个总列表中。[cite:32][cite:59]

#### 页面模块
- Project Directory：项目卡片网格或列表。
- Project Filters：按主题、成熟度、活跃状态、组织筛选。
- Project Detail Page：项目简介、owners、roadmap highlights、feature map、release plan。[cite:32]

#### 字段设计：Project
- project_id
- project_name
- slug
- summary
- long_description
- maturity_level
- status
- strategic_pillars[]
- maintainers[]
- participating_orgs[]
- repositories[]
- default_branch
- sub_branches[]
- roadmap_item_refs[]
- feature_refs[]
- release_refs[]
- docs_links[]
- community_links[]

### 4. Features

#### 目标
Features 页面用于承载已有 feature 与未来 feature，尤其适合“已有 Feature，以及在每个 sub-branch 中的 Feature”。[cite:51][cite:52]

#### 推荐结构
- Flat Catalog View：全量 feature 列表，便于搜索。
- Grouped View：按项目、按 branch、按 capability、按 lifecycle 展示。
- Tree View：适合 parent feature / child feature / branch feature。[cite:51]

#### 字段设计：Feature
- feature_id
- feature_name
- short_summary
- detailed_description
- project_id
- branch_id
- parent_feature_id
- feature_type（platform / architecture / verification / tooling / security / safety / ecosystem）
- lifecycle_status
- roadmap_id
- target_release
- target_window
- owner_id
- maintainers[]
- related_specs[]
- related_issues[]
- related_prs[]
- verification_scope
- dependency_features[]
- dependent_features[]
- tags[]
- user_value_summary
- implementation_notes
- public_visibility
- created_at
- updated_at

#### 建议生命周期
- Idea
- Proposed
- Planned
- In Progress
- Verification
- Review
- Released
- Deprecated

这个生命周期既适合产品功能，也适合开源工程能力与验证任务；关键是状态必须可解释，并且每个状态要有进入条件和退出条件。[cite:59][cite:52]

### 5. Branch / Sub-branch 页面

#### 目标
该页面专门解决“每个 sub-branch 中的 Feature 如何呈现”的问题。[cite:51]

#### 页面模块
- Branch Overview：分支目的、状态、适用范围。
- Branch Feature Tree：该分支下 feature 的层级树。
- Delta View：该分支相对主线新增、修改、待合并 feature。
- Merge / Sync Status：与主线的同步状态。
- Related Release / Verification：该分支的发布计划与验证范围。

#### 字段设计：Branch
- branch_id
- branch_name
- branch_type（main / development / vendor / experimental / safety / release）
- parent_branch_id
- owning_project_id
- branch_summary
- branch_status
- branch_owner_id
- related_features[]
- related_releases[]
- related_verification_items[]
- divergence_summary
- merge_plan
- public_notes

### 6. Releases

#### 目标
Releases 页面负责把 roadmap 与版本承诺连接起来，让外部用户看到“什么时候可用、支持到何时、包含哪些 feature”。[cite:52]

#### 页面模块
- Release Timeline
- Version List
- Release Status Cards
- Included Features
- Support Policy
- Release Notes / Change Log

#### 字段设计：Release
- release_id
- version
- codename
- release_type（preview / stable / lts / deprecated）
- planned_date
- actual_date
- support_start
- support_end
- included_roadmap_items[]
- included_features[]
- release_notes_link
- known_issues[]
- verification_summary
- status

### 7. Governance

#### 目标
Governance 页面解释谁能新增 roadmap item、谁能修改状态、谁来批准、争议如何处理；这是多项目方共同维护 roadmap 的前提。[cite:59][cite:54]

#### 页面模块
- Decision Process
- Roles & Permissions
- Proposal Workflow
- Ownership Model
- Meeting / Review Cadence
- Templates & Protocol Docs

#### 字段设计：GovernanceRule
- rule_id
- title
- scope
- role_applicability[]
- action_type
- approval_requirement
- escalation_path
- linked_template
- linked_policy_doc

### 8. Contributors / Owners

#### 目标
展示 roadmap ownership，不让 roadmap 变成匿名文档。[cite:51][cite:59]

#### 页面模块
- Maintainer Directory
- Point of Contact Directory
- Ownership by Area
- Contribution Path

#### 字段设计：Contributor
- contributor_id
- display_name
- role
- organization
- ownership_areas[]
- project_refs[]
- roadmap_item_refs[]
- contact_link
- contribution_guide_link

### 9. Updates / Changelog

#### 目标
让公众知道 roadmap 不是静态页面，而是持续更新的计划系统。[cite:51][cite:47]

#### 页面模块
- Recent Updates Feed
- Roadmap Diffs
- Status Changes Log
- Release-linked Updates

#### 字段设计：RoadmapUpdate
- update_id
- target_type（roadmap / feature / release / branch）
- target_id
- change_type
- summary
- before_state
- after_state
- changed_by
- changed_at
- public_reason

## 核心协议对象关系

建议定义以下对象关系：

- 一个 Strategic Pillar 下可有多个 RoadmapItem。[cite:54]
- 一个 Project 可关联多个 RoadmapItem、Feature、Release、Branch。[cite:32][cite:52]
- 一个 Branch 可承载多个 Feature，且 Feature 可存在 parent-child 关系。[cite:51]
- 一个 RoadmapItem 可映射到多个 Feature，也可直接映射到一个 Release。[cite:52]
- 一个 Feature 必须可链接到 owner、branch、verification、release 与执行证据。[cite:51][cite:59]

## 页面字段展示建议

### Roadmap Card 最小展示字段
- title
- summary
- project
- branch（可选）
- status
- target window
- target release
- owner
- tags
- last updated

### Feature Card 最小展示字段
- feature name
- project
- branch
- lifecycle status
- target release
- owner
- dependency count

### Project Card 最小展示字段
- project name
- summary
- maturity/status
- main owners
- active roadmap items count
- next release

## 多项目维护机制建议

为了让很多项目方未来能持续添加和管理 roadmap，Roadmap Protocol 应采用“结构化源数据 + 门户自动渲染”的机制，而不是让大家直接编辑页面。[cite:59][cite:51]

建议维护机制如下：

- 每个项目维护自己的 roadmap source file 或 structured entries。
- 组织层统一定义 schema、状态机、字段含义和校验规则。[cite:59]
- 门户聚合各项目数据，自动生成组织级 roadmap 页面、项目页、feature 页和 release 页。
- 所有 roadmap item 必须有 owner、更新时间和来源链接。[cite:51]
- 变更要进入 updates feed，以便公众看到 roadmap 是如何演进的。[cite:47][cite:51]

## 状态机规范建议

为了让不同项目方提交的数据可聚合，必须强制统一状态定义。

### RoadmapItemStatus
- Proposed：已形成公开提案，等待优先级判断。
- Planned：已接受，进入未来计划窗口。
- In Progress：已有明确执行活动。
- Verification：主要实现已完成，进入验证或收敛阶段。
- Released：已进入对外发布版本。
- Deferred：暂缓执行。
- Deprecated：计划取消或退出主路线图。

### FeatureLifecycleStatus
- Idea
- Proposed
- Planned
- In Progress
- Verification
- Review
- Released
- Deprecated

建议为每个状态定义：进入条件、退出条件、允许谁修改、是否需要 review、是否需要链接证据。[cite:59][cite:52]

## 过滤与搜索设计

Roadmap Portal 至少应支持以下过滤维度：

- Project
- Branch / Sub-branch
- Strategic Pillar
- Theme
- Status
- Release
- Owner
- Organization
- Time Window
- Tag

搜索结果应同时支持项目、feature、roadmap item 与 release 四类对象，避免用户在不同页面之间来回切换。[cite:32][cite:47]

## 对 Codex 的交付建议

给 Codex 的实现输入应至少包含以下内容：

1. 顶层页面结构与导航。
2. 每个页面的模块清单。
3. 核心对象 schema。
4. 状态机定义。
5. 页面间跳转关系。
6. 过滤与搜索维度。
7. 多项目聚合逻辑。
8. 首页与 roadmap 页的默认展示策略。

建议明确要求 Codex 先生成：

- 信息架构 sitemap
- 页面级 wireframe 说明
- JSON schema / TypeScript types for core objects
- Roadmap item card / feature detail / project detail 的 UI 组件定义
- Portal 的多项目聚合规则

## 最终建议

最适合开源组织的 Roadmap Protocol，不是单纯的 timeline 页面，而是一套把组织战略、项目 roadmap、feature 层级、branch 差异、release 计划和贡献治理统一起来的公开协议。[cite:54][cite:32][cite:59]

如果只能优先做第一版，建议 MVP 先实现 Home、Roadmap、Projects、Features、Releases 五个页面，以及 Project、RoadmapItem、Feature、Release 四类核心对象；Branch、Governance、Updates 可作为第二阶段增强。[cite:32][cite:52][cite:59]
