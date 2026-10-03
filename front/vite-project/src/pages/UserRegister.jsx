import React from "react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";


function UserRegister() {

  const navigate = useNavigate();
  const handleSubmit = async (e) => {

    e.preventDefault();


    const firstname = e.target.firstname.value;
    const lastname = e.target.lastname.value;
    const email = e.target.email.value;
    const password = e.target.password.value;


    console.log(firstname);


    try {

      const response = await axios.post(
        "/api/auth/register",
        {
          name: firstname + " " + lastname,
          email: email,
          password: password,
        } , {withCredentials: true}
      );


      console.log(response.data);
      navigate("/");


    } catch(error){

      console.log(error);

    }


  };


  return (

    <div className="auth-page">


      <div className="auth-card">


        <h1>Create your account</h1>


        <p>
          Join us and enjoy amazing food
        </p>



        <form onSubmit={handleSubmit}>


          <input 
          name="firstname"
          placeholder="First Name"
          />



          <input 
          name="lastname"
          placeholder="Last Name"
          />



          <input 
          name="email"
          placeholder="Email"
          />



          <input 
          name="password"
          type="password"
          placeholder="Password"
          />



          <button type="submit">
            Sign Up
          </button>


        </form>




        <div className="switch">

        Already have an account?

        <Link to="/user/login">
          Login
        </Link>

        </div>



        <div className="or">
          OR
        </div>



        <Link 
        className="outline-btn"
        to="/foodpartner/register"
        >

        Register as Food Partner →

        </Link>


      </div>


    </div>

  );

}


export default UserRegister;