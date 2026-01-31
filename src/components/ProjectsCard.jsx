import { FaGithub } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
const ProjectsCard = ({
  url,
  imageSrc,
  github,
  title,
  text,
  stack,
  isOpen,
  onToggle,
  revealDelay = 0,
}) => {
  const revealStyle = {
    "--reveal-delay": `${revealDelay}ms`,
  };
  return (
    // Project card layout with grid, shadow, and rounded corners
    // Theme-aware card surface for light/dark modes. */
    <article
      data-reveal
      style={revealStyle}
      className="reveal-on-scroll flex self-start flex-col gap-6 rounded-2xl border-2 border-gray-200 bg-white/80 p-6 hover:border-blue-500 dark:bg-slate-900/60"
    >
      {/* Project image */}
      <div className="h-48 w-full rounded-2xl overflow-hidden">
        <img
          src={imageSrc}
          alt={title}
          className="h-full w-full object-cover"
        />
      </div>
      {/* Project details: title and stack */}
      <h2 className="text-2xl font-bold">{title}</h2>
      {/* Stack tags */}
      <div className="flex flex-wrap gap-2">
        {/* Stack pills with dark-mode background. */}
        {stack?.map((item) => {
          return (
            <span className="px-4 py-1.5 bg-gray-100 dark:bg-slate-800 shadow-md sub-text text-sm rounded-full">
              {item}
            </span>
          );
        })}
      </div>
      <div className="flex flex-col gap-4">
        {/* Action icons for website and GitHub links */}
        <div className="flex">
          <a href={url}>
            <TbWorldWww
              className={
                url ? "icon-button mr-2 sub-text hover-effect" : "hidden"
              }
            />
          </a>
          <a href={github}>
            <FaGithub
              className={
                github ? "icon-button mr-2 sub-text hover-effect" : "hidden"
              }
            />
          </a>
        </div>
        <div
          className={`overflow-hidden transition-[max-height,opacity] duration-300 ease-in-out ${
            isOpen ? "max-h-96 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <p className="text-base sub-text leading-relaxed">{text}</p>
        </div>
        <button
          type="button"
          className="inline-flex items-center self-start px-0 py-2 text-base font-semibold text-gray-500 transition-colors duration-300 hover:text-slate-900 dark:hover:text-blue-500"
          onClick={onToggle}
          aria-expanded={isOpen}
        >
          {isOpen ? "Hide info" : "More info"}
        </button>
      </div>
    </article>
  );
};
export default ProjectsCard;
