import type { TvEvent } from '@/lib/tv-types';
import { cn } from '@/lib/utils';

interface EventCardProps {
  event: TvEvent;
  compact?: boolean;
  isToday?: boolean;
}

export function EventCard({ event, compact, isToday }: EventCardProps) {
  return (
    <div className={cn(
      "rounded-xl border shadow-sm transition-all duration-300",
      "bg-card/50 backdrop-blur-md border-border/40",
      isToday && "border-primary/30 shadow-primary/10 shadow-md",
      compact ? "p-3" : "p-4"
    )}>
      <div className={cn(
        "font-bold text-card-foreground leading-tight",
        compact ? "text-lg" : "text-xl"
      )}>
        {event.name}
      </div>
      <div className={cn("text-muted-foreground mt-2 flex items-center gap-1.5", compact ? "text-sm" : "text-base")}>
        📍 {event.location}
      </div>
      <div className={cn("text-muted-foreground flex items-center gap-1.5 mt-1", compact ? "text-sm" : "text-base")}>
        🕐 {event.startTime} – {event.endTime}
      </div>
    </div>
  );
}
