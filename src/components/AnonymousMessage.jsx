import React, { useState } from "react";

const AnonymousMessage = () => {
    const [message, setMessage] = useState("");
    const [sent, setSent] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);

    const GOOGLE_FORM_ACTION_URL = import.meta.env.VITE_GOOGLE_FORM_ACTION_URL;
    const ENTRY_ID = import.meta.env.VITE_GOOGLE_FORM_ENTRY_ID;

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsSubmitting(true);

        const formData = new FormData();
        formData.append(ENTRY_ID, message);

        try {
            await fetch(GOOGLE_FORM_ACTION_URL, {
                method: "POST",
                mode: "no-cors",
                body: formData,
            });
            setSent(true);
            setMessage("");
            setTimeout(() => setSent(false), 5000);
        } catch (error) {
            console.error("Lỗi gửi tin nhắn:", error);
            alert("Có lỗi xảy ra, vui lòng thử lại sau!");
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <div
            className="project-card"
            style={{ maxWidth: "600px", margin: "2rem auto" }}
        >
            <h3>Gửi lời nhắn ẩn danh</h3>
            <p
                style={{
                    fontSize: "0.9rem",
                    color: "#94a3b8",
                    marginBottom: "1rem",
                }}
            >
                Không ai biết bạn là ai đâu (kể cả tôi)!
            </p>

            {sent ? (
                <p style={{ color: "#4ade80" }}>
                    Đã gửi tin nhắn thành công! Cảm ơn bạn.
                </p>
            ) : (
                <form
                    onSubmit={handleSubmit}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "1rem",
                    }}
                >
                    <textarea
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        placeholder="Nhập lời nhắn của bạn..."
                        rows="4"
                        style={{
                            padding: "10px",
                            borderRadius: "0",
                            background: "rgba(0,0,0,0.5)",
                            border: "1px solid var(--text-secondary)",
                            color: "var(--text-primary)",
                        }}
                    />
                    <button
                        type="submit"
                        className="btn btn-primary"
                        disabled={isSubmitting}
                        style={{ justifyContent: "center" }}
                    >
                        {isSubmitting ? "Đang gửi..." : "Gửi đi"}
                    </button>
                </form>
            )}
        </div>
    );
};

export default AnonymousMessage;
