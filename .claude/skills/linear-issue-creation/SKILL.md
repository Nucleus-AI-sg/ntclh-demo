---
name: linear-issue-creation
description: >
  Create well-structured Linear issues for this project. Use when the user asks to
  "create an issue", "add a task", "track this work", "file a ticket", "plan this feature",
  or discusses work that needs planning. Covers scope assessment, acceptance criteria,
  parent/sub-issue structure, and issue creation in Linear.
user-invocable: true
metadata:
  author: Nucleus AI
  version: 1.0.0
---

# Linear Issue Creation Guide

Create well-structured issues in Linear for this project.

## When to Create Issues

**Create an issue if the work requires planning or decision-making.** Ask: "Do I need to think about HOW to do this?"

- **YES** -> Search for existing issues first, create if needed
- **NO** -> Just do it (the change is trivial/mechanical)

**Create issues for**: bug investigations, feature work, refactoring, API changes, multi-step tasks.
**Skip issues for**: typo fixes, version bumps, trivial edits, questions, exploratory requests.

## Defaults

- **Project**: ntuclh demo (`772b87f3-9864-41dd-8649-d1e63affefc6`)
- **Team**: Nucleus AI (`NAI`)
- Override only when the user specifies a different project or team.

## Step 1: Search for Existing Issues

**Always search before creating.** Use `list_issues` with filters:

- Filter by status to exclude completed work
- Use keyword matching on titles and descriptions
- Use `get_issue` to read full context of potentially related issues

Never list all issues without filters - this overwhelms context.

## Step 2: Assess Scope

Before creating any issues, determine:

1. Can this be completed in a single focused pull request?
2. Would a reviewer be comfortable reviewing all changes in one sitting?
3. Are there natural breaking points for independent delivery and testing?
4. Does the request span multiple subsystems or architectural concerns?

**Single PR** -> Create one issue.
**Multiple PRs** -> Create a parent issue with sub-issues, or separate linked issues.

## Step 3: Choose Issue Structure

**Use sub-issues** (parent-child) when:
- Tasks modify the same component or subsystem
- Tasks are tightly coupled with a shared high-level goal
- Tasks represent sequential phases of the same feature

**Use separate issues** (with references) when:
- Tasks span different components or subsystems
- Tasks can be worked on independently
- Tasks have loose coupling with clear boundaries

## Step 4: Write the Issue

Use `save_issue` to create issues.

### Title
- Clear, concise, describes the desired outcome
- No implementation details in the title

### Description Structure

Write the description in markdown with these sections:

```markdown
## Context
Brief explanation of WHY this work is needed and the user value.

## Acceptance Criteria
- [ ] Specific, testable criterion 1
- [ ] Specific, testable criterion 2
- [ ] Edge case or negative scenario
- [ ] Tests pass with adequate coverage
- [ ] Documentation updated if applicable

## References
- Related files: `path/to/relevant/file.ts`
- Related issues: XXX-123
- Design docs or specs (if any)
```

### Acceptance Criteria Rules
- Keep each item atomic and independently testable
- Include negative/edge scenarios when relevant
- Include testing expectations explicitly
- Include documentation expectations in the same issue (never defer to follow-up)
- Never embed implementation steps as acceptance criteria

### Labels and Priority
- Set appropriate labels via `list_issue_labels` to find available options
- Set priority when the user specifies urgency
- Assign to a user when specified, otherwise leave unassigned
- Set milestone via `save_milestone` or link to existing ones

## Step 5: Agent Lifecycle Reality

**Assume the agent who creates issues will NOT execute them.** Each issue may be handled by a different agent session with no memory of prior conversations.

- Write issues as work orders for strangers - include all required context
- Never reference "what we discussed" without restating essential decisions
- Use the description to capture everything needed for a clean handoff
- Link related code files and documentation in the References section

## Step 6: Create Multi-Issue Structure

When scope requires multiple issues:

1. Create the parent issue first with a high-level description
2. Create sub-issues referencing the parent via `save_issue` with `parentId`
3. Document dependencies between issues in their descriptions
4. Explain the created structure to the user

**Follow-up work on an existing issue**: Create it as a sub-issue of the parent, not a new top-level issue.

## Step 7: Report Created Issues

After creation, show the user:
- Issue identifier (e.g., XXX-123)
- Title
- Brief summary of description and acceptance criteria

This provides visibility and allows the user to request corrections.

## Anti-Patterns to Avoid

- Creating a single issue with 10+ acceptance criteria (split it)
- Adding implementation steps to acceptance criteria
- Creating an issue before understanding if it needs splitting
- Deferring tests or documentation to "later issues"
- Creating issues without searching for duplicates first
