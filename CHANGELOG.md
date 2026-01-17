# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

## [0.1.4] - 2025-01-17

### Added

- CONTRIBUTING.md with setup and PR guidelines

### Changed

- Updated package description and keywords

## [0.1.3] - 2025-01-17

### Added

- AGENTS.md for contributors
- Git tags for all versions

## [0.1.2] - 2025-01-17

### Added

- `eval` command to execute arbitrary JavaScript in Figma plugin context
- `figma-use plugin` auto-installs plugin to Figma settings.json
- `--force` flag for plugin install while Figma is running
- `--uninstall` flag to remove plugin
- Architecture diagram in README
- Comparison table: official Figma MCP (read-only) vs figma-use (full control)

### Changed

- All `proxy` and `plugin` commands now use citty for consistency
- README examples show inline styling (one command does fill + stroke + radius)

## [0.1.1] - 2025-01-17

### Added

- Human-readable CLI output by default (agent-browser style)
- `--json` flag for machine parsing on all commands
- 69 integration tests

### Changed

- Renamed from figma-bridge to @dannote/figma-use

## [0.1.0] - 2025-01-17

### Added

- Initial release
- 60+ CLI commands for Figma control
- WebSocket proxy server (Elysia)
- Figma plugin with all command handlers
- Create commands: rectangle, ellipse, line, polygon, star, vector, frame, section, text, component, instance
- Style commands: fill, stroke, corner radius, opacity, effects, blend mode
- Layout commands: auto-layout, constraints, min/max
- Transform commands: move, resize, rotate, set parent
- Query commands: get node, children, selection, pages, components, styles
- Export commands: PNG/SVG/PDF export, screenshot
- Inline styling: `--fill`, `--stroke`, `--radius` etc. on create commands

[unreleased]: https://github.com/dannote/figma-use/compare/v0.1.4...HEAD
[0.1.4]: https://github.com/dannote/figma-use/compare/v0.1.3...v0.1.4
[0.1.3]: https://github.com/dannote/figma-use/compare/v0.1.2...v0.1.3
[0.1.2]: https://github.com/dannote/figma-use/compare/v0.1.1...v0.1.2
[0.1.1]: https://github.com/dannote/figma-use/compare/v0.1.0...v0.1.1
[0.1.0]: https://github.com/dannote/figma-use/releases/tag/v0.1.0
