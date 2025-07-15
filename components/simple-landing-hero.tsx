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
  Languages,
  Target
} from 'lucide-react'

// Comprehensive translations object for English and Hindi
const translations = {
  en: {
    // Main content
    aiPoweredHealthcare: "AI-Powered DoseBuddy",
    neverMissA: "AI-powered smart medication with",
    doseAgain: "DoseBuddy intelligence",
    revolutionaryDescription: "Revolutionary AI-powered DoseBuddy system with real-time monitoring, personalized healthcare insights, intelligent dose analysis, and seamless medication management powered by advanced AI.",
    aiPowered: "AI-powered DoseBuddy system",
    getStarted: "Get Started with AI",
    viewDemo: "View AI Demo",
    
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
    joinThousands: "Join thousands of patients who never miss a dose with AI-powered DoseBuddy",
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
    aiPoweredHealthcare: "AI-संचालित डोज़बडी",
    neverMissA: "AI-संचालित स्मार्ट दवा के साथ",
    doseAgain: "डोज़बडी बुद्धिमत्ता",
    revolutionaryDescription: "क्रांतिकारी AI-संचालित डोज़बडी सिस्टम जो वास्तविक समय निगरानी, व्यक्तिगत स्वास्थ्य अंतर्दृष्टि, बुद्धिमान खुराक विश्लेषण और उन्नत AI द्वारा संचालित निर्बाध दवा प्रबंधन प्रदान करता है।",
    aiPowered: "AI-संचालित डोज़बडी सिस्टम",
    getStarted: "AI के साथ शुरू करें",
    viewDemo: "AI डेमो देखें",
    
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
    joinThousands: "हजारों रोगियों के साथ जुड़ें जो AI-संचालित डोज़बडी के साथ कभी खुराक नहीं भूलते",
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
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-white to-blue-50 relative overflow-hidden">
      {/* Industrial Grid Background */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(rgba(59, 130, 246, 0.1) 1px, transparent 1px),
                           linear-gradient(90deg, rgba(59, 130, 246, 0.1) 1px, transparent 1px)`,
          backgroundSize: '40px 40px'
        }}></div>
      </div>
      
      {/* Professional gradient overlays */}
      <div className="absolute top-0 left-0 w-full h-32 bg-gradient-to-b from-blue-900/5 to-transparent"></div>
      <div className="absolute bottom-0 left-0 w-full h-32 bg-gradient-to-t from-slate-900/5 to-transparent"></div>
      
      {/* Subtle geometric patterns */}
      <div className="absolute top-20 right-20 w-64 h-64 border border-blue-200/20 rounded-full"></div>
      <div className="absolute bottom-32 left-20 w-48 h-48 border border-slate-300/20 rounded-full"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Professional Header with Corporate Branding */}
        <div className="flex items-center justify-between py-6 border-b border-gray-200">
          <div className="flex items-center gap-4">
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 p-3 rounded-lg shadow-lg">
              <Pill className="h-8 w-8 text-white" />
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900">
                DoseBuddy<span className="text-blue-600">™</span>
              </h1>
              <p className="text-sm text-gray-600 font-medium">Enterprise Healthcare Solutions</p>
            </div>
          </div>
          
          {/* Language Selector - Professional Style */}
          <div className="flex items-center gap-4">
            <select 
              value={currentLanguage} 
              onChange={(e) => setCurrentLanguage(e.target.value as 'en' | 'hi')}
              className="bg-white border border-gray-300 rounded-md px-4 py-2 text-gray-700 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 text-sm font-medium shadow-sm"
            >
              <option value="en">{t('english')}</option>
              <option value="hi">{t('hindi')}</option>
            </select>
          </div>
        </div>

        {/* Hero Section - Corporate Style */}
        <div className="py-20 text-center">
          <div className="mb-8">
            <Badge className="bg-blue-50 text-blue-700 border-blue-200 text-sm px-6 py-2 rounded-full font-semibold">
              <Sparkles className="w-4 h-4 mr-2" />
              {t('aiPoweredHealthcare')} Platform
            </Badge>
          </div>
          
          <h1 className="text-5xl md:text-7xl font-bold mb-8 leading-tight">
            <span className="text-gray-900">
              {t('neverMissA')}{' '}
            </span>
            <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
              {isVisible && <TypewriterText text={t('doseAgain')} />}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-700 mb-12 max-w-4xl mx-auto leading-relaxed font-light">
            {t('revolutionaryDescription')}
          </p>

          {/* Professional CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-16">
            <Button 
              onClick={handleGetStarted}
              className="bg-blue-600 hover:bg-blue-700 text-white text-lg px-10 py-4 rounded-lg font-semibold shadow-lg hover:shadow-xl transition-all duration-300 flex items-center gap-3"
            >
              <Brain className="w-5 h-5" />
              {t('getStarted')}
              <ChevronRight className="w-5 h-5" />
            </Button>
            
            <Button 
              variant="outline" 
              className="border-2 border-gray-300 text-gray-700 hover:bg-gray-50 text-lg px-10 py-4 rounded-lg font-semibold transition-all duration-300"
            >
              <Activity className="w-5 h-5 mr-2" />
              {t('viewDemo')}
            </Button>
          </div>

          {/* Trust Indicators */}
          <div className="flex items-center justify-center gap-8 text-sm text-gray-500 mb-16">
            <div className="flex items-center gap-2">
              <Shield className="w-4 h-4 text-green-600" />
              <span>HIPAA Compliant</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4 text-blue-600" />
              <span>FDA Approved</span>
            </div>
            <div className="flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-600" />
              <span>Enterprise Ready</span>
            </div>
          </div>
        </div>

        {/* Enterprise Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-20">
          {features.map((feature, index) => (
            <div key={index} className="group">
              <Card className="bg-white border border-gray-200 hover:border-blue-300 p-8 text-center transition-all duration-300 hover:shadow-lg h-full">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-50 border-2 border-blue-100 rounded-lg mb-6 group-hover:bg-blue-100 transition-colors">
                    <feature.icon className="w-8 h-8 text-blue-600" />
                  </div>
                  <h3 className="text-lg font-bold text-gray-900 mb-3">{feature.title}</h3>
                  <p className="text-gray-600 leading-relaxed">{feature.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Enterprise Metrics */}
        <div className="bg-gradient-to-r from-gray-50 to-blue-50 rounded-2xl p-12 mb-20 border border-gray-200">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-4">Trusted by Healthcare Leaders</h2>
            <p className="text-gray-600 text-lg">Industry-leading performance metrics</p>
          </div>
          
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="inline-flex items-center justify-center w-12 h-12 bg-blue-100 rounded-lg mb-4">
                  <stat.icon className="w-6 h-6 text-blue-600" />
                </div>
                <div className="text-4xl font-bold text-gray-900 mb-2">{stat.value}</div>
                <p className="text-gray-600 font-medium">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Enterprise Integration Showcase */}
        <div className="text-center mb-20">
          <h2 className="text-3xl font-bold text-gray-900 mb-8">Enterprise Integration</h2>
          <div className="relative inline-block">
            <div className="bg-white border-2 border-gray-200 p-12 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300">
              <div className="flex items-center justify-center space-x-12">
                <div className="bg-blue-50 p-8 rounded-xl border border-blue-200">
                  <Pill className="w-16 h-16 text-blue-600" />
                  <p className="mt-4 font-semibold text-gray-800">Smart Dispensers</p>
                </div>
                
                <div className="flex items-center text-blue-600">
                  <div className="w-8 h-0.5 bg-blue-300"></div>
                  <Wifi className="w-8 h-8 mx-4" />
                  <div className="w-8 h-0.5 bg-blue-300"></div>
                </div>
                
                <div className="bg-gray-50 p-8 rounded-xl border border-gray-200">
                  <Smartphone className="w-16 h-16 text-gray-600" />
                  <p className="mt-4 font-semibold text-gray-800">Mobile Platform</p>
                </div>
                
                <div className="flex items-center text-blue-600">
                  <div className="w-8 h-0.5 bg-blue-300"></div>
                  <Brain className="w-8 h-8 mx-4" />
                  <div className="w-8 h-0.5 bg-blue-300"></div>
                </div>
                
                <div className="bg-green-50 p-8 rounded-xl border border-green-200">
                  <Activity className="w-16 h-16 text-green-600" />
                  <p className="mt-4 font-semibold text-gray-800">AI Analytics</p>
                </div>
              </div>
              
              <p className="text-gray-600 mt-8 text-lg font-medium">
                {t('seamlesslySync')}
              </p>
            </div>
          </div>
        </div>

        {/* Enterprise CTA Section */}
        <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-2xl p-16 text-center text-white mb-20">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-bold mb-6">
              {t('readyToRevolutionize')}
            </h2>
            <p className="text-xl mb-8 text-blue-100">
              {t('joinThousands')}
            </p>
            
            <div className="flex flex-col sm:flex-row gap-6 justify-center items-center mb-8">
              <Button 
                onClick={handleGetStarted}
                className="bg-white text-blue-600 hover:bg-gray-50 text-lg px-12 py-4 rounded-lg font-bold transition-all duration-300 shadow-lg hover:shadow-xl"
              >
                <Brain className="w-5 h-5 mr-2" />
                {t('startYourJourney')}
              </Button>
              
              <div className="flex items-center text-blue-200 text-sm">
                <CheckCircle className="w-4 h-4 mr-2" />
                {t('noCreditCard')}
              </div>
            </div>

            {/* Enterprise Features List */}
            <div className="grid md:grid-cols-3 gap-6 mt-12 text-left">
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">Enterprise Security</p>
                  <p className="text-sm text-blue-200">HIPAA compliant infrastructure</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">24/7 Support</p>
                  <p className="text-sm text-blue-200">Dedicated customer success</p>
                </div>
              </div>
              <div className="flex items-start gap-3">
                <CheckCircle className="w-5 h-5 text-green-400 mt-1 flex-shrink-0" />
                <div>
                  <p className="font-semibold">API Integration</p>
                  <p className="text-sm text-blue-200">Seamless EHR connectivity</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Professional Footer */}
        <div className="border-t border-gray-200 pt-12 pb-8 text-center">
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="bg-blue-600 p-2 rounded-lg">
              <Pill className="h-6 w-6 text-white" />
            </div>
            <span className="text-xl font-bold text-gray-900">
              DoseBuddy<span className="text-blue-600">™</span>
            </span>
          </div>
          <p className="text-gray-600 text-sm">
            © 2025 DoseBuddy Enterprise Healthcare Solutions. All rights reserved.
          </p>
          <div className="flex items-center justify-center gap-6 mt-4 text-xs text-gray-500">
            <span>Privacy Policy</span>
            <span>Terms of Service</span>
            <span>HIPAA Compliance</span>
            <span>Enterprise Support</span>
          </div>
        </div>

        {/* Professional notification demo */}
        <div className="fixed bottom-8 right-8 z-50 animate-slide-in-right" style={{ animationDelay: '2000ms' }}>
          <Card className="bg-white border border-gray-200 p-4 max-w-sm shadow-2xl">
            <CardContent className="p-0">
              <div className="flex items-center space-x-3">
                <div className="bg-blue-50 p-2 rounded-lg border border-blue-200">
                  <Bell className="w-5 h-5 text-blue-600" />
                </div>
                <div>
                  <p className="text-gray-900 font-semibold text-sm">{t('timeForMedication')}</p>
                  <p className="text-gray-600 text-xs">{t('aspirinTablet')}</p>
                </div>
                <div className="bg-green-50 p-1 rounded">
                  <CheckCircle className="w-4 h-4 text-green-600" />
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
