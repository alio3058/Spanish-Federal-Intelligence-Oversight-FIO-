# 🔐 Authentication Quick Reference

## Login Credentials

### Standard User
```
Username: girasol.rojo
Password: (authentication required)
```

### Administrator
```
Username: rafael.vega
Password: (authentication required)
```

---

## Key Differences

| Feature | girasol.rojo | rafael.vega |
|---------|-------------|-------------|
| **Clearance** | SECRET | TS/SCI |
| **Restricted Access** | ❌ Denied | ✅ Granted |
| **Admin Controls** | ❌ Hidden | ✅ Visible |
| **Admin Override** | ❌ No | ✅ Yes |
| **Security Incident** | ⚠️ Yes | ✅ Clear |
| **Bypass Restrictions** | ❌ No | ✅ Yes |

---

## Testing Scenarios

### Test 1: Standard User Restrictions
1. Login as `girasol.rojo`
2. Security incident popup should appear
3. Navigate to "Restricted" tab
4. Try to open a document
5. **Expected:** Access denied message

### Test 2: Admin Full Access
1. Login as `rafael.vega`
2. No incident popup
3. "Administrator Mode" badge visible
4. Navigate to "Restricted" tab
5. Open document → Admin override button visible
6. **Expected:** Document opens with override

### Test 3: UI Visibility
- Standard user: No admin controls visible
- Administrator: Admin badge + override buttons visible

---

## Quick Actions

**Logout:** Click the 🚪 button in header  
**Switch Users:** Logout and login with different credentials  
**Admin Override:** Use the blue "🔓 Admin Override" button in modals

---

## Files Modified

- `js/auth.js` - Authentication system
- `js/components/RestrictedComponent.js` - Permission checks
- `index.html` - Login integration + admin controls
- `style.css` - Authentication UI styles
- `AUTHENTICATION_SYSTEM_DOCS.md` - Full documentation

---

**Status:** ✅ Implementation Complete
