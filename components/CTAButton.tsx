export default function CTAButton() {
  return (
    <section className="bg-white dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto max-w-7xl sm:py-16 lg:px-6">
        <div className="mx-auto max-w-screen-sm text-center">
          <h2 className="mb-4 text-4xl tracking-tight font-extrabold leading-tight text-gray-900 dark:text-white">
Просто скажи какая у тебя цель и я подберу оптимальный вариант          </h2>
          <p className="mb-6 font-light text-gray-500 dark:text-gray-400 md:text-lg">
            Бесплатная консультация, которая не к чему не обязывает
          </p>
          <a
            href="#"
            className=" bg-primary hover:bg-blue-700 focus:ring-4 focus:ring-primary font-medium rounded-lg text-sm px-5 py-2.5 mr-2 mb-2 dark:bg-primary dark:hover:bg-primary focus:outline-none dark:focus:ring-primary"
          >
            Free trial for 30 days
          </a>
        </div>
      </div>
    </section>
  );
}
