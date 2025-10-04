import React from 'react';

const Home = () => (
  <>
    {/* All component styles, including base styles, layouts, and responsive media queries, 
      are now consolidated into this single <style> block. This is a cleaner approach.
    */}
    <style>
      {`
        .video-background {
          position: fixed;
          top: 0;
          left: 0;
          width: 100vw;
          height: 100vh;
          object-fit: cover;
          z-index: -1; /* Placed behind the content */
        }

.home-container {
    text-align: center;
    margin: 20px;
}

.home-container p {
    color: #fff;
}

.home-title {
    /* Creates a gradient text effect */
    background: linear-gradient(45deg, rgba(255, 55, 0, 1), rgba(255, 255, 255, 1), rgba(255, 55, 0, 1));
    -webkit-background-clip: text;
    background-clip: text;
    -webkit-text-fill-color: transparent;
    font-size: 2.5rem;
    margin-top: 20px;
}
.home-description {
    font-size: 1.2rem;
    color: #ffffff;
    margin-bottom: 20px;
}

.cards-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 20px;
    width: 100%;
}

.card {
    background: rgba(0, 0, 0, 0.7);
    color: #fff;
    padding: 20px;
    border-radius: 10px;
    border: 2px solid #ff9800;
    box-shadow: 0 4px 10px rgba(0, 0, 0, 0.3);
    width: 90%;
    text-align: center;
}

.card-title {
    font-size: 1.8rem;
    margin:0;
    padding:10px;
    color: #ff9800;
}

.card-text {
    font-size: 1rem;
    color: #ddd;
    text-align: center;
}

.card-text1 {
    font-size: 1rem;
    color: #ddd;
    text-align: center;
}

       @media (max-width: 992px) {
          .home-title {
            font-size: 2.5rem;
            color: #ff9800;
          }
          .cards-container {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
          }
          .home-title {
            font-size: 2rem;
            margin-top: 20px;
          }
          .home-description{
            font-size: 1rem;
          }
          .card {
            width: 90%;
          }
          .card-title {
              font-size: 1.5rem;
              margin:0;
              padding:10px;
              color: #ff9800;
          }
          .card-text {
              font-size: 0.8rem;
              color: #ddd;
              text-align: justify;
          }

          .card-text1 {
              font-size: 0.8rem;
              color: #ddd;
              text-align: justify;
          }
        }
        @media (max-width: 768px) {
          .cards-container {
            flex-direction: column;
            justify-content: center;
            align-items: center;
            gap: 40px;
          }
        }
      `}
    </style>

    <div className="home-container">
      {/* Background Video */}
      <video autoPlay loop muted className="video-background">
        <source src="vdo.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Content Overlay */}
      <div className="content">
        <h1 className="home-title">Welcome to The Great Scam Escape</h1>
        <p className="home-description">
          Learn to protect yourself from scams through interactive challenges.
        </p>

        <div className="cards-container">
          {/* Card 1 - Ideology */}
          <div className="card">
            <h2 className="card-title">Our Ideology</h2>
            <p className="card-text1">
              Awareness is Power – Scammers succeed when people don’t know their tricks. We make learning easy, fun, and effective.
              <br /><br />
              Think Before You Click – Urgency is a scammer’s biggest weapon. Our app trains users to pause, verify, and act smart.
              <br /><br />
              Prevention is the Best Defense – We believe knowledge can save money, identity, and peace of mind.
            </p>
          </div>

          {/* Card 2 - Benefits */}
          <div className="card">
            <h2 className="card-title">About Us</h2>
            <p className="card-text">
              Aquix is a web app designed to raise awareness about scams...
              <br /><br />
              With expert tips and practical insights, Aquix empowers ordinary people...
            </p>
          </div>
        </div>
      </div>
    </div>
  </>
);

export default Home;

