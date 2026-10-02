const themeToggle = document.querySelector("#theme-toggle");
const themeIcon = document.querySelector("#theme-icon");
const root = document.documentElement;

function applyTheme(theme) {
    const isDark = theme === "dark";

    root.dataset.theme = theme;
    themeToggle.setAttribute("aria-pressed", String(isDark));
    themeIcon.textContent = isDark ? "☾" : "☀";
}

let savedTheme = "light";

try {
    const storedTheme = localStorage.getItem("theme");

    if (storedTheme === "light" || storedTheme === "dark") {
        savedTheme = storedTheme;
    }
} catch {
    // Keep the default theme when browser storage is unavailable.
}

applyTheme(savedTheme);

themeToggle.addEventListener("click", () => {
    const nextTheme =
        root.dataset.theme === "dark" ? "light" : "dark";

    applyTheme(nextTheme);

    try {
        localStorage.setItem("theme", nextTheme);
    } catch {
        // Theme switching remains available without persistence.
    }
});