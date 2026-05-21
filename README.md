🚀 PixelForge — AI-Powered Image Editing Platform

PixelForge is a modern AI image editing web application built with Next.js, TypeScript, Tailwind CSS, and shadcn/ui.

Inspired by Pixelcut, Canva, and Linear, PixelForge delivers a premium dark-themed creative workspace with AI-powered tools for image enhancement, generation, and editing.

✨ Features
🎭 Background Removal
Remove backgrounds instantly with hair-level precision using the Pixelcut API
⬆️ AI Upscaling
Enhance image quality up to 4K/8K using Fal.ai Clarity Upscaler
✨ Magic Eraser
Remove unwanted objects seamlessly with AI inpainting
🖼️ Text-to-Image Generation
Generate stunning AI images powered by FLUX.1
📦 Batch Processing
Process multiple images efficiently
🔌 Developer API Ready
Easily extend and integrate workflows
🧠 Tech Stack
Technology	Purpose
Next.js	App framework
TypeScript	Type safety
Tailwind CSS	Styling
Framer Motion	Animations
shadcn/ui	UI components
UploadThing	File uploads
React Compare Image	Before/After slider
Lucide	Icons
Sonner	Toast notifications
🎨 Design System
Theme
Background: #0A0A0F
Surface: #111118
Primary Accent: #7C3AED → #A855F7
Secondary Accent: #06B6D4
Text Primary: #F8FAFC
Text Muted: #64748B
Typography
Display: Syne
Body: DM Sans
Mono: JetBrains Mono
Motion
Page transitions with Framer Motion
Staggered fade-up animations
Glassmorphism cards
Skeleton loaders
Animated AI processing states
📁 Project Structure
/app
  /page.tsx
  /editor/page.tsx
  /api
    /remove-bg/route.ts
    /upscale/route.ts
    /generate/route.ts
    /magic-erase/route.ts

/components
  /ui
  /editor
    /UploadZone.tsx
    /ToolSidebar.tsx
    /ImageCanvas.tsx
    /ResultPanel.tsx
    /HistoryPanel.tsx

  /landing
    /Hero.tsx
    /FeatureGrid.tsx
    /BeforeAfter.tsx
    /PricingCards.tsx

/lib
  /api-clients.ts
  /utils.ts
🔌 AI Integrations
🎭 Background Removal

Powered by the Pixelcut API

🖼️ AI Image Generation

Powered by Fal.ai FLUX.1

⬆️ AI Upscaling

Using fal-ai/clarity-upscaler

✨ Magic Erase

Using fal-ai/inpaint

☁️ File Uploads

Powered by UploadThing

⚡ Installation
1. Clone Repository
git clone https://github.com/yourusername/pixelforge.git

cd pixelforge
2. Install Dependencies
npm install

Or manually:

# Core
npm install next react react-dom

# UI & Animation
npm install framer-motion
npm install react-compare-image
npm install react-dropzone
npm install lucide-react

# AI APIs
npm install @fal-ai/client

# Uploads
npm install uploadthing @uploadthing/react

# Utilities
npm install clsx tailwind-merge
npm install @radix-ui/react-slider
npm install @radix-ui/react-tabs
npm install @radix-ui/react-tooltip
🌍 Environment Variables

Create a .env.local file:

PIXELCUT_API_KEY=your_pixelcut_key_here

FAL_KEY=your_fal_ai_key_here

UPLOADTHING_SECRET=your_uploadthing_secret

UPLOADTHING_APP_ID=your_uploadthing_app_id

NEXT_PUBLIC_APP_URL=http://localhost:3000
🔑 API Keys
Service	URL
Pixelcut API	Pixelcut API
Fal.ai	Fal.ai Dashboard
UploadThing	UploadThing Dashboard
Upstash Redis	Upstash
🛠️ Development

Run the development server:

npm run dev

Open:

http://localhost:3000
🔒 Security
API keys stored server-side only
Rate limiting with Upstash Redis
Secure upload handling
Edge runtime support
Lazy-loaded optimized images
Error boundaries + Suspense
♿ Accessibility
Keyboard accessible navigation
Proper aria-label usage
Accessible loading states
WCAG-friendly contrast ratios
🚀 Deployment

Deploy easily with Vercel

vercel deploy

Add all environment variables inside the Vercel dashboard.

📸 Screenshots

Add editor workspace, landing page, and before/after previews here.

✅ Roadmap
 Authentication
 Credit System
 Batch Processing Queue
 Realtime Streaming Generation
 Team Workspaces
 AI Video Generation
 Mobile App
💡 Senior Architecture Notes
Streaming generation via fal.stream()
CDN caching using SHA-256 hashed requests
Async job queues with QStash
Webhook-based processing
Postgres transactional credit system
🧪 Built With
Next.js
TypeScript
Tailwind CSS
Framer Motion
Fal.ai
Pixelcut
UploadThing
## Run Locally

**Prerequisites:**  Node.js


1. Install dependencies:
   `npm install`
2. Set the `GEMINI_API_KEY` in [.env.local](.env.local) to your Gemini API key
3. Run the app:
   `npm run dev`
