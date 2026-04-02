import { useEffect, useRef, useState } from "react";
import Icon from "@/components/ui/icon";

const CAKE_IMAGES = [
  {
    url: "https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/1791ea73-6041-45a8-9b01-0498ee4bf778.jpg",
    title: "Свадебный шедевр",
    tag: "Свадебные торты",
    price: "от 8 000 ₽/кг",
  },
  {
    url: "https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/903a8f99-23c0-41dd-a83e-6503c7a12fdd.jpg",
    title: "Цветочная фантазия",
    tag: "Авторские торты",
    price: "от 5 000 ₽/кг",
  },
  {
    url: "https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/4d971335-9420-4fc4-ac77-fa14663cebf6.jpg",
    title: "Шоколадный гламур",
    tag: "Праздничные торты",
    price: "от 4 500 ₽/кг",
  },
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
      { threshold: 0.4 }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  const handleHeroMouse = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!heroRef.current) return;
    const rect = heroRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left - rect.width / 2) / (rect.width / 2)) * 8;
    const y = ((e.clientY - rect.top - rect.height / 2) / (rect.height / 2)) * -6;
    setRotateY(x);
    setRotateX(y);
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

  return (
    <div className="bg-[#0A0A0A] text-white min-h-screen overflow-x-hidden">
      {/* Custom cursor */}
      <div className={`custom-cursor ${isHovering ? "hover" : ""}`} style={{ left: mousePos.x, top: mousePos.y }} />
      <div className={`custom-cursor-ring ${isHovering ? "hover" : ""}`} style={{ left: cursorRing.x, top: cursorRing.y }} />

      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 py-5"
        style={{ background: "linear-gradient(to bottom, rgba(10,10,10,0.95) 0%, transparent 100%)" }}>
        <button onClick={() => scrollTo("home")} className="font-cormorant text-xl tracking-[0.25em] gold-text font-light">
          WOW CAKES
        </button>
        <div className="hidden md:flex items-center gap-8">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className={`nav-link ${activeSection === item.id ? "!text-[#C9A84C]" : ""}`}>
              {item.label}
            </button>
          ))}
        </div>
        <button onClick={() => scrollTo("contact")} className="hidden md:block btn-gold text-[10px] tracking-widest">
          Заказать торт
        </button>
        <button className="md:hidden" onClick={() => setMenuOpen(!menuOpen)}>
          <Icon name={menuOpen ? "X" : "Menu"} size={22} className="text-[#C9A84C]" />
        </button>
      </nav>

      {/* Mobile menu */}
      {menuOpen && (
        <div className="fixed inset-0 z-40 bg-[#0A0A0A]/98 flex flex-col items-center justify-center gap-8">
          {navItems.map((item) => (
            <button key={item.id} onClick={() => scrollTo(item.id)}
              className="font-cormorant text-3xl gold-text tracking-wider">
              {item.label}
            </button>
          ))}
        </div>
      )}

      {/* ===== HERO ===== */}
      <section id="home" ref={heroRef} onMouseMove={handleHeroMouse}
        className="relative min-h-screen flex items-center justify-center overflow-hidden noise-overlay">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/4 left-1/4 w-96 h-96 rounded-full opacity-10"
            style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 70%)", filter: "blur(60px)" }} />
          <div className="absolute bottom-1/4 right-1/4 w-80 h-80 rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #8B6914 0%, transparent 70%)", filter: "blur(80px)" }} />
          <div className="absolute top-1/3 right-1/3 w-72 h-72 rounded-full opacity-15"
            style={{ background: "radial-gradient(circle, #7B1D3A 0%, transparent 70%)", filter: "blur(70px)" }} />
          <div className="absolute bottom-1/3 left-1/3 w-64 h-64 rounded-full opacity-12"
            style={{ background: "radial-gradient(circle, #A62650 0%, transparent 70%)", filter: "blur(90px)" }} />
        </div>

        {[...Array(12)].map((_, i) => (
          <div key={i} className="absolute w-1 h-1 rounded-full"
            style={{
              background: i % 3 === 0 ? "#A62650" : i % 3 === 1 ? "#C9A84C" : "#E8C97A",
              left: `${10 + i * 7.5}%`,
              bottom: `${20 + (i % 4) * 15}%`,
              animation: `particle-rise ${3 + i * 0.4}s ease-out infinite`,
              animationDelay: `${i * 0.6}s`,
              opacity: 0.6,
            }} />
        ))}

        <div className="absolute right-0 md:right-8 lg:right-16 top-1/2 -translate-y-1/2 w-[45vw] max-w-[480px] opacity-20 md:opacity-40 lg:opacity-60"
          style={{
            transform: `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-50%)`,
            transition: "transform 0.1s ease",
          }}>
          <img src={CAKE_IMAGES[0].url} alt="Торт" className="w-full h-auto float-anim"
            style={{ filter: "drop-shadow(0 0 40px rgba(201,168,76,0.3))" }} />
        </div>

        <div className="relative z-10 px-8 md:px-16 max-w-3xl">
          <p className="font-montserrat text-xs tracking-[0.4em] text-[#C9A84C] mb-6 animate-fade-in opacity-0"
            style={{ animationDelay: "0.2s" }}>
            КОНДИТЕРСКОЕ ИСКУССТВО · ПЕНЗА
          </p>
          <h1 className="font-cormorant leading-[0.9] mb-8 animate-fade-in opacity-0"
            style={{ fontSize: "clamp(3.5rem, 9vw, 7.5rem)", fontWeight: 300, animationDelay: "0.4s" }}>
            <span className="block text-white/90">Торты,</span>
            <span className="block gold-text italic">которые</span>
            <span className="block text-white/90">удивляют</span>
          </h1>
          <p className="font-montserrat text-sm text-white/50 leading-relaxed mb-10 max-w-md animate-fade-in opacity-0"
            style={{ animationDelay: "0.7s", fontWeight: 300 }}>
            Мастер кондитер <span className="text-[#C9A84C]">Поля</span> создаёт уникальные авторские торты в Пензе.
            Каждое изделие — произведение искусства с безупречным вкусом.
          </p>
          <div className="flex flex-wrap gap-4 animate-fade-in opacity-0" style={{ animationDelay: "1s" }}>
            <button onClick={() => scrollTo("portfolio")} className="btn-gold">Смотреть работы</button>
            <button onClick={() => scrollTo("contact")} className="btn-ghost-gold">Заказать торт</button>
          </div>
          <div className="flex gap-10 mt-14 animate-fade-in opacity-0" style={{ animationDelay: "1.2s" }}>
            {[["200+", "Тортов создано"], ["5 лет", "Опыта"], ["100%", "Довольных"]].map(([num, label]) => (
              <div key={label}>
                <div className="stat-number">{num}</div>
                <div className="font-montserrat text-[10px] tracking-widest text-white/40 mt-1 uppercase">{label}</div>
              </div>
            ))}
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-fade-in opacity-0"
          style={{ animationDelay: "1.5s" }}>
          <span className="font-montserrat text-[9px] tracking-widest text-white/30 uppercase">Листать</span>
          <div className="w-px h-12 overflow-hidden relative bg-gradient-to-b from-transparent to-[#C9A84C]" />
        </div>
      </section>

      {/* ===== PORTFOLIO ===== */}
      <section id="portfolio" className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="reveal flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.4em] text-[#C9A84C] mb-4 uppercase">Наши работы</p>
              <h2 className="font-cormorant text-white/90" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300 }}>
                Галерея<br /><em className="gold-text">шедевров</em>
              </h2>
            </div>
            <p className="font-montserrat text-sm text-white/40 max-w-xs leading-relaxed" style={{ fontWeight: 300 }}>
              Каждый торт создаётся вручную с вниманием к деталям
            </p>
          </div>

          <div className="reveal grid md:grid-cols-2 gap-8 mb-8">
            <div
              className="portfolio-card gold-glow aspect-[4/5] relative"
              style={{ transition: "transform 0.15s ease" }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 16;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -12;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
              }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"; }}
            >
              <img src={CAKE_IMAGES[selected3D].url} alt={CAKE_IMAGES[selected3D].title}
                className="w-full h-full object-cover" style={{ transition: "transform 0.8s cubic-bezier(0.23,1,0.32,1)" }} />
              <div className="overlay" />
              <div className="absolute bottom-0 left-0 right-0 p-8 z-10">
                <p className="font-montserrat text-[9px] tracking-[0.3em] text-[#C9A84C] mb-2 uppercase">{CAKE_IMAGES[selected3D].tag}</p>
                <h3 className="font-cormorant text-2xl text-white mb-1">{CAKE_IMAGES[selected3D].title}</h3>
                <p className="font-montserrat text-sm text-[#C9A84C]">{CAKE_IMAGES[selected3D].price}</p>
              </div>
              <div className="absolute top-4 right-4 border border-[#C9A84C]/40 px-3 py-1 z-10">
                <span className="font-montserrat text-[9px] tracking-widest text-[#C9A84C] uppercase">3D просмотр</span>
              </div>
            </div>

            <div className="flex flex-col gap-4">
              {CAKE_IMAGES.map((cake, i) => (
                <div key={i}
                  className={`portfolio-card flex-1 relative cursor-pointer ${selected3D === i ? "ring-1 ring-[#C9A84C]" : ""}`}
                  onClick={() => setSelected3D(i)}>
                  <img src={cake.url} alt={cake.title} className="w-full h-full object-cover" />
                  <div className="overlay" />
                  <div className="absolute bottom-4 left-4 right-4 z-10">
                    <p className="font-montserrat text-[8px] tracking-widest text-[#C9A84C] uppercase mb-1">{cake.tag}</p>
                    <p className="font-cormorant text-lg text-white">{cake.title}</p>
                  </div>
                  {selected3D === i && <div className="absolute inset-0 border border-[#C9A84C]/50 pointer-events-none" />}
                </div>
              ))}
            </div>
          </div>

          <div className="reveal text-center">
            <button onClick={() => scrollTo("contact")} className="btn-ghost-gold">Заказать похожий торт</button>
          </div>
        </div>
      </section>

      <div className="gold-line mx-16 my-2 reveal" />

      {/* ===== SERVICES ===== */}
      <section id="services" className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-16">
            <p className="font-montserrat text-[10px] tracking-[0.4em] text-[#C9A84C] mb-4 uppercase">Что мы делаем</p>
            <h2 className="font-cormorant text-white/90" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300 }}>
              Услуги и <em className="gold-text">цены</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-px bg-[#C9A84C]/10">
            {SERVICES.map((s, i) => (
              <div key={i} className="reveal bg-[#0A0A0A] p-8 group transition-all duration-500 hover:bg-[#111] relative overflow-hidden"
                style={{ transitionDelay: `${i * 0.05}s` }}>
                <div className="absolute top-0 left-0 w-0 h-px bg-[#C9A84C] group-hover:w-full transition-all duration-500" />
                <div className="mb-6">
                  <div className="w-12 h-12 flex items-center justify-center border border-[#C9A84C]/20 group-hover:border-[#C9A84C]/60 transition-colors">
                    <Icon name={s.icon} fallback="Star" size={20} className="text-[#C9A84C]" />
                  </div>
                </div>
                <h3 className="font-cormorant text-xl text-white mb-3 group-hover:text-[#E8C97A] transition-colors">{s.title}</h3>
                <p className="font-montserrat text-xs text-white/40 leading-relaxed mb-6" style={{ fontWeight: 300 }}>{s.desc}</p>
                <p className="font-montserrat text-sm text-[#C9A84C] font-medium">{s.price}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-line mx-16 my-2 reveal" />

      {/* ===== ABOUT ===== */}
      <section id="about" className="py-24 px-8 md:px-16">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">
          <div className="reveal order-2 md:order-1">
            <p className="font-montserrat text-[10px] tracking-[0.4em] text-[#C9A84C] mb-6 uppercase">О мастере</p>
            <h2 className="font-cormorant mb-8 text-white/90" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300 }}>
              Привет,<br />я <em className="gold-text">Поля</em>
            </h2>
            <p className="font-montserrat text-sm text-white/50 leading-relaxed mb-6" style={{ fontWeight: 300 }}>
              Мастер-кондитер из Пензы с 5-летним опытом создания авторских тортов.
              Каждое моё изделие — это сочетание классической кондитерской школы и современного дизайна.
            </p>
            <p className="font-montserrat text-sm text-white/50 leading-relaxed mb-10" style={{ fontWeight: 300 }}>
              Я прошла обучение в лучших кондитерских школах России, создала более 200 уникальных тортов
              и знаю, как превратить вашу идею в сладкий шедевр.
            </p>
            <div className="grid grid-cols-3 gap-8 mb-10">
              {[["5+", "Лет опыта"], ["200+", "Тортов"], ["4.9★", "Рейтинг"]].map(([v, l]) => (
                <div key={l} className="text-center">
                  <div className="stat-number">{v}</div>
                  <div className="font-montserrat text-[9px] tracking-widest text-white/30 uppercase mt-1">{l}</div>
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
                const x = ((e.clientX - rect.left) / rect.width - 0.5) * 12;
                const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
                e.currentTarget.style.transform = `perspective(1000px) rotateX(${y}deg) rotateY(${x}deg)`;
              }}
              onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(1000px) rotateX(0) rotateY(0)"; }}>
              <img src={CAKE_IMAGES[1].url} alt="Мастер Поля" className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0A0A0A]/60 via-transparent to-transparent" />
            </div>
            <div className="absolute -bottom-4 -left-4 bg-[#111] border border-[#C9A84C]/30 p-6 gold-glow">
              <p className="font-cormorant text-3xl text-[#C9A84C]">WOW</p>
              <p className="font-montserrat text-[8px] tracking-widest text-white/40 uppercase">Cakes PNZ</p>
            </div>
          </div>
        </div>
      </section>

      {/* ===== REVIEWS ===== */}
      <section id="reviews" className="py-24 px-8 md:px-16 relative">
        <div className="absolute inset-0 pointer-events-none"
          style={{ background: "radial-gradient(ellipse at center, rgba(201,168,76,0.04) 0%, transparent 70%)" }} />
        <div className="max-w-7xl mx-auto">
          <div className="reveal text-center mb-16">
            <p className="font-montserrat text-[10px] tracking-[0.4em] text-[#C9A84C] mb-4 uppercase">Отзывы</p>
            <h2 className="font-cormorant text-white/90" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300 }}>
              Говорят <em className="gold-text">клиенты</em>
            </h2>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-4">
            {REVIEWS.map((r, i) => (
              <div key={i} className="review-card reveal p-6" style={{ transitionDelay: `${i * 0.1}s` }}>
                <div className="flex gap-0.5 mb-4">
                  {[...Array(r.stars)].map((_, j) => (
                    <span key={j} className="text-[#C9A84C] text-sm">★</span>
                  ))}
                </div>
                <p className="font-montserrat text-sm text-white/60 leading-relaxed mb-6 italic" style={{ fontWeight: 300 }}>
                  "{r.text}"
                </p>
                <div className="flex items-center justify-between">
                  <p className="font-montserrat text-xs text-white/80 font-medium">{r.name}</p>
                  <span className="font-montserrat text-[9px] tracking-wider text-[#C9A84C]/60 uppercase">{r.event}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <div className="gold-line mx-16 my-2 reveal" />

      {/* ===== CONTACT ===== */}
      <section id="contact" className="py-24 px-8 md:px-16">
        <div className="max-w-3xl mx-auto">
          <div className="reveal text-center mb-14">
            <p className="font-montserrat text-[10px] tracking-[0.4em] text-[#C9A84C] mb-4 uppercase">Начнём?</p>
            <h2 className="font-cormorant text-white/90 mb-6" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300 }}>
              Заказать <em className="gold-text">торт</em>
            </h2>
            <p className="font-montserrat text-sm text-white/40 leading-relaxed" style={{ fontWeight: 300 }}>
              Оставьте заявку — свяжусь с вами в течение часа
            </p>
          </div>

          <form className="reveal space-y-4" onSubmit={(e) => e.preventDefault()}>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-montserrat text-[9px] tracking-widest text-[#C9A84C]/70 uppercase block mb-2">Ваше имя</label>
                <input type="text" placeholder="Анастасия"
                  className="w-full bg-[#111] border border-[#C9A84C]/20 px-4 py-3 font-montserrat text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
              </div>
              <div>
                <label className="font-montserrat text-[9px] tracking-widest text-[#C9A84C]/70 uppercase block mb-2">Телефон</label>
                <input type="tel" placeholder="+7 (900) 000-00-00"
                  className="w-full bg-[#111] border border-[#C9A84C]/20 px-4 py-3 font-montserrat text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
              </div>
            </div>
            <div>
              <label className="font-montserrat text-[9px] tracking-widest text-[#C9A84C]/70 uppercase block mb-2">Тип торта</label>
              <select className="w-full bg-[#111] border border-[#C9A84C]/20 px-4 py-3 font-montserrat text-sm text-white/60 focus:outline-none focus:border-[#C9A84C]/60 transition-colors">
                <option value="" className="bg-[#111]">Выберите тип...</option>
                <option className="bg-[#111]">Свадебный торт</option>
                <option className="bg-[#111]">Авторский торт</option>
                <option className="bg-[#111]">Детский торт</option>
                <option className="bg-[#111]">3D-торт</option>
                <option className="bg-[#111]">Корпоративный</option>
                <option className="bg-[#111]">Муссовый торт</option>
              </select>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="font-montserrat text-[9px] tracking-widest text-[#C9A84C]/70 uppercase block mb-2">Дата мероприятия</label>
                <input type="date"
                  className="w-full bg-[#111] border border-[#C9A84C]/20 px-4 py-3 font-montserrat text-sm text-white/60 focus:outline-none focus:border-[#C9A84C]/60 transition-colors"
                  style={{ colorScheme: "dark" }} />
              </div>
              <div>
                <label className="font-montserrat text-[9px] tracking-widest text-[#C9A84C]/70 uppercase block mb-2">Количество гостей</label>
                <input type="number" placeholder="20"
                  className="w-full bg-[#111] border border-[#C9A84C]/20 px-4 py-3 font-montserrat text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors" />
              </div>
            </div>
            <div>
              <label className="font-montserrat text-[9px] tracking-widest text-[#C9A84C]/70 uppercase block mb-2">Пожелания</label>
              <textarea rows={4} placeholder="Опишите ваш торт мечты..."
                className="w-full bg-[#111] border border-[#C9A84C]/20 px-4 py-3 font-montserrat text-sm text-white/80 placeholder-white/20 focus:outline-none focus:border-[#C9A84C]/60 transition-colors resize-none" />
            </div>
            <button type="submit" className="btn-gold w-full">
              Отправить заявку
            </button>
          </form>

          <div className="reveal flex flex-wrap justify-center gap-8 mt-12">
            {[
              { icon: "Phone", label: "+7 (000) 000-00-00" },
              { icon: "MessageCircle", label: "Написать в Telegram" },
              { icon: "Instagram", label: "@wow_cakes_pnz" },
            ].map((c) => (
              <button key={c.label}
                className="flex items-center gap-2 font-montserrat text-xs text-white/40 hover:text-[#C9A84C] transition-colors tracking-wide">
                <Icon name={c.icon} fallback="Circle" size={14} className="text-[#C9A84C]/60" />
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* ===== MACARONS 3D + BOXES ===== */}
      <section id="macarons" className="py-24 px-8 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-0 right-0 w-[600px] h-[600px] rounded-full opacity-8"
            style={{ background: "radial-gradient(circle, #7B1D3A 0%, transparent 65%)", filter: "blur(100px)" }} />
          <div className="absolute bottom-0 left-0 w-[400px] h-[400px] rounded-full opacity-6"
            style={{ background: "radial-gradient(circle, #C9A84C 0%, transparent 65%)", filter: "blur(80px)" }} />
        </div>

        <div className="max-w-7xl mx-auto">
          {/* Header */}
          <div className="reveal text-center mb-16">
            <p className="font-montserrat text-[10px] tracking-[0.4em] text-[#A62650] mb-4 uppercase">Авторские пирожные</p>
            <h2 className="font-cormorant text-white/90" style={{ fontSize: "clamp(2.5rem, 5vw, 4rem)", fontWeight: 300 }}>
              Макарон <em className="gold-text">ручной работы</em>
            </h2>
            <p className="font-montserrat text-sm text-white/40 mt-4 max-w-lg mx-auto leading-relaxed" style={{ fontWeight: 300 }}>
              Французские пирожные с авторскими начинками. Нежные, хрустящие, тающие во рту.
            </p>
          </div>

          {/* 3D Macaron viewer */}
          <div className="reveal grid md:grid-cols-2 gap-12 items-center mb-20">
            <div className="relative">
              <div
                className="relative aspect-square overflow-hidden gold-glow"
                style={{ transition: "transform 0.15s ease" }}
                onMouseMove={(e) => {
                  const rect = e.currentTarget.getBoundingClientRect();
                  const x = ((e.clientX - rect.left) / rect.width - 0.5) * 20;
                  const y = ((e.clientY - rect.top) / rect.height - 0.5) * -15;
                  e.currentTarget.style.transform = `perspective(900px) rotateX(${y}deg) rotateY(${x}deg) scale(1.02)`;
                }}
                onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(900px) rotateX(0) rotateY(0) scale(1)"; }}
              >
                <img
                  src="https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/264e6c7c-aa9a-4899-b1a2-7e2315e63a31.jpg"
                  alt="Макарон"
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0"
                  style={{ background: "linear-gradient(135deg, rgba(77,14,34,0.3) 0%, transparent 60%)" }} />
                {/* 3D label */}
                <div className="absolute top-5 left-5 border border-[#A62650]/60 px-3 py-1 backdrop-blur-sm"
                  style={{ background: "rgba(77,14,34,0.5)" }}>
                  <span className="font-montserrat text-[9px] tracking-widest text-[#C4748A] uppercase">3D просмотр</span>
                </div>
                {/* Flavor tags */}
                <div className="absolute bottom-5 left-5 right-5 flex flex-wrap gap-2">
                  {["Малина", "Фисташка", "Шоколад", "Лаванда", "Карамель", "Ваниль"].map((f) => (
                    <span key={f} className="font-montserrat text-[8px] tracking-wider uppercase px-2 py-1"
                      style={{ background: "rgba(77,14,34,0.7)", border: "1px solid rgba(196,116,138,0.3)", color: "#E8C97A" }}>
                      {f}
                    </span>
                  ))}
                </div>
              </div>
              {/* Decorative dots */}
              <div className="absolute -right-4 top-1/2 -translate-y-1/2 flex flex-col gap-2">
                {[...Array(5)].map((_, i) => (
                  <div key={i} className="w-1.5 h-1.5 rounded-full"
                    style={{ background: i % 2 === 0 ? "#A62650" : "#C9A84C", opacity: 0.6 }} />
                ))}
              </div>
            </div>

            <div>
              <p className="font-montserrat text-[10px] tracking-[0.3em] text-[#A62650] uppercase mb-5">6 вкусов сезона</p>
              <h3 className="font-cormorant text-white/90 mb-6" style={{ fontSize: "clamp(1.8rem, 3vw, 2.8rem)", fontWeight: 300 }}>
                Каждый — маленький<br /><em className="gold-text">шедевр</em>
              </h3>
              <div className="space-y-4 mb-8">
                {[
                  { flavor: "Малина & Роза", desc: "Нежный ганаш из малины с лепестками роз", color: "#A62650" },
                  { flavor: "Фисташка & Бурбон", desc: "Итальянская фисташковая паста, нотки ванили", color: "#6B8C4E" },
                  { flavor: "Тёмный шоколад", desc: "Горький Valrhona 72%, морская соль", color: "#5C3A1E" },
                  { flavor: "Лаванда & Мёд", desc: "Прованская лаванда, цветочный мёд Алтая", color: "#7B6FA0" },
                ].map((item) => (
                  <div key={item.flavor} className="flex items-start gap-4 group">
                    <div className="w-2 h-2 rounded-full mt-2 flex-shrink-0 transition-transform group-hover:scale-150"
                      style={{ background: item.color }} />
                    <div>
                      <p className="font-montserrat text-sm text-white/80 font-medium">{item.flavor}</p>
                      <p className="font-montserrat text-xs text-white/35 mt-0.5" style={{ fontWeight: 300 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="font-montserrat text-xs text-white/30 mb-6" style={{ fontWeight: 300 }}>
                Вкусы меняются сезонно. Всегда доступны 8–12 позиций на выбор.
              </p>
              <button onClick={() => document.getElementById("macaron-boxes")?.scrollIntoView({ behavior: "smooth" })}
                className="btn-ghost-gold">
                Выбрать бокс
              </button>
            </div>
          </div>

          {/* ===== BOX CATALOG ===== */}
          <div id="macaron-boxes">
            <div className="reveal text-center mb-10">
              <p className="font-montserrat text-[10px] tracking-[0.4em] text-[#A62650] mb-3 uppercase">Каталог боксов</p>
              <h3 className="font-cormorant text-white/90" style={{ fontSize: "clamp(2rem, 4vw, 3rem)", fontWeight: 300 }}>
                Готовые <em className="gold-text">подарочные боксы</em>
              </h3>
            </div>

            <div className="reveal grid md:grid-cols-3 gap-6">
              {[
                {
                  count: 6,
                  name: "Мини-бокс",
                  price: "890 ₽",
                  desc: "Идеально для знакомства с вкусами. Элегантная коробочка с 6 пирожными на выбор.",
                  flavors: "3–4 вкуса",
                  tag: "Знакомство",
                  popular: false,
                },
                {
                  count: 8,
                  name: "Классик",
                  price: "1 190 ₽",
                  desc: "Самый популярный формат. Разнообразие вкусов, красивое оформление, золотая лента.",
                  flavors: "4–6 вкусов",
                  tag: "Хит продаж",
                  popular: true,
                },
                {
                  count: 12,
                  name: "Люкс-бокс",
                  price: "1 690 ₽",
                  desc: "Премиальный подарок. Весь сезонный ассортимент в одной коробке. Бархатная упаковка.",
                  flavors: "6–8 вкусов",
                  tag: "Премиум",
                  popular: false,
                },
              ].map((box) => (
                <div key={box.count}
                  className={`relative overflow-hidden transition-all duration-500 group ${box.popular ? "ring-1 ring-[#A62650]" : ""}`}
                  style={{
                    background: box.popular
                      ? "linear-gradient(135deg, rgba(77,14,34,0.6), rgba(123,29,58,0.3), rgba(17,17,17,0.9))"
                      : "linear-gradient(135deg, rgba(17,17,17,0.95), rgba(30,10,15,0.8))",
                    border: box.popular ? "none" : "1px solid rgba(123,29,58,0.2)",
                  }}
                  onMouseMove={(e) => {
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
                    const y = ((e.clientY - rect.top) / rect.height - 0.5) * -8;
                    e.currentTarget.style.transform = `perspective(800px) rotateX(${y}deg) rotateY(${x}deg) translateZ(10px)`;
                  }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = "perspective(800px) rotateX(0) rotateY(0) translateZ(0)"; }}
                >
                  {/* Top line animation */}
                  <div className="absolute top-0 left-0 w-0 h-px group-hover:w-full transition-all duration-700"
                    style={{ background: "linear-gradient(90deg, #7B1D3A, #C9A84C)" }} />

                  {box.popular && (
                    <div className="absolute top-4 right-4 px-3 py-1"
                      style={{ background: "linear-gradient(135deg, #7B1D3A, #A62650)" }}>
                      <span className="font-montserrat text-[8px] tracking-widest text-white uppercase">{box.tag}</span>
                    </div>
                  )}

                  <div className="p-8">
                    {/* Box image area */}
                    <div className="relative aspect-[4/3] mb-6 overflow-hidden">
                      <img
                        src="https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/083e5456-bb15-4027-ba51-dd9edd1c1922.jpg"
                        alt={`Бокс ${box.count} макарон`}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                      />
                      <div className="absolute inset-0"
                        style={{ background: "linear-gradient(to top, rgba(77,14,34,0.8) 0%, transparent 50%)" }} />
                      {/* Count badge */}
                      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex items-baseline gap-1">
                        <span className="font-cormorant text-5xl font-light"
                          style={{ color: "#E8C97A", textShadow: "0 0 20px rgba(201,168,76,0.5)" }}>
                          {box.count}
                        </span>
                        <span className="font-montserrat text-xs text-white/60 uppercase tracking-widest">шт</span>
                      </div>
                    </div>

                    <div className="mb-1 flex items-center justify-between">
                      <h4 className="font-cormorant text-xl text-white group-hover:text-[#E8C97A] transition-colors">
                        {box.name}
                      </h4>
                      {!box.popular && (
                        <span className="font-montserrat text-[8px] tracking-widest text-[#A62650]/70 uppercase border border-[#A62650]/20 px-2 py-0.5">
                          {box.tag}
                        </span>
                      )}
                    </div>

                    <p className="font-montserrat text-[10px] tracking-widest text-[#C4748A] uppercase mb-4">{box.flavors}</p>
                    <p className="font-montserrat text-xs text-white/40 leading-relaxed mb-6" style={{ fontWeight: 300 }}>{box.desc}</p>

                    <div className="flex items-center justify-between">
                      <div>
                        <span className="font-cormorant text-3xl font-light" style={{ color: "#C9A84C" }}>{box.price}</span>
                      </div>
                      <button className="btn-ghost-gold py-2 px-5 text-[9px]">
                        Заказать
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            <div className="reveal text-center mt-8">
              <p className="font-montserrat text-xs text-white/30 mb-4" style={{ fontWeight: 300 }}>
                Возможна индивидуальная сборка бокса · Доставка по Пензе · Минимальный заказ 6 шт.
              </p>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-line mx-16 my-2 reveal" />

      {/* ===== ОБУЧЕНИЕ ===== */}
      <section id="masterclass" className="py-24 px-8 md:px-16 relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none">
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[500px] rounded-full opacity-5"
            style={{ background: "radial-gradient(ellipse, #7B1D3A 0%, transparent 70%)", filter: "blur(80px)" }} />
        </div>

        <div className="max-w-7xl mx-auto">
          <div className="reveal grid md:grid-cols-2 gap-16 items-center">
            {/* Left — text */}
            <div>
              <p className="font-montserrat text-[10px] tracking-[0.4em] text-[#A62650] mb-5 uppercase">Мастер-классы</p>
              <h2 className="font-cormorant text-white/90 mb-6" style={{ fontSize: "clamp(2.2rem, 4.5vw, 3.8rem)", fontWeight: 300 }}>
                Научись готовить<br /><em className="gold-text">макарон</em>
              </h2>
              <p className="font-montserrat text-sm text-white/50 leading-relaxed mb-8" style={{ fontWeight: 300 }}>
                Поля лично проведёт тебя от теории до готового пирожного.
                Узнаешь все секреты идеальных «ножек», правильный ганаш и авторские начинки.
              </p>

              {/* Program */}
              <div className="space-y-3 mb-10">
                {[
                  { step: "01", title: "Теория и ингредиенты", desc: "Разбираем миндальную муку, меренгу, температурный режим" },
                  { step: "02", title: "Замес и отсадка", desc: "Техника макаронажа, работа с кондитерским мешком" },
                  { step: "03", title: "Выпечка и сборка", desc: "Контроль духовки, правильная склейка, начинки" },
                  { step: "04", title: "Декор и упаковка", desc: "Роспись, посыпки, оформление в подарочный бокс" },
                ].map((item) => (
                  <div key={item.step} className="flex gap-5 items-start group">
                    <span className="font-cormorant text-2xl font-light flex-shrink-0 mt-0.5 transition-colors group-hover:text-[#A62650]"
                      style={{ color: "rgba(201,168,76,0.4)" }}>
                      {item.step}
                    </span>
                    <div>
                      <p className="font-montserrat text-sm text-white/80 font-medium">{item.title}</p>
                      <p className="font-montserrat text-xs text-white/30 mt-0.5" style={{ fontWeight: 300 }}>{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Formats */}
              <div className="grid grid-cols-3 gap-3 mb-8">
                {[
                  { format: "Мини-группа", count: "до 4 чел", price: "3 500 ₽" },
                  { format: "Группа", count: "до 8 чел", price: "2 800 ₽" },
                  { format: "Онлайн", count: "без лимита", price: "1 500 ₽" },
                ].map((f) => (
                  <div key={f.format} className="text-center p-4 border border-[#7B1D3A]/30 hover:border-[#A62650]/60 transition-colors"
                    style={{ background: "rgba(77,14,34,0.15)" }}>
                    <p className="font-montserrat text-[9px] tracking-widest text-[#C4748A] uppercase mb-1">{f.format}</p>
                    <p className="font-montserrat text-[10px] text-white/40 mb-2" style={{ fontWeight: 300 }}>{f.count}</p>
                    <p className="font-cormorant text-xl text-[#C9A84C]">{f.price}</p>
                  </div>
                ))}
              </div>

              <div className="flex items-center gap-4">
                <div className="flex -space-x-2">
                  {["#7B1D3A", "#A62650", "#C4748A"].map((c, i) => (
                    <div key={i} className="w-8 h-8 rounded-full border-2 border-[#0A0A0A] flex items-center justify-center"
                      style={{ background: c }}>
                      <span className="text-white text-[10px]">★</span>
                    </div>
                  ))}
                </div>
                <p className="font-montserrat text-xs text-white/40" style={{ fontWeight: 300 }}>
                  Уже прошли обучение <span className="text-[#C9A84C]">47 учеников</span>
                </p>
              </div>
            </div>

            {/* Right — form */}
            <div className="relative">
              {/* Photo behind */}
              <div className="absolute inset-0 rounded-none overflow-hidden opacity-20"
                style={{ transform: "translate(16px, 16px)" }}>
                <img
                  src="https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/ea299511-4ef5-4be5-9916-697b256aa497.jpg"
                  alt="Обучение"
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Form card */}
              <div className="relative p-8 border border-[#7B1D3A]/40"
                style={{ background: "linear-gradient(135deg, rgba(77,14,34,0.5), rgba(17,10,12,0.95))", backdropFilter: "blur(10px)" }}>
                <div className="absolute top-0 left-0 right-0 h-px"
                  style={{ background: "linear-gradient(90deg, transparent, #A62650, #C9A84C, transparent)" }} />

                <h3 className="font-cormorant text-2xl text-white mb-1">Записаться на мастер-класс</h3>
                <p className="font-montserrat text-xs text-white/30 mb-7 tracking-wide" style={{ fontWeight: 300 }}>
                  Ближайшая дата: <span className="text-[#C4748A]">уточняется</span>
                </p>

                <form className="space-y-4" onSubmit={(e) => e.preventDefault()}>
                  <div>
                    <label className="font-montserrat text-[9px] tracking-widest text-[#A62650]/80 uppercase block mb-2">Ваше имя</label>
                    <input type="text" placeholder="Анастасия"
                      className="w-full px-4 py-3 font-montserrat text-sm text-white/80 placeholder-white/20 focus:outline-none transition-colors"
                      style={{ background: "rgba(10,10,10,0.6)", border: "1px solid rgba(123,29,58,0.4)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(166,38,80,0.8)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(123,29,58,0.4)")} />
                  </div>
                  <div>
                    <label className="font-montserrat text-[9px] tracking-widest text-[#A62650]/80 uppercase block mb-2">Телефон</label>
                    <input type="tel" placeholder="+7 (900) 000-00-00"
                      className="w-full px-4 py-3 font-montserrat text-sm text-white/80 placeholder-white/20 focus:outline-none transition-colors"
                      style={{ background: "rgba(10,10,10,0.6)", border: "1px solid rgba(123,29,58,0.4)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(166,38,80,0.8)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(123,29,58,0.4)")} />
                  </div>
                  <div>
                    <label className="font-montserrat text-[9px] tracking-widest text-[#A62650]/80 uppercase block mb-2">Формат</label>
                    <select
                      className="w-full px-4 py-3 font-montserrat text-sm text-white/60 focus:outline-none transition-colors"
                      style={{ background: "rgba(10,10,10,0.8)", border: "1px solid rgba(123,29,58,0.4)" }}>
                      <option className="bg-[#0A0A0A]">Мини-группа (до 4 чел) — 3 500 ₽</option>
                      <option className="bg-[#0A0A0A]">Группа (до 8 чел) — 2 800 ₽</option>
                      <option className="bg-[#0A0A0A]">Онлайн-формат — 1 500 ₽</option>
                      <option className="bg-[#0A0A0A]">Индивидуальное обучение</option>
                    </select>
                  </div>
                  <div>
                    <label className="font-montserrat text-[9px] tracking-widest text-[#A62650]/80 uppercase block mb-2">Пожелания</label>
                    <textarea rows={3} placeholder="Есть ли опыт, что хочется освоить..."
                      className="w-full px-4 py-3 font-montserrat text-sm text-white/80 placeholder-white/20 focus:outline-none transition-colors resize-none"
                      style={{ background: "rgba(10,10,10,0.6)", border: "1px solid rgba(123,29,58,0.4)" }}
                      onFocus={(e) => (e.currentTarget.style.borderColor = "rgba(166,38,80,0.8)")}
                      onBlur={(e) => (e.currentTarget.style.borderColor = "rgba(123,29,58,0.4)")} />
                  </div>
                  <button type="submit" className="btn-gold w-full">
                    Записаться на мастер-класс
                  </button>
                </form>

                <p className="font-montserrat text-[9px] text-white/20 text-center mt-4 tracking-wide">
                  После заявки Поля свяжется с вами в течение 2 часов
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div className="gold-line mx-16 my-2 reveal" />

      {/* ===== FOOTER ===== */}
      <footer className="border-t border-[#C9A84C]/10 py-10 px-8 md:px-16">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="font-cormorant text-xl gold-text tracking-widest">WOW CAKES PNZ</p>
          <p className="font-montserrat text-[10px] tracking-widest text-white/20 uppercase">
            © 2024 Мастер кондитер Поля · Пенза
          </p>
          <div className="flex gap-6">
            {navItems.slice(0, 4).map((item) => (
              <button key={item.id} onClick={() => scrollTo(item.id)}
                className="font-montserrat text-[9px] tracking-widest text-white/30 hover:text-[#C9A84C] transition-colors uppercase">
                {item.label}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
}