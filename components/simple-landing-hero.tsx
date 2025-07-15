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
  Timer
} from 'lucide-react'

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
  const router = useRouter()

  useEffect(() => {
    setIsVisible(true)
  }, [])

  const handleGetStarted = () => {
    router.push('/dashboard')
  }

  const features = [
    { icon: Brain, title: "AI-Powered", desc: "Smart medication insights" },
    { icon: Bell, title: "Real-time Alerts", desc: "Never miss a dose" },
    { icon: Shield, title: "Secure & Safe", desc: "HIPAA compliant" },
    { icon: Activity, title: "Health Monitoring", desc: "Track adherence patterns" }
  ]

  const stats = [
    { value: "99.9%", label: "Accuracy", icon: CheckCircle },
    { value: "24/7", label: "Monitoring", icon: Clock },
    { value: "50K+", label: "Lives Improved", icon: Heart },
    { value: "5sec", label: "Response Time", icon: Zap }
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 relative overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 medical-pattern opacity-20"></div>
      
      {/* Animated gradient orbs */}
      <div className="absolute top-20 left-20 w-72 h-72 bg-primary/30 rounded-full blur-3xl animate-pulse-glow"></div>
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow-delayed"></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-glow-slow"></div>

      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16">
        {/* Header */}
        <div className="text-center mb-16 animate-fade-in-up">
          <div className="flex items-center justify-center mb-6">
            <Badge className="bg-primary/20 text-primary border-primary/30 text-lg px-6 py-2 rounded-full hover:scale-105 transition-transform">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Healthcare
            </Badge>
          </div>
          
          <h1 className="text-6xl md:text-8xl font-bold mb-8 text-gradient-medical leading-tight">
            Never miss a{' '}
            <span className="text-secondary">
              {isVisible && <TypewriterText text="dose again" />}
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed">
            Revolutionary <span className="text-primary font-semibold">AI-powered smart pill dispenser</span> with 
            real-time monitoring, personalized healthcare insights, and seamless medication management.
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleGetStarted}
              className="btn-medical text-lg px-8 py-6 rounded-2xl group hover:scale-105 transition-transform"
            >
              Get Started
              <ChevronRight className="w-5 h-5 ml-2 group-hover:translate-x-1 transition-transform" />
            </Button>
            
            <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 text-lg px-8 py-6 rounded-2xl hover:scale-105 transition-transform">
              <Activity className="w-5 h-5 mr-2" />
              View Demo
            </Button>
          </div>
        </div>

        {/* Features Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {features.map((feature, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${index * 200}ms` }}>
              <Card className="card-medical p-6 text-center group hover:scale-105 transition-all duration-300 hover:shadow-medical">
                <CardContent className="p-0">
                  <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4 group-hover:rotate-12 transition-transform duration-300">
                    <feature.icon className="w-8 h-8 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                  <p className="text-gray-400">{feature.desc}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Stats Section */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {stats.map((stat, index) => (
            <div key={index} className="animate-fade-in-up" style={{ animationDelay: `${400 + index * 150}ms` }}>
              <Card className="glass-effect p-6 text-center border-primary/20 hover:scale-105 transition-transform duration-300">
                <CardContent className="p-0">
                  <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                  <div className="text-3xl font-bold text-white mb-1 animate-count-up">
                    {stat.value}
                  </div>
                  <p className="text-gray-400 text-sm">{stat.label}</p>
                </CardContent>
              </Card>
            </div>
          ))}
        </div>

        {/* Device Showcase */}
        <div className="text-center mb-16 animate-fade-in-up" style={{ animationDelay: '800ms' }}>
          <div className="relative inline-block hover:scale-105 transition-transform duration-300">
            <div className="bg-gradient-primary p-8 rounded-3xl shadow-medical hover:shadow-glow transition-shadow">
              <div className="flex items-center justify-center space-x-8">
                <div className="bg-white/20 p-6 rounded-2xl hover:rotate-6 transition-transform">
                  <Pill className="w-12 h-12 text-white" />
                </div>
                
                <div className="flex items-center text-white animate-pulse">
                  <Wifi className="w-8 h-8 mr-2" />
                  <span className="text-lg font-semibold">Connected</span>
                </div>
                
                <div className="bg-white/20 p-6 rounded-2xl hover:-rotate-6 transition-transform">
                  <Smartphone className="w-12 h-12 text-white" />
                </div>
              </div>
              
              <p className="text-white/90 mt-4 text-lg">
                Seamlessly synced across all your devices
              </p>
            </div>
          </div>
        </div>

        {/* CTA Section */}
        <div className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 border border-primary/20 animate-fade-in-up" style={{ animationDelay: '1000ms' }}>
          <h2 className="text-4xl font-bold text-white mb-4">
            Ready to revolutionize your healthcare?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Join thousands of patients who never miss a dose with DoseBuddy
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button 
              onClick={handleGetStarted}
              className="btn-medical text-lg px-10 py-6 rounded-2xl hover:scale-105 transition-transform"
            >
              <Timer className="w-5 h-5 mr-2" />
              Start Your Journey
            </Button>
            
            <div className="flex items-center text-gray-400 text-sm">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              No credit card required
            </div>
          </div>
        </div>

        {/* Floating notification demo */}
        <div className="fixed bottom-8 right-8 z-50 animate-slide-in-right" style={{ animationDelay: '2000ms' }}>
          <Card className="glass-effect p-4 border-primary/30 max-w-sm animate-bounce-gentle shadow-glow">
            <CardContent className="p-0">
              <div className="flex items-center space-x-3">
                <div className="bg-primary/20 p-2 rounded-full">
                  <Bell className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="text-white font-semibold text-sm">Time for your medication!</p>
                  <p className="text-gray-400 text-xs">Aspirin - 1 tablet</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
