
import React from 'react';
import { Project } from '../types';

interface ProjectCardProps {
  project: Project;
}

const ProjectCard: React.FC<ProjectCardProps> = ({ project }) => {
  const aspectClasses = {
    square: 'aspect-square',
    video: 'aspect-video',
    portrait: 'aspect-[4/5]',
    tall: 'aspect-[3/4]'
  };

  return (
    <div className="masonry-item card-project group">
      <div className={`card-image ${aspectClasses[project.aspect_ratio]}`}>
        <img
          alt={project.title}
          src={project.image_url}
          loading="lazy"
        />
      </div>
      <div className="card-content">
        <span className="text-xs font-bold text-primary uppercase tracking-widest">{project.tag}</span>
        <h3 className="card-title group-hover:text-primary transition-colors">{project.title}</h3>
        <p className="card-desc">{project.description}</p>
      </div>
    </div>
  );
};

export default ProjectCard;
