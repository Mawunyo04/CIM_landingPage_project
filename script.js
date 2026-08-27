const nav = document.getElementById("site-nav");
const toggle = document.querySelector(".nav-toggle");
const year = document.getElementById("year");

if (year) {
  year.textContent = String(new Date().getFullYear());
}

toggle?.addEventListener("click", () => {
  const open = nav.classList.toggle("open");
  toggle.setAttribute("aria-expanded", String(open));
});

nav?.querySelectorAll("a").forEach((link) => {
  link.addEventListener("click", () => {
    nav.classList.remove("open");
    toggle?.setAttribute("aria-expanded", "false");
  });
});

function wireForm(formId, statusId, successMessage) {
  const form = document.getElementById(formId);
  const status = document.getElementById(statusId);
  if (!form || !status) return;

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!form.checkValidity()) {
      status.textContent = "Please complete the required fields.";
      form.reportValidity();
      return;
    }
    form.reset();
    status.textContent = successMessage;
  });
}

wireForm(
  "join-form",
  "join-status",
  "Thank you. We received your request and will be in touch."
);
wireForm(
  "contact-form",
  "contact-status",
  "Message received. We will write back soon."
);
