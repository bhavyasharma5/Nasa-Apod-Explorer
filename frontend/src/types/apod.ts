export interface APOD {
  date: string;
  explanation: string;
  hdurl?: string;
  media_type: 'image' | 'video';
  service_version: string;
  title: string;
  url: string;
  copyright?: string;
  thumbnail_url?: string;
}

export interface APIResponse<T> {
  success: boolean;
  data?: T;
  count?: number;
  error?: string;
}

