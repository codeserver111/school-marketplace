# 🎓 SchoolFinder - Smart School Discovery & Admission Platform

A modern, AI-powered platform that helps parents find and enroll their children in the best schools. Built with a sleek, app-like interface inspired by leading food delivery platforms.

## ✨ Features

### 🔍 **Smart School Discovery**
- **Advanced Search**: Find schools by location, board, class, and budget
- **GPS Integration**: Use current location for nearby school recommendations
- **Filter System**: Comprehensive filters for board, fee range, amenities, and more
- **Real-time Results**: Instant search with loading states

### 🤖 **AI-Powered Admission Assistant**
- **Intelligent Chat**: Step-by-step guidance for school admissions
- **Profile Templates**: Quick-start templates for different scenarios (preschool, primary, transfer)
- **Smart Recommendations**: AI matching based on child profile, preferences, and location
- **Personalized Guidance**: Contextual advice throughout the admission process

### 📊 **School Comparison & Analysis**
- **Side-by-Side Comparison**: Compare up to 3 schools simultaneously
- **Detailed Metrics**: Rating, reviews, fees, facilities, and match scores
- **Visual Charts**: Performance comparisons and trend analysis
- **Smart Matching**: AI-powered compatibility scoring

### 💰 **Transparent Fee Information**
- **Monthly Pricing**: All fees displayed as monthly amounts (₹15K/month*)
- **Fee Range Indicators**: "(average)" labels with flexibility notes
- **Budget Matching**: Find schools within your price range
- **Cost Transparency**: No hidden fees or surprises

### 📍 **Location Intelligence**
- **GPS Location**: Find schools near your current location
- **Popular Areas**: Quick-select from Delhi NCR neighborhoods
- **Distance Calculation**: Accurate distance and travel time estimates
- **Area-based Search**: Filter schools by specific localities

### ⭐ **Review & Rating System**
- **Star Ratings**: 1-5 star rating system with review counts
- **Parent Reviews**: Authentic feedback from real parents
- **Detailed Insights**: Comprehensive school reviews and experiences
- **Trust Indicators**: Verified reviews and ratings

### ❤️ **Personalization Features**
- **Save Schools**: Heart/favorite schools for later reference
- **Recently Viewed**: Quick access to recently browsed schools
- **Custom Lists**: Create personalized school shortlists
- **Profile Management**: Save child profiles and preferences

### 📱 **Modern Mobile-First Design**
- **App-like Interface**: Inspired by Zomato, Swiggy, and Blinkit
- **Smooth Animations**: Framer Motion powered transitions
- **Responsive Layout**: Perfect experience on all devices
- **Touch Optimized**: Large touch targets and gestures

### 📋 **Admission Management**
- **Document Upload**: Secure document submission system
- **Application Tracking**: Real-time application status updates
- **Timeline View**: Visual admission process timeline
- **Interview Scheduling**: Book school visits and interviews

### 🎨 **Beautiful UI Components**
- **Skeleton Loading**: Elegant loading states throughout
- **Toast Notifications**: User feedback for all actions
- **Modal Dialogs**: Smooth location picker and settings
- **Progressive Enhancement**: Fast initial load with rich interactions

## 🚀 Tech Stack

- **Frontend**: Next.js 14, React 18, TypeScript
- **Styling**: Tailwind CSS, shadcn/ui components
- **Animations**: Framer Motion
- **Maps**: Mapbox integration
- **State Management**: React Context + Local Storage
- **Icons**: Lucide React
- **Charts**: Recharts for data visualization
- **Image Handling**: Next.js Image optimization

## 📦 Installation & Setup

### Prerequisites
- Node.js 18+
- npm or yarn

### Local Development

```bash
# Clone the repository
git clone <YOUR_GIT_URL>

# Navigate to project directory
cd school-marketplace

# Install dependencies
npm install

# Start development server
npm run dev
```

Visit `http://localhost:3000` to see the application.

## 🏗️ Project Structure

```
src/
├── components/           # Reusable UI components
│   ├── ui/              # shadcn/ui components
│   ├── admission/       # Admission-related components
│   └── SchoolCard.tsx   # Main school card component
├── contexts/            # React contexts for state management
├── data/                # Mock data and utilities
├── hooks/               # Custom React hooks
├── lib/                 # Utility functions
└── types/               # TypeScript type definitions

app/                     # Next.js app router pages
├── admission/           # Admission flow pages
├── compare/            # School comparison page
├── school/[slug]/      # Individual school pages
└── page.tsx            # Home page
```

## 🎯 Key Components

### Core Features
- **SchoolCard**: Modern card design with food-app inspired UI
- **AdmissionChat**: AI-powered conversational admission assistant
- **SchoolMatching**: Smart school recommendation engine
- **LocationHeader**: GPS-enabled location selection
- **SearchBar**: Advanced school search with filters

### UI/UX Excellence
- **Skeleton Loading**: Beautiful loading states for all components
- **Toast Notifications**: User feedback system
- **Responsive Design**: Mobile-first approach
- **Accessibility**: WCAG compliant components

## 🔧 Development Features

### Modern Development Experience
- **TypeScript**: Full type safety
- **ESLint**: Code quality enforcement
- **Prettier**: Consistent code formatting
- **Hot Reload**: Instant development feedback

### Performance Optimizations
- **Image Optimization**: Next.js Image component
- **Code Splitting**: Automatic route-based splitting
- **Lazy Loading**: Components loaded on demand
- **Caching**: Intelligent caching strategies

## 📈 Roadmap

### Phase 1 ✅ (Current)
- Basic school discovery and search
- AI admission assistant
- School comparison
- Location-based filtering
- Modern UI implementation

### Phase 2 🚧 (Upcoming)
- Real school database integration
- Payment gateway integration
- Advanced analytics dashboard
- Mobile app development
- Multi-city expansion

### Phase 3 📋 (Future)
- Parent community features
- School management dashboard
- Advanced AI matching algorithms
- International school support
- Partnership integrations

## 🤝 Contributing

We welcome contributions! Please follow these steps:

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 📞 Contact

For questions or support, please reach out to the development team.

---

**Built with ❤️ for parents and students everywhere**
