import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { TMDB_API, fetcher } from "../../config";
import MovieCard from "./MovieCard";

const MovieList = ({ type = "now_playing" }) => {
  const { data } = useSWR(TMDB_API.getMovieList(type), fetcher);
  if (!data) return null;
  const { results } = data;
  if (!results || results.length < 0) return null;
  return (
    <div className="movie-list">
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {results.length > 0 &&
          results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

export default MovieList;
