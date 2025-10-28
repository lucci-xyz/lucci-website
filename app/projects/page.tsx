'use client';

import { useState } from 'react';
import { Section } from '@/components/section';
import { ProjectCard } from '@/components/project-card';
import { Badge } from '@/components/ui/badge';
import { getProjects, getAllTags } from '@/lib/projects';

const projects = getProjects();
const allTags = getAllTags();

export default function ProjectsPage() {
  const [selectedTag, setSelectedTag] = useState<string | null>(null);

  const filteredProjects = selectedTag
    ? projects.filter(p => p.tags.includes(selectedTag))
    : projects;

  return (
    <Section>
      <div className="mb-12">
        <h1 className="mb-4 text-4xl font-bold tracking-tight md:text-5xl">
          Projects
        </h1>
        <p className="mb-8 text-lg text-muted-foreground">
          Open-source experiments in Web3 infrastructure. Varying degrees of
          completeness and stability.
        </p>

        {/* Tag Filter */}
        <div className="flex flex-wrap gap-2">
          <Badge
            variant={selectedTag === null ? 'default' : 'outline'}
            className="cursor-pointer"
            onClick={() => setSelectedTag(null)}
          >
            All
          </Badge>
          {allTags.map(tag => (
            <Badge
              key={tag}
              variant={selectedTag === tag ? 'default' : 'outline'}
              className="cursor-pointer"
              onClick={() =>
                setSelectedTag(selectedTag === tag ? null : tag)
              }
            >
              {tag}
            </Badge>
          ))}
        </div>
      </div>

      {filteredProjects.length === 0 ? (
        <div className="py-12 text-center">
          <p className="text-muted-foreground">
            No projects found with the selected tags.
          </p>
        </div>
      ) : (
        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {filteredProjects.map(project => (
            <ProjectCard key={project.name} project={project} />
          ))}
        </div>
      )}
    </Section>
  );
}

