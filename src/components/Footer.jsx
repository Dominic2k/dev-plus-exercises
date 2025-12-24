import React from "react";

const Footer = ({ name }) => {
    return (
        <footer className="footer">
            <p>
                © {new Date().getFullYear()} {name}. Built with React.
            </p>
        </footer>
    );
};

export default Footer;
