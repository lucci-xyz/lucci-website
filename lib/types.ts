export interface Project {
  name: string;
  blurb: string;
  tags: string[];
  status: 'alpha' | 'experimental' | 'archived';
  githubUrl: string;
  siteUrl?: string | null;
}

export interface ResearchPost {
  slug: string;
  title: string;
  date: string;
  summary: string;
  tags: string[];
  content: string;
}

export interface GitHubRepo {
  stars: number;
  updatedAt: string;
}

