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
