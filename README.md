# DoseBuddy - AI-Powered Medication Management System

## Features
- ✅ **Complete Multilingual Support**: English, Hindi (हिंदी), Tamil (தமிழ்), and Punjabi (ਪੰਜਾਬੀ)
- ✅ **AI-Powered Chat Assistant**: Intelligent medication management with GitHub Models integration
- ✅ **Smart Medication Tracking**: Advanced dose scheduling and adherence monitoring
- ✅ **Voice Synthesis**: Text-to-speech support for all languages
- ✅ **Missed Dose Advisor**: Intelligent recommendations for missed medications
- ✅ **Modern Dashboard**: Vertical tab layout with responsive design
- ✅ **Landing Page**: Professional hero section with language selection

## Setup Instructions

### 1. Environment Configuration

Copy the example environment file:
```bash
cp .env.example .env.local
```

### 2. GitHub Models API Setup (Required for AI Chat)

To enable the AI chat functionality, you need to configure a GitHub token with access to GitHub Models:

1. Go to [GitHub Settings > Personal Access Tokens](https://github.com/settings/tokens)
2. Click "Generate new token (classic)"
3. Give it a name like "DoseBuddy AI"
4. Select the following scopes:
   - `model` (for GitHub Models access)
   - `read:user` (basic user information)
5. Copy the generated token
6. Add it to your `.env.local` file:
   ```
   GITHUB_TOKEN=your_actual_token_here
   ```

### 3. Install Dependencies

```bash
npm install
# or
pnpm install
```

### 4. Run the Development Server

```bash
npm run dev
# or
pnpm dev
```

Visit `http://localhost:3000` to see the application.

## Language Support

The application supports four languages with complete translations:

- **English** - Default language
- **Hindi (हिंदी)** - Full translation including AI responses
- **Tamil (தமிழ்)** - Complete UI and voice synthesis support
- **Punjabi (ਪੰਜਾਬੀ)** - Comprehensive multilingual integration

### Language Features

1. **UI Translation**: All interface elements are translated
2. **Voice Synthesis**: Text-to-speech in all supported languages
3. **AI Chat**: Intelligent responses in the user's preferred language
4. **Fallback System**: If AI is unavailable, smart fallback responses are provided
5. **Dynamic Language Switching**: Change language anytime from any component

## AI Chat System

The AI chat system provides:

- **Intelligent Fallback**: If GitHub token is not configured, the system provides intelligent responses based on message content
- **Multilingual AI**: AI responds in the user's selected language
- **Context Awareness**: AI has access to medication data and user context
- **Error Handling**: Graceful degradation when API is unavailable

### AI Capabilities

1. Medication adherence analysis
2. Missed dose advice
3. Schedule optimization suggestions
4. Health insights and reports
5. Personalized recommendations
- **Multilingual Interface**: Complete English/Hindi support

### 📊 AI-Powered Dashboard
- **Real-time AI Chat**: Chat with GPT-4 about your medications
- **AI Health Reports**: Generate comprehensive health analysis reports
- **Smart Recommendations**: AI-powered medication optimization
- **Voice Responses**: AI speaks responses in your language

## 🔧 Setup Instructions

### 1. Environment Variables
Copy `.env.local.example` to `.env.local` and fill in your tokens:

```bash
# GitHub Models API Token (for GPT-4)
GITHUB_TOKEN=your-github-token-here

# Alternative: Direct OpenAI API
OPENAI_API_KEY=your-openai-api-key-here

# Firebase Config (for real data)
NEXT_PUBLIC_FIREBASE_API_KEY=your-firebase-api-key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
# ... other Firebase config
```

### 2. Get GitHub Token for AI
1. Go to [GitHub Settings > Developer settings > Personal access tokens](https://github.com/settings/tokens)
2. Generate a new token with appropriate permissions
3. Add it to your `.env.local` file

### 3. Install Dependencies
```bash
npm install
# or
pnpm install
```

### 4. Run the Application
```bash
npm run dev
# or
pnpm dev
```

## 🎯 AI Features Usage

### Chat with AI Assistant
1. Go to Dashboard > AI Assistant tab
2. Ask questions about your medications
3. Get personalized advice and recommendations
4. Enable voice responses for spoken answers

### Generate Health Reports
1. Go to Dashboard > Reports tab
2. Click on any AI report button:
   - **Adherence Analysis**: Medication pattern analysis
   - **Health Insights**: Overall health recommendations
   - **Optimization**: Schedule improvement suggestions
3. Download generated reports for your records

### Real Data Integration
- All medication data is stored and retrieved from Firebase
- AI analyzes your actual medication history
- Reports are generated based on real usage patterns
- No dummy data - everything is personalized

## 🌍 Multilingual Support
- Switch between English and Hindi using the language selector
- All AI responses adapt to your selected language
- Complete UI translation including buttons, labels, and messages

## 🎨 Theme & Branding
- **DoseBuddy**: Clear branding throughout the application
- **AI Focus**: Emphasizes AI-powered healthcare features
- **White/Blue Theme**: Professional medical color scheme
- **Responsive Design**: Works on all device sizes

## 🔒 Data Privacy
- Real medication data stored securely in Firebase
- AI processing through encrypted APIs
- No data shared with third parties
- HIPAA-compliant design principles

## 📱 Device Integration
- Smart dispenser connectivity simulation
- Real-time status monitoring
- Cross-device synchronization
- Mobile-responsive interface

## 🚀 Next Steps
1. Add your GitHub token to enable real AI features
2. Configure Firebase for production data storage
3. Test the AI chat and report generation
4. Customize the AI prompts for your specific needs

---

**Note**: This is a production-ready implementation with real AI integration. Replace the placeholder tokens with your actual API keys to enable all features.
