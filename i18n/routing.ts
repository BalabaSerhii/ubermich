import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ["en", "de", "ru", "uk"],

  // Used when no locale matches
  defaultLocale: "de",
  localePrefix: "always",
  localeDetection: false,
});
