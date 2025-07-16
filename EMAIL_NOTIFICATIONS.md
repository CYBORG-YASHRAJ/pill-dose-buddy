# DoseBuddy Email Notification System

## Overview
The DoseBuddy email notification system automatically sends email alerts when:
1. **New medications are added** to the system
2. **Doses are missed** by patients

## Configuration
- **Sender Email**: `piyushkumar40515@gmail.com`
- **Recipient Email**: `kritikadevgan2005@gmail.com` 
- **Email Service**: Gmail with App Password authentication

## Email Templates

### 1. Dose Created Notification
Sent when a new medication is added to DoseBuddy:
- **Subject**: `💊 DoseBuddy: New Medication Added`
- **Content**: Professional HTML template with medication details
- **Languages**: English, Hindi

### 2. Missed Dose Alert
Sent when a dose is missed:
- **Subject**: `⚠️ DoseBuddy: Missed Dose Alert`
- **Content**: Alert template with missed dose details and recommendations
- **Languages**: English, Hindi

## API Endpoints

### `/api/send-notification` - Send Email Notification
**Method**: `POST`

**Request Body**:
```json
{
  "type": "dose_created" | "dose_missed",
  "data": {
    "medicationName": "string",
    "dosage": "string",
    "schedule": "string", 
    "startDate": "string",
    "scheduledTime": "string",
    "missedDuration": "string",
    "memberName": "string",
    "recommendation": "string"
  },
  "language": "en" | "hi" | "ta" | "pa"
}
```

**Response**:
```json
{
  "success": true,
  "messageId": "string",
  "type": "string",
  "language": "string",
  "timestamp": "string",
  "recipient": "string"
}
```

### `/api/test-email` - Test Email Functionality
**Method**: `POST`

**Request Body**:
```json
{
  "type": "test_dose_created" | "test_dose_missed"
}
```

## Usage Examples

### 1. Manual API Call
```javascript
// Test dose created email
fetch('/api/test-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'test_dose_created' })
})

// Test missed dose email  
fetch('/api/test-email', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ type: 'test_dose_missed' })
})
```

### 2. Using Utility Functions
```javascript
import { notifyDoseCreated, notifyDoseMissed } from '@/lib/email-notifications'

// When creating a new medication
await notifyDoseCreated(
  'Aspirin 100mg',
  '1 tablet', 
  'Daily at 8:00 AM',
  '2024-01-15',
  'John Doe',
  'en'
)

// When a dose is missed
await notifyDoseMissed(
  'Aspirin 100mg',
  '8:00 AM',
  '2 hours',
  '1 tablet',
  'John Doe', 
  'Take your dose now since you are only 2 hours late.',
  'en'
)
```

### 3. Integration in Components
The email notification is automatically triggered in:
- **Enhanced Medication Form**: Sends notification when new medication is added
- **Dashboard**: Can be integrated to send missed dose alerts

## Email Templates Features

### Professional Design
- Gradient backgrounds with DoseBuddy branding
- Responsive HTML design
- Clear medication information tables
- Action recommendations for missed doses

### Multilingual Support
- English and Hindi templates included
- Tamil and Punjabi can be added following the same pattern
- Language-specific subjects and content

### Security Features
- Uses Gmail App Password (not regular password)
- Secure SMTP connection
- Error handling with fallback responses

## Testing

### Test Email Functionality
```bash
# Test dose created notification
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"type": "test_dose_created"}'

# Test missed dose notification  
curl -X POST http://localhost:3000/api/test-email \
  -H "Content-Type: application/json" \
  -d '{"type": "test_dose_missed"}'
```

### Manual Testing via Dashboard
1. Go to DoseBuddy dashboard
2. Add a new medication using the enhanced form
3. Check `kritikadevgan2005@gmail.com` for the notification email

## Error Handling
- Email failures don't prevent medication operations from completing
- Detailed error logging for debugging
- Graceful fallback when email service is unavailable

## Future Enhancements
1. **Missed Dose Detection**: Automatic detection of missed doses with scheduled email alerts
2. **Email Preferences**: User settings for email notification preferences  
3. **Multiple Recipients**: Support for multiple notification recipients
4. **SMS Integration**: Add SMS notifications alongside email
5. **Email Templates**: More template variations and customization options
