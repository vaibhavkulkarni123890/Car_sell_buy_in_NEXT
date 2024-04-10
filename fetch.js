"use client"
import React, { useState } from "react";
import './style.css'

export default function FetchApp() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [contactNo, setContactNo] = useState('');
  const [notFound, setNotFound] = useState(false);

  async function fetchVehicles() {
    setIsLoading(true);
    setNotFound(false);
    try {
      const response = await fetch("/api/Fetch", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ contactNo: contactNo })
      });

      if (response.ok) {
        const data = await response.json();
        setVehicles(data.documents);
        setIsLoading(false);
        setNotFound(false);
      } else {
        console.error("Failed to fetch vehicles:", response.statusText);
        setIsLoading(false);
        setNotFound(true);
      }
    } catch (error) {
      console.error("Error fetching vehicles:", error);
      setIsLoading(false);
      setNotFound(true);
    }
  };

  const handleContactNoChange = (e) => {
    setContactNo(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        required={true}
        value={contactNo}
        placeholder="Enter Your contact Number "
        onChange={handleContactNoChange}
      />
      <button onClick={fetchVehicles}>Search</button>
      {notFound ? (
        <p className='UserName'>No selling history found for the provided contact number.</p>
      ) : (
        !isLoading && (
          <div>
            <h1 className='UserName'>Your Selling History Listings </h1>
            {vehicles.map((vehicle, index) => (
              <div key={index}>
                <img className="image" src={vehicle.url} alt={vehicle.CarName}></img>
                <div className="car_name">
                  <h3 className='UserName'>Car Name : {vehicle.CarName}</h3>
                  <p className="rating">Rating : {vehicle.rating}</p>
                </div>
                <h3 className='UserName'>Model : {vehicle.model}</h3>
                <p className='UserName'>Owned By : {vehicle.User}</p>
                <div className="Number_div">
                  <p className='UserName'>Your Number: </p>
                  <p className="Number" onClick={() => copyContactNumber(vehicle.contactNo)}>{vehicle.contactNo}</p>
                </div>
                <h3 className='UserName'>Price : {vehicle.sellingPrice}</h3>
                <p className='UserName'>Description : {vehicle.description}</p>
                <hr></hr>
              </div>
            ))}
          </div>
        )
      )}
      {isLoading && (
        <>
          <div className="loader"></div>
        </>
      )}
    </div>
  );
}
