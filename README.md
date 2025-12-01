# 📔 DearDiary

> **Your emotions, beautifully captured**

DearDiary is an AI-powered journaling application that shifts colors based on your writing mood. Built with neobrutalism design principles, it combines modern aesthetics with intelligent sentiment analysis to create a unique journaling experience.

🌐 **Live Demo:** [https://deardiary.maazx.dev/](https://deardiary.maazx.dev/)

![DearDiary Hero](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?style=for-the-badge&logo=tailwind-css)
![Groq AI](https://img.shields.io/badge/Groq-AI-purple?style=for-the-badge)

## ✨ Features

- **🎨 Real-time Color Shifts** - Background smoothly transitions colors based on detected mood every 5 seconds
- **🤖 Groq AI Sentiment Analysis** - Powered by Llama 3.3 70B for intelligent emotion detection
- **💾 Local Storage Database** - All entries saved securely in your browser
- **📊 Live Analytics Dashboard** - Track emotional patterns, mood distribution, and sentiment timeline
- **💎 Neobrutalism Design** - Bold borders, vibrant colors, and striking shadows
- **✨ Subtle Animations** - Smooth color transitions with shimmer effects
- **🔒 Privacy First** - Your data stays on your device
- **📱 Fully Responsive** - Beautiful on all screen sizes
- **⚡ Auto-detect Mood** - AI analyzes your writing every 5 seconds

## 🚀 Getting Started

### Prerequisites

- Node.js 20.x or higher
- npm, yarn, pnpm, or bun

### Installation

1. Clone the repository:

```bash
git clone https://github.com/somewherelostt/DearDiary.git
cd DearDiary
```

2. Install dependencies:

```bash
npm install
# or
yarn install
# or
pnpm install
```

3. Set up environment variables:

```bash
cp .env.local.example .env.local
```

Edit `.env.local` with your API keys:

- `GROQ_API_KEY` - Get your key from [console.groq.com](https://console.groq.com)
- `NEXT_PUBLIC_USE_GROQ` - Set to `true` to enable AI sentiment analysis

### Development

Run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## 🛠️ Tech Stack

- **Framework:** Next.js 16 (App Router)
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS v4
- **AI:** Groq SDK (Llama 3.3 70B Versatile)
- **Storage:** Browser localStorage
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **Charts:** Recharts

## 🎨 Mood System

DearDiary uses a sophisticated sentiment analysis system with 6 mood categories:

| Mood | Color | Sentiment Range |
|------|-------|-----------------|
| 😊 Joyful | Gold (#FFD700) | High positive |
| 😌 Calm | Sky Blue (#87CEEB) | Neutral positive |
| 😐 Neutral | Light Gray (#D3D3D3) | Balanced |
| 😔 Sad | Blue (#6495ED) | Neutral negative |
| 😠 Angry | Crimson (#DC143C) | High negative |
| 😰 Anxious | Orange (#FF8C00) | Mixed intensity |

## 📁 Project Structure

```txt
dearDiary/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes (mood analysis, analytics)
│   │   ├── analytics/    # Analytics dashboard
│   │   ├── journal/      # Journal editor page
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   │   ├── analytics/    # Analytics visualizations
│   │   ├── editor/       # Journal editor & mood indicator
│   │   └── ui/           # Neobrutalism UI components
│   ├── lib/              # Utilities and helpers
│   │   ├── mood-analyzer.ts    # AI sentiment analysis
│   │   ├── local-storage.ts    # localStorage database
│   │   ├── hooks.ts            # Custom React hooks
│   │   └── utils.ts            # Helper functions
│   └── types/            # TypeScript definitions
├── public/               # Static assets
└── tailwind.config.ts    # Tailwind configuration
```

## 🚀 Deployment

Deploy to Vercel with one click:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https://github.com/somewherelostt/DearDiary)

Or deploy manually:

```bash
npm run build
npm start
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 🙏 Acknowledgments

- Design inspiration from [neobrutalism.dev](https://neobrutalism.dev)
- AI powered by [Groq](https://groq.com)
- Built with [Next.js](https://nextjs.org)

---

<div align="center">
  <strong>Made with ❤️ by <a href="https://github.com/somewherelostt">somewherelostt</a></strong>
</div>
