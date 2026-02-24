# Next.js 활용한 실시간 설비 모니터링 대시보드

Next.js와 Tailwind CSS를 활용하여 제조 현장의 설비를 실시간으로 모니터링하는 대시보드 프로젝트입니다. <br/>
샘플 사이트 - https://dashboard-samples.netlify.app/
## Tech Stack
- **Framework**: Next.js 15 (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Visualization**: Recharts
- **State Management**: React Hooks (useState, useEffect)

## 🏗 Branch Strategy (Git-flow)
- `main`: 최종 배포 브랜치
- `develop`: 통합 개발 및 테스트 브랜치
- `feature/*`: 개별 기능 구현 브랜치 (예: `feature/ui-setup`, `feature/data-chart`)
## Getting Started

First, run the development server:

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

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/app/building-your-application/optimizing/fonts) to automatically optimize and load [Geist](https://vercel.com/font), a new font family for Vercel.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/app/building-your-application/deploying) for more details.
