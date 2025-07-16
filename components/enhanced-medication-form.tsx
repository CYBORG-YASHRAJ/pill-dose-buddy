"use client"

import { useState } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Textarea } from '@/components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Pill, Clock, Calendar, Plus, X, Languages } from 'lucide-react'
import { firebaseService } from '@/lib/firebase-service'
import { notifyDoseCreated } from '@/lib/email-notifications'

// Comprehensive translations for Enhanced Medication Form
const translations = {
  en: {
    addNewMedication: "Add New Medication",
    editMedication: "Edit Medication",
    medicationName: "Medication Name",
    medicationNamePlaceholder: "e.g., Aspirin, Metformin",
    chamberNumber: "Chamber Number",
    selectChamber: "Select chamber",
    chamber: "Chamber",
    numberOfPills: "Number of Pills",
    scheduledTime: "Scheduled Time",
    hour24Format: "Hour (24-hour format)",
    hour: "Hour",
    minute: "Minute",
    selectedTime: "Selected time",
    medicationDuration: "Medication Duration",
    startDate: "Start Date",
    endDate: "End Date",
    specialConditions: "Special Conditions (Optional)",
    specialConditionsPlaceholder: "e.g., Take with food, Monitor blood pressure, Take before bedtime",
    addMedication: "Add Medication",
    addingMedication: "Adding Medication...",
    cancel: "Cancel",
    endDateError: "End date must be after start date",
    medicationAddedSuccess: "New medication added successfully",
    medicationUpdatedSuccess: "Medication updated successfully",
    failedToAddMedication: "Failed to add medication",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    punjabi: "ਪੰਜਾਬੀ"
  },
  hi: {
    addNewMedication: "नई दवा जोड़ें",
    editMedication: "दवा संपादित करें",
    medicationName: "दवा का नाम",
    medicationNamePlaceholder: "जैसे, एस्पिरिन, मेटफॉर्मिन",
    chamberNumber: "चैम्बर संख्या",
    selectChamber: "चैम्बर चुनें",
    chamber: "चैम्बर",
    numberOfPills: "गोलियों की संख्या",
    scheduledTime: "निर्धारित समय",
    hour24Format: "घंटा (24-घंटे प्रारूप)",
    hour: "घंटा",
    minute: "मिनट",
    selectedTime: "चयनित समय",
    medicationDuration: "दवा की अवधि",
    startDate: "शुरुआती तारीख",
    endDate: "अंतिम तारीख",
    specialConditions: "विशेष शर्तें (वैकल्पिक)",
    specialConditionsPlaceholder: "जैसे, भोजन के साथ लें, रक्तचाप की निगरानी करें, सोने से पहले लें",
    addMedication: "दवा जोड़ें",
    addingMedication: "दवा जोड़ी जा रही है...",
    cancel: "रद्द करें",
    endDateError: "अंतिम तारीख शुरुआती तारीख के बाद होनी चाहिए",
    medicationAddedSuccess: "नई दवा सफलतापूर्वक जोड़ी गई",
    medicationUpdatedSuccess: "दवा सफलतापूर्वक अपडेट की गई",
    failedToAddMedication: "दवा जोड़ने में असफल",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    punjabi: "ਪੰਜਾਬੀ"
  },
  ta: {
    addNewMedication: "புதிய மருந்தைச் சேர்க்கவும்",
    editMedication: "மருந்தைத் திருத்தவும்",
    medicationName: "மருந்தின் பெயர்",
    medicationNamePlaceholder: "எ.கா., ஆஸ்பிரின், மெட்ஃபார்மின்",
    chamberNumber: "அறை எண்",
    selectChamber: "அறையைத் தேர்ந்தெடுக்கவும்",
    chamber: "அறை",
    numberOfPills: "மாத்திரைகளின் எண்ணிக்கை",
    scheduledTime: "திட்டமிடப்பட்ட நேரம்",
    hour24Format: "மணி (24-மணி நேர வடிவம்)",
    hour: "மணி",
    minute: "நிமிடம்",
    selectedTime: "தேர்ந்தெடுக்கப்பட்ட நேரம்",
    medicationDuration: "மருந்து கால அளவு",
    startDate: "தொடக்க தேதி",
    endDate: "முடிவு தேதி",
    specialConditions: "சிறப்பு நிபந்தனைகள் (விருப்பத்தேர்வு)",
    specialConditionsPlaceholder: "எ.கா., உணவுடன் எடுத்துக்கொள்ளவும், இரத்த அழுத்தத்தைக் கண்காணிக்கவும், தூங்குவதற்கு முன் எடுத்துக்கொள்ளவும்",
    addMedication: "மருந்து சேர்க்கவும்",
    addingMedication: "மருந்து சேர்க்கப்படுகிறது...",
    cancel: "ரத்து செய்யவும்",
    endDateError: "முடிவு தேதி தொடக்க தேதிக்குப் பின்னர் இருக்க வேண்டும்",
    medicationAddedSuccess: "புதிய மருந்து வெற்றிகரமாகச் சேர்க்கப்பட்டது",
    medicationUpdatedSuccess: "மருந்து வெற்றிகரமாக அப்டேட் செய்யப்பட்டது",
    failedToAddMedication: "மருந்து சேர்க்கத் தவறியது",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    punjabi: "ਪੰਜਾਬੀ"
  },
  pa: {
    addNewMedication: "ਨਵੀਂ ਦਵਾਈ ਜੋੜੋ",
    editMedication: "ਦਵਾਈ ਸੰਪਾਦਿਤ ਕਰੋ",
    medicationName: "ਦਵਾਈ ਦਾ ਨਾਂ",
    medicationNamePlaceholder: "ਜਿਵੇਂ, ਐਸਪਰਿਨ, ਮੈਟਫਾਰਮਿਨ",
    chamberNumber: "ਕਮਰਾ ਨੰਬਰ",
    selectChamber: "ਕਮਰਾ ਚੁਣੋ",
    chamber: "ਕਮਰਾ",
    numberOfPills: "ਗੋਲੀਆਂ ਦੀ ਗਿਣਤੀ",
    scheduledTime: "ਨਿਰਧਾਰਿਤ ਸਮਾਂ",
    hour24Format: "ਘੰਟਾ (24-ਘੰਟੇ ਦਾ ਫਾਰਮੈਟ)",
    hour: "ਘੰਟਾ",
    minute: "ਮਿੰਟ",
    selectedTime: "ਚੁਣਿਆ ਗਿਆ ਸਮਾਂ",
    medicationDuration: "ਦਵਾਈ ਦੀ ਮਿਆਦ",
    startDate: "ਸ਼ੁਰੂਆਤੀ ਤਾਰੀਖ",
    endDate: "ਅੰਤਿਮ ਤਾਰੀਖ",
    specialConditions: "ਵਿਸ਼ੇਸ਼ ਸ਼ਰਤਾਂ (ਵਿਕਲਪਕ)",
    specialConditionsPlaceholder: "ਜਿਵੇਂ, ਖਾਣੇ ਨਾਲ ਲਓ, ਬਲੱਡ ਪ੍ਰੈਸ਼ਰ ਦੀ ਨਿਗਰਾਨੀ ਕਰੋ, ਸੌਣ ਤੋਂ ਪਹਿਲਾਂ ਲਓ",
    addMedication: "ਦਵਾਈ ਜੋੜੋ",
    addingMedication: "ਦਵਾਈ ਜੋੜੀ ਜਾ ਰਹੀ ਹੈ...",
    cancel: "ਰੱਦ ਕਰੋ",
    endDateError: "ਅੰਤਿਮ ਤਾਰੀਖ ਸ਼ੁਰੂਆਤੀ ਤਾਰੀਖ ਤੋਂ ਬਾਅਦ ਹੋਣੀ ਚਾਹੀਦੀ ਹੈ",
    medicationAddedSuccess: "ਨਵੀਂ ਦਵਾਈ ਸਫਲਤਾਪੂਰਵਕ ਜੋੜੀ ਗਈ",
    medicationUpdatedSuccess: "ਦਵਾਈ ਸਫਲਤਾਪੂਰਵਕ ਅਪਡੇਟ ਕੀਤੀ ਗਈ",
    failedToAddMedication: "ਦਵਾਈ ਜੋੜਨ ਵਿੱਚ ਅਸਫਲ",
    english: "English",
    hindi: "हिंदी",
    tamil: "தமிழ்",
    punjabi: "ਪੰਜਾਬੀ"
  }
}

interface MedicationFormProps {
  onSubmit: () => void
  onCancel: () => void
  medication?: any // Optional medication for editing
  language?: 'en' | 'hi' | 'ta' | 'pa'
}

export default function EnhancedMedicationForm({ onSubmit, onCancel, medication, language = 'en' }: MedicationFormProps) {
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi' | 'ta' | 'pa'>(language)
  const [formData, setFormData] = useState({
    name: medication?.name || '',
    chamber: medication?.chamber || 0,
    pills: medication?.pillCount || 1,
    hour: medication?.time ? parseInt(medication.time.split(':')[0]) : 9,
    minute: medication?.time ? parseInt(medication.time.split(':')[1]) : 0,
    fromDate: medication?.fromDate || new Date().toISOString().split('T')[0],
    toDate: medication?.toDate || '',
    conditions: medication?.conditions || ''
  })
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)

  // Translation helper function
  const t = (key: string) => translations[currentLanguage][key as keyof typeof translations['en']] || key

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    setError(null)

    try {
      // Validate dates
      const startDate = new Date(formData.fromDate)
      const endDate = new Date(formData.toDate)
      
      if (endDate <= startDate) {
        throw new Error(t('endDateError'))
      }

      // Calculate scheduled time for today
      const scheduledTime = new Date()
      scheduledTime.setHours(formData.hour, formData.minute, 0, 0)

      // Create dose object
      const dose = {
        chamber: formData.chamber,
        count: formData.pills,
        dispensed: false,
        endDate: endDate.getTime(),
        name: formData.name,
        startDate: startDate.getTime(),
        status: 'upcoming' as const,
        time: scheduledTime.getTime(),
        conditions: formData.conditions || undefined
      }

      if (medication) {
        // Update existing medication
        await firebaseService.updateDose(medication.id, dose)
        
        // Create notification for update
        await firebaseService.addNotification({
          type: 'doseDispensed',
          message: t('medicationUpdatedSuccess').replace('${name}', formData.name),
          data: { action: 'medication_updated' },
          read: false
        })

        // Send email notification for update
        try {
          const scheduleTime = `${formData.hour.toString().padStart(2, '0')}:${formData.minute.toString().padStart(2, '0')}`
          const memberName = 'Primary' // Default member name
          
          await notifyDoseCreated(
            formData.name,
            `${formData.pills} ${formData.pills === 1 ? 'pill' : 'pills'}`,
            `Daily at ${scheduleTime} (Updated)`,
            formData.fromDate,
            memberName,
            currentLanguage
          )
          
          console.log('Email notification sent for medication update')
        } catch (emailError) {
          console.error('Failed to send email notification for update:', emailError)
          // Don't fail the entire operation if email fails
        }
      } else {
        // Add new medication
        await firebaseService.addDose(dose)

        // Create notification for add
        await firebaseService.addNotification({
          type: 'doseDispensed',
          message: t('medicationAddedSuccess').replace('${name}', formData.name),
          data: { action: 'medication_added' },
          read: false
        })

        // Send email notification
        try {
          const scheduleTime = `${formData.hour.toString().padStart(2, '0')}:${formData.minute.toString().padStart(2, '0')}`
          const memberName = 'Primary' // Default member name
          
          await notifyDoseCreated(
            formData.name,
            `${formData.pills} ${formData.pills === 1 ? 'pill' : 'pills'}`,
            `Daily at ${scheduleTime}`,
            formData.fromDate,
            memberName,
            currentLanguage
          )
          
          console.log('Email notification sent successfully')
        } catch (emailError) {
          console.error('Failed to send email notification:', emailError)
          // Don't fail the entire operation if email fails
        }
      }

      onSubmit()
    } catch (err) {
      console.error('Error adding medication:', err)
      setError(err instanceof Error ? err.message : t('failedToAddMedication'))
    } finally {
      setLoading(false)
    }
  }

  const handleInputChange = (field: string, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }))
  }

  // Generate chamber options (0-7 for 8 chambers)
  const chamberOptions = Array.from({ length: 8 }, (_, i) => i)

  // Generate hour options (0-23)
  const hourOptions = Array.from({ length: 24 }, (_, i) => i)

  // Generate minute options (0, 15, 30, 45)
  const minuteOptions = [0, 15, 30, 45]

  // Set default end date to 30 days from start date
  const handleFromDateChange = (date: string) => {
    handleInputChange('fromDate', date)
    if (!formData.toDate) {
      const endDate = new Date(date)
      endDate.setDate(endDate.getDate() + 30)
      handleInputChange('toDate', endDate.toISOString().split('T')[0])
    }
  }

  return (
    <div className="max-w-2xl mx-auto p-6">
      <Card className="border-2 border-blue-200">
        <CardHeader className="bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-t-lg">
          <div className="flex items-center justify-between">
            <CardTitle className="flex items-center gap-2">
              <Plus className="h-6 w-6" />
              {medication ? t('editMedication') : t('addNewMedication')}
            </CardTitle>
            
            {/* Language Selector */}
            <Select value={currentLanguage} onValueChange={(value: 'en' | 'hi' | 'ta' | 'pa') => setCurrentLanguage(value)}>
              <SelectTrigger className="w-32 bg-white/10 border-white/20 text-white">
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
        </CardHeader>
        <CardContent className="p-6">
          <form onSubmit={handleSubmit} className="space-y-6">
            {error && (
              <Alert className="border-red-200 bg-red-50">
                <AlertDescription className="text-red-800">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Medication Name */}
            <div className="space-y-2">
              <Label htmlFor="name" className="flex items-center gap-2">
                <Pill className="h-4 w-4 text-blue-600" />
                {t('medicationName')}
              </Label>
              <Input
                id="name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                placeholder={t('medicationNamePlaceholder')}
                required
                className="border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Chamber and Pills Count */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="chamber">{t('chamberNumber')}</Label>
                <Select 
                  value={formData.chamber.toString()} 
                  onValueChange={(value) => handleInputChange('chamber', parseInt(value))}
                >
                  <SelectTrigger>
                    <SelectValue placeholder={t('selectChamber')} />
                  </SelectTrigger>
                  <SelectContent>
                    {chamberOptions.map(chamber => (
                      <SelectItem key={chamber} value={chamber.toString()}>
                        {t('chamber')} {chamber}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="pills">{t('numberOfPills')}</Label>
                <Input
                  id="pills"
                  type="number"
                  min="1"
                  max="10"
                  value={formData.pills}
                  onChange={(e) => handleInputChange('pills', parseInt(e.target.value))}
                  required
                  className="border-gray-300 focus:border-blue-500"
                />
              </div>
            </div>

            {/* Time */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-blue-600" />
                {t('scheduledTime')}
              </Label>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="hour" className="text-sm">{t('hour24Format')}</Label>
                  <Select 
                    value={formData.hour.toString()} 
                    onValueChange={(value) => handleInputChange('hour', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('hour')} />
                    </SelectTrigger>
                    <SelectContent>
                      {hourOptions.map(hour => (
                        <SelectItem key={hour} value={hour.toString()}>
                          {hour.toString().padStart(2, '0')}:00
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label htmlFor="minute" className="text-sm">{t('minute')}</Label>
                  <Select 
                    value={formData.minute.toString()} 
                    onValueChange={(value) => handleInputChange('minute', parseInt(value))}
                  >
                    <SelectTrigger>
                      <SelectValue placeholder={t('minute')} />
                    </SelectTrigger>
                    <SelectContent>
                      {minuteOptions.map(minute => (
                        <SelectItem key={minute} value={minute.toString()}>
                          {minute.toString().padStart(2, '0')}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <p className="text-sm text-gray-500">
                {t('selectedTime')}: {formData.hour.toString().padStart(2, '0')}:{formData.minute.toString().padStart(2, '0')}
              </p>
            </div>

            {/* Duration */}
            <div className="space-y-2">
              <Label className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-blue-600" />
                {t('medicationDuration')}
              </Label>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <Label htmlFor="fromDate" className="text-sm">{t('startDate')}</Label>
                  <Input
                    id="fromDate"
                    type="date"
                    value={formData.fromDate}
                    onChange={(e) => handleFromDateChange(e.target.value)}
                    required
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>

                <div>
                  <Label htmlFor="toDate" className="text-sm">{t('endDate')}</Label>
                  <Input
                    id="toDate"
                    type="date"
                    value={formData.toDate}
                    onChange={(e) => handleInputChange('toDate', e.target.value)}
                    min={formData.fromDate}
                    required
                    className="border-gray-300 focus:border-blue-500"
                  />
                </div>
              </div>
            </div>

            {/* Special Conditions */}
            <div className="space-y-2">
              <Label htmlFor="conditions">{t('specialConditions')}</Label>
              <Textarea
                id="conditions"
                value={formData.conditions}
                onChange={(e) => handleInputChange('conditions', e.target.value)}
                placeholder={t('specialConditionsPlaceholder')}
                rows={3}
                className="border-gray-300 focus:border-blue-500"
              />
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4 pt-4">
              <Button
                type="submit"
                disabled={loading}
                className="flex-1 bg-blue-600 hover:bg-blue-700"
              >
                {loading ? (
                  <div className="flex items-center gap-2">
                    <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                    {t('addingMedication')}
                  </div>
                ) : (
                  <div className="flex items-center gap-2">
                    <Plus className="h-4 w-4" />
                    {t('addMedication')}
                  </div>
                )}
              </Button>
              
              <Button
                type="button"
                variant="outline"
                onClick={onCancel}
                disabled={loading}
                className="flex items-center gap-2"
              >
                <X className="h-4 w-4" />
                {t('cancel')}
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
