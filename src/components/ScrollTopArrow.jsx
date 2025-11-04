import { useState, useEffect } from 'react';
import './scrollTopArrow.css';

export default function ScrollTopArrow() {
  const [visible, setVisible] = useState(false);

  const toggleVisibility = () => {
    if (window.scrollY > 100) {  // apare mult mai devreme
      setVisible(true);
    } else {
      setVisible(false);
    }
  };

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  return (
    <div className="scroll-top">
      {visible && (
        <button onClick={scrollToTop} className="arrow-btn">
          ↑
        </button>
      )}
    </div>
  );
}
