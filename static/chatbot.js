function sendMessage() {
    let inputField = document.getElementById("userInput");
    let message = inputField.value.trim();
    if (message === "") return;
    
    let chatBody = document.getElementById("chatBody");
    let userMessage = `<p><strong>You:</strong> ${message}</p>`;
    chatBody.innerHTML += userMessage;
    
    // Dummy bot response
    let botMessage = `<p><strong>Bot:</strong> I'm here to help!</p>`;
    chatBody.innerHTML += botMessage;
    
    inputField.value = "";
    chatBody.scrollTop = chatBody.scrollHeight;
}