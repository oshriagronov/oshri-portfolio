import { useState } from "react";
import ProjectsCard from "./ProjectsCard";
import useFetchProjects from "./fetchProjects";

const Projects = () => {
  const [openCards, setOpenCards] = useState(() => new Set());
  // Fetch projects data and loading state using custom hook
  const { isLoading, projects } = useFetchProjects();
  // Show loading indicator while data is being fetched
  if (isLoading) return <div className="loading"></div>;
  // Render the projects section with a title and a list of project cards
  return (
    <section className="scroll-mt-20 py-20 align-element" id="projects">
      {/* Section title */}
      <h2 className="text-3xl text-center title mb-12 md:mb-16">
        Some of my recent projects <span className="hidden md:inline-block">🔭</span>
      </h2>

      {/* Dynamically render each project using the ProjectsCard component */}
      <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-3">
        {projects.map((project, index) => {
          const cardId =
            project?.id ?? project?.title ?? `project-card-${index}`;
          const isOpen = openCards.has(cardId);
          const handleToggle = () => {
            setOpenCards((prev) => {
              const next = new Set(prev);
              if (next.has(cardId)) {
                next.delete(cardId);
              } else {
                next.add(cardId);
              }
              return next;
            });
          };
          return (
            <ProjectsCard
              key={cardId}
              {...project}
              isOpen={isOpen}
              onToggle={handleToggle}
            />
          );
        })}
      </div>
    </section>
  );
};

export default Projects;
