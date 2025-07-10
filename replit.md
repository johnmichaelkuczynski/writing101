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
- July 01, 2025: Balanced response length optimization
  - Increased max_tokens from 300 to 600 for more informative responses
  - Relaxed "very short" requirement to allow thorough explanations
  - AI now provides helpful, complete answers while staying focused
  - Maintains conversation memory and fast response times
- July 02, 2025: Document content replacement with Kuczynski-Quine dialogue
  - Replaced academic paper on logic with philosophical dialogue on empiricism
  - Content now features debate between Kuczynski (rationalist) and Quine (empiricist)
  - Structured dialogue into 7 thematic sections covering properties, perception, language
  - Created shared content module for cross-platform access (client/server)
  - Updated navigation to reflect new dialogue structure
  - Maintained all existing AI functionality with new philosophical content
- July 06, 2025: Document content replacement with financial regulation history
  - Replaced Kuczynski-Quine dialogue with comprehensive financial regulation document
  - Content now features "The Case for Financial Regulation" covering American financial history
  - Structured into 7 sections: Introduction, Early Regulation, 1929 Crash, Deregulation Wave, Investment Banking, 2008 Crisis, Post-Crisis Regulation, and Conclusion
  - Maintains chronological flow from colonial times through post-2008 reforms
  - Content covers Glass-Steagall, deregulation period, and modern financial crises
  - All existing AI functionality preserved with new financial regulation content
- July 07, 2025: Document content replacement with Russell's mathematical philosophy
  - Replaced semantics philosophy content with "Introduction to Mathematical Philosophy" by Bertrand Russell
  - Content now features comprehensive mathematical philosophy covering foundational concepts
  - Structured into 7 sections: Natural Numbers, Definition of Number, Mathematical Induction, Definition of Order, Kinds of Relations, Similarity of Relations, Rational/Real/Complex Numbers, and Mathematics and Logic
  - Covers Peano's axioms, mathematical induction, relation theory, number system extensions, and the logicist thesis
  - Updated AI context to handle mathematical philosophy with proper mathematical notation and logical argument structure
  - All existing functionality (chat, rewrite, voice, text selection) preserved with new mathematical philosophy content
- July 07, 2025: UI improvements for better user experience
  - Widened AI chat interface from 420px to 550px (1.3x wider) for improved dialogue experience
  - Increased font size from text-sm to text-base for user messages and text-lg for AI responses
  - Enhanced readability and usability based on user feedback
  - Maintained all existing functionality while improving visual presentation
- July 07, 2025: Comprehensive rewrite functionality implementation
  - Added text selection rewrite: users can highlight text and click "Rewrite" from selection toolbar
  - Added chunk-based document rewrite: "Rewrite Document" button allows selecting 1000-word chunks
  - Implemented recursive rewriting: users can rewrite the rewritten content multiple times
  - Added modal interface with chunk selection, custom instructions, and progress tracking
  - Integrated export functionality: download rewrites as TXT or PDF files
  - Added Enter key support: users can press Enter to start rewrite (Shift+Enter for new lines)
  - Enhanced error handling and user feedback for rewrite operations
  - Database schema expanded with rewrites table for storing rewrite history and relationships
  - Fixed recursive rewrite to allow new custom instructions for each re-rewrite
  - Implemented text cleaning to remove markdown formatting and improve paragraph structure
  - Added proper text formatting with whitespace preservation for better readability
  - Added inline instruction input for "Rewrite Again" with dedicated text area for new instructions
  - Each rewrite result now has its own instruction field for customized recursive rewrites
  - Fixed PDF download functionality using browser's print-to-PDF feature
  - Replaced server-side PDF generation with client-side print dialog for better reliability
- July 07, 2025: Math Perfection Mode toggle implementation
  - Added "Math Perfection Mode" toggle in header with calculator icon and switch
  - When enabled: displays mathematical notation with full LaTeX/KaTeX rendering
  - When disabled: converts LaTeX to plain text (fractions become (a)/(b), sqrt(2), etc.)
  - Math mode affects document display, chat responses, instruction interface, and rewrite outputs
  - Enhanced mathematical content with proper LaTeX notation examples
  - Added real-time switching between mathematical and plain text display modes
  - Math rendering automatically updates when toggle is switched
  - Provides accessibility option for users who prefer plain text mathematical expressions
- July 08, 2025: Document content replacement with "Tractatus Logico-Philosophicus" by Ludwig Wittgenstein
  - Replaced Sun Tzu content with Wittgenstein's foundational work of analytic philosophy
  - Content now features 7 philosophical sections covering the logical structure of language and reality
  - Structured sections: The World, Facts and Objects, Pictures and Propositions, Thought and Language, Logic and Truth Functions, Ethics and the Mystical, and The Limits of Language
  - Covers fundamental philosophical concepts including the picture theory of meaning, logical atomism, truth-functional analysis, and the limits of meaningful language
  - Updated AI context to handle philosophical analysis, logical reasoning, and the relationship between language and reality
  - Emphasizes Wittgenstein's approach to dissolving philosophical problems through logical clarification
  - API keys activated for OpenAI, Anthropic, and Perplexity models (DeepSeek available as fallback)
  - All existing functionality (chat, rewrite, voice, text selection, math mode) preserved with new philosophical content
  - CRITICAL UPDATE: Replaced all created content with authentic Wittgenstein text extracted from authoritative edition PDF
  - Content now features genuine numbered propositions (1-7) directly from the original Tractatus source
  - Authentic philosophical propositions include: "The world is everything that is the case," "Whereof one cannot speak, thereof one must be silent"
  - AI context updated to reflect authentic Wittgenstein concepts and terminology from the actual text
- July 09, 2025: Enhanced rewrite functionality with in-app full text viewer
  - Added "View Full Text" button to each rewrite result for in-app viewing
  - Implemented full-screen popup modal (90% viewport width, 80% height) to display complete rewritten content
  - Full text viewer includes original instructions, complete rewritten text, and download options
  - Enhanced math rendering support for both preview and full text views
  - Users can now read entire rewrites in-app without requiring PDF downloads
  - Maintained existing download functionality (TXT/PDF) alongside new viewing option
  - Improved user experience by providing immediate access to complete rewrite results
- July 09, 2025: Mind map functionality removed
  - Removed all mind map components, hooks, and backend services
  - Cleaned up UI elements including header button and selection toolbar mind map option
  - Removed API endpoints and shared schema definitions for mind map functionality
  - Simplified application architecture by removing unused features
- July 09, 2025: Concept Lattice 1.0 implementation
  - Implemented comprehensive Concept Lattice 1.0 as replacement for removed mind map functionality
  - Added interactive visual analysis with 5 node types: Main Ideas, Basic Arguments, Examples, Supporting Quotes, Fine Arguments
  - Built hierarchical visual structure using ReactFlow with draggable nodes and connecting edges
  - Implemented deep interactivity: all nodes (except main ideas) are clickable, expandable, and editable
  - Added individual node editing with AI-powered content refinement and custom instructions
  - Created global lattice refinement system for restructuring entire visualizations
  - Integrated "Visualize" button in header and selection toolbar for text-to-lattice generation
  - Added export functionality: PDF, PNG, JPG formats with email sharing capability
  - Built context-aware chat system for asking questions about individual nodes
  - Implemented recursive editing workflow: users can refine content multiple times with new instructions
  - Added visual styling with proper typography hierarchy, colors, and connecting lines
  - Created modal interface with full-screen lattice viewer and global instruction sidebar
  - All lattice generation and editing powered by AI models with full document context
- July 10, 2025: CONCEPT LATTICE COMPLETELY REMOVED
  - User requested complete removal of all concept lattice functionality due to persistent issues
  - Deleted all concept lattice components, routes, services, and schema files
  - Removed "Visualize" button from selection toolbar and document interface
  - Simplified application to core document explorer with text selection and preview only
  - Application now focuses on clean document reading, text selection, rewriting, and chat functionality
- July 10, 2025: PASSAGE DISCUSSION MODAL IMPLEMENTATION
  - Implemented user-requested passage discussion popup functionality
  - When user highlights text, "Discuss" button opens dedicated discussion modal
  - Modal automatically generates AI explanation of selected passage to enlighten and engage user
  - Allows ongoing dialogue about specific passage with conversation history
  - Uses user's chosen AI model with no filtering or interference from system
  - AI provides brief philosophical explanations and engages in thoughtful dialogue about Wittgenstein concepts
- July 10, 2025: CRITICAL TEXT INTEGRITY FIX - Complete document replacement with authentic PDF content
  - OBLITERATED all existing document content completely
  - Extracted complete 156,072 characters from user's uploaded authoritative PDF edition
  - Added complete Bertrand Russell Introduction (34,576 characters) - previously missing
  - Added complete Wittgenstein Tractatus text (121,492 characters) with perfect formatting
  - Zero filtering, modifications, or content judgments - pure passthrough of uploaded PDF
  - Fixed text preview window: now large (320px tall), resizable, scrollable, shows full text
  - Fixed missing Generate Concept Lattice button with clear blue styling
  - Document now contains authentic propositions, preface, numbered sections exactly as in PDF
- July 10, 2025: PASSAGE DISCUSSION MODAL ENHANCEMENT - Export and email functionality
  - Fixed scrollable text window for selected passages - now fully scrollable for any length text
  - Added download/email buttons to each AI response in discussion modal
  - Download saves responses as TXT files with timestamps
  - Email functionality integrated with SendGrid for sharing responses
  - Added 30-second timeout handling for AI API calls to prevent hanging
  - Fixed API timeout issues with proper error handling and user feedback
  - Modal now properly handles long discussions with export options for each response
- July 10, 2025: COMPLETE CONVERSATION EXPORT SYSTEM - Full download and PDF functionality
  - Added full conversation download as TXT with formatted structure
  - Implemented "Save as PDF" using browser print dialog with professional formatting
  - Added email entire conversation functionality with SendGrid integration
  - Export buttons appear only when conversation exists (smart UI)
  - PDF includes proper headers, timestamps, and formatted discussion layout
  - Fixed API repetitive text issue by improving system prompts
  - All export functions work with mathematical notation and formatting preserved