import { render, screen } from "@testing-library/react";
import Footer from "../Footer";

describe("Footer Component", () => {
    test("renders footer with name and current year", () => {
        const name = "John Doe";
        const currentYear = new Date().getFullYear();

        render(<Footer name={name} />);

        expect(
            screen.getByText(`© ${currentYear} ${name}. Built with React.`)
        ).toBeInTheDocument();
    });
});
