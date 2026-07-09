
import { useState, useEffect } from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle() {
  const [isDark, setIsDark] = useState(
    () => document.documentElement.classList.contains('dark')
  );

  function toggle() {
    const next = !isDark;
    setIsDark(next);
    if (next) {
      document.documentElement.classList.add('dark');
      localStorage.setItem('dptrace-theme', 'dark');
    } else {
      document.documentElement.classList.remove('dark');
      localStorage.setItem('dptrace-theme', 'light');
    }
  }

  return (
    <button
      onClick={toggle}
      className="btn-icon"
      title={isDark ? 'Switch to light' : 'Switch to dark'}
      style={{ border: 'none', background: 'transparent' }}
    >
      {isDark
        ? <Sun size={15} className="theme-toggle-icon" />
        : <Moon size={15} className="theme-toggle-icon" />
      }
    </button>
  );
}
