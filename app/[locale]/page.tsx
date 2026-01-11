// import ContentSections from "@/components/ContentSections";
// import CTAButton from "@/components/CTAButton";
// import Example from "@/components/Example";
// import Info from "@/components/Info";
// import ListAdvantages from "@/components/ListAdvantages";
// import TechRender from "@/components/techRender";
// import Photo3DEffect from "@/components/Photo3DEffect";
// import Rofl from "@/components/Rofl";
// import Hero from "@/components/Hero";
// export default function Home() {
//   return (
//     <>
//       <Hero />
//       <ContentSections />
//       <Photo3DEffect />
//       {/* <Rofl /> */}
//       <Info />
//       <Info reverse={true} />
//       <TechRender />
//       <ListAdvantages />
//       <CTAButton />
//       <Example />
//     </>
//   );
// }

import ContentSections from "@/components/ContentSections";
import CTAButton from "@/components/CTAButton";
import Example from "@/components/Example";
import Info from "@/components/Info";
import ListAdvantages from "@/components/ListAdvantages";
import TechRender from "@/components/techRender";
import Photo3DEffect from "@/components/Photo3DEffect";
import Rofl from "@/components/Rofl";
import Hero from "@/components/Hero";

// === 1. ИМПОРТ КОМПОНЕНТА КВИЗА И ТИПОВ ===
import Quiz from "@/components/Quiz";
// import { QuizQuestion } from "@/types/quiz";
// ==========================================

// // === 2. КОНФИГУРАЦИЯ ВОПРОСОВ (Серверная часть) ===
// const КОНФИГУРАЦИЯ_ВОПРОСОВ: QuizQuestion[] = [
//   {
//     id: "Q1_ТипПродукта",
//     type: "single-choice",
//     label: "Какой продукт или услуга вас интересует?",
//     required: true,
//     options: [
//       { value: "web", label: "Веб-сайт или корпоративный портал" },
//       { value: "mobile", label: "Мобильное приложение (iOS/Android)" },
//       { value: "design", label: "Только UX/UI Дизайн" },
//     ],
//   },
//   {
//     id: "Q2_Сфера",
//     type: "single-choice",
//     label: "К какой сфере относится ваш проект?",
//     required: true,
//     options: [
//       { value: "ecom", label: "Электронная коммерция / Retail" },
//       { value: "service", label: "Сфера услуг / B2B" },
//       { value: "fintech", label: "FinTech / Криптовалюты" },
//       { value: "other", label: "Другое" },
//     ],
//   },
//   {
//     id: "Q3_Бюджет",
//     type: "number-input",
//     label: "Укажите ваш примерный бюджет в валюте:",
//     required: true,
//   },
//   {
//     id: "Q4_Сроки",
//     type: "text-input",
//     label: "Обозначьте желаемые сроки реализации проекта:",
//     required: false,
//   },
// ];
// ==================================================

export default function Home() {
  return (
    <>
      <Hero />
      <ContentSections />
      <Photo3DEffect />
      {/* <Rofl /> */}
      <Info />
      <Info reverse={true} />
      <TechRender />
      <ListAdvantages />

      {/* === 3. ВСТАВКА КОМПОНЕНТА КВИЗА === */}
      {/* Разместите его перед CTAButton, чтобы получить контакты перед финальным призывом */}
      {/* <section className="py-12 md:py-20 bg-white dark:bg-gray-900">
        <h2 className="text-3xl font-bold text-center mb-10 text-gray-800 dark:text-white">
          Рассчитайте стоимость вашего проекта за 1 минуту
        </h2>
        <Quiz questions={КОНФИГУРАЦИЯ_ВОПРОСОВ} />
      </section> */}
      {/* ==================================== */}

      <CTAButton />
      <Example />
    </>
  );
}
