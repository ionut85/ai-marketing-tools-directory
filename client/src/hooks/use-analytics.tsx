import { useEffect, useRef } from 'react';
import { useLocation } from 'wouter';
import { trackPageView } from '../lib/analytics';
import { trackPostHogPageView } from '../lib/posthog';

export const useAnalytics = () => {
  const [location] = useLocation();
  const prevLocationRef = useRef<string>(location);
  
  useEffect(() => {
    if (location !== prevLocationRef.current) {
      trackPageView(location);
      trackPostHogPageView(location);
      prevLocationRef.current = location;
    }
  }, [location]);
};
