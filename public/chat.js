document.getElementById('chatForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent the form from submitting via the browser

    const messageInput = document.getElementById('messageInput');
    const chatArea = document.getElementById('chatArea');

    fetch('/chat', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: messageInput.value })
    })
    .then(response => response.json())
    .then(data => {
        // Display the response in chatArea
        const responseMessage = document.createElement('p');
        responseMessage.textContent = data.choices[0].message.content; // Adjust according to actual API response structure
        chatArea.appendChild(responseMessage);
        messageInput.value = ''; // Clear input after sending
    })
    .catch(error => console.error('Error:', error));
});
