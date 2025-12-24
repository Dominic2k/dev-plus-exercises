import React from "react";

const Hero = ({ personalInfo, socialLinks }) => {
    return (
        <header className="hero">
            <div className="hero-content">
                <h1 className="name">{personalInfo.name}</h1>
                <h2 className="title">{personalInfo.title}</h2>
                <p className="about">{personalInfo.about}</p>

                <div className="socials">
                    {socialLinks.map((link) => (
                        <a
                            key={link.id}
                            href={link.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="social-icon"
                            aria-label={link.label}
                        >
                            {link.icon}
                        </a>
                    ))}
                </div>
            </div>
        </header>
    );
};

export default Hero;
