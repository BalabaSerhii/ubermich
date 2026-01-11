// components/ui/LanguageSwitcher.tsx
"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useRouter, usePathname } from "next/navigation";

interface Language {
  code: "de" | "ru" | "uk" | "en";
  name: string;
  nativeName: string;
}

const languages: Language[] = [
  {
    code: "de",
    name: "DE",
    nativeName: "Deutsch",
  },
  {
    code: "ru",
    name: "RU",
    nativeName: "Русский",
  },
  {
    code: "uk",
    name: "UK",
    nativeName: "Українська",
  },
  {
    code: "en",
    name: "EN",
    nativeName: "English",
  },
];

export default function LanguageSwitcher() {
  const [isOpen, setIsOpen] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const dropdownRef = useRef<HTMLDivElement>(null);
  const buttonRef = useRef<HTMLButtonElement>(null);

  // Извлекаем текущий язык из пути
  const getCurrentLang = () => {
    const pathSegments = pathname.split("/").filter(Boolean);
    const langFromPath = pathSegments[0] as Language["code"];
    
    const foundLang = languages.find(lang => lang.code === langFromPath);
    return foundLang || languages[3]; // По умолчанию English
  };

  const [selectedLang, setSelectedLang] = useState<Language>(getCurrentLang());

  // Обновляем выбранный язык при изменении пути
  useEffect(() => {
    setSelectedLang(getCurrentLang());
  }, [pathname]);

  // Закрытие по клику вне области и по Escape
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        buttonRef.current &&
        !buttonRef.current.contains(event.target as Node)
      ) {
        setIsOpen(false);
      }
    };

    const handleEscapeKey = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    document.addEventListener("keydown", handleEscapeKey);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
      document.removeEventListener("keydown", handleEscapeKey);
    };
  }, []);

  const handleSelect = (lang: Language) => {
    setSelectedLang(lang);
    setIsOpen(false);
    
    // Изменяем путь с учетом нового языка
    const pathSegments = pathname.split("/").filter(Boolean);
    
    // Если первый сегмент - это язык из нашего списка, заменяем его
    if (pathSegments.length > 0 && languages.some(l => l.code === pathSegments[0])) {
      pathSegments[0] = lang.code;
    } else {
      // Если язык не указан в пути, добавляем его первым
      pathSegments.unshift(lang.code);
    }
    
    // Формируем новый путь
    const newPath = `/${pathSegments.join("/")}`;
    router.push(newPath);
  };

  return (
    <>
      {/* Затемнение фона при открытом меню */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-40 bg-black/20 backdrop-blur-[1px]"
            onClick={() => setIsOpen(false)}
            aria-hidden="true"
          />
        )}
      </AnimatePresence>

      <div className="relative" ref={dropdownRef}>
        {/* Кнопка переключателя с iOS стилем */}
        <motion.button
          ref={buttonRef}
          className="group flex items-center gap-2 rounded-2xl bg-white/10 backdrop-blur-sm px-3 py-1.5 shadow-sm transition-all duration-200 hover:bg-white/20 hover:shadow-md"
          onClick={() => setIsOpen(!isOpen)}
          whileTap={{ scale: 0.97 }}
          aria-expanded={isOpen}
          aria-label="Select language"
        >
          <span className="text-sm font-medium text-white transition-colors group-hover:text-white/90">
            {selectedLang.name}
          </span>
          <motion.svg
            animate={{ rotate: isOpen ? 180 : 0 }}
            className="h-4 w-4 text-white/80 transition-colors group-hover:text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 9l-7 7-7-7"
            />
          </motion.svg>
        </motion.button>

        {/* Меню языков с iOS стилем */}
        <AnimatePresence>
          {isOpen && (
            <motion.div
              initial={{ opacity: 0, y: -5, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: -5, scale: 0.95 }}
              transition={{ type: "spring", damping: 20, stiffness: 300 }}
              className="absolute left-0 top-full z-50 mt-2 min-w-[200px] rounded-2xl bg-white/10 backdrop-blur-xl p-2 shadow-2xl border border-white/20"
              role="menu"
            >
              <div className="mb-2 px-3 py-1.5">
                <p className="text-xs font-semibold uppercase tracking-wider text-white/70">
                  Select Language
                </p>
              </div>

              {languages.map((lang, index) => (
                <motion.button
                  key={lang.code}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  transition={{
                    delay: index * 0.05,
                    type: "spring",
                    stiffness: 300,
                  }}
                  className={`group relative flex w-full items-center justify-between rounded-xl px-3 py-2.5 transition-all duration-150 ${
                    selectedLang.code === lang.code
                      ? "bg-white/30 text-white"
                      : "text-white/90 hover:bg-white/20"
                  }`}
                  onClick={() => handleSelect(lang)}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  role="menuitem"
                >
                  <div className="flex flex-col items-start">
                    <span className="text-sm font-medium">{lang.name}</span>
                    <span className="text-xs text-white/70 transition-colors group-hover:text-white/90">
                      {lang.nativeName}
                    </span>
                  </div>

                  {selectedLang.code === lang.code && (
                    <motion.svg
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="h-4 w-4 text-white"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                      strokeWidth={2.5}
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M5 13l4 4L19 7"
                      />
                    </motion.svg>
                  )}
                </motion.button>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </>
  );
}