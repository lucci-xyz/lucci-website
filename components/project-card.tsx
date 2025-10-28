'use client';

import { ExternalLink, Github, Star } from 'lucide-react';
import Link from 'next/link';
import { Project } from '@/lib/types';
import { useState, useEffect } from 'react';

interface ProjectCardProps {
  project: Project;
}

export function ProjectCard({ project }: ProjectCardProps) {
  const [stars, setStars] = useState<number | null>(null);

  useEffect(() => {
    async function fetchStars() {
      try {
        const response = await fetch(
          `/api/github?repo=${encodeURIComponent(project.githubUrl)}`
        );
        if (response.ok) {
          const data = await response.json();
          setStars(data.stars);
        }
      } catch (error) {
        console.error('Error fetching stars:', error);
      }
    }
    fetchStars();
  }, [project.githubUrl]);

  return (
    <div className="group flex flex-col rounded-xl border border-gray-200 bg-white p-6 transition-all hover:shadow-md dark:border-gray-800 dark:bg-gray-900">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-xl font-semibold text-gray-900 dark:text-white">{project.name}</h3>
        {stars !== null && (
          <div className="flex items-center gap-1.5 rounded-full bg-gray-100 px-3 py-1 text-sm font-medium dark:bg-gray-800">
            <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
            <span className="text-gray-700 dark:text-gray-300">{stars}</span>
          </div>
        )}
      </div>
      
      <p className="mb-6 flex-1 text-gray-600 dark:text-gray-400">{project.blurb}</p>
      
      <div className="mb-6 flex flex-wrap gap-2">
        {project.tags.map(tag => (
          <span
            key={tag}
            className="rounded-full bg-gray-100 px-3 py-1 text-xs font-medium text-gray-700 dark:bg-gray-800 dark:text-gray-300"
          >
            {tag}
          </span>
        ))}
      </div>
      
      <div className="flex items-center justify-between border-t border-gray-200 pt-4 dark:border-gray-800">
        <span className={`rounded-full px-3 py-1 text-xs font-medium ${
          project.status === 'alpha' 
            ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400'
            : project.status === 'experimental'
            ? 'bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400'
            : 'bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-400'
        }`}>
          {project.status}
        </span>
        <div className="flex gap-2">
          <Link
            href={project.githubUrl}
            target="_blank"
            rel="noreferrer"
            className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
          >
            <Github className="h-5 w-5" />
          </Link>
          {project.siteUrl && (
            <Link
              href={project.siteUrl}
              target="_blank"
              rel="noreferrer"
              className="text-gray-600 hover:text-gray-900 dark:text-gray-400 dark:hover:text-white"
            >
              <ExternalLink className="h-5 w-5" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}

