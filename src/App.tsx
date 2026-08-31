import React, { useState, useEffect } from 'react';
import { LanguageProvider } from './context/LanguageContext';
import { PageRoute } from './types';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { PropertiesPage } from './pages/PropertiesPage';
import { PropertyDetailPage } from './pages/PropertyDetailPage';
import { DestinationsPage } from './pages/DestinationsPage';
import { DestinationBangkokPage } from './pages/DestinationBangkokPage';
import { AboutPage } from './pages/AboutPage';
import { ContactPage } from './pages/ContactPage';
import { LegalPage } from './pages/LegalPage';

export function App() {
  const [currentRoute, setCurrentRoute] = useState<PageRoute>(() => {
    const path = window.location.pathname as PageRoute;
    if ([
      '/',
      '/properties',
      '/properties/residence-01',
      '/properties/residence-02',
      '/destinations',
      '/destinations/thailand',
      '/destinations/thailand/bangkok',
      '/about',
      '/contact',
      '/privacy',
      '/terms'
    ].includes(path)) {
      return path;
    }
    return '/';
  });

  useEffect(() => {
    const handlePopState = () => {
      const path = window.location.pathname as PageRoute;
      setCurrentRoute(path || '/');
    };
    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  const navigate = (route: PageRoute) => {
    setCurrentRoute(route);
    try {
      window.history.pushState({}, '', route);
    } catch {
      // ignore
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const renderPage = () => {
    if (currentRoute === '/') {
      return <HomePage onNavigate={navigate} />;
    }
    if (currentRoute === '/properties') {
      return <PropertiesPage onNavigate={navigate} />;
    }
    if (currentRoute === '/properties/residence-01') {
      return <PropertyDetailPage slug="residence-01" onNavigate={navigate} />;
    }
    if (currentRoute === '/properties/residence-02') {
      return <PropertyDetailPage slug="residence-02" onNavigate={navigate} />;
    }
    if (currentRoute === '/destinations') {
      return <DestinationsPage onNavigate={navigate} />;
    }
    if (currentRoute === '/destinations/thailand' || currentRoute === '/destinations/thailand/bangkok') {
      return <DestinationBangkokPage onNavigate={navigate} />;
    }
    if (currentRoute === '/about') {
      return <AboutPage onNavigate={navigate} />;
    }
    if (currentRoute === '/contact') {
      return <ContactPage />;
    }
    if (currentRoute === '/privacy') {
      return <LegalPage type="privacy" onNavigate={navigate} />;
    }
    if (currentRoute === '/terms') {
      return <LegalPage type="terms" onNavigate={navigate} />;
    }
    return <HomePage onNavigate={navigate} />;
  };

  return (
    <LanguageProvider>
      <div className="min-h-screen bg-[#FAF8F5] text-[#14171A] flex flex-col justify-between selection:bg-[#c86d51]/20">
        <Header currentRoute={currentRoute} onNavigate={navigate} />
        
        <main className="flex-1">
          {renderPage()}
        </main>

        <Footer onNavigate={navigate} />
      </div>
    </LanguageProvider>
  );
}

export default App;
