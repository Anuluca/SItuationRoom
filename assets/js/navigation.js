(() => {
  const reducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)");
  const transitionDuration = 320;
  let navigating = false;

  function resetTransition() {
    navigating = false;
    document.body.classList.remove("route-leaving");
    document.body.classList.add("route-entering");
  }

  document.addEventListener("click", (event) => {
    const link = event.target.closest("a[href]");
    if (!link || event.defaultPrevented || event.button !== 0) return;
    if (event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    if (link.target || link.hasAttribute("download")) return;

    const destination = new URL(link.href, window.location.href);
    const current = new URL(window.location.href);
    const isSamePage =
      destination.pathname === current.pathname &&
      destination.search === current.search;

    if (destination.origin !== current.origin || isSamePage || reducedMotion.matches) return;
    if (!destination.pathname.endsWith(".html") && destination.pathname !== "/") return;

    event.preventDefault();
    if (navigating) return;
    navigating = true;
    document.body.classList.remove("route-entering");
    document.body.classList.add("route-leaving");

    window.setTimeout(() => {
      window.location.href = destination.href;
    }, transitionDuration);
  });

  window.addEventListener("pageshow", resetTransition);
  window.setTimeout(() => document.body.classList.remove("route-entering"), 520);
})();
