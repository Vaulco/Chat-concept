document.addEventListener("DOMContentLoaded", function () {
  const chatMessages = document.getElementById("chat-messages");
  const messageInput = document.getElementById("message-input");
  const sendButton = document.getElementById("send-button");

  // Load messages from local storage
  let savedMessages = JSON.parse(localStorage.getItem("chatMessages")) || [];

  // Display saved messages
  function displayMessages() {
    chatMessages.innerHTML = savedMessages
      .map((message, index) => `
        <div class="message">
          <p>${message}</p>
          <i class="delete-button bx bx-trash" data-index="${index}"></i>
        </div>`
      )
      .join("");
    chatMessages.scrollTop = chatMessages.scrollHeight;

    // Add event listeners to delete buttons
    const deleteButtons = document.querySelectorAll(".delete-button");
    deleteButtons.forEach(button => {
      button.addEventListener("click", function () {
        const indexToDelete = parseInt(button.getAttribute("data-index"));
        savedMessages.splice(indexToDelete, 1);
        localStorage.setItem("chatMessages", JSON.stringify(savedMessages));
        displayMessages();
      });
    });
  }

  displayMessages();

  // Handle send button click
  sendButton.addEventListener("click", function () {
    const message = messageInput.value.trim();
    if (message !== "") {
      savedMessages.push(message);
      localStorage.setItem("chatMessages", JSON.stringify(savedMessages));
      messageInput.value = "";
      displayMessages();
    }
  });

  // Handle Enter key press in the input field
  messageInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
      sendButton.click();
      event.preventDefault(); // Prevent line break in textarea
    }
  });
});
