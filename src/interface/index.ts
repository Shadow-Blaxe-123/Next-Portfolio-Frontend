export interface Project {
  id: string;
  title: string;
  description: string;
  content: string;
  isFeatured: boolean;
  githubUrl: string | null;
  liveUrl: string | null;
  thumbnailUrl: string | null;
  videoUrl: string | null;
}

export interface Blog {
  id: string;
  title: string;
  description: string;
  content: string;
  isFeatured: boolean;
  thumbnailUrl: string | null;
}
