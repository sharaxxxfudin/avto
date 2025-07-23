import { faCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Steps() {
  const steps = [
    {
      id: "1",
      title: "ЗАКЛЮЧИТЬ ДОГОВОР В НАШЕЙ КОМПАНИИ",
      img: "/images/steps/step-1.png",
      description:
        "Вы оставляете заявку на сайте либо связываетесь с нами удобным для вас способом",
    },
    {
      id: "2",
      title: "ПОДБОР И ПОКУПКА АВТО",
      img: "/images/steps/step-2.png",
      description:
        "Вам предлагаются подходящие варианты с аукционов или стоянок, Вы принимаете решение, автомобиль выкупается",
    },
    {
      id: "3",
      title: "ДОСТАВКА И ТАМОЖНЯ В РФ",
      img: "/images/steps/step-3.png",
      description:
        "Мы транспортируем авто в порт Кореи, грузим на судно и доставляем во Владивосток, где проходит таможенное оформление",
    },
    {
      id: "4",
      title: "ВЫДАЧА/ОТПРАВКА АВТО",
      img: "/images/steps/step-4.png",
      description:
        "Мы доставляем Вам автомобиль в любой регион России выбранным Вами способом, либо Вы сами забираете его во Владивостоке",
    },
  ];

  return (
    <section id="steps" className="bg-white rounded-[25px] py-20 text-black">
      <div className="max-w-7xl mx-auto px-4">
        {/* Заголовок секции */}
        <div className="flex flex-col md:flex-row gap-10 mb-12">
          <div className="md:w-1/2">
            <h5 className="text-lg font-bold mb-5 flex items-center gap-2 text-black">
              Этапы работы
            </h5>
          </div>
          <div className="md:w-1/2">
            <h2 className="text-4xl font-bold leading-tight">
              <span className="text-[#e01a31]">Прозрачные</span> этапы работы
            </h2>
          </div>
        </div>

        {/* Карточки шагов */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-8">
          {steps.map(({ id, title, img, description }) => (
            <div
              key={id}
              className="flex flex-col items-center text-center bg-[#f4f4f4] rounded-2xl p-6 h-full"
            >
              <img src={img} alt={title} className="w-20 h-auto mb-4" />
              <div className="flex flex-col flex-grow">
                <h5 className="text-lg font-semibold text-black mb-2">
                  <span className="text-zinc-400">{id} - </span>{title}
                </h5>
                <p className="text-sm text-gray-700">{description}</p>
              </div>
            </div>
          ))}
        </div>

        {/* Кнопка */}
        <div className="flex justify-center mt-12">
          <button
            type="button"
            className="bg-[#e01a31] hover:bg-zinc-700 text-white font-semibold py-3 px-10 rounded-full transition"
          >
            Связаться с нами
          </button>
        </div>
      </div>
    </section>
  );
}
