console.log("popup.js loaded");

document.addEventListener('DOMContentLoaded', () => {
    console.log("DOM loaded in popup.js");

    const tokenInput = document.getElementById('tokenInput');
    const fetchButton = document.getElementById('fetchButton');
    const statusDiv = document.getElementById('status');

    console.log("DOM elements:", {
        tokenInput: tokenInput,
        fetchButton: fetchButton,
        statusDiv: statusDiv
    });

    if (!tokenInput || !fetchButton || !statusDiv) {
        console.error("One or more DOM elements not found:", {
            tokenInput: !!tokenInput,
            fetchButton: !!fetchButton,
            statusDiv: !!statusDiv
        });
        // Proceed with a default token to test message sending
        console.log("Proceeding with a default token for testing...");
        sendMessageToBackground("");
        return;
    }

    // Load saved token from storage
    chrome.storage.local.get(['apiToken'], (result) => {
        console.log("Retrieved token from storage:", result.apiToken);
        if (result.apiToken) {
            tokenInput.value = result.apiToken;
        } else {
            console.log("No token found in storage.");
        }
    });

    fetchButton.addEventListener('click', () => {
        console.log("Fetch QB Names button clicked");
        const token = tokenInput.value.trim();
        console.log("Token value:", token);

        // Save token to storage
        chrome.storage.local.set({ apiToken: token }, () => {
            console.log("Token saved to storage:", token);
        });

        sendMessageToBackground(token);
    });
});

function sendMessageToBackground(token) {
    console.log("Sending message to background.js with token:", token);
    try {
        chrome.runtime.sendMessage({
            action: 'fetchQBNames',
            token: token
        }, (response) => {
            if (chrome.runtime.lastError) {
                console.error("Error sending message to background.js:", chrome.runtime.lastError.message);
                updateStatus(`Error: ${chrome.runtime.lastError.message}`);
                return;
            }
            console.log("Response from background.js:", response);
            if (response && response.success) {
                updateStatus(`Successfully fetched ${response.qbNamesCount} QB names. ${response.message}`);
            } else {
                updateStatus(`Error: ${response ? response.error : "No response from background.js"}`);
            }
        });
    } catch (error) {
        console.error("Exception while sending message:", error.message);
        updateStatus(`Error: ${error.message}`);
    }
}

function updateStatus(message) {
    const statusDiv = document.getElementById('status');
    if (statusDiv) {
        statusDiv.textContent = message;
    } else {
        console.log("Status message (statusDiv not found):", message);
    }
}