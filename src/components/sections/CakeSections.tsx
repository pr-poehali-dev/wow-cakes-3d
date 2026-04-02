import Icon from "@/components/ui/icon";
import { C, CL, CAKE_IMAGES, SERVICES, REVIEWS } from "./constants";

interface CakeSectionsProps {
  selected3D: number;
  setSelected3D: (i: number) => void;
  scrollTo: (id: string) => void;
}

export default function CakeSections({ selected3D, setSelected3D, scrollTo }: CakeSectionsProps) {
  return (
    <>
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
                  className="portfolio-card flex-1 relative cursor-pointer"
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
    </>
  );
}
