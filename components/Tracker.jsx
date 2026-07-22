'use client';
import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

function getVisitorId() {
  if (typeof window === 'undefined') return 'unknown';
  let id = localStorage.getItem('seqs_vid');
  if (!id) {
    id = `v_${Date.now()}_${Math.random().toString(36).slice(2, 9)}`;
    localStorage.setItem('seqs_vid', id);
  }
  return id;
}

export default function Tracker() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      try {
        fetch('/api/track', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            page: pathname || window.location.pathname,
            referrer: document.referrer || '',
            visitorId: getVisitorId(),
            screenWidth: window.innerWidth,
            language: navigator.language || '',
          }),
        }).catch(() => {});
      } catch (e) {
        // Silent fail
      }
    }, 800);

    return () => clearTimeout(timer);
  }, [pathname]); // Re-track on every page navigation

  return null;
}
