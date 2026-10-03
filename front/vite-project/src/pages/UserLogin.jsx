import { Link, redirect } from "react-router-dom";
import "../App.css";
import axios from "axios";


function UserLogin(){


const handleSubmit = async (e) => {

    e.preventDefault();


    const email = e.target.email.value;
    const password = e.target.password.value;


    console.log(email, password);


    try {

        const response = await axios.post(
            "/api/auth/login",
            {
                email,
                password
            } , {withCredentials: true}
        );


        console.log(response.data);
        alert("Login successful");
        window.location.href = "/";

    } catch(error){

        console.log(error);

    }

};



return(

<div className="auth-page">

<div className="auth-card">


<h1>
Welcome Back
</h1>


<p>
Login to continue
</p>



<form onSubmit={handleSubmit}>


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
Login
</button>


</form>



<div className="switch">

Don't have account?

<Link to="/user/register">
 Register
</Link>

</div>



<div className="or">
OR
</div>



<Link
className="outline-btn"
to="/foodpartner/login"
>

Login as Food Partner →

</Link>


</div>

</div>

)

}

export default UserLogin;