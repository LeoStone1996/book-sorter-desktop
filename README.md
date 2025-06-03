# Memory Bank Template Project

A comprehensive documentation-driven development template that establishes robust project continuity through systematic knowledge preservation.

## Overview

This project serves as a foundational template for creating well-documented, maintainable projects that preserve complete context across development sessions. It implements a "Memory Bank" system - a hierarchical documentation structure that captures all essential project knowledge in a systematic, accessible format.

## Key Features

- **Complete Context Preservation**: Never lose project context between sessions
- **Hierarchical Documentation**: Organized information flow from strategic to tactical
- **Documentation-First Development**: Integrate documentation into development workflow
- **Template Reusability**: Patterns applicable to any project type
- **Immediate Understanding**: New team members can understand project within minutes

## Memory Bank Structure

```
memory-bank/
├── projectbrief.md      # Foundation - project scope and requirements
├── productContext.md    # Why - problems solved and user experience goals
├── systemPatterns.md    # How - architecture and design patterns
├── techContext.md       # With what - technologies and constraints
├── activeContext.md     # Current state - work focus and decisions
└── progress.md          # Status - what's done and what's next
```

### File Dependencies

```
projectbrief.md (foundation)
├── productContext.md (why/what)
├── systemPatterns.md (how/architecture)  
└── techContext.md (with what)
    ↓
activeContext.md (current state)
    ↓
progress.md (status tracking)
```

## Quick Start

### For New Projects
1. Copy this template structure to your project directory
2. Customize `projectbrief.md` with your project's specific requirements
3. Update other memory bank files to reflect your project context
4. Begin development with documentation-first approach

### For Existing Projects
1. Create `memory-bank/` directory in your project root
2. Document current project state using the memory bank structure
3. Establish `.clinerules` for project-specific patterns
4. Integrate documentation updates into your development workflow

## Usage Patterns

### Session Start
1. Read all memory bank files to understand current project state
2. Review `activeContext.md` for current work focus
3. Check `progress.md` for implementation status
4. Proceed with development tasks

### During Development
1. Update relevant memory bank files as work progresses
2. Document decisions and changes in appropriate files
3. Maintain consistency across documentation hierarchy

### Session End
1. Update `activeContext.md` with current state
2. Update `progress.md` with completed work
3. Ensure next steps are clearly documented

## Core Principles

### Documentation-First Development
- Document decisions before or during implementation
- Capture complete project state in memory bank files
- Update documentation as part of development workflow

### Hierarchical Information Architecture
- Strategic information flows down through context files
- Current state synthesized in active context
- Implementation status tracked in progress file

### Context Preservation
- All project knowledge captured in documentation
- No information loss between development sessions
- Immediate project understanding for new contributors

## Benefits

- **Reduced Onboarding Time**: New team members understand project quickly
- **Seamless Context Switching**: Resume work without information loss
- **Improved Collaboration**: Shared understanding through comprehensive documentation
- **Knowledge Preservation**: Project knowledge survives team changes
- **Efficient Development**: Established patterns reduce decision overhead

## File Descriptions

| File | Purpose | Content |
|------|---------|---------|
| `projectbrief.md` | Foundation document | Project scope, requirements, goals, constraints |
| `productContext.md` | Problem definition | Why project exists, problems solved, user experience |
| `systemPatterns.md` | Architecture | Design patterns, technical decisions, relationships |
| `techContext.md` | Technical foundation | Technologies, setup, constraints, dependencies |
| `activeContext.md` | Current state | Work focus, recent changes, decisions, next steps |
| `progress.md` | Status tracking | What's done, what's pending, known issues |
| `.clinerules` | Project intelligence | Patterns, preferences, learning, insights |

## Best Practices

### Documentation Maintenance
- Update files during development, not as afterthought
- Keep documentation current and accurate
- Ensure each file tells complete story within its scope

### Information Organization
- Maintain clear hierarchy and dependencies
- Avoid duplication across files
- Focus each file on its specific concern

### Template Customization
- Adapt content while preserving structure
- Customize for specific project needs
- Maintain hierarchical relationships

## Success Metrics

- **Understanding Time**: < 10 minutes to grasp project context
- **Context Loss**: Zero information loss between sessions
- **Documentation Coverage**: Complete project story captured
- **Pattern Reuse**: Established patterns applicable to future projects

## Contributing

When working on this project:
1. Read all memory bank files before making changes
2. Update relevant documentation as you work
3. Maintain consistency across all files
4. Test that documentation enables immediate understanding

## License

This template is designed for reuse and adaptation. Use it as a foundation for your own projects and customize as needed.

---

**Next Steps**: Review the memory bank files to understand the complete project context, then begin customizing for your specific use case.
