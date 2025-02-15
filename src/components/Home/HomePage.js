import VideoHomepage from "../../assets/video-homepage.mp4";

const HomePage = (props) => {
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
          <button className="homepage-btn btn-dark">
            Get started—it's free
          </button>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
