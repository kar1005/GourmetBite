import { useNavigate } from "react-router";
import React,{useState} from 'react'

function ContactForm() {
    const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const method = "POST";
    const headers = {
      "Content-Type": "application/json", // Fix: "Content-Type" instead of "ContentType"
    };
    const body = JSON.stringify(formData);
    try {
      const response = await fetch(`http://localhost:5000/contactus/`, {
        method,
        body,
        headers,
      });
      if (response.ok) {
        navigate("/");
      } else {
        alert(`Failed to send message. Error: ${response.status}`);
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <>
        <h3>Contact Us</h3>
        <div className="contact-container">
        <div className="contactus">
        <h3>Contact Us</h3>
        <form onSubmit={handleSubmit} className="contactUsForm">
          <div className="inputGroup">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name" // Added name attribute
              placeholder="Enter your Name"
              value={formData.name}
              onChange={handleChange}
            />
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email" // Added name attribute
              placeholder="Enter your email"
              value={formData.email}
              onChange={handleChange}
            />
            <label htmlFor="message">Message</label> {/* Fix: Updated htmlFor and label */}
            <textarea
              id="message" // Added id attribute
              name="message" // Added name attribute
              placeholder="Enter your message"
              value={formData.message} // Fix: Use formData.message as value
              onChange={handleChange} // Fix: Call handleChange on change
            />
            <button type="submit" className="order_now">SEND MESSAGE</button>
          </div>
        </form>
      </div>
        </div>
    </>
  )
}

export default ContactForm
