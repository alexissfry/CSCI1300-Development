import "../styles/ArtCard.css";
import React, { useState } from "react";

const ArtCard = ({ item, handleCardLike }) => {
  const [isLiked, setIsLiked] = useState(false);

  const toggleLike = () => {
    setIsLiked(!isLiked);
    handleCardLike(item, !isLiked);
  };

  return (
    <div className="art-card">
      <div className="card-img">
        <img src={item.image} alt={item.title} />
      </div>
      <div>
        <h2 className="card-title">{item.title}</h2>
        <p className="card-text">{item.type}</p>
        <button className="card-button" onClick={toggleLike}>
          <i
            className={
              isLiked ? "fa-solid fa-heart fa-xl" : "fa-regular fa-heart fa-xl"
            }
          ></i>
        </button>
      </div>
    </div>
  );
};
export default ArtCard;
