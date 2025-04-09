import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { banners } from "@/data/banners";

const Banner = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: true,
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
    drag: true,
    mode: "snap",
    slides: { perView: 1 },
  });

  const navigate = useNavigate();

  useEffect(() => {
    let timeout: ReturnType<typeof setTimeout>;
    const clearNextTimeout = () => clearTimeout(timeout);

    const nextTimeout = () => {
      clearNextTimeout();
      timeout = setTimeout(() => {
        instanceRef.current?.next();
      }, 4000);
    };

    instanceRef.current?.on("created", nextTimeout);
    instanceRef.current?.on("dragStarted", clearNextTimeout);
    instanceRef.current?.on("animationEnded", nextTimeout);
    instanceRef.current?.on("updated", nextTimeout);
  }, [instanceRef]);

  return (
    <div className="relative">
      <div
        ref={sliderRef}
        className="keen-slider rounded-2xl overflow-hidden shadow-lg"
      >
        {banners.map((banner, index) => (
          <div key={index} className="keen-slider__slide relative">
            <img
              src={banner.image}
              alt={`Banner ${index + 1}`}
              className="w-full h-60 md:h-80 object-cover"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-center p-6 md:p-12 text-white">
              <h2 className="text-xl md:text-3xl font-bold">{banner.title}</h2>
              <p className="text-sm md:text-lg mt-1 md:mt-2">{banner.description}</p>
              <button
                onClick={() => navigate(banner.link)}
                className="mt-4 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm md:text-base"
              >
                Ver ofertas
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Setas de navegação */}
      <button
        onClick={() => instanceRef.current?.prev()}
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-10"
      >
        ◀
      </button>

      <button
        onClick={() => instanceRef.current?.next()}
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 z-10"
      >
        ▶
      </button>

      {/* Dots */}
      <div className="flex justify-center mt-4 gap-2">
        {banners.map((_, idx) => (
          <button
            key={idx}
            onClick={() => instanceRef.current?.moveToIdx(idx)}
            className={`w-3 h-3 rounded-full transition-colors ${
              currentSlide === idx ? "bg-blue-600" : "bg-gray-400"
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default Banner;
