(() => {
  const year = document.getElementById("year");
  if (year) year.textContent = String(new Date().getFullYear());

  const header = document.querySelector(".site-header");
  const onScroll = () => {
    if (!header) return;
    header.classList.toggle("is-scrolled", window.scrollY > 24);
  };
  onScroll();
  window.addEventListener("scroll", onScroll, { passive: true });

  const joinForm = document.getElementById("join-form");
  const joinStatus = document.getElementById("join-status");
  const joinButton = joinForm?.querySelector('button[type="submit"]');
  const JOIN_SHEET_WEBHOOK = "";

  const setStatus = (message, isError = false) => {
    if (!joinStatus) return;
    joinStatus.textContent = message;
    joinStatus.classList.toggle("is-error", isError);
  };

  joinForm?.addEventListener("submit", async (event) => {
    event.preventDefault();
    if (!joinForm.checkValidity()) {
      setStatus("Please enter your name and a valid email.", true);
      joinForm.reportValidity();
      return;
    }

    if (!JOIN_SHEET_WEBHOOK) {
      setStatus("The signup sheet is not connected yet. Paste your Apps Script URL into script.js.", true);
      return;
    }

    const payload = {
      name: joinForm.name.value.trim(),
      email: joinForm.email.value.trim(),
      message: joinForm.message.value.trim(),
    };

    if (joinButton) joinButton.disabled = true;
    setStatus("Sending…");

    try {
      await fetch(JOIN_SHEET_WEBHOOK, {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "text/plain;charset=utf-8" },
        body: JSON.stringify(payload),
      });
      joinForm.reset();
      setStatus("Thank you. We received your request and will be in touch.");
    } catch (err) {
      setStatus("Something went wrong. Please try again, or reach us on Instagram.", true);
    } finally {
      if (joinButton) joinButton.disabled = false;
    }
  });

  const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
  if (reduceMotion) {
    document.querySelectorAll("[data-reveal]").forEach((el) => el.classList.add("is-visible"));
    return;
  }

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { rootMargin: "0px 0px -8% 0px", threshold: 0.12 }
  );

  document.querySelectorAll("[data-reveal]").forEach((el) => observer.observe(el));
})();
