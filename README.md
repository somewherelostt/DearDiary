# 📔 DearDiary

> **Your emotions, beautifully captured**

DearDiary is an AI-powered journaling application that shifts colors based on your writing mood. Built with neobrutalism design principles, it combines modern aesthetics with intelligent sentiment analysis to create a unique journaling experience.

![DearDiary Hero](https://img.shields.io/badge/Next.js-16-black?style=for-the-badge&logo=next.js)
![TypeScript](https://img.shields.io/badge/TypeScript-5-blue?style=for-the-badge&logo=typescript)
![Tailwind CSS](https://img.shields.io/badge/Tailwind-4-cyan?style=for-the-badge&logo=tailwind-css)

## ✨ Features

- **🎨 Live Mood Detection** - Watch your journal entries shift colors as you write
- **🤖 AI-Powered Sentiment Analysis** - Groq API integration with lexicon-based fallback
- **💎 Neobrutalism Design** - Bold borders, vibrant colors, and offset shadows
- **📊 Mood Analytics** - Track your emotional patterns over time
- **🔒 Secure & Private** - Your entries, your data
- **📱 Fully Responsive** - Beautiful on desktop, tablet, and mobile
- **⚡ Real-time Auto-save** - Never lose your thoughts

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
- **AI:** Groq SDK (llama-3.1-8b-instant)
- **Animations:** Framer Motion
- **Icons:** Lucide React
- **CMS:** Sanity (upcoming)
- **Auth:** NextAuth (upcoming)

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

```
dearDiary/
├── src/
│   ├── app/              # Next.js App Router pages
│   │   ├── api/          # API routes
│   │   ├── journal/      # Journal editor page
│   │   └── page.tsx      # Landing page
│   ├── components/       # React components
│   │   ├── editor/       # Journal editor components
│   │   └── ui/           # Neobrutalism UI components
│   ├── lib/              # Utilities and helpers
│   │   ├── mood-analyzer.ts
│   │   ├── hooks.ts
│   │   └── utils.ts
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
