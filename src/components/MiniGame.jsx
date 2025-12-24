import React, { useState } from "react";

const MiniGame = () => {
    const [number, setNumber] = useState(Math.floor(Math.random() * 10) + 1);
    const [guess, setGuess] = useState("");
    const [result, setResult] = useState("");

    const handleGuess = () => {
        const val = parseInt(guess);
        if (val === number) {
            setResult("🎉 Chính xác! Bạn quá đỉnh!");
            setNumber(Math.floor(Math.random() * 10) + 1); // Reset game
        } else {
            setResult(
                val > number ? "📉 Thấp hơn chút nữa!" : "📈 Cao hơn chút nữa!"
            );
        }
        setGuess("");
    };

    return (
        <div
            className="project-card"
            style={{
                maxWidth: "400px",
                margin: "2rem auto",
                textAlign: "center",
            }}
        >
            <h3>Đoán số may mắn (1-10)</h3>
            <div
                style={{
                    margin: "1.5rem 0",
                    display: "flex",
                    gap: "10px",
                    justifyContent: "center",
                }}
            >
                <input
                    type="number"
                    value={guess}
                    onChange={(e) => setGuess(e.target.value)}
                    style={{
                        padding: "0.5rem 1rem",
                        borderRadius: "0",
                        background: "rgba(0,0,0,0.5)",
                        border: "1px solid var(--text-secondary)",
                        color: "var(--text-primary)",
                        width: "80px",
                    }}
                />
                <button onClick={handleGuess} className="btn btn-primary">
                    Đoán
                </button>
            </div>
            <p style={{ fontWeight: "bold", color: "var(--accent)" }}>
                {result}
            </p>
        </div>
    );
};

export default MiniGame;
