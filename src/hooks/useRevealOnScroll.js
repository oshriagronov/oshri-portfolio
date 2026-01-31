import { useEffect, useRef } from "react";

const useRevealOnScroll = (deps = []) => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReduced = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const revealElements = container.querySelectorAll("[data-reveal]");

    if (!revealElements.length) return;

    if (prefersReduced) {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    if (typeof IntersectionObserver === "undefined") {
      revealElements.forEach((element) => {
        element.classList.add("is-visible");
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries, obs) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-visible");
          obs.unobserve(entry.target);
        });
      },
      { threshold: 0.15, rootMargin: "0px" },
    );

    revealElements.forEach((element) => {
      if (!element.classList.contains("is-visible")) {
        observer.observe(element);
      }
    });

    return () => observer.disconnect();
  }, [containerRef, ...deps]);

  return containerRef;
};

export default useRevealOnScroll;
