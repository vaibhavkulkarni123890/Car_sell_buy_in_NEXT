"use client"
import './style.css'
import React, { useState } from "react";
import { Link } from 'react-router-dom';
import { Toaster, toast } from 'react-hot-toast';
export default function AddVehicleForm() {
  const [isLoading,setIsLoading]=useState();
  const [formData, setFormData] = useState({
    User: "",
    CarName: "",
    sellingPrice: "",
    url: "",
    description: "",
    model: "",
    rating: "",
    contactNo: ""
  });
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsLoading(true);
      const response = await fetch("/api/vehicle", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        console.log("Vehicle added successfully!");
        toast.success("Added Successfully")
        setIsLoading(false);
        setFormData('')
      } else {
        console.error("Failed to add vehicle:", response.statusText);
        toast.fail("Could not save please try later ")
      }
    } catch (error) {
      console.error("Error adding vehicle:", error);
      toast.fail("Internal Server error")
    }
  };




  return (

    <div >
      <Toaster/>
      <div>
      <Link to="/FetchApp" className="sell"><button>Sell History</button></Link>
      </div>
      {isLoading ? (
       
       <div className="loader"></div>
     ) : (
      <div className='addvehiclediv'>
        
      <h2 className='UserName'>please Provide The Vehicle Details To Sell</h2>
      <form onSubmit={handleSubmit}>
      <div>
      <label className='UserName'>User name:</label>
        <input className='addvehicle'
        required={true}
          type="text"
          name="User"
          value={formData.User}
          onChange={handleChange}
        />
      </div>
        <div>
        <label className='UserName'>Car Name:</label>
        <input className='addvehicle'
        required={true}
          type="text"
          name="CarName"
          value={formData.CarName}
          onChange={handleChange}
        />
        </div>
        <div>
        <label className='UserName'>Selling Price:</label>
         <input className='addvehicle'
       required={true}
           type="text"
          name="sellingPrice"
           value={formData.sellingPrice}
           onChange={handleChange}
         />
        </div>
     
          <div>
          <label className='UserName'>Enter vehicle image Url : </label>
          <input
          className='addvehicle'
           type="text"
           name="url"
           value={formData.url}
           onChange={handleChange}
         /></div>    
         <div>
         <label className='UserName'>Enter description:</label>
         <input className='addvehicle'
          required={true}
           type="text"
           name="description"
           value={formData.description}
           onChange={handleChange}
        />
         </div>
         <div>
         <label className='UserName'>Enter model:</label>
         <input className='addvehicle'
          required={true}
           type="text"
           name="model"
           value={formData.model}
           onChange={handleChange}
         />
         </div>
        <div>
        <label className='UserName'>Enter rating of vehicle:</label>
         <input className='addvehicle'
          required={true}
           type="text"
           name="rating"
           value={formData.rating}
           onChange={handleChange}
         />
        </div>
         <div>
         <label className='UserName'>Enter your contactNo:</label>
          <input className='addvehicle'
          required={true}
           type="text"
           name="contactNo"
           value={formData.contactNo}
           onChange={handleChange}
         />
         </div>
         
        <button className='addvehiclebtn' type="submit">Submit</button>
      </form>
      </div>
     )}
    </div>
  );
  
}
