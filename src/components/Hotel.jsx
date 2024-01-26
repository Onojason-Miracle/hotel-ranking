
import React from "react";

const Hotel = ({ hotel, onDelete, onEdit }) => {
  return (
    <div>
      <h3>{hotel.name}</h3>
      <p>Country: {hotel.country}</p>
      <p>Address: {hotel.address}</p>
      <p>Category: {hotel.category}</p>
      <p>
        <hotel className="image"></hotel>
      </p>
      <button onClick={() => onEdit(hotel)}>Edit</button>
      <button onClick={() => onDelete(hotel.id)}>Delete</button>
    </div>
  );
};

export default Hotel;
