/*document.addEventListener("DOMContentLoaded", function () {
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");
  const chatBody = document.getElementById("chat-body");

  // Function to add a message to the chat window
  function addMessage(message, isUser) {
    const messageDiv = document.createElement("div");
    messageDiv.className = isUser ? "user-message" : "bot-message";
    messageDiv.textContent = message;
    chatBody.appendChild(messageDiv);

    // Auto scroll to the bottom
    chatBody.scrollTop = chatBody.scrollHeight;
  }

  // Function to send message to the API
  async function sendMessageToAPI(message) {
    try {
      // Display loading indicator
      const loadingDiv = document.createElement("div");
      loadingDiv.className = "bot-message loading";
      loadingDiv.textContent = "Thinking...";
      chatBody.appendChild(loadingDiv);

      // Make API call to your FastAPI endpoint
      const response = await fetch("/chatbot/", {
        // <-- This is where the request is made
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      // Remove loading indicator
      chatBody.removeChild(loadingDiv);

      if (response.ok) {
        const data = await response.json();
        // Display the bot's response
        addMessage(data.response, false);
      } else {
        // Handle error
        addMessage("Sorry, I encountered an error. Please try again.", false);
        console.error("API Error:", response.status);
      }
    } catch (error) {
      // Handle network or other errors
      addMessage(
        "Sorry, I couldn't connect to the server. Please check your connection.",
        false
      );
      console.error("Error:", error);
    }
  }

  // Function to process sending a message
  function sendMessage() {
    const message = chatInput.value.trim();
    if (message) {
      // Add user message to chat
      addMessage(message, true);

      // Send to API
      sendMessageToAPI(message);

      // Clear input field
      chatInput.value = "";
    }
  }

  // Handle send button click
  sendBtn.addEventListener("click", function () {
    sendMessage();
  });

  // Handle Enter key press
  chatInput.addEventListener("keypress", function (e) {
    if (e.key === "Enter") {
      sendMessage();
    }
  });
});*/

document.addEventListener("DOMContentLoaded", async function () {
  const chatBody = document.getElementById("chat-body");
  const chatInput = document.getElementById("chat-input");
  const sendBtn = document.getElementById("send-btn");

  // Get initial context
  try {
    const contextResponse = await fetch("/chatbot/context");
    const contextData = await contextResponse.json();

    // Clear existing messages
    chatBody.innerHTML = "";

    // Add welcome message with context
    addMessage(contextData.message, false);
  } catch (error) {
    console.error("Error getting context:", error);
  }

  async function sendMessage() {
    const message = chatInput.value.trim();
    if (!message) return;

    // Clear input
    chatInput.value = "";

    // Add user message to chat
    addMessage(message, true);

    try {
      // Show typing indicator
      const loadingDiv = document.createElement("div");
      loadingDiv.className = "bot-message loading";
      loadingDiv.textContent = "Thinking...";
      chatBody.appendChild(loadingDiv);

      // Send message to API
      const response = await fetch("/chatbot/", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: message }),
      });

      // Remove typing indicator
      chatBody.removeChild(loadingDiv);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data = await response.json();
      addMessage(data.response, false);
    } catch (error) {
      console.error("Error:", error);
      addMessage("Sorry, I encountered an error. Please try again.", false);
    }
  }

  // Event listeners
  sendBtn.addEventListener("click", sendMessage);
  chatInput.addEventListener("keypress", (e) => {
    if (e.key === "Enter") sendMessage();
  });
});
