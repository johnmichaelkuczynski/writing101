# Living Book: Incompleteness of Deductive Logic

## Overview

This is an interactive AI-augmented interface for exploring the academic paper "The Incompleteness of Deductive Logic: A Generalization of Gödel's Theorem". The application transforms a static academic document into a dynamic, conversational learning experience with mathematical notation support and multiple AI model integration.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **UI Framework**: Shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with CSS variables for theming
- **State Management**: TanStack Query for server state, React hooks for local state
- **Routing**: Wouter for lightweight client-side routing
- **Math Rendering**: KaTeX for mathematical notation display

### Backend Architecture
- **Runtime**: Node.js with Express.js
- **Language**: TypeScript with ES modules
- **Database**: PostgreSQL with Drizzle ORM
- **Session Storage**: In-memory storage with planned PostgreSQL migration
- **Build System**: Vite for frontend, esbuild for backend bundling

### Development Environment
- **Dev Server**: Vite with HMR and error overlay
- **Environment**: Replit-optimized with cartographer integration
- **Type Checking**: TypeScript strict mode enabled

## Key Components

### Document Processing
- Pre-loaded academic paper content (no upload functionality)
- Structured sections with auto-generated navigation
- Mathematical notation rendering with KaTeX
- Responsive document viewer with sticky navigation

### AI Integration
- **Multi-Model Support**: DeepSeek (default), OpenAI GPT-4, Claude 3, Perplexity
- **Context-Aware Processing**: Full document context provided to AI models
- **Dual Interface Types**: 
  - Chat interface for Q&A about the paper
  - Instruction interface for content modification and analysis

### User Interface
- **Navigation Sidebar**: Auto-linked document sections
- **Model Selector**: Runtime AI model switching
- **Chat Interface**: Conversational interaction with document context
- **Instruction Box**: Command-based content manipulation
- **Export Features**: PDF generation, email sharing, clipboard copy

## Data Flow

1. **Document Loading**: Static paper content loaded from pre-defined data structure
2. **User Interaction**: Commands/questions captured through chat or instruction interfaces
3. **AI Processing**: Full document context + user input sent to selected AI model
4. **Response Handling**: AI responses processed, stored, and displayed with math rendering
5. **Session Persistence**: Chat history and instructions stored in database for session continuity

## External Dependencies

### Core Libraries
- **@anthropic-ai/sdk**: Claude AI integration
- **@neondatabase/serverless**: PostgreSQL database connection
- **@sendgrid/mail**: Email functionality for sharing
- **@tanstack/react-query**: Server state management and caching

### UI Components
- **@radix-ui/***: Accessible component primitives
- **class-variance-authority**: Component variant styling
- **cmdk**: Command palette functionality
- **date-fns**: Date formatting utilities

### Development Tools
- **drizzle-kit**: Database schema management and migrations
- **tsx**: TypeScript execution for development
- **wouter**: Lightweight routing solution

## Deployment Strategy

### Build Process
1. Frontend built with Vite to `dist/public`
2. Backend bundled with esbuild to `dist/index.js`
3. Database migrations applied via Drizzle Kit
4. Static assets served through Express in production

### Environment Variables
- `DATABASE_URL`: PostgreSQL connection string (required)
- `OPENAI_API_KEY`: OpenAI API access
- `ANTHROPIC_API_KEY`: Anthropic Claude API access
- `SENDGRID_API_KEY`: Email service configuration

### Production Configuration
- Node.js process serving bundled application
- PostgreSQL database for persistent storage
- Static file serving for frontend assets
- API routes for AI integration and document processing

## User Preferences

Preferred communication style: Simple, everyday language.
- Chat interface should be much larger (made 420px wide)
- User input should be a large textarea, not small input field
- Email functionality should only appear when user clicks on a specific response, not as a persistent input field
- AI responses should be very short (3-4 sentences maximum) unless user specifically asks for elaboration
- Enter key should send messages (Shift+Enter for new lines)

## Changelog

- July 01, 2025: Initial setup
- July 01, 2025: Fixed chat interface layout and functionality
  - Made document area much wider (max-w-5xl) for better readability
  - Added Enter key support for sending messages (Shift+Enter for new lines)
  - Fixed markdown rendering in chat responses with proper HTML formatting
  - Implemented KaTeX math notation rendering for mathematical formulas
  - Added full paper content to AI context for accurate responses
  - Configured AI models to use proper LaTeX notation ($...$, $$...$$)
- July 01, 2025: Added voice dictation functionality
  - Integrated AssemblyAI and Gladia speech-to-text services
  - Added voice recording button to instruction interface
  - Mobile-friendly microphone support with real-time recording feedback
  - Automatic transcription appends to text input for seamless use
- July 01, 2025: Added text highlighting and selection functionality
  - Users can highlight passages in the paper with mouse selection
  - Selection toolbar appears with "Ask" and "Highlight" buttons
  - Questions about highlighted text auto-populate the input box
  - Visual highlighting persists on selected passages
  - Seamless integration with voice dictation and chat interface
- July 01, 2025: CRITICAL FIX - Implemented conversation memory
  - AI now remembers previous conversation history (last 6 exchanges)
  - Follow-up questions properly reference earlier discussion
  - Fixed isolated Q&A issue - now supports genuine conversations
  - Context includes both paper content and conversation history
- July 01, 2025: Performance optimizations for faster responses
  - Reduced conversation history to last 3 exchanges (from 6) for speed
  - Compressed paper context to key concepts instead of full text
  - Reduced max_tokens from 2000 to 300 for faster generation
  - Lowered temperature from 0.7 to 0.3 for more focused responses
  - Response time improved from ~8s to ~6.5s