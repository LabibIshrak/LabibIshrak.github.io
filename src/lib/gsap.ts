import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { CustomEase } from "gsap/CustomEase";

// Single registration point for every GSAP plugin used by the site.
// Components import gsap from here so plugins are guaranteed to be
// registered before use, without repeating registerPlugin per module.
gsap.registerPlugin(ScrollTrigger, CustomEase);

export { gsap, ScrollTrigger, CustomEase };
