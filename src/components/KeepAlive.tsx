'use client';

import { useEffect } from 'react';

export function KeepAlive() {
  useEffect(() => {
    const keepAliveInterval = setInterval(async () => {
      try {
        await fetch('/api/health', { method: 'GET' });
      } catch (error) {
        console.log('Keep-alive ping sent');
      }
    }, 4 * 60 * 1000); // Ping every 4 minutes

    return () => clearInterval(keepAliveInterval);
  }, []);

  return null;
}
