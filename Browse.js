"use client"

/* eslint-disable @next/next/no-img-element */

import React, { useState, useEffect } from "react";
import './style.css'
import { Link } from "react-router-dom";

export default function Browse() {
  const [vehicles, setVehicles] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [notFound,setnotFound]= useState(false);
  useEffect(() => {
    const fetchVehicles = async () => {
      setIsLoading(true);
      try {
        const response = await fetch("/api/browse", {
          
            method: 'POST',
                  headers: {
                    'Content-Type': 'application/json',
                  }
                  
          });
       
        if (response.ok) {
          const data = await response.json();
          setVehicles(data.documents);
          setIsLoading(false);
          setnotFound(false)
        } else {
          console.log("Failed to fetch vehicles:", response.statusText);
          setnotFound(true);
        }
      } catch (error) {
        console.log("Error fetching vehicles:", error);
        setnotFound(true);
      }
    };

    fetchVehicles();
  }, []);


  
  const copyContactNumber = (contactNo) => {
    navigator.clipboard.writeText(contactNo)
      .then(() => {
        alert('Contact number copied to clipboard:', contactNo);
        
      })
      .catch((error) => {
        alert('Error copying contact number:', error);
        
      });
  };


  return (
    <div>
     
     
           {isLoading ? (
            <>
          
       <div className="loader"></div> 
        </>
     
      ) : (
       
        notFound ? (
          <>
           <p className='UserName'>Oops Looks like there are no selling vehicles Right now !!!</p> 
           <p className='UserName'>Please Try again later</p> 
          </>
        ):(
          <div>
          <Link to="/Add" className="sell"><button>Sell a Car</button></Link>
        <h1 className="browse">Browse Vehicles</h1>
       {vehicles.map((vehicle, index) => (
         <div key={index}>
           
           <img className="image" src={vehicle.url} alt={vehicle.CarName}></img>
           <div className="car_name">
             <h3 className="CarName">Car Name : {vehicle.CarName}</h3>
             <p className="rating">Rating : {vehicle.rating}</p>
           </div>
           <h3 className="Model">Model : {vehicle.model}</h3>
           <p className="Owned">Owned By : {vehicle.User}</p>
           <div className="Number_div">
             <p className="Contact">Contact TO Owner : </p>
             <p className="Number" onClick={() => copyContactNumber(vehicle.contactNo)}>{vehicle.contactNo}</p>
           </div>
           <h3 className="Price">Price : {vehicle.sellingPrice}</h3>
           <p className="Description">Description : {vehicle.description}</p>
           <hr></hr>
         </div>
       ))}
     </div>
        )
       

     
       
      )}
    </div>
  );
}
