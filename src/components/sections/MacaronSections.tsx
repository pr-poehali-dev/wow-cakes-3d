import Icon from "@/components/ui/icon";
import { C, CL, CD, NAV_ITEMS, inputStyle, inputFocus, inputBlur } from "./constants";

interface MacaronSectionsProps {
  scrollTo: (id: string) => void;
}

export default function MacaronSections({ scrollTo }: MacaronSectionsProps) {
  return (
    <>
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
            {NAV_ITEMS.slice(0, 5).map((item) => (
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
    </>
  );
}
