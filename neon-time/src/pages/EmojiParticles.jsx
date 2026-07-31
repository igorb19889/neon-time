import React, { useEffect, useState } from "react";
import './EmojiParticles.css';

const emojis = ["🎈", "✨", "🌈", "🎉", "💖", "🎭"];

export default function EmojiParticles() {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    const newParticles = Array.from({length: 20}).map(() => ({
      emoji: emojis[Math.floor(Math.random() * emojis.length)],
      left: Math.random() * 100,
      duration: 5 + Math.random() * 10, // sec
      size: 24 + Math.random() * 24,
      delay: Math.random() * 5,
    }));
    setParticles(newParticles);
  }, []);

  return (
    <div className="emoji-particles">
      {particles.map((p, idx) => (
        <span
          key={idx}
          className="emoji"
          style={{
            left: `${p.left}%`,
            animationDuration: `${p.duration}s`,
            fontSize: `${p.size}px`,
            animationDelay: `${p.delay}s`,
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}
