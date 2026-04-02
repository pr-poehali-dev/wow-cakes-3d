import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const C = "#8B0000";
const CL = "#B22222";
const CD = "#5C0000";

const CAKE_IMAGES = [
  { url: "https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/1791ea73-6041-45a8-9b01-0498ee4bf778.jpg", title: "Свадебный шедевр", tag: "Свадебные торты", price: "от 8 000 ₽/кг" },
  { url: "https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/903a8f99-23c0-41dd-a83e-6503c7a12fdd.jpg", title: "Цветочная фантазия", tag: "Авторские торты", price: "от 5 000 ₽/кг" },
  { url: "https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/4d971335-9420-4fc4-ac77-fa14663cebf6.jpg", title: "Шоколадный гламур", tag: "Праздничные торты", price: "от 4 500 ₽/кг" },
];

const SERVICES = [
  { icon: "Crown", title: "Свадебные торты", desc: "Многоярусные шедевры для вашего главного дня. Ручная работа, живые цветы, золотые детали.", price: "от 8 000 ₽/кг" },
  { icon: "Sparkles", title: "Авторские торты", desc: "Уникальные дизайны под ваш запрос. 3D-фигуры, росписи, вафельная печать.", price: "от 5 000 ₽/кг" },
  { icon: "Gift", title: "Детские торты", desc: "Яркие, безопасные, незабываемые. Любимые персонажи в сладком воплощении.", price: "от 4 000 ₽/кг" },
  { icon: "Star", title: "Корпоративные заказы", desc: "Торты с логотипом, брендированные десерты для мероприятий любого масштаба.", price: "от 6 000 ₽/кг" },
  { icon: "Heart", title: "Муссовые торты", desc: "Зеркальная глазурь, воздушные текстуры, изысканные вкусовые сочетания.", price: "от 3 500 ₽/кг" },
  { icon: "Camera", title: "3D-торты", desc: "Реалистичные скульптуры из сахара. Машины, сумки, архитектура — всё возможно.", price: "от 10 000 ₽/кг" },
];

const REVIEWS = [
  { name: "Анастасия К.", text: "Торт на свадьбу был просто невероятным! Все гости не могли поверить, что это съедобно. Поля — настоящий художник!", stars: 5, event: "Свадьба" },
  { name: "Елена М.", text: "Заказывала 3D-торт в форме сумки Chanel — точь-в-точь как настоящая! Вкус тоже потрясающий.", stars: 5, event: "День рождения" },
  { name: "Ирина В.", text: "Уже третий год подряд заказываю у Поли торты на детские праздники. Дети в восторге, я тоже!", stars: 5, event: "День рождения" },
  { name: "Мария Д.", text: "Корпоративный торт с нашим логотипом был идеален. Коллеги были поражены качеством работы.", stars: 5, event: "Корпоратив" },
];

export default function Index() {
  const [activeSection, setActiveSection] = useState("home");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [cursorRing, setCursorRing] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);
  const [selected3D, setSelected3D] = useState(0);
  const [rotateX, setRotateX] = useState(0);
  const [rotateY, setRotateY] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef({ x: 0, y: 0 });
  const animFrameRef = useRef<number>();

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      setMousePos({ x: e.clientX, y: e.clientY });
      const target = e.target as HTMLElement;
      setIsHovering(target.closest("a,button,.portfolio-card,.review-card") !== null);
    };
    window.addEventListener("mousemove", onMove);
    return () => window.removeEventListener("mousemove", onMove);
  }, []);

  useEffect(() => {
    const animate = () => {
      ringRef.current.x += (mousePos.x - ringRef.current.x) * 0.12;
      ringRef.current.y += (mousePos.y - ringRef.current.y) * 0.12;
      setCursorRing({ x: ringRef.current.x, y: ringRef.current.y });
      animFrameRef.current = requestAnimationFrame(animate);
    };
    animFrameRef.current = requestAnimationFrame(animate);
    return () => cancelAnimationFrame(animFrameRef.current!);
  }, [mousePos]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const sections = document.querySelectorAll("section[id]");
    const observer = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) setActiveSection(e.target.id); }),
      { threshold: 0.35 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleHeroMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 6;
    const y = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -4;
    setRotateY(x); setRotateX(y);
  };

  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
    setMenuOpen(false);
  };

  const navItems = [
    { id: "home", label: "Главная" },
    { id: "portfolio", label: "Портфолио" },
    { id: "services", label: "Услуги" },
    { id: "macarons", label: "Макарон" },
    { id: "masterclass", label: "Обучение" },
    { id: "about", label: "О мастере" },
    { id: "reviews", label: "Отзывы" },
    { id: "contact", label: "Заказ" },
  ];

  const inputStyle = {
    background: "#fff",
    border: "1px solid rgba(139,0,0,0.2)",
    color: "#1A1A1A",
  };

  const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(139,0,0,0.6)";
    e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139,0,0,0.06)";
  };
  const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    e.currentTarget.style.borderColor = "rgba(139,0,0,0.2)";
    e.currentTarget.style.boxShadow = "none";
  };

  return (
    <div style={{ background: "#FAF7F4", color: "#1A1A1A" }} className="min-h-screen overflow-x-hidden">
      {/* Custom cursor */}
      <div className={`custom-cursor ${isHovering ? "hover" : ""}`} style={{ left: mousePos.x, top: mousePos.y }} />
      <div className={`custom-cursor-ring ${isHovering ? "hover" : ""}`} style={{ left: cursorRing.x, top: cursorRing.y }} />

      {/* ===== NAV ===== */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-4"
        style={{ background: "rgba(250,247,244,0.92)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(139,0,0,0.07)" }}>
        <button onClick={() => scrollTo("home")}
          className="font-cormorant text-xl tracking-[0.2em] font-light"
          style={{ color: C }}>
          WOW CAKES
        </button>
        <div className="hidden md:flex items-center gap-7">
          {navItems.map((item) => (
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
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="font-cormorant text-3xl tracking-wider gold-text">{item.label}</button>
          ))}
        </div>
      )}

      {/* ===== HERO ===== */}
      <section id="home" ref={heroRef} onMouseMove={handleHeroMouse}
        className="relative min-h-screen flex items-center overflow-hidden noise-overlay"
        style={{ background: "#FAF7F4" }}>

        {/* Subtle ambient */}
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[50vw] h-[70vh] rounded-full opacity-[0.04]"
            style={{ background: `radial-gradient(ellipse, ${C} 0%, transparent 70%)`, filter: "blur(80px)" }} />
          <div className="absolute bottom-0 left-0 w-[30vw] h-[40vh] rounded-full opacity-[0.03]"
            style={{ background: `radial-gradient(ellipse, ${C} 0%, transparent 70%)`, filter: "blur(60px)" }} />
          {/* Minimal grid lines */}
          <div className="absolute right-0 top-0 bottom-0 w-px opacity-20"
            style={{ background: `linear-gradient(to bottom, transparent, ${C}, transparent)` }} />
        </div>

        {/* Floating particles */}
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

        {/* 3D Hero image */}
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

        {/* Hero text */}
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

        {/* Scroll */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0"
          style={{ animationDelay: "1.4s" }}>
          <span className="font-montserrat text-[8px] tracking-widest uppercase" style={{ color: "#B0A8A0" }}>Листать</span>
          <div className="w-px h-10" style={{ background: `linear-gradient(to bottom, transparent, ${C})` }} />
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" className="py-24 px-8 md:px-16" style={{ background: "#F0EBE4" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-14 gap-6">
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.4em] mb-4 uppercase" style={{ color: C }}>Наши работы</p>
              <h2 className="font-cormorant" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 300, color: "#1A1A1A" }}>
                Галерея<br /><em className="gold-text">шедевров</em>
              </h2>
            </div>
            <p className="font-montserrat text-sm max-w-xs leading-relaxed" style={{ color: "#7A7A7A", fontWeight: 300 }}>
              Каждый торт создаётся вручную с вниманием к деталям
            </p>
          </div>

          <div className="reveal grid md:grid-cols-2 gap-6 mb-6">
            <div className="portfolio-card gold-glow aspect-[4/5] relative"
              style={{ transition: "transform 0.15s ease" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 14;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -10;
                e.currentTarget.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg)`;
              }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(900px) rotateX(0) rotateY(0)"; }}>
              <img src={CAKE_IMAGES[selected3D].url} alt={CAKE_IMAGES[selected3D].title}
                className="w-full h-full object-cover" />
              <div className="overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-7 z-10">
                <p className="font-montserrat text-[9px] tracking-[0.3em] mb-2 uppercase" style={{ color: "#F0EBE4" }}>{CAKE_IMAGES[selected3D].tag}</p>
                <h3 className="font-cormorant text-2xl text-white mb-1">{CAKE_IMAGES[selected3D].title}</h3>
                <p className="font-montserrat text-sm" style={{ color: "#F0C0C0" }}>{CAKE_IMAGES[selected3D].price}</p>
              </div>
              <div className="absolute top-4 right-4 px-3 py-1 z-10"
                style={{ background: "rgba(139,0,0,0.75)", border: "1px solid rgba(255,255,255,0.15)" }}>
                <span className="font-montserrat text-[8px] tracking-widest text-white uppercase">3D просмотр</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {CAKE_IMAGES.map((cake, i) => (
                <div key={i}
                  className={`portfolio-card flex-1 relative cursor-pointer ${selected3D === i ? "" : ""}`}
                  style={{ outline: selected3D === i ? `1px solid ${C}` : "none" }}
                  onClick={() => setSelected3D(i)}>
                  <img src={cake.url} alt={cake.title} className="w-full h-full object-cover" />
                  <div className="overlay" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <p className="font-montserrat text-[8px] tracking-widest uppercase mb-1" style={{ color: "#F0C0C0" }}>{cake.tag}</p>
                    <p className="font-cormorant text-lg text-white">{cake.title}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="reveal text-center pt-2">
            <button onClick={() => scrollTo("contact")} className="btn-ghost-gold">Заказать похожий торт</button>
          </div>
        </div>
      </section>

      <div className="gold-line mx-16 reveal" />

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-24 px-8 md:px-16" style={{ background: "#FAF7F4" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-14">
            <p className="font-montserrat text-[10px] tracking-[0.4em] mb-4 uppercase" style={{ color: C }}>Что мы делаем</p>
            <h2 className="font-cormorant" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 300, color: "#1A1A1A" }}>
              Услуги и <em className="gold-text">цены</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px" style={{ background: "rgba(139,0,0,0.08)" }}>
            {SERVICES.map((s, i) => (
              <div key={i} className="reveal p-8 group transition-all duration-400 relative overflow-hidden"
                style={{ background: "#FAF7F4", transitionDelay: `${i * 0.04}s` }}>
                <div className="absolute top-0 left-0 w-0 h-px group-hover:w-full transition-all duration-500"
                  style={{ background: C }} />
                <div className="mb-5">
                  <div className="w-10 h-10 flex items-center justify-center border transition-colors"
                    style={{ borderColor: "rgba(139,0,0,0.15)" }}>
                    <Icon name={s.icon} fallback="Star" size={18} style={{ color: C }} />
                  </div>
                </div>
                <h3 className="font-cormorant text-xl mb-3 transition-colors group-hover:text-[#8B0000]"
                  style={{ color: "#1A1A1A", fontWeight: 400 }}>{s.title}</h3>
                <p className="font-montserrat text-xs leading-relaxed mb-5"
                  style={{ color: "#7A7A7A", fontWeight: 300 }}>{s.desc}</p>
                <p className="font-montserrat text-sm font-medium" style={{ color: C }}>{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-line mx-16 reveal" />

      {/* ===== MACARONS ===== */}
      <section id="macarons" className="py-24 px-8 md:px-16" style={{ background: "#F0EBE4" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-14">
            <p className="font-montserrat text-[10px] tracking-[0.4em] mb-4 uppercase" style={{ color: C }}>Авторские пирожные</p>
            <h2 className="font-cormorant" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 300, color: "#1A1A1A" }}>
              Макарон <em className="gold-text">ручной работы</em>
            </h2>
            <p className="font-montserrat text-sm mt-3 max-w-lg mx-auto leading-relaxed"
              style={{ color: "#7A7A7A", fontWeight: 300 }}>
              Французские пирожные с авторскими начинками. Нежные, хрустящие, тающие во рту.
            </p>
          </div>

          {/* 3D Viewer */}
          <div className="reveal grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <div className="relative aspect-square overflow-hidden gold-glow"
                style={{ transition: "transform 0.15s ease" }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 18;
                  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -13;
                  e.currentTarget.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.01)`;
                }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)"; }}>
                <img src="https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/264e6c7c-aa9a-4899-b1a2-7e2315e63a31.jpg"
                  alt="Макарон" className="w-full h-full object-cover" />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(139,0,0,0.15) 0%, transparent 50%)" }} />
                <div className="absolute top-4 left-4 px-3 py-1"
                  style={{ background: "rgba(139,0,0,0.8)", border: "1px solid rgba(255,255,255,0.15)" }}>
                  <span className="font-montserrat text-[8px] tracking-widest text-white uppercase">3D просмотр</span>
                </div>
                <div className="absolute bottom-4 left-4 right-4 flex flex-wrap gap-2">
                  {["Малина", "Фисташка", "Шоколад", "Лаванда", "Карамель", "Ваниль"].map((f) => (
                    <span key={f} className="font-montserrat text-[8px] tracking-wider uppercase px-2 py-1"
                      style={{ background: "rgba(250,247,244,0.85)", color: C, border: `1px solid rgba(139,0,0,0.2)` }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            <div>
              <p className="font-montserrat text-[10px] tracking-[0.3em] uppercase mb-5" style={{ color: C }}>6 вкусов сезона</p>
              <h3 className="font-cormorant mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 300, color: "#1A1A1A" }}>
                Каждый — маленький<br /><em className="gold-text">шедевр</em>
              </h3>
              <div className="space-y-4 mb-8">
                {[
                  { flavor: "Малина & Роза", desc: "Нежный ганаш из малины с лепестками роз", color: C },
                  { flavor: "Фисташка & Бурбон", desc: "Итальянская фисташковая паста, нотки ванили", color: "#4A6741" },
                  { flavor: "Тёмный шоколад", desc: "Горький Valrhona 72%, морская соль", color: "#3D2B1F" },
                  { flavor: "Лаванда & Мёд", desc: "Прованская лаванда, цветочный мёд Алтая", color: "#6B5F8A" },
                ].map((item) => (
                  <div key={item.flavor} className="flex items-start gap-4 group">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-transform group-hover:scale-125"
                      style={{ background: item.color }} />
                    <div>
                      <p className="font-montserrat text-sm font-medium" style={{ color: "#1A1A1A" }}>{item.flavor}</p>
                      <p className="font-montserrat text-xs mt-0.5" style={{ color: "#7A7A7A", fontWeight: 300 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <button onClick={() => document.getElementById("macaron-boxes")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-ghost-gold">
                Выбрать бокс
              </button>
            </div>
          </div>

          {/* BOX CATALOG */}
          <div id="macaron-boxes">
            <div className="reveal text-center mb-10">
              <p className="font-montserrat text-[10px] tracking-[0.4em] mb-3 uppercase" style={{ color: C }}>Каталог боксов</p>
              <h3 className="font-cormorant" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300, color: "#1A1A1A" }}>
                Готовые <em className="gold-text">подарочные боксы</em>
              </h3>
            </div>
            <div className="reveal grid md:grid-cols-3 gap-5">
              {[
                { count: 6, name: "Мини-бокс", price: "890 ₽", desc: "Идеально для знакомства с вкусами. Элегантная коробочка с 6 пирожными на выбор.", flavors: "3–4 вкуса", tag: "Знакомство", popular: false },
                { count: 8, name: "Классик", price: "1 190 ₽", desc: "Самый популярный формат. Разнообразие вкусов, красивое оформление, лента.", flavors: "4–6 вкусов", tag: "Хит продаж", popular: true },
                { count: 12, name: "Люкс-бокс", price: "1 690 ₽", desc: "Премиальный подарок. Весь сезонный ассортимент в одной коробке. Бархатная упаковка.", flavors: "6–8 вкусов", tag: "Премиум", popular: false },
              ].map((box) => (
                <div key={box.count}
                  className="relative overflow-hidden group transition-all duration-400"
                  style={{
                    background: box.popular ? "#fff" : "#FAF7F4",
                    border: box.popular ? `1px solid ${C}` : "1px solid rgba(139,0,0,0.12)",
                    boxShadow: box.popular ? `0 4px 24px rgba(139,0,0,0.1)` : "none",
                    transition: "transform 0.15s ease, box-shadow 0.3s ease",
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 8;
                    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -6;
                    e.currentTarget.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateZ(6px)`;
                  }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateZ(0)"; }}>
                  <div className="absolute top-0 left-0 w-0 h-0.5 group-hover:w-full transition-all duration-500"
                    style={{ background: C }} />

                  {box.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1" style={{ background: C }}>
                      <span className="font-montserrat text-[8px] tracking-widest text-white uppercase">{box.tag}</span>
                    </div>
                  )}

                  <div className="p-7">
                    <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                      <img src="https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/083e5456-bb15-4027-ba51-dd9edd1c1922.jpg"
                        alt={`Бокс ${box.count}`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105" />
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(26,5,5,0.75) 0%, transparent 55%)" }} />
                      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 flex items-baseline gap-1">
                        <span className="font-cormorant text-5xl font-light text-white">{box.count}</span>
                        <span className="font-montserrat text-xs tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.6)" }}>шт</span>
                      </div>
                    </div>

                    <div className="flex items-center justify-between mb-1">
                      <h4 className="font-cormorant text-xl transition-colors group-hover:text-[#8B0000]"
                        style={{ color: "#1A1A1A", fontWeight: 400 }}>{box.name}</h4>
                      {!box.popular && (
                        <span className="font-montserrat text-[8px] tracking-widest uppercase px-2 py-0.5"
                          style={{ color: C, border: `1px solid rgba(139,0,0,0.2)` }}>{box.tag}</span>
                      )}
                    </div>
                    <p className="font-montserrat text-[9px] tracking-widest uppercase mb-3" style={{ color: CL }}>{box.flavors}</p>
                    <p className="font-montserrat text-xs leading-relaxed mb-5" style={{ color: "#7A7A7A", fontWeight: 300 }}>{box.desc}</p>
                    <div className="flex items-center justify-between">
                      <span className="font-cormorant text-3xl font-light" style={{ color: C }}>{box.price}</span>
                      <button className="btn-ghost-gold py-2 px-4 text-[9px]">Заказать</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            <div className="reveal text-center mt-6">
              <p className="font-montserrat text-xs" style={{ color: "#B0A8A0", fontWeight: 300 }}>
                Индивидуальная сборка · Доставка по Пензе · Минимальный заказ 6 шт.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-line mx-16 reveal" />

      {/* ===== MASTERCLASS ===== */}
      <section id="masterclass" className="py-24 px-8 md:px-16" style={{ background: "#FAF7F4" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-start">
          <div>
            <p className="reveal font-montserrat text-[10px] tracking-[0.4em] mb-5 uppercase" style={{ color: C }}>Мастер-классы</p>
            <h2 className="reveal font-cormorant mb-6" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 300, color: "#1A1A1A" }}>
              Научись готовить<br /><em className="gold-text">макарон</em>
            </h2>
            <p className="reveal font-montserrat text-sm leading-relaxed mb-8" style={{ color: "#7A7A7A", fontWeight: 300 }}>
              Поля лично проведёт тебя от теории до готового пирожного.
              Узнаешь все секреты идеальных «ножек», правильный ганаш и авторские начинки.
            </p>

            <div className="reveal space-y-4 mb-10">
              {[
                { step: "01", title: "Теория и ингредиенты", desc: "Разбираем миндальную муку, меренгу, температурный режим" },
                { step: "02", title: "Замес и отсадка", desc: "Техника макаронажа, работа с кондитерским мешком" },
                { step: "03", title: "Выпечка и сборка", desc: "Контроль духовки, правильная склейка, начинки" },
                { step: "04", title: "Декор и упаковка", desc: "Роспись, посыпки, оформление в подарочный бокс" },
              ].map((item) => (
                <div key={item.step} className="flex gap-5 items-start group">
                  <span className="font-cormorant text-2xl font-light flex-shrink-0 mt-0.5 transition-colors group-hover:text-[#8B0000]"
                    style={{ color: "rgba(139,0,0,0.25)" }}>{item.step}</span>
                  <div>
                    <p className="font-montserrat text-sm font-medium" style={{ color: "#1A1A1A" }}>{item.title}</p>
                    <p className="font-montserrat text-xs mt-0.5" style={{ color: "#7A7A7A", fontWeight: 300 }}>{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal grid grid-cols-3 gap-3 mb-8">
              {[
                { format: "Мини-группа", count: "до 4 чел", price: "3 500 ₽" },
                { format: "Группа", count: "до 8 чел", price: "2 800 ₽" },
                { format: "Онлайн", count: "без лимита", price: "1 500 ₽" },
              ].map((f) => (
                <div key={f.format} className="text-center p-4 transition-colors"
                  style={{ background: "#fff", border: "1px solid rgba(139,0,0,0.1)" }}>
                  <p className="font-montserrat text-[9px] tracking-widest uppercase mb-1" style={{ color: C }}>{f.format}</p>
                  <p className="font-montserrat text-[10px] mb-2" style={{ color: "#7A7A7A", fontWeight: 300 }}>{f.count}</p>
                  <p className="font-cormorant text-2xl" style={{ color: C }}>{f.price}</p>
                </div>
              ))}
            </div>

            <div className="reveal flex items-center gap-4">
              <div className="flex -space-x-2">
                {[C, CL, CD].map((col, i) => (
                  <div key={i} className="w-8 h-8 rounded-full border-2 flex items-center justify-center text-white text-[10px]"
                    style={{ background: col, borderColor: "#FAF7F4" }}>★</div>
                ))}
              </div>
              <p className="font-montserrat text-xs" style={{ color: "#7A7A7A", fontWeight: 300 }}>
                Уже прошли обучение <span style={{ color: C }}>47 учеников</span>
              </p>
            </div>
          </div>

          {/* Form */}
          <div className="reveal relative">
            <div className="absolute inset-0 overflow-hidden opacity-10"
              style={{ transform: "translate(12px, 12px)" }}>
              <img src="https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/ea299511-4ef5-4be5-9916-697b256aa497.jpg"
                alt="" className="w-full h-full object-cover" />
            </div>
            <div className="relative p-8" style={{ background: "#fff", border: `1px solid rgba(139,0,0,0.15)`, boxShadow: "0 4px 32px rgba(0,0,0,0.06)" }}>
              <div className="absolute top-0 left-0 right-0 h-px"
                style={{ background: `linear-gradient(90deg, transparent, ${C}, transparent)` }} />
              <h3 className="font-cormorant text-2xl mb-1" style={{ color: "#1A1A1A" }}>Записаться на мастер-класс</h3>
              <p className="font-montserrat text-xs mb-7 tracking-wide" style={{ color: "#7A7A7A", fontWeight: 300 }}>
                Ближайшая дата: <span style={{ color: C }}>уточняется</span>
              </p>
              <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                <div>
                  <label className="font-montserrat text-[9px] tracking-widest uppercase block mb-2" style={{ color: C }}>Ваше имя</label>
                  <input type="text" placeholder="Анастасия"
                    className="w-full px-4 py-3 font-montserrat text-sm focus:outline-none transition-all"
                    style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div>
                  <label className="font-montserrat text-[9px] tracking-widest uppercase block mb-2" style={{ color: C }}>Телефон</label>
                  <input type="tel" placeholder="+7 (900) 000-00-00"
                    className="w-full px-4 py-3 font-montserrat text-sm focus:outline-none transition-all"
                    style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <div>
                  <label className="font-montserrat text-[9px] tracking-widest uppercase block mb-2" style={{ color: C }}>Формат</label>
                  <select className="w-full px-4 py-3 font-montserrat text-sm focus:outline-none transition-all"
                    style={{ ...inputStyle, color: "#1A1A1A" }} onFocus={inputFocus} onBlur={inputBlur}>
                    <option>Мини-группа (до 4 чел) — 3 500 ₽</option>
                    <option>Группа (до 8 чел) — 2 800 ₽</option>
                    <option>Онлайн-формат — 1 500 ₽</option>
                    <option>Индивидуальное обучение</option>
                  </select>
                </div>
                <div>
                  <label className="font-montserrat text-[9px] tracking-widest uppercase block mb-2" style={{ color: C }}>Пожелания</label>
                  <textarea rows={3} placeholder="Есть ли опыт, что хочется освоить..."
                    className="w-full px-4 py-3 font-montserrat text-sm focus:outline-none transition-all resize-none"
                    style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
                </div>
                <button type="submit" className="btn-gold w-full">Записаться на мастер-класс</button>
              </form>
              <p className="font-montserrat text-[9px] text-center mt-4 tracking-wide" style={{ color: "#B0A8A0" }}>
                После заявки Поля свяжется с вами в течение 2 часов
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-line mx-16 reveal" />

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-24 px-8 md:px-16" style={{ background: "#F0EBE4" }}>
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal order-2 md:order-1">
            <p className="font-montserrat text-[10px] tracking-[0.4em] mb-6 uppercase" style={{ color: C }}>О мастере</p>
            <h2 className="font-cormorant mb-8" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 300, color: "#1A1A1A" }}>
              Привет,<br />я <em className="gold-text">Поля</em>
            </h2>
            <p className="font-montserrat text-sm leading-relaxed mb-5" style={{ color: "#7A7A7A", fontWeight: 300 }}>
              Мастер-кондитер из Пензы с 5-летним опытом создания авторских тортов.
              Каждое моё изделие — это сочетание классической кондитерской школы и современного дизайна.
            </p>
            <p className="font-montserrat text-sm leading-relaxed mb-10" style={{ color: "#7A7A7A", fontWeight: 300 }}>
              Прошла обучение в лучших кондитерских школах России, создала более 200 уникальных тортов
              и знаю, как превратить вашу идею в сладкий шедевр.
            </p>
            <div className="grid grid-cols-3 gap-8 mb-10">
              {[["5+", "Лет опыта"], ["200+", "Тортов"], ["4.9★", "Рейтинг"]].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="stat-number">{v}</div>
                  <div className="font-montserrat text-[9px] tracking-widest uppercase mt-1" style={{ color: "#B0A8A0" }}>{l}</div>
                </div>
              ))}
            </div>
            <button onClick={() => scrollTo("contact")} className="btn-gold">Написать Поле</button>
          </div>
          <div className="reveal order-1 md:order-2 relative">
            <div className="relative aspect-[3/4] overflow-hidden gold-glow"
              style={{ transition: "transform 0.15s ease" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -7;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
              }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"; }}>
              <img src={CAKE_IMAGES[1].url} alt="Мастер Поля" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -bottom-4 -left-4 p-5"
              style={{ background: "#fff", border: `1px solid rgba(139,0,0,0.15)`, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
              <p className="font-cormorant text-2xl" style={{ color: C }}>WOW</p>
              <p className="font-montserrat text-[8px] tracking-widest uppercase" style={{ color: "#B0A8A0" }}>Cakes PNZ</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" className="py-24 px-8 md:px-16" style={{ background: "#FAF7F4" }}>
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-14">
            <p className="font-montserrat text-[10px] tracking-[0.4em] mb-4 uppercase" style={{ color: C }}>Отзывы</p>
            <h2 className="font-cormorant" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 300, color: "#1A1A1A" }}>
              Говорят <em className="gold-text">клиенты</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card reveal p-6" style={{ transitionDelay: `${i * 0.08}s` }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.stars)].map((_, j) => (
                    <span key={j} className="text-sm" style={{ color: C }}>★</span>
                  ))}
                </div>
                <p className="font-montserrat text-sm leading-relaxed mb-5 italic" style={{ color: "#5A5A5A", fontWeight: 300 }}>
                  "{r.text}"
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-montserrat text-xs font-medium" style={{ color: "#1A1A1A" }}>{r.name}</p>
                  <span className="font-montserrat text-[9px] tracking-wider uppercase" style={{ color: CL }}>{r.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-line mx-16 reveal" />

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-24 px-8 md:px-16" style={{ background: "#F0EBE4" }}>
        <div className="max-w-2xl mx-auto">
          <div className="reveal text-center mb-12">
            <p className="font-montserrat text-[10px] tracking-[0.4em] mb-4 uppercase" style={{ color: C }}>Начнём?</p>
            <h2 className="font-cormorant mb-4" style={{ fontSize: "clamp(2.4rem, 5vw, 3.8rem)", fontWeight: 300, color: "#1A1A1A" }}>
              Заказать <em className="gold-text">торт</em>
            </h2>
            <p className="font-montserrat text-sm leading-relaxed" style={{ color: "#7A7A7A", fontWeight: 300 }}>
              Оставьте заявку — свяжусь с вами в течение часа
            </p>
          </div>

          <form className="reveal space-y-4" onSubmit={(e) => e.preventDefault()}
            style={{ background: "#fff", padding: "40px", border: "1px solid rgba(139,0,0,0.1)", boxShadow: "0 4px 32px rgba(0,0,0,0.05)" }}>
            <div className="absolute top-0 left-0 right-0 h-px"
              style={{ background: `linear-gradient(90deg, transparent, ${C}, transparent)` }} />
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-montserrat text-[9px] tracking-widest uppercase block mb-2" style={{ color: C }}>Ваше имя</label>
                <input type="text" placeholder="Анастасия"
                  className="w-full px-4 py-3 font-montserrat text-sm focus:outline-none transition-all"
                  style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
              </div>
              <div>
                <label className="font-montserrat text-[9px] tracking-widest uppercase block mb-2" style={{ color: C }}>Телефон</label>
                <input type="tel" placeholder="+7 (900) 000-00-00"
                  className="w-full px-4 py-3 font-montserrat text-sm focus:outline-none transition-all"
                  style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
              </div>
            </div>
            <div>
              <label className="font-montserrat text-[9px] tracking-widest uppercase block mb-2" style={{ color: C }}>Тип торта</label>
              <select className="w-full px-4 py-3 font-montserrat text-sm focus:outline-none transition-all"
                style={{ ...inputStyle, color: "#1A1A1A" }} onFocus={inputFocus} onBlur={inputBlur}>
                <option>Выберите тип...</option>
                <option>Свадебный торт</option>
                <option>Авторский торт</option>
                <option>Детский торт</option>
                <option>3D-торт</option>
                <option>Корпоративный</option>
                <option>Муссовый торт</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-montserrat text-[9px] tracking-widest uppercase block mb-2" style={{ color: C }}>Дата мероприятия</label>
                <input type="date" className="w-full px-4 py-3 font-montserrat text-sm focus:outline-none transition-all"
                  style={{ ...inputStyle, color: "#7A7A7A" }} onFocus={inputFocus} onBlur={inputBlur} />
              </div>
              <div>
                <label className="font-montserrat text-[9px] tracking-widest uppercase block mb-2" style={{ color: C }}>Количество гостей</label>
                <input type="number" placeholder="20"
                  className="w-full px-4 py-3 font-montserrat text-sm focus:outline-none transition-all"
                  style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
              </div>
            </div>
            <div>
              <label className="font-montserrat text-[9px] tracking-widest uppercase block mb-2" style={{ color: C }}>Пожелания</label>
              <textarea rows={4} placeholder="Опишите ваш торт мечты..."
                className="w-full px-4 py-3 font-montserrat text-sm focus:outline-none transition-all resize-none"
                style={inputStyle} onFocus={inputFocus} onBlur={inputBlur} />
            </div>
            <button type="submit" className="btn-gold w-full">Отправить заявку</button>
          </form>

          <div className="reveal flex flex-wrap justify-center gap-8 mt-10">
            {[
              { icon: "Phone", label: "+7 (000) 000-00-00" },
              { icon: "MessageCircle", label: "Написать в Telegram" },
              { icon: "Instagram", label: "@wow_cakes_pnz" },
            ].map((c) => (
              <button key={c.label}
                className="flex items-center gap-2 font-montserrat text-xs transition-colors tracking-wide"
                style={{ color: "#B0A8A0" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = C)}
                onMouseLeave={(e) => (e.currentTarget.style.color = "#B0A8A0")}>
                <Icon name={c.icon} fallback="Circle" size={13} style={{ color: C }} />
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== FOOTER ===== */}
      <footer className="py-8 px-8 md:px-16" style={{ background: "#1A1A1A" }}>
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-cormorant text-xl tracking-widest gold-text">WOW CAKES PNZ</p>
          <p className="font-montserrat text-[10px] tracking-widest uppercase" style={{ color: "rgba(255,255,255,0.2)" }}>
            © 2024 Мастер кондитер Поля · Пенза
          </p>
          <div className="flex gap-5">
            {navItems.slice(0, 5).map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="font-montserrat text-[9px] tracking-widest uppercase transition-colors"
                style={{ color: "rgba(255,255,255,0.25)" }}
                onMouseEnter={(e) => (e.currentTarget.style.color = "#fff")}
                onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.25)")}>
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}
