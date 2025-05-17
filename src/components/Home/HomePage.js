import { useSelector } from "react-redux";
import VideoHomepage from "../../assets/video-homepage.mp4";
import { useNavigate } from "react-router-dom";
import { useTranslation, Trans } from 'react-i18next';

const HomePage = (props) => {
  const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
  const navigate = useNavigate();
  const { t } = useTranslation();
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={VideoHomepage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="homepage-title">
          
          {t('homepage.title1')}
        </div>
        <div className="homepage-subtitle">
        {t('homepage.title2')}
        </div>
        <div className="homepage-start">
          {isAuthenticated ? (
            <button onClick={() => navigate('/users')} className="homepage-btn btn-dark">{t('homepage.title3.doing')}</button>
          ) : (
            <button onClick={() => navigate('/login')} className="homepage-btn btn-dark">
              {t('homepage.title3.login')}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default HomePage;
