# ParentCircle Frontend

Next.js 15 frontend application for ParentCircle - Vietnam's first smart parenting community platform powered by AI.

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **UI Components**: Lucide React (icons)
- **Charts**: Recharts
- **HTTP Client**: Axios
- **State Management**: React Context API
- **Authentication**: JWT tokens
- **PWA Support**: Workbox (planned)
- **Social Sharing**: React Share

## Features Implemented

### Core Features
- **Authentication System**: Login/Register with JWT authentication
- **Communities**: Forum discussions with real-time interactions
- **AI Chat Assistant**: ParentChat AI for 24/7 parenting advice
- **Family Scheduler**: Smart calendar and task management
- **Marketplace**: Buy/sell used baby items with location-based search
- **Dashboard**: Analytics and engagement tracking

### Components
- **Navigation**: Bottom navigation with responsive design
- **Protected Routes**: Authentication guards for private pages
- **Error Boundary**: Graceful error handling
- **Loading States**: Loading spinners and skeletons

## Project Structure

```
frontend/
├── app/
│   ├── auth/
│   │   ├── login/          # Login page
│   │   └── register/       # Registration page
│   ├── communities/        # Community forums
│   │   └── [id]/          # Community detail page
│   ├── chat/              # AI Chat interface
│   ├── scheduler/         # Family calendar & tasks
│   ├── marketplace/       # Marketplace listings
│   │   └── [id]/         # Item detail page
│   ├── dashboard/         # Analytics dashboard
│   ├── components/        # Shared components
│   │   ├── Navigation.tsx
│   │   ├── ProtectedRoute.tsx
│   │   ├── ErrorBoundary.tsx
│   │   └── LoadingSpinner.tsx
│   └── lib/
│       ├── auth-context.tsx  # Authentication context
│       ├── providers.tsx     # App providers
│       └── types.ts          # TypeScript types
├── public/                # Static assets
├── tailwind.config.ts     # Tailwind configuration
├── next.config.ts         # Next.js configuration
└── package.json
```

## Getting Started

### Prerequisites

- Node.js 18 or higher
- npm or yarn
- Backend API running on `http://localhost:3003`

### Installation

1. Install dependencies:
```bash
npm install --legacy-peer-deps
```

2. Configure environment variables:
```bash
# Create .env.local file
NEXT_PUBLIC_API_URL=http://localhost:3003/api/v1
```

3. Start development server:
```bash
npm run dev
```

The application will be available at `http://localhost:3002`

### Build for Production

```bash
npm run build
npm start
```

## Available Scripts

- `npm run dev` - Start development server on port 3002
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run lint` - Run ESLint

## API Integration

The frontend communicates with the Rails backend via REST API:

### Authentication
- `POST /api/v1/users` - Register new user
- `POST /api/v1/users/sign_in` - Login
- `DELETE /api/v1/users/sign_out` - Logout

### Communities
- `GET /api/v1/communities` - List communities
- `POST /api/v1/communities/:id/join` - Join community
- `GET /api/v1/communities/:id/posts` - Get community posts
- `POST /api/v1/posts` - Create post

### AI Chat
- `POST /api/v1/chat/query` - Send chat message

### Family Scheduler
- `GET /api/v1/family_events` - Get events
- `POST /api/v1/family_events` - Create event
- `GET /api/v1/tasks` - Get tasks
- `POST /api/v1/tasks` - Create task

### Marketplace
- `GET /api/v1/marketplace_items` - List items
- `POST /api/v1/marketplace_items` - Create listing
- `GET /api/v1/marketplace_items/:id` - Get item details

### Dashboard
- `GET /api/v1/dashboard/engagement` - Get engagement data
- `GET /api/v1/dashboard/stats` - Get statistics

## Authentication Flow

1. User registers or logs in via `/auth/login` or `/auth/register`
2. Backend returns JWT token and user data
3. Token stored in localStorage
4. Token sent in Authorization header for protected routes
5. Protected routes check authentication via `ProtectedRoute` component

## Key Technologies

### Next.js 15 Features
- **App Router**: File-based routing with React Server Components
- **TypeScript**: Type-safe development
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting

### Tailwind CSS
- Utility-first CSS framework
- Responsive design utilities
- Custom color palette for family-friendly UI
- Component-based styling

### State Management
- React Context API for global state
- `AuthContext` for authentication state
- Local state with React hooks

## Development Guidelines

### Component Structure
```tsx
// Use TypeScript for all components
import { FC } from 'react';

interface ComponentProps {
  // Define props
}

const Component: FC<ComponentProps> = ({ props }) => {
  // Component logic
  return (
    <div className="tailwind-classes">
      {/* JSX */}
    </div>
  );
};

export default Component;
```

### API Calls
```tsx
import axios from 'axios';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3003/api/v1';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

### Error Handling
- Use ErrorBoundary for component errors
- Display user-friendly error messages
- Log errors for debugging

## Styling Guidelines

### Color Palette
- Primary: Indigo/Purple tones (#4F46E5)
- Secondary: Warm pastels
- Success: Green
- Warning: Yellow
- Error: Red
- Neutral: Gray scale

### Responsive Design
- Mobile-first approach
- Breakpoints: sm (640px), md (768px), lg (1024px), xl (1280px)
- Bottom navigation for mobile
- Side navigation for desktop

## Performance Optimization

- **Code Splitting**: Automatic with Next.js App Router
- **Image Optimization**: Use Next.js Image component
- **Lazy Loading**: Dynamic imports for heavy components
- **Caching**: Browser caching for static assets
- **API Optimization**: Debounce search queries

## Future Enhancements

### In Progress
- Mobile optimization and responsive refinements
- PWA implementation with service workers
- Offline mode with cached content

### Planned
- Push notifications
- Advanced AI features
- Social sharing improvements
- Performance monitoring

## Testing

```bash
# Unit tests (coming soon)
npm run test

# E2E tests (coming soon)
npm run test:e2e
```

## Troubleshooting

### Common Issues

**Issue**: `npm install` fails
- **Solution**: Use `npm install --legacy-peer-deps`

**Issue**: API calls fail with CORS error
- **Solution**: Ensure backend CORS is configured to allow `http://localhost:3002`

**Issue**: Authentication token expires
- **Solution**: Tokens expire after 24 hours. User must log in again.

**Issue**: Build fails with TypeScript errors
- **Solution**: Run `npm run lint` to see all errors and fix them

## Environment Variables

```bash
# .env.local
NEXT_PUBLIC_API_URL=http://localhost:3003/api/v1
NEXT_PUBLIC_APP_NAME=ParentCircle
```

## Deployment

### Vercel (Recommended)
1. Connect GitHub repository to Vercel
2. Set environment variables in Vercel dashboard
3. Deploy automatically on push to main branch

### Docker
```bash
# Build image
docker build -t parentcircle-frontend .

# Run container
docker run -p 3002:3002 parentcircle-frontend
```

## Contributing

1. Create feature branch: `git checkout -b feature/amazing-feature`
2. Commit changes: `git commit -m 'Add amazing feature'`
3. Push to branch: `git push origin feature/amazing-feature`
4. Open Pull Request

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

MIT License - See LICENSE file for details

## Contact

- **Project Repository**: [GitHub](https://github.com/your-username/parent-circle-ai)
- **Issues**: [GitHub Issues](https://github.com/your-username/parent-circle-ai/issues)

---

Built with ❤️ for Vietnamese parents
