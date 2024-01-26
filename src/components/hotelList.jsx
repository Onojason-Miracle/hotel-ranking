import React, { useState, useEffect } from "react";
import { useHotelContext } from "../context/HotelContext";

const HotelList = ({ onDelete, onEdit, onDeleteCategory }) => {
  const { state } = useHotelContext();
  const { hotels, categories } = state;

  const [selectedFilterCategory, setSelectedFilterCategory] = useState("");

  console.log("Selected Category:", state.selectedCategory);
  console.log("Hotels:", hotels);

  const getAllCategories = () => {
    const allCategories = Array.from(
      new Set(hotels.map((hotel) => hotel.category))
    );
    return [""].concat(allCategories);
  };

  const handleFilterByCategory = (category) => {
    setSelectedFilterCategory(category);
  };

  const filteredHotels = selectedFilterCategory
    ? hotels.filter((hotel) => hotel.category === selectedFilterCategory)
    : hotels;

  return (
    <div className="hl-wrapper">
      <div className="hl-div">
        <div>
          <h2 className="text-center mt-4">Filter Hotels by Category:</h2>
          <select
            className="form-select text-center mt-4"
            value={selectedFilterCategory}
            onChange={(e) => handleFilterByCategory(e.target.value)}
          >
            {getAllCategories().map((category) => (
              <option key={category} value={category}>
                {category === "" ? "Show All Categories" : category}
              </option>
            ))}
          </select>
        </div>

        {categories.map((category) => (
          <div key={category} className="wrapper-list">
            <h2 className="text-center py-2">{category}</h2>
            <div className="listing-div">
              {filteredHotels
                .filter((hotel) => hotel.category === category)
                .map((filteredHotel) => (
                  <div key={filteredHotel.id} className="all-details">
                    <div>
                      <div>
                        <div>
                          <img
                            src="https://res.cloudinary.com/blackgirlmagic/image/upload/v1706273802/Fashion%20Envato/pexels-pixabay-158148_crdtvc.jpg"
                            className="img-top"
                            alt="yes"
                          />
                        </div>

                        <div>
                          <p class="card-text">
                            <b>Name:</b> {filteredHotel.name}
                          </p>
                          <p class="card-text">
                            <b>Country:</b> {filteredHotel.country}
                          </p>
                          <p class="card-text">
                            <b>Address:</b> {filteredHotel.address}
                          </p>

                          <div className="line"></div>
                          <p className="text-center mt-3">
                            <button
                              className="btn btn-danger me-5"
                              onClick={() => onDelete(filteredHotel.id)}
                            >
                              Delete
                            </button>
                            <button
                              className="btn btn-dark"
                              onClick={() => onEdit(filteredHotel)}
                            >
                              Edit
                            </button>
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
            </div>
            <p className="text-center mt-2">
              <button
                className="btn btn-danger"
                onClick={() => onDeleteCategory(category)}
              >
                Delete Category
              </button>
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HotelList;
