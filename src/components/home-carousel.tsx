import { useEffect, useState } from "react"

export interface CarouselSlide {
  title: string
  link?: string
  cover: string
  description?: string
}

interface HomeCarouselProps {
  slides: CarouselSlide[]
}

export default function HomeCarousel({ slides }: HomeCarouselProps) {
  const [activeSlide, setActiveSlide] = useState(0)

  useEffect(() => {
    if (slides.length < 2) return
    const timer = window.setInterval(() => {
      setActiveSlide(index => (index + 1) % slides.length)
    }, 6500)
    return () => window.clearInterval(timer)
  }, [slides.length])

  if (slides.length === 0) return null
  const slide = slides[activeSlide]
  const previous = () =>
    setActiveSlide(index => (index - 1 + slides.length) % slides.length)
  const next = () => setActiveSlide(index => (index + 1) % slides.length)

  return (
    <section
      className="showcase relative mx-auto w-full max-w-[1024px] text-center"
      aria-roledescription="carousel"
      aria-label="精选推荐"
    >
      <div className="relative">
        {slides.length > 1 && (
          <div
            className="relative z-10 mx-[15%] mb-4 flex h-[23px] justify-center lg:absolute lg:inset-x-[15%] lg:bottom-0 lg:mx-0 lg:mb-4"
            aria-label="选择推荐内容"
          >
            {slides.map((item, index) => (
              <button
                key={`${item.title}-${index}`}
                type="button"
                onClick={() => setActiveSlide(index)}
                className={`mx-[3px] box-content h-[3px] w-[30px] border-x-0 border-y-[10px] border-solid border-transparent bg-clip-padding transition-opacity ${
                  activeSlide === index
                    ? "bg-slate-900 opacity-100 dark:bg-white"
                    : "bg-slate-500 opacity-50 dark:bg-slate-400"
                }`}
                aria-label={`第 ${index + 1} 张：${item.title}`}
                aria-current={activeSlide === index ? "true" : undefined}
              />
            ))}
          </div>
        )}
        <a
          href={slide.link || undefined}
          target={slide.link ? "_blank" : undefined}
          rel={slide.link ? "noopener noreferrer" : undefined}
          className="block text-inherit no-underline hover:text-inherit"
          aria-label={slide.link ? `打开推荐：${slide.title}` : undefined}
        >
          <img
            src={slide.cover}
            alt={slide.title}
            title={slide.title}
            className="mx-auto block h-auto max-h-[65vh] w-full max-w-[1024px] cursor-pointer object-contain px-6 lg:pb-[120px]"
          />
          <div
            className="px-6 lg:absolute lg:inset-x-[15%] lg:bottom-5"
            style={{
              backgroundImage:
                "linear-gradient(to top, #fcc5e4 0%, #fda34b 15%, #ff7882 35%, #c8699e 52%, #7046aa 71%, #0c1db8 87%, #020f75 100%)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            <h2 className="mb-2 text-[calc(1.275rem+0.3vw)] font-medium leading-[1.2]">
              {slide.title}
            </h2>
            {slide.description && (
              <p className="mb-4 mt-2 text-[16px] leading-[1.618]">
                {slide.description}
              </p>
            )}
          </div>
        </a>

        {slides.length > 1 && (
          <>
            <button
              type="button"
              onClick={previous}
              className="absolute left-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center text-4xl leading-none text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              aria-label="上一张推荐"
            >
              ‹
            </button>
            <button
              type="button"
              onClick={next}
              className="absolute right-3 top-1/2 grid size-10 -translate-y-1/2 place-items-center text-4xl leading-none text-slate-500 transition-colors hover:text-slate-900 dark:text-slate-300 dark:hover:text-white"
              aria-label="下一张推荐"
            >
              ›
            </button>
          </>
        )}
      </div>
    </section>
  )
}
