import React from "react";
import useSWR from "swr";
import { TMDB_API, fetcher } from "../../config";
import BannerItem from "./BannerItem";
import { SwiperSlide, Swiper } from "swiper/react";

const Banner = () => {
  const { data } = useSWR(TMDB_API.getMovieList("upcoming"), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length < 0) return null;
  return (
    <section className="banner h-[600px] page-container mb-20">
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {results.length > 0 &&
          results.map((item) => (
            <SwiperSlide key={item.id}>
              <BannerItem item={item}></BannerItem>
            </SwiperSlide>
          ))}
      </Swiper>
    </section>
  );
};

export default Banner;
