import React from "react";
import "../pages/about.css";

const About = () => {
  return (
    <section className="about">
      <div className="about-image">
        <img
          src="https://i.ytimg.com/vi/Dn4G_OP5Lc0/maxresdefault.jpg"
          alt="About KFC"
        />
      </div>

      <div className="about-content">
        <h4>About Us</h4>
        <h2>KFC</h2>

        <p>
          Discover a heaven of luxury and relaxation in our meticulously
          designed rooms and suites, ensuring scenery and memorable stay.
        </p>

        <p>
          Our hotel combines modern elegance with personalized service,
          offering amenities tailored to both leisure and business travellers,
          ensuring every guest enjoys a seamless and enjoyable experience.
        </p>

        <button>Learn More</button>
      </div>
    </section>
  );
};

export default About;
