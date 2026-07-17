import React from "react";
import "./service.css";
import { GrDeliver } from "react-icons/gr";
import { LuCookingPot } from "react-icons/lu";
import { IoMdBonfire } from "react-icons/io";
import { IoFastFoodOutline } from "react-icons/io5";


interface ServiceItem {
  id: number;
  title: string;
  description: string;
  img: string;
  icon: React.ReactNode; // updated type for React Icons
}

const servicesData: ServiceItem[] = [
  {
    id: 1,
    title: "Custom Recipe",
    description:
      "Experience our menu, crafted with care and passion for a distinctive culinary journey",
    img: "https://images.unsplash.com/photo-1551218808-94e220e084d2?fit=crop&w=600&h=400",
    icon: < LuCookingPot size={30} color="#ff6347" />,
  },
  {
    id: 2,
    title: "Door Delivery",
    description:
      "Convenient home delivery for our delicious menu, ensuring fresh flavours delivered to your door step",
    img: "https://i.pinimg.com/736x/5e/6c/23/5e6c233d5f78e5f300f76bf8dd448588.jpg",
    icon: <GrDeliver size={30} color="#4682b4" />,
  },
  {
    id: 3,
    title: "Family Dinner",
    description:
      "For those who enjoy outdoor dining, our KFC facilities provide the perfect setting for a delightful evening under the stars",
    img: "https://entertainment.inquirer.net/files/2024/11/KFC-Bucket-and-Match-TVC.png",
    icon: < IoFastFoodOutline size={30} color="#ff4500" />,
  },
];

const Service: React.FC = () => {
  return (
    <section className="services-section">
      <div className="services-header">
        <h2>Explore</h2>
        <h3>Our Services</h3>
      </div>
      <div className="services-cards">
        {servicesData.map((service) => (
          <div key={service.id} className="service-card">
            <img src={service.img} alt={service.title} />
            <div className="service-icon">{service.icon}</div>
            <h4>{service.title}</h4>
            <p>{service.description}</p>
            <button className="service-btn">Read More</button>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Service;
