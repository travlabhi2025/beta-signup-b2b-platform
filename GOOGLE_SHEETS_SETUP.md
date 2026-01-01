# Google Sheets Setup Guide

This guide will help you set up Google Sheets integration to track beta signups and email verification status.

## Overview

The system sends user data to Google Sheets in two scenarios:
1. **Initial Signup**: When a user first signs up (with `emailVerified: false`)
2. **Email Verification Update**: When a user verifies their email (updates `emailVerified: true`)

## Step 1: Create Your Google Sheet

1. Go to [Google Sheets](https://sheets.google.com)
2. Create a new spreadsheet
3. Name it something like "TripAbhi Beta Signups"

## Step 2: Set Up Column Headers

In the first row (Row 1), add these column headers in order:

| Column A | Column B | Column C | Column D | Column E | Column F | Column G | Column H | Column I |
|----------|----------|----------|----------|----------|----------|----------|----------|----------|
| Timestamp | First Name | Last Name | Email | Phone Number | Company Name | Trips Per Year | User ID | Email Verified |

**Important**: The exact column order matters! Make sure they match exactly as shown above.

## Step 3: Create Google Apps Script

1. In your Google Sheet, click **Extensions** → **Apps Script**
2. Delete any existing code
3. Copy and paste the following script:

```javascript
function doPost(e) {
  try {
    const sheet = SpreadsheetApp.getActiveSpreadsheet().getActiveSheet();
    const data = JSON.parse(e.postData.contents);
    
    // Optional: Verify token if configured
    if (data.token && data.token !== 'YOUR_SECRET_TOKEN') {
      return ContentService.createTextOutput(JSON.stringify({
        success: false,
        error: 'Invalid token'
      })).setMimeType(ContentService.MimeType.JSON);
    }
    
    // Handle different actions
    if (data.action === 'updateEmailVerified') {
      // Update existing row based on userId
      return updateEmailVerified(sheet, data);
    } else if (data.action === 'create' || !data.action) {
      // Create new row (initial signup)
      return createNewRow(sheet, data);
    }
    
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Invalid action'
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

function createNewRow(sheet, data) {
  try {
    // Get the next empty row
    const nextRow = sheet.getLastRow() + 1;
    
    // Prepare row data in the correct column order:
    // Timestamp | First Name | Last Name | Email | Phone Number | Company Name | Trips Per Year | User ID | Email Verified
    const rowData = [
      new Date(), // Timestamp
      data.firstName || '',
      data.lastName || '',
      data.email || '',
      data.phoneNumber || '',
      data.companyName || '',
      data.tripsPerYear || '',
      data.userId || '',
      data.emailVerified === true ? 'TRUE' : 'FALSE' // Email Verified (as text for consistency)
    ];
    
    // Write data to the sheet
    sheet.getRange(nextRow, 1, 1, rowData.length).setValues([rowData]);
    
    return ContentService.createTextOutput(JSON.stringify({
      success: true,
      message: 'Row added successfully',
      row: nextRow
    })).setMimeType(ContentService.MimeType.JSON);
    
  } catch (error) {
    return ContentService.createTextOutput(JSON.stringify({
      success: false,
      error: 'Failed to create row: ' + error.toString()
    })).setMimeType(ContentService.MimeType.JSON);
  }
}

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

## Step 4: Deploy as Web App

1. Click **Deploy** → **New deployment**
2. Click the gear icon ⚙️ next to "Select type"
3. Choose **Web app**
4. Configure:
   - **Description**: "Beta Signup API"
   - **Execute as**: "Me"
   - **Who has access**: "Anyone" (or "Anyone with Google account" for more security)
5. Click **Deploy**
6. **Copy the Web App URL** - you'll need this for your environment variable
7. Click **Authorize access** and grant permissions

## Step 5: Set Up Environment Variables

Add these to your `.env.local` file:

```env
NEXT_PUBLIC_GOOGLE_SHEETS_WEB_APP_URL=https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec
NEXT_PUBLIC_GOOGLE_SHEETS_TOKEN=your_optional_secret_token_here
```

**Note**: 
- Replace `YOUR_SCRIPT_ID` with the actual ID from your Web App URL
- The token is optional but recommended for security
- If using a token, update `YOUR_SECRET_TOKEN` in the Apps Script code

## Step 6: Test the Integration

1. Sign up a test user through your application
2. Check your Google Sheet - a new row should appear with `Email Verified` = FALSE
3. Verify the email using the OTP on the next-steps page
4. Check your Google Sheet again - the `Email Verified` column should update to TRUE

## Troubleshooting

### Issue: Data not appearing in sheet
- Check that the Web App URL is correct in your `.env.local`
- Verify the Apps Script is deployed and has proper permissions
- Check the Apps Script execution logs: **Executions** in the Apps Script editor

### Issue: Email Verified not updating
- Ensure the `userId` matches exactly (case-sensitive)
- Check that column I (Email Verified) exists
- Verify the script can find the user row by checking execution logs

### Issue: Permission errors
- Make sure the Web App is deployed with "Anyone" access
- Re-authorize the script if needed
- Check that the script has permission to edit the sheet

## Column Reference

For easy reference, here's what each column stores:

- **Column A (1)**: Timestamp - When the signup/verification occurred
- **Column B (2)**: First Name
- **Column C (3)**: Last Name
- **Column D (4)**: Email
- **Column E (5)**: Phone Number
- **Column F (6)**: Company Name
- **Column G (7)**: Trips Per Year
- **Column H (8)**: User ID (Firebase UID)
- **Column I (9)**: Email Verified (TRUE/FALSE)

## Security Best Practices

1. **Use a token**: Set `NEXT_PUBLIC_GOOGLE_SHEETS_TOKEN` and update the script to verify it
2. **Limit access**: Use "Anyone with Google account" instead of "Anyone" if possible
3. **Regular backups**: Export your sheet periodically
4. **Monitor access**: Check execution logs regularly for suspicious activity

## Advanced: Formatting the Sheet

You can add formatting to make the sheet more readable:

1. **Freeze header row**: View → Freeze → 1 row
2. **Format Email Verified column**: Use conditional formatting:
   - Select column I
   - Format → Conditional formatting
   - If text is "TRUE", make it green
   - If text is "FALSE", make it red
3. **Auto-resize columns**: Select all columns → Format → Auto-fit column width

