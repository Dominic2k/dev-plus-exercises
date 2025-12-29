import { render, screen } from "@testing-library/react";
import ProjectCard from "../ProjectCard";

describe("ProjectCard Component", () => {
    const mockProject = {
        name: "Test Project",
        description: "A test project description",
        tags: ["React", "JavaScript"],
        repoUrl: "https://github.com/user/test-project",
        demoUrl: "https://demo.com",
    };

    test("renders project name and description", () => {
        render(<ProjectCard project={mockProject} />);

        expect(screen.getByText("Test Project")).toBeInTheDocument();
        expect(
            screen.getByText("A test project description")
        ).toBeInTheDocument();
    });

    test("renders project tags", () => {
        render(<ProjectCard project={mockProject} />);

        expect(screen.getByText("React")).toBeInTheDocument();
        expect(screen.getByText("JavaScript")).toBeInTheDocument();
    });

    test("renders GitHub link", () => {
        render(<ProjectCard project={mockProject} />);

        const githubLink = screen.getByText("GitHub");
        expect(githubLink).toHaveAttribute(
            "href",
            "https://github.com/user/test-project"
        );
    });

    test("renders Demo link when demoUrl is provided", () => {
        render(<ProjectCard project={mockProject} />);

        const demoLink = screen.getByText("Demo");
        expect(demoLink).toHaveAttribute("href", "https://demo.com");
    });

    test("does not render Demo link when demoUrl is not provided", () => {
        const projectWithoutDemo = { ...mockProject, demoUrl: null };
        render(<ProjectCard project={projectWithoutDemo} />);

        expect(screen.queryByText("Demo")).not.toBeInTheDocument();
    });
});
