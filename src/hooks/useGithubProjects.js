import { useState, useEffect } from "react";

const useGithubProjects = (username, perPage = 6) => {
    const [projectList, setProjectList] = useState([]);

    useEffect(() => {
        if (!username) return;

        fetch(
            `https://api.github.com/users/${username}/repos?sort=updated&per_page=${perPage}`
        )
            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const formattedProjects = data.map((repo) => ({
                        id: repo.id,
                        name: repo.name,
                        description: repo.description || "Chưa có mô tả",
                        tags: [repo.language || "Code"],
                        repoUrl: repo.html_url,
                        demoUrl: repo.homepage,
                    }));
                    setProjectList(formattedProjects);
                }
            })
            .catch((err) =>
                console.error("Không thể lấy dữ liệu từ GitHub:", err)
            );
    }, [username, perPage]);

    return projectList;
};

export default useGithubProjects;
