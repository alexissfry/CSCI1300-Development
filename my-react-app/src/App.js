import "./styles/App.css";
import ArtCard from "./components/ArtCard";
import artData from "./data/art-data.json";
import { useState, useEffect } from "react";
import { Button, Dropdown } from "react-bootstrap";

const ArtGallery = ({ artData, handleCardLike }) => {
  return (
    <div className="art-gallery">
      {artData.map((item, index) => (
        <div key={index}>
          <ArtCard item={item} handleCardLike={handleCardLike} />
        </div>
      ))}
    </div>
  );
};

function App() {
  const [favorites, setFavorites] = useState([]);

  const handleCardLike = (item, isLiked) => {
    if (isLiked) {
      // add the item to favorites
      setFavorites((prevFavorites) => [...prevFavorites, item]);
    } else {
      // remove the specific item from favorites when it is unliked
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== item.id)
      );
    }
  };

  return (
    <div className="App">
      <div className="gallery-container">
        <h1>Alexis' Origami Gallery</h1>
        <div className="filer-sort-buttons">
          <div className="mr-2">
            <Button variant="outline-dark" size="sm">
              Sort A-Z
            </Button>
          </div>

          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-secondary"
              size="sm"
              className="filter-dropdown-1"
            >
              Fold Type
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">Crane</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Swan</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Paraboloid</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              size="sm"
              className="filter-dropdown-2"
            >
              Color
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item href="#/action-1">White</Dropdown.Item>
              <Dropdown.Item href="#/action-2">Red</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Black</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Blue</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Green</Dropdown.Item>
              <Dropdown.Item href="#/action-3">Brown</Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="outline-dark" size="sm">
            Reset
          </Button>
        </div>
        <div className="gallery-controls"></div>
        <ArtGallery artData={artData} handleCardLike={handleCardLike} />
      </div>
      <div className="favorites-container">
        <div className="favorites-title">
          <i className="fa-solid fa-heart"></i>
          <h1>{favorites.length}</h1>
        </div>
        <div className="favorites-aggregate">
          {favorites.map((item, index) => (
            <div key={index}>
              <img className="favorite" src={item.image} alt={item.title} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default App;
