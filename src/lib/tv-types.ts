export interface TvEvent {
  id: string;
  name: string;
  location: string;
  dayOfWeek: string;
  date: string; // DD/MM
  startTime: string; // HH:mm
  endTime: string; // HH:mm
}

export interface TvConfig {
  slug: string;
  orientation: 'horizontal' | 'vertical';
}

export interface TvData {
  config: TvConfig;
  events: TvEvent[];
  image?: string; // base64
}
