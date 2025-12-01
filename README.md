# DearDiary

Journaling app with real-time sentiment analysis and adaptive color UI.

[![Live Demo](https://img.shields.io/badge/demo-live-success?style=flat-square)](https://deardiary.maazx.dev/)
[![Next.js](https://img.shields.io/badge/Next.js-15.1-black?style=flat-square&logo=next.js)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=flat-square&logo=typescript)](https://www.typescriptlang.org/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?style=flat-square&logo=tailwind-css)](https://tailwindcss.com/)

## Features

- **Real-time Mood Detection**: Groq AI (Llama 3.3 70B) analyzes text and shifts background colors
- **Analytics Dashboard**: Track mood patterns and emotional trends over time
- **Local-First Storage**: Browser localStorage for privacy
- **Neobrutalism Design**: Bold borders, vibrant colors, high contrast

## Tech Stack

- **Next.js 15.1** - App Router with SSR
- **TypeScript 5** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **Groq SDK** - AI sentiment analysis
- **Sanity.io** - Headless CMS
- **Framer Motion** - Animations
- **Recharts** - Data visualization
- **shadcn/ui** - UI components

## Project Structure

```plaintext
dearDiary/
├── src/
│   ├── app/                    # Next.js App Router pages
│   │   ├── (dashboard)/        # Dashboard route group
│   │   │   ├── analytics/      # Mood analytics & charts
│   │   │   ├── dashboard/      # Main dashboard
│   │   │   ├── journal/        # Journal entry editor
│   │   │   └── settings/       # User preferences
│   │   └── api/                # API route handlers
│   │       ├── analytics/      # Analytics endpoints
│   │       ├── entries/        # CRUD operations
│   │       └── mood/           # Sentiment analysis
│   ├── components/
│   │   ├── analytics/          # Chart components
│   │   ├── editor/             # Journal editor & mood UI
│   │   ├── landing/            # Landing page sections
│   │   ├── navigation/         # Sidebar & nav
│   │   └── ui/                 # Reusable UI primitives
│   ├── lib/
│   │   ├── animations.ts       # Animation configurations
│   │   ├── groq-queries.ts     # Sanity query definitions
│   │   ├── mood-analyzer.ts    # Sentiment analysis logic
│   │   ├── sanity.ts           # Sanity client config
│   │   └── utils.ts            # Shared utilities
│   └── types/
│       └── index.ts            # TypeScript type definitions
├── sanity/                     # Sanity CMS configuration
│   ├── schemas/                # Content schemas
│   └── sanity.config.ts        # CMS setup
└── public/                     # Static assets
```

## Getting Started

### Installation

```bash
git clone https://github.com/somewherelostt/DearDiary.git
cd DearDiary
npm install
```

Create `.env.local`:

```env
GROQ_API_KEY=your_api_key
NEXT_PUBLIC_USE_GROQ=true
```

### Development

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

## Mood System

| Mood | Color | Range |
|------|-------|-------|
| 😊 Joyful | Gold | +0.6 to +1.0 |
| 😌 Calm | Sky Blue | +0.2 to +0.6 |
| 😐 Neutral | Gray | -0.2 to +0.2 |
| 😔 Sad | Blue | -0.6 to -0.2 |
| 😠 Angry | Crimson | -1.0 to -0.6 |
| 😰 Anxious | Orange | High volatility |

## License

MIT License - see [LICENSE](LICENSE)

---

**[Live Demo](https://deardiary.maazx.dev)** | **[GitHub](https://github.com/somewherelostt/DearDiary)**
