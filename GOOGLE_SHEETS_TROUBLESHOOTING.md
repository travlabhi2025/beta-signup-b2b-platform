# Google Sheets Update Troubleshooting Guide

If Google Sheets updates aren't working, follow these steps to diagnose and fix the issue.

## Common Issues and Solutions

### Issue 1: User ID Not Found

**Symptoms**: Error message "User ID not found in sheet"

**Possible Causes**:
1. User ID wasn't saved correctly during initial signup
2. User ID format mismatch (whitespace, case sensitivity)
3. Column H (User ID) is empty or has different data

**Solutions**:
1. **Check the User ID column**: 
   - Open your Google Sheet
   - Check column H (User ID) for the user's ID
   - Verify it matches exactly (no extra spaces, correct case)

2. **Verify initial signup worked**:
   - Check if the user's row exists in the sheet
   - Verify all columns are populated correctly

3. **Update the Google Apps Script** to handle edge cases:
   ```javascript
   // In updateEmailVerified function, add trimming:
   const cellValue = sheet.getRange(row, userIdColumn).getValue().toString().trim();
   if (cellValue === data.userId.trim()) {
     // Found the row
   }
   ```

### Issue 2: Action Not Recognized

**Symptoms**: Error message "Invalid action" or update doesn't happen

**Possible Causes**:
1. The `action` field isn't being sent correctly
2. Google Apps Script isn't recognizing the action

**Solutions**:
1. **Check the payload being sent**:
   - Look at browser console or server logs
   - Verify `action: "updateEmailVerified"` is included

2. **Verify Google Apps Script code**:
   - Make sure the script checks for `data.action === 'updateEmailVerified'`
   - Check that the script is deployed and up to date

### Issue 3: Permission Errors

**Symptoms**: 403 or permission denied errors

**Possible Causes**:
1. Google Apps Script Web App permissions
2. Token mismatch (if using token authentication)

**Solutions**:
1. **Re-deploy the Web App**:
   - Go to Apps Script editor
   - Deploy → Manage deployments
   - Edit deployment → Set "Execute as" to "Me"
   - Set "Who has access" to "Anyone" (or "Anyone with Google account")

2. **Check token** (if using):
   - Verify `NEXT_PUBLIC_GOOGLE_SHEETS_TOKEN` matches the token in your script
   - Update the script to verify the token correctly

### Issue 4: Column Mismatch

**Symptoms**: Data updates to wrong column or doesn't update

**Possible Causes**:
1. Column order changed in the sheet
2. Column indices don't match

**Solutions**:
1. **Verify column order**:
   - Column A (1): Timestamp
   - Column B (2): First Name
   - Column C (3): Last Name
   - Column D (4): Email
   - Column E (5): Phone Number
   - Column F (6): Company Name
   - Column G (7): Trips Per Year
   - Column H (8): User ID
   - Column I (9): Email Verified

2. **Update Google Apps Script** if columns changed:
   ```javascript
   const userIdColumn = 8; // Column H
   const emailVerifiedColumn = 9; // Column I
   ```

### Issue 5: Timestamp Not Updating

**Symptoms**: Email Verified updates but timestamp doesn't change

**Possible Causes**:
1. Column A (Timestamp) update failing silently
2. Date format issues

**Solutions**:
1. **Check if timestamp column is protected**:
   - Right-click column A → Check if "Protect range" is enabled
   - If protected, remove protection or allow script to edit

2. **Verify date format**:
   - The script uses `new Date()` which should work
   - Check if the sheet has date formatting applied

## Debugging Steps

### Step 1: Check Server Logs

Look for console.log/console.error messages:
- Check if the API route is being called
- Check if the payload is correct
- Check if Google Sheets API returns errors

### Step 2: Test Google Apps Script Directly

1. Open Apps Script editor
2. Add a test function:
   ```javascript
   function testUpdate() {
     const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
     const testData = {
       userId: "test-user-id-123",
       email: "test@example.com",
       emailVerified: true,
       action: "updateEmailVerified"
     };
     const result = updateEmailVerified(sheet, testData);
     Logger.log(result.getContent());
   }
   ```
3. Run the test function
4. Check Execution log for errors

### Step 3: Check Network Requests

1. Open browser DevTools → Network tab
2. Trigger email verification
3. Look for `/api/update-sheets-email-verified` request
4. Check:
   - Request payload
   - Response status
   - Response body

### Step 4: Verify Environment Variables

Check that these are set correctly:
```env
NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_GOOGLE_SHEETS_TOKEN=your_token_here (optional)
NEXT_PUBLIC_APP_URL=https://your-domain.com (for API calls)
```

### Step 5: Test with Manual API Call

Use curl or Postman to test the update endpoint directly:

```bash
curl -X POST https://your-domain.com/api/update-sheets-email-verified \
  -H "Content-Type: application/json" \
  -d '{
    "userId": "test-user-id",
    "email": "test@example.com",
    "emailVerified": true
  }'
```

## Improved Google Apps Script Code

Here's an improved version of the `updateEmailVerified` function with better error handling:

```javascript
function updateEmailVerified(sheet, data) {
  try {
    // Find the row with matching userId (column H, which is column 8)
    const userIdColumn = 8; // Column H
    const emailVerifiedColumn = 9; // Column I
    
    const lastRow = sheet.getLastRow();
    
    if (lastRow < 2) {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'No data rows found in sheet'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Search for the userId in column H (trim whitespace for comparison)
    const searchUserId = String(data.userId || '').trim();
    
    for (let row = 2; row <= lastRow; row++) {
      const cellValue = String(sheet.getRange(row, userIdColumn).getValue() || '').trim();
      
      if (cellValue === searchUserId) {
        // Found the row, update emailVerified column
        const verifiedValue = data.emailVerified === true ? 'TRUE' : 'FALSE';
        sheet.getRange(row, emailVerifiedColumn).setValue(verifiedValue);
        
        // Also update timestamp to show when verification happened
        sheet.getRange(row, 1).setValue(new Date());
        
        return ContentService.createTextOutput(JSON.stringify({
          success: true,
          message: 'Email verification status updated',
          row: row,
          userId: searchUserId,
          emailVerified: verifiedValue
        })).setMimeType(ContentService.MimeType.JSON);
      }
    }
    
    // If userId not found, return error with helpful message
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'User ID not found in sheet',
      searchedUserId: searchUserId,
      lastRow: lastRow
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Failed to update email verification: ' + error.toString(),
      stack: error.stack
    })).setMimeType(ContentService.MimeType.JSON);
  }
}
```

## Quick Fix Checklist

- [ ] Verify Google Apps Script is deployed and active
- [ ] Check that column H contains User IDs
- [ ] Verify column I exists for Email Verified
- [ ] Check environment variables are set correctly
- [ ] Test with a known User ID from the sheet
- [ ] Check Apps Script execution logs for errors
- [ ] Verify Web App permissions allow "Anyone" to execute
- [ ] Check if token matches (if using token authentication)
- [ ] Verify NEXT_PUBLIC_APP_URL is set correctly

## Getting More Help

If issues persist:
1. Check Apps Script execution logs: Apps Script Editor → Executions
2. Enable detailed logging in the API routes
3. Test the Google Apps Script function directly
4. Verify the sheet structure matches the expected format

