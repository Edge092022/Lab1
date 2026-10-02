/* T-03B: Local simulated loading. No API request is made. */
(() => {
    const component = document.querySelector("#projects");
    const loading = document.querySelector("#projects-loading");
    const dataRegion = document.querySelector("#projects-data");
    const status = document.querySelector("#projects-status");
    const emptyRegion = document.querySelector("#projects-empty");
    const emptyRetry = document.querySelector("#projects-empty-retry");
    const projectsHeading = document.querySelector("#projects-heading");

    const requestedScenario =
        new URLSearchParams(window.location.search).get("projects");

    let attemptCount = 0;

    const courseworkProjects = [
        {
            id: "project-one",
            title: "Exercise 1: Semantic HTML Portfolio",
            description:
                "A coursework portfolio focused on semantic HTML, " +
                "heading structure, navigation, and a skip-link.",
            technologies: ["HTML"],
            url: null,
            pendingMessage: "Repository link pending — Exercise 1."
        },
        {
            id: "project-two",
            title: "Exercise 2: Responsive Portfolio with a Persistent Theme",
            description:
                "A coursework portfolio with responsive layouts, " +
                "CSS variables, and a light/dark theme saved in localStorage.",
            technologies: ["HTML", "CSS", "JavaScript"],
            url: null,
            pendingMessage: "Repository link pending — Exercise 2."
        }
    ];

    let isLoading = false;

    function simulateProjectLoad() {
        attemptCount += 1;
        const currentAttempt = attemptCount;

        // Local simulation only. No API or network request is made.
        // ?projects=empty produces an empty first attempt.
        // Retry always returns the local coursework data.
        return new Promise((resolve) => {
            window.setTimeout(() => {
                if (requestedScenario === "empty" && currentAttempt === 1) {
                    resolve([]);
                    return;
                }

                resolve(courseworkProjects);
            }, 1200);
        });
    }
    function createProjectCard(project) {
        const article = document.createElement("article");
        article.className = "project-card";

        const heading = document.createElement("h3");
        heading.id = `${project.id}-heading`;
        heading.textContent = project.title;
        article.setAttribute("aria-labelledby", heading.id);

        const description = document.createElement("p");
        description.textContent = project.description;

        const tags = document.createElement("ul");
        tags.className = "project-tags";
        tags.setAttribute("aria-label", "Technologies used");

        for (const technology of project.technologies) {
            const badge = document.createElement("li");
            badge.textContent = technology;
            tags.append(badge);
        }

        const linkParagraph = document.createElement("p");
        linkParagraph.className = "project-link";

        if (project.url) {
            const link = document.createElement("a");
            link.href = project.url;
            link.textContent = `View repository for ${project.title}`;
            linkParagraph.append(link);
        } else {
            linkParagraph.classList.add("project-link-placeholder");
            linkParagraph.textContent = project.pendingMessage;
        }

        article.append(heading, description, tags, linkParagraph);
        return article;
    }

    function renderProjects(projects) {
        const fragment = document.createDocumentFragment();

        for (const project of projects) {
            fragment.append(createProjectCard(project));
        }

        dataRegion.replaceChildren(fragment);
    }

    async function loadProjects() {
        if (isLoading) {
            return;
        }

        isLoading = true;
        component.dataset.state = "loading";
        dataRegion.hidden = true;
        loading.hidden = false;
        loading.setAttribute("aria-busy", "true");
        status.textContent = "Loading projects...";

        const projects = await simulateProjectLoad();

        renderProjects(projects);

        loading.setAttribute("aria-busy", "false");
        loading.hidden = true;
        dataRegion.hidden = false;
        component.dataset.state = "data";
        status.textContent = `${projects.length} projects loaded.`;
        isLoading = false;
    }

    async function loadProjects() {
        if (isLoading) {
            return;
        }

        isLoading = true;

        // Move focus before hiding the activated retry button.
        if (emptyRegion.contains(document.activeElement)) {
            projectsHeading.focus();
        }

        emptyRegion.hidden = true;
        dataRegion.hidden = true;
        loading.hidden = false;
        loading.setAttribute("aria-busy", "true");
        component.dataset.state = "loading";
        status.textContent = "Loading projects...";

        const projects = await simulateProjectLoad();

        if (projects.length === 0) {
            loading.setAttribute("aria-busy", "false");
            loading.hidden = true;
            emptyRegion.hidden = false;
            component.dataset.state = "empty";
            status.textContent = "No projects found. Simulated result.";
        } else {
            renderProjects(projects);

            loading.setAttribute("aria-busy", "false");
            loading.hidden = true;
            dataRegion.hidden = false;
            component.dataset.state = "data";
            status.textContent =
                `${projects.length} projects loaded. Simulated result.`;
        }

        isLoading = false;
    }
    emptyRetry.addEventListener("click", () => {
        void loadProjects();
    });
    isLoading = false;
}
}) ();