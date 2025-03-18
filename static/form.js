document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  // Declare AOS if it's not already available globally
  if (typeof AOS !== "undefined") {
    AOS.init({
      duration: 800,
      once: true,
    });
  } else {
    console.warn(
      "AOS is not defined. Make sure it's properly imported or included."
    );
  }

  // Form elements
  const form = document.getElementById("complaintForm");
  const incidentTypeSelect = document.getElementById("incidentType");
  const otherIncidentContainer = document.getElementById(
    "otherIncidentContainer"
  );
  const steps = document.querySelectorAll(".form-step");
  const nextButtons = document.querySelectorAll(".next-step");
  const prevButtons = document.querySelectorAll(".prev-step");
  const progressBar = document.querySelector(".progress-bar");
  const stepIndicators = document.querySelectorAll(".step");

  // New sections for the updated flow
  const checkSeverity = document.getElementById("checkSeverity");
  const lowSeverityRedirect = document.getElementById("lowSeverityRedirect");
  const highSeverityRedirect = document.getElementById("highSeverityRedirect");
  const reportGeneration = document.getElementById("reportGeneration");
  const submissionSuccess = document.getElementById("submissionSuccess");
  const reportIdElement = document.getElementById("reportId");

  // Buttons for the new flow
  const chatbotRedirectBtn = document.getElementById("chatbotRedirectBtn");
  const generateReportBtn = document.getElementById("generateReportBtn");
  const downloadReportBtn = document.getElementById("downloadReportBtn");

  // Review elements
  const reviewLocation = document.getElementById("reviewLocation");
  const reviewIncidentType = document.getElementById("reviewIncidentType");
  const reviewOtherContainer = document.getElementById("reviewOtherContainer");
  const reviewOtherIncident = document.getElementById("reviewOtherIncident");
  const reviewDate = document.getElementById("reviewDate");

  // Show "Other" input field when "Other" is selected
  incidentTypeSelect.addEventListener("change", function () {
    if (this.value === "Other") {
      otherIncidentContainer.classList.add("show");
    } else {
      otherIncidentContainer.classList.remove("show");
    }
  });

  // Handle step navigation
  let currentStep = 0;

  function updateProgress() {
    // Update progress bar
    const progress = ((currentStep + 1) / steps.length) * 100;
    progressBar.style.width = `${progress}%`;
    progressBar.setAttribute("aria-valuenow", progress);

    // Update step indicators
    stepIndicators.forEach((step, index) => {
      if (index <= currentStep) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });
  }

  function showStep(stepIndex) {
    steps.forEach((step, index) => {
      if (index === stepIndex) {
        step.classList.add("active");
      } else {
        step.classList.remove("active");
      }
    });

    currentStep = stepIndex;
    updateProgress();

    // Update review information when reaching step 3
    if (stepIndex === 2) {
      updateReviewInfo();
    }
  }

  function updateReviewInfo() {
    // Update the review section with current form values
    const location = document.getElementById("location").value;
    const incidentType = document.getElementById("incidentType").value;
    const otherIncident = document.getElementById("otherIncident").value;
    const incidentDate = document.getElementById("incidentDate").value;

    reviewLocation.textContent = location;
    reviewIncidentType.textContent = incidentType;

    if (incidentType === "Other" && otherIncident) {
      reviewOtherContainer.style.display = "flex";
      reviewOtherIncident.textContent = otherIncident;
    } else {
      reviewOtherContainer.style.display = "none";
    }

    reviewDate.textContent = incidentDate;
  }

  // Next button event listeners
  nextButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Simple validation for required fields in current step
      const currentStepElement = steps[currentStep];
      const requiredFields = currentStepElement.querySelectorAll("[required]");
      let isValid = true;

      requiredFields.forEach((field) => {
        if (!field.value) {
          field.classList.add("is-invalid");
          isValid = false;
        } else {
          field.classList.remove("is-invalid");
        }
      });

      if (isValid) {
        showStep(currentStep + 1);
      }
    });
  });

  // Previous button event listeners
  prevButtons.forEach((button) => {
    button.addEventListener("click", () => {
      showStep(currentStep - 1);
    });
  });

  // Form submission
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    // Hide form steps and show "Check Severity" section
    form.style.display = "none";
    checkSeverity.style.display = "block";

    // Generate a random report ID
    const randomId = Math.floor(100000 + Math.random() * 900000);
    reportIdElement.textContent = `SK-2025-${randomId}`;

    // Simulate a delay for severity check (3 seconds)
    setTimeout(() => {
      // Randomly determine severity for demonstration purposes
      const isLowSeverity = Math.random() < 0.9; // 50% chance of low severity

      checkSeverity.style.display = "none";

      if (isLowSeverity) {
        // Show low severity redirect message
        lowSeverityRedirect.style.display = "block";
      } else {
        // Show high severity redirect message
        highSeverityRedirect.style.display = "block";
      }

      // Scroll to top of form card
      const formCard = document.querySelector(".form-card");
      formCard.scrollIntoView({ behavior: "smooth" });
    }, 3000);
  });

  // Chatbot redirect button
  chatbotRedirectBtn.addEventListener("click", () => {
    // In a real app, redirect to chatbot page
    window.location.href = "chatbot.html"; // Replace with your chatbot URL
  });

  // Generate report button
  generateReportBtn.addEventListener("click", () => {
    highSeverityRedirect.style.display = "none";
    reportGeneration.style.display = "block";
  });

  // Download report button
  downloadReportBtn.addEventListener("click", () => {
    // In a real app, handle the report download
    // For demo purposes, just show success message
    reportGeneration.style.display = "none";
    submissionSuccess.style.display = "block";
  });

  // Add ripple effect to buttons
  const buttons = document.querySelectorAll(".btn");

  buttons.forEach((button) => {
    button.addEventListener("mousedown", (e) => {
      const rect = button.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;

      const ripple = document.createElement("span");
      ripple.classList.add("ripple");
      ripple.style.left = `${x}px`;
      ripple.style.top = `${y}px`;

      button.appendChild(ripple);

      setTimeout(() => {
        ripple.remove();
      }, 600);
    });
  });

  // Initialize
  showStep(0);

  // Hide review other container by default
  reviewOtherContainer.style.display = "none";
});
