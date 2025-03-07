document.addEventListener("DOMContentLoaded", function () {
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
      const response = await fetch("http://127.0.0.1:8000/chatbot/", {
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
});
document.getElementById("send-btn").addEventListener("click", sendMessage);
document
  .getElementById("chat-input")
  .addEventListener("keypress", function (event) {
    if (event.key === "Enter") {
      sendMessage();
    }
  });

function sendMessage() {
  let inputField = document.getElementById("chat-input");
  let message = inputField.value.trim();

  if (message === "") return;

  let chatBody = document.getElementById("chat-body");
  let userMessage = document.createElement("div");
  userMessage.className = "user-message";
  userMessage.innerText = message;
  chatBody.appendChild(userMessage);

  inputField.value = "";

  setTimeout(() => {
    let botMessage = document.createElement("div");
    botMessage.className = "bot-message";
    botMessage.innerText = "I'm still learning! But I'll get better ";
    chatBody.appendChild(botMessage);
    chatBody.scrollTop = chatBody.scrollHeight;
  }, 1000);
}
