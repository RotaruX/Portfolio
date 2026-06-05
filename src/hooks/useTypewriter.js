import { useState, useEffect } from 'react';

export const useTypewriter = (strings, typingSpeed = 80, deletingSpeed = 35, pauseDuration = 2200) => {
  const [text, setText] = useState('');
  const [stringIndex, setStringIndex] = useState(0);
  const [charIndex, setCharIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    if (!strings || strings.length === 0) return;

    const currentString = strings[stringIndex];
    let timer;

    const handleType = () => {
      if (isDeleting) {
        setText(currentString.substring(0, charIndex - 1));
        setCharIndex((prev) => prev - 1);
      } else {
        setText(currentString.substring(0, charIndex + 1));
        setCharIndex((prev) => prev + 1);
      }
    };

    if (!isDeleting && charIndex === currentString.length) {
      // Pausa antes de borrar
      timer = setTimeout(() => {
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting && charIndex === 0) {
      // Siguiente frase
      setIsDeleting(false);
      setStringIndex((prev) => (prev + 1) % strings.length);
      timer = setTimeout(() => {}, 500);
    } else {
      const speed = isDeleting ? deletingSpeed : typingSpeed;
      timer = setTimeout(handleType, speed);
    }

    return () => clearTimeout(timer);
  }, [charIndex, isDeleting, stringIndex, strings, typingSpeed, deletingSpeed, pauseDuration]);

  return text;
};
