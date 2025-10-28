import projectsData from '@/data/projects.json';
import { Project } from './types';

export function getProjects(): Project[] {
  return projectsData as Project[];
}

export function getProjectsByTag(tag: string): Project[] {
  return projectsData.filter(project =>
    project.tags.includes(tag)
  ) as Project[];
}

export function getAllTags(): string[] {
  const tags = new Set<string>();
  projectsData.forEach(project => {
    project.tags.forEach(tag => tags.add(tag));
  });
  return Array.from(tags).sort();
}

