import { ArrowDown, Sparkles } from "lucide-react";
import TestForm from "./TestForm";
import { getTranslations } from "next-intl/server";

export default async function Hero() {
  const t = await getTranslations("home-page.hero");

  return (
    <>
      <section className="relative min-h-screen flex items-center justify-center px-4">
        <div className="text-center">
          <div className="inline-flex gap-2 bg-white rounded-2xl px-4 py-2 items-center mb-6">
            <Sparkles className="w-4 h-4 text-[#6B9FED]" />
            <span className="text-sm md:text-base">
              {t('Premium')}
            </span>
          </div>
          <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold max-w-6xl">
            {t("title")}

          </h1>
          <span>{t('jjjjjj')} </span>
          {/* <TestForm/> */}
        </div>
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-wiggle">
          <ArrowDown className="w-12 h-12 bg-white md:w-12 md:h-12 p-3 rounded-full shadow-lg animate-bounce-slow" />{" "}
        </div>
      </section>
    </>
  );
}

// import { ArrowDown, Sparkles } from "lucide-react";

// export default function Hero() {
//   return (
//     <>
//       <section className="relative min-h-screen flex items-center justify-center px-4">
//         {/* Основной контент */}
//         <div className="text-center">
//           <div className="inline-flex gap-2 bg-white rounded-2xl px-4 py-2 items-center mb-6">
//             <Sparkles className="w-4 h-4 text-[#6B9FED]" />
//             <span className="text-sm md:text-base">
//               Premium Web Development aus Deutschland
//             </span>
//           </div>
//           <h1 className="text-4xl md:text-6xl lg:text-8xl xl:text-9xl font-bold max-w-6xl">
//             Digitale Erlebnisse, die begeistern
//           </h1>
//         </div>

//         {/* Стрелка, прикрепленная к нижнему краю */}
//         <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2">
//           <ArrowDown className="w-12 h-12 md:w-16 md:h-16 p-3 bg-white rounded-full shadow-lg animate-bounce" />
//         </div>
//       </section>
//     </>
//   );
// }
