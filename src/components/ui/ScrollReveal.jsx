import React, { useEffect, useRef, useState } from 'react';

export const ScrollReveal = ({ children, className = '', threshold = 0.12, tag: Tag = 'div' }) => {
  const elementRef = useRef(null);
  const [isRevealed, setIsRevealed] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsRevealed(true);
          observer.unobserve(entry.target);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    if (elementRef.current) {
      observer.observe(elementRef.current);
    }

    return () => {
      if (elementRef.current) {
        observer.unobserve(elementRef.current);
      }
    };
  }, [threshold]);

  return (
    <Tag
      ref={elementRef}
      className={`${className} ${isRevealed ? 'revealed' : ''}`}
      data-scroll-reveal
    >
      {children}
    </Tag>
  );
};
