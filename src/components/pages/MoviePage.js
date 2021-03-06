import React, { useEffect, useState } from "react";
import { TMDB_API, fetcher } from "../../config";
import useSWR from "swr";
import MovieCard from "../movie/MovieCard";
import useDebounce from "../../hooks/useDebounce";
import ReactPaginate from "react-paginate";
import MovieCardSkeleton from "components/movie/MovieCardSkeleton";
import { v4 } from "uuid";

const itemsPerPage = 20;

const MoviePage = () => {
  const [pageCount, setPageCount] = useState(0);
  const [itemOffset, setItemOffset] = useState(0);
  const [nextPage, setNextPage] = useState(1);
  const [query, setQuery] = useState("");
  const queryDebounce = useDebounce(query, 1000);
  const [url, setUrl] = useState(TMDB_API.getMovieList("top_rated", nextPage));
  useEffect(() => {
    if (queryDebounce) {
      setUrl(TMDB_API.getMovieSearch(queryDebounce, nextPage));
    } else {
      setUrl(TMDB_API.getMovieList("top_rated", nextPage));
    }
  }, [queryDebounce, nextPage]);
  const handleChangeSearch = (e) => {
    setQuery(e.target.value);
  };
  const { data, error } = useSWR(url, fetcher);
  const loading = !data && !error;

  const movies = data?.results || [];
  useEffect(() => {
    if (!data || !data.total_results) return;
    setPageCount(Math.ceil(data.total_results / itemsPerPage));
  }, [data, itemOffset]);
  const handlePageClick = (event) => {
    const newOffset = (event.selected * itemsPerPage) % data.total_results;
    setItemOffset(newOffset);
    setNextPage(event.selected + 1);
  };

  return (
    <div className="p-10 page-container">
      <div className="flex items-center mb-10 w-[800px] mx-auto">
        <div className="flex-1">
          <input
            value={query}
            onChange={handleChangeSearch}
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
            strokeWidth="2"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </div>
      {loading && (
        <>
          <div className="mx-auto w-10 h-10 rounded-full border-4 border-primary border-t-4 border-t-transparent animate-spin"></div>
          <div className="grid grid-cols-4 gap-6">
            {new Array(itemsPerPage).fill(0).map(() => (
              <MovieCardSkeleton key={v4()}></MovieCardSkeleton>
            ))}
          </div>
        </>
      )}
      <div className="grid grid-cols-4 gap-6">
        {!loading &&
          movies.length > 0 &&
          movies.map((item) => (
            <MovieCard key={item.id} item={item}></MovieCard>
          ))}
      </div>
      <div className="mt-10">
        <ReactPaginate
          breakLabel="..."
          nextLabel="next >"
          onPageChange={handlePageClick}
          pageRangeDisplayed={5}
          pageCount={pageCount}
          previousLabel="< previous"
          renderOnZeroPageCount={null}
          className="pagination"
        />
      </div>
    </div>
  );
};

export default MoviePage;
