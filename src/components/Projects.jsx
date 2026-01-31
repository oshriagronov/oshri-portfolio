import { useLayoutEffect, useRef, useState } from "react";
import ProjectsCard from "./ProjectsCard";
import useFetchProjects from "./fetchProjects";

const Projects = () => {
  const [openCards, setOpenCards] = useState(() => new Set());
  const [showAll, setShowAll] = useState(false);
  const [collapsedHeight, setCollapsedHeight] = useState(0);
  const [expandedHeight, setExpandedHeight] = useState(0);
  const gridRef = useRef(null);
  const cardRefs = useRef([]);
  // Fetch projects data and loading state using custom hook
  const { isLoading, projects } = useFetchProjects();

  cardRefs.current = [];

  useLayoutEffect(() => {
    if (isLoading) return;
    if (!gridRef.current) return;
    const cards = cardRefs.current.filter(Boolean);
    if (!cards.length) return;
    const firstRowCards = cards.slice(0, 3);
    const rowHeight = Math.max(...firstRowCards.map((card) => card.offsetHeight));
    const fullHeight = gridRef.current.scrollHeight;
    setCollapsedHeight((prev) => (prev !== rowHeight ? rowHeight : prev));
    setExpandedHeight((prev) => (prev !== fullHeight ? fullHeight : prev));
  }, [projects, openCards, showAll]);
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
      <div
        className="overflow-hidden transition-[max-height] duration-300 ease-in-out"
        style={{
          maxHeight: showAll ? expandedHeight : collapsedHeight,
        }}
      >
        <div
          ref={gridRef}
          className="grid items-start gap-8 md:gap-10 lg:grid-cols-3"
        >
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
              cardRef={(el) => {
                if (el) {
                  cardRefs.current[index] = el;
                }
              }}
            />
          );
          })}
        </div>
      </div>
      {projects.length > 3 ? (
        <div className="mt-10 flex justify-center">
          <button
            type="button"
            className="rounded-full border border-gray-200 px-6 py-2 text-base font-semibold text-gray-500 transition-all duration-300 ease-out hover:-translate-y-0.5 hover:bg-gray-200 hover:text-slate-900 active:translate-y-0 active:scale-95 dark:hover:text-blue-500"
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
