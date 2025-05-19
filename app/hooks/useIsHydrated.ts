import {useEffect, useState} from 'react';

/**
 * A hook that determines if the user agent is on a mobile device.
 */
export function useIsHydrated() {
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  return isHydrated;
}
