/* Contact demo: native validation and local feedback */
const contactForm = document.querySelector("#contact-form");
const contactStatus = document.querySelector("#contact-status");
const contactSubmit = document.querySelector("#contact-submit");

function setContactState(state, message) {
    contactForm.dataset.state = state;
    contactStatus.textContent = message;
}

contactForm.addEventListener(
    "invalid",
    () => {
        setContactState(
            "invalid",
            "Please complete the required fields and enter a valid email address."
        );
    },
    true
);

contactForm.addEventListener("input", () => {
    setContactState("idle", "");
});

contactForm.addEventListener("submit", (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) {
        return;
    }

    setContactState(
        "validated",
        "Form validated. This demo does not send messages."
    );
});

setContactState("idle", "");
contactSubmit.disabled = false;