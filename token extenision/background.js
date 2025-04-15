chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    console.log("Message received in background script:", request);
    if (request.action === 'setAuthToken') {
        console.log("Setting auth token:", request.token);
        chrome.storage.local.set({ authToken: request.token }, function() {
            console.log('Token is set to ' + request.token);
        });
    }
});

chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
    if (changeInfo.status === 'complete' && tab.url) {
        if (tab.url.startsWith('https://admin.ltimindtree.iamneo.ai/') || 
            tab.url.startsWith('https://admin.neowise.examly.io/')) {
            console.log("Target website loaded.");
        }
    }
});
