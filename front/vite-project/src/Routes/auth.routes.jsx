import { Routes, Route } from "react-router-dom";

import UserRegister from "../pages/UserRegister";
import UserLogin from "../pages/UserLogin";
import FoodPartnerRegister from "../pages/FoodPartnerRegister";
import FoodPartnerLogin from "../pages/FoodPartnerLogin";
import Home from "../pages/general/home.jsx";
import CreateFood from "../pages/create-food/createfood.jsx";
import Profile from "../pages/create-food/profile.jsx";


function AuthRoutes(){

return(
<Routes>

<Route
 path="/" element={<Home/>}
 />

<Route 
path="/user/register" 
element={<UserRegister/>}
/>


<Route 
path="/user/login" 
element={<UserLogin/>}
/>

<Route 
path="/foodpartner/register" 
element={<FoodPartnerRegister/>}
/>

<Route 
path="/foodpartner/login" 
element={<FoodPartnerLogin/>}
/>
<Route
path="/create-food"
element={<CreateFood/>}
/>


<Route path="/profile/:id" element={<Profile />} />

</Routes>


)

}

export default AuthRoutes;