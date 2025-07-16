import { Next// Create transporter for Gmail
const createTransporter = () => {
  if (!SENDER_EMAIL || !SENDER_PASSWORD) {
    throw new Error('Email credentials not configured')
  }
  
  return nodemailer.createTransporter({
    service: 'gmail',
    auth: {
      user: SENDER_EMAIL,
      pass: SENDER_PASSWORD
    }
  })
} NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

// Email configuration from environment variables
const SENDER_EMAIL = process.env.EMAIL_SENDER
const SENDER_PASSWORD = process.env.EMAIL_PASSWORD
const RECIPIENT_EMAIL = process.env.EMAIL_RECIPIENT

// Validate environment variables
if (!SENDER_EMAIL || !SENDER_PASSWORD || !RECIPIENT_EMAIL) {
  console.error('Missing email configuration in environment variables')
}

// Create transporter for Gmail
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: SENDER_EMAIL,
    pass: SENDER_PASSWORD
  }
})

export async function POST(request: NextRequest) {
  try {
    // Check if email configuration is available
    if (!SENDER_EMAIL || !SENDER_PASSWORD || !RECIPIENT_EMAIL) {
      return NextResponse.json({ 
        error: 'Email configuration not properly set in environment variables' 
      }, { status: 500 })
    }

    const { type, data, language = 'en' } = await request.json()

    // Validate required fields
    if (!type || !data) {
      return NextResponse.json({ 
        error: 'Missing required fields: type and data' 
      }, { status: 400 })
    }

    // Email templates based on notification type and language
    const emailTemplates = {
      dose_created: {
        en: {
          subject: '💊 DoseBuddy: New Medication Added',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
              <div style="background: white; color: #333; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #4285f4; margin: 0; font-size: 28px;">🏥 DoseBuddy</h1>
                  <p style="color: #666; margin: 5px 0 0 0;">AI-Powered Medication Management</p>
                </div>
                
                <div style="background: #f8f9ff; padding: 25px; border-radius: 10px; border-left: 5px solid #4285f4; margin-bottom: 25px;">
                  <h2 style="color: #4285f4; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">💊</span>
                    New Medication Added
                  </h2>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Medication:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #4285f4; font-weight: bold;">${data.medicationName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Dosage:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.dosage}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Schedule:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.schedule}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Start Date:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.startDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>Member:</strong></td>
                        <td style="padding: 8px 0; color: #6c5ce7; font-weight: bold;">${data.memberName || 'Primary'}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #27ae60;">
                      <strong>✅ Medication successfully added to DoseBuddy system</strong>
                    </p>
                  </div>
                  <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
                    This medication has been added to the smart monitoring system. You'll receive alerts for doses and adherence tracking.
                  </p>
                  <div style="text-align: center;">
                    <span style="background: #4285f4; color: white; padding: 10px 20px; border-radius: 25px; text-decoration: none; display: inline-block; font-weight: bold;">
                      📱 DoseBuddy Dashboard
                    </span>
                  </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    This is an automated notification from DoseBuddy AI • Time: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          `
        },
        hi: {
          subject: '💊 डोज़बडी: नई दवा जोड़ी गई',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
              <div style="background: white; color: #333; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #4285f4; margin: 0; font-size: 28px;">🏥 डोज़बडी</h1>
                  <p style="color: #666; margin: 5px 0 0 0;">AI-संचालित दवा प्रबंधन</p>
                </div>
                
                <div style="background: #f8f9ff; padding: 25px; border-radius: 10px; border-left: 5px solid #4285f4; margin-bottom: 25px;">
                  <h2 style="color: #4285f4; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">💊</span>
                    नई दवा जोड़ी गई
                  </h2>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>दवा:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #4285f4; font-weight: bold;">${data.medicationName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>खुराक:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.dosage}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>समय-सारणी:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.schedule}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>शुरुआती तारीख:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.startDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>सदस्य:</strong></td>
                        <td style="padding: 8px 0; color: #6c5ce7; font-weight: bold;">${data.memberName || 'प्राथमिक'}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #27ae60;">
                      <strong>✅ दवा सफलतापूर्वक डोज़बडी सिस्टम में जोड़ी गई</strong>
                    </p>
                  </div>
                  <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
                    यह दवा स्मार्ट निगरानी सिस्टम में जोड़ दी गई है। आपको खुराक और पालन ट्रैकिंग के लिए अलर्ट मिलेंगे।
                  </p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    यह डोज़बडी AI से एक स्वचालित अधिसूचना है • समय: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          `
        },
        ta: {
          subject: '💊 டோஸ்பட்டி: புதிய மருந்து சேர்க்கப்பட்டது',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
              <div style="background: white; color: #333; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #4285f4; margin: 0; font-size: 28px;">🏥 டோஸ்பட்டி</h1>
                  <p style="color: #666; margin: 5px 0 0 0;">AI-இயங்கும் மருந்து மேலாண்மை</p>
                </div>
                
                <div style="background: #f8f9ff; padding: 25px; border-radius: 10px; border-left: 5px solid #4285f4; margin-bottom: 25px;">
                  <h2 style="color: #4285f4; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">💊</span>
                    புதிய மருந்து சேர்க்கப்பட்டது
                  </h2>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>மருந்து:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #4285f4; font-weight: bold;">${data.medicationName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>மருந்தளவு:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.dosage}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>கால அட்டவணை:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.schedule}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>தொடக்க தேதி:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.startDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>உறுப்பினர்:</strong></td>
                        <td style="padding: 8px 0; color: #6c5ce7; font-weight: bold;">${data.memberName || 'முதன்மை'}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #27ae60;">
                      <strong>✅ மருந்து வெற்றிகரமாக டோஸ்பட்டி அமைப்பில் சேர்க்கப்பட்டது</strong>
                    </p>
                  </div>
                  <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
                    இந்த மருந்து ஸ்மார்ட் கண்காணிப்பு அமைப்பில் சேர்க்கப்பட்டுள்ளது. டோஸ் மற்றும் பின்பற்றுதல் கண்காணிப்புக்கான எச்சரிக்கைகளைப் பெறுவீர்கள்.
                  </p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    இது டோஸ்பட்டி AI இலிருந்து ஒரு தானியங்கி அறிவிப்பு • நேரம்: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          `
        },
        pa: {
          subject: '💊 ਡੋਜ਼ਬਡੀ: ਨਵੀਂ ਦਵਾਈ ਸ਼ਾਮਲ ਕੀਤੀ ਗਈ',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #667eea 0%, #764ba2 100%); color: white;">
              <div style="background: white; color: #333; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #4285f4; margin: 0; font-size: 28px;">🏥 ਡੋਜ਼ਬਡੀ</h1>
                  <p style="color: #666; margin: 5px 0 0 0;">AI-ਸੰਚਾਲਿਤ ਦਵਾਈ ਪ੍ਰਬੰਧਨ</p>
                </div>
                
                <div style="background: #f8f9ff; padding: 25px; border-radius: 10px; border-left: 5px solid #4285f4; margin-bottom: 25px;">
                  <h2 style="color: #4285f4; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">💊</span>
                    ਨਵੀਂ ਦਵਾਈ ਸ਼ਾਮਲ ਕੀਤੀ ਗਈ
                  </h2>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>ਦਵਾਈ:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #4285f4; font-weight: bold;">${data.medicationName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>ਖੁਰਾਕ:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.dosage}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>ਸਮਾਂ-ਸਾਰਣੀ:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.schedule}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>ਸ਼ੁਰੂਆਤੀ ਤਾਰੀਖ:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.startDate}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>ਮੈਂਬਰ:</strong></td>
                        <td style="padding: 8px 0; color: #6c5ce7; font-weight: bold;">${data.memberName || 'ਮੁੱਖ'}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <div style="background: #e8f5e8; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #27ae60;">
                      <strong>✅ ਦਵਾਈ ਸਫਲਤਾਪੂਰਵਕ ਡੋਜ਼ਬਡੀ ਸਿਸਟਮ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤੀ ਗਈ</strong>
                    </p>
                  </div>
                  <p style="color: #666; font-size: 14px; margin-bottom: 20px;">
                    ਇਹ ਦਵਾਈ ਸਮਾਰਟ ਨਿਗਰਾਨੀ ਸਿਸਟਮ ਵਿੱਚ ਸ਼ਾਮਲ ਕੀਤੀ ਗਈ ਹੈ। ਤੁਹਾਨੂੰ ਖੁਰਾਕ ਅਤੇ ਪਾਲਣਾ ਟਰੈਕਿੰਗ ਲਈ ਅਲਰਟ ਮਿਲਣਗੇ।
                  </p>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    ਇਹ ਡੋਜ਼ਬਡੀ AI ਤੋਂ ਇੱਕ ਸਵੈਚਾਲਿਤ ਸੂਚਨਾ ਹੈ • ਸਮਾਂ: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          `
        }
      },
      dose_missed: {
        en: {
          subject: '⚠️ DoseBuddy: Missed Dose Alert',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white;">
              <div style="background: white; color: #333; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #e74c3c; margin: 0; font-size: 28px;">🏥 DoseBuddy</h1>
                  <p style="color: #666; margin: 5px 0 0 0;">AI-Powered Medication Management</p>
                </div>
                
                <div style="background: #fff5f5; padding: 25px; border-radius: 10px; border-left: 5px solid #e74c3c; margin-bottom: 25px;">
                  <h2 style="color: #e74c3c; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">⚠️</span>
                    Missed Dose Alert
                  </h2>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px; border: 2px solid #ffebee;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Medication:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #e74c3c; font-weight: bold;">${data.medicationName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Scheduled Time:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.scheduledTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Missed By:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #e74c3c; font-weight: bold;">${data.missedDuration}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>Dosage:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.dosage}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>Member:</strong></td>
                        <td style="padding: 8px 0; color: #6c5ce7; font-weight: bold;">${data.memberName || 'Primary'}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                
                <div style="background: #ffe8e8; padding: 20px; border-radius: 10px; margin-bottom: 25px; border: 1px solid #ffcdd2;">
                  <h3 style="color: #d32f2f; margin: 0 0 15px 0;">📋 Recommended Action:</h3>
                  <p style="margin: 0 0 10px 0; color: #666; line-height: 1.6;">
                    ${data.recommendation || 'Please consult your healthcare provider or refer to the DoseBuddy app for personalized missed dose guidance.'}
                  </p>
                  <div style="background: #fff; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p style="margin: 0; color: #d32f2f; font-weight: bold; text-align: center;">
                      ⚠️ Never double your dose to make up for a missed one
                    </p>
                  </div>
                </div>
                
                <div style="text-align: center; margin-top: 30px;">
                  <div style="background: #e3f2fd; padding: 15px; border-radius: 8px; margin-bottom: 20px;">
                    <p style="margin: 0; color: #1976d2;">
                      <strong>💡 Check DoseBuddy app for detailed missed dose guidance</strong>
                    </p>
                  </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    This is an automated alert from DoseBuddy AI • Time: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          `
        },
        hi: {
          subject: '⚠️ डोज़बडी: छूटी हुई खुराक चेतावनी',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white;">
              <div style="background: white; color: #333; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #e74c3c; margin: 0; font-size: 28px;">🏥 डोज़बडी</h1>
                  <p style="color: #666; margin: 5px 0 0 0;">AI-संचालित दवा प्रबंधन</p>
                </div>
                
                <div style="background: #fff5f5; padding: 25px; border-radius: 10px; border-left: 5px solid #e74c3c; margin-bottom: 25px;">
                  <h2 style="color: #e74c3c; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">⚠️</span>
                    छूटी हुई खुराक चेतावनी
                  </h2>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px; border: 2px solid #ffebee;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>दवा:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #e74c3c; font-weight: bold;">${data.medicationName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>निर्धारित समय:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.scheduledTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>छूटने का समय:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #e74c3c; font-weight: bold;">${data.missedDuration}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>खुराक:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.dosage}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>सदस्य:</strong></td>
                        <td style="padding: 8px 0; color: #6c5ce7; font-weight: bold;">${data.memberName || 'प्राथमिक'}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                
                <div style="background: #ffe8e8; padding: 20px; border-radius: 10px; margin-bottom: 25px; border: 1px solid #ffcdd2;">
                  <h3 style="color: #d32f2f; margin: 0 0 15px 0;">📋 सुझावित कार्रवाई:</h3>
                  <p style="margin: 0 0 10px 0; color: #666; line-height: 1.6;">
                    ${data.recommendation || 'कृपया अपने स्वास्थ्य सेवा प्रदाता से सलाह लें या व्यक्तिगत छूटी हुई खुराक मार्गदर्शन के लिए डोज़बडी ऐप देखें।'}
                  </p>
                  <div style="background: #fff; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p style="margin: 0; color: #d32f2f; font-weight: bold; text-align: center;">
                      ⚠️ छूटी हुई खुराक की भरपाई के लिए कभी भी दोगुनी खुराक न लें
                    </p>
                  </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    यह डोज़बडी AI से एक स्वचालित चेतावनी है • समय: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          `
        },
        ta: {
          subject: '⚠️ டோஸ்பட்டி: தவறிய டோஸ் எச்சரிக்கை',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white;">
              <div style="background: white; color: #333; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #e74c3c; margin: 0; font-size: 28px;">🏥 டோஸ்பட்டி</h1>
                  <p style="color: #666; margin: 5px 0 0 0;">AI-இயங்கும் மருந்து மேலாண்மை</p>
                </div>
                
                <div style="background: #fff5f5; padding: 25px; border-radius: 10px; border-left: 5px solid #e74c3c; margin-bottom: 25px;">
                  <h2 style="color: #e74c3c; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">⚠️</span>
                    தவறிய டோஸ் எச்சரிக்கை
                  </h2>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px; border: 2px solid #ffebee;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>மருந்து:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #e74c3c; font-weight: bold;">${data.medicationName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>நிர்ணயித்த நேரம்:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.scheduledTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>தவறிய நேரம்:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #e74c3c; font-weight: bold;">${data.missedDuration}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>மருந்தளவு:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.dosage}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>உறுப்பினர்:</strong></td>
                        <td style="padding: 8px 0; color: #6c5ce7; font-weight: bold;">${data.memberName || 'முதன்மை'}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                
                <div style="background: #ffe8e8; padding: 20px; border-radius: 10px; margin-bottom: 25px; border: 1px solid #ffcdd2;">
                  <h3 style="color: #d32f2f; margin: 0 0 15px 0;">📋 பரிந்துரைக்கப்பட்ட நடவடிக்கை:</h3>
                  <p style="margin: 0 0 10px 0; color: #666; line-height: 1.6;">
                    ${data.recommendation || 'உங்கள் சுகாதார வழங்குநரைக் கலந்தாலோசிக்கவும் அல்லது தனிப்பயனாக்கப்பட்ட தவறிய டோஸ் வழிகாட்டுதலுக்காக டோஸ்பட்டி ஆப்பைப் பார்க்கவும்.'}
                  </p>
                  <div style="background: #fff; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p style="margin: 0; color: #d32f2f; font-weight: bold; text-align: center;">
                      ⚠️ தவறிய டோஸுக்கு ஈடுசெய்ய இரட்டை டோஸ் எடுக்க வேண்டாம்
                    </p>
                  </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    இது டோஸ்பட்டி AI இலிருந்து ஒரு தானியங்கி எச்சரிக்கை • நேரம்: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          `
        },
        pa: {
          subject: '⚠️ ਡੋਜ਼ਬਡੀ: ਛੁੱਟੀ ਡੋਜ਼ ਚੇਤਾਵਨੀ',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px; background: linear-gradient(135deg, #ff6b6b 0%, #ee5a24 100%); color: white;">
              <div style="background: white; color: #333; padding: 30px; border-radius: 15px; box-shadow: 0 10px 30px rgba(0,0,0,0.2);">
                <div style="text-align: center; margin-bottom: 30px;">
                  <h1 style="color: #e74c3c; margin: 0; font-size: 28px;">🏥 ਡੋਜ਼ਬਡੀ</h1>
                  <p style="color: #666; margin: 5px 0 0 0;">AI-ਸੰਚਾਲਿਤ ਦਵਾਈ ਪ੍ਰਬੰਧਨ</p>
                </div>
                
                <div style="background: #fff5f5; padding: 25px; border-radius: 10px; border-left: 5px solid #e74c3c; margin-bottom: 25px;">
                  <h2 style="color: #e74c3c; margin: 0 0 15px 0; display: flex; align-items: center;">
                    <span style="margin-right: 10px;">⚠️</span>
                    ਛੁੱਟੀ ਡੋਜ਼ ਚੇਤਾਵਨੀ
                  </h2>
                  <div style="background: white; padding: 20px; border-radius: 8px; margin-top: 15px; border: 2px solid #ffebee;">
                    <table style="width: 100%; border-collapse: collapse;">
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>ਦਵਾਈ:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #e74c3c; font-weight: bold;">${data.medicationName}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>ਨਿਰਧਾਰਤ ਸਮਾਂ:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.scheduledTime}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>ਛੁੱਟਣ ਦਾ ਸਮਾਂ:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee; color: #e74c3c; font-weight: bold;">${data.missedDuration}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;"><strong>ਖੁਰਾਕ:</strong></td>
                        <td style="padding: 8px 0; border-bottom: 1px solid #eee;">${data.dosage}</td>
                      </tr>
                      <tr>
                        <td style="padding: 8px 0;"><strong>ਮੈਂਬਰ:</strong></td>
                        <td style="padding: 8px 0; color: #6c5ce7; font-weight: bold;">${data.memberName || 'ਮੁੱਖ'}</td>
                      </tr>
                    </table>
                  </div>
                </div>
                
                <div style="background: #ffe8e8; padding: 20px; border-radius: 10px; margin-bottom: 25px; border: 1px solid #ffcdd2;">
                  <h3 style="color: #d32f2f; margin: 0 0 15px 0;">📋 ਸੁਝਾਏ ਗਏ ਕਦਮ:</h3>
                  <p style="margin: 0 0 10px 0; color: #666; line-height: 1.6;">
                    ${data.recommendation || 'ਕਿਰਪਾ ਕਰਕੇ ਆਪਣੇ ਸਿਹਤ ਸੇਵਾ ਪ੍ਰਦਾਤਾ ਨਾਲ ਸਲਾਹ ਕਰੋ ਜਾਂ ਵਿਅਕਤੀਗਤ ਛੁੱਟੀ ਡੋਜ਼ ਮਾਰਗਦਰਸ਼ਨ ਲਈ ਡੋਜ਼ਬਡੀ ਐਪ ਦੇਖੋ।'}
                  </p>
                  <div style="background: #fff; padding: 15px; border-radius: 8px; margin-top: 15px;">
                    <p style="margin: 0; color: #d32f2f; font-weight: bold; text-align: center;">
                      ⚠️ ਛੁੱਟੀ ਡੋਜ਼ ਦੀ ਭਰਪਾਈ ਲਈ ਕਦੇ ਵੀ ਦੋਗੁਣੀ ਖੁਰਾਕ ਨਾ ਲਓ
                    </p>
                  </div>
                </div>
                
                <div style="margin-top: 30px; padding-top: 20px; border-top: 1px solid #eee; text-align: center;">
                  <p style="color: #999; font-size: 12px; margin: 0;">
                    ਇਹ ਡੋਜ਼ਬਡੀ AI ਤੋਂ ਇੱਕ ਸਵੈਚਾਲਿਤ ਚੇਤਾਵਨੀ ਹੈ • ਸਮਾਂ: ${new Date().toLocaleString()}
                  </p>
                </div>
              </div>
            </div>
          `
        }
      }
    }

    // Get the appropriate template
    const template = emailTemplates[type as keyof typeof emailTemplates]?.[language as keyof typeof emailTemplates['dose_created']]
    
    if (!template) {
      return NextResponse.json({ 
        error: `Unsupported notification type: ${type} or language: ${language}` 
      }, { status: 400 })
    }

    // Email options
    const mailOptions = {
      from: {
        name: 'DoseBuddy AI',
        address: SENDER_EMAIL
      },
      to: RECIPIENT_EMAIL,
      subject: template.subject,
      html: template.html
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    
    return NextResponse.json({
      success: true,
      messageId: info.messageId,
      type,
      language,
      timestamp: new Date().toISOString(),
      recipient: RECIPIENT_EMAIL
    })

  } catch (error) {
    console.error('Email notification error:', error)
    
    return NextResponse.json({
      success: false,
      error: 'Failed to send email notification',
      details: error instanceof Error ? error.message : 'Unknown error',
      timestamp: new Date().toISOString()
    }, { status: 500 })
  }
}
