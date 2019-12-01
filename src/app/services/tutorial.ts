export interface Resource {
  topic: string,
  videoLink: string;
  played: boolean;
}

export interface Section {
  title: string;
  numberOfVideos: number;
  numberOfVideosPlayed: number;
  totalDurationOfVideos: string;
  resources: Resource[];
  subtitles: string[];
}

export interface Tutorial {
  videos: Section[];
}
