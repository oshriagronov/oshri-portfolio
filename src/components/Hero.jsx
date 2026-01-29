import heroImg from "../assets/hero.svg";
import arrowDown from "../assets/down-arrow-1.svg";
const Hero = () => {
  return (
    // Hero section with padding and responsive flex layout
    <section className="pt-20 pb-40 sm:flex justify-around flex flex-col items-center min-h-screen" id="home">
      <div className="mx-auto max-w-7xl py-4 px-4 flex flex-row items-center justify-between gap-x-16 sm:gap-x-16 sm:items-center sm:py-8">
        <article className="">
          {/* Main heading introducing Oshri with an emoji and highlighted name */}
          <h1 className="text-4xl title mb-8 tracking-tight sm:text-5xl md:text-7xl">
          Hi
            <span className="inline-block ml-4">👋</span>
            , I'm <span className="highlight">Oshri</span> a curious mind in software, always creating.
          </h1>
          {/* Subheading describing Oshri's passion and skills */}
          <h2 className="text-xl sub-text mb-12 leading-relaxed max-w-2xl mx-auto sm:text-2xl lg:mx-0 ">
            I’m a passionate developer who loves turning ideas into real products.<br/>
            Constantly sharpening my skills in modern programming languages, frameworks, and cutting-edge technologies.
          </h2>
        </article>
        {/* Image illustrating the hero section, hidden on smaller screens */}
        <article className="hidden md:block">
          <img
            src={heroImg}
            alt="A man working on the laptop with a screen beside it"
            className="w-full h-full object-cover"
          />
        </article>
      </div>
      {/* Arrow navigation link that scrolls down to the projects section with hover animations */}
      <div className="flex justify-center">
        <a href="#projects" className="flex items-center duration-300 hover:scale-130 hover:-translate-y-1">
          {/* Invert icon in dark mode for visibility. */}
          <img
            src={arrowDown}
            alt="An arrow pointing down"
            className="h-8 w-8 dark:invert"
          />
        </a>
      </div>
    </section>
  );
};
export default Hero;
