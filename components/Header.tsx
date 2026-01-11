"use client";
import { useState, useEffect, useMemo } from "react";
import {
  FaInstagram,
  FaWhatsapp,
  FaFacebook,
  FaTelegram,
  FaAlignRight,
  FaTimes,
} from "react-icons/fa";
import { usePathname } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { ThemeToggle } from "./theme-toggle";
import DropdownMenu from "../components/DropdownMenu";
import { Link } from "@/i18n/navigation";

const navLinks = [
  { href: "/", label: "Home" },
  { href: "/preisliste", label: "Preisliste" },
  { href: "/about", label: "Über uns" },
  { href: "/contacts", label: "Kontakt" },
  { href: "/blog", label: "Blog" },
];

const socialLinks = [
  {
    href: "https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen",
    icon: FaWhatsapp,
    label: "WhatsApp",
  },
  {
    href: "https://instagram.com/balabastudio_glauburg",
    icon: FaInstagram,
    label: "Instagram",
  },
  {
    href: "https://facebook.com/profile.php?id=61571893245558",
    icon: FaFacebook,
    label: "Facebook",
  },
  {
    href: "https://t.me/balabastudio",
    icon: FaTelegram,
    label: "Telegram",
  },
];

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(true);
  const [isAtTop, setIsAtTop] = useState(true);
  const [lastScrollY, setLastScrollY] = useState(0);
  const pathName = usePathname();

  const normalizePath = (p?: string) => {
    if (!p) return "/";
    try {
      let path = decodeURI(p);
      if (!path.startsWith("/")) path = "/" + path;
      if (path.length > 1 && path.endsWith("/")) path = path.slice(0, -1);
      return path;
    } catch {
      return p;
    }
  };

  const currentPath = useMemo(() => normalizePath(pathName ?? "/"), [pathName]);

  const toggleMenu = () => {
    setIsMenuOpen((s) => !s);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
  };

  useEffect(() => {
    const controlHeader = () => {
      const currentScrollY = window.scrollY ?? 0;
      const atTop = currentScrollY < 10;
      setIsAtTop(atTop);

      if (atTop) {
        setIsVisible(true);
      } else if (currentScrollY < lastScrollY) {
        setIsVisible(true);
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false);
      }
      setLastScrollY(currentScrollY);
    };

    window.addEventListener("scroll", controlHeader, { passive: true });
    return () => window.removeEventListener("scroll", controlHeader);
  }, [lastScrollY]);

  useEffect(() => {
    const floatingButton = document.querySelector(
      ".fixed.bottom-6.right-6"
    ) as HTMLElement | null;

    if (isMenuOpen) {
      document.body.style.overflow = "hidden";
      if (floatingButton) floatingButton.style.display = "none";
    } else {
      document.body.style.overflow = "";
      if (floatingButton) floatingButton.style.display = "block";
    }

    return () => {
      document.body.style.overflow = "";
      if (floatingButton) floatingButton.style.display = "block";
    };
  }, [isMenuOpen]);

  return (
    <>
      {/* Основной хедер */}
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 rounded-b-4xl
        `}
        initial={{ y: 0 }}
        animate={{ y: isVisible ? 0 : -100 }}
        transition={{ type: "spring", damping: 25, stiffness: 200 }}
        role="banner"
      >
        {/* Контейнер для контента хедера */}
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-7xl">
          <div className="flex justify-between items-center py-3 sm:py-4 lg:py-4">
            {/* Логотип */}
            <Link
              href="/"
              className="z-50 flex items-center gap-3 group"
              aria-label="Zur Startseite"
            >
              <p className="text-primary font-semibold text-lg  transition-all duration-300  backdrop-blur-sm shadow-lg py-1.5 px-2 rounded-2xl">
                <span className="text-red-500"> B</span>alaba <span className="text-red-500">D</span>igital
              </p>
            </Link>

            {/* Десктопная навигация */}
            <nav
              className="hidden lg:block transition-all duration-300 backdrop-blur-sm shadow-lg py-1.5 px-2 rounded-2xl"
              role="navigation"
              aria-label="Hauptnavigation"
            >
              <ul className="flex gap-6 xl:gap-8 text-sm xl:text-base">
                {navLinks.map((link) => {
                  // Убираем языковой префикс из текущего пути для сравнения
                  const pathSegments = currentPath.split("/").filter(Boolean);
                  const hasLangPrefix = ["de", "ru", "uk", "en"].includes(
                    pathSegments[0]
                  );

                  // Текущий путь без языкового префикса
                  const pathWithoutLang = hasLangPrefix
                    ? "/" + pathSegments.slice(1).join("/")
                    : currentPath;

                  const linkPath = normalizePath(link.href);
                  const isActive =
                    linkPath === pathWithoutLang ||
                    (linkPath !== "/" && pathWithoutLang.startsWith(linkPath));

                  return (
                    <li key={link.href} className="relative">
                      <Link
                        href={link.href}
                        className={`transition-colors px-2 py-1 relative inline-block ${
                          isActive
                            ? "text-[var(--chart-2)] "
                            : "text-[var(--primary)] hover:text-[var(--chart-5)]"
                        }`}
                        aria-current={isActive ? "page" : undefined}
                      >
                        {link.label}
                      </Link>

                      {/* Плавно перетекающий индикатор */}
                      <AnimatePresence mode="wait">
                        {isActive && (
                          <motion.div
                            key={`indicator-${link.href}-${isActive}`}
                            className="absolute -bottom-1 left-0 right-0 h-2 overflow-hidden"
                            initial={{ opacity: 0, scaleX: 0 }}
                            animate={{ opacity: 1, scaleX: 1 }}
                            exit={{ opacity: 0, scaleX: 0 }}
                            transition={{
                              type: "spring",
                              stiffness: 300,
                              damping: 30,
                              duration: 0.3,
                            }}
                          >
                            <motion.div
                              className="w-6 h-0.5 bg-[var(--chart-5)] rounded-4xl mx-auto"
                              animate={{
                                x: ["-20%", "20%", "-20%"],
                              }}
                              transition={{
                                duration: 3,
                                repeat: Infinity,
                                times: [0, 0.5, 1],
                                ease: "easeInOut",
                              }}
                            />
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </li>
                  );
                })}
              </ul>
            </nav>

            {/* Социальные иконки (только для планшетов и десктопов) */}
            <div className="hidden lg:flex items-center mg:hidden">
              <ul className="flex gap-3 lg:gap-4 transition-all duration-300  backdrop-blur-sm shadow-lg py-1.5 px-2 rounded-2xl">
                {socialLinks.map((s) => {
                  const Icon = s.icon;
                  return (
                    <li key={s.label}>
                      <a
                        href={s.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-[var(--chart-5)] transition-colors "
                        aria-label={s.label}
                      >
                        <Icon size={18} className="lg:w-5 lg:h-5" />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
            <div className="flex gap-4 items-center">
              <ThemeToggle />
              <DropdownMenu />
            </div>
            {/* Кнопка меню для мобильных */}
            <button
              onClick={toggleMenu}
              className="lg:hidden p-2 text-gray-400 hover:text-[var(--primary)] transition-colors z-50"
              aria-label={isMenuOpen ? "Menü schließen" : "Menü öffnen"}
              aria-expanded={isMenuOpen}
              aria-controls="mobile-menu"
            >
              {isMenuOpen ? (
                <FaTimes size={20} className="sm:w-6 sm:h-6" />
              ) : (
                <FaAlignRight
                  size={20}
                  className="sm:w-6 sm:h-6"
                  style={{ color: "var(--primary)" }}
                />
              )}
            </button>
          </div>
        </div>
      </motion.header>

      {/* Мобильное меню */}
      <AnimatePresence>
        {isMenuOpen && (
          <>
            {/* Затемнение фона */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/50 lg:hidden z-40"
              onClick={closeMenu}
            />

            {/* Боковое меню */}
            <motion.aside
              id="mobile-menu"
              role="dialog"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              className="fixed top-0 right-0 bottom-0 w-80 max-w-full bg-white shadow-xl lg:hidden z-50 overflow-y-auto"
            >
              {/* Кнопка закрытия */}
              <div className="absolute top-4 right-4 z-50">
                <button
                  onClick={closeMenu}
                  aria-label="Menü schließen"
                  className="p-2 text-gray-500 hover:text-[var(--primary)] transition-colors"
                >
                  <FaTimes size={20} />
                </button>
              </div>

              <div className="flex flex-col h-full pt-16 pb-8 px-6">
                {/* Навигация */}
                <nav className="flex-1" aria-label="Mobile Navigation">
                  <ul className="space-y-3">
                    {navLinks.map((link, index) => {
                      const linkPath = normalizePath(link.href);
                      const isActive =
                        linkPath === currentPath ||
                        (linkPath !== "/" && currentPath.startsWith(linkPath));
                      return (
                        <motion.li
                          key={link.href}
                          initial={{ x: 20, opacity: 0 }}
                          animate={{ x: 0, opacity: 1 }}
                          transition={{ delay: index * 0.05 }}
                        >
                          <Link
                            href={link.href}
                            onClick={closeMenu}
                            className={`flex items-center px-4 py-3 rounded-xl transition-all text-lg ${
                              isActive
                                ? "text-[var(--primary)] bg-green-50 font-semibold border-l-4 border-[var(--primary)]"
                                : "text-gray-700 hover:text-[var(--primary)] hover:bg-gray-50"
                            }`}
                            aria-current={isActive ? "page" : undefined}
                          >
                            {link.label}
                          </Link>
                        </motion.li>
                      );
                    })}
                  </ul>
                </nav>

                {/* Социальные иконки и CTA */}
                <div className="border-t border-gray-200 pt-6 mt-6">
                  <p className="text-sm text-gray-600 mb-4 text-center">
                    Folgen Sie uns
                  </p>
                  <ul className="flex justify-center gap-5 mb-6">
                    {socialLinks.map((s) => {
                      const Icon = s.icon;
                      return (
                        <li key={s.label}>
                          <a
                            href={s.href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-gray-600 hover:text-[var(--primary)] transition-colors p-2"
                            onClick={closeMenu}
                            aria-label={s.label}
                          >
                            <Icon size={22} />
                          </a>
                        </li>
                      );
                    })}
                  </ul>

                  {/* CTA кнопка */}
                  <div className="px-2">
                    <a
                      href="https://wa.me/4915124908000?text=Hallo,%20ich%20interessiere%20mich%20für%20Ihre%20Dienstleistungen"
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={closeMenu}
                      className="flex items-center justify-center gap-3 w-full bg-[var(--primary)] text-white py-4 px-6 rounded-xl font-semibold hover:bg-green-700 transition-colors shadow-lg"
                    >
                      <FaWhatsapp size={20} />
                      Termin buchen
                    </a>
                  </div>
                </div>
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
