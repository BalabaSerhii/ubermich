"use client";
import Image from "next/image";
import { techStack } from "../data/techStack";
import { motion } from "framer-motion";
import { useEffect, useState } from "react";

export default function TechRender() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % techStack.length);
    }, 800);

    return () => clearInterval(interval);
  }, []);

  // Чтобы избежать hydration mismatch
  if (!isClient) {
    return (
      <section className="mt-50">
        <h3 className="text-4xl text-center mb-15">Wir arbeiten mit:</h3>
        <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
          {techStack.map((tech, i) => (
            <li
              key={i}
              className="p-6 bg-[var(--secondary)] rounded-3xl flex flex-col items-center justify-center"
            >
              <Image
                src={tech.src}
                alt={tech.alt}
                width={70}
                height={70}
                title={tech.description}
                priority
                unoptimized
              />
              <p className="mt-4 text-lg text-[var(--background)] font-medium text-center">
                {tech.title}
              </p>
            </li>
          ))}
        </ul>
      </section>
    );
  }

  return (
    <section className="mt-50">
      <h3 className="text-4xl text-center mb-15">Wir arbeiten mit:</h3>
      <ul className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
        {techStack.map((tech, i) => (
          <li
            key={i}
            className="relative p-6 bg-[var(--secondary)] rounded-3xl flex flex-col items-center justify-center"
          >
            {/* Анимированный ток - подсветка карточки */}
            <motion.div
              className="absolute inset-0 rounded-3xl border-3 border-[var(--primary)]"
              animate={{
                opacity: currentIndex === i ? [0, 1, 0] : 0,
                scale: currentIndex === i ? [1, 1.03, 1] : 1,
              }}
              transition={{
                duration: 0.8,
                ease: "easeInOut",
              }}
            />
            
            <Image
              src={tech.src}
              alt={tech.alt}
              width={70}
              height={70}
              title={tech.description}
              priority
              unoptimized
              className="transition-transform duration-300 hover:scale-110 z-10 relative"
            />
            <p className="mt-4 text-lg text-[var(--background)] font-medium text-center z-10 relative">
              {tech.title}
            </p>
          </li>
        ))}
      </ul>
    </section>
  );
}