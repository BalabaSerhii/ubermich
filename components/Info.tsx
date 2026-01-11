import Image from "next/image";

interface InfoProps {
  reverse?: boolean;
}

export default function Info({ reverse = false }: InfoProps) {
  return (
    <>
      <section className="bg-white dark:bg-gray-900">
        <div className="gap-16 items-center py-8 px-4 mx-auto max-w-7xl lg:grid lg:grid-cols-2 lg:py-16 lg:px-6">
          <div
            className={`font-light text-gray-500 sm:text-lg dark:text-gray-400 ${
              reverse ? "lg:order-2" : ""
            }`}
          >
            {" "}
            <h2 className="mb-4 text-4xl tracking-tight font-extrabold text-gray-900 dark:text-white">
              We didn't reinvent the wheel
            </h2>
            <p className="mb-4">
              We are strategists, designers and developers. Innovators and
              problem solvers. Small enough to be simple and quick, but big
              enough to deliver the scope you want at the pace you need. Small
              enough to be simple and quick, but big enough to deliver the scope
              you want at the pace you need.
            </p>
            <p>
              We are strategists, designers and developers. Innovators and
              problem solvers. Small enough to be simple and quick.
            </p>
          </div>
          <div
            className={`grid grid-cols-2 gap-4 mt-8 ${
              reverse ? "lg:order-1" : ""
            }`}
          >
            <Image
              className="w-full rounded-lg"
              src="/stack/js.svg"
              width={30}
              height={30}
              alt="office content 1"
            />
            <Image
              className="mt-4 w-full lg:mt-10 rounded-lg"
              src="/stack/css.svg"
              alt="office content 2"
              width={30}
              height={30}
            />
          </div>
        </div>
      </section>
    </>
  );
}
