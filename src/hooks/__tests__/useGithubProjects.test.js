import { renderHook, waitFor } from "@testing-library/react";
import useGithubProjects from "../useGithubProjects";
import { vi } from "vitest";

// Mock fetch
global.fetch = vi.fn();

describe("useGithubProjects Hook", () => {
    beforeEach(() => {
        vi.clearAllMocks();
    });

    test("returns empty array when no username", () => {
        const { result } = renderHook(() => useGithubProjects(""));

        expect(result.current).toEqual([]);
    });

    test("fetches and formats projects correctly", async () => {
        const mockRepos = [
            {
                id: 1,
                name: "repo1",
                description: "Description 1",
                language: "JavaScript",
                html_url: "https://github.com/user/repo1",
                homepage: "https://demo1.com",
            },
            {
                id: 2,
                name: "repo2",
                description: null,
                language: null,
                html_url: "https://github.com/user/repo2",
                homepage: null,
            },
        ];

        fetch.mockResolvedValueOnce({
            json: () => Promise.resolve(mockRepos),
        });

        const { result } = renderHook(() => useGithubProjects("user"));

        await waitFor(() => {
            expect(result.current).toHaveLength(2);
        });

        expect(result.current[0]).toEqual({
            id: 1,
            name: "repo1",
            description: "Description 1",
            tags: ["JavaScript"],
            repoUrl: "https://github.com/user/repo1",
            demoUrl: "https://demo1.com",
        });

        expect(result.current[1]).toEqual({
            id: 2,
            name: "repo2",
            description: "Chưa có mô tả",
            tags: ["Code"],
            repoUrl: "https://github.com/user/repo2",
            demoUrl: null,
        });
    });

    test("handles fetch error", async () => {
        fetch.mockRejectedValueOnce(new Error("Network error"));

        const consoleSpy = vi
            .spyOn(console, "error")
            .mockImplementation(() => {});

        const { result } = renderHook(() => useGithubProjects("user"));

        await waitFor(() => {
            expect(result.current).toEqual([]);
        });

        expect(consoleSpy).toHaveBeenCalledWith(
            "Không thể lấy dữ liệu từ GitHub:",
            expect.any(Error)
        );

        consoleSpy.mockRestore();
    });
});
