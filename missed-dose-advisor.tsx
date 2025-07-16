"use client"

import { useState } from "react"
import { AlertTriangle, Clock, Pill, User, FileText, Phone, Languages } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Alert, AlertDescription } from "@/components/ui/alert"
import { Separator } from "@/components/ui/separator"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

// Comprehensive translations for Missed Dose Advisor
const translations = {
  en: {
    appName: "DoseBuddy",
    missedDoseAdvisory: "Missed Dose Advisory",
    missedDoseAlert: "Missed Dose Alert",
    scheduled: "Scheduled",
    missedBy: "Missed by",
    patientAge: "Patient Age",
    years: "years",
    recommendedAction: "Recommended Action",
    foodRequirement: "Food Requirement",
    foodRequirementDesc: "This medication should be taken with food to reduce stomach irritation.",
    importantSafetyReminders: "Important Safety Reminders:",
    neverDouble: "Never double your dose to make up for a missed one",
    unsureSkip: "If you're unsure, it's safer to skip the missed dose",
    setReminders: "Set up reminders to prevent future missed doses",
    keepTrack: "Keep track of missed doses to discuss with your healthcare provider",
    medicalDisclaimer: "Medical Disclaimer:",
    disclaimerText: "This is general guidance only. Always consult your doctor or pharmacist for personalized medical advice, especially if you frequently miss doses or have concerns about your medication schedule.",
    contactDoctor: "Contact Doctor",
    markAsHandled: "Mark as Handled",
    smartMedication: "Smart Medication Management",
    emergencyNote: "For emergencies, call your healthcare provider or emergency services",
    takeNow: "Take your dose now",
    takeNowReasonEarly: "Since you're only 2 hours late, it's generally safe to take your medication now.",
    takeNowAdjust: "Take your dose now, but adjust next dose timing",
    takeNowReasonMedium: "You can still take this dose, but consider spacing your next dose appropriately to avoid overlap.",
    skipDose: "Skip this dose and take your next scheduled dose",
    skipDoseReason: "Too much time has passed. Taking it now might interfere with your next scheduled dose.",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    punjabi: "ਪੰਜਾਬੀ"
  },
  hi: {
    appName: "डोज़बडी",
    missedDoseAdvisory: "छूटी हुई खुराक सलाह",
    missedDoseAlert: "छूटी हुई खुराक अलर्ट",
    scheduled: "निर्धारित",
    missedBy: "द्वारा छूटा",
    patientAge: "रोगी की आयु",
    years: "वर्ष",
    recommendedAction: "अनुशंसित कार्रवाई",
    foodRequirement: "भोजन की आवश्यकता",
    foodRequirementDesc: "पेट की जलन को कम करने के लिए इस दवा को भोजन के साथ लेना चाहिए।",
    importantSafetyReminders: "महत्वपूर्ण सुरक्षा अनुस्मारक:",
    neverDouble: "छूटी हुई खुराक की भरपाई के लिए कभी भी दोगुनी खुराक न लें",
    unsureSkip: "यदि आप अनिश्चित हैं, तो छूटी हुई खुराक को छोड़ना सुरक्षित है",
    setReminders: "भविष्य में छूटी हुई खुराक को रोकने के लिए अनुस्मारक सेट करें",
    keepTrack: "अपने स्वास्थ्य सेवा प्रदाता के साथ चर्चा के लिए छूटी हुई खुराक का ट्रैक रखें",
    medicalDisclaimer: "चिकित्सा अस्वीकरण:",
    disclaimerText: "यह केवल सामान्य मार्गदर्शन है। व्यक्तिगत चिकित्सा सलाह के लिए हमेशा अपने डॉक्टर या फार्मासिस्ट से सलाह लें, विशेष रूप से यदि आप अक्सर खुराक छोड़ते हैं या अपनी दवा अनुसूची के बारे में चिंता है।",
    contactDoctor: "डॉक्टर से संपर्क करें",
    markAsHandled: "संभाला गया के रूप में चिह्नित करें",
    smartMedication: "स्मार्ट दवा प्रबंधन",
    emergencyNote: "आपातकालीन स्थिति के लिए, अपने स्वास्थ्य सेवा प्रदाता या आपातकालीन सेवाओं को कॉल करें",
    takeNow: "अब अपनी खुराक लें",
    takeNowReasonEarly: "चूंकि आप केवल 2 घंटे देर से हैं, अब अपनी दवा लेना आम तौर पर सुरक्षित है।",
    takeNowAdjust: "अब अपनी खुराक लें, लेकिन अगली खुराक का समय समायोजित करें",
    takeNowReasonMedium: "आप अभी भी यह खुराक ले सकते हैं, लेकिन ओवरलैप से बचने के लिए अपनी अगली खुराक को उचित रूप से रखने पर विचार करें।",
    skipDose: "इस खुराक को छोड़ें और अपनी अगली निर्धारित खुराक लें",
    skipDoseReason: "बहुत समय बीत गया है। अब इसे लेना आपकी अगली निर्धारित खुराक में हस्तक्षेप कर सकता है।",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்"
  },
  ta: {
    appName: "டோஸ்பட்டி",
    missedDoseAdvisory: "தவறிய டோஸ் ஆலோசனை",
    missedDoseAlert: "தவறிய டோஸ் எச்சரிக்கை",
    scheduled: "திட்டமிடப்பட்டது",
    missedBy: "தவறிய நேரம்",
    patientAge: "நோயாளியின் வயது",
    years: "வருடங்கள்",
    recommendedAction: "பரிந்துரைக்கப்பட்ட நடவடிக்கை",
    foodRequirement: "உணவு தேவை",
    foodRequirementDesc: "வயிற்று எரிச்சலைக் குறைக்க இந்த மருந்தை உணவுடன் எடுத்துக்கொள்ள வேண்டும்.",
    importantSafetyReminders: "முக்கியமான பாதுகாப்பு நினைவூட்டல்கள்:",
    neverDouble: "தவறிய டோஸை ஈடுசெய்ய ஒருபோதும் இரட்டைப்படுத்தாதீர்கள்",
    unsureSkip: "நீங்கள் உறுதியாக இல்லையென்றால், தவறிய டோஸைத் தவிர்ப்பது பாதுகாப்பானது",
    setReminders: "எதிர்கால தவறிய டோஸ்களைத் தடுக்க நினைவூட்டல்களை அமைக்கவும்",
    keepTrack: "உங்கள் சுகாதார வழங்குநருடன் விவாதிக்க தவறிய டோஸ்களைக் கண்காணிக்கவும்",
    medicalDisclaimer: "மருத்துவ மறுப்பு:",
    disclaimerText: "இது பொதுவான வழிகாட்டுதல் மட்டுமே. தனிப்பயன் மருத்துவ ஆலோசனைக்கு எப்போதும் உங்கள் மருத்துவர் அல்லது மருந்தாளரைக் கலந்தாலோசிக்கவும், குறிப்பாக நீங்கள் அடிக்கடி டோஸ்களைத் தவறவிட்டால் அல்லது உங்கள் மருந்து அட்டவணையைப் பற்றி கவலைகள் இருந்தால்.",
    contactDoctor: "மருத்துவரைத் தொடர்பு கொள்ளுங்கள்",
    markAsHandled: "கையாளப்பட்டதாகக் குறிக்கவும்",
    smartMedication: "ஸ்மார்ட் மருந்து மேலாண்மை",
    emergencyNote: "அவசர நிலைகளுக்கு, உங்கள் சுகாதார வழங்குநர் அல்லது அவசர சேவைகளை அழைக்கவும்",
    takeNow: "இப்போது உங்கள் டோஸை எடுத்துக்கொள்ளுங்கள்",
    takeNowReasonEarly: "நீங்கள் 2 மணி நேரம் மட்டுமே தாமதமாக இருப்பதால், இப்போது உங்கள் மருந்தை எடுத்துக்கொள்வது பொதுவாகப் பாதுகாப்பானது.",
    takeNowAdjust: "இப்போது உங்கள் டோஸை எடுத்துக்கொள்ளுங்கள், ஆனால் அடுத்த டோஸ் நேரத்தை சரிசெய்யுங்கள்",
    takeNowReasonMedium: "நீங்கள் இன்னும் இந்த டோஸை எடுத்துக்கொள்ளலாம், ஆனால் ஒன்றுடன் ஒன்று வராமல் இருக்க உங்கள் அடுத்த டோஸை சரியாக இடைவெளி விடுவதைக் கருத்தில் கொள்ளுங்கள்.",
    skipDose: "இந்த டோஸைத் தவிர்த்து உங்கள் அடுத்த திட்டமிடப்பட்ட டோஸை எடுத்துக்கொள்ளுங்கள்",
    skipDoseReason: "அதிக நேரம் கடந்துவிட்டது. இப்போது அதை எடுத்துக்கொள்வது உங்கள் அடுத்த திட்டமிடப்பட்ட டோஸில் தலையிடலாம்.",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    punjabi: "ਪੰਜਾਬੀ"
  },
  pa: {
    appName: "ਡੋਜ਼ਬੱਡੀ",
    missedDoseAdvisory: "ਛੁੱਟੀ ਹੋਈ ਡੋਜ਼ ਸਲਾਹ",
    missedDoseAlert: "ਛੁੱਟੀ ਹੋਈ ਡੋਜ਼ ਅਲਰਟ",
    scheduled: "ਨਿਰਧਾਰਿਤ",
    missedBy: "ਦੁਆਰਾ ਛੁੱਟੀ",
    patientAge: "ਮਰੀਜ਼ ਦੀ ਉਮਰ",
    years: "ਸਾਲ",
    recommendedAction: "ਸਿਫ਼ਾਰਿਸ਼ੀ ਕਾਰਵਾਈ",
    foodRequirement: "ਭੋਜਨ ਦੀ ਲੋੜ",
    foodRequirementDesc: "ਪੇਟ ਦੀ ਜਲਨ ਘਟਾਉਣ ਲਈ ਇਸ ਦਵਾਈ ਨੂੰ ਭੋਜਨ ਨਾਲ ਲੈਣਾ ਚਾਹੀਦਾ ਹੈ।",
    importantSafetyReminders: "ਮਹੱਤਵਪੂਰਨ ਸੁਰੱਖਿਆ ਯਾਦਾਸ਼ਤਾਂ:",
    neverDouble: "ਛੁੱਟੀ ਹੋਈ ਡੋਜ਼ ਦੀ ਪੂਰਤੀ ਲਈ ਕਦੇ ਵੀ ਦੁੱਗਣੀ ਡੋਜ਼ ਨਾ ਲਓ",
    unsureSkip: "ਜੇ ਤੁਸੀਂ ਅਨਿਸ਼ਚਿਤ ਹੋ, ਤਾਂ ਛੁੱਟੀ ਹੋਈ ਡੋਜ਼ ਨੂੰ ਛੱਡਣਾ ਸੁਰੱਖਿਅਤ ਹੈ",
    setReminders: "ਭਵਿੱਖ ਵਿੱਚ ਛੁੱਟੀ ਹੋਈ ਡੋਜ਼ ਨੂੰ ਰੋਕਣ ਲਈ ਰਿਮਾਈਂਡਰ ਸੈੱਟ ਕਰੋ",
    keepTrack: "ਆਪਣੇ ਸਿਹਤ ਸੇਵਾ ਪ੍ਰਦਾਤਾ ਨਾਲ ਚਰਚਾ ਕਰਨ ਲਈ ਛੁੱਟੀ ਹੋਈ ਡੋਜ਼ਾਂ ਦਾ ਟਰੈਕ ਰੱਖੋ",
    medicalDisclaimer: "ਮੈਡੀਕਲ ਅਸਵੀਕਰਣ:",
    disclaimerText: "ਇਹ ਸਿਰਫ਼ ਆਮ ਮਾਰਗਦਰਸ਼ਨ ਹੈ। ਵਿਅਕਤੀਗਤ ਮੈਡੀਕਲ ਸਲਾਹ ਲਈ ਹਮੇਸ਼ਾ ਆਪਣੇ ਡਾਕਟਰ ਜਾਂ ਫਾਰਮਾਸਿਸਟ ਨਾਲ ਸਲਾਹ ਕਰੋ, ਖਾਸ ਕਰਕੇ ਜੇ ਤੁਸੀਂ ਅਕਸਰ ਡੋਜ਼ ਛੱਡਦੇ ਹੋ ਜਾਂ ਆਪਣੀ ਦਵਾਈ ਸਮਾਂ-ਸਾਰਣੀ ਬਾਰੇ ਚਿੰਤਾ ਹੈ।",
    contactDoctor: "ਡਾਕਟਰ ਨਾਲ ਸੰਪਰਕ ਕਰੋ",
    markAsHandled: "ਸੰਭਾਲਿਆ ਗਿਆ ਵਜੋਂ ਨਿਸ਼ਾਨ ਲਗਾਓ",
    smartMedication: "ਸਮਾਰਟ ਦਵਾਈ ਪ੍ਰਬੰਧਨ",
    emergencyNote: "ਐਮਰਜੈਂਸੀ ਲਈ, ਆਪਣੇ ਸਿਹਤ ਸੇਵਾ ਪ੍ਰਦਾਤਾ ਜਾਂ ਐਮਰਜੈਂਸੀ ਸੇਵਾਵਾਂ ਨੂੰ ਕਾਲ ਕਰੋ",
    takeNow: "ਹੁਣ ਆਪਣੀ ਡੋਜ਼ ਲਓ",
    takeNowReasonEarly: "ਕਿਉਂਕਿ ਤੁਸੀਂ ਸਿਰਫ਼ 2 ਘੰਟੇ ਦੇਰ ਨਾਲ ਹੋ, ਇਸਲਈ ਹੁਣ ਆਪਣੀ ਦਵਾਈ ਲੈਣਾ ਆਮ ਤੌਰ 'ਤੇ ਸੁਰੱਖਿਅਤ ਹੈ।",
    takeNowAdjust: "ਹੁਣ ਆਪਣੀ ਡੋਜ਼ ਲਓ, ਪਰ ਅਗਲੀ ਡੋਜ਼ ਦਾ ਸਮਾਂ ਸਮਾਯੋਜਿਤ ਕਰੋ",
    takeNowReasonMedium: "ਤੁਸੀਂ ਅਜੇ ਵੀ ਇਹ ਡੋਜ਼ ਲੈ ਸਕਦੇ ਹੋ, ਪਰ ਓਵਰਲੈਪ ਤੋਂ ਬਚਣ ਲਈ ਆਪਣੀ ਅਗਲੀ ਡੋਜ਼ ਨੂੰ ਉਚਿਤ ਰੂਪ ਵਿੱਚ ਰੱਖਣ ਬਾਰੇ ਸੋਚੋ।",
    skipDose: "ਇਸ ਡੋਜ਼ ਨੂੰ ਛੱਡੋ ਅਤੇ ਆਪਣੀ ਅਗਲੀ ਨਿਰਧਾਰਿਤ ਡੋਜ਼ ਲਓ",
    skipDoseReason: "ਬਹੁਤ ਸਮਾਂ ਬੀਤ ਗਿਆ ਹੈ। ਹੁਣ ਇਸਨੂੰ ਲੈਣਾ ਤੁਹਾਡੀ ਅਗਲੀ ਨਿਰਧਾਰਿਤ ਡੋਜ਼ ਵਿੱਚ ਦਖਲ ਦੇ ਸਕਦਾ ਹੈ।",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    punjabi: "ਪੰਜਾਬੀ"
  }
}

interface MissedDoseData {
  medicineName: string
  scheduledTime: string
  missedBy: string
  conditions?: string[]
  userAge?: number
  requiresFood?: boolean
  medicationType?: string
}

export default function MissedDoseAdvisor() {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi' | 'ta' | 'pa'>('en')
  
  // Translation helper function
  const t = (key: string) => {
    const translation = translations[currentLanguage] as Record<string, string>
    return translation[key] || key
  }
  
  // Example data - in real app this would come from props or API
  const [missedDoseData] = useState<MissedDoseData>({
    medicineName: "Lisinopril 10mg",
    scheduledTime: "8:00 AM",
    missedBy: "2 hours",
    conditions: ["Hypertension"],
    userAge: 65,
    requiresFood: false,
    medicationType: "Blood Pressure Medication",
  })

  const getAdviceBasedOnDelay = (missedBy: string, medicationType?: string) => {
    const hours = Number.parseInt(missedBy)

    if (hours <= 2) {
      return {
        recommendation: t('takeNow'),
        reasoning: t('takeNowReasonEarly'),
        urgency: "low",
      }
    } else if (hours <= 6) {
      return {
        recommendation: t('takeNowAdjust'),
        reasoning: t('takeNowReasonMedium'),
        urgency: "medium",
      }
    } else {
      return {
        recommendation: t('skipDose'),
        reasoning: t('skipDoseReason'),
        urgency: "high",
      }
    }
  }

  const advice = getAdviceBasedOnDelay(missedDoseData.missedBy, missedDoseData.medicationType)

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-6">
      <div className="text-center space-y-2">
        <div className="flex items-center justify-between">
          <div className="flex-1 text-center">
            <h1 className="text-2xl font-bold text-blue-600">{t('appName')}</h1>
            <p className="text-gray-600">{t('missedDoseAdvisory')}</p>
          </div>
          
          {/* Language Selector */}
          <Select value={currentLanguage} onValueChange={(value: 'en' | 'hi' | 'ta' | 'pa') => setCurrentLanguage(value)}>
            <SelectTrigger className="w-32">
              <Languages className="h-4 w-4 mr-2" />
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="en">{t('english')}</SelectItem>
              <SelectItem value="hi">{t('hindi')}</SelectItem>
              <SelectItem value="ta">{t('tamil')}</SelectItem>
              <SelectItem value="pa">{t('punjabi')}</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>

      <Card className="border-orange-200 bg-orange-50">
        <CardHeader className="pb-3">
          <div className="flex items-center gap-2">
            <AlertTriangle className="h-5 w-5 text-orange-600" />
            <CardTitle className="text-orange-800">{t('missedDoseAlert')}</CardTitle>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-center gap-2">
              <Pill className="h-4 w-4 text-blue-600" />
              <div>
                <p className="font-medium">{missedDoseData.medicineName}</p>
                <p className="text-sm text-gray-600">{missedDoseData.medicationType}</p>
              </div>
            </div>

            <div className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-red-600" />
              <div>
                <p className="font-medium">{t('scheduled')}: {missedDoseData.scheduledTime}</p>
                <p className="text-sm text-red-600">{t('missedBy')}: {missedDoseData.missedBy}</p>
              </div>
            </div>
          </div>

          {missedDoseData.conditions && (
            <div className="flex items-center gap-2">
              <FileText className="h-4 w-4 text-purple-600" />
              <div className="flex flex-wrap gap-1">
                {missedDoseData.conditions.map((condition, index) => (
                  <Badge key={index} variant="secondary" className="text-xs">
                    {condition}
                  </Badge>
                ))}
              </div>
            </div>
          )}

          {missedDoseData.userAge && (
            <div className="flex items-center gap-2">
              <User className="h-4 w-4 text-green-600" />
              <p className="text-sm">{t('patientAge')}: {missedDoseData.userAge} {t('years')}</p>
            </div>
          )}
        </CardContent>
      </Card>

      <Card
        className={`border-2 ${
          advice.urgency === "low"
            ? "border-green-200 bg-green-50"
            : advice.urgency === "medium"
              ? "border-yellow-200 bg-yellow-50"
              : "border-red-200 bg-red-50"
        }`}
      >
        <CardHeader>
          <CardTitle
            className={`${
              advice.urgency === "low"
                ? "text-green-800"
                : advice.urgency === "medium"
                  ? "text-yellow-800"
                  : "text-red-800"
            }`}
          >
            {t('recommendedAction')}
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div
            className={`p-4 rounded-lg ${
              advice.urgency === "low" ? "bg-green-100" : advice.urgency === "medium" ? "bg-yellow-100" : "bg-red-100"
            }`}
          >
            <p className="font-semibold text-lg">{advice.recommendation}</p>
            <p className="text-sm mt-2">{advice.reasoning}</p>
          </div>

          {missedDoseData.requiresFood && (
            <Alert>
              <AlertDescription>
                <strong>{t('foodRequirement')}:</strong> {t('foodRequirementDesc')}
              </AlertDescription>
            </Alert>
          )}

          <div className="space-y-2">
            <h4 className="font-semibold text-red-800">{t('importantSafetyReminders')}</h4>
            <ul className="text-sm space-y-1 text-gray-700">
              <li>• <strong>{t('neverDouble')}</strong></li>
              <li>• {t('unsureSkip')}</li>
              <li>• {t('setReminders')}</li>
              <li>• {t('keepTrack')}</li>
            </ul>
          </div>
        </CardContent>
      </Card>

      <Alert className="border-blue-200 bg-blue-50">
        <Phone className="h-4 w-4" />
        <AlertDescription className="text-blue-800">
          <strong>{t('medicalDisclaimer')}</strong> {t('disclaimerText')}
        </AlertDescription>
      </Alert>

      <div className="flex gap-3 justify-center">
        <Button variant="outline" className="flex items-center gap-2 bg-transparent">
          <Phone className="h-4 w-4" />
          {t('contactDoctor')}
        </Button>
        <Button className="bg-blue-600 hover:bg-blue-700">{t('markAsHandled')}</Button>
      </div>

      <Separator />

      <div className="text-center text-xs text-gray-500">
        <p>{t('appName')} - {t('smartMedication')}</p>
        <p>{t('emergencyNote')}</p>
      </div>
    </div>
  )
}
