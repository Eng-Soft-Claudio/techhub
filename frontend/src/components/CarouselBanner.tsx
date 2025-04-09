import "keen-slider/keen-slider.min.css";
import { useKeenSlider } from "keen-slider/react";
import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";

interface Banner {
  image: string;
  title: string;
  description: string;
  link: string;
}

interface CarouselBannerProps {
  banners: Banner[];
}

export default function CarouselBanner({ banners }: CarouselBannerProps) {
  const navigate = useNavigate();
  const [currentSlide, setCurrentSlide] = useState(0);

  const [sliderRef, instanceRef] = useKeenSlider<HTMLDivElement>({
    loop: false,
    mode: "snap",
    slides: { perView: 1 },
    slideChanged(slider) {
      setCurrentSlide(slider.track.details.rel);
    },
  });

  const navigateToSlide = useCallback(
    (index: number) => {
      const totalSlides = banners.length;
      const nextIndex = (index + totalSlides) % totalSlides;
      instanceRef.current?.moveToIdx(nextIndex);
    },
    [banners.length, instanceRef]
  );

  useEffect(() => {
    const slider = instanceRef.current;
    if (!slider) return;

    const interval = setInterval(() => {
      navigateToSlide(currentSlide + 1);
    }, 4000);

    return () => clearInterval(interval);
  }, [currentSlide, instanceRef, navigateToSlide]);

  if (banners.length === 0) return null;

  return (
    <div className="relative">
      {/* Setas de navegação */}
      <button
        aria-label="Slide anterior"
        onClick={() => navigateToSlide(currentSlide - 1)}
        className="absolute top-1/2 left-4 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
      >
        ◀
      </button>
      <button
        aria-label="Próximo slide"
        onClick={() => navigateToSlide(currentSlide + 1)}
        className="absolute top-1/2 right-4 -translate-y-1/2 z-10 bg-black/50 hover:bg-black/70 text-white p-2 rounded-full"
      >
        ▶
      </button>

      {/* Slides */}
      <div ref={sliderRef} className="keen-slider rounded-2xl overflow-hidden shadow-lg relative">
        {banners.map((banner, index) => (
          <div key={index} className="keen-slider__slide relative h-60 md:h-80">
            <img
              src={banner.image}
              alt={banner.title || `Banner ${index + 1}`}
              onError={(e) => {
                const fallback = "/fallback-banner.jpg";
                if (e.currentTarget.src !== window.location.origin + fallback) {
                  e.currentTarget.src = fallback;
                }
              }}
              className="absolute inset-0 w-full h-full object-cover z-0"
            />
            <div className="absolute inset-0 bg-black/40 flex flex-col items-start justify-center p-6 md:p-12 text-white z-10">
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

      {/* Indicadores */}
      <div className="absolute bottom-2 left-0 right-0 flex justify-center gap-2">
        {banners.map((_, i) => (
          <button
            key={i}
            aria-current={currentSlide === i}
            onClick={() => navigateToSlide(i)}
            className={`h-2 w-2 rounded-full transition-all duration-300 ${
              currentSlide === i ? "bg-white w-4" : "bg-white/50"
            }`}
          />
        ))}
      </div>
    </div>
  );
}
