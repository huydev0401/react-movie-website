import React from "react";
import useSWR from "swr";
import { TMDB_API, fetcher } from "../../config";
import { useParams } from "react-router-dom";
import MovieCard from "../movie/MovieCard";
import { SwiperSlide, Swiper } from "swiper/react";
import PropTypes from "prop-types";

const MovieDetailsPage = () => {
  const { movieId } = useParams();
  const { data } = useSWR(TMDB_API.getMovieDetails(movieId), fetcher);
  if (!data) return null;
  const { backdrop_path, poster_path, title, overview, genres } = data;
  return (
    <div className="pb-10">
      <div className="w-full h-[600px] relative">
        <div className="absolute inset-0 bg-black opacity-70"></div>
        <div
          className="w-full h-full bg-cover bg-no-repeat"
          style={{
            backgroundImage: `url(${TMDB_API.getImages(
              backdrop_path,
              "original"
            )})`,
          }}
        ></div>
      </div>
      <div className="w-full h-[400px] max-w-[800px] mx-auto -mt-[200px] relative z-10 mb-10">
        <img
          className="w-full h-full object-cover rounded-xl"
          src={TMDB_API.getImages(poster_path, "w780")}
          alt=""
        />
      </div>
      <h1 className="font-semibold text-5xl text-center max-w-[700px] mx-auto mb-10">
        {title}
      </h1>
      <div className="flex items-center gap-x-5 justify-center mb-10">
        {genres.length > 0 &&
          genres.map((item) => (
            <div
              key={item.id}
              className="py-2 px-4 border border-primary text-primary font-medium rounded-full"
            >
              {item.name}
            </div>
          ))}
      </div>
      <p className="leading-relaxed max-w-[800px] mx-auto text-center">
        {overview}
      </p>
      <MovieMeta type="credits"></MovieMeta>
      <MovieMeta></MovieMeta>
      <MovieMeta type="similar"></MovieMeta>
    </div>
  );
};

function MovieMeta({ type = "videos" }) {
  const { movieId } = useParams();
  const { data } = useSWR(TMDB_API.getMovieInfo(movieId, type), fetcher);
  if (!data) return null;
  if (type === "credits") {
    const { cast } = data;
    if (!cast || cast.length < 0) return null;
    return (
      <div className="py-10">
        <h2 className="font-medium text-4xl text-center mb-10">Casts</h2>
        <div className="grid grid-cols-4 gap-5">
          {cast.slice(0, 4).map((item) => (
            <div key={item.id} className="w-full h-[350px]">
              <img
                className="w-full h-full object-cover mb-3 rounded"
                src={TMDB_API.getImages(item.profile_path, "w500")}
                alt=""
              />
              <h3 className="font-medium text-xl text-center">{item.name}</h3>
            </div>
          ))}
        </div>
      </div>
    );
  } else {
    const { results } = data;
    if (!results || results.length < 0) return null;
    if (type === "videos") {
      return (
        <div className="py-10">
          {results.slice(0, 1).map((item) => (
            <div className="flex flex-col" key={item.id}>
              <h2 className="font-medium mb-10 text-xl border border-primary w-fit p-3">
                {item.name}
              </h2>
              <div className="w-full aspect-video">
                <iframe
                  className="w-full h-full object-fill"
                  width="956"
                  height="538"
                  src={`https://www.youtube.com/embed/${item.key}`}
                  title={item.name}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          ))}
        </div>
      );
    } else if (type === "similar") {
      return (
        <div className="py-10">
          <h2 className="font-medium text-3xl mb-10">Similar movies</h2>
          <div className="movie-list">
            <Swiper
              grabCursor={"true"}
              spaceBetween={40}
              slidesPerView={"auto"}
            >
              {results.length > 0 &&
                results.map((item) => (
                  <SwiperSlide key={item.id}>
                    <MovieCard item={item}></MovieCard>
                  </SwiperSlide>
                ))}
            </Swiper>
          </div>
        </div>
      );
    } else {
      return null;
    }
  }
}

MovieMeta.propTypes = {
  type: PropTypes.string,
};

// function MovieCast() {
//   const { movieId } = useParams();
//   const { data } = useSWR(TMDB_API.getMovieInfo(movieId, "credits"), fetcher);
//   if (!data) return null;
//   const { cast } = data;
//   if (!cast || cast.length < 0) return null;
//   return (
//     <div className="py-10">
//       <h2 className="font-medium text-4xl text-center mb-10">Casts</h2>
//       <div className="grid grid-cols-4 gap-5">
//         {cast.slice(0, 4).map((item) => (
//           <div key={item.id} className="w-full h-[350px]">
//             <img
//               className="w-full h-full object-cover mb-3 rounded"
//               src={TMDB_API.getImages(item.profile_path, "w500")}
//               alt=""
//             />
//             <h3 className="font-medium text-xl text-center">{item.name}</h3>
//           </div>
//         ))}
//       </div>
//     </div>
//   );
// }

// function MovieVideo() {
//   const { movieId } = useParams();
//   const { data } = useSWR(TMDB_API.getMovieInfo(movieId, "videos"), fetcher);
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length < 0) return null;
//   return (
//     <div className="py-10">
//       {results.slice(0, 1).map((item) => (
//         <div className="flex flex-col" key={item.id}>
//           <h2 className="font-medium mb-10 text-xl border border-primary w-fit p-3">
//             {item.name}
//           </h2>
//           <div className="w-full aspect-video">
//             <iframe
//               className="w-full h-full object-fill"
//               width="956"
//               height="538"
//               src={`https://www.youtube.com/embed/${item.key}`}
//               title={item.name}
//               frameBorder="0"
//               allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
//               allowFullScreen
//             ></iframe>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// }

// function MovieSimilar() {
//   const { movieId } = useParams();
//   const { data } = useSWR(TMDB_API.getMovieInfo(movieId, "similar"), fetcher);
//   if (!data) return null;
//   const { results } = data;
//   if (!results || results.length < 0) return null;
//   return (
//     <div className="py-10">
//       <h2 className="font-medium text-3xl mb-10">Similar movies</h2>
//       <div className="movie-list">
//         <Swiper grabCursor={"true"} spaceBetween={40} slidesPerView={"auto"}>
//           {results.length > 0 &&
//             results.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <MovieCard item={item}></MovieCard>
//               </SwiperSlide>
//             ))}
//         </Swiper>
//       </div>
//     </div>
//   );
// }

export default MovieDetailsPage;
