import React from "react";
import { fetcher } from "../../config";
import useSWR from "swr";
import MovieCard from "../movie/MovieCard";

const MoviePage = () => {
  const { data } = useSWR(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=2fcb8a94f56d2bd408dda09d36e46ce7`,
    fetcher
  );
  if (!data) return null;
  const { results } = data;
  if (!results || results.length < 0) return null;
  return (
    <div className="p-10 page-container">
      <div className="flex items-center mb-10 w-[800px] mx-auto">
        <div className="flex-1">
          <input
            className="p-4 w-full bg-slate-800 rounded-tl-lg rounded-bl-lg outline-none text-white"
            type="text"
            placeholder="Type to search..."
          />
        </div>
        <button className="py-4 px-6 bg-primary text-white rounded-tr-lg rounded-br-lg">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            stroke-width="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      <div className="grid grid-cols-4 gap-6">
        {results.length > 0 &&
          results.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
    </div>
  );
};

export default MoviePage;
