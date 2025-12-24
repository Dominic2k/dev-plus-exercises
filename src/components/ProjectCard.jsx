import React from "react";
import { ExternalLink, Code2 } from "lucide-react";

const ProjectCard = ({ project }) => {
    return (
        <div className="project-card">
            <div className="card-header">
                <h4>{project.name}</h4>
                <Code2 size={20} className="project-icon" />
            </div>
            <p className="card-desc">{project.description}</p>

            <div className="tags">
                {project.tags.map((tag, index) => (
                    <span key={index} className="tag">
                        {tag}
                    </span>
                ))}
            </div>

            <div className="card-links">
                <a
                    href={project.repoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                >
                    GitHub
                </a>
                {project.demoUrl && (
                    <a
                        href={project.demoUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="btn btn-primary"
                    >
                        Demo{" "}
                        <ExternalLink size={16} style={{ marginLeft: "5px" }} />
                    </a>
                )}
            </div>
        </div>
    );
};

export default ProjectCard;
