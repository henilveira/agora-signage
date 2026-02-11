import { useState, useEffect } from 'react';

export function useScreenOrientation(): 'horizontal' | 'vertical' {
  const [orientation, setOrientation] = useState<'horizontal' | 'vertical'>(() => {
    const ratio = window.innerWidth / window.innerHeight;
    return ratio < 1 ? 'vertical' : 'horizontal';
  });

  useEffect(() => {
    const handler = () => {
      const ratio = window.innerWidth / window.innerHeight;
      setOrientation(ratio < 1 ? 'vertical' : 'horizontal');
    };

    window.addEventListener('resize', handler);
    return () => window.removeEventListener('resize', handler);
  }, []);

  return orientation;
}