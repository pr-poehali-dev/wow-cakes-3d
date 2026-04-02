import { useRef } from "react";
import Icon from "@/components/ui/icon";
import { C, CL, CAKE_IMAGES, NAV_ITEMS } from "./constants";

interface HeroNavProps {
  activeSection: string;
  mousePos: { x: number; y: number };
  cursorRing: { x: number; y: number };
  isHovering: boolean;
  rotateX: number;
  rotateY: number;
  menuOpen: boolean;
  heroRef: React.RefObject<HTMLDivElement>;
  onHeroMouseMove: (e: React.MouseEvent<HTMLDivElement>) => void;
  scrollTo: (id: string) => void;
  setMenuOpen: (open: boolean) => void;
}

export default function HeroNav({
  activeSection,
  mousePos,
  cursorRing,
  isHovering,
  rotateX,
  rotateY,
  menuOpen,
  heroRef,
  onHeroMouseMove,
  scrollTo,
  setMenuOpen,
}: HeroNavProps) {
  return (
    <>
      {/* Custom cursor */}
      <div className={`custom-cursor ${isHovering ? "hover" : ""}`} style={{ left: mousePos.x, top: mousePos.y }} />
      <div className={`custom-cursor-ring ${isHovering ? "hover" : ""}`} style={{ left: cursorRing.x, top: cursorRing.y }} />

      {/* NAV */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(250,247,244,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(139,0,0,0.07)" }}>
        <button onClick={() => scrollTo("home")}
          className="font-cormorant text-xl tracking-[0.2em] font-light"
          style={{ color: C }}>
          WOW CAKES
        </button>
        <div className="hidden md:flex items-center gap-7">
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className={`nav-link ${activeSection === item.id ? "!text-[#8B0000]" : ""}`}>
              {item.label}
            </button>
          ))}
        </div>
        <button onClick={() => scrollTo("contact")} className="hidden md:block btn-gold text-[10px]">
          Заказать торт
        </button>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={20} style={{ color: C }} />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 flex flex-col items-center justify-center gap-8"
          style={{ background: "rgba(250,247,244,0.98)" }}>
          {NAV_ITEMS.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="font-cormorant text-3xl tracking-wider gold-text">{item.label}</button>
          ))}
        </div>
      )}

      {/* HERO */}
      <section id="home" ref={heroRef} onMouseMove={onHeroMouseMove}
        className="relative min-h-screen flex items-center overflow-hidden noise-overlay"
        style={{ background: "#FAF7F4" }}>

        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50vw] h-[70vh] rounded-full opacity-[0.04]"
            style={{ background: `radial-gradient(ellipse, ${C} 0%, transparent 70%)`, filter: "blur(80px)" }} />
          <div className="absolute bottom-0 left-0 w-[30vw] h-[40vh] rounded-full opacity-[0.03]"
            style={{ background: `radial-gradient(ellipse, ${C} 0%, transparent 70%)`, filter: "blur(60px)" }} />
          <div className="absolute right-0 top-0 bottom-0 w-px opacity-20"
            style={{ background: `linear-gradient(to bottom, transparent, ${C}, transparent)` }} />
        </div>

        {[...Array(8)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 2 === 0 ? C : CL,
              left: `${12 + i * 10}%`,
              bottom: `${15 + (i % 3) * 20}%`,
              animation: `particle-rise ${4 + i * 0.5}s ease-out infinite`,
              animationDelay: `${i * 0.8}s`,
              opacity: 0.35,
            }} />
        ))}

        <div className="absolute right-0 md:right-0 top-0 bottom-0 w-[45vw] max-w-[520px] hidden md:block"
          style={{
            transform: `perspective(1200px) rotateX(${rotateX}deg) rotateY(${rotateY}deg)`,
            transition: "transform 0.12s ease",
          }}>
          <img src={CAKE_IMAGES[0].url} alt="Торт"
            className="w-full h-full object-cover float-anim"
            style={{ filter: "saturate(0.9) contrast(1.05)" }} />
          <div className="absolute inset-0"
            style={{ background: "linear-gradient(to right, #FAF7F4 0%, transparent 30%, transparent 100%)" }} />
        </div>

        <div className="relative z-10 px-8 md:px-16 lg:px-24 max-w-2xl">
          <p className="font-montserrat text-[10px] tracking-[0.5em] mb-5 animate-fade-in opacity-0"
            style={{ color: C, animationDelay: "0.1s" }}>
            КОНДИТЕРСКОЕ ИСКУССТВО · ПЕНЗА
          </p>
          <h1 className="font-cormorant mb-8 animate-fade-in opacity-0"
            style={{ fontSize: "clamp(3.8rem, 8vw, 7rem)", fontWeight: 300, lineHeight: 0.92, color: "#1A1A1A", animationDelay: "0.3s" }}>
            <span className="block">Торты,</span>
            <span className="block gold-text italic">которые</span>
            <span className="block">удивляют</span>
          </h1>
          <p className="font-montserrat text-sm mb-10 max-w-sm leading-relaxed animate-fade-in opacity-0"
            style={{ color: "#7A7A7A", fontWeight: 300, animationDelay: "0.6s" }}>
            Мастер кондитер <span style={{ color: C }}>Поля</span> создаёт авторские торты в Пензе.
            Каждое изделие — произведение искусства с безупречным вкусом.
          </p>
          <div className="flex flex-wrap gap-3 animate-fade-in opacity-0" style={{ animationDelay: "0.9s" }}>
            <button onClick={() => scrollTo("portfolio")} className="btn-gold">Смотреть работы</button>
            <button onClick={() => scrollTo("contact")} className="btn-ghost-gold">Заказать торт</button>
          </div>
          <div className="flex gap-10 mt-14 animate-fade-in opacity-0" style={{ animationDelay: "1.1s" }}>
            {[["200+", "Тортов создано"], ["5 лет", "Опыта"], ["100%", "Довольных"]].map(([num, label]) => (
              <div key={label}>
                <div className="stat-number">{num}</div>
                <div className="font-montserrat text-[9px] tracking-widest mt-1 uppercase" style={{ color: "#B0A8A0" }}>{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0"
          style={{ animationDelay: "1.4s" }}>
          <span className="font-montserrat text-[8px] tracking-widest uppercase" style={{ color: "#B0A8A0" }}>Листать</span>
          <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, transparent, ${C})` }} />
        </div>
      </section>
    </>
  );
}
