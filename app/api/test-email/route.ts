import { NextRequest, NextResponse } from 'next/server'
import { notifyDoseCreated, notifyDoseMissed } from '@/lib/email-notifications'

export async function POST(request: NextRequest) {
  try {
    const { type } = await request.json()

    if (type === 'test_dose_created') {
      // Test dose created notification
      const result = await notifyDoseCreated(
        'Aspirin 100mg',
        '1 tablet',
        'Daily at 08:00',
        new Date().toISOString().split('T')[0],
        'John Doe',
        'en'
      )

      return NextResponse.json({
        success: result.success,
        message: 'Test dose created email sent',
        details: result
      })
    }

    if (type === 'test_dose_missed') {
      // Test missed dose notification
      const result = await notifyDoseMissed(
        'Aspirin 100mg',
        '08:00 AM',
        '2 hours',
        '1 tablet',
        'John Doe',
        'Take your dose now since you are only 2 hours late.',
        'en'
      )

      return NextResponse.json({
        success: result.success,
        message: 'Test missed dose email sent',
        details: result
      })
    }

    return NextResponse.json({
      error: 'Invalid test type. Use "test_dose_created" or "test_dose_missed"'
    }, { status: 400 })

  } catch (error) {
    console.error('Test email error:', error)
    return NextResponse.json({
      success: false,
      error: 'Failed to send test email',
      details: error instanceof Error ? error.message : 'Unknown error'
    }, { status: 500 })
  }
}
