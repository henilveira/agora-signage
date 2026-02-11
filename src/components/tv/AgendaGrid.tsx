import type { TvEvent } from '@/lib/tv-types';
import { EventCard } from '@/components/tv/EventCard.tsx';
import { cn } from '@/lib/utils';
const WEEKDAYS = ['Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta'];
const DAY_INDEX_MAP: Record<string, number> = {
  'Segunda': 1,
  'Terça': 2,
  'Quarta': 3,
  'Quinta': 4,
  'Sexta': 5
};
interface AgendaGridProps {
  events: TvEvent[];
  orientation: 'horizontal' | 'vertical';
  currentDayOfWeek: number; // 0=Sun, 1=Mon...
}
export function AgendaGrid({
  events,
  orientation,
  currentDayOfWeek
}: AgendaGridProps) {
  const grouped = WEEKDAYS.reduce<Record<string, TvEvent[]>>((acc, day) => {
    acc[day] = events.filter(e => e.dayOfWeek === day);
    return acc;
  }, {});
  if (orientation === 'horizontal') {
    return <div className="flex-1 grid grid-cols-5 gap-3 p-4 overflow-hidden">
        {WEEKDAYS.map(day => {
        const isToday = DAY_INDEX_MAP[day] === currentDayOfWeek;
        return <div key={day} className={cn("flex flex-col rounded-xl p-3 gap-2 overflow-hidden py-[4px] px-[4px]", isToday ? "bg-accent ring-2 ring-primary" : "bg-secondary/50")}>
              <div className={cn("text-center font-bold text-lg pb-2 border-b", isToday ? "text-white border-primary" : "text-foreground border-border")}>
                {day}
                {grouped[day][0] && <span className={`block text-xs font-normal ${isToday ? "text-white" : "text-muted-foreground"}`}>
                    {grouped[day][0].date}
                  </span>}
              </div>
              <div className="flex flex-col gap-2 overflow-hidden">
                {grouped[day].length > 0 ? grouped[day].map(e => <EventCard key={e.id} event={e} />) : <div className="text-center text-muted-foreground text-sm py-4">
                    Sem eventos
                  </div>}
              </div>
            </div>;
      })}
      </div>;
  }

  // Vertical: rows per day
  return <div className="flex-1 flex flex-col gap-3 p-4 overflow-hidden">
      {WEEKDAYS.map(day => {
      const isToday = DAY_INDEX_MAP[day] === currentDayOfWeek;
      return <div key={day} className={cn("rounded-xl p-3 overflow-hidden", isToday ? "bg-accent ring-2 ring-primary" : "bg-secondary/50")}>
            <div className={cn("font-bold text-lg mb-2", isToday ? "text-primary" : "text-foreground")}>
              {day}
              {grouped[day][0] && <span className="text-sm font-normal text-muted-foreground ml-2">
                  {grouped[day][0].date}
                </span>}
            </div>
            <div className="flex flex-wrap gap-2">
              {grouped[day].length > 0 ? grouped[day].map(e => <div key={e.id} className="flex-1 min-w-[200px]">
                    <EventCard event={e} compact />
                  </div>) : <div className="text-muted-foreground text-sm">Sem eventos</div>}
            </div>
          </div>;
    })}
    </div>;
}