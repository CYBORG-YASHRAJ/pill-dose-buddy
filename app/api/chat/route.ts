import { NextRequest, NextResponse } from 'next/server'

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()
    
    // Extract relevant context from the user's data
    const { doses, notifications, language } = context
    
    // Build context for the AI
    const systemPrompt = `You are a helpful AI health assistant for PillDoseBuddy, a smart medication management system. 
    
    Current user context:
    - Language: ${language}
    - Total medications today: ${doses?.filter((d: any) => new Date(d.scheduledTime).toDateString() === new Date().toDateString()).length || 0}
    - Missed doses: ${doses?.filter((d: any) => d.status === 'missed').length || 0}
    - Taken doses: ${doses?.filter((d: any) => d.status === 'taken').length || 0}
    - Pending notifications: ${notifications?.filter((n: any) => !n.isRead).length || 0}
    
    Guidelines:
    - Provide helpful, accurate medical information
    - Always recommend consulting healthcare providers for serious concerns
    - Be supportive and encouraging about medication adherence
    - Respond in ${language === 'hi' ? 'Hindi' : 'English'} when appropriate
    - Keep responses concise but informative
    - Focus on medication management, adherence, and general health wellness`

    // For demo purposes, we'll create intelligent responses based on common queries
    const response = generateIntelligentResponse(message, context)
    
    return NextResponse.json({ 
      response,
      timestamp: new Date().toISOString()
    })
    
  } catch (error) {
    console.error('Chat API error:', error)
    return NextResponse.json(
      { error: 'Failed to process chat request' },
      { status: 500 }
    )
  }
}

function generateIntelligentResponse(message: string, context: any) {
  const lowerMessage = message.toLowerCase()
  const { language, doses } = context
  
  // Medication-related queries
  if (lowerMessage.includes('medication') || lowerMessage.includes('medicine') || lowerMessage.includes('pill') || lowerMessage.includes('dose')) {
    if (language === 'hi') {
      return 'मैं आपकी दवा प्रबंधन में सहायता कर सकता हूँ। आपकी दवा का समय निर्धारित रखना बहुत महत्वपूर्ण है। क्या आपका कोई विशिष्ट सवाल है? यदि आपको कोई साइड इफेक्ट महसूस हो रहा है, तो कृपया अपने डॉक्टर से संपर्क करें।'
    }
    return 'I can help you manage your medications effectively. Consistent timing is crucial for medication effectiveness. Do you have any specific questions about your current medications? If you\'re experiencing side effects, please consult your healthcare provider.'
  }
  
  // Missed dose queries
  if (lowerMessage.includes('missed') || lowerMessage.includes('forgot') || lowerMessage.includes('skip')) {
    const missedCount = doses?.filter((d: any) => d.status === 'missed').length || 0
    if (language === 'hi') {
      return `मैं देख रहा हूँ कि आपकी ${missedCount} खुराक छूट गई है। यदि आपकी खुराक छूट गई है, तो याद आते ही तुरंत लें, बशर्ते अगली खुराक का समय न हो। कभी भी दोहरी खुराक न लें। अधिक जानकारी के लिए अपने डॉक्टर से संपर्क करें।`
    }
    return `I see you have ${missedCount} missed doses. If you miss a dose, take it as soon as you remember, unless it's almost time for your next dose. Never double up on doses. For specific guidance, consult your healthcare provider.`
  }
  
  // Side effects queries
  if (lowerMessage.includes('side effect') || lowerMessage.includes('reaction') || lowerMessage.includes('symptom')) {
    if (language === 'hi') {
      return 'साइड इफेक्ट्स के बारे में चिंता समझ में आती है। यदि आप कोई नए या गंभीर लक्षण महसूस कर रहे हैं, तो तुरंत अपने डॉक्टर से संपर्क करें। मैं सामान्य जानकारी दे सकता हूँ, लेकिन चिकित्सा सलाह के लिए हमेशा अपने डॉक्टर से मिलें।'
    }
    return 'Side effect concerns are understandable. If you\'re experiencing any new or severe symptoms, contact your healthcare provider immediately. I can provide general information, but always consult your doctor for medical advice.'
  }
  
  // Schedule optimization
  if (lowerMessage.includes('schedule') || lowerMessage.includes('time') || lowerMessage.includes('when')) {
    if (language === 'hi') {
      return 'दवा का समय निर्धारण बहुत महत्वपूर्ण है। सुबह की दवाएं खाली पेट लें (जब तक डॉक्टर ने अलग न कहा हो), और शाम की दवाएं खाने के बाद। अलार्म सेट करें और रोज़ाना एक ही समय पर लें।'
    }
    return 'Medication timing is crucial for effectiveness. Take morning medications on an empty stomach (unless directed otherwise), and evening doses with food. Set alarms and maintain consistent daily timing for best results.'
  }
  
  // Health trends
  if (lowerMessage.includes('trend') || lowerMessage.includes('progress') || lowerMessage.includes('adherence')) {
    const adherenceRate = doses?.length > 0 ? 
      Math.round((doses.filter((d: any) => d.status === 'taken').length / doses.length) * 100) : 0
    
    if (language === 'hi') {
      return `आपकी वर्तमान पालन दर ${adherenceRate}% है। 80% से ऊपर बहुत अच्छा है! नियमित दवा लेना आपके स्वास्थ्य में सुधार लाता है। मैं आपके पैटर्न की निगरानी करके बेहतर सुझाव दे सकता हूँ।`
    }
    return `Your current adherence rate is ${adherenceRate}%. Above 80% is excellent! Consistent medication taking leads to better health outcomes. I can monitor your patterns to provide personalized recommendations.`
  }
  
  // General health
  if (lowerMessage.includes('health') || lowerMessage.includes('wellness') || lowerMessage.includes('feel')) {
    if (language === 'hi') {
      return 'आपका स्वास्थ्य सबसे महत्वपूर्ण है। नियमित दवा, संतुलित आहार, व्यायाम और पर्याप्त नींद जरूरी है। कोई भी चिंता हो तो अपने डॉक्टर से संपर्क करें। मैं यहाँ आपकी सहायता के लिए हूँ।'
    }
    return 'Your health is the top priority. Regular medication, balanced diet, exercise, and adequate sleep are essential. For any health concerns, consult your healthcare provider. I\'m here to support your medication management journey.'
  }
  
  // Default response
  if (language === 'hi') {
    return 'मैं आपकी दवा प्रबंधन, स्वास्थ्य संबंधी प्रश्न, और सामान्य चिकित्सा जानकारी में सहायता कर सकता हूँ। आप क्या जानना चाहते हैं? कृपया याद रखें कि गंभीर स्वास्थ्य समस्याओं के लिए हमेशा अपने डॉक्टर से सलाह लें।'
  }
  return 'I can help with medication management, health questions, and general medical information. What would you like to know? Remember to always consult your healthcare provider for serious health concerns.'
}
