import React, { useState, useEffect } from "react";
import "./profile.css";
import axios from "axios";
import { useParams } from "react-router-dom";

const Profile = () => {

  const { id } = useParams();

  const [profile, setProfile] = useState(null);

  const [videos , setVideos] = useState([]);

  useEffect(() => {

    axios.get(`/api/food-patner/${id}`, {
      withCredentials: true
    })
    .then((response) => {

      setProfile(response.data.foodpatner2);
      setVideos(response.data.foodpatner2.fooditem);
      // console.log("data is here")
      // console.log(response.data);
      // console.log("fooditeam is here")
      // console.log(response.data.foodpatner2.fooditem)

    })
    .catch((error) => {
      console.log(error);
    });

  }, [id]);


  return (
    <div className="profile-page-wrapper">

      <div className="profile-card">

        <div className="profile-header-card">

          <div className="business-info">

            <div className="avatar" />

            <div className="badge-container">

              <span className="badge badge-title">
                {profile?.name}
              </span>

              <span className="badge badge-address">
                {profile?.address}
              </span>

            </div>

          </div>


          <div className="stats-container">

            <div className="stat-box">
              <p className="stat-label">total meals</p>
              <p className="stat-value">43</p>
            </div>

            <div className="stat-box">
              <p className="stat-label">customer serve</p>
              <p className="stat-value">15K</p>
            </div>

          </div>

        </div>


       <div className="video-grid">

  {videos.map((item, index) => (

    <div key={index} className="video-tile">

      {index === 1 && <span className="video-tile-circle-icon" />}

      <video width="200" controls>
        <source src={item.video} type="video/mp4" />
      </video>

      {/* <p>{item.name}</p> */}

    </div>

  ))}

</div>


      </div>

    </div>
  );
};

export default Profile;