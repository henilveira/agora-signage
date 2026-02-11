import { useEffect, useState, useCallback } from 'react';
import { useParams } from 'react-router-dom';
import { getTvData, seedMockData } from "@/lib/tv-storage.ts";
import type { TvData } from "@/lib/tv-types.ts";
import { TvHeader } from '@/components/tv/TvHeader.tsx';
import { TvFooter } from '@/components/tv/TvFooter.tsx';
import { AgendaGrid } from '@/components/tv/AgendaGrid.tsx';
import { useClock } from "@/hooks/use-clock.ts";
import { useScreenOrientation } from "@/hooks/use-screen-orientation.ts";

export default function TvPlayer() {
  const { slug = 'default' } = useParams<{ slug: string }>();
  const { dayOfWeek } = useClock();
  const [data, setData] = useState<TvData | null>(null);
  const orientation = useScreenOrientation();
  const effectOrientation = orientation
  const [fadeKey, setFadeKey] = useState(0);
  const loadData = useCallback(() => {
    setData(getTvData(slug));
    setFadeKey(k => k + 1);
  }, [slug]);

  useEffect(() => {
    seedMockData(slug);
    loadData();
  }, [slug, loadData]);

  useEffect(() => {
    const handler = () => loadData();
    window.addEventListener('storage', handler);
    return () => window.removeEventListener('storage', handler);
  }, [loadData]);

  if (!data) return null;

  const { config, events, image } = data;

  return (
    <div className="dark h-screen w-screen overflow-hidden cursor-none bg-background flex flex-col select-none">
      {image ? (
        <img
          src={image}
          alt="Display"
          className="h-full w-full object-cover"
        />
      ) : (
        <div key={fadeKey} className="flex flex-col h-full animate-fade-in">
          <TvHeader orientation={effectOrientation} />
          <AgendaGrid
            events={events}
            orientation={effectOrientation}
            currentDayOfWeek={dayOfWeek}
          />
          <TvFooter />
        </div>
      )}
    </div>
  );
}
