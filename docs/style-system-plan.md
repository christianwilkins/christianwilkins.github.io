# Style system plan

## Goal
Make styling composable and predictable, with presets as recipes built from a small shared set of primitives.

## Model
Use four control groups and keep everything else derived from them.

1. Foundation
   - palette
   - font
   - typography

2. Structure
   - layout
   - section
   - align
   - nav
   - density

3. Surface
   - radius
   - shadow
   - blur
   - ambient

4. Behavior
   - motion
   - link
   - case
   - terminal

## Rules
- Presets are combinations of existing primitives, not one off CSS forks.
- Special treatment should prefer `data-preset` when the effect is intentionally preset specific.
- Shared style controls should come from config, not duplicated option lists in multiple components.
- New style ideas should first try to fit an existing primitive before adding another option.
- If a new option only benefits one preset, it should usually be encoded as preset scoped behavior, not a new global control.

## Existing presets in this model
- chimero: foundation + structure default
- signal: high contrast terminal leaning foundation and behavior
- legacy: print inspired foundation and softer structure
- amodei: restrained editorial foundation
- barbie: bright palette recipe with preset scoped expressive typography treatment

## Integration status
- Shared style option definitions now live in `src/lib/style-config.ts`
- Control groups are defined in `src/lib/style-config.ts`
- Terminal and drawer should both read from the shared config
- Preset scoped overrides should use `data-preset`

## Next cleanup passes
1. Drive drawer section rendering from group config instead of hand wired sections
2. Collapse rarely changed controls behind an advanced section
3. Audit preset names and remove overlapping options if two controls express the same idea
4. Move any remaining preset specific visual hacks off global axes and onto preset selectors
