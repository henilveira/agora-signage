import type { TvConfig, TvEvent, TvData } from "@/lib/tv-types";

const STORAGE_KEY_CONFIG = 'agora-tv-config';
const STORAGE_KEY_EVENTS = 'agora-tv-events';
const STORAGE_KEY_IMAGE = 'agora-tv-image';

export function getTvConfig(slug: string): TvConfig | null {
  try {
    const raw = localStorage.getItem(`${STORAGE_KEY_CONFIG}-${slug}`);
    return raw ? JSON.parse(raw) : null;
  } catch { return null; }
}

export function getTvEvents(): TvEvent[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY_EVENTS);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

export function getTvImage(slug: string): string | null {
  try {
    return localStorage.getItem(`${STORAGE_KEY_IMAGE}-${slug}`) || null;
  } catch { return null; }
}

export function getTvData(slug: string): TvData {
  return {
    config: getTvConfig(slug) || { slug, orientation: 'horizontal' },
    events: getTvEvents(),
    image: getTvImage(slug) || undefined,
  };
}

export function seedMockData(slug: string) {
  const configKey = `${STORAGE_KEY_CONFIG}-${slug}`;
  if (localStorage.getItem(configKey)) return; // already seeded

  const config: TvConfig = { slug, orientation: 'horizontal' };
  localStorage.setItem(configKey, JSON.stringify(config));

  const events: TvEvent[] = [
    { id: '1', name: 'Pitch Day Startups', location: 'Auditório Principal', dayOfWeek: 'Segunda', date: '10/02', startTime: '09:00', endTime: '11:30' },
    { id: '2', name: 'Workshop de IA Generativa', location: 'Sala 201', dayOfWeek: 'Segunda', date: '10/02', startTime: '14:00', endTime: '16:00' },
    { id: '3', name: 'Meetup Frontend Brasil', location: 'Espaço Coworking', dayOfWeek: 'Terça', date: '11/02', startTime: '19:00', endTime: '21:00' },
    { id: '4', name: 'Demo Day - Turma 12', location: 'Auditório Principal', dayOfWeek: 'Quarta', date: '12/02', startTime: '10:00', endTime: '12:00' },
    { id: '5', name: 'Painel: Futuro do Trabalho', location: 'Sala de Eventos', dayOfWeek: 'Quarta', date: '12/02', startTime: '15:00', endTime: '17:00' },
    { id: '6', name: 'Hackathon Ágora 2025', location: 'Lab de Inovação', dayOfWeek: 'Quinta', date: '13/02', startTime: '08:00', endTime: '20:00' },
    { id: '7', name: 'Café com Investidores', location: 'Lounge VIP', dayOfWeek: 'Sexta', date: '14/02', startTime: '09:30', endTime: '11:00' },
    { id: '8', name: 'Happy Hour Tech', location: 'Terraço', dayOfWeek: 'Sexta', date: '14/02', startTime: '17:00', endTime: '19:00' },
    { id: '9', name: 'Workshop Design Systems', location: 'Sala Criativa', dayOfWeek: 'Sábado', date: '15/02', startTime: '10:00', endTime: '13:00' },
  ];
  localStorage.setItem(STORAGE_KEY_EVENTS, JSON.stringify(events));

  // No image initially — shows agenda
  localStorage.removeItem(`${STORAGE_KEY_IMAGE}-${slug}`);
}
