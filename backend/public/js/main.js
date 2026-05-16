// Mobile menu toggle
const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("navLinks");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("showmenu");
});

// Smooth scroll for nav links
document.querySelectorAll('.navLinks .links a').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').substring(1);
    const target = document.getElementById(targetId);
    if (target) {
      target.scrollIntoView({ behavior: 'smooth' });
      navLinks.classList.remove('showmenu');
    }
  });
});

// Reservation form submission
const reservationForm = document.getElementById("reservationForm");
const formMessage = document.getElementById("formMessage");

reservationForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const firstName = document.getElementById("firstName").value;
  const lastName = document.getElementById("lastName").value;
  const email = document.getElementById("email").value;
  const date = document.getElementById("date").value;
  const time = document.getElementById("time").value;
  const phone = document.getElementById("phone").value;

  formMessage.style.color = "#333";
  formMessage.textContent = "Submitting...";

  try {
    const response = await fetch("/api/v1/reservation/send", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ firstName, lastName, email, date, time, phone }),
    });

    const data = await response.json();

    if (data.success) {
      formMessage.style.color = "green";
      formMessage.textContent = data.message;
      reservationForm.reset();
      setTimeout(() => {
        window.location.href = "/success";
      }, 1500);
    } else {
      formMessage.style.color = "red";
      formMessage.textContent = data.message;
    }
  } catch (error) {
    formMessage.style.color = "red";
    formMessage.textContent = "Something went wrong. Please try again.";
    console.error("Error:", error);
  }
});