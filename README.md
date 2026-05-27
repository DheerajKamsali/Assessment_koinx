# Tax Loss Harvesting Dashboard

A modern React dashboard for tax loss harvesting workflows. The app shows pre-harvest and post-harvest capital gains, lets you search and sort holdings, select positions to harvest, and previews the estimated tax savings.

## Tech Stack

- React
- Vite
- JavaScript
- Tailwind CSS v3
- Framer Motion
- Lucide React

## Features

- Dark fintech-style dashboard UI
- Responsive card-based layout
- Selectable holdings table with select-all support
- Search and sorting controls
- View All toggle and sticky table header
- Mock APIs with loading and error states
- Harvest gain calculations and tax savings preview

## Local Development

```bash
npm install
npm run dev
```

Build for production with:

```bash
npm run build
```

## Vercel Deployment

1. Push this repository to GitHub.
2. Import the repo into Vercel.
3. Keep the default settings:
	- Framework Preset: Vite
	- Build Command: `npm run build`
	- Output Directory: `dist`
4. Deploy.

## Notes

- Append `?mockError=1` to the URL to test the error state.
- The app currently uses mock data and client-side calculations, so no backend is required.
