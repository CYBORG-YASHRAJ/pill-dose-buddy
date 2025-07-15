"use client"

import { useState, useEffect, useCallback } from 'react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'
import { Badge } from '@/components/ui/badge'
import { Button } from '@/components/ui/button'
import { Alert, AlertDescription } from '@/components/ui/alert'
import { Separator } from '@/components/ui/separator'
import { Progress } from '@/components/ui/progress'
import { 
  Bell, 
  Pill, 
  Clock, 
  Activity, 
  AlertTriangle, 
  CheckCircle, 
  XCircle,
  Wifi,
  WifiOff,
  Users,
  Calendar,
  TrendingUp,
  Plus
} from 'lucide-react'
import { firebaseService, type Dose, type Notification, type PillDispenser } from '@/lib/firebase-service'
import EnhancedMedicationForm from '@/components/enhanced-medication-form'

interface MissedDoseAdvice {
  recommendation: 'take_now' | 'take_with_adjustment' | 'skip_dose' | 'contact_healthcare'
  reasoning: string
  urgency: 'low' | 'medium' | 'high' | 'critical'
  nextSteps: string[]
  warnings?: string[]
  timeSensitive: boolean
}

interface DashboardNotification extends Notification {
  id: string
}

interface DashboardData {
  doses: Record<string, Dose>
  notifications: DashboardNotification[]
  dispenserStatus: PillDispenser | null
  unreadCount: number
}

export default function PillDoseBuddyDashboard() {
  const [dashboardData, setDashboardData] = useState<DashboardData>({
    doses: {},
    notifications: [],
    dispenserStatus: null,
    unreadCount: 0
  })
  const [loading, setLoading] = useState(true)
  const [selectedDose, setSelectedDose] = useState<string | null>(null)
  const [advice, setAdvice] = useState<MissedDoseAdvice | null>(null)
  const [loadingAdvice, setLoadingAdvice] = useState(false)
  const [showMedicationForm, setShowMedicationForm] = useState(false)

  // Initialize Firebase and set up real-time listeners
  useEffect(() => {
    let unsubscribeFunctions: (() => void)[] = []

    const initializeApp = async () => {
      try {
        await firebaseService.initialize()
        
        // Function to update all medications (both user doses and global medications)
        const updateAllMedications = async () => {
          try {
            const allMedications = await firebaseService.getAllUserMedications()
            setDashboardData(prev => ({ ...prev, doses: allMedications }))
          } catch (error) {
            console.error('Error fetching medications:', error)
          }
        }

        // Set up real-time listeners for both user doses and global medications
        const unsubscribeDoses = firebaseService.onUserDosesChange(async (doses) => {
          await updateAllMedications()
        })

        const unsubscribeGlobalMedications = firebaseService.onGlobalMedicationsChange(async (medications) => {
          await updateAllMedications()
        })
        
        // Initial load of all medications
        await updateAllMedications()
        
        const unsubscribeNotifications = firebaseService.onUserNotificationsChange((notifications) => {
          const notificationArray = Object.entries(notifications || {})
            .map(([id, notification]) => ({ id, ...notification }))
            .sort((a, b) => b.timestamp - a.timestamp)
          
          const unreadCount = notificationArray.filter(n => !n.read).length
          
          setDashboardData(prev => ({ 
            ...prev, 
            notifications: notificationArray,
            unreadCount 
          }))
        })
        
        const unsubscribeDispenser = firebaseService.onPillDispenserStatusChange((dispenserStatus) => {
          setDashboardData(prev => ({ ...prev, dispenserStatus }))
        })
        
        unsubscribeFunctions = [unsubscribeDoses, unsubscribeGlobalMedications, unsubscribeNotifications, unsubscribeDispenser]
        setLoading(false)
        
      } catch (error) {
        console.error('Error initializing app:', error)
        setLoading(false)
      }
    }

    initializeApp()

    return () => {
      unsubscribeFunctions.forEach(unsubscribe => unsubscribe())
    }
  }, [])

  const handleGetAdvice = useCallback(async (doseId: string) => {
    setLoadingAdvice(true)
    setSelectedDose(doseId)
    
    try {
      const response = await fetch('/api/missed-dose-advisor', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ doseId }),
      })
      
      const data = await response.json()
      
      if (data.success) {
        setAdvice(data.advice)
      } else {
        console.error('Error getting advice:', data.error)
      }
    } catch (error) {
      console.error('Error fetching advice:', error)
    } finally {
      setLoadingAdvice(false)
    }
  }, [])

  const markNotificationAsRead = useCallback(async (notificationId: string) => {
    try {
      await fetch('/api/notifications', {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ notificationId, markAsRead: true }),
      })
    } catch (error) {
      console.error('Error marking notification as read:', error)
    }
  }, [])

  const handleMedicationFormSubmit = useCallback(() => {
    setShowMedicationForm(false)
    // The real-time listeners will automatically update the data
  }, [])

  // Show medication form if requested
  if (showMedicationForm) {
    return (
      <EnhancedMedicationForm 
        onSubmit={handleMedicationFormSubmit}
        onCancel={() => setShowMedicationForm(false)}
      />
    )
  }

  const getConnectionStatus = () => {
    if (!dashboardData.dispenserStatus) return { status: 'unknown', color: 'gray' }
    
    const lastSeen = new Date(dashboardData.dispenserStatus.lastSeen)
    const now = new Date()
    const timeDiff = now.getTime() - lastSeen.getTime()
    const minutesAgo = Math.floor(timeDiff / (1000 * 60))
    
    if (minutesAgo <= 5) return { status: 'online', color: 'green' }
    if (minutesAgo <= 15) return { status: 'poor', color: 'yellow' }
    return { status: 'offline', color: 'red' }
  }

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'low': return 'bg-green-100 text-green-800 border-green-200'
      case 'medium': return 'bg-yellow-100 text-yellow-800 border-yellow-200'
      case 'high': return 'bg-orange-100 text-orange-800 border-orange-200'
      case 'critical': return 'bg-red-100 text-red-800 border-red-200'
      default: return 'bg-gray-100 text-gray-800 border-gray-200'
    }
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Connecting to PillDoseBuddy...</p>
        </div>
      </div>
    )
  }

  const connectionStatus = getConnectionStatus()
  const upcomingDoses = Object.entries(dashboardData.doses)
    .filter(([_, dose]) => dose.status === 'upcoming')
    .slice(0, 5)
  
  const missedDoses = Object.entries(dashboardData.doses)
    .filter(([_, dose]) => dose.status === 'missed')
  
  const takenDoses = Object.entries(dashboardData.doses)
    .filter(([_, dose]) => dose.status === 'taken')

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-white">
      <div className="max-w-7xl mx-auto p-6 space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <h1 className="text-3xl font-bold text-blue-600 flex items-center justify-center gap-2">
            <Pill className="h-8 w-8" />
            PillDoseBuddy
          </h1>
          <p className="text-gray-600">Smart Medication Management System</p>
        </div>

        {/* Status Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          {/* Dispenser Status */}
          <Card className={`border-2 ${connectionStatus.status === 'online' ? 'border-green-200 bg-green-50' : 'border-red-200 bg-red-50'}`}>
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                {connectionStatus.status === 'online' ? (
                  <Wifi className="h-5 w-5 text-green-600" />
                ) : (
                  <WifiOff className="h-5 w-5 text-red-600" />
                )}
                <div>
                  <p className="font-medium">Dispenser Status</p>
                  <p className={`text-sm capitalize text-${connectionStatus.color}-600`}>
                    {connectionStatus.status}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notifications */}
          <Card className="border-2 border-blue-200 bg-blue-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-blue-600" />
                <div>
                  <p className="font-medium">Notifications</p>
                  <p className="text-sm text-blue-600">
                    {dashboardData.unreadCount} unread
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Missed Doses */}
          <Card className="border-2 border-red-200 bg-red-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <AlertTriangle className="h-5 w-5 text-red-600" />
                <div>
                  <p className="font-medium">Missed Doses</p>
                  <p className="text-sm text-red-600">
                    {missedDoses.length} pending
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Adherence Rate */}
          <Card className="border-2 border-purple-200 bg-purple-50">
            <CardContent className="p-4">
              <div className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-purple-600" />
                <div>
                  <p className="font-medium">Adherence</p>
                  <p className="text-sm text-purple-600">
                    {Math.round((takenDoses.length / (takenDoses.length + missedDoses.length + 1)) * 100)}%
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>

        {/* Missed Doses Alert */}
        {missedDoses.length > 0 && (
          <Card className="border-red-200 bg-red-50">
            <CardHeader>
              <CardTitle className="text-red-800 flex items-center gap-2">
                <AlertTriangle className="h-5 w-5" />
                Missed Doses Requiring Attention
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {missedDoses.map(([doseId, dose]) => {
                const delay = firebaseService.calculateDoseDelay(dose.time)
                return (
                  <div key={doseId} className="bg-white p-4 rounded-lg border border-red-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <Pill className="h-6 w-6 text-blue-600" />
                        <div>
                          <p className="font-medium">{dose.name}</p>
                          <p className="text-sm text-gray-600">
                            Scheduled: {new Date(dose.time).toLocaleString()}
                          </p>
                          <p className="text-sm text-red-600">
                            Missed by: {delay.displayText}
                          </p>
                          {dose.conditions && (
                            <p className="text-sm text-purple-600">
                              Conditions: {dose.conditions}
                            </p>
                          )}
                        </div>
                      </div>
                      <Button 
                        onClick={() => handleGetAdvice(doseId)}
                        disabled={loadingAdvice && selectedDose === doseId}
                        className="bg-blue-600 hover:bg-blue-700"
                      >
                        {loadingAdvice && selectedDose === doseId ? (
                          <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                        ) : (
                          'Get AI Advice'
                        )}
                      </Button>
                    </div>
                  </div>
                )
              })}
            </CardContent>
          </Card>
        )}

        {/* AI Advice Modal */}
        {advice && selectedDose && (
          <Card className={`border-2 ${getUrgencyColor(advice.urgency)}`}>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5" />
                AI Medication Advice
                <Badge variant="outline" className={getUrgencyColor(advice.urgency)}>
                  {advice.urgency.toUpperCase()}
                </Badge>
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div>
                <h4 className="font-medium mb-2">Recommendation:</h4>
                <p className="text-lg font-semibold">
                  {advice.recommendation.replace(/_/g, ' ').toUpperCase()}
                </p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Reasoning:</h4>
                <p>{advice.reasoning}</p>
              </div>
              
              <div>
                <h4 className="font-medium mb-2">Next Steps:</h4>
                <ul className="list-disc list-inside space-y-1">
                  {advice.nextSteps.map((step, index) => (
                    <li key={index}>{step}</li>
                  ))}
                </ul>
              </div>
              
              {advice.warnings && advice.warnings.length > 0 && (
                <Alert className="border-yellow-200 bg-yellow-50">
                  <AlertTriangle className="h-4 w-4" />
                  <AlertDescription>
                    <strong>Warnings:</strong>
                    <ul className="list-disc list-inside mt-1">
                      {advice.warnings.map((warning, index) => (
                        <li key={index}>{warning}</li>
                      ))}
                    </ul>
                  </AlertDescription>
                </Alert>
              )}
              
              <Alert className="border-blue-200 bg-blue-50">
                <AlertDescription>
                  <strong>Disclaimer:</strong> This advice is generated by AI. Always consult your healthcare provider before taking action.
                </AlertDescription>
              </Alert>
              
              <div className="flex gap-2">
                <Button 
                  onClick={() => {
                    setAdvice(null)
                    setSelectedDose(null)
                  }}
                  variant="outline"
                >
                  Close
                </Button>
                {advice.recommendation === 'contact_healthcare' && (
                  <Button className="bg-red-600 hover:bg-red-700">
                    Contact Healthcare Provider
                  </Button>
                )}
              </div>
            </CardContent>
          </Card>
        )}

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* All Medications */}
          <Card>
            <CardHeader>
              <div className="flex items-center justify-between">
                <CardTitle className="flex items-center gap-2">
                  <Pill className="h-5 w-5 text-blue-600" />
                  All Medications
                </CardTitle>
                <Button 
                  onClick={() => setShowMedicationForm(true)}
                  className="bg-blue-600 hover:bg-blue-700"
                  size="sm"
                >
                  <Plus className="h-4 w-4 mr-2" />
                  Add New
                </Button>
              </div>
            </CardHeader>
            <CardContent className="space-y-3 max-h-96 overflow-y-auto">
              {Object.entries(dashboardData.doses).length > 0 ? (
                Object.entries(dashboardData.doses).map(([doseId, dose]) => (
                  <div key={doseId} className="p-3 bg-gray-50 rounded-lg border border-gray-200">
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`w-3 h-3 rounded-full ${
                          dose.status === 'taken' ? 'bg-green-500' : 
                          dose.status === 'missed' ? 'bg-red-500' : 'bg-blue-500'
                        }`}></div>
                        <div>
                          <p className="font-medium">{dose.name}</p>
                          <p className="text-sm text-gray-600">
                            {new Date(dose.time).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                          </p>
                          {dose.conditions && (
                            <p className="text-xs text-purple-600">{dose.conditions}</p>
                          )}
                        </div>
                      </div>
                      <div className="text-right">
                        <Badge 
                          variant="outline" 
                          className={
                            dose.status === 'taken' ? 'bg-green-50 text-green-700 border-green-200' :
                            dose.status === 'missed' ? 'bg-red-50 text-red-700 border-red-200' :
                            'bg-blue-50 text-blue-700 border-blue-200'
                          }
                        >
                          {dose.status}
                        </Badge>
                        <p className="text-xs text-gray-500 mt-1">Chamber {dose.chamber}</p>
                      </div>
                    </div>
                  </div>
                ))
              ) : (
                <div className="text-center py-8">
                  <Pill className="h-12 w-12 text-gray-300 mx-auto mb-4" />
                  <p className="text-gray-500 mb-4">No medications found</p>
                  <Button 
                    onClick={() => setShowMedicationForm(true)}
                    className="bg-blue-600 hover:bg-blue-700"
                  >
                    <Plus className="h-4 w-4 mr-2" />
                    Add Your First Medication
                  </Button>
                </div>
              )}
            </CardContent>
          </Card>

          {/* Upcoming Doses */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Calendar className="h-5 w-5 text-green-600" />
                Upcoming Doses
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-3">
              {upcomingDoses.length > 0 ? (
                upcomingDoses.map(([doseId, dose]) => (
                  <div key={doseId} className="flex items-center justify-between p-3 bg-green-50 rounded-lg border border-green-200">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-600" />
                      <div>
                        <p className="font-medium">{dose.name}</p>
                        <p className="text-sm text-gray-600">
                          {new Date(dose.time).toLocaleString()}
                        </p>
                      </div>
                    </div>
                    <Badge variant="secondary">Chamber {dose.chamber}</Badge>
                  </div>
                ))
              ) : (
                <p className="text-gray-500 text-center py-4">No upcoming doses</p>
              )}
            </CardContent>
          </Card>
        </div>

        {/* Recent Notifications */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Bell className="h-5 w-5 text-blue-600" />
              Recent Notifications
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-3 max-h-96 overflow-y-auto">
            {dashboardData.notifications.length > 0 ? (
              dashboardData.notifications.slice(0, 10).map((notification) => (
                <div 
                  key={notification.id} 
                  className={`p-3 rounded-lg border ${
                    notification.read ? 'bg-gray-50 border-gray-200' : 'bg-blue-50 border-blue-200'
                  }`}
                  onClick={() => !notification.read && markNotificationAsRead(notification.id)}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <p className={`text-sm ${notification.read ? 'text-gray-600' : 'text-blue-800 font-medium'}`}>
                        {notification.message}
                      </p>
                      <p className="text-xs text-gray-500 mt-1">
                        {new Date(notification.timestamp).toLocaleString()}
                      </p>
                    </div>
                    {!notification.read && (
                      <div className="w-2 h-2 bg-blue-600 rounded-full mt-1"></div>
                    )}
                  </div>
                </div>
              ))
            ) : (
              <p className="text-gray-500 text-center py-4">No notifications</p>
            )}
          </CardContent>
        </Card>

        {/* Dispenser Details */}
        {dashboardData.dispenserStatus && (
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Activity className="h-5 w-5 text-purple-600" />
                Dispenser Details
              </CardTitle>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Status</p>
                <p className={`text-lg ${dashboardData.dispenserStatus.isOnline ? 'text-green-600' : 'text-red-600'}`}>
                  {dashboardData.dispenserStatus.isOnline ? 'Online' : 'Offline'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Last Dispense</p>
                <p className="text-lg">{dashboardData.dispenserStatus.lastDispenseTime}</p>
                <p className={`text-sm ${dashboardData.dispenserStatus.lastDispenseSuccessful ? 'text-green-600' : 'text-red-600'}`}>
                  {dashboardData.dispenserStatus.lastDispenseSuccessful ? 'Successful' : 'Failed'}
                </p>
              </div>
              <div className="p-4 bg-gray-50 rounded-lg">
                <p className="font-medium">Last Seen</p>
                <p className="text-lg">{new Date(dashboardData.dispenserStatus.lastSeen).toLocaleTimeString()}</p>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  )
}
