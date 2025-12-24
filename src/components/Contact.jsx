import React from "react";

const Contact = ({ email }) => {
    return (
        <div
            className="project-card"
            style={{
                maxWidth: "600px",
                margin: "2rem auto",
                textAlign: "center",
            }}
        >
            <h3>Liên hệ với tôi</h3>
            <p style={{ margin: "1rem 0", color: "#94a3b8" }}>
                Tôi luôn sẵn sàng cho các cơ hội hợp tác mới. Hãy gửi email cho
                tôi nhé!
            </p>
            <a
                href={`https://mail.google.com/mail/?view=cm&fs=1&to=${email}&su=Liên hệ từ Portfolio`}
                target="_blank"
                rel="noopener noreferrer"
                className="btn btn-primary"
                style={{ display: "inline-flex", justifyContent: "center" }}
            >
                Gửi Email Ngay
            </a>
        </div>
    );
};

export default Contact;
