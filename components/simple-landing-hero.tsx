"use client"

import { useState, useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Card, CardContent } from '@/components/ui/card'
import { 
  Pill, 
  Smartphone, 
  Activity, 
  Shield, 
  Wifi,
  Bell,
  Brain,
  Clock,
  Heart,
  CheckCircle,
  Zap,
  ChevronRight,
  Sparkles,
  Timer,
  Languages
} from 'lucide-react'

// Comprehensive translations object for English and Hindi
const translations = {
  en: {
    // Main content
    aiPoweredHealthcare: "AI-Powered Healthcare",
    neverMissA: "Never miss a",
    doseAgain: "dose again",
    revolutionaryDescription: "Revolutionary AI-powered smart pill dispenser with real-time monitoring, personalized healthcare insights, and seamless medication management.",
    aiPowered: "AI-powered smart pill dispenser",
    getStarted: "Get Started",
    viewDemo: "View Demo",
    
    // Features
    aiPoweredFeature: "AI-Powered",
    smartMedicationInsights: "Smart medication insights",
    realTimeAlerts: "Real-time Alerts",
    neverMissADose: "Never miss a dose",
    secureAndSafe: "Secure & Safe",
    hipaaCompliant: "HIPAA compliant",
    healthMonitoring: "Health Monitoring",
    trackAdherence: "Track adherence patterns",
    
    // Stats
    accuracy: "Accuracy",
    monitoring: "Monitoring",
    livesImproved: "Lives Improved",
    responseTime: "Response Time",
    
    // Device showcase
    connected: "Connected",
    seamlesslySync: "Seamlessly synced across all your devices",
    
    // CTA
    readyToRevolutionize: "Ready to revolutionize your healthcare?",
    joinThousands: "Join thousands of patients who never miss a dose with PillDoseBuddy",
    startYourJourney: "Start Your Journey",
    noCreditCard: "No credit card required",
    
    // Notification
    timeForMedication: "Time for your medication!",
    aspirinTablet: "Aspirin - 1 tablet",
    
    // Language
    english: "English",
    hindi: "हिंदी"
  },
  hi: {
    // Main content
    aiPoweredHealthcare: "AI-संचालित स्वास्थ्य सेवा",
    neverMissA: "कभी न भूलें",
    doseAgain: "दवा की खुराक",
    revolutionaryDescription: "क्रांतिकारी AI-संचालित स्मार्ट पिल डिस्पेंसर जो वास्तविक समय निगरानी, व्यक्तिगत स्वास्थ्य अंतर्दृष्टि और निर्बाध दवा प्रबंधन प्रदान करता है।",
    aiPowered: "AI-संचालित स्मार्ट पिल डिस्पेंसर",
    getStarted: "शुरू करें",
    viewDemo: "डेमो देखें",
    
    // Features
    aiPoweredFeature: "AI-संचालित",
    smartMedicationInsights: "स्मार्ट दवा अंतर्दृष्टि",
    realTimeAlerts: "वास्तविक समय अलर्ट",
    neverMissADose: "कभी खुराक न भूलें",
    secureAndSafe: "सुरक्षित और सुरक्षित",
    hipaaCompliant: "HIPAA अनुपालित",
    healthMonitoring: "स्वास्थ्य निगरानी",
    trackAdherence: "पालन पैटर्न ट्रैक करें",
    
    // Stats
    accuracy: "सटीकता",
    monitoring: "निगरानी",
    livesImproved: "जीवन में सुधार",
    responseTime: "प्रतिक्रिया समय",
    
    // Device showcase
    connected: "जुड़ा हुआ",
    seamlesslySync: "आपके सभी उपकरणों में निर्बाध सिंक",
    
    // CTA
    readyToRevolutionize: "अपनी स्वास्थ्य सेवा में क्रांति लाने के लिए तैयार हैं?",
    joinThousands: "हजारों रोगियों के साथ जुड़ें जो PillDoseBuddy के साथ कभी खुराक नहीं भूलते",
    startYourJourney: "अपनी यात्रा शुरू करें",
    noCreditCard: "कोई क्रेडिट कार्ड आवश्यक नहीं",
    
    // Notification
    timeForMedication: "आपकी दवा का समय!",
    aspirinTablet: "एस्पिरिन - 1 गोली",
    
    // Language
    english: "English",
    hindi: "हिंदी"
  }
}

interface LandingHeroProps {
  onGetStarted: () => void
}

const TypewriterText = ({ text }: { text: string }) => {
  const [displayText, setDisplayText] = useState('')
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex])
        setCurrentIndex(prev => prev + 1)
      }, 100)
      return () => clearTimeout(timeout)
    }
  }, [currentIndex, text])

  return <span>{displayText}<span className="animate-pulse">|</span></span>
}

export function LandingHero({ onGetStarted }: LandingHeroProps) {
  const [isVisible, setIsVisible] = useState(false)
  const [currentLanguage, setCurrentLanguage] = useState<'en' | 'hi'>('en')
  const router = useRouter()

  // Translation helper function
  const t = (key: string) => translations[currentLanguage][key as keyof typeof translations['en']] || key

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  const features = [
    { icon: Brain, title: t('aiPoweredFeature'), desc: t('smartMedicationInsights') },
    { icon: Bell, title: t('realTimeAlerts'), desc: t('neverMissADose') },
    { icon: Shield, title: t('secureAndSafe'), desc: t('hipaaCompliant') },
    { icon: Activity, title: t('healthMonitoring'), desc: t('trackAdherence') }
  ]

  const stats = [
    { value: "99.9%", label: t('accuracy'), icon: CheckCircle },
    { value: "24/7", label: t('monitoring'), icon: Clock },
    { value: "50K+", label: t('livesImproved'), icon: Heart },
    { value: "5sec", label: t('responseTime'), icon: Zap }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 medical-pattern opacity-10"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-blue-400/20 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-cyan-500/15 rounded-full blur-3xl animate-pulse-glow-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/15 rounded-full blur-3xl animate-pulse-glow-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Language Selector */}
        <div className="absolute top-4 right-4 z-20">
          <select 
            value={currentLanguage} 
            onChange={(e) => setCurrentLanguage(e.target.value as 'en' | 'hi')}
            className="bg-white/80 border border-blue-200 rounded-lg px-3 py-2 text-gray-700 focus:ring-2 focus:ring-blue-400 focus:border-transparent text-sm backdrop-blur-sm"
          >
            <option value="en">{t('english')}</option>
            <option value="hi">{t('hindi')}</option>
          </select>
        </div>

        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center mb-6">
            <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30 text-lg px-6 py-2 rounded-full hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('aiPoweredHealthcare')}
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 leading-tight">
            <span className="bg-gradient-to-r from-blue-600 via-blue-500 to-cyan-500 bg-clip-text text-transparent">
              {t('neverMissA')}{' '}
            </span>
            <span className="bg-gradient-to-r from-cyan-500 to-blue-600 bg-clip-text text-transparent">
              {isVisible && <TypewriterText text={t('doseAgain')} />}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-8 max-w-4xl mx-auto leading-relaxed">
            {t('revolutionaryDescription').split(t('aiPowered'))[0]}
            <span className="text-blue-600 font-semibold">{t('aiPowered')}</span>
            {t('revolutionaryDescription').split(t('aiPowered'))[1]}
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white text-lg px-8 py-6 rounded-2xl group hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              {t('getStarted')}
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" className="border-blue-400/50 text-blue-600 hover:bg-blue-500/10 text-lg px-8 py-6 rounded-2xl hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 mr-2" />
              {t('viewDemo')}
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
              <Card className="backdrop-blur-lg bg-white/80 border border-blue-200 p-6 text-center group hover:scale-105 transition-all duration-300 hover:shadow-2xl hover:bg-white/90 shadow-lg">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-2xl mb-4 group-hover:rotate-12 transition-transform duration-300 shadow-lg">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-gray-800 mb-2">{feature.title}</h3>
                  <p className="text-gray-600">{feature.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${400 + index * 150}ms` }}>
              <Card className="backdrop-blur-lg bg-white/80 border border-blue-200 p-6 text-center hover:scale-105 transition-all duration-300 hover:bg-white/90 shadow-lg">
                <CardContent className="p-0">
                  <stat.icon className="w-8 h-8 text-blue-600 mx-auto mb-3" />
                  <div className="text-3xl font-bold text-gray-800 mb-1 animate-count-up">
                    {stat.value}
                  </div>
                  <p className="text-gray-600 text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Device Showcase */}
        <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <div className="relative inline-block hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-to-r from-blue-500 to-cyan-600 p-8 rounded-3xl shadow-2xl hover:shadow-blue-500/25 transition-all duration-300">
              <div className="flex items-center justify-center space-x-8">
                <div className="bg-white/20 p-6 rounded-2xl hover:rotate-6 transition-transform backdrop-blur-sm">
                  <Pill className="w-12 h-12 text-white" />
                </div>
                
                <div className="flex items-center text-white animate-pulse">
                  <Wifi className="w-8 h-8 mr-2" />
                  <span className="text-lg font-semibold">{t('connected')}</span>
                </div>
                
                <div className="bg-white/20 p-6 rounded-2xl hover:-rotate-6 transition-transform backdrop-blur-sm">
                  <Smartphone className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <p className="text-white/90 mt-4 text-lg">
                {t('seamlesslySync')}
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-blue-500/10 to-cyan-500/10 rounded-3xl p-12 border border-blue-500/20 backdrop-blur-lg animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
          <h2 className="text-4xl font-bold text-gray-800 mb-4">
            {t('readyToRevolutionize')}
          </h2>
          <p className="text-xl text-gray-600 mb-8">
            {t('joinThousands')}
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleGetStarted}
              className="bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white text-lg px-10 py-6 rounded-2xl hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <Timer className="w-5 h-5 mr-2" />
              {t('startYourJourney')}
            </Button>
            
            <div className="flex items-center text-gray-500 text-sm">
              <CheckCircle className="w-4 h-4 mr-2 text-green-500" />
              {t('noCreditCard')}
            </div>
          </div>
        </div>

        {/* Floating notification demo */}
        <div className="fixed bottom-8 right-8 z-50 animate-slide-in-right" style={{ animationDelay: '2000ms' }}>
          <Card className="backdrop-blur-lg bg-white/90 border border-blue-500/30 p-4 max-w-sm animate-bounce-gentle shadow-2xl hover:shadow-blue-500/25">
            <CardContent className="p-0">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-500/20 p-2 rounded-full">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-800 font-semibold text-sm">{t('timeForMedication')}</p>
                  <p className="text-gray-600 text-xs">{t('aspirinTablet')}</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
