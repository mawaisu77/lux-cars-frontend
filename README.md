# 🚗 Lux Cars Frontend

A modern, responsive React application for the Lux Cars automotive auction platform. Built with React 18, Tailwind CSS, and Material-UI, this frontend provides an intuitive and engaging user experience for bidding on luxury vehicles in real-time.

## 🌟 Features

### 🎯 Live Auction Experience
- **Real-time Bidding**: Live auction interface with instant bid updates
- **Countdown Timers**: Dynamic countdown for auction end times
- **Live Chat**: Real-time communication during auctions
- **Bid History**: Complete bid history with user information
- **Auction Status**: Real-time auction status updates

### 🚗 Vehicle Showcase
- **Vehicle Gallery**: High-quality image galleries with lightbox
- **Detailed Specifications**: Comprehensive vehicle information
- **360° Views**: Interactive vehicle viewing experience
- **Search & Filter**: Advanced search with multiple criteria
- **Favorites System**: Save and track favorite vehicles

### 💰 Financial Management
- **Wallet Integration**: User wallet with transaction history
- **Payment Processing**: Secure payment gateway integration
- **Bid Management**: Track active bids and auction participation
- **Invoice Generation**: Automatic PDF invoice downloads
- **Financial Analytics**: Personal bidding analytics

### 👥 User Experience
- **Responsive Design**: Optimized for all devices and screen sizes
- **Multi-language Support**: English and French localization
- **Dark/Light Mode**: Theme customization options
- **Accessibility**: WCAG compliant design
- **Progressive Web App**: PWA capabilities for mobile users

### 📊 Analytics Dashboard
- **Personal Statistics**: Individual bidding and auction statistics
- **Market Trends**: Vehicle market analysis and trends
- **Performance Metrics**: User performance tracking
- **Interactive Charts**: Data visualization with Chart.js and Recharts

### 🔐 Security & Authentication
- **JWT Authentication**: Secure user authentication
- **Role-based Access**: Admin and user role management
- **Session Management**: Secure session handling
- **Data Protection**: Encrypted data transmission

## 🛠️ Tech Stack

### Core Framework
- **React 18** - Modern React with hooks and functional components
- **React Router DOM** - Client-side routing
- **React Context** - State management

### UI & Styling
- **Tailwind CSS** - Utility-first CSS framework
- **Material-UI (MUI)** - React component library
- **PrimeReact** - Rich UI component library
- **DaisyUI** - Component library for Tailwind CSS
- **React Icons** - Icon library

### Forms & Validation
- **Formik** - Form management library
- **React Hook Form** - Performant forms with minimal re-renders
- **Yup** - Schema validation
- **React Select** - Advanced select components

### Real-time Features
- **Pusher JS** - Real-time messaging and notifications
- **Socket.io Client** - WebSocket communication

### Data Visualization
- **Chart.js** - Charting library
- **Recharts** - Composable charting library
- **React Circular Progressbar** - Progress indicators

### Media & Files
- **React Dropzone** - File upload handling
- **React PDF** - PDF viewing and generation
- **React Player** - Video player component
- **Lightbox.js React** - Image lightbox gallery

### Internationalization
- **i18next** - Internationalization framework
- **React i18next** - React bindings for i18next
- **i18next Browser Language Detector** - Language detection

### Utilities & Helpers
- **Axios** - HTTP client
- **Moment.js** - Date manipulation
- **React Toastify** - Toast notifications
- **React Tooltip** - Tooltip components
- **UUID** - Unique identifier generation

### Development Tools
- **Sentry** - Error monitoring and performance tracking
- **ESLint** - Code linting
- **Prettier** - Code formatting

## 📁 Project Structure

```
src/
├── Components/          # Reusable UI components
│   ├── Auth/           # Authentication components
│   ├── Auction/        # Auction-related components
│   ├── Common/         # Shared components
│   ├── Dashboard/      # Dashboard components
│   ├── Forms/          # Form components
│   ├── Layout/         # Layout components
│   ├── Vehicle/        # Vehicle-related components
│   └── UI/             # Basic UI components
├── context/            # React context providers
├── hooks/              # Custom React hooks
├── services/           # API services and utilities
├── utils/              # Utility functions
├── data/               # Static data and constants
├── assets/             # Images, icons, and static files
├── i18n.js            # Internationalization setup
├── App.js             # Main application component
└── index.js           # Application entry point
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- Backend API running (see [lux-cars-backend](https://github.com/mawaisu77/lux-cars-backend))

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/mawaisu77/lux-cars-frontend.git
   cd lux-cars-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   # API Configuration
   REACT_APP_API_URL=http://localhost:5000/api
   REACT_APP_BASE_URL=http://localhost:3000

   # Pusher Configuration
   REACT_APP_PUSHER_APP_KEY=your_pusher_app_key
   REACT_APP_PUSHER_CLUSTER=your_pusher_cluster

   # Sentry Configuration
   REACT_APP_SENTRY_DSN=your_sentry_dsn

   # Google Maps (if using)
   REACT_APP_GOOGLE_MAPS_API_KEY=your_google_maps_api_key

   # Cloudinary (if using)
   REACT_APP_CLOUDINARY_CLOUD_NAME=your_cloudinary_cloud_name
   ```

4. **Start the development server**
   ```bash
   npm start
   ```

   The application will open at `http://localhost:3000`

## 📚 Component Documentation

### Core Components

#### Auction Components
- **AuctionCard** - Individual auction display card
- **AuctionList** - Grid/list view of auctions
- **LiveAuction** - Real-time auction interface
- **BidHistory** - Auction bid history display
- **CountdownTimer** - Auction countdown component

#### Vehicle Components
- **VehicleCard** - Vehicle information card
- **VehicleGallery** - Image gallery with lightbox
- **VehicleDetails** - Detailed vehicle specifications
- **VehicleSearch** - Search and filter interface

#### User Components
- **UserProfile** - User profile management
- **UserDashboard** - Personal dashboard
- **Wallet** - Financial management interface
- **BidHistory** - Personal bidding history

#### Common Components
- **Header** - Application header with navigation
- **Footer** - Application footer
- **LoadingSpinner** - Loading indicators
- **Modal** - Reusable modal component
- **Toast** - Notification system

### Custom Hooks

- **useAuth** - Authentication state management
- **useAuction** - Auction data and operations
- **useRealTime** - Real-time data handling
- **useLocalization** - Internationalization utilities

## 🎨 Styling & Theming

### Tailwind CSS Configuration
The project uses a custom Tailwind configuration with:
- Custom color palette
- Responsive breakpoints
- Custom animations
- Component-specific utilities

### Theme System
- Light and dark mode support
- Custom color schemes
- Responsive typography
- Consistent spacing system

## 🌍 Internationalization

The application supports multiple languages:
- **English** (default)
- **French**

### Adding New Languages
1. Create translation files in `src/data/locales/`
2. Update the i18n configuration
3. Add language selector component

## 📱 Responsive Design

The application is fully responsive with:
- Mobile-first approach
- Tablet optimization
- Desktop enhancement
- Touch-friendly interfaces

## 🔧 Development

### Available Scripts

- `npm start` - Start development server
- `npm run build` - Build for production
- `npm test` - Run tests
- `npm run eject` - Eject from Create React App

### Code Style

- ESLint configuration for code quality
- Prettier for code formatting
- Component-based architecture
- Functional components with hooks

### Performance Optimization

- Code splitting with React.lazy()
- Image optimization
- Bundle size optimization
- Memoization for expensive operations

## 🚀 Deployment

### Production Build

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Deploy the `build` folder**
   - Upload to your hosting service
   - Configure environment variables
   - Set up proper routing

### Environment Variables

Ensure all production environment variables are properly configured:
- API endpoints
- Pusher credentials
- Sentry DSN
- Other service configurations

## 📊 Performance Monitoring

- **Sentry Integration**: Error tracking and performance monitoring
- **Web Vitals**: Core Web Vitals tracking
- **Bundle Analysis**: Webpack bundle analyzer
- **Performance Metrics**: Custom performance tracking

## 🧪 Testing

### Testing Strategy
- Unit tests for utility functions
- Component testing with React Testing Library
- Integration tests for user flows
- E2E testing with Cypress (planned)

### Running Tests
```bash
npm test
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Guidelines
- Follow React best practices
- Use TypeScript for new components (planned)
- Write comprehensive tests
- Update documentation

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

**Awais** - [GitHub Profile](https://github.com/mawaisu77)

## 🙏 Acknowledgments

- React team for the amazing framework
- Tailwind CSS for the utility-first approach
- Material-UI and PrimeReact for component libraries
- The open-source community for various packages

## 🔗 Related Projects

- [Lux Cars Backend](https://github.com/mawaisu77/lux-cars-backend) - Backend API
- [Lux Cars Mobile](https://github.com/mawaisu77/lux-cars-mobile) - Mobile application (planned)

---

<div align="center">
  <sub>⭐ Star this repository if you found it helpful!</sub>
</div>
