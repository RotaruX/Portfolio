import React, { useEffect, useRef, useState } from 'react';

export const SkillBar = ({ level }) => {
  const barRef = useRef(null);
  const [width, setWidth] = useState(0);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setTimeout(() => {
            setWidth(level);
          }, 200);
          observer.unobserve(entry.target);
        }
      },
      { threshold: 0.3 }
    );

    if (barRef.current) {
      observer.observe(barRef.current);
    }

    return () => {
      if (barRef.current) {
        observer.unobserve(barRef.current);
      }
    };
  }, [level]);

  return (
    <div className="skill-bar">
      <div
        ref={barRef}
        className="skill-progress"
        style={{ width: `${width}%` }}
      ></div>
    </div>
  );
};
