"use client";

import { useLayoutEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import styles from "./Reviews.module.scss";

type Review = {
  id: number;
  client: string;
  company: string;
  quote: string;
  source: string;
  headerCode: string;
};

const reviews: Review[] = [
  {
    id: 1,
    client: "Jhon Doe",
    company: "KPMG",
    quote:
      "eduba turned our ai strategy into a working pipeline in four weeks. they told us what not to build, paired with our team, and left us with skills—not dependency. we cut analysis time by 38% in month one.",
    source: "LINKEDIN",
    headerCode: "(POC_CLIENT)",
  },
  {
    id: 2,
    client: "Sarah Smith",
    company: "Deloitte",
    quote:
      "The team at eduba didn't just deliver a product; they delivered a culture shift. Their approach to AI is pragmatic, effective, and deeply human-centric.",
    source: "DIRECT",
    headerCode: "(STRATEGY_LEAD)",
  },
  {
    id: 3,
    client: "Michael Chen",
    company: "Google",
    quote:
      "A paradigm shift in how we approach interface design. The 'window stack' metaphor they engineered for our dashboard is now a standard across our internal tools.",
    source: "CLUTCH",
    headerCode: "(UX_DIRECTOR)",
  },
  {
    id: 4,
    client: "Elena Rodriguez",
    company: "Spotify",
    quote:
      "Efficient, elegant, and educational. They left our engineers better than they found them.",
    source: "E-MAIL",
    headerCode: "(ENG_MANAGER)",
  },
];

export function Reviews() {
  const containerRef = useRef<HTMLDivElement>(null);
  const cardsRef = useRef<(HTMLDivElement | null)[]>([]);

  // Ref to store the current order of indices
  // We will animate the visual properties of the DOM elements directly
  // But logically we treat them as a cycling list.

  useLayoutEffect(() => {
    const ctx = gsap.context(() => {
      const cards = cardsRef.current.filter((c) => c !== null);
      if (cards.length === 0) return;

      // Configuration
      const cardHeight = 350; // Approx base styling, responsiveness handled by CSS
      const totalCards = cards.length;

      // Initial positions
      // We want a stack effect:
      // Front card: zIndex high, scale 1, y 0
      // Back cards: zIndex lower, scale smaller, y offset downwards and to the right/left?
      // Image shows:
      // Stack goes Top-Left to Bottom-Right visually?
      // Actually image shows:
      // Backmost card is smallest, top-leftest.
      // Frontmost card is largest, bottom-rightest (closest to viewer).
      // Wait, let's look at the image again.
      // Front card is fully visible. Behind it, shifted up and left, is the next card.
      // So the stack recedes into the background (Up and Left).

      const setCardState = (card: HTMLElement, index: number) => {
        // index 0 = front
        // index 1 = behind 0
        // index 2 = behind 1

        // Per image:
        // Front card is dominant.
        // Behind cards are shifted UP and LEFT, and scaled down slightly?
        // Or just shifted UP and LEFT.

        const xOffset = -35 * index;
        const yOffset = 30 * index;
        const scale = 1 - index * 0.05;
        const opacity = 1;
        const zIndex = totalCards - index;

        return {
          x: xOffset,
          y: yOffset,
          scale: scale,
          zIndex: zIndex,
          opacity: opacity,
          filter: index === 0 ? "brightness(1)" : "brightness(0.8)",
        };
      };

      // Set initial positions
      cards.forEach((card, i) => {
        gsap.set(card, setCardState(card, i));
      });

      // Animation Loop
      // We cycle the "visual" state.
      // The DOM order stays the same.
      // We just animate the properties of each element to match the "next" logical position.
      // Actually, for a continuous cycle, it's often easier to physically permute the array of properties
      // or modify the target values.

      let currentIndex = 0;

      const animateNext = () => {
        // The card at currentIndex is at position 0 (Front).
        // It needs to go to position N-1 (Back).
        // All other cards need to move forward (position i becomes i-1).

        const tl = gsap.timeline({
          onComplete: () => {
            // After animation, we wait a bit then trigger next
            gsap.delayedCall(3, animateNext);
          },
        });

        // Animate Front Card (Current) directly to the back
        // It floats OVER the others to reach the back position
        const frontCard = cards[currentIndex % totalCards];
        const backIndex = totalCards - 1;
        const backState = setCardState(frontCard, backIndex); // Target visual state for the back

        // 1. Move Front card to Back position visuals, but keep Z high so it passes over
        tl.to(
          frontCard,
          {
            x: backState.x,
            y: backState.y,
            scale: backState.scale,
            opacity: backState.opacity,
            filter: backState.filter,
            duration: 0.8,
            ease: "power2.inOut",
            zIndex: 0, // Keep it on top while moving
          },
          0,
        );

        // 2. Animate others forward (Index i -> Index i-1)
        for (let i = 1; i < totalCards; i++) {
          const cardIndex = (currentIndex + i) % totalCards;
          const card = cards[cardIndex];

          // New position is (i - 1)
          const targetState = setCardState(card, i - 1);

          tl.to(
            card,
            {
              ...targetState,
              duration: 0.8,
              ease: "power2.inOut",
            },
            0,
          );
        }

        // 3. After animation, effectively "drop" the old front card to the bottom of the stack
        tl.set(frontCard, {
          zIndex: 1, // Now it is physically at the back
        });

        currentIndex++;
      };

      // Start loop
      gsap.delayedCall(2, animateNext);
    }, containerRef);

    return () => ctx.revert();
  }, []);

  return (
    <section className={styles.section} ref={containerRef}>
      <div className={styles.maxContainer}>
        <div className={styles.sideLabel}>
          A FEW WORDS FROM
          <br />
          OUR CLIENTS
        </div>

        <div className={styles.header}>
          <h2 className={styles.title}>
            We start with truth, not hype. We teach your people to build. Then
            we orchestrate what works into an advantage.
          </h2>
        </div>

        <div className={styles.stackContainer}>
          {reviews.map((review, i) => (
            <div
              key={review.id}
              className={styles.card}
              ref={(el) => {
                if (el) cardsRef.current[i] = el;
              }}
            >
              <div className={styles.cardHeader}>
                <div className={styles.dots} />
                <span className={styles.headerTitle}>{review.headerCode}</span>
                <div className={styles.headerDecor}>::::</div>
              </div>
              <div className={styles.cardBody}>
                <p className={styles.quote}>{review.quote}</p>
                <div className={styles.cardFooter}>
                  <div className={styles.clientInfo}>
                    <span>{review.client},</span>
                    <span className={styles.company}>{review.company}</span>
                  </div>
                  <span className={styles.source}>{review.source}</span>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.counter}>
          <span>05</span>
          <span>/10</span>
        </div>
      </div>
    </section>
  );
}
