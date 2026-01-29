import aboutSvg from "../assets/about.svg";

const About = () => {
  return (
    <section className="scroll-mt-20 py-20" id="about">
      {/* Container for aligning content vertically and centering items */}
      <div className="align-element text-center items-center">
        {/* Section title */}
        <h2 className="text-3xl title mb-6">About me 👨‍💻</h2>
        {/* Paragraph describing personal background and aspirations */}
        <p className="space-y-6 text-lg sub-text">
          I'm a Software Engineering student with a strong interest in building
          clean, practical, and scalable software.
          <br />I enjoy working across the stack and turning ideas into solid,
          working systems, with an emphasis on clarity, performance, and good
          design decisions.
        </p>
        {/* Image illustrating the about section content */}
        <img
          src={aboutSvg}
          alt="Moonlight on a forest"
          className="w-full h-64 mt-20"
        />
      </div>
    </section>
  );
};

export default About;
