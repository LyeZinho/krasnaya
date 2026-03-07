# Design: Edit Pages Enhancements & Visual Logic Flow Builder

**Date:** March 7, 2026  
**Status:** Approved  
**Scope:** Enhance existing automation and command edit pages with toast notifications, keyboard shortcuts, validation, and add a visual logic flow builder with infinity canvas

## Overview

Add four major enhancements to the Krasnaya dashboard edit pages:

1. **Toast Notifications** - Visual feedback for save/delete/error actions
2. **Keyboard Shortcuts** - Power user navigation (Ctrl+S, Escape, etc.)
3. **Enhanced Validation** - Real-time JSON validation and field-level error detection
4. **Visual Logic Flow Builder** - No-code drag-and-drop block editor for creating automations and commands

The visual flow builder is the primary feature and requires the most implementation effort. It's a client-side infinity canvas that translates visual blocks into JSON.

---

## 1. Toast Notifications

### Purpose
Provide immediate visual feedback when users perform critical actions (save, delete, cancel).

### Design

**Toast Types:**
- **Success** (green, 3s auto-dismiss): "Automação salva com sucesso!" ✓
- **Error** (red, 5s auto-dismiss): "Erro ao salvar: [error message]" ✗
- **Warning** (yellow, 4s auto-dismiss): "Mudanças não salvas" ⚠️
- **Info** (blue, 3s auto-dismiss): "Ação concluída"

**Display:**
- Positioned top-right corner of screen
- Stack vertically if multiple toasts shown
- Each toast dismissable by clicking an X button
- Auto-dismiss after specified duration

**Implementation:**
- Create `ToastContainer.svelte` component for display
- Create toast store in `$lib/stores` to manage notification queue
- Dispatch toasts from save/delete/error handlers in edit pages
- All text in Portuguese

### Files to Create/Modify
- `src/lib/components/ui/ToastContainer.svelte` (new)
- `src/lib/stores/toast.ts` (new)
- `src/routes/(mgmt)/flows/[id]/+page.svelte` (modify - add toast calls)
- `src/routes/(mgmt)/commands/[id]/+page.svelte` (modify - add toast calls)

---

## 2. Keyboard Shortcuts

### Purpose
Enable power users to work faster with common shortcuts.

### Design

**Shortcuts:**
- `Ctrl+S` / `Cmd+S` → Save current automation/command
- `Escape` → Close modals and show unsaved changes warning
- `Ctrl+Shift+J` → Toggle JSON editor mode

**Implementation:**
- Add `onkeydown` event listener to edit page root `<div>`
- Check `event.key` and `event.ctrlKey`/`event.metaKey`
- Call appropriate handler (save, closeModal, toggleMode)

### Files to Modify
- `src/routes/(mgmt)/flows/[id]/+page.svelte` (modify)
- `src/routes/(mgmt)/commands/[id]/+page.svelte` (modify)

---

## 3. Enhanced Validation

### Purpose
Catch errors early and provide clear feedback about what needs fixing.

### Design

**JSON Validation:**
- Real-time syntax validation as user types in JSON mode
- Show error message with line number and description (e.g., "Line 5: Unexpected token }")
- Prevent save if JSON is invalid (disable save button, show error state)

**Field-Level Validation:**
- Required fields (name, prefix, trigger type, etc.) must be non-empty
- Highlight invalid fields with red border/background
- Show error tooltip on hover

**Validation Timing:**
- Validate on input change (debounce by 300ms to avoid excessive checks)
- Validate before save attempt
- Clear errors when user fixes issues

**Implementation:**
- Use `JSON.parse()` in try-catch for syntax validation
- Create validation helper functions for each field type
- Store errors in reactive variables: `errors: { [fieldName]: string }`
- Show conditional error messages in UI

### Files to Modify
- `src/routes/(mgmt)/flows/[id]/+page.svelte` (modify)
- `src/routes/(mgmt)/commands/[id]/+page.svelte` (modify)
- Create `src/lib/utils/validation.ts` if needed (optional helper functions)

---

## 4. Visual Logic Flow Builder (Infinity Canvas)

### Purpose
Allow users to build automations and commands visually without writing code, using a drag-and-drop block interface on an infinite canvas.

### Architecture

**Components:**
- `FlowBuilder.svelte` - Main component managing canvas state
- `FlowCanvas.svelte` - Infinite canvas with pan/zoom
- `BlockPalette.svelte` - Sidebar with draggable block types
- `Block.svelte` - Individual block renderer
- `BlockModal.svelte` - Modal for editing block configuration
- `FlowToolbar.svelte` - Convert to JSON, Load from JSON, Save, Reset buttons

**Data Structure:**

```typescript
interface FlowBlock {
  id: string; // unique ID
  type: string; // TRIGGER, ACTION, CONDITION, END
  blockType: string; // MESSAGE_CREATE, SEND_MESSAGE, ADD_ROLE, IF, etc.
  label: string; // display name in Portuguese
  config: Record<string, any>; // block-specific configuration
  position: { x: number; y: number }; // canvas position
  connections: {
    input?: string; // block ID this connects from (null for trigger)
    outputs: string[]; // block IDs this connects to
    conditionBranches?: {
      true: string[]; // block IDs for true branch
      false: string[]; // block IDs for false branch
    };
  };
}

interface FlowState {
  blocks: FlowBlock[];
  selectedBlockId?: string;
  canvasOffset: { x: number; y: number }; // pan
  zoomLevel: number; // 0.5 to 2.0
  isDirty: boolean; // unsaved changes
}
```

**For Automations - Block Types:**

**Triggers (1 required):**
- MESSAGE_CREATE
- MEMBER_JOIN
- MEMBER_LEAVE
- REACTION_ADD
- MESSAGE_REACT
- MESSAGE_DELETE

**Actions (configurable):**
- SEND_MESSAGE (config: { message: string })
- SEND_EMBED (config: { title, description, color, fields })
- ADD_ROLE (config: { roleId: string })
- REMOVE_ROLE (config: { roleId: string })
- KICK_USER (config: { reason?: string })
- BAN_USER (config: { reason?: string })

**Conditions:**
- IF (config: { condition: JSONLogic object })
  - User provides JSON Logic condition in a text editor
  - Example: `{ "and": [{ "==": [{ "var": "user.isBot" }, false] }, { "in": [{ "var": "message.content" }, "hello"] }] }`
  - Branches to two paths: true actions and false actions

**Control Flow:**
- END (optional, marks flow completion)

**For Commands - Block Types:**

**Input (1 required):**
- COMMAND_INPUT (config: { name, prefix, description })

**Actions (same as automations):**
- SEND_MESSAGE, SEND_EMBED, ADD_ROLE, etc.

**No conditions/triggers needed for commands.**

### UI/UX Flow

**1. Switching to Visual Mode:**
- Edit page has three tabs: Visual, JSON, **Flow Builder** (new)
- Click "Flow Builder" tab to open FlowBuilder.svelte
- If automation/command already exists, "Load from JSON" is pre-populated

**2. Building a Flow:**
- **Palette (left):** List of block types by category (Triggers, Actions, Conditions)
  - Drag a block type onto canvas
  - Block appears with a unique ID and default configuration

- **Canvas (center):**
  - Infinite grid-based canvas (pan with middle mouse / spacebar+drag, zoom with scroll wheel)
  - Blocks are rectangular cards showing: `[ICON] Block Type - Label`
  - Each block has:
    - **Settings button** (⚙️) → opens BlockModal to edit config
    - **Delete button** (🗑️) → removes block
    - **Connection ports** (left = input, right = output(s))

- **Connections:**
  - Drag from output port of one block to input port of another
  - For IF blocks, show two output ports (true/false branches)
  - Connection validation: trigger must be first, actions follow, conditions can branch
  - Visual feedback: highlight valid drop targets when dragging

**3. Configuring Blocks:**
- Click settings button on a block
- BlockModal opens with configuration fields specific to block type
- Examples:
  - SEND_MESSAGE: text field for message
  - ADD_ROLE: dropdown or text input for role ID
  - IF: text editor for JSON Logic condition
- Save configuration → block updates on canvas

**4. Converting to JSON:**
- Click "Convert to JSON" button in toolbar
- Validates flow structure (trigger present, valid connections)
- Translates blocks to automation/command JSON
- Copies JSON to clipboard or shows in modal
- User can copy/paste into JSON editor

**5. Loading from JSON:**
- Click "Load from JSON" button
- Opens modal with text editor
- User pastes existing automation/command JSON
- System parses JSON and reconstructs blocks on canvas
- Auto-layouts blocks with connections

**6. Saving:**
- Click "Save" button in toolbar
- Converts flow to JSON
- Calls the same save API as visual/JSON editors
- Shows toast notification on success/error

### Canvas Features

**Pan & Zoom:**
- Mouse wheel to zoom in/out (0.5x to 2.0x)
- Middle mouse button + drag to pan
- Spacebar + left mouse drag to pan
- Zoom controls in toolbar (+/- buttons)

**Grid:**
- Optional snap-to-grid (helpful for alignment)
- Visual grid in background (light dots)

**Selection:**
- Click a block to select (show highlight border)
- Delete selected block with Delete key

**Minimap (optional):**
- Small preview in corner showing entire flow
- Click minimap to navigate

### JSON Logic for Conditions

**Reference:** JSON Logic is a standard for logical operations in JSON.

**Operators:**
- `{ "==": [value1, value2] }` - equality
- `{ "!=": [value1, value2] }` - inequality
- `{ ">": [value1, value2] }` - greater than
- `{ "<": [value1, value2] }` - less than
- `{ "in": [value, array] }` - value in array
- `{ "and": [condition1, condition2, ...] }` - logical AND
- `{ "or": [condition1, condition2, ...] }` - logical OR
- `{ "!": condition }` - logical NOT
- `{ "var": "path.to.variable" }` - access variables

**Variables available in automation conditions:**
- `message.content` - message text
- `message.author.id` - user ID
- `message.author.isBot` - is bot
- `user.roles` - array of role IDs
- Event-specific variables based on trigger type

**Example condition for MESSAGE_CREATE:**
```json
{
  "and": [
    { "!=": [{ "var": "message.author.isBot" }, true] },
    { "in": ["hello", { "var": "message.content" }] }
  ]
}
```
"Execute actions if message is from non-bot and contains 'hello'"

### Files to Create

- `src/lib/components/flow-builder/FlowBuilder.svelte`
- `src/lib/components/flow-builder/FlowCanvas.svelte`
- `src/lib/components/flow-builder/BlockPalette.svelte`
- `src/lib/components/flow-builder/Block.svelte`
- `src/lib/components/flow-builder/BlockModal.svelte`
- `src/lib/components/flow-builder/FlowToolbar.svelte`
- `src/lib/stores/flow.ts` - flow state management
- `src/lib/utils/flow-translator.ts` - JSON ↔ Flow conversions
- `src/lib/utils/json-logic.ts` - JSON Logic utilities

### Files to Modify

- `src/routes/(mgmt)/flows/[id]/+page.svelte` - add Flow Builder tab
- `src/routes/(mgmt)/commands/[id]/+page.svelte` - add Flow Builder tab

---

## Summary

| Feature | Complexity | Files | Estimated Effort |
|---------|-----------|-------|------------------|
| Toast Notifications | Low | 4 | 1-2 hours |
| Keyboard Shortcuts | Low | 2 | 0.5 hour |
| Enhanced Validation | Medium | 3 | 1-2 hours |
| Visual Flow Builder | High | 11 | 8-12 hours |
| **Total** | - | **18** | **10-17 hours** |

The Visual Flow Builder is the most complex component but provides significant value for no-code automation creation.

---

## Technical Considerations

1. **Drag & Drop:** Use HTML5 Drag API or Svelte event handlers
2. **Canvas Rendering:** Consider using SVG for connections (lines between blocks)
3. **State Management:** Use a Svelte store for flow state to share across components
4. **Validation:** JSON Logic can be validated with a library like `json-logic-js`
5. **Performance:** Large flows (50+ blocks) may need virtualization for rendering
6. **Responsive Design:** Ensure flow builder works on smaller screens (consider collapsible palette)

---

## Testing Strategy

- Unit tests for flow-translator (JSON ↔ Flow conversions)
- Unit tests for validation helpers
- Manual testing of canvas interactions (pan, zoom, drag blocks)
- Manual testing of block configuration modals
- End-to-end testing of full flow: create → convert → save

