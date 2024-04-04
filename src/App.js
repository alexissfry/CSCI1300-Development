import "./styles/App.css";
import ArtCard from "./components/ArtCard";
import artData from "./data/art-data.json";
import { useState } from "react";
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
  const [sortAscending, setSortAscending] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState([]);
  const [selectedColors, setSelectedColors] = useState([]);

  const handleCardLike = (item, isLiked) => {
    if (isLiked) {
      setFavorites((prevFavorites) => [...prevFavorites, item]);
    } else {
      setFavorites((prevFavorites) =>
        prevFavorites.filter((favorite) => favorite.id !== item.id)
      );
    }
  };

  const sortData = (data) => {
    if (sortAscending) {
      return [...data].sort((a, b) => a.title.localeCompare(b.title));
    }
    return data;
  };

  const filterTypeData = (data) => {
    if (selectedTypes.length === 0) {
      return data;
    }

    return data.filter((item) => selectedTypes.includes(item.type));
  };

  const filterColorData = (data) => {
    if (selectedColors.length === 0) {
      return data;
    }

    return data.filter((item) => {
      return selectedColors.some((color) => item.color.includes(color));
    });
  };

  const handleSortChange = () => {
    setSortAscending(!sortAscending);
  };

  const handleFilterTypeChange = (type) => {
    if (selectedTypes.includes(type)) {
      setSelectedTypes(selectedTypes.filter((t) => t !== type));
    } else {
      setSelectedTypes([...selectedTypes, type]);
    }
  };

  const handleFilterColorChange = (color) => {
    if (selectedColors.includes(color)) {
      setSelectedColors(selectedColors.filter((c) => c !== color));
    } else {
      setSelectedColors([...selectedColors, color]);
    }
  };

  const handleReset = () => {
    setSortAscending(false);
    setSelectedTypes([]);
    setSelectedColors([]);
  };

  const filteredTypeData = filterTypeData(artData);
  const filteredColorData = filterColorData(filteredTypeData);
  const sortedData = sortData(filteredColorData);

  return (
    <div className="App">
      <div className="gallery-container">
        <h1>Alexis' Origami Gallery</h1>
        <div className="filer-sort-buttons">
          <div>
            <Button variant="outline-dark" onClick={handleSortChange}>
              Sort A-Z
            </Button>
          </div>

          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-secondary"
              className="filter-dropdown-1"
            >
              Fold Type
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                active={selectedTypes.includes("Crane")}
                onClick={() => handleFilterTypeChange("Crane")}
              >
                Crane
              </Dropdown.Item>
              <Dropdown.Item
                active={selectedTypes.includes("Swan")}
                onClick={() => handleFilterTypeChange("Swan")}
              >
                Swan
              </Dropdown.Item>
              <Dropdown.Item
                active={selectedTypes.includes("Paraboloid")}
                onClick={() => handleFilterTypeChange("Paraboloid")}
              >
                Paraboloid
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Dropdown>
            <Dropdown.Toggle
              variant="secondary"
              id="dropdown-basic"
              className="filter-dropdown-2"
            >
              Color
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item
                active={selectedColors.includes("White")}
                onClick={() => handleFilterColorChange("White")}
              >
                White
              </Dropdown.Item>
              <Dropdown.Item
                active={selectedColors.includes("Red")}
                onClick={() => handleFilterColorChange("Red")}
              >
                Red
              </Dropdown.Item>
              <Dropdown.Item
                active={selectedColors.includes("Black")}
                onClick={() => handleFilterColorChange("Black")}
              >
                Black
              </Dropdown.Item>
              <Dropdown.Item
                active={selectedColors.includes("Blue")}
                onClick={() => handleFilterColorChange("Blue")}
              >
                Blue
              </Dropdown.Item>
              <Dropdown.Item
                active={selectedColors.includes("Green")}
                onClick={() => handleFilterColorChange("Green")}
              >
                Green
              </Dropdown.Item>
              <Dropdown.Item
                active={selectedColors.includes("Brown")}
                onClick={() => handleFilterColorChange("Brown")}
              >
                Brown
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
          <Button variant="outline-dark" onClick={handleReset}>
            Reset
          </Button>
        </div>
        <div className="gallery-controls"></div>
        <ArtGallery artData={sortedData} handleCardLike={handleCardLike} />
      </div>
      <div className="favorites-container">
        <div className="favorites-title">
          <i className="fa-solid fa-heart fa-xl"></i>
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
