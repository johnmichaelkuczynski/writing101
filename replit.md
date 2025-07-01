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
- Chat interface should be much larger (made 800px wide)
- User input should be a large textarea, not small input field
- Email functionality should only appear when user clicks on a specific response, not as a persistent input field

## Changelog

Changelog:
- July 01, 2025. Initial setup