import { FaGithub } from "react-icons/fa6";
import { TbWorldWww } from "react-icons/tb";
const ProjectsCard = ({ url, imageSrc, github, title, text, stack }) => {
  return (
    // Project card layout with grid, shadow, and rounded corners
    // Theme-aware card surface for light/dark modes. */
    <article className="grid md:grid-cols-2 gap-12 items-stretch rounded-2xl bg-white/80 dark:bg-slate-900/60 shadow-md hover:shadow-xl transition-colors duration-300">
      {/* Project image */}
      <div className="rounded-2xl overflow-hidden h-full flex items-center">
        <img
          src={imageSrc}
          alt={title}
          className="rounded-2xl w-full h-auto object-contain"
        />
      </div>
      <div className="flex flex-col justify-center p-3">
        {/* Project details: title and description */}
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-lg sub-text leading-relaxed mb-6">{text}</p>
        {/* Stack tags */}
        <div className="flex flex-wrap gap-2 mb-4">
          {/* Stack pills with dark-mode background. */}
          {stack?.map((item) => {
            return (
              <span className="px-4 py-1.5 bg-gray-100 dark:bg-slate-800 shadow-md sub-text text-sm rounded-full">
                {item}
              </span>
            );
          })}
        </div>
        {/* Action icons for website and GitHub links */}
        <div className="mt-4 flex">
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
      </div>
    </article>
  );
};
export default ProjectsCard;
