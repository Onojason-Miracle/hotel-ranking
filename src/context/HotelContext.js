import React, { createContext, useContext, useEffect, useState } from "react";

const HotelContext = createContext();

const HotelProvider = ({ children }) => {
  const [state, setState] = useState({
    hotels: [],
    categories: ["1 Star", "2 Star", "3 Star"],
    selectedCategory: "",
    selectedHotel: null,
  });

  useEffect(() => {
    const storedState = JSON.parse(localStorage.getItem("hotelsApp"));
    if (storedState) {
      setState(storedState);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("hotelsApp", JSON.stringify(state));
  }, [state]);

  const addHotel = (hotel) => {
    setState((prevState) => ({
      ...prevState,
      hotels: [...prevState.hotels, hotel],
    }));
  };

  const deleteHotel = (hotelId) => {
    setState((prevState) => ({
      ...prevState,
      hotels: prevState.hotels.filter((hotel) => hotel.id !== hotelId),
    }));
  };

  const editHotel = (hotel) => {
    setState((prevState) => ({
      ...prevState,
      selectedHotel: hotel,
    }));
  };

  const updateHotel = (updatedHotel) => {
    setState((prevState) => ({
      ...prevState,
      hotels: prevState.hotels.map((hotel) =>
        hotel.id === updatedHotel.id ? updatedHotel : hotel
      ),
      selectedHotel: null,
    }));
  };

  const addCategory = (category) => {
    setState((prevState) => ({
      ...prevState,
      categories: [...prevState.categories, category],
    }));
  };

  const updateCategory = (oldCategory, newCategory) => {
    setState((prevState) => ({
      ...prevState,
      categories: prevState.categories.map((cat) =>
        cat === oldCategory ? newCategory : cat
      ),
    }));
  };

  const deleteCategory = (category) => {
    const confirmDelete = window.confirm(
      `Are you sure you want to delete the category '${category}'?`
    );
    if (confirmDelete) {
      setState((prevState) => ({
        ...prevState,
        categories: prevState.categories.filter((cat) => cat !== category),
      }));
    }
  };

  const selectCategory = (category) => {
    console.log("Selecting  miracle:", category);
    setState((prevState) => ({
      ...prevState,
      selectedCategory: category,
    }));
  };

  return (
    <HotelContext.Provider
      value={{
        state,
        addHotel,
        deleteHotel,
        editHotel,
        updateHotel,
        addCategory,
        selectCategory,
        updateCategory,
        deleteCategory,
      }}
    >
      {children}
    </HotelContext.Provider>
  );
};

const useHotelContext = () => {
  const context = useContext(HotelContext);
  if (!context) {
    throw new Error("useHotelContext must be used within a HotelProvider");
  }
  return context;
};

export { HotelProvider, useHotelContext };
