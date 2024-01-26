import React, { useState } from "react";
import "./App.css";
import CountryAPI from "./components/countryAPI";
import Navbar from "./components/Navbar";
import HotelList from "./components/hotelList";
import HotelForm from "./components/hotelForm";
import Homepage from "./components/Homepage";
import Footer from "./components/Footer";

import { HotelProvider, useHotelContext } from "./context/HotelContext";

function App() {
  const {
    state,
    addHotel,
    deleteHotel,
    editHotel,
    updateHotel,
    addCategory,
    updateCategory,
    selectCategory,
    deleteCategory,
  } = useHotelContext();
  const [countries, setCountries] = useState([]);

  const handleCountriesFetched = (fetchedCountries) => {
    setCountries(fetchedCountries);
  };

  const handleCategoryChange = (category) => {
    selectCategory(category);
  };

  const handleHotelAddition = (newHotel) => {
    addHotel(newHotel);
  };

  const handleCategoryDeletion = (category) => {
    deleteCategory(category);
  };

  const handleCategoryUpdate = (e) => {
    if (e && e.preventDefault) {
      e.preventDefault();
    }
    const oldCategory = prompt("Enter the existing category:");
    if (oldCategory) {
      const newCategory = prompt("Enter the new category:");
      if (newCategory) {
        updateCategory(oldCategory, newCategory);
      }
    }
  };

  return (
    <div className="App">
      <HotelForm
        onAdd={handleHotelAddition}
        onUpdate={updateHotel}
        categories={state.categories}
        countries={countries}
        selectedHotel={state.selectedHotel}
        selectCategory={handleCategoryChange}
        updateCategory={handleCategoryUpdate}
        addCategory={addCategory}
      />
      <HotelList
        hotels={state.hotels.filter(
          (hotel) => hotel.category === state.selectedCategory
        )}
        onDelete={deleteHotel}
        onEdit={editHotel}
        onDeleteCategory={handleCategoryDeletion}
        onAddCategory={addCategory}
      />

      <CountryAPI onCountriesFetched={handleCountriesFetched} />
    </div>
  );
}

const AppWrapper = () => {
  return (
    <HotelProvider>
      <Navbar />
      <Homepage />
      <App />
      <Footer />
    </HotelProvider>
  );
};

export default AppWrapper;
