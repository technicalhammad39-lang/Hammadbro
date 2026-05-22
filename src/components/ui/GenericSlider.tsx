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
  const shouldLoop = isReview ? data.length > 1 : data.length > slidesPerView * 2;

  useEffect(() => {
    setIsClient(true);
  }, []);

  if (!isClient) {
    // Return a placeholder during SSR to prevent hydration mismatch
    return (
      <div className={`relative w-full flex flex-col justify-center items-center ${heightClass || ''}`}>
        <div className={`w-full max-w-full px-0 sm:px-6 lg:px-0 ${!isReview ? 'lg:max-w-[1440px]' : ''}`}>
          <div className="flex gap-4 overflow-hidden">
            {data.slice(0, 3).map((item, index) => (
              <div key={index} className="flex-shrink-0 w-full max-w-[calc(100vw-40px)] sm:max-w-sm">
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
    <div className={`relative w-full flex flex-col justify-center items-center ${heightClass || ''}`}>
      <div className={`w-full max-w-full px-0 sm:px-6 lg:px-0 ${!isReview ? 'lg:max-w-[1440px]' : ''}`}>
        <Swiper
          modules={[Pagination, Autoplay]}
          spaceBetween={20}
          centeredSlides={false}
          loop={shouldLoop}
          autoplay={{
            delay: 3000,
            disableOnInteraction: false,
          }}
          pagination={{ clickable: true }}
          breakpoints={{
            0: {
              slidesPerView: isPortfolio ? 1 : 1,
              spaceBetween: 16,
            },
            640: {
              slidesPerView: isPortfolio || isBlog || isReview ? 1 : 2,
              spaceBetween: 18,
            },
            850: {
              slidesPerView: isPortfolio || isBlog || isReview ? 1 : 2,
              spaceBetween: 20,
            },
            1024: {
              slidesPerView: isPortfolio ? 2 : isReview ? 2 : Math.min(slidesPerView, 3),
              spaceBetween: 24,
            },
            1280: {
              slidesPerView: isPortfolio ? 2 : isReview ? 2 : slidesPerView,
              spaceBetween: 24,
            },
          }}
          className="!pb-12 sm:!pb-16"
        >
          {data.map((item, index) => (
            <SwiperSlide
              key={index}
              className="!flex !justify-center"
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
