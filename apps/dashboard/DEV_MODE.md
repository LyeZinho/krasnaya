# 🚀 Development Mode Guide

## Overview

Krasnaya includes a development mode that bypasses authentication to speed up development and testing. This mode automatically logs you in as an admin user without requiring passwords or 2FA.

## Enabling Development Mode

### 1. Root Environment (`.env`)

Set the environment variable in the project root:

```env
ENVIRONMENT=develop
```

### 2. Frontend Environment (`.env.local`)

Create or update `.env.local` in `apps/dashboard/`:

```env
VITE_ENVIRONMENT=develop
VITE_API_URL=http://localhost:3000/api
```

The frontend detects `import.meta.env.DEV` which is automatically set by Vite during development.

## What Gets Bypassed

### Authentication Service
- ✅ `login()` - Returns a dev user token immediately
- ✅ `logout()` - No-op in dev mode
- ✅ `getCurrentUser()` - Returns mocked dev user
- ✅ `initiate2FA()` - Returns dummy QR code
- ✅ `confirm2FA()` - Returns success with backup codes
- ✅ `verify2FA()` - Always succeeds
- ✅ `disable2FA()` - No-op
- ✅ `refreshToken()` - Returns new dev token

### Login Page
- Auto-redirects to dashboard on mount
- Shows "DEVELOPMENT MODE" banner
- Hides password/2FA input fields
- One-click "Enter Development Mode" button

### Dev User
```typescript
{
  id: 'dev-user-123',
  username: 'DevUser',
  email: 'dev@krasnaya.local',
  avatar: '🤖',
  has2FA: false,
  role: 'admin'
}
```

## Quick Start

1. **Ensure ENVIRONMENT is set:**
   ```bash
   echo "ENVIRONMENT=develop" >> .env
   ```

2. **Install frontend env variables:**
   ```bash
   cd apps/dashboard
   echo "VITE_ENVIRONMENT=develop" > .env.local
   ```

3. **Start dev server:**
   ```bash
   pnpm run dev:all
   ```

4. **Navigate to dashboard:**
   - Open http://localhost:5173
   - You'll be auto-logged as admin
   - No password required!

## Testing Authenticated Routes

All routes protected by `if (!$user)` will now pass automatically in dev mode:

- ✅ `/dashboard` - Management dashboard
- ✅ `/commands` - Command CRUD
- ✅ `/events` - Event handlers
- ✅ `/flows` - Flow builder
- ✅ `/system` - Admin system monitor
- ✅ `/ledger` - Audit logs
- ✅ `/rbac` - Role-based access control

## Production Mode

To disable development mode:

1. **Set ENVIRONMENT to production:**
   ```bash
   ENVIRONMENT=production
   ```

2. **Or remove ENVIRONMENT variable entirely:**
   ```bash
   unset ENVIRONMENT
   ```

3. The frontend will revert to standard authentication flow requiring:
   - Discord OAuth login
   - Valid credentials
   - 2FA verification (if enabled)

## API Mocking

In dev mode, the frontend bypasses API calls for auth endpoints. Backend endpoints for other features (commands, events, etc.) still require:

- Valid backend running on `http://localhost:3000`
- Proper database setup (PostgreSQL + Redis)
- Valid API responses

## Debugging Dev Mode

Check if dev mode is active:

```typescript
// In browser console
import.meta.env.DEV // true = dev mode enabled
import.meta.env.VITE_ENVIRONMENT // 'develop' = confirmed
```

Check the login page for the yellow banner:
```
🚀 DEVELOPMENT MODE - Auto-login enabled
```

## Notes

- Dev mode is **frontend-only** - backend still needs to run
- Dev user has full admin permissions
- Useful for rapid UI prototyping
- Remember to disable before committing to production!
- Database queries still happen normally (no mocking)

## Troubleshooting

**Not auto-logging in?**
- Check browser console for errors
- Verify `.env.local` exists in `apps/dashboard/`
- Clear browser cache: `Ctrl+Shift+Delete`
- Restart dev server: `pnpm run dev:all`

**Still asking for password?**
- Confirm `VITE_ENVIRONMENT=develop` is set
- Check that `import.meta.env.DEV` is `true`
- Verify login page shows the yellow dev banner

**API calls failing?**
- Ensure backend is running: `pnpm run dev:api`
- Check database connections are working
- Monitor `http://localhost:3000` for API responses
