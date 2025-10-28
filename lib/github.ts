import { GitHubRepo } from './types';

const GITHUB_API = 'https://api.github.com';

export async function getRepoData(repoUrl: string): Promise<GitHubRepo | null> {
  try {
    // Extract owner and repo from GitHub URL
    const match = repoUrl.match(/github\.com\/([^/]+)\/([^/]+)/);
    if (!match) return null;

    const [, owner, repo] = match;
    const response = await fetch(`${GITHUB_API}/repos/${owner}/${repo}`, {
      headers: {
        Accept: 'application/vnd.github.v3+json',
      },
      next: {
        revalidate: 3600, // Cache for 1 hour
      },
    });

    if (!response.ok) return null;

    const data = await response.json();
    return {
      stars: data.stargazers_count,
      updatedAt: data.updated_at,
    };
  } catch (error) {
    console.error('Error fetching GitHub repo data:', error);
    return null;
  }
}

