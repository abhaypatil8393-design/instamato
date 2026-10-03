
import { Link, useNavigate } from "react-router-dom";
import "../App.css";
import axios from "axios";


function FoodPartnerLogin() {


const navigate = useNavigate();



const handleSubmit = async (e) => {

    e.preventDefault();


    const email = e.target.email.value;
    const password = e.target.password.value;


    console.log(email, password);



    try {


        const response = await axios.post(
            "/api/auth/loginFoodpatner",
            {
                email: email,
                password: password
            },
            {
                withCredentials: true
            }
        );



        console.log(response.data);

        alert("Login successful");


        navigate("/create-food");


    } catch(error){


        console.log(error);

        alert("Login failed");


    }


};



return(


<div className="auth-page">


<form className="auth-card" onSubmit={handleSubmit}>


<h1>
Partner Login
</h1>



<p>
Manage your restaurant
</p>



<input
name="email"
type="email"
placeholder="Email"
required
/>



<input
name="password"
type="password"
placeholder="Password"
required
/>



<button type="submit">
Login
</button>



<div className="switch">


New partner?


<Link to="/foodpartner/register">
Register
</Link>


</div>



<div className="or">
OR
</div>



<Link
className="outline-btn"
to="/user/login"
>

Login as Normal User →

</Link>



</form>


</div>


)


}



export default FoodPartnerLogin;