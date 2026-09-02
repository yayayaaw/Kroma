import React, { useState, useEffect } from 'react';
import { PublicLandingPage } from './pages/PublicLandingPage';
import { CmsApp } from '../cms/pages/CmsApp';

export default function App() {
  const isCmsRoute = () => {
    const path = window.location.pathname.toLowerCase();
    const hash = window.location.hash.toLowerCase();
    const search = window.location.search.toLowerCase();

    return (
      path.includes('/cms') ||
      path.includes('/admin') ||
      hash.includes('#/cms') ||
      hash.includes('#/admin') ||
      hash.includes('#cms') ||
      hash.includes('#admin') ||
      search.includes('cms=true') ||
      search.includes('admin=true')
    );
  };

  const [currentRoute, setCurrentRoute] = useState<'public' | 'cms'>(
    isCmsRoute() ? 'cms' : 'public'
  );

  useEffect(() => {
    const handleLocationChange = () => {
      if (isCmsRoute()) {
        setCurrentRoute('cms');
      } else {
        setCurrentRoute('public');
      }
    };

    window.addEventListener('popstate', handleLocationChange);
    window.addEventListener('hashchange', handleLocationChange);

    // Secret keyboard shortcut for the owner: Ctrl+Shift+A or Alt+K
    const handleKeyDown = (e: KeyboardEvent) => {
      if ((e.ctrlKey && e.shiftKey && e.key.toLowerCase() === 'a') || (e.altKey && e.key.toLowerCase() === 'k')) {
        e.preventDefault();
        navigateToCms();
      }
    };
    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('popstate', handleLocationChange);
      window.removeEventListener('hashchange', handleLocationChange);
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, []);

  const navigateToPublic = () => {
    try {
      window.history.pushState(null, '', '/');
    } catch {
      window.location.hash = '';
    }
    setCurrentRoute('public');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCms = () => {
    try {
      window.history.pushState(null, '', '/cms');
    } catch {
      window.location.hash = '/cms';
    }
    setCurrentRoute('cms');
  };

  if (currentRoute === 'cms') {
    return <CmsApp onNavigateToPublic={navigateToPublic} />;
  }

  return <PublicLandingPage />;
}
