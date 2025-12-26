import React from "react";
import { useTranslation } from "react-i18next";

const Hero = ({ personalInfo, socialLinks }) => {
    const { t } = useTranslation();

    return (
        <header className="hero">
            <div className="hero-content">
                <h1 className="name">{t("name")}</h1>
                <h2 className="title">{t("title")}</h2>
                <p className="about">{t("about")}</p>

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
