'use client';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Pagination, Autoplay } from 'swiper/modules';
import { motion } from 'framer-motion';
import 'swiper/css';
import 'swiper/css/pagination';
import { useEffect, useState } from 'react';

import ServicesCard from './ServicesCard';
import PortfolioCard from './PortfolioCard';
import ReviewCard from './ReviewCard';
import Blog from './Blog';

import {
  CardData,
  PortfolioItem,
  Review,
  Blog as BlogItem,
} from '@/data/data';

type AllowedCard = CardData | PortfolioItem | Review | BlogItem;

interface GenericSliderProps<T extends AllowedCard> {
  data: T[];
  slidesPerView: number;
  heightClass?: string;
  cardType: 'hover' | 'portfolio' | 'review' | 'blog';
  sourceHash?: string;
}

export function GenericSlider<T extends AllowedCard>({
  data,
  slidesPerView,
  heightClass,
  cardType,
  sourceHash,
}: GenericSliderProps<T>) {
  const [isClient, setIsClient] = useState(false);
  const isReview = cardType === 'review';
  const isPortfolio = cardType === 'portfolio';
  const isBlog = cardType === 'blog';
  const isHover = cardType === 'hover';
  const shouldLoop = isReview || cardType === 'hover' ? data.length > 1 : data.length > slidesPerView * 2;
  const sliderShellClass = `w-full max-w-full px-0 ${isHover ? 'sm:px-0 lg:px-0' : 'sm:px-6 lg:px-0'} ${!isReview && !isHover ? 'lg:max-w-[1440px]' : ''}`;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder during SSR to prevent hydration mismatch
    return (
      <div
        className={`relative w-full flex flex-col justify-center items-center ${heightClass || ''}`}
        data-lenis-prevent-touch
      >
        <div className={sliderShellClass}>
          <div className="flex gap-4 overflow-hidden">
            {data.slice(0, isHover ? 6 : 3).map((item, index) => (
              <div key={index} className={isHover ? "flex-shrink-0 w-[86vw] max-w-[360px] sm:w-[280px] sm:max-w-none md:w-[245px] lg:w-[225px] xl:w-[238px] 2xl:w-[250px]" : "flex-shrink-0 w-full max-w-[calc(100vw-40px)] sm:max-w-sm"}>
                {cardType === 'hover' && 'title' in item && 'imageSrc' in item && 'desc' in item && 'icon' in item && (
                  <ServicesCard title={item.title} imageSrc={item.imageSrc} desc={item.desc} icon={item.icon} priority={index === 0} />
                )}
                {cardType === 'portfolio' && 'image' in item && 'href' in item && 'desc' in item && (
                  <PortfolioCard
                    image={item.image}
                    title={item.title}
                    href={item.href}
                    desc={item.desc}
                    category={'category' in item ? item.category : undefined}
                    sourceHash={sourceHash}
                    priority={index === 0}
                  />
                )}
                {cardType === 'review' && 'rating' in item && (
                  <ReviewCard
                    name={item.name}
                    role={item.role}
                    rating={item.rating}
                    text={item.text}
                  />
                )}
                {cardType === 'blog' && 'image' in item && 'button' in item && 'name' in item && 'date' in item && (
                  <Blog
                    image={item.image}
                    button={item.button}
                    name={item.name}
                    date={item.date}
                    title={item.title}
                    slug={item.slug}
                    excerpt={item.excerpt}
                    category={item.category}
                    metaDescription={item.metaDescription}
                    content={item.content}
                    sourceHash={sourceHash}
                    priority={index === 0}
                  />
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`relative w-full flex flex-col justify-center items-center ${heightClass || ''}`}
      data-lenis-prevent-touch
    >
      <div className={sliderShellClass}>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={isHover ? 16 : 20}
          centeredSlides={false}
          loop={shouldLoop}
          autoplay={{
            delay: isHover ? 2400 : 3000,
            disableOnInteraction: false,
            pauseOnMouseEnter: true,
          }}
          speed={isHover ? 850 : 650}
          pagination={{ clickable: true }}
          grabCursor
          breakpoints={{
            0: {
              slidesPerView: isHover ? 'auto' : 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: isHover ? 'auto' : isPortfolio || isBlog || isReview ? 1 : 2,
              spaceBetween: isHover ? 16 : 18,
            },
            850: {
              slidesPerView: isHover ? 'auto' : isPortfolio || isBlog || isReview ? 1 : 2,
              spaceBetween: isHover ? 16 : 20,
            },
            1024: {
              slidesPerView: isHover ? 'auto' : isPortfolio ? 2 : isReview ? 2 : Math.min(slidesPerView, 3),
              spaceBetween: isHover ? 16 : 24,
            },
            1280: {
              slidesPerView: isHover ? 'auto' : isPortfolio ? 2 : isReview ? 2 : slidesPerView,
              spaceBetween: isHover ? 18 : 24,
            },
          }}
          className={isHover ? 'services-carousel-swiper !pb-8 sm:!pb-10' : '!pb-12 sm:!pb-16'}
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={index}
              className={isHover ? "!flex !w-[86vw] !max-w-[360px] !justify-center sm:!w-[280px] sm:!max-w-none md:!w-[245px] lg:!w-[225px] xl:!w-[238px] 2xl:!w-[250px]" : "!flex !justify-center"}
            >
              <motion.div
                className="flex w-full justify-center"
                initial={{ opacity: 0, y: 22 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.55, delay: Math.min(index, 4) * 0.06, ease: [0.22, 1, 0.36, 1] }}
              >
                {cardType === 'hover' && 'title' in item && 'imageSrc' in item && 'desc' in item && 'icon' in item && (
                  <ServicesCard title={item.title} imageSrc={item.imageSrc} desc={item.desc} icon={item.icon} priority={index === 0} />
                )}
                {cardType === 'portfolio' && 'image' in item && 'href' in item && 'desc' in item && (
                  <PortfolioCard
                    image={item.image}
                    title={item.title}
                    href={item.href}
                    desc={item.desc}
                    category={'category' in item ? item.category : undefined}
                    sourceHash={sourceHash}
                    priority={index === 0}
                  />
                )}
                {cardType === 'review' && 'rating' in item && (
                  <ReviewCard
                    name={item.name}
                    role={item.role}
                    rating={item.rating}
                    text={item.text}
                  />
                )}
                {cardType === 'blog' && 'image' in item && 'button' in item && 'name' in item && 'date' in item && (
                  <Blog
                    image={item.image}
                    button={item.button}
                    name={item.name}
                    date={item.date}
                    title={item.title}
                    slug={item.slug}
                    excerpt={item.excerpt}
                    category={item.category}
                    metaDescription={item.metaDescription}
                    content={item.content}
                    sourceHash={sourceHash}
                    priority={index === 0}
                  />
                )}
              </motion.div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
