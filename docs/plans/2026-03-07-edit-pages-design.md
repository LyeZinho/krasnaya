# Design: Páginas de Edição para Automações e Comandos

**Date:** 2026-03-07  
**Status:** Approved  
**Scope:** Add dedicated edit pages for Automations (Flows) and Commands in Krasnaya Dashboard

## Overview

Add dynamic edit pages (`/flows/[id]` and `/commands/[id]`) to allow users to fully manage automation and command configurations with bidirectional sync between visual and JSON editors.

## Requirements

### Functional Requirements

**FR-1: Automation Edit Page**
- Load automation by ID from URL parameter
- Edit fields: name, status (enabled/disabled), trigger type, conditions, actions
- Bidirectional sync between visual and JSON editors
- Save changes via PATCH API
- Delete automation with confirmation modal
- Navigate back to /flows/ on save/cancel

**FR-2: Command Edit Page**
- Load command by ID from URL parameter
- Edit fields: name, prefix, description, aliases (list), enabled/disabled, cooldown
- Edit command logic (conditions/actions) with visual/JSON editors
- Bidirectional sync between visual and JSON editors
- Save changes via PATCH API
- Delete command with confirmation modal
- Navigate back to /commands/ on save/cancel

**FR-3: Navigation**
- Click on item in sidebar redirects to edit page
- Direct URL access `/flows/[id]` and `/commands/[id]` works
- Back button or Cancel button returns to list view

**FR-4: User Feedback**
- Show loading state while fetching data
- Display error messages for failed loads/saves
- Show unsaved changes warning before navigation away
- Success notification after save (optional)

### Non-Functional Requirements

**NFR-1: Design Consistency**
- Use existing "Brutal" design pattern from dashboard
- Match styling of current flows/commands pages
- Reuse existing components (BrutalCard, BrutalButton, BrutalModal)

**NFR-2: Performance**
- Load automation/command data on mount
- Debounce JSON sync updates to prevent excessive re-renders
- Only sync when actual content changes

**NFR-3: Error Handling**
- Handle 404 (automation/command not found)
- Handle network errors with retry option
- Display validation errors from API

## Architecture

### Route Structure

```
/flows/                    (existing - list page)
  └── [id]/                (NEW - edit page)
      └── +page.svelte     (dynamic route component)
      └── +page.ts         (load function to fetch data)

/commands/                 (existing - list page)
  └── [id]/                (NEW - edit page)
      └── +page.svelte     (dynamic route component)
      └── +page.ts         (load function to fetch data)
```

### Components

**Existing Components (Enhanced):**
- `BrutalModal` - for confirmations (delete, unsaved changes)
- `BrutalCard` - for sections in edit page
- `BrutalButton` - for actions

**New Components:**
- `BrutalEditForm.svelte` - reusable edit form wrapper (optional, can be inline)
- JSON/Visual editor toggle - reuse pattern from flows list

### Data Flow

```
1. User navigates to /flows/[id]
2. +page.ts load function fetches automation via AutomationService.getAutomation(id)
3. Page renders with automation data
4. User edits visual OR JSON
5. Sync handler updates the other representation
6. User clicks Save
7. PATCH request via AutomationService.updateAutomation()
8. Success → redirect to /flows/
9. Error → display error message, allow retry
```

## Component Specifications

### Automation Edit Page (`/flows/[id]/+page.svelte`)

**State Variables:**
```typescript
automation: Automation | null
originalAutomation: Automation | null (for unsaved changes detection)
viewMode: 'visual' | 'json'
jsonContent: string
isLoading: boolean
isSaving: boolean
error: string | null
showDeleteModal: boolean
hasUnsavedChanges: boolean
```

**Form Fields:**
- Name (text input, required)
- Status (toggle enabled/disabled)
- Trigger Type (dropdown: MESSAGE_CREATE, MEMBER_JOIN, INTERACTION_CREATE, SCHEDULED_EVENT, MESSAGE_REACTION, VOICE_STATE_UPDATE)
- Conditions (JSON array editor)
- Actions (JSON array editor)

**Methods:**
- `loadAutomation()` - fetch from API on mount
- `handleJsonChange(newJson)` - update automation from JSON, update visual mode
- `handleVisualChange(field, value)` - update automation from visual, update JSON
- `saveAutomation()` - PATCH to API, handle errors, redirect on success
- `deleteAutomation()` - DELETE to API with confirmation
- `detectUnsavedChanges()` - compare current vs original
- `syncJsonToVisual()` - parse JSON and update visual fields
- `syncVisualToJson()` - stringify automation to JSON

**UI Sections:**
1. Header: title, Save/Delete/Deploy buttons
2. Main area split:
   - Left: Form fields (name, status, trigger)
   - Right: Conditions/Actions editors (visual/JSON toggle)

### Command Edit Page (`/commands/[id]/+page.svelte`)

**State Variables:**
```typescript
command: Command | null
originalCommand: Command | null
viewMode: 'visual' | 'json'
jsonContent: string
isLoading: boolean
isSaving: boolean
error: string | null
showDeleteModal: boolean
hasUnsavedChanges: boolean
aliases: string[] (editable list)
```

**Form Fields:**
- Name (text input, required)
- Prefix (text input, default "!")
- Description (text input)
- Aliases (list input - add/remove aliases)
- Cooldown (number input, milliseconds)
- Status (toggle enabled/disabled)
- Logic (JSON array editor for conditions/actions)

**Methods:**
- Same as automation edit page (loadCommand, saveCommand, etc.)

**UI Sections:**
1. Header: title, Save/Delete/Authorize buttons
2. Left sidebar: command list (existing)
3. Main area split:
   - Form fields (name, prefix, description, aliases, cooldown, status)
   - Logic editor (visual/JSON toggle)

## Synchronization Logic

### JSON ↔ Visual Sync

**When user edits JSON:**
1. Validate JSON syntax
2. Parse JSON to object
3. Update visual form fields
4. Update automation/command object

**When user edits visual form:**
1. Update automation/command object
2. Stringify to JSON with pretty-print (2 spaces indent)
3. Update JSON editor content

**Edge Cases:**
- Invalid JSON → show error, don't sync to visual
- JSON parses but has unexpected structure → show warning
- User switches modes → sync current state to other mode

## API Integration

**Endpoints Used:**

```typescript
// Existing services
AutomationService.getAutomation(id)        // GET /api/v1/automations/{id}
AutomationService.updateAutomation(id, data) // PATCH /api/v1/automations/{id}
AutomationService.deleteAutomation(id)     // DELETE /api/v1/automations/{id}

CommandService.getCommand(id)               // GET /api/v1/commands/{id}
CommandService.updateCommand(id, data)      // PATCH /api/v1/commands/{id}
CommandService.deleteCommand(id)            // DELETE /api/v1/commands/{id}
```

## Error Handling

**Load Errors:**
- 404 Not Found → show "Automação não encontrada" message
- Network error → show "Erro ao carregar" with retry button
- Invalid ID format → redirect to list page

**Save Errors:**
- Validation error → show field-specific error messages
- Conflict (outdated data) → show "Dados foram modificados, recarregar?" modal
- Network error → show error, allow retry

**Delete Errors:**
- Show error modal with option to retry
- Don't redirect until delete succeeds

## Testing Strategy

**Manual Testing:**
1. Navigate to /flows/ → click item → should load /flows/[id] with data
2. Edit automation name → JSON should update
3. Edit JSON → visual fields should update
4. Click Save → should update API and redirect
5. Click Delete → show confirmation modal
6. Click Cancel → should not save changes
7. Test same for /commands/

**Edge Cases:**
- Load non-existent automation/command ID → show 404
- Rapid edits between visual/JSON → ensure sync is stable
- Very large JSON → ensure performance is acceptable
- Invalid JSON → validation error shown

## Success Criteria

- ✅ User can view and edit automation properties on dedicated page
- ✅ User can view and edit command properties on dedicated page
- ✅ Visual/JSON editors stay in sync bidirectionally
- ✅ Changes are persisted to API via PATCH
- ✅ User can delete automations/commands
- ✅ Navigation works both direct URL and sidebar click
- ✅ All changes follow "Brutal" design pattern
- ✅ Error states are handled gracefully
