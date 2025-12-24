import React from "react";
import { Gamepad2, Music, Plane, Book } from "lucide-react";

const Hobbies = () => {
    const hobbies = [
        {
            icon: <Gamepad2 size={32} />,
            name: "Gaming",
            desc: "League of Legends, CS:GO",
        },
        {
            icon: <Music size={32} />,
            name: "Âm nhạc",
            desc: "Indie, Pop Ballad",
        },
        {
            icon: <Plane size={32} />,
            name: "Du lịch",
            desc: "Khám phá vùng đất mới",
        },
        {
            icon: <Book size={32} />,
            name: "Đọc sách",
            desc: "Sách kỹ thuật & Đắc nhân tâm",
        },
    ];

    return (
        <div
            className="hobbies-grid"
            style={{
                display: "grid",
                gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
                gap: "1.5rem",
                marginTop: "2rem",
            }}
        >
            {hobbies.map((hobby, index) => (
                <div
                    key={index}
                    className="project-card"
                    style={{
                        textAlign: "center",
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                    }}
                >
                    <div style={{ color: "#38bdf8", marginBottom: "1rem" }}>
                        {hobby.icon}
                    </div>
                    <h4>{hobby.name}</h4>
                    <p style={{ color: "#94a3b8" }}>{hobby.desc}</p>
                </div>
            ))}
        </div>
    );
};

export default Hobbies;
