import { render, screen } from "@testing-library/react";
import Hero from "../Hero";
import { vi } from "vitest";

// Mock useTranslation
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        t: (key) => key, // Return key as is for testing
    }),
}));

describe("Hero Component", () => {
    const mockSocialLinks = [
        { id: 1, url: "https://github.com/user", label: "GitHub", icon: "GH" },
        {
            id: 2,
            url: "https://linkedin.com/in/user",
            label: "LinkedIn",
            icon: "LI",
        },
    ];

    test("renders hero content with translations", () => {
        render(<Hero personalInfo={{}} socialLinks={mockSocialLinks} />);

        expect(screen.getByText("name")).toBeInTheDocument();
        expect(screen.getByText("title")).toBeInTheDocument();
        expect(screen.getByText("about")).toBeInTheDocument();
    });

    test("renders social links correctly", () => {
        render(<Hero personalInfo={{}} socialLinks={mockSocialLinks} />);

        const links = screen.getAllByRole("link");
        expect(links).toHaveLength(2);

        expect(links[0]).toHaveAttribute("href", "https://github.com/user");
        expect(links[0]).toHaveAttribute("aria-label", "GitHub");
        expect(links[0]).toHaveTextContent("GH");

        expect(links[1]).toHaveAttribute(
            "href",
            "https://linkedin.com/in/user"
        );
        expect(links[1]).toHaveAttribute("aria-label", "LinkedIn");
        expect(links[1]).toHaveTextContent("LI");
    });
});
