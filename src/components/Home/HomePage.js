import { useSelector } from "react-redux";
import VideoHomepage from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={VideoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="homepage-title">
          Get to know your customers with forms
        </div>
        <div className="homepage-subtitle">
          Collect all the data you need to understand customers with forms
          designed to be refreshingly different.
        </div>
        <div className="homepage-start">
          {isAuthenticated ? (
            <button onClick={() => navigate('/users')} className="homepage-btn btn-dark">Doing Quiz Now</button>
          ) : (
            <button onClick={() => navigate('/login')} className="homepage-btn btn-dark">
              Get started—it's free
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
