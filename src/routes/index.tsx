import { useEffect, useRef, useState } from "react";
import heroBg from "@/assets/versailles-hero.jpg";
import { Countdown } from "@/components/Countdown";
import { Sparkles } from "@/components/Sparkles";

import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: Index,
})

interface FormState {
  nombre: string;
  invitados: number;
}

export function Index() {
  const [formData, setFormData] = useState<FormState>({
    nombre: '',
    invitados: 0,
  });
  const [loading, setLoading] = useState<boolean>(false);
  const [enviado, setEnviado] = useState<boolean>(false);
  const [audioPlaying, setAudioPlaying] = useState<boolean>(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Reemplaza esto con la URL que copiaste de Google Apps Script
  const GOOGLE_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbx7OBmOKiwZwNBokAjmRJ2lrsWnbjxm42JPsONvHw58quaQdO9m_9oaejz_5ZeQzvJi/exec';
  const BACKGROUND_AUDIO_URL = 'https://drive.google.com/uc?export=download&id=190K7TOuaFltKYow3vW6zIxcVrJpLeEzA';

  useEffect(() => {
    const audio = new Audio(BACKGROUND_AUDIO_URL);
    audio.loop = true;
    audio.volume = 0.25;
    audio.preload = 'auto';
    audioRef.current = audio;

    const startAudio = async () => {
      if (!audioRef.current || audioPlaying) return;

      try {
        await audioRef.current.play();
        setAudioPlaying(true);
      } catch (error) {
        console.warn('No se pudo iniciar el audio de fondo:', error);
      }
    };

    window.addEventListener('pointerdown', startAudio, { once: true });
    window.addEventListener('keydown', startAudio, { once: true });

    return () => {
      audio.pause();
      audio.src = '';
      window.removeEventListener('pointerdown', startAudio);
      window.removeEventListener('keydown', startAudio);
    };
  }, [audioPlaying]);

  const toggleAudio = async () => {
    if (!audioRef.current) return;

    if (audioPlaying) {
      audioRef.current.pause();
      setAudioPlaying(false);
      return;
    }

    try {
      await audioRef.current.play();
      setAudioPlaying(true);
    } catch (error) {
      console.warn('No se pudo iniciar el audio de fondo:', error);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };
const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    try {
      // Enviamos los datos como un POST tradicional en formato texto para evitar problemas de CORS
      const response = await fetch(GOOGLE_SCRIPT_URL, {
        method: 'POST',
        mode: 'no-cors', // Evita bloqueos de seguridad del navegador
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      // Nota: Con 'no-cors' la respuesta siempre vuelve vacía u 'opaque', 
      // pero si no da error en el catch, significa que llegó a Google.
      setEnviado(true);
      setFormData({ nombre: '', invitados: 0 }); // Limpiar formulario
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      alert('Hubo un fallo al enviar los datos.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-background text-foreground overflow-x-hidden">
      {/* HERO */}
      <section className="hero relative min-h-screen flex items-center justify-center px-4">
        <img
          src={heroBg}
          alt="Salón de los Espejos"
          className="absolute inset-0 w-full h-full object-cover"
          width={1920}
          height={1280}
        />
        <div className="absolute inset-0" style={{ background: "var(--gradient-overlay)" }} />
        <div className="absolute inset-0 hero-overlay bg-gradient-to-b from-primary/10 via-transparent to-background" />

        {/* lens flares */}
        <div className="pointer-events-none absolute -top-20 -left-20 w-96 h-96 rounded-full bg-rose-gold/30 blur-[120px] animate-flare" />
        <div className="pointer-events-none absolute top-40 right-0 w-[28rem] h-[28rem] rounded-full bg-champagne/25 blur-[140px] animate-flare" style={{ animationDelay: "2s" }} />
        <div className="pointer-events-none absolute bottom-0 left-1/3 w-80 h-80 rounded-full bg-accent/20 blur-[100px] animate-flare" style={{ animationDelay: "1s" }} />

        <Sparkles count={50} />

        <div className="relative z-10 text-center max-w-3xl mx-auto py-20">
          {/* <p className="font-script text-3xl md:text-5xl text-gradient-gold animate-float">
            Mis
          </p> */}
          <h1 className="font-great-vibes text-[5rem] md:text-[9rem] leading-[0.8] md:pb-3 text-gradient-gold drop-shadow-[0_4px_30px_oklch(0.78_0.13_45/0.6)]">
            Marley Sophia
          </h1>
          <p className="font-cormorant-garamond text-3xl md:text-5xl text-gradient-gold -mt-2 animate-float" style={{ animationDelay: "1s" }}>
            XV Años
          </p>

          <div className="my-6 flex items-center justify-center gap-4">
            <span className="h-px w-16 bg-gradient-to-r from-transparent to-primary" />
            <span className="text-primary text-xl tracking-[0.4em] uppercase">19 · Septiembre · 2026</span>
            <span className="h-px w-16 bg-gradient-to-l from-transparent to-primary" />
          </div>

          <div className="mt-12">
            <Countdown />
          </div>

          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <a
              href="#rsvp"
              className="inline-block px-10 py-4 rounded-full bg-gradient-gold text-primary-foreground font-display tracking-[0.3em] uppercase text-sm shadow-glow hover:scale-105 transition-transform"
            >
              Confirmar Asistencia
            </a>
          </div>
        </div>
      </section>

      {/* INVITATION */}
      <section className="relative py-24 px-4 overflow-hidden">
        <Sparkles count={20} />
        <div className="pointer-events-none absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[40rem] h-[40rem] rounded-full bg-rose-gold/10 blur-[120px]" />
        <div className="relative max-w-2xl mx-auto text-center">
          <p className="font-script text-4xl md:text-5xl text-gradient-gold">Con la bendición de Dios</p>
          <p className="mt-8 text-champagne/80 text-lg leading-relaxed">
            y la compañía de mis padres
          </p>
          <p className="mt-3 font-display text-2xl md:text-3xl text-primary">
            José Sánchez &nbsp;·&nbsp; Emily Ibarra
          </p>
          <p className="mt-8 text-champagne/80 text-lg leading-relaxed">
            tengo el honor de invitarte a celebrar mis
            <span className="block mt-2 font-display text-3xl text-gradient-gold">Quince Años</span>
          </p>
          <div className="mt-10 mx-auto w-24 h-px bg-gradient-to-r from-transparent via-primary to-transparent" />
        </div>
      </section>

      {/* DETAILS */}
      <section className="relative py-24 px-4">
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {[
            { title: "Misa", time: "4:00 PM", place: "Parroquia Cruz del Apostolado", detail: "Esq. de la Hda del Yugo 1090, Villa de San Miguel" },
            { title: "Recepción", time: "7:30 PM", place: "Los Angeles Eventos", detail: "Av. Los Angeles 1000, Mercado de Abastos Estrella, 66482 San Nicolás de los Garza, N.L." },
            { title: "Código", time: "Formal", place: "Reservamos el color rosa para la quinceañera", detail: "" },
          ].map((c) => (
            <div key={c.title} className="relative group">
              <div className="absolute inset-0 bg-gradient-gold opacity-0 group-hover:opacity-20 blur-xl rounded-2xl transition-opacity" />
              <div className="relative h-full bg-card/40 backdrop-blur-md border border-primary/30 rounded-2xl p-8 text-center shadow-soft">
                <p className="font-script text-3xl text-gradient-gold">{c.title}</p>
                <p className="mt-4 font-display text-2xl text-champagne">{c.time}</p>
                <div className="my-4 mx-auto w-12 h-px bg-primary/50" />
                <p className="text-primary uppercase tracking-widest text-sm">{c.place}</p>
                <p className="mt-2 text-muted-foreground text-sm">{c.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* RSVP */}
      <section id="rsvp" className="relative py-24 px-4">
        <Sparkles count={25} />
        <div className="relative max-w-xl mx-auto text-center bg-card/40 backdrop-blur-md border border-primary/30 rounded-3xl p-10 shadow-glow">
          <p className="font-script text-4xl text-gradient-gold">Confirma tu asistencia</p>
          <p className="mt-4 text-champagne/80">
            Tu presencia es el mejor regalo. Por favor confirma antes del 1 de Septiembre.
          </p>
          {enviado ? (
            <p style={{ color: 'white' }}>¡Confirmacion enviada exitosamente!</p>
          ) : (
            <form onSubmit={handleSubmit} className="mt-8 space-y-4 text-left">
              <input
                className="w-full bg-background/60 border border-primary/40 rounded-full px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                placeholder="Tu nombre"
                name="nombre"
                value={formData.nombre}
                onChange={handleChange}
              />
              <input
                className="w-full bg-background/60 border border-primary/40 rounded-full px-5 py-3 text-foreground placeholder:text-muted-foreground focus:outline-none focus:border-primary"
                placeholder="Número de invitados"
                name="invitados"
                value={formData.invitados}
                onChange={handleChange}
                type="number"
              />
                <button type="submit" disabled={loading}>
                  {loading ? 'Enviando...' : 'Enviar Confirmacion'}
                </button>
            </form>
          )}
        </div>
      </section>

      {/* FOOTER */}
      <footer className="relative py-12 px-4 text-center border-t border-primary/20">
        <p className="font-script text-3xl text-gradient-gold">Marley</p>
        <p className="mt-2 text-muted-foreground text-sm tracking-[0.3em] uppercase">
          XV Años · 19.09.2026
        </p>
      </footer>

      <div className="flex justify-center pb-8">
        <button
          type="button"
          onClick={toggleAudio}
          className="rounded-full border border-primary/30 bg-background/70 px-3 py-1.5 text-[10px] uppercase tracking-[0.2em] text-primary backdrop-blur transition hover:scale-105"
        >
          {audioPlaying ? '🔊 On' : '🔈 Sonido'}
        </button>
      </div>
    </main>
  );
}
