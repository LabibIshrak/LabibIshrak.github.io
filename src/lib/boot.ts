export const INTRO_CLASS = "intro-pending";
export const MOTION_CLASS = "motion-ok";
export const INTRO_STORAGE_KEY = "labib-intro-seen";

/**
 * Runs before first paint (inlined in <head>).
 *
 * - `motion-ok`: the visitor has no reduced-motion preference, so CSS may
 *   pre-hide elements that GSAP reveals. This prevents the
 *   "visible → hidden → animate in" flash that happens when the server
 *   HTML paints before hydration.
 * - `intro-pending`: first visit to "/" this session. Only then is the
 *   server-rendered preloader shown, so other routes and repeat visits
 *   never flash it.
 */
export const bootScript = `(function(){try{var d=document.documentElement;var m=window.matchMedia("(prefers-reduced-motion: reduce)").matches;if(!m)d.classList.add("${MOTION_CLASS}");var s=false;try{s=sessionStorage.getItem("${INTRO_STORAGE_KEY}")==="1"}catch(e){}if(!m&&!s&&location.pathname==="/")d.classList.add("${INTRO_CLASS}")}catch(e){}})();`;
