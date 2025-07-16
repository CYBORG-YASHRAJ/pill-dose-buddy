// Email notification utility for DoseBuddy
export interface NotificationData {
  medicationName: string
  dosage?: string
  schedule?: string
  startDate?: string
  scheduledTime?: string
  missedDuration?: string
  memberName?: string
  recommendation?: string
}

export type NotificationType = 'dose_created' | 'dose_missed'
export type Language = 'en' | 'hi' | 'ta' | 'pa'

export async function sendNotification(
  type: NotificationType,
  data: NotificationData,
  language: Language = 'en'
): Promise<{ success: boolean; error?: string; messageId?: string }> {
  try {
    const response = await fetch('/api/send-notification', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        type,
        data,
        language
      }),
    })

    const result = await response.json()
    
    if (!response.ok) {
      return {
        success: false,
        error: result.error || 'Failed to send notification'
      }
    }

    return {
      success: true,
      messageId: result.messageId
    }
  } catch (error) {
    console.error('Notification utility error:', error)
    return {
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    }
  }
}

// Convenience functions for specific notification types
export async function notifyDoseCreated(
  medicationName: string,
  dosage: string,
  schedule: string,
  startDate: string,
  memberName?: string,
  language: Language = 'en'
) {
  return sendNotification('dose_created', {
    medicationName,
    dosage,
    schedule,
    startDate,
    memberName
  }, language)
}

export async function notifyDoseMissed(
  medicationName: string,
  scheduledTime: string,
  missedDuration: string,
  dosage?: string,
  memberName?: string,
  recommendation?: string,
  language: Language = 'en'
) {
  return sendNotification('dose_missed', {
    medicationName,
    scheduledTime,
    missedDuration,
    dosage,
    memberName,
    recommendation
  }, language)
}

// Example usage:
/*
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
*/
