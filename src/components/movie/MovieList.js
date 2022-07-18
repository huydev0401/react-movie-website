import React from "react";
import { SwiperSlide, Swiper } from "swiper/react";
import useSWR from "swr";
import { TMDB_API, fetcher } from "../../config";
import MovieCard from "./MovieCard";
import PropTypes from "prop-types";
import { withErrorBoundary } from "react-error-boundary";
import MovieCardSkeleton from "./MovieCardSkeleton";

const MovieList = ({ type = "now_playing" }) => {
  const { data, error } = useSWR(TMDB_API.getMovieList(type), fetcher);
  const loading = !data && !error;
  const results = data?.results || [];
  return (
    <div className="movie-list">
      {loading && (
        <>
          <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
            <SwiperSlide>
              <MovieCardSkeleton></MovieCardSkeleton>
            </SwiperSlide>
          </Swiper>
        </>
      )}
      <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
        {!loading &&
          results.length > 0 &&
          results.map((item) => (
            <SwiperSlide key={item.id}>
              <MovieCard item={item}></MovieCard>
            </SwiperSlide>
          ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  type: PropTypes.string,
};

function FallbackComponent() {
  return (
    <p className="bg-red-50 text-red-500">
      Something went wrong with this component
    </p>
  );
}

export default withErrorBoundary(MovieList, {
  FallbackComponent,
});
