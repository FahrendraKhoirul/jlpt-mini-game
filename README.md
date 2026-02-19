# 🇯🇵 JLPT Mini Game

A simple and interactive Japanese vocabulary quiz game to practice **JLPT N5** words. Each round presents a random word in furigana, and you pick the correct English meaning from 8 choices. Keep your streak alive!

## Features

- 🎯 Multiple-choice quiz with 8 answer options
- 🔤 Displays words in **furigana** for reading practice
- 🔥 Streak counter — resets on wrong answer
- ⚡ Fetches fresh words dynamically from a public JLPT API

## Tech Stack

| Layer      | Technology                                          |
| ---------- | --------------------------------------------------- |
| Framework  | React 19 + TypeScript                               |
| Styling    | Tailwind CSS (CDN)                                  |
| Font       | Quicksand (Google Fonts)                            |
| Build Tool | Vite                                                |
| API        | [jlpt-vocab-api](https://jlpt-vocab-api.vercel.app) |

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## Project Structure

```
src/
├── App.tsx              # Main UI component
├── hooks/
│   └── useGameJLPT.ts   # Game state logic
├── services/
│   └── jlptApi.ts       # API integration
└── types/
    └── word_response.ts  # TypeScript interfaces
```

## Author

Made by [Fahrendra Khoirul](https://www.linkedin.com/in/fahrendra-khoirul-ihtada/) · 2026
