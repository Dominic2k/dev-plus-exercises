import React, { useState } from "react";
import "./App.css";
import { personalInfo, socialLinks } from "./data.jsx";
import Hero from "./components/Hero";
import Projects from "./components/Projects";
import Footer from "./components/Footer";
import Hobbies from "./components/Hobbies";
import Contact from "./components/Contact";
import AnonymousMessage from "./components/AnonymousMessage";
import MiniGame from "./components/MiniGame";
import useGithubProjects from "./hooks/useGithubProjects";
import MatrixRain from "./components/MatrixRain";

function App() {
    const [activeTab, setActiveTab] = useState("profile");
    const projectList = useGithubProjects("dominic2k", 30);

    const renderContent = () => {
        switch (activeTab) {
            case "profile":
                return (
                    <Hero
                        personalInfo={personalInfo}
                        socialLinks={socialLinks}
                    />
                );
            case "repos":
                return <Projects projects={projectList} />;
            case "hobbies":
                return <Hobbies />;
            case "contact":
                return <Contact email={personalInfo.email} />;
            case "message":
                return <AnonymousMessage />;
            case "game":
                return <MiniGame />;
            default:
                return (
                    <Hero
                        personalInfo={personalInfo}
                        socialLinks={socialLinks}
                    />
                );
        }
    };

    return (
        <div className="container">
            <MatrixRain />
            <nav className="tab-nav">
                <button
                    className={`tab-btn ${
                        activeTab === "profile" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("profile")}
                >
                    Profile
                </button>
                <button
                    className={`tab-btn ${
                        activeTab === "repos" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("repos")}
                >
                    Github Repos
                </button>
                <button
                    className={`tab-btn ${
                        activeTab === "hobbies" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("hobbies")}
                >
                    Sở thích
                </button>
                <button
                    className={`tab-btn ${
                        activeTab === "contact" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("contact")}
                >
                    Liên hệ
                </button>
                <button
                    className={`tab-btn ${
                        activeTab === "message" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("message")}
                >
                    Nhắn ẩn danh
                </button>
                <button
                    className={`tab-btn ${
                        activeTab === "game" ? "active" : ""
                    }`}
                    onClick={() => setActiveTab("game")}
                >
                    Mini Game
                </button>
            </nav>

            <div className="tab-content">{renderContent()}</div>

            <Footer name={personalInfo.name} />
        </div>
    );
}

export default App;
