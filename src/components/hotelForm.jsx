import React, { useState, useEffect } from "react";

const HotelForm = ({
  onAdd,
  categories,
  countries,
  selectedHotel,
  onUpdate,
  selectCategory,
  addCategory,
  updateCategory,
}) => {
  const [name, setName] = useState("");
  const [country, setCountry] = useState(countries[0]);
  const [address, setAddress] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [image, setImage] = useState("");

  useEffect(() => {
    if (selectedHotel) {
      setName(selectedHotel.name);
      setCountry(selectedHotel.country);
      setAddress(selectedHotel.address);
      setCategory(selectedHotel.category);
      setImage(selectedHotel.image);
    }
  }, [selectedHotel]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (selectedHotel) {
      const updatedHotel = {
        ...selectedHotel,
        name,
        country,
        address,
        category,
      };
      onUpdate(updatedHotel);
    } else {
      const newHotel = {
        name,
        country,
        address,
        category,
        image,
        id: Date.now(),
      };
      onAdd(newHotel);
    }

    // Resetting the for form fields
    setName("");
    setCountry(countries[0]);
    setAddress("");
    setCategory(categories[0]);
    setImage("");
  };

  const handleCategoryAddition = (e) => {
    e.preventDefault();
    const newCategory = prompt("Enter a new category:");
    if (newCategory) {
      addCategory(newCategory);
    }
  };

  const handleCategoryUpdate = (e) => {
    e.preventDefault();
    const oldCategory = prompt("Enter the existing category:");
    if (oldCategory) {
      const newCategory = prompt("Enter the new category:");
      if (newCategory) {
        updateCategory(oldCategory, newCategory);
      }
    }
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        setImage(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="main-div">
      <div className="form-wrapper">
        <div className="form-img-div">
          <img
            src="https://res.cloudinary.com/blackgirlmagic/image/upload/v1706273802/Fashion%20Envato/pexels-pixabay-258154_alsrt7.jpg"
            alt="hotel"
          />
        </div>
        <div className="form-div">
          <form onSubmit={handleSubmit}>
            <h1 className="form-header">
              {selectedHotel ? "Edit Hotel" : "Add Hotel"}
            </h1>

            <p className="form-group">
              <label className="form-label">Name:</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </p>

            <p className="form-group">
              <label className="form-label">Address:</label>
              <input
                type="text"
                className="form-control form-control-lg"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                required
              />
            </p>

            <p className="form-group">
              <label className="form-label">Country:</label>
              <select
                className="form-select"
                required
                value={country}
                onChange={(e) => setCountry(e.target.value)}
              >
                {countries.map((countryOption, index) => (
                  <option key={index} value={countryOption}>
                    {countryOption}
                  </option>
                ))}
              </select>
            </p>

            <p className="form-group">
              <label className="form-label">Category:</label>
              <select
                className="form-select"
                required
                value={category}
                onChange={(e) => setCategory(e.target.value)}
              >
                {categories.map((cat) => (
                  <option key={cat} value={cat}>
                    {cat}
                  </option>
                ))}
              </select>
            </p>

            <p className="buttons">
              <button
                className="btn btn-warning"
                type="button"
                onClick={handleCategoryAddition}
              >
                Add Category
              </button>

              <button
                className="btn btn-outline-warning"
                type="button"
                onClick={handleCategoryUpdate}
              >
                Update Category
              </button>
            </p>
            <p className="text-center mt-4">
              <button className="btn btn-light" type="submit">
                {selectedHotel ? "Update Hotel" : "Add Hotel"}
              </button>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default HotelForm;
