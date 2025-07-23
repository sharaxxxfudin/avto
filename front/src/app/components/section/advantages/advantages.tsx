import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircle } from "@fortawesome/free-solid-svg-icons";
import Image from "next/image";

export default function Advantages() {
  return (
    <section id="advantages" className="rounded-[25px] bg-[#ffffff] py-16">
      <div className="container mx-auto px-4 max-w-7xl">
        {/* Заголовок */}
        <div className="mb-12 max-w-md">
          <h5 className="mb-5 flex items-center gap-3 text-lg font-semibold text-black">
            <span>Преимущества</span>
          </h5>
          <h1 className="font-druk-sans  text-4xl sm:text-5xl font-bold text-black">
            <span className="block">С нами</span>
            <span className="block text-[#e01a31]">безопасно</span>
          </h1>
        </div>

        {/* Карточки */}
        <div className="flex flex-col md:flex-row gap-8">
          {/* Левая карточка */}
          <div className="relative bg-[#4954681a] py-16  rounded-[15px] p-8 md:w-1/2">
            <div className="absolute -top-16 right-0 w-48 h-auto z-10">
              <Image
                src="/images/icons/delivery.png"
                alt="Доставка"
                width={200}
                height={200}
                quality={100}
                priority
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl text-black font-bold mb-4">
              СРОКИ ДОСТАВКИ
            </h2>
            <p className="mt-2 text-black">
              Ваш автомобиль будет доставлен в России{" "}
              <mark className="bg-red-200">в течении двух месяцев</mark> с
              момента оформления заказа. Этот срок включает в себя время на
              обработку заказа, подготовку к отправке, транспортировку и
              таможенные формальности
            </p>
            <p className="mt-2 text-black">
              Мы работаем с надежными логистическими партнерами, чтобы
              обеспечить своевременную доставку вашего автомобиля{" "}
              <mark className="bg-red-200">без задержек</mark> или неудобств для
              вас
            </p>
          </div>

          {/* Правая карточка с отступом 50px */}

          <div className="relative bg-[#4954681a]  py-16 rounded-[15px] border  p-8 md:w-1/2 md:pl-[50px]">
            <div className="absolute -top-16 right-0 w-48 h-auto z-10">
              <Image
                src="/images/icons/guarantees.png"
                alt="Гарантии"
                width={200}
                height={200}
                quality={100}
                priority
                className="object-contain"
              />
            </div>
            <h2 className="text-2xl text-black font-bold mb-4">
              ЕСТЬ ГАРАНТИИ
            </h2>
            <p className="mt-2 text-black">
              Мы гарантируем, что ваш автомобиль{" "}
              <mark className="bg-red-200">будет досавлен в срок,</mark>{" "}
              предоставляя полную прозрачность и поддержку на всех этапах
              доставки
            </p>
            <p className="mt-2 text-black">
              В случае любых непредвиденных обстоятельств, мы обеспечим{" "}
              <mark className="bg-red-200">
                оперативное решение и компенсацию,
              </mark>{" "}
              чтобы обеспечить ваше спокойствие и удовлетворение
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
