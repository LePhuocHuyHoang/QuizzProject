import VideoHomePage from "../../assets/video-homepage.mp4";
const HomePage = (props) => {
  return (
    <div className="homepage-container">
      <video autoPlay muted loop>
        <source src={VideoHomePage} type="video/mp4" />
      </video>
      <div className="homepage-content">
        <div className="homepage-title">
          “We need to know that we're building the right things for real
          problems.”
        </div>
        <div className="homepage__description">
          Chase Clark, Senior UX Researcher at Calm, explains why they switched
          to Typeform.
        </div>
        <div className="homepage__button-wrapper">
          <button>Get's started.</button>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
