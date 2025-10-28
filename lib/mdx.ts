import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { ResearchPost } from './types';

const contentDirectory = path.join(process.cwd(), 'content/research');

export function getResearchPosts(): ResearchPost[] {
  const files = fs.readdirSync(contentDirectory);

  const posts = files
    .filter(file => file.endsWith('.mdx'))
    .map(file => {
      const slug = file.replace(/\.mdx$/, '');
      const fullPath = path.join(contentDirectory, file);
      const fileContents = fs.readFileSync(fullPath, 'utf8');
      const { data, content } = matter(fileContents);

      return {
        slug,
        title: data.title,
        date: data.date,
        summary: data.summary,
        tags: data.tags || [],
        content,
      };
    })
    .sort((a, b) => (a.date > b.date ? -1 : 1));

  return posts;
}

export function getResearchPost(slug: string): ResearchPost | null {
  try {
    const fullPath = path.join(contentDirectory, `${slug}.mdx`);
    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    return {
      slug,
      title: data.title,
      date: data.date,
      summary: data.summary,
      tags: data.tags || [],
      content,
    };
  } catch {
    return null;
  }
}

