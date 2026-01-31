import { useEffect, useRef, useState } from "react";
import { links } from "../data";

// Read OS-level color scheme preference.
const getSystemTheme = () =>
  window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light";

// Navbar component renders the top navigation bar of the website
const Navbar = () => {
  // Persisted theme override ("light"/"dark") or "system" fallback.
  const [theme, setTheme] = useState(
    () => localStorage.getItem("theme") || "system",
  );
  // Current OS theme, used when the setting is "system".
  const [systemTheme, setSystemTheme] = useState(() => getSystemTheme());
  const [activeSection, setActiveSection] = useState("home");
  const navRef = useRef(null);

  useEffect(() => {
    // Track OS theme changes in real time.
    const media = window.matchMedia("(prefers-color-scheme: dark)");
    const handleChange = (event) => {
      setSystemTheme(event.matches ? "dark" : "light");
    };
    media.addEventListener("change", handleChange);
    return () => media.removeEventListener("change", handleChange);
  }, []);

  useEffect(() => {
    const resolveHash = () => {
      const current = window.location.hash.replace("#", "");
      if (current) {
        setActiveSection(current);
      }
    };

    resolveHash();
    window.addEventListener("hashchange", resolveHash);
    return () => window.removeEventListener("hashchange", resolveHash);
  }, []);

  useEffect(() => {
    let rafId = null;

    const updateActive = () => {
      const sections = links
        .map((link) => document.querySelector(link.href))
        .filter(Boolean);
      if (!sections.length) return;

      const navHeight = navRef.current?.offsetHeight ?? 0;
      const offset = navHeight + 12;
      let current = sections[0].id;
      const lastSectionId = sections[sections.length - 1]?.id;
      const atBottom =
        window.innerHeight + window.scrollY >=
        document.documentElement.scrollHeight - 2;

      sections.forEach((section) => {
        if (section.getBoundingClientRect().top - offset <= 0) {
          current = section.id;
        }
      });

      if (atBottom && lastSectionId) {
        current = lastSectionId;
      }

      setActiveSection(current);
    };

    const handleScroll = () => {
      if (rafId !== null) return;
      rafId = window.requestAnimationFrame(() => {
        updateActive();
        rafId = null;
      });
    };

    updateActive();
    window.addEventListener("scroll", handleScroll, { passive: true });
    window.addEventListener("resize", handleScroll);
    return () => {
      if (rafId !== null) {
        window.cancelAnimationFrame(rafId);
      }
      window.removeEventListener("scroll", handleScroll);
      window.removeEventListener("resize", handleScroll);
    };
  }, []);

  // Resolve the effective theme the UI should use.
  const resolvedTheme = theme === "system" ? systemTheme : theme;

  useEffect(() => {
    // Apply theme class on <html> for Tailwind's dark mode.
    document.documentElement.classList.toggle("dark", resolvedTheme === "dark");
  }, [resolvedTheme]);

  useEffect(() => {
    // Store override; remove it when returning to system mode.
    if (theme === "system") {
      localStorage.removeItem("theme");
    } else {
      localStorage.setItem("theme", theme);
    }
  }, [theme]);

  const isDark = resolvedTheme === "dark";
  const toggleTheme = () => {
    // Toggle between light/dark, respecting the current system mode.
    setTheme((prevTheme) => {
      const currentTheme = prevTheme === "system" ? systemTheme : prevTheme;
      return currentTheme === "dark" ? "light" : "dark";
    });
  };

  return (
    // The nav element is fixed at the top with a semi-transparent white background and blur effect for a sleek look
    <nav
      ref={navRef}
      className="bg-white/90 dark:bg-black/80 backdrop-blur-sm fixed w-full top-0 z-[9999] transition-colors duration-300"
    >
      <div className="mx-auto max-w-7xl py-4 px-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:py-8">
        {/* Website title with highlighted 'Dev' part for branding */}
        <h2 className="text-3xl title">
          Software<span className="highlight">Dev</span>
        </h2>
        {/* Navigation links and theme toggle aligned to the right */}
        <div className="flex w-full items-center justify-between gap-x-4 sm:w-auto sm:ml-auto sm:justify-end sm:gap-x-8 lg:gap-x-12">
          <div className="flex items-center gap-x-3 lg:gap-12">
            {/* Map over the imported links array to render each navigation link dynamically */}
            {links.map((link) => {
              const { id, href, text } = link;
              const sectionId = href.replace("#", "");
              const isActive = activeSection === sectionId;
              return (
                <a
                  key={id}
                  href={href}
                  className={`capitalize text-xl font-medium tracking-wide text-slate-700 dark:text-slate-200 hover:underline underline-offset-8 hover-effect transition-colors duration-300 ${
                    isActive ? "highlight underline underline-offset-8" : ""
                  }`}
                  aria-current={isActive ? "page" : undefined}
                  onClick={() => setActiveSection(sectionId)}
                >
                  {text}
                </a>
              );
            })}
          </div>
          <button
            type="button"
            onClick={toggleTheme}
            aria-label={
              isDark ? "Switch to light theme" : "Switch to dark theme"
            }
            className="relative inline-flex h-9 w-16 items-center rounded-full bg-slate-200/90 dark:bg-slate-700/90 shadow-sm transition-colors duration-300 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-500"
          >
            <span className="pointer-events-none relative z-10 inline-flex w-full items-center justify-between px-2 text-sm">
              <span
                className={`transition-opacity duration-300 ${
                  isDark ? "opacity-0" : "opacity-100"
                }`}
                aria-hidden="true"
              >
                ☀️
              </span>
              <span
                className={`transition-opacity duration-300 ${
                  isDark ? "opacity-100" : "opacity-0"
                }`}
                aria-hidden="true"
              >
                🌙
              </span>
            </span>
            <span
              className={`absolute left-1 top-1 z-0 h-7 w-7 rounded-full bg-white dark:bg-slate-200 shadow-md transition-transform duration-300 ease-in-out ${
                isDark ? "translate-x-7" : "translate-x-0"
              }`}
            />
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
