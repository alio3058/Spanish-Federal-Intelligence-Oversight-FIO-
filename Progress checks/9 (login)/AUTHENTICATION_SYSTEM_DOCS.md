# Authentication System Documentation

## Overview

A comprehensive role-based access control (RBAC) system has been implemented for the ARCHIVE-X Intelligence Platform, featuring two user accounts with distinct permission levels and security features.

---

## 👤 USER ACCOUNTS

### 1. Standard User - Agent Girasol Rojo

**Username:** `girasol.rojo`  
**Password:** (authentication required)  
**Agent Name:** Agent Girasol Rojo  
**Role:** Standard User  
**Clearance Level:** SECRET  
**Profile Initials:** GR

#### Permissions
- ❌ **Cannot** access restricted/top secret documents
- ❌ **Cannot** bypass access controls
- ❌ **Cannot** view admin-only controls
- ✅ **Can** access standard system features
- ⚠️ **Receives** access denied messages when attempting restricted actions

#### Security Status
- **Incident Flag:** YES
- **Incident Type:** Classified Document Leak
- **Status:** Under Investigation
- **Monitoring:** All access is actively logged and monitored

---

### 2. Administrator - Agent Rafael Vega

**Username:** `rafael.vega`  
**Password:** (authentication required)  
**Agent Name:** Agent Rafael Vega  
**Role:** Full Administrator  
**Clearance Level:** TS/SCI  
**Profile Initials:** RV

#### Permissions
- ✅ **Full** unrestricted system access
- ✅ **Can** open all documents, including restricted and top secret
- ✅ **Can** bypass access restrictions using admin override
- ✅ **Can** view and use admin-only controls
- ✅ **No** access restrictions

#### Security Status
- **Incident Flag:** NO
- **Status:** Clear
- **Special Features:** Admin clearance badge with glow effect

---

## 🚨 SECURITY INCIDENT POP-UP

### Trigger Condition
When `girasol.rojo` logs into the system, a security incident alert automatically appears.

### Pop-Up Content
- **Agent Name:** Agent Girasol Rojo
- **Incident Type:** Classified Document Leak
- **Status:** Under Investigation
- **Message:** Detailed warning about unauthorized disclosure of classified information
- **Notice:** Account under active monitoring by Internal Threat Division

### Pop-Up Features
- ✅ Appears automatically on login
- ✅ Visually urgent (warning/alert style with red accents)
- ✅ Can be closed with X button or ESC key
- ✅ Does not permanently lock the user
- ✅ Does not break navigation

---

## 🛠️ ADMIN-ONLY UI FEATURES

### Header Administrator Badge
When logged in as `rafael.vega`, the following appears in the header:
- **Badge:** "🔓 Administrator Mode"
- **Status:** "Unrestricted Access" (green)
- **Effect:** Animated glow on clearance badge

### Admin Override Button
Available in restricted document modals for administrators:
- **Location:** Document detail modals in Restricted section
- **Button Text:** "🔓 Admin Override"
- **Function:** Bypasses all access restrictions
- **Visual:** Blue gradient with sweep animation
- **Behavior:** Hidden from standard users

---

## 🔐 ROLE-BASED BEHAVIOR

### Permission Checks
The system implements the following permission checks:

#### For Standard Users (girasol.rojo)
1. **Restricted Content Access:** Blocked with access denied message
2. **Admin Controls:** Hidden from UI
3. **Document Opening:** Requires proper clearance
4. **System Message:** Personalized with agent name

#### For Administrators (rafael.vega)
1. **Restricted Content Access:** Full access granted
2. **Admin Controls:** Visible and functional
3. **Document Opening:** Can use override to bypass restrictions
4. **Visual Indicators:** Admin clearance badge with special styling

### UI Visibility Rules
```javascript
// Admin-only elements use the class:
.admin-only-control {
    display: none; // Hidden by default
}

// Shown only when user is administrator:
if (authManager.isAdmin()) {
    element.style.display = 'flex';
}
```

---

## 📋 TECHNICAL IMPLEMENTATION

### Authentication Manager (`js/auth.js`)

#### Core Methods
- `init()` - Initialize authentication system and login modal
- `login(username)` - Authenticate user and update UI
- `logout()` - Clear session and return to login
- `hasPermission(permission)` - Check specific permission
- `isAdmin()` - Check if current user is administrator
- `canAccessRestricted()` - Check restricted access permission
- `showAccessDenied(message)` - Display access denied modal
- `updateUserInterface()` - Update header with user info
- `updateAdminControls()` - Show/hide admin UI elements

#### User Data Structure
```javascript
{
    username: 'girasol.rojo',
    agentName: 'Agent Girasol Rojo',
    role: 'standard',
    clearance: 'SECRET',
    profileInitials: 'GR',
    permissions: {
        canAccessRestricted: false,
        canBypassRestrictions: false,
        canAccessTopSecret: false,
        canViewAdminControls: false
    },
    securityFlags: {
        hasIncident: true,
        incidentType: 'CLASSIFIED_DOCUMENT_LEAK',
        incidentStatus: 'UNDER_INVESTIGATION'
    }
}
```

### Permission Integration

#### RestrictedComponent Updates
- Added `openDocumentViewer()` permission check
- Added `openDocumentViewerWithOverride()` for admin bypass
- Admin override button in detail modals
- Personalized access denied messages

### CSS Styling

#### New Styles Added
- Login modal styling
- Security incident modal with animations
- Admin clearance badge glow effect
- Admin-only control styling with sweep animation
- Logout button styling
- Responsive layouts for modals

---

## 🎨 VISUAL FEATURES

### Login Modal
- Clean, professional design
- Available accounts listed
- Username/password inputs
- Error message display
- Helpful hints for testing

### Security Incident Alert
- Urgent red color scheme
- Pulsing warning icon animation
- Structured incident information
- Warning message highlighting
- Professional modal design

### Admin Controls
- Blue gradient styling
- Sweep animation effect
- Glowing clearance badge
- Hover effects and transitions
- Clear visual hierarchy

---

## 🔄 WORKFLOW

### Login Process
1. Page loads → Authentication system initializes
2. Login modal appears
3. User enters username (password can be anything)
4. System validates username
5. User session created
6. UI updates with user information
7. If `girasol.rojo`: Security incident popup appears
8. Navigation system initializes
9. User can access the system based on role

### Access Control Flow
1. User attempts to access restricted content
2. System checks `authManager.canAccessRestricted()`
3. If permitted: Content opens
4. If denied: Access denied modal appears with personalized message
5. If admin: Admin override button available

### Logout Process
1. User clicks logout button
2. Confirmation dialog appears
3. User session cleared
4. UI reset to defaults
5. Login modal reappears

---

## 🧪 TESTING GUIDE

### Testing Standard User (girasol.rojo)
1. Login with username: `girasol.rojo`
2. Verify security incident popup appears
3. Navigate to "Restricted" section
4. Click any document
5. Click "Open Full Document"
6. Verify access denied message appears
7. Check that admin controls are NOT visible

### Testing Administrator (rafael.vega)
1. Login with username: `rafael.vega`
2. Verify no incident popup appears
3. Verify "Administrator Mode" badge in header
4. Navigate to "Restricted" section
5. Click any document
6. Verify "Admin Override" button is visible
7. Click "Admin Override" - document should open
8. Check admin clearance badge has glow effect

---

## 🚀 FEATURES IMPLEMENTED

✅ Two user accounts with distinct roles  
✅ Role-based permission system  
✅ Login/logout functionality  
✅ Security incident popup for flagged users  
✅ Admin-only UI controls  
✅ Admin override functionality  
✅ Restricted access for standard users  
✅ Access denied messages  
✅ Dynamic UI updates based on role  
✅ Professional styling and animations  
✅ Clean, expandable permission system  
✅ No hardcoded role assumptions  
✅ Entirely fictional content  

---

## 📝 NOTES

- System is entirely fictional for creative/educational purposes
- No real-world security data or agencies referenced
- Password validation is simplified for demonstration
- All security incidents are fictional
- System designed to be easily expandable with new users/roles

---

## 🔧 EXTENSIBILITY

### Adding New Users
Edit `js/auth.js` and add to the `users` object:

```javascript
'new.username': {
    username: 'new.username',
    agentName: 'Agent Name',
    role: 'standard' | 'administrator',
    clearance: 'CLEARANCE_LEVEL',
    profileInitials: 'XX',
    permissions: { /* ... */ },
    securityFlags: { /* ... */ }
}
```

### Adding New Permissions
1. Add permission to user's `permissions` object
2. Create check method in `AuthenticationManager`
3. Apply checks in relevant components
4. Update UI visibility rules

### Adding New Roles
1. Define role in user object
2. Create role-specific permission sets
3. Add role-specific UI elements
4. Implement role-specific behaviors

---

**Implementation Complete** ✅  
**Date:** January 20, 2026  
**System:** ARCHIVE-X Intelligence Platform  
**Version:** 1.0.0
