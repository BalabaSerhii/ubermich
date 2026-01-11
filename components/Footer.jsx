"use client";

import Image from "next/image";
import Link from "next/link";
import {
  FaFacebook,
  FaInstagram,
  FaTelegram,
  FaWhatsapp,
} from "react-icons/fa";

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

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-[#222222] text-white border-t border-gray-700 mt-auto rounded-t-4xl">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
        {/* === Основная сетка === */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* === Бренд и контакты === */}
          <section
            className="flex flex-col items-center md:items-start text-center md:text-left space-y-4"
            aria-labelledby="company-info"
          >
            <div id="company-info" className="sr-only">
              Firmeninformationen
            </div>

            <Link
              href="/"
              className="group"
              aria-label="Balaba Digital Startseite"
            >
              <Image
                src="/logo1.png"
                alt="Balaba Digital - Professionelle Web-Entwicklung in Hessen"
                width={100}
                height={60}
                className="mx-auto md:mx-0 transition-transform group-hover:scale-105 duration-300"
                priority
                unoptimized
              />
            </Link>

            <address className="not-italic space-y-2 text-gray-300 leading-relaxed">
              <a
                href="https://www.google.com/maps/place/Balaba+Massage+Studio/"
                className="hover:text-[var(--primary)] transition-colors duration-300 flex items-center justify-center md:justify-start gap-2 group"
                target="_blank"
                rel="noopener noreferrer"
              >
                <span>
                  Herrnstrasse 37, <br />
                  63695 Glauburg-Stockheim, Deutschland
                </span>
              </a>
              <a
                href="mailto:balabamassage@gmail.com"
                className="hover:text-[var(--primary)] transition-colors duration-300 block group "
              >
                <span>balabamassage@gmail.com</span>
              </a>
              <a
                href="tel:+4915124908000"
                className="hover:text-[var(--primary)] transition-colors duration-300 block group font-semibold"
              >
                <span>+49 151 24908000</span>
              </a>
            </address>
          </section>

          {/* === Навигация === */}
          <nav
            className="flex flex-col items-center md:items-center"
            aria-labelledby="footer-navigation"
          >
            <h2
              id="footer-navigation"
              className="text-lg font-semibold mb-4 text-white"
            >
              Navigation
            </h2>
            <ul className="space-y-2 text-center">
              {[
                { href: "/", label: "Home" },
                { href: "/preisliste", label: "Preisliste" },
                { href: "/about", label: "Über uns" },
                { href: "/contacts", label: "Kontakt" },
                { href: "/blog", label: "Blog" },
              ].map((item) => (
                <li key={item.href}>
                  <Link
                    href={item.href}
                    className="text-gray-300 hover:text-[var(--primary)] transition-colors duration-300 font-medium group flex items-center justify-center gap-2"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* === Соцсети и время работы === */}
          <section
            className="flex flex-col items-center md:items-end text-center md:text-right space-y-6"
            aria-labelledby="business-hours"
          >
            <div>
              <h2
                id="business-hours"
                className="text-lg font-semibold mb-3 text-white"
              >
                Erreichbarkeit
              </h2>
              <div className="text-gray-300 space-y-1 leading-relaxed text-sm">
                <p className="flex flex-col sm:flex-row sm:justify-center md:justify-end sm:items-center gap-1">
                  <span className="font-medium">Mo – So:</span>
                  <span>09:00 – 21:00</span>
                </p>
                <p className="text-amber-300 font-medium bg-amber-900/20 px-3 py-2 rounded-lg mt-2">
                  Nur nach vorheriger Absprache
                </p>
              </div>
            </div>

            <div>
              <h3 className="text-base font-semibold mb-3">Folgen Sie uns</h3>
              <ul className="flex justify-center md:justify-end gap-3">
                {socialLinks.map((social) => {
                  const Icon = social.icon;
                  return (
                    <li key={social.label}>
                      <a
                        href={social.href}
                        target="_blank"
                        rel="noopener noreferrer nofollow"
                        className="text-gray-400 hover:text-[var(--primary)] transition-all duration-300 inline-flex items-center justify-center w-10 h-10 bg-gray-800 rounded-lg hover:bg-gray-700 hover:scale-110"
                        aria-label={`Folgen Sie uns auf ${social.label}`}
                      >
                        <Icon size={18} />
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </section>
        </div>

        {/* === Нижняя часть === */}
        <section
          className="border-t border-gray-700 pt-6"
          aria-labelledby="legal-info"
        >
          <div id="legal-info" className="sr-only">
            Rechtliche Informationen
          </div>

          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 text-center">
            <div className="space-y-1">
              <p className="font-medium text-white">
                © 2022-{year} Balaba Digital – Alle Rechte vorbehalten.
              </p>
            </div>

            <nav
              aria-label="Rechtliche Links"
              className="flex justify-center md:justify-end gap-4"
            >
              <Link
                href="/impressum"
                className="text-gray-300 hover:text-[var(--primary)] transition-colors duration-300 font-medium hover:underline text-sm"
              >
                Impressum
              </Link>
              <Link
                href="/datenschutz"
                className="text-gray-300 hover:text-[var(--primary)] transition-colors duration-300 font-medium hover:underline text-sm"
              >
                Datenschutz
              </Link>
            </nav>
          </div>
        </section>
      </div>
    </footer>
  );
}
