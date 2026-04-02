import { useEffect, useRef, useState } from "react";
import HeroNav from "@/components/sections/HeroNav";
import CakeSections from "@/components/sections/CakeSections";
import MacaronSections from "@/components/sections/MacaronSections";

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

  return (
    <div style={{ background: "#FAF7F4", color: "#1A1A1A" }} className="min-h-screen overflow-x-hidden">
      <HeroNav
        activeSection={activeSection}
        mousePos={mousePos}
        cursorRing={cursorRing}
        isHovering={isHovering}
        rotateX={rotateX}
        rotateY={rotateY}
        menuOpen={menuOpen}
        heroRef={heroRef}
        onHeroMouseMove={handleHeroMouse}
        scrollTo={scrollTo}
        setMenuOpen={setMenuOpen}
      />
      <CakeSections
        selected3D={selected3D}
        setSelected3D={setSelected3D}
        scrollTo={scrollTo}
      />
      <MacaronSections scrollTo={scrollTo} />
    </div>
  );
}
