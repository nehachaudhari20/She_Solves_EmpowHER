document.getElementById("send-btn").addEventListener("click", sendMessage);
document.getElementById("chat-input").addEventListener("keypress", function(event) {
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
