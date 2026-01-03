const form = document.getElementById('bookingForm');

form.addEventListener('submit', function(e) {
  e.preventDefault();

  // Get form values
  const name = document.querySelector('input[name="name"]').value;
  const email = document.querySelector('input[name="email"]').value;
  const phone = document.querySelector('input[name="phone"]').value;
  const destination = document.querySelector('select[name="destination"]').value;
  const startDate = document.querySelector('input[name="start_date"]').value;
  const endDate = document.querySelector('input[name="end_date"]').value;
  const travelers = document.querySelector('input[name="travelers"]').value;
  const message = document.querySelector('textarea[name="message"]').value;

  // Calculate price (example: $1000 per traveler)
  const numTravelers = parseInt(travelers) || 0;
  const price = 1000 * numTravelers;

  // Populate summary
  document.getElementById('summary-name').textContent = name;
  document.getElementById('summary-email').textContent = email;
  document.getElementById('summary-phone').textContent = phone;
  document.getElementById('summary-destination').textContent = destination;
  document.getElementById('summary-start').textContent = startDate;
  document.getElementById('summary-end').textContent = endDate;
  document.getElementById('summary-travelers').textContent = travelers;
  document.getElementById('summary-message').textContent = message;
  document.getElementById('summary-price').textContent = price.toLocaleString();

  // Hide form, show summary
  document.getElementById('booking').style.display = 'none';
  document.getElementById('booking-summary').style.display = 'block';
});

// Confirm booking function
function confirmBooking() {
  // Get values from summary
  const name = document.getElementById('summary-name').textContent;
  const email = document.getElementById('summary-email').textContent;
  const phone = document.getElementById('summary-phone').textContent;
  const destination = document.getElementById('summary-destination').textContent;
  const startDate = document.getElementById('summary-start').textContent;
  const endDate = document.getElementById('summary-end').textContent;
  const travelers = document.getElementById('summary-travelers').textContent;
  const message = document.getElementById('summary-message').textContent;
  const price = document.getElementById('summary-price').textContent.replace(/,/g, ''); // Remove commas

  // Send email using EmailJS
  emailjs.send(
    "YOUR_SERVICE_ID",  // Replace with your EmailJS service ID
    "YOUR_TEMPLATE_ID", // Replace with your EmailJS template ID
    {
      to_email: "godfrednananyarko0@gmail.com",  // Your email
      from_name: name,
      from_email: email,
      phone: phone,
      destination: destination,
      start_date: startDate,
      end_date: endDate,
      travelers: travelers,
      message: message,
      total_price: price
    }
  ).then(() => {
    alert("Booking confirmed! Email sent successfully.");
    // Optionally reset or redirect
  }, (error) => {
    alert("Something went wrong with confirmation. Please try again.");
    console.error(error);
  });
}

// Edit booking function
function editBooking() {
  // Hide summary, show form
  document.getElementById('booking-summary').style.display = 'none';
  document.getElementById('booking').style.display = 'block';
}

// Function to update price summary
function updatePriceSummary() {
  const destination = document.querySelector('select[name="destination"]').value;
  const travelers = parseInt(document.querySelector('input[name="travelers"]').value) || 0;
  const price = 1000 * travelers; // Example price per traveler

  document.getElementById('summary-package').textContent = destination || '—';
  document.getElementById('summary-travelers').textContent = travelers;
  document.getElementById('summary-price').textContent = price.toLocaleString();
}

// Event listeners for real-time update
document.querySelector('select[name="destination"]').addEventListener('change', updatePriceSummary);
document.querySelector('input[name="travelers"]').addEventListener('input', updatePriceSummary);

// Modal functions
function openModal(title) {
  document.getElementById("modalTitle").textContent = title;
  document.getElementById("packageModal").style.display = "block";
}

function closeModal() {
  document.getElementById("packageModal").style.display = "none";
}

// Scroll reveal
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
  reveals.forEach(section => {
    const windowHeight = window.innerHeight;
    const sectionTop = section.getBoundingClientRect().top;
    const revealPoint = 150;

    if (sectionTop < windowHeight - revealPoint) {
      section.classList.add("active");
    }
  });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll(); // trigger on page load
document.getElementById("bookingForm").addEventListener("submit", function (e) {
  const startDate = new Date(this.start_date.value);
  const endDate = new Date(this.end_date.value);
  const travelers = parseInt(this.travelers.value);

  if (endDate <= startDate) {
    alert("End date must be after start date.");
    e.preventDefault();
    return;
  }

  if (travelers < 1) {
    alert("Number of travelers must be at least 1.");
    e.preventDefault();
    return;
  }
});
const submitBtn = document.getElementById("submitBtn");

document.getElementById("bookingForm").addEventListener("submit", function () {
  submitBtn.textContent = "Submitting...";
  submitBtn.disabled = true;
});
document.getElementById("successMsg").style.display = "block";
submitBtn.textContent = "Book Now";
submitBtn.disabled = false;
