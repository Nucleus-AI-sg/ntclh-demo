---
name: linear-issue-finalisation
description: >
  Finalise and close Linear issues after implementation is complete. Use when the user says
  "mark this done", "close the issue", "finalise XXX-123", "wrap up this task",
  or when all acceptance criteria for an issue have been met. Covers Definition of Done,
  final summary, status transitions, and next steps.
user-invocable: true
metadata:
  author: Nucleus AI
  version: 1.0.0
---

# Linear Issue Finalisation Guide

Properly close out Linear issues after implementation is complete.

## Defaults

- **Project**: ntuclh demo (`772b87f3-9864-41dd-8649-d1e63affefc6`)
- **Team**: Nucleus AI (`NAI`)

## Finalisation Workflow

### 1. Verify All Acceptance Criteria

- Use `get_issue` to read the current issue state
- Confirm every acceptance criteria checkbox in the description is satisfied
- If any are not met, complete them before proceeding or flag to the user

### 2. Run the Definition of Done Checklist

Verify each item before closing:

- [ ] **Implementation plan exists** in the issue comments and reflects the final solution
- [ ] **All acceptance criteria are checked** in the issue description
- [ ] **Automated and relevant manual tests pass** - no new warnings or regressions introduced
- [ ] **Documentation or configuration updates completed** when required
- [ ] **Progress comments captured** during implementation (decisions, blockers, learnings)
- [ ] **Final summary written** (see next step)

### 3. Write the Final Summary

Use `save_comment` to post a PR-style completion summary on the issue:

```
save_comment(issueId: "XXX-123", body: "## Final Summary\n\n### What Changed\n- ...\n\n### Why\n- ...\n\n### Tests\n- ...\n\n### Risks / Follow-ups\n- ...")
```

**Final Summary structure:**

```markdown
## Final Summary

### What Changed
- Brief description of the implementation

### Why
- Rationale and context for the approach taken

### Tests
- What was tested and how
- Coverage results if relevant

### Risks / Follow-ups
- Any known risks or technical debt
- Suggested follow-up work (if any)
```

Avoid one-line summaries unless the change is genuinely trivial. Include enough detail for reviewers and future agents to understand what happened.

### 4. Confirm the Plan is Current

If the executed approach deviated from the original plan, add a comment updating the plan so the issue record accurately reflects what was actually done.

### 5. Update Issue Status to Done

Use `save_issue` to transition the issue to the "Done" status:

```
save_issue(id: "XXX-123", stateId: "<done-status-id>")
```

Use `list_issue_statuses` to find the correct status ID for "Done" if you don't already have it.

### 6. Propose Next Steps

**Never autonomously create or start new issues.** Instead:

- **If follow-up work is needed**: Present the idea to the user and ask whether to create a follow-up issue
- **If this was a sub-issue**:
  - Check if the user explicitly told you to work on "parent issue and all sub-issues"
    - **YES**: Proceed directly to the next sub-issue without asking
    - **NO**: Ask: "Sub-issue X is complete. Should I proceed with sub-issue Y, or would you like to review first?"
- **If all sub-issues are complete**: Update parent issue status if appropriate, then ask the user what to do next

## Progress Comments vs Final Summary

These serve different purposes - both are important:

| Type | When | Purpose | How |
|------|------|---------|-----|
| **Progress comments** | During execution | Log decisions, blockers, learnings as they happen | `save_comment` with `## Progress Update` or `## Decision: ...` |
| **Final summary** | At completion | PR-style overview of what changed and why | `save_comment` with `## Final Summary` |

Do not repeat information that is clearly understandable from the code itself. Focus on context, rationale, and anything a future developer (or agent) would need to know.

## Working with Sub-Issues

- When finalising a sub-issue, verify all its acceptance criteria individually
- Update sub-issue status to "Done"
- Document sub-issue-specific outcomes in a comment on the sub-issue
- Only update parent issue status when ALL sub-issues are complete (or when explicitly instructed)

## Anti-Patterns to Avoid

- Closing an issue without verifying acceptance criteria
- Writing a one-line final summary for non-trivial work
- Autonomously creating follow-up issues without user approval
- Using "cancelled" status for completed work (cancelled is for invalid/duplicate issues only)
- Skipping the final summary comment
