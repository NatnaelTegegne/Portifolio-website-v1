import React, { useState } from "react";
import axios from "axios";
import { FaGithub, FaLinkedin, FaEnvelope } from "react-icons/fa";

import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: ''
    });
    const [status, setStatus] = useState(''); //to show success/error messages

    //Handle typing in the input fields
    const handleChange = (e) => {
        setFormData({
           ...formData,
        [e.target.name]: e.target.value //Updates the specific field being typed in
        });
    };

    //Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();  //stop the page from reloading
        setStatus('Sending...');

        try {
            const response = await fetch(`${import.meta.env.VITE_API_URL}/contact`, {
              method: 'POST', //we are sending data
              headers: {
                'Content-Type' : 'application/json',
              },
              body: JSON.stringify(formData), //Convert our object to JSON text
            });


            if (response.ok) {
                setStatus('success');
                setFormData({ name: '', email: '', message: ''}); //clear the form
            } else {
              setStatus('Failed to send message.');
            }
        } catch (error) {
            setStatus('error');
            console.error('Error sending message: ', error);
        }

        setTimeout(() => setStatus(''), 5000);
    };
    
    return (
        <section id="contact" className="get-in-touch">
            <div className="contact-container">
                <h2 className="section-title">Get In Touch</h2>
                
                <div className="contact-content">
          <div className="contact-info">
            <h3 className="contact-info-title">Contact Information</h3>
            <div className="contact-details">
              <div className="contact-detail">
                <FaEnvelope size={45}  className='icon'/>
                <div className="contact-detail-wrapper">
                    <strong>Email</strong>
                        <p>Nat205@pitt.edu</p>
                </div>
              </div>
              <div className="contact-detail">
                <FaLinkedin size={45} className='icon' />
                <div className="contact-detail-wrapper">
                    <strong>LinkedIn</strong>
                        <p>www.linkedin.com/in/natnael-tegegne</p>
                </div>
              </div>
              <div className="contact-detail">
                <FaGithub size={45}  className='icon' />
                <div className="contact-detail-wrapper">
                    <strong>GitHub</strong>
                        <p>github.com/NatnaelTegegne</p>
                </div>
              </div>
            </div>
            <div className="contact-status">
              <strong>Current Status</strong>
              <p>Send me a message if you're working on something at the intersection of math, tech, ai and finance!</p>
            </div>
          </div>

          <div className="contact-form-container">
            <h3 className="form-title">Send Me a Message</h3>
            <form className="contact-form" onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="name">Name</label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>
              <div className="form-group">
                <label htmlFor="message">Message</label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  rows="6"
                  required
                ></textarea>
              </div>
              <button type="submit" className="submit-btn" disabled={status === 'sending'}>
                {status === 'sending' ? 'Sending...' : 'Send Message'}
              </button>
              {status === 'success' && (
                <p className="status-message success">Message sent! I will get back to you soon.😊</p>
              )}
              {status === 'error' && (
                <p className="status-message error">Error sending message. Please try again.😔</p>
              )}
            </form>
          </div>
        </div>
            </div>
        </section>

    )
};

export default Contact;
