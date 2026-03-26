---
name: linear-issue-execution
description: >
  Plan and execute Linear issues with disciplined workflow. Use when the user asks to
  "work on an issue", "start XXX-123", "implement this task", "execute the plan",
  or when beginning implementation of a tracked Linear issue. Covers planning workflow,
  approval gates, scope discipline, and progress tracking.
user-invocable: true
metadata:
  author: Nucleus AI
  version: 1.0.0
---

# Linear Issue Execution Guide

Disciplined workflow for planning and executing Linear issues.

## Defaults

- **Project**: ntuclh demo (`772b87f3-9864-41dd-8649-d1e63affefc6`)
- **Team**: Nucleus AI (`NAI`)

## Planning Workflow

> **Non-negotiable:** Capture an implementation plan in the Linear issue _before_ writing any code. The plan must live in the issue record prior to implementation and remain up to date when you close the issue.

### Steps

1. **Read the issue** - Use `get_issue` to load the full description, acceptance criteria, and any comments
2. **Mark as In Progress** - Use `save_issue` to set the status to "In Progress" (status ID: `46a3c2f0-0764-4002-906a-dd787ea28878`)
3. **Assign to yourself** - Use `save_issue` with the assignee field if not already assigned
4. **Review references** - Check any linked issues, documents, PRDs, or code paths mentioned in the description
5. **Explore the codebase** - Before drafting any plan, understand the current state of the areas you'll touch: existing patterns, integration layers, and related code. Don't plan against assumptions - plan against what's actually there.
6. **Identify durable architectural decisions** - For non-trivial work, identify high-level decisions that are unlikely to change throughout implementation. These anchor the plan and prevent rework:
   - Route structures / URL patterns
   - Database schema shape and key data models
   - Authentication / authorisation approach
   - Third-party service boundaries
   - GraphQL type and resolver structure
7. **Enter plan mode** - Use `EnterPlanMode` to draft the implementation plan. Break the work into vertical slices (see guidelines below). Think through the approach, identify risks, and verify prerequisites are in place. For multi-phase plans, ask:
   - Does the granularity feel right? (too coarse / too fine)
   - Should any phases be merged or split further?
8. **Wait for explicit approval** - Iterate on the plan within plan mode until the user approves. Do not exit plan mode or start coding until the user confirms.
9. **Exit plan mode and record approved plan** - Use `ExitPlanMode`, then use `save_comment` on the issue to capture the agreed implementation plan (see plan template below).

### Planning Guidelines

- Keep the Linear issue as the single plan of record
- Add follow-up comments via `save_comment` to refine the plan as you learn more
- Verify prerequisites: confirm required tools, access, data, and environment are in place
- Ensure the plan reflects the agreed user outcome and acceptance criteria
- If expectations are unclear, clarify them before proceeding

#### Vertical slices over horizontal layers

Break work into **tracer bullet** phases. Each phase is a thin vertical slice that cuts through ALL integration layers end-to-end, NOT a horizontal slice of one layer.

- Each slice delivers a narrow but COMPLETE path through every layer (schema, API, UI, tests)
- A completed slice should be demoable or verifiable on its own
- Prefer many thin slices over few thick ones
- DO include durable decisions: route paths, schema shapes, data model names
- Do NOT include specific file names, function names, or implementation details likely to change as later phases are built

#### Plan comment template

Use this structure when recording the plan via `save_comment`:

```markdown
## Implementation Plan

### Architectural decisions

Durable decisions that apply across all phases:

- **Routes**: ...
- **Schema**: ...
- **Key models**: ...

---

### Phase 1: <Title>

**Acceptance criteria**: <from issue or PRD>

**What to build**: Concise description of this vertical slice - the end-to-end behaviour, not layer-by-layer implementation.

---

### Phase 2: <Title>

...
```

For simple, single-phase issues, skip the phase structure and use a flat list of steps instead.

### Working with Sub-Issues (Planning)

- If working on a parent issue with sub-issues, create a high-level plan for the parent
- Each sub-issue should have its own detailed implementation plan when you work on it
- Ensure sub-issue plans are consistent with the parent issue's overall strategy
- Document the agreed breakdown in the parent issue's comments

## Execution Workflow

- **Do not touch the codebase** until the implementation plan is approved AND recorded in the issue
- If the approach shifts during implementation, update the plan first (add a comment) and get confirmation before continuing
- If feedback requires changes, revise the plan first via a new comment

### Progress Tracking

Work in short loops: implement, test, and track progress:

1. **Log progress** - Use `save_comment` to document decisions, blockers, or learnings as you go
2. **Check off acceptance criteria** - Update the issue description checkboxes via `save_issue` as criteria are met
3. **Keep status aligned** - Update issue status if work is blocked or paused

### Comment Conventions

Use structured comments to keep the issue record clean:

- **Plan**: `## Implementation Plan` - the agreed approach
- **Progress**: `## Progress Update` - what's been done, what's next
- **Decision**: `## Decision: [topic]` - rationale for a choice made during implementation
- **Blocker**: `## Blocker: [topic]` - what's blocking and what's needed to unblock

## Handling Scope Changes

If new work appears during implementation that wasn't in the original acceptance criteria:

**STOP and ask the user:**

> "I discovered [new work needed]. Should I:
> 1. Add acceptance criteria to the current issue and continue, or
> 2. Create a follow-up issue to handle this separately?"

**Never:**
- Silently expand the scope without user approval
- Create new issues on your own initiative
- Add acceptance criteria without user confirmation

## Staying on Track

- Stay within the scope defined by the plan and acceptance criteria
- Update the plan first if direction changes, then get user approval
- If you need to deviate from the plan, explain why and wait for confirmation

## Working with Sub-Issues (Execution)

- When user assigns you a parent issue "and all sub-issues", work through each sequentially without asking permission to move to the next
- When completing a single sub-issue (without explicit instruction to continue), present progress and ask: "Sub-issue X is complete. Should I proceed with sub-issue Y, or would you like to review first?"
- Each sub-issue should be fully completed (all acceptance criteria met, tests passing) before moving to the next

## Finalising

When implementation is finished, follow the **Linear Issue Finalisation** skill (`/linear-issue-finalisation`) to properly close out the work.
