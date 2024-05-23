import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { MutableRefObject } from "react";

gsap.registerPlugin(ScrollTrigger);

type AnimationProps = gsap.TweenVars;
type ScrollProps = ScrollTrigger.StaticVars;

type GsapTweenTarget = string | Element | Element[] | NodeListOf<Element>;

export const animateWithGsap = (
  target: GsapTweenTarget | undefined,
  animationProps: AnimationProps,
  scrollProps?: Partial<ScrollProps>
): void => {
  if (target) {
    gsap.to(target, {
      ...animationProps,
      scrollTrigger: {
        trigger: target,
        toggleActions: "restart reverse restart reverse",
        start: "top 85%",
        ...scrollProps,
      },
    });
  }
};

export const animateWithGsapTimeline = (
  timeline: gsap.core.Timeline,
  rotationRef: MutableRefObject<{ rotation: { y: number } }>,
  rotationState: number,
  firstTarget: GsapTweenTarget | undefined,
  secondTarget: GsapTweenTarget | undefined,
  animationProps: AnimationProps
): void => {
  if (firstTarget && secondTarget) {
    timeline.to(rotationRef.current.rotation, {
      y: rotationState,
      duration: 1,
      ease: "power2.inOut",
    });

    timeline.to(
      firstTarget,
      {
        ...animationProps,
        ease: "power2.inOut",
      },
      "<"
    );

    timeline.to(
      secondTarget,
      {
        ...animationProps,
        ease: "power2.inOut",
      },
      "<"
    );
  }
};
