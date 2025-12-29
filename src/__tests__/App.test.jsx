import { render, screen, fireEvent } from "@testing-library/react";
import App from "../App";
import { vi } from "vitest";

vi.mock("../hooks/useGithubProjects", () => ({
    default: () => [],
}));

vi.mock("../data.jsx", () => ({
    personalInfo: { name: "Test User", email: "test@example.com" },
    socialLinks: [],
}));

vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => key,
    }),
}));

vi.mock("../components/Hero", () => ({
    default: () => <div>Hero Component</div>,
}));
vi.mock("../components/Projects", () => ({
    default: () => <div>Projects Component</div>,
}));
vi.mock("../components/Hobbies", () => ({
    default: () => <div>Hobbies Component</div>,
}));
vi.mock("../components/Contact", () => ({
    default: () => <div>Contact Component</div>,
}));
vi.mock("../components/AnonymousMessage", () => ({
    default: () => <div>AnonymousMessage Component</div>,
}));
vi.mock("../components/MiniGame", () => ({
    default: () => <div>MiniGame Component</div>,
}));
vi.mock("../components/Footer", () => ({
    default: () => <div>Footer Component</div>,
}));
vi.mock("../components/MatrixRain", () => ({
    default: () => <div>MatrixRain Component</div>,
}));
vi.mock("../components/LanguageSwitcher", () => ({
    default: () => <div>LanguageSwitcher Component</div>,
}));

describe("App Component", () => {
    test("renders default profile tab", () => {
        render(<App />);

        expect(screen.getByText("Hero Component")).toBeInTheDocument();
        expect(screen.getByText("Footer Component")).toBeInTheDocument();
    });

    test("switches to repos tab", () => {
        render(<App />);

        const reposButton = screen.getByText("githubRepos");
        fireEvent.click(reposButton);

        expect(screen.getByText("Projects Component")).toBeInTheDocument();
    });

    test("switches to hobbies tab", () => {
        render(<App />);

        const hobbiesButton = screen.getByText("hobbies");
        fireEvent.click(hobbiesButton);

        expect(screen.getByText("Hobbies Component")).toBeInTheDocument();
    });

    test("switches to contact tab", () => {
        render(<App />);

        const contactButton = screen.getByText("contact");
        fireEvent.click(contactButton);

        expect(screen.getByText("Contact Component")).toBeInTheDocument();
    });

    test("switches to message tab", () => {
        render(<App />);

        const messageButton = screen.getByText("anonymousMessage");
        fireEvent.click(messageButton);

        expect(
            screen.getByText("AnonymousMessage Component")
        ).toBeInTheDocument();
    });

    test("switches to game tab", () => {
        render(<App />);

        const gameButton = screen.getByText("miniGame");
        fireEvent.click(gameButton);

        expect(screen.getByText("MiniGame Component")).toBeInTheDocument();
    });
});
