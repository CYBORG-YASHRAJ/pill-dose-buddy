"use client"

import { useState, useEffect } from 'react'
import { motion, useAnimation } from 'framer-motion'
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
  Users,
  TrendingUp,
  ChevronRight,
  Sparkles,
  Timer,
  AlertTriangle
} from 'lucide-react'

interface LandingHeroProps {
  onGetStarted: () => void
}

const FloatingCard = ({ children, delay = 0 }: { children: React.ReactNode, delay?: number }) => (
  <motion.div
    animate={{ 
      y: [0, -10, 0],
    }}
    transition={{ 
      duration: 4,
      repeat: Infinity,
      ease: "easeInOut",
      delay
    }}
    className="transform-gpu"
  >
    {children}
  </motion.div>
)

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
  const controls = useAnimation()
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
    controls.start("visible")
  }, [controls])

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.1
      }
    }
  }

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
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
      <div className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '1s' }}></div>
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-64 h-64 bg-accent/20 rounded-full blur-3xl animate-pulse-glow" style={{ animationDelay: '2s' }}></div>

      <motion.div 
        className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-20 pb-16"
        variants={containerVariants}
        initial="hidden"
        animate={controls}
      >
        {/* Header */}
        <motion.div className="text-center mb-16" variants={itemVariants}>
          <motion.div 
            className="flex items-center justify-center mb-6"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <Badge className="bg-primary/20 text-primary border-primary/30 text-lg px-6 py-2 rounded-full">
              <Sparkles className="w-4 h-4 mr-2" />
              AI-Powered Healthcare
            </Badge>
          </motion.div>
          
          <motion.h1 
            className="text-6xl md:text-8xl font-bold mb-8 text-gradient-medical leading-tight"
            variants={itemVariants}
          >
            Never miss a{' '}
            <span className="text-secondary">
              {isVisible && <TypewriterText text="dose again" />}
            </span>
          </motion.h1>
          
          <motion.p 
            className="text-xl md:text-2xl text-gray-300 mb-8 max-w-4xl mx-auto leading-relaxed"
            variants={itemVariants}
          >
            Revolutionary <span className="text-primary font-semibold">AI-powered smart pill dispenser</span> with 
            real-time monitoring, personalized healthcare insights, and seamless medication management.
          </motion.p>

          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onGetStarted}
                className="btn-medical text-lg px-8 py-6 rounded-2xl group"
              >
                Get Started
                <motion.div
                  className="ml-2"
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <ChevronRight className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
            
            <motion.div whileHover={{ scale: 1.05 }}>
              <Button variant="outline" className="border-primary/30 text-primary hover:bg-primary/10 text-lg px-8 py-6 rounded-2xl">
                <Activity className="w-5 h-5 mr-2" />
                View Demo
              </Button>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Features Grid */}
        <motion.div 
          className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
        >
          {features.map((feature, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FloatingCard delay={index * 0.5}>
                <Card className="card-medical p-6 text-center group hover:scale-105 transition-transform duration-300">
                  <CardContent className="p-0">
                    <motion.div 
                      className="inline-flex items-center justify-center w-16 h-16 bg-gradient-primary rounded-2xl mb-4"
                      whileHover={{ rotate: 360 }}
                      transition={{ duration: 0.5 }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3 className="text-lg font-semibold text-white mb-2">{feature.title}</h3>
                    <p className="text-gray-400">{feature.desc}</p>
                  </CardContent>
                </Card>
              </FloatingCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Stats Section */}
        <motion.div 
          className="grid grid-cols-2 lg:grid-cols-4 gap-6 mb-16"
          variants={containerVariants}
        >
          {stats.map((stat, index) => (
            <motion.div key={index} variants={itemVariants}>
              <FloatingCard delay={index * 0.3}>
                <Card className="glass-effect p-6 text-center border-primary/20">
                  <CardContent className="p-0">
                    <stat.icon className="w-8 h-8 text-primary mx-auto mb-3" />
                    <motion.div 
                      className="text-3xl font-bold text-white mb-1"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: index * 0.2 + 0.5, type: "spring" }}
                    >
                      {stat.value}
                    </motion.div>
                    <p className="text-gray-400 text-sm">{stat.label}</p>
                  </CardContent>
                </Card>
              </FloatingCard>
            </motion.div>
          ))}
        </motion.div>

        {/* Device Showcase */}
        <motion.div 
          className="text-center mb-16"
          variants={itemVariants}
        >
          <motion.div 
            className="relative inline-block"
            whileHover={{ scale: 1.02 }}
            transition={{ type: "spring", stiffness: 300 }}
          >
            <FloatingCard>
              <div className="bg-gradient-primary p-8 rounded-3xl shadow-medical">
                <div className="flex items-center justify-center space-x-8">
                  <motion.div 
                    className="bg-white/20 p-6 rounded-2xl"
                    whileHover={{ rotate: 5 }}
                  >
                    <Pill className="w-12 h-12 text-white" />
                  </motion.div>
                  
                  <motion.div 
                    className="flex items-center text-white"
                    animate={{ opacity: [0.5, 1, 0.5] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  >
                    <Wifi className="w-8 h-8 mr-2" />
                    <span className="text-lg font-semibold">Connected</span>
                  </motion.div>
                  
                  <motion.div 
                    className="bg-white/20 p-6 rounded-2xl"
                    whileHover={{ rotate: -5 }}
                  >
                    <Smartphone className="w-12 h-12 text-white" />
                  </motion.div>
                </div>
                
                <motion.p 
                  className="text-white/90 mt-4 text-lg"
                  variants={itemVariants}
                >
                  Seamlessly synced across all your devices
                </motion.p>
              </div>
            </FloatingCard>
          </motion.div>
        </motion.div>

        {/* CTA Section */}
        <motion.div 
          className="text-center bg-gradient-to-r from-primary/10 to-secondary/10 rounded-3xl p-12 border border-primary/20"
          variants={itemVariants}
        >
          <motion.h2 
            className="text-4xl font-bold text-white mb-4"
            variants={itemVariants}
          >
            Ready to revolutionize your healthcare?
          </motion.h2>
          <motion.p 
            className="text-xl text-gray-300 mb-8"
            variants={itemVariants}
          >
            Join thousands of patients who never miss a dose with DoseBuddy
          </motion.p>
          
          <motion.div 
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
            variants={itemVariants}
          >
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button 
                onClick={onGetStarted}
                className="btn-medical text-lg px-10 py-6 rounded-2xl"
              >
                <Timer className="w-5 h-5 mr-2" />
                Start Your Journey
              </Button>
            </motion.div>
            
            <div className="flex items-center text-gray-400 text-sm">
              <CheckCircle className="w-4 h-4 mr-2 text-green-400" />
              No credit card required
            </div>
          </motion.div>
        </motion.div>

        {/* Floating notification demo */}
        <motion.div
          className="fixed bottom-8 right-8 z-50"
          initial={{ opacity: 0, y: 100 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 3, duration: 0.5 }}
        >
          <motion.div
            animate={{ 
              scale: [1, 1.05, 1],
              boxShadow: [
                "0 0 20px rgba(52, 203, 234, 0.3)",
                "0 0 30px rgba(52, 203, 234, 0.6)", 
                "0 0 20px rgba(52, 203, 234, 0.3)"
              ]
            }}
            transition={{ duration: 2, repeat: Infinity }}
          >
            <Card className="glass-effect p-4 border-primary/30 max-w-sm">
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
          </motion.div>
        </motion.div>
      </motion.div>
    </div>
  )
}
