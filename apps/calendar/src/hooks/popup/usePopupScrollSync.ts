import { useEffect, useState } from 'preact/hooks';

export function usePopupScrollSync() {
  const [scroll, setScroll] = useState<{ x: number; y: number }>({
    x: window.scrollX,
    y: window.scrollY,
  });

  useEffect(() => {
    const onScroll = () => {
      setScroll({
        x: window.scrollX,
        y: window.scrollY,
      });
    };

    window.addEventListener('scroll', onScroll);

    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return [scroll.x, scroll.y];
}
