console.log("content.js is loading...");

function normalizeText(text) {
    // Convert to lowercase, replace underscores with spaces, and remove extra spaces
    return text.toLowerCase().replace(/_/g, ' ').replace(/\s+/g, ' ').trim();
}

function styleQBNames(qbNamesToHighlight = null) {
    console.log("Running styleQBNames");

    // If no qbNamesToHighlight is provided, use the window object or retry
    const maxRetries = 10;
    let retryCount = 0;

    function attemptStyleQBNames() {
        let currentQBNames = qbNamesToHighlight || window.qbNamesToHighlight;

        if (typeof currentQBNames === 'undefined' || !currentQBNames) {
            retryCount++;
            if (retryCount <= maxRetries) {
                console.warn(`qbNamesToHighlight is not defined yet. Retry ${retryCount}/${maxRetries} in 500ms...`);
                setTimeout(attemptStyleQBNames, 500);
                return;
            } else {
                console.error("Max retries reached. qbNamesToHighlight is still not defined.");
                return;
            }
        }

        console.log("Total QB names to highlight:", currentQBNames.size);

        if (currentQBNames.size === 0) {
            console.warn("qbNamesToHighlight is empty. This might indicate a failure in loading QB names.");
        } else {
            console.log("Sample QB names:", Array.from(currentQBNames).slice(0, 5)); // Log first 5 QB names for debugging
        }

        // Normalize the QB names for comparison
        const normalizedQBNames = new Set(Array.from(currentQBNames).map(name => normalizeText(name)));

        const elements = document.querySelectorAll('td');
        let foundCount = 0;

        elements.forEach(element => {
            const text = element.textContent.trim();
            // Remove the "question bank name" prefix if present
            const qbNameMatch = text.match(/question bank name\s*(.+)/i);
            const qbNameText = qbNameMatch ? qbNameMatch[1] : text;
            const normalizedText = normalizeText(qbNameText);
            console.log(`Checking normalized page text: ${normalizedText}`); // Debug log
            if (normalizedQBNames.has(normalizedText)) {
                console.log("Styling QB name:", text);
                element.style.setProperty('color', 'red', 'important');
                element.style.setProperty('font-weight', 'bold', 'important');
                foundCount++;
            }
        });

        console.log(`Found ${foundCount} potential QB names on the platform`);
    }

    attemptStyleQBNames();
}

// Run styleQBNames when the DOM is loaded and check for cached QB names
document.addEventListener('DOMContentLoaded', () => {
    console.log("QB Name Highlighter extension running on:", window.location.href);

    // Check for cached QB names
    chrome.storage.local.get(['qbNames'], (result) => {
        if (result.qbNames && result.qbNames.length > 0) {
            console.log("Found cached QB names, size:", result.qbNames.length);
            window.qbNamesToHighlight = new Set(result.qbNames);
            styleQBNames(window.qbNamesToHighlight); // Highlight immediately using cached data
        } else {
            console.log("No cached QB names found, relying on injection.");
            styleQBNames();
        }
    });
});

// Re-run styleQBNames when converted.js is updated
document.addEventListener('convertedJSUpdated', () => {
    console.log("convertedJSUpdated event received, re-running styleQBNames");
    styleQBNames();
});

// Observe DOM changes to re-run styleQBNames when the page updates
const observer = new MutationObserver((mutations) => {
    console.log("DOM changed, re-running styleQBNames");
    chrome.storage.local.get(['qbNames'], (result) => {
        if (result.qbNames && result.qbNames.length > 0) {
            window.qbNamesToHighlight = new Set(result.qbNames);
            styleQBNames(window.qbNamesToHighlight);
        } else {
            styleQBNames();
        }
    });
});

observer.observe(document.body, {
    childList: true,
    subtree: true
});

console.log("content.js loaded");

// Initial check in case DOMContentLoaded has already fired
if (document.readyState === 'complete' || document.readyState === 'interactive') {
    console.log("DOM already loaded, running styleQBNames immediately");
    chrome.storage.local.get(['qbNames'], (result) => {
        if (result.qbNames && result.qbNames.length > 0) {
            console.log("Found cached QB names, size:", result.qbNames.length);
            window.qbNamesToHighlight = new Set(result.qbNames);
            styleQBNames(window.qbNamesToHighlight); // Highlight immediately using cached data
        } else {
            console.log("No cached QB names found, relying on injection.");
            styleQBNames();
        }
    });
}