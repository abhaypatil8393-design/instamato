

import React from "react";
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";

function FoodPartnerRegister() {

  const navigate = useNavigate();

  const handleSubmit = async (e) => {

    e.preventDefault();

    const name = e.target.name.value;
    const ContactName = e.target.ContactName.value;
    const Phonenumber = e.target.Phonenumber.value;
    const address = e.target.address.value;
    const email = e.target.email.value;
    const password = e.target.password.value;


    try {

      const response = await axios.post(
        "/api/auth/registerpatner",
        {
          name: name,
          ContactName: ContactName,
          Phonenumber: Phonenumber,
          address: address,
          email: email,
          password: password,
        },
        {
          withCredentials: true
        }
      );


      console.log(response.data);

      navigate("/create-food");


    } catch(error) {

      console.log(error);

    }

  };


  return (

    <div className="auth-page">


      <form className="auth-card" onSubmit={handleSubmit}>


        <h1>
          Create Partner Account
        </h1>


        <p>
          Register your business and grow with us
        </p>



        <input
          name="name"
          placeholder="Business Name"
          required
        />



        <input
          name="ContactName"
          placeholder="Contact Name"
          required
        />



        <input
          name="Phonenumber"
          placeholder="Phone Number"
          required
        />



        <input
          name="email"
          type="email"
          placeholder="email"
          required
        />



        <input
          name="password"
          type="password"
          placeholder="password"
          required
        />



        <input
          name="address"
          placeholder="Business Address"
          required
        />



        <button type="submit">
          Create Partner Account
        </button>




        <div className="switch">

          Already a partner?

          <Link to="/foodpartner/login">
            Login
          </Link>

        </div>




        <div className="or">
          OR
        </div>




        <Link
          className="outline-btn"
          to="/user/register"
        >
          Register as Normal User →
        </Link>



      </form>


    </div>

  );

}


export default FoodPartnerRegister;