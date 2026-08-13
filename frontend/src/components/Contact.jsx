import React, { useState } from "react";
import { FaGithub, FaLinkedin } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import '../styles/Contact.css';

const Contact = () => {
    const [formData, setFormData] = useState({ name: '', email: '', message: '' });
    const [status, setStatus] = useState('');

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setStatus('sending');

        try {
            // The endpoint is a Google Apps Script, which sends no CORS headers,
            // so this has to be a no-cors request. That makes the response
            // opaque: status is always 0 and `ok` is always false, even on
            // success. A resolved promise means the request was delivered, so
            // that — not the response — is what we treat as success.
            // Note: no-cors also strips the Content-Type header, so there is no
            // point setting it here; the script receives the body as text.
            await fetch(`${import.meta.env.VITE_API_URL}`, {
                method: 'POST',
                mode: 'no-cors',
                body: JSON.stringify(formData),
            });
            setStatus('success');
            setFormData({ name: '', email: '', message: '' });
        } catch {
            setStatus('error');
        }
        setTimeout(() => setStatus(''), 5000);
    };

    const contactDetails = [
        {
            icon: <HiOutlineMail size={20} />,
            label: "Email",
            value: "natnaelbereta@gmail.com",
            href: "mailto:natnaelbereta@gmail.com",
        },
        {
            icon: <FaLinkedin size={18} />,
            label: "LinkedIn",
            value: "natnael-tegegne",
            href: "https://www.linkedin.com/in/natnael-tegegne",
        },
        {
            icon: <FaGithub size={18} />,
            label: "GitHub",
            value: "NatnaelTegegne",
            href: "https://github.com/NatnaelTegegne",
        },
        {
            icon: <HiOutlineLocationMarker size={20} />,
            label: "Location",
            value: "Pittsburgh, PA",
            href: null,
        },
    ];

    return (
        <section id="contact" className="contact-section">
            <div className="contact-container">
                {/* Header */}
                <div className="section-header">
                    <div className="section-num-header">
                        <span className="section-sym">§</span>
                        <span className="section-num">04</span>
                        <span className="section-label">Contact</span>
                    </div>
                    <h2 className="section-title">Let's Talk</h2>
                    <p className="section-subtitle">
                        Working on something at the intersection of math, tech, AI, and finance?
                        I'd love to hear from you.
                    </p>
                </div>

                <div className="contact-grid">
                    {/* Info column */}
                    <div className="contact-info">
                        <div className="contact-details-list">
                            {contactDetails.map((item, i) => (
                                <div key={i} className="contact-detail-item">
                                    <div className="detail-icon">{item.icon}</div>
                                    <div>
                                        <p className="detail-label">{item.label}</p>
                                        {item.href ? (
                                            <a
                                                href={item.href}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                                className="detail-value link"
                                            >
                                                {item.value}
                                            </a>
                                        ) : (
                                            <p className="detail-value">{item.value}</p>
                                        )}
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>

                    {/* Form column */}
                    <div className="contact-form-wrapper">
                        <form className="contact-form" onSubmit={handleSubmit}>
                            <div className="form-row">
                                <div className="form-field">
                                    <label htmlFor="name" className="form-label">Name</label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        placeholder="Your name"
                                        className="form-input"
                                        required
                                    />
                                </div>
                                <div className="form-field">
                                    <label htmlFor="email" className="form-label">Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        placeholder="your@email.com"
                                        className="form-input"
                                        required
                                    />
                                </div>
                            </div>
                            <div className="form-field">
                                <label htmlFor="message" className="form-label">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    value={formData.message}
                                    onChange={handleChange}
                                    placeholder="Tell me about your project or idea..."
                                    className="form-input form-textarea"
                                    rows="6"
                                    required
                                />
                            </div>
                            <button
                                type="submit"
                                className="btn-primary submit-btn"
                                disabled={status === 'sending'}
                            >
                                {status === 'sending' ? 'Sending…' : 'Send Message'}
                            </button>

                            {status === 'success' && (
                                <p className="form-status success">
                                    ✓ Message sent! I'll get back to you soon.
                                </p>
                            )}
                            {status === 'error' && (
                                <p className="form-status error">
                                    Something went wrong. Please try again.
                                </p>
                            )}
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
