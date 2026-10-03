import React, { useEffect, useRef, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "./Home.css";

const Home = () => {
  const [videos, setVideos] = useState([]);
  const videoRefs = useRef(new Map());
  const containerRef = useRef(null);

  // Fetch video data from backend
  useEffect(() => {
    axios.get("/api/auth/food/getfood" , { withCredentials: true})
      .then(response => {
        setVideos(response.data.fooditem);
      })
      .catch(error => {
        console.error("Error fetching videos:", error);
      });
  }, []);

  // Function to attach refs to each video element
  const setVideoRef = (id) => (el) => {
    if (!el) {
      videoRefs.current.delete(id);
      return;
    }
    videoRefs.current.set(id, el);
  };

   useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const video = entry.target;

          if (entry.isIntersecting) {
            video.play().catch(() => {});
          } else {
            video.pause();
          }
        });
      },
      {
        threshold: 0.8,
      }
    );

    videoRefs.current.forEach((video) => observer.observe(video));

    return () => observer.disconnect();
  }, [videos]);

  const handleLike = (foodId) => {
    axios.post("/api/auth/food/like", { foodid: foodId }, { withCredentials: true })
      .then(response => {
        setVideos(prevVideos =>
          prevVideos.map(video => {
            if (video._id === foodId) {
              const isLiked = !video.isLiked;
              return {
                ...video,
                isLiked,
                likecout: isLiked ? (video.likecout || 0) + 1 : Math.max(0, (video.likecout || 1) - 1)
              };
            }
            return video;
          })
        );
      })
      .catch(error => {
        console.error("Error liking video:", error);
      });
  };

  const handleSave = (foodId) => {
    axios.post("/api/auth/food/save", { foodid: foodId }, { withCredentials: true })
      .then(response => {
        setVideos(prevVideos =>
          prevVideos.map(video => {
            if (video._id === foodId) {
              const isSaved = !video.isSaved;
              return {
                ...video,
                isSaved,
                savecount: isSaved ? (video.savecount || 0) + 1 : Math.max(0, (video.savecount || 1) - 1)
              };
            }
            return video;
          })
        );
      })
      .catch(error => {
        console.error("Error saving video:", error);
      });
  };

  return (
    <div ref={containerRef} className="reels-page">
      <div className="reels-feed" role="list">
        {videos.map((fooditem) => (
          <section key={fooditem._id} className="reel" role="listitem">
            <video
              ref={setVideoRef(fooditem._id)}
              className="reel-video"
              src={fooditem.video}          // backend should provide video URL
              muted
              playsInline
              loop
              preload="metadata"
              controls
            />

            <div className="reel-overlay">
              <div className="reel-overlay-gradient" aria-hidden="true" />
              <div className="reel-content">
                <p
                  className="reel-description"
                  title={fooditem.descripttion}
                >
                  {fooditem.descripttion}
                </p>
                <Link
                   className="reel-btn"
                   to={`/profile/${fooditem.foodpatner}`}
                       aria-label="View food partner"
                 >
             View Partner
           </Link>
              </div>
            </div>

            {/* Reel Action Buttons Sidebar */}
            <div className="reel-sidebar">
              <button
                className={`action-btn like-btn ${fooditem.isLiked ? "active" : ""}`}
                onClick={() => handleLike(fooditem._id)}
                aria-label={fooditem.isLiked ? "Unlike food item" : "Like food item"}
              >
                <svg
                  className="action-icon"
                  viewBox="0 0 24 24"
                  fill={fooditem.isLiked ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" />
                </svg>
                <span className="action-count">{fooditem.likecout || 0}</span>
              </button>

              <button
                className={`action-btn save-btn ${fooditem.isSaved ? "active" : ""}`}
                onClick={() => handleSave(fooditem._id)}
                aria-label={fooditem.isSaved ? "Unsave food item" : "Save food item"}
              >
                <svg
                  className="action-icon"
                  viewBox="0 0 24 24"
                  fill={fooditem.isSaved ? "currentColor" : "none"}
                  stroke="currentColor"
                  strokeWidth="2"
                >
                  <path d="m19 21-7-4-7 4V5a2 2 0 0 1 2-2h10a2 2 0 0 1 2 2v16z" />
                </svg>
                <span className="action-count">{fooditem.savecount || 0}</span>
              </button>
            </div>
          </section>
        ))}
      </div>
    </div>
  );
};

export default Home;
