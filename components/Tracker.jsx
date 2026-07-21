'use client';
import { useEffect } from 'react';

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
  useEffect(() => {
    // Small delay to not block page load
    const timer = setTimeout(() => {
      try {
        const payload = JSON.stringify({
          page: window.location.pathname,
          referrer: document.referrer || '',
          visitorId: getVisitorId(),
          screenWidth: window.innerWidth,
          language: navigator.language || '',
        });

        // Use sendBeacon for non-blocking fire-and-forget
        if (navigator.sendBeacon) {
          navigator.sendBeacon('/api/track', payload);
        } else {
          fetch('/api/track', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: payload,
          }).catch(() => {});
        }
      } catch (e) {
        // Silent fail — tracking should never break the site
      }
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  return null; // Invisible component
}
