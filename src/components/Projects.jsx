import { useState } from "react";
import ProjectsCard from "./ProjectsCard";
import useFetchProjects from "./fetchProjects";
import useRevealOnScroll from "../hooks/useRevealOnScroll";

const Projects = () => {
  const [openCards, setOpenCards] = useState(() => new Set());
  const [showAll, setShowAll] = useState(false);
  // Fetch projects data and loading state using custom hook
  const { isLoading, projects } = useFetchProjects();
  const revealRef = useRevealOnScroll([projects.length, showAll]);
  // Show loading indicator while data is being fetched
  if (isLoading) return <div className="loading"></div>;
  // Render the projects section with a title and a list of project cards
  const visibleProjects = projects.slice(0, 3);
  const extraProjects = projects.slice(3);
  return (
    <section
      ref={revealRef}
      className="scroll-mt-20 py-20 align-element"
      id="projects"
    >
      {/* Section title */}
      <h2
        data-reveal
        style={{ "--reveal-delay": "0ms" }}
        className="reveal-on-scroll text-3xl text-center title mb-12 md:mb-16"
      >
        Some of my recent projects <span className="hidden md:inline-block">🔭</span>
      </h2>

      {/* Dynamically render each project using the ProjectsCard component */}
      <div className="grid items-start gap-8 md:gap-10 lg:grid-cols-3">
        {visibleProjects.map((project, index) => {
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
              revealDelay={120 + index * 90}
            />
          );
        })}
      </div>
      {extraProjects.length ? (
        <div
          className="overflow-hidden pb-3 transition-[max-height,opacity] duration-300 ease-in-out"
          style={{
            maxHeight: showAll ? "9999px" : 0,
            opacity: showAll ? 1 : 0,
          }}
        >
          <div className="mt-8 grid items-start gap-8 md:gap-10 lg:grid-cols-3">
            {extraProjects.map((project, index) => {
              const cardId =
                project?.id ?? project?.title ?? `project-card-${index + 3}`;
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
                  revealDelay={120 + (index + 3) * 90}
                />
              );
            })}
          </div>
        </div>
      ) : null}
      {projects.length > 3 ? (
        <div
          data-reveal
          style={{ "--reveal-delay": "200ms" }}
          className="reveal-on-scroll mt-10 flex justify-center"
        >
          <button
            type="button"
            className="rounded-full bg-black px-6 py-2 text-lg font-semibold text-white transition-all duration-300 hover:scale-110 hover:-translate-y-1 hover:bg-slate-900 dark:bg-white dark:text-black dark:hover:bg-slate-100"
            onClick={() => setShowAll((prev) => !prev)}
          >
            {showAll ? "Show less" : "Show more"}
          </button>
        </div>
      ) : null}
    </section>
  );
};

export default Projects;
