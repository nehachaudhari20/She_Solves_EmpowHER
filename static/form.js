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

  // Form submission
  /*form.addEventListener("submit",async (e) => {
    e.preventDefault();

    // Hide form steps and show "Check Severity" section
    steps.forEach((step) => {
      step.style.display = "none";
    });
    document.querySelector(".form-progress").style.display = "none";
    checkSeverity.style.display = "block";

    // Generate a random report ID
    const incidentDetails = document.getElementById("incidentDetails").value;
    const randomId = Math.floor(100000 + Math.random() * 900000);
    reportIdElement.textContent = `SAKHI_${randomId}`;

    try{
        const response = await fetch("/severity/", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ 
                incident_id: reportIdElement,
                description: incidentDetails 
            }),
        });

        console.log("Response received:", response.status);
        
        if (!response.ok) {
            throw new Error('HTTP error!! status: ${response.status}');
        }

        const data = await response.json();
        reportIdElement.textContent = `SAKHI_${data.incident_id}`;

        if (data.severity === "LOW") {
            checkSeverity.style.display = "none";
            lowSeverityRedirect.style.display = "block";
            setTimeout(() => {
                window.location.href = "chatbot.html";
            }, 3000);
        } else {
            checkSeverity.style.display = "none";
            submissionSuccess.style.display = "block";

            const formCard = document.querySelector(".form-card");
            formCard.scrollIntoView({ behavior: "smooth" });
        }
    } catch(error) {
        console.error("Error:", error);
        alert("An error occurred while processing. Please try again.");
        checkSeverity.style.display = "none";
        //submissionSuccess.style.display = "block";
        const formCard = document.querySelector(".form-card");
        formCard.scrollIntoView({ behavior: "smooth"});
        steps[0].style.display = "block";
        document.querySelector(".form-progress").style.display = "block";
    
    }*/

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    // Get the incident details
    const incidentDetails = document.getElementById("incidentDetails").value;
    const checkSeverity = document.getElementById("checkSeverity");
    const lowSeverityRedirect = document.getElementById("lowSeverityRedirect");
    const submissionSuccess = document.getElementById("submissionSuccess");

    // Show loading state
    checkSeverity.style.display = "block";
    console.log("Submitting form...");

    try {
      const response = await fetch("/severity/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          incident_id: `SK-${Date.now()}`,
          incident_text: incidentDetails,
        }),
      });

      console.log("Response received:", response.status);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      console.log("Severity result:", data);

      // Hide loading state
      checkSeverity.style.display = "none";

      if (data.severity === "LOW") {
        lowSeverityRedirect.style.display = "block";
        setTimeout(() => {
          window.location.href = "/chatbot";
        }, 3000);
      } else {
        submissionSuccess.style.display = "block";
        document.getElementById("reportId").textContent = data.incident_id;
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Error processing your report. Please try again.");
      checkSeverity.style.display = "none";
    }
    //});

    // Simulate a delay for severity check (e.g., 3 seconds)
    setTimeout(() => {
      // Randomly determine severity for demonstration purposes
      const isLowSeverity = Math.random() < 0.5; // 50% chance of low severity

      if (isLowSeverity) {
        // Show low severity redirect message
        checkSeverity.style.display = "none";
        lowSeverityRedirect.style.display = "block";

        // Redirect to chatbot after a delay
        setTimeout(() => {
          window.location.href = "chatbot.html"; // Replace with your chatbot URL
        }, 3000); // Adjust the delay as needed
      } else {
        // Proceed to submission success for high severity
        checkSeverity.style.display = "none";
        submissionSuccess.style.display = "block";

        // Scroll to top of form card
        const formCard = document.querySelector(".form-card");
        formCard.scrollIntoView({ behavior: "smooth" });
      }
    }, 3000); // Adjust the delay as needed
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
