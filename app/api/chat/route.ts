import { NextRequest, NextResponse } from 'next/server'

// Real OpenAI API integration with GitHub Models
const GITHUB_TOKEN = process.env.GITHUB_TOKEN || 'your-github-token-here'
const API_URL = 'https://models.inference.ai.azure.com/chat/completions'

export async function POST(request: NextRequest) {
  try {
    const { message, context } = await request.json()
    
    if (!message) {
      return NextResponse.json({ error: 'Message is required' }, { status: 400 })
    }

    // Prepare system prompt based on context
    const systemPrompt = `You are DoseBuddy AI, an advanced healthcare assistant specialized in medication management. You have access to the user's medication data and can provide personalized insights.

User Context:
- Language: ${context?.language || 'en'}
- Current medications: ${JSON.stringify(context?.doses || [])}
- Recent notifications: ${JSON.stringify(context?.notifications || [])}
- Member: ${context?.memberInfo || 'Unknown'}

Your capabilities:
1. Analyze medication adherence patterns
2. Provide missed dose advice
3. Suggest schedule optimizations
4. Answer medication-related questions
5. Generate health insights and reports
6. Provide AI-powered recommendations

Always provide helpful, accurate, and personalized responses. If asked about serious medical conditions, recommend consulting healthcare professionals. Respond in ${context?.language === 'hi' ? 'Hindi' : 'English'}.`

    // Call real OpenAI API through GitHub Models
    const response = await fetch(API_URL, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${GITHUB_TOKEN}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'gpt-4o', // Using GPT-4 Omni model
        messages: [
          {
            role: 'system',
            content: systemPrompt
          },
          {
            role: 'user',
            content: message
          }
        ],
        max_tokens: 1000,
        temperature: 0.7,
        top_p: 0.9
      })
    })

    if (!response.ok) {
      console.error('OpenAI API error:', await response.text())
      throw new Error(`OpenAI API error: ${response.status}`)
    }

    const data = await response.json()
    const aiResponse = data.choices?.[0]?.message?.content || 'I apologize, but I encountered an error processing your request.'

    return NextResponse.json({ 
      response: aiResponse,
      model: 'gpt-4o',
      timestamp: new Date().toISOString()
    })

  } catch (error) {
    console.error('Chat API error:', error)
    
    // Fallback response for errors
    const fallbackResponse = 'Hello! I\'m DoseBuddy AI, your intelligent medication management assistant. I can help you with medication schedules, adherence tracking, and health insights. How can I assist you today?'
    
    return NextResponse.json({ 
      response: fallbackResponse,
      error: 'AI service temporarily unavailable',
      fallback: true
    })
  }
}
