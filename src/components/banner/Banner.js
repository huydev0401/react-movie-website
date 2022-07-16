import React from "react";
import useSWR from "swr";
import { fetcher } from "../../config";
import BannerItem from "./BannerItem";
import { SwiperSlide, Swiper } from "swiper/react";

const Banner = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/upcoming?api_key=2fcb8a94f56d2bd408dda09d36e46ce7`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length < 0) return null;
  return (
    <section className="banner h-[600px] page-container mb-20">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {results.length > 0 &&
          results.map((item) => (
            <SwiperSlide>
              <BannerItem key={item.id} item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Banner;
