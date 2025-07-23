import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faInfo } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function About() {
  return (
    <section id="about" className="rounded-[15px] text-white py-16">
      <div className="max-w-7xl mx-auto px-4">
        <div className="flex flex-col md:flex-row gap-12 items-stretch">
          {/* Левая колонка */}
          <div className="md:w-1/2 flex flex-col justify-between">
            {/* "Кто мы" + описание */}
            <div className="mb-8">
              <h5 className="mb-4 flex items-center gap-3 text-2xl font-semibold">
                О нас
              </h5>
              <p className="text-white max-w-md">
                Предлагаем широкий выбор моделей, прошедших нашу проверку
              </p>
            </div>

            {/* Иконки — выровнены строго по левому краю */}
            <div className="grid grid-cols-2 gap-4 items-start">
              <div className="flex flex-col items-start text-left p-0">
                <Image
                  src="/images/icons/reviews.png"
                  alt="Отзывы"
                  width={160}
                  height={160}
                  quality={100}
                  priority
                  className="mb-2"
                />
                <h3 className="text-3xl font-bold">50+</h3>
                <p className="mt-2 text-sm">Отзывов</p>
              </div>
              <div className="flex flex-col items-scetart text-left p-0">
                <Image
                  src="/images/icons/clients.png"
                  alt="Клиенты"
                  width={160}
                  height={160}
                  priority
                  quality={100}
                  className="mb-2"
                />
                <h3 className="text-3xl font-bold">0+</h3>
                <p className="mt-2 text-sm">Довольных клиентов</p>
              </div>
            </div>
          </div>

          {/* Правая колонка */}
          <div className="md:w-1/2 flex flex-col justify-between gap-6">
            {/* Заголовок */}
            <h2 className="font-druk-sans text-4xl sm:text-5xl font-bold mb-6 text-white drop-shadow leading-tight">
              Обеспечиваем{" "}
              <br />
              <span className="text-gray-500">прямые поставки</span>
              <br />
              автомобилей
            </h2>

            {/* Карточки */}
            <div className="flex flex-col md:flex-row gap-6">
              <div className="flex-1 bg-zinc-800 p-6 rounded-[15px]">
                <h5 className="text-xl font-semibold mb-3">Качество</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Мы ставим качество во главу угла каждого аспекта нашей
                  деятельности. Для нас это не просто слово, а фундаментальный
                  принцип, воплощаемый в жизнь через всеобъемлющую систему
                  строжайшего контроля качества на всех этапах оказания услуг
                </p>
              </div>
              <div className="flex-1 bg-zinc-800 p-6 rounded-[15px]">
                <h5 className="text-xl font-semibold mb-3">Широкий выбор</h5>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Мы доставляем нашим клиентам по-настоящему обширный и
                  разнообразный парк автомобилей, способный удовлетворить самые
                  разные потребности и предпочтения. Каждый автомобиль тщательно
                  проверен, чтобы клиент получилидеальный вариант для своих
                  целей.
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
