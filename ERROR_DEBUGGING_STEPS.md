# JSON Parsing Error - Complete Debugging Guide

## 🚨 Current Status: JSON Error Still Occurring

Despite the comprehensive fixes, you're still experiencing the JSON parsing error. Let's systematically debug this issue.

## 🔍 Step-by-Step Debugging Process

### Step 1: Verify Server is Running

1. **Check Terminal Output**:
   ```bash
   # Look for these messages in your terminal:
   # - "Ready in [time]ms"
   # - "Local: http://localhost:3000"
   # - "Network: http://[ip]:3000"
   ```

2. **Test Basic Server Response**:
   - Open browser to: `http://localhost:3000`
   - Should see the donation website
   - Check for server health indicator in top-right corner

### Step 2: Test API Endpoints Directly

1. **Test Health Endpoint**:
   ```
   http://localhost:3000/api/test
   ```
   **Expected**: JSON response with `{"status": "ok"}`
   **If you get HTML**: Server is not responding correctly

2. **Test Donation Endpoint**:
   - Open browser DevTools (F12)
   - Go to Console tab
   - Run this command:
   ```javascript
   fetch('/api/donations/submit', {
     method: 'POST',
     headers: {'Content-Type': 'application/json'},
     body: JSON.stringify({
       donorName: 'Test User',
       donorEmail: 'test@example.com',
       amount: 25,
       frequency: 'One-time',
       message: 'Test donation'
     })
   }).then(r => r.text()).then(console.log)
   ```

### Step 3: Check Network Tab

1. **Open DevTools → Network Tab**
2. **Fill out donation form and submit**
3. **Look for**:
   - Request to `/api/donations/submit`
   - Response Status (should be 200 or 4xx/5xx)
   - Response Headers (should include `content-type: application/json`)
   - Response Body (should be JSON, not HTML)

### Step 4: Check Console Logs

#### In Browser Console:
- ✅ "Starting donation submission..."
- ✅ "Donation data: {...}"
- ✅ "Response status: 200"
- ❌ "Server returned non-JSON response"

#### In Server Console (Terminal):
- ✅ "Donation saved to database: [ID]"
- ✅ "Gmail not configured, using fallback email method"
- ❌ "Donation submission error:"
- ❌ "JSON parsing error:"

## 🛠️ Common Issues and Solutions

### Issue 1: Server Not Started Properly

**Symptoms**: 
- Browser shows "This site can't be reached"
- Terminal shows errors during startup

**Solution**:
```bash
cd donations-microsite
rm -rf .next
npm install
npm run dev
```

### Issue 2: Port Conflicts

**Symptoms**: 
- Server starts on different port (3001, 3002, etc.)
- Browser trying to connect to wrong port

**Solution**:
- Check terminal for actual port
- Update browser URL to correct port

### Issue 3: Build/Compilation Errors

**Symptoms**: 
- Terminal shows TypeScript errors
- Server fails to start
- Error 500 responses

**Solution**:
```bash
# Check for TypeScript errors:
npx tsc --noEmit

# Clear cache and rebuild:
rm -rf .next
npm run dev
```

### Issue 4: API Route Issues

**Symptoms**: 
- 404 errors for API routes
- HTML error pages instead of JSON

**Solution**:
- Verify file exists: `src/app/api/donations/submit/route.ts`
- Check file syntax and exports
- Restart development server

## 🔧 Manual Testing Steps

### Test 1: Direct API Call

```bash
# Using curl (if available):
curl -X POST http://localhost:3000/api/test \
  -H "Content-Type: application/json" \
  -d '{"test": "data"}'

# Should return JSON, not HTML
```

### Test 2: Browser Test

```javascript
// In browser console:
async function testAPI() {
  try {
    const response = await fetch('/api/test');
    const contentType = response.headers.get('content-type');
    console.log('Content-Type:', contentType);
    
    if (contentType?.includes('application/json')) {
      const data = await response.json();
      console.log('JSON Response:', data);
    } else {
      const text = await response.text();
      console.log('HTML Response:', text);
    }
  } catch (error) {
    console.error('Error:', error);
  }
}

testAPI();
```

## 📊 Expected vs Actual Behavior

### Expected (Working):
1. **Server Health Check**: Green checkmark appears
2. **Donation Form**: Submits successfully
3. **API Response**: Returns JSON with success message
4. **Console**: Shows proper debugging logs
5. **Network Tab**: Shows JSON responses

### Actual (Broken):
1. **Server Health Check**: Red error indicator
2. **Donation Form**: JSON parsing error
3. **API Response**: Returns HTML error page
4. **Console**: Shows JSON parsing errors
5. **Network Tab**: Shows HTML instead of JSON

## 🚨 Emergency Fixes

### Fix 1: Restart Everything

```bash
# Kill any running processes
Ctrl+C (in terminal)

# Clear everything
rm -rf .next node_modules
npm install
npm run dev
```

### Fix 2: Check File Permissions

```bash
# Ensure files are readable
ls -la src/app/api/donations/submit/route.ts
```

### Fix 3: Check Next.js Configuration

```bash
# Verify next.config.js/ts is correct
cat next.config.js
```

## 📞 Report Back

After running these tests, please share:

1. **Terminal output** when starting server
2. **Browser console** messages when testing
3. **Network tab** screenshots showing API responses
4. **Server health check** status (red/green)
5. **Any error messages** you see

This will help identify the exact cause of the JSON parsing error!





