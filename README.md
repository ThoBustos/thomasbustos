# Thomas Bustos - Personal Website

A minimalist React-based personal website.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the project root:
```bash
cp .env.example .env
```

3. Add your Google Analytics Measurement ID to `.env`:
```
VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX
```

4. Run development server:
```bash
npm run dev
```

5. Build for production:
```bash
npm run build
```

## Features

- Super minimal design with clean typography
- Fully responsive across all device types
- Dark/light theme toggle
- Smooth scaling typography using clamp()
- Interactive 3D background with PixelBlast effect
- Optimized for mobile, tablet, desktop, and landscape orientations

## Analytics

This site uses Google Analytics to track visitor metrics. The implementation uses environment variables to keep the Measurement ID out of the public repository while still allowing it to be visible in the deployed site (as is standard for client-side analytics).

### Setup Google Analytics:

1. Create a Google Analytics account at [analytics.google.com](https://analytics.google.com)
2. Get your Measurement ID (format: `G-XXXXXXXXXX`)
3. Add it to your `.env` file: `VITE_GA_MEASUREMENT_ID=G-XXXXXXXXXX`
4. For Vercel deployment, add the environment variable in your project settings

### Deployment:

**Vercel Environment Variables:**
- Go to your Vercel project → Settings → Environment Variables
- Add: `VITE_GA_MEASUREMENT_ID` with your Google Analytics ID
- Redeploy your site

If you fork this project and don't want analytics, simply don't set the `VITE_GA_MEASUREMENT_ID` environment variable.

