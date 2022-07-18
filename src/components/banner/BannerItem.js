import React from "react";
import { useNavigate } from "react-router-dom";
import Button from "../button/Button";
import { TMDB_API } from "../../config";
import PropTypes from "prop-types";

const BannerItem = ({ item }) => {
  const navigate = useNavigate();
  if (!item) return null;
  const { title, poster_path, id } = item;
  return (
    <div className="relative w-full h-full rounded-lg">
      <div className="overlay absolute inset-0 bg-gradient-to-t from-[rgba(0,0,0,0.4)] to-[rgba(0,0,0,0.4)] rounded-lg"></div>
      <img
        src={TMDB_API.getImages(poster_path, "w780")}
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
        <Button onClick={() => navigate(`/movies/${id}`)}>Watch now</Button>
      </div>
    </div>
  );
};

BannerItem.propTypes = {
  item: PropTypes.shape({
    title: PropTypes.string,
    poster_path: PropTypes.string,
    id: PropTypes.number,
  }),
};

export default BannerItem;
