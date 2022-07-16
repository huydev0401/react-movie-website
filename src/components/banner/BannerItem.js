import React from "react";

const BannerItem = ({ item }) => {
  if (!item) return null;
  const { title, poster_path } = item;
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.4)] rounded-lg"></div>
      <img
        src={`https://image.tmdb.org/t/p/w780/${poster_path}`}
        alt=""
        className="w-full h-full object-cover rounded-lg object-top"
      />
      <div className="absolute left-5 bottom-5 w-full text-white">
        <h2 className="font-bold text-5xl mb-8">{title}</h2>
        <div className="flex items-center gap-x-3 mb-8">
          <span className="py-2 px-4 border border-white rounded-md">
            Action
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Adventure
          </span>
          <span className="py-2 px-4 border border-white rounded-md">
            Drama
          </span>
        </div>
        <button className="py-3 px-6 capitalize rounded-lg bg-primary text-white font-medium">
          Watch now
        </button>
      </div>
    </div>
  );
};

export default BannerItem;
