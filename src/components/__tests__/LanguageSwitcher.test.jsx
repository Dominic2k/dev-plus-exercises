import { render, screen, fireEvent } from "@testing-library/react";
import LanguageSwitcher from "../LanguageSwitcher";
import { vi } from "vitest";

const mockChangeLanguage = vi.fn();
vi.mock("react-i18next", () => ({
    useTranslation: () => ({
        i18n: {
            language: "en",
            changeLanguage: mockChangeLanguage,
        },
    }),
}));

describe("LanguageSwitcher Component", () => {
    beforeEach(() => {
        mockChangeLanguage.mockClear();
    });

    test("renders language buttons", () => {
        render(<LanguageSwitcher />);

        expect(screen.getByText("EN")).toBeInTheDocument();
        expect(screen.getByText("VI")).toBeInTheDocument();
    });

    test("EN button is active when language is en", () => {
        render(<LanguageSwitcher />);

        const enButton = screen.getByText("EN");
        expect(enButton).toHaveClass("active");
    });

    test("clicking EN button calls changeLanguage with en", () => {
        render(<LanguageSwitcher />);

        const enButton = screen.getByText("EN");
        fireEvent.click(enButton);

        expect(mockChangeLanguage).toHaveBeenCalledWith("en");
    });

    test("clicking VI button calls changeLanguage with vi", () => {
        render(<LanguageSwitcher />);

        const viButton = screen.getByText("VI");
        fireEvent.click(viButton);

        expect(mockChangeLanguage).toHaveBeenCalledWith("vi");
    });
});
