document.addEventListener("DOMContentLoaded", () => {
  // Initialize AOS
  AOS = AOS || {}; // Declare AOS if it's not already defined
  AOS.init({
    duration: 800,
    once: true,
  });

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
  const submissionSuccess = document.getElementById("submissionSuccess");
  const checkSeverity = document.getElementById("checkSeverity");
  const lowSeverityRedirect = document.getElementById("lowSeverityRedirect");
  const reportIdElement = document.getElementById("reportId");

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
  }

  // Next button event listeners
  nextButtons.forEach((button, index) => {
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

  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("complaintForm");
    const checkSeverity = document.getElementById("checkSeverity");
    const lowSeverityRedirect = document.getElementById("lowSeverityRedirect");
    const submissionSuccess = document.getElementById("submissionSuccess");
    const reportIdElement = document.getElementById("reportId");
    const reportDownloadLink = document.getElementById("reportDownloadLink");

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      // Get user input
      const incidentDetails = document.getElementById("incidentDetails").value;
      const location = document.getElementById("incidentLocation").value;
      const dateTime = document.getElementById("incidentDateTime").value;
      const incidentType = document.getElementById("incidentType").value;

      // Show loading
      checkSeverity.style.display = "block";

      try {
        // Step 1: Call FastAPI NLP Analysis (`/nlp_analysis`)
        const response = await fetch("/nlp_analysis", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            incident_text: incidentDetails,
            location: location,
            date_time: dateTime,
            incident_type: incidentType,
          }),
        });

        const data = await response.json();
        console.log("Severity result:", data);

        // Hide loading state
        checkSeverity.style.display = "none";

        // Step 2: Handle LOW severity (Redirect to Chatbot)
        if (data.severity === "LOW") {
          lowSeverityRedirect.style.display = "block";
          setTimeout(() => {
            window.location.href = "/chatbot";
          }, 3000);
          return;
        }

        // Step 3: Handle HIGH severity (Generate PDF Report)
        const reportResponse = await fetch("/generate-report/", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            incident_id: data.incident_id,
            incident_text: incidentDetails,
            location: location,
            date_time: dateTime,
            incident_type: incidentType,
            severity: data.severity,
          }),
        });

        const reportData = await reportResponse.json();
        console.log("Report generated:", reportData);

        // Show success message and download link
        submissionSuccess.style.display = "block";
        reportIdElement.textContent = data.incident_id;
        reportDownloadLink.innerHTML = `<a href="${reportData.download_url}" target="_blank">Download Report</a>`;
      } catch (error) {
        console.error("Error:", error);
        alert("Error processing your report. Please try again.");
        checkSeverity.style.display = "none";
      }
    });
  });

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
});

// Add CSS for the ripple effect
document.addEventListener("DOMContentLoaded", () => {
  const style = document.createElement("style");
  style.textContent = `
        .btn {
            position: relative;
            overflow: hidden;
        }
        
        .ripple {
            position: absolute;
            border-radius: 50%;
            transform: scale(0);
            background: rgba(255, 255, 255, 0.4);
            animation: ripple 0.6s linear;
            pointer-events: none;
            width: 100px;
            height: 100px;
            margin-left: -50px;
            margin-top: -50px;
        }
        
        @keyframes ripple {
            to {
                transform: scale(4);
                opacity: 0;
            }
        }
    `;
  document.head.appendChild(style);
});
