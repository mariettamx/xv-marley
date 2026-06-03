import { useEffect, useState } from "react";

const TARGET = new Date("2026-09-19T19:00:00").getTime();

function calc() {
  const diff = Math.max(0, TARGET - Date.now());
  return {
    days: Math.floor(diff / 86400000),
    hours: Math.floor((diff / 3600000) % 24),
    minutes: Math.floor((diff / 60000) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

export function Countdown() {
  const [t, setT] = useState(calc());
  useEffect(() => {
    const id = setInterval(() => setT(calc()), 1000);
    return () => clearInterval(id);
  }, []);

  const items = [
    { label: "Días", value: t.days },
    { label: "Horas", value: t.hours },
    { label: "Minutos", value: t.minutes },
    { label: "Segundos", value: t.seconds },
  ];

  return (
    <div className="grid grid-cols-4 gap-3 md:gap-6 max-w-2xl mx-auto">
      {items.map((it) => (
        <div key={it.label} className="relative group">
          <div className="absolute inset-0 bg-gradient-gold opacity-20 blur-xl rounded-2xl" />
          <div className="relative bg-card/60 backdrop-blur-md border border-primary/40 rounded-2xl px-2 py-4 md:px-4 md:py-6 text-center shadow-soft">
            <div className="font-display text-3xl md:text-6xl text-gradient-gold tabular-nums">
              {String(it.value).padStart(2, "0")}
            </div>
            <div className="mt-1 text-[10px] md:text-xs uppercase tracking-[0.2em] text-primary/80">
              {it.label}
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
