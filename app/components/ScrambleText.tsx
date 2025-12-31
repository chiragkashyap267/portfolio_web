"use client";

import { useEffect, useState } from "react";

const CHARS = "!<>-_\\/[]{}—=+*^?#________";

export default function ScrambleText({
  text,
  speed = 40,
}: {
  text: string;
  speed?: number;
}) {
  const [output, setOutput] = useState(text);

  useEffect(() => {
    let frame = 0;
    const letters = text.split("");
    let raf: number;

    const update = () => {
      frame++;
      setOutput(
        letters
          .map((char, i) => {
            if (i < frame / 2) return char;
            return CHARS[Math.floor(Math.random() * CHARS.length)];
          })
          .join("")
      );

      if (frame < letters.length * 2) {
        raf = window.setTimeout(update, speed);
      } else {
        setOutput(text);
      }
    };

    update();
    return () => clearTimeout(raf);
  }, [text, speed]);

  return <span>{output}</span>;
}
