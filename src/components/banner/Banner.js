import React from "react";
import useSWR from "swr";
import { TMDB_API, fetcher } from "../../config";
import BannerItem from "./BannerItem";
import { SwiperSlide, Swiper } from "swiper/react";
import BannerSkeleton from "./BannerSkeleton";

const Banner = () => {
  const { data, error } = useSWR(TMDB_API.getMovieList("upcoming"), fetcher);
  const loading = !data && !error;
  const results = data?.results || [];
  console.log(results);
  return (
    <section className="banner h-[600px] page-container mb-20">
      {loading && <BannerSkeleton></BannerSkeleton>}
      <Swiper grabCursor={"true"} slidesPerView={"auto"}>
        {!loading &&
          results.length > 0 &&
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
