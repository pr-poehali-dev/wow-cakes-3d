export const C = "#8B0000";
export const CL = "#B22222";
export const CD = "#5C0000";

export const CAKE_IMAGES = [
  { url: "https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/1791ea73-6041-45a8-9b01-0498ee4bf778.jpg", title: "Свадебный шедевр", tag: "Свадебные торты", price: "от 8 000 ₽/кг" },
  { url: "https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/903a8f99-23c0-41dd-a83e-6503c7a12fdd.jpg", title: "Цветочная фантазия", tag: "Авторские торты", price: "от 5 000 ₽/кг" },
  { url: "https://cdn.poehali.dev/projects/d87778a0-f9ce-465d-8715-3914d6075b70/files/4d971335-9420-4fc4-ac77-fa14663cebf6.jpg", title: "Шоколадный гламур", tag: "Праздничные торты", price: "от 4 500 ₽/кг" },
];

export const SERVICES = [
  { icon: "Crown", title: "Свадебные торты", desc: "Многоярусные шедевры для вашего главного дня. Ручная работа, живые цветы, золотые детали.", price: "от 8 000 ₽/кг" },
  { icon: "Sparkles", title: "Авторские торты", desc: "Уникальные дизайны под ваш запрос. 3D-фигуры, росписи, вафельная печать.", price: "от 5 000 ₽/кг" },
  { icon: "Gift", title: "Детские торты", desc: "Яркие, безопасные, незабываемые. Любимые персонажи в сладком воплощении.", price: "от 4 000 ₽/кг" },
  { icon: "Star", title: "Корпоративные заказы", desc: "Торты с логотипом, брендированные десерты для мероприятий любого масштаба.", price: "от 6 000 ₽/кг" },
  { icon: "Heart", title: "Муссовые торты", desc: "Зеркальная глазурь, воздушные текстуры, изысканные вкусовые сочетания.", price: "от 3 500 ₽/кг" },
  { icon: "Camera", title: "3D-торты", desc: "Реалистичные скульптуры из сахара. Машины, сумки, архитектура — всё возможно.", price: "от 10 000 ₽/кг" },
];

export const REVIEWS = [
  { name: "Анастасия К.", text: "Торт на свадьбу был просто невероятным! Все гости не могли поверить, что это съедобно. Поля — настоящий художник!", stars: 5, event: "Свадьба" },
  { name: "Елена М.", text: "Заказывала 3D-торт в форме сумки Chanel — точь-в-точь как настоящая! Вкус тоже потрясающий.", stars: 5, event: "День рождения" },
  { name: "Ирина В.", text: "Уже третий год подряд заказываю у Поли торты на детские праздники. Дети в восторге, я тоже!", stars: 5, event: "День рождения" },
  { name: "Мария Д.", text: "Корпоративный торт с нашим логотипом был идеален. Коллеги были поражены качеством работы.", stars: 5, event: "Корпоратив" },
];

export const NAV_ITEMS = [
  { id: "home", label: "Главная" },
  { id: "portfolio", label: "Портфолио" },
  { id: "services", label: "Услуги" },
  { id: "macarons", label: "Макарон" },
  { id: "masterclass", label: "Обучение" },
  { id: "about", label: "О мастере" },
  { id: "reviews", label: "Отзывы" },
  { id: "contact", label: "Заказ" },
];

export const inputStyle = {
  background: "#fff",
  border: "1px solid rgba(139,0,0,0.2)",
  color: "#1A1A1A",
};

export const inputFocus = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(139,0,0,0.6)";
  e.currentTarget.style.boxShadow = "0 0 0 3px rgba(139,0,0,0.06)";
};

export const inputBlur = (e: React.FocusEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
  e.currentTarget.style.borderColor = "rgba(139,0,0,0.2)";
  e.currentTarget.style.boxShadow = "none";
};
