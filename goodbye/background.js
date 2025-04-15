console.log("Service worker started");

// API endpoint
const ENDPOINT = "https://api.examly.io/api/v2/tests/filter";

// Department IDs (full list as provided)
const DEPARTMENT_IDS = [
    "617346bd-b9c8-468d-9099-12170fb3b570", "8c9bb195-1e81-4506-bc39-c48e6450c2a0",
    "58efa904-a695-4c14-8335-124c9ec5e95a", "4b375029-26ec-4d20-bf46-1122dfc584ae",
    "d40c4d09-8ac5-4a26-b969-ce9cc8685180", "e0f02ce1-486b-4122-8f1b-d80f7076bee3",
    "04c14795-d8b2-41c0-9c41-997a5630f455", "074cbc54-a20f-4a5d-9c02-1ca6a1bed28f",
    "da3f5269-34b1-49c4-8d38-30c18b4f6598", "f04c0f04-f6d7-434d-b8c9-5c356805ffab",
    "f0b8af1b-288a-4b41-97b1-27447014ada3", "2b60843d-7972-4235-82cb-0ebc33d75d63",
    "78b66861-c946-4d83-9754-75c32925b5a9", "5d1e18e7-b9aa-4d43-93b3-eb0a7a3df0d6",
    "82208516-6d07-4fc0-8ee4-4205601c6695", "b55a5b74-7f4a-428e-a59b-377dd8c7e4ba",
    "35700f99-19f6-42c2-a336-d32687690e4a", "c47b433a-7f1d-4014-a5b9-415187ed118b",
    "fb751a89-c97a-47a6-9795-a33b3ba2eede", "c02099c7-354a-48a9-867c-91cd16c6de38",
    "4bb74161-364a-4012-9122-be5597db9f9e", "a9ac9b80-daf9-45c3-aa4e-3aecd0a3820b",
    "91f6683d-2512-416a-a355-2c6eefe9507b", "6aa4e718-9fd9-4911-85c0-b900eed73547",
    "2d24fa30-2621-418b-9597-0442ff8997df", "5d4d3d63-73cd-4b04-a579-6c4f9fdf7473",
    "55faaca8-4375-4bc6-874e-740dbf3dd22e", "e100cac4-4586-4f3a-b598-24ee8d6c7a92",
    "ffa1501f-1747-4ea7-9b83-22b3ab409d51", "97c0a54a-67d2-4bc6-87b6-74b369e15889",
    "627f1e5a-3e5e-4e14-b948-eab0baf714c4", "d7d9bd6a-7bdc-46aa-8929-458e674f94c5",
    "c3d1f72d-aa83-4276-9976-c5fcb06f70f8", "4bf536a6-a9fa-4215-a803-056f0074e3e7",
    "2680fe23-89dc-4035-a7a6-eb1869630f81", "1dce25ce-cb7a-4826-a7e4-ab4c189bf436",
    "e641144f-f801-4f79-8f3b-cff27ab3a123", "7296cb61-76ce-4064-8928-328f2a545666",
    "48942306-1e80-4db5-bd3b-e3075202d9b8", "0ba8c5fa-9754-4d7f-851a-aa4791b9b445",
    "8b0329c3-626e-4644-b6f4-dcb0424ed9fa", "969b5384-e5ac-46aa-996b-547e5c77c3bf",
    "41b64d5f-bb55-47a7-ad77-208e27ccae80", "0400731b-2ab3-4644-828e-7c1618b23aac",
    "e024b5b6-d6db-4fe6-a445-8b49facf10bb", "d5c3f38f-fc70-4ac8-af83-372cd006396f",
    "09f0cbe3-5c20-4c75-9c50-b4ee6fa6d09a", "8154bcaa-3ee6-423f-938e-e4ccfe6002a7",
    "4d037902-f46b-4fcf-824a-8f65376dbdcc", "4ced5ede-47de-42b8-a5e3-a5af9d0ce415",
    "566994d3-6a6f-4174-899a-700468f4bc7a", "ebd40260-e32b-4367-8b8f-c606793e423b",
    "6adf26cd-4949-4501-99c4-336401d84b49", "64195871-472d-4520-839b-be0b8cbf2a94",
    "4af00c09-f6a8-4099-8699-1c6a57db677b", "0eb0005e-01b2-412a-a325-d0ea0ab9d64c",
    "282bae70-ecb4-469a-94d0-8df0917b6ed4", "62024afb-ea1e-4a6b-ad01-cbf1e592ed3c",
    "662bd1f5-9c20-411a-aad0-e00e1881a6f2", "54d15165-fc20-4e2e-bc1a-19e46c6a6f30",
    "3f3711bd-ba73-404a-b72a-dee82166d2b4", "a17c1837-80dd-4d0f-9a05-629e8f00eeb5",
    "617ce4f5-33ec-4ff6-b1a6-1c74220be379", "bf6ce3d6-8552-4959-bc65-9068c8f7738b",
    "3f0fd32e-4290-488f-8e93-ba49d4dc1ecd", "51827123-a24e-4aac-a23b-cbf3b95177e5",
    "7a309bfc-d490-4269-8c36-f2899e02de65", "9a64ffc7-47af-4f28-8dfa-31718a16ea7b",
    "bd3777c4-635f-435a-94da-3426f786d592", "6204bdfd-9a00-42b5-b951-0ab9a7a22105",
    "173df851-7e75-43f1-9185-19028621a66f", "e9fecb8e-8553-4d23-ac96-eca3da15af90",
    "8eeae087-ce46-4d8a-9d0d-aefef190f0cd", "00522911-f5fa-48fd-acb2-333b40117b82",
    "41698284-bb61-4f6c-aaf1-591182d9025d", "901ff1b8-cc03-4bb3-96b9-42bb53e86701",
    "5c490195-95f7-4577-a9cb-3096d940af5d", "1b18fbbf-a4ca-45df-ab78-75480a154b4a",
    "ef6771c4-b9f5-4593-b4f6-ae9cd8845ec2", "b073f250-c7eb-4d6b-829e-3af6ceb94037",
    "78dc3377-b4a2-4338-b17e-6d8dde7cfeb1", "ba75398b-44ce-487a-9dcd-f57339241e8d",
    "a09496c9-0412-4649-944f-2edca43cb252", "756c5ccf-535e-4b26-8d5f-3acc607e9a81",
    "34c1f447-25af-4a75-9abf-be10d1626076", "82156a68-a333-4217-8ac6-4863dd04d457",
    "e329730f-6efb-47d0-a86c-04e764487a28", "47e36ac4-0185-41c2-992c-d18c57d4a331",
    "9783c0ce-d618-4909-adf9-79b2c9d2f10e", "55cd2a51-53b1-47a3-9869-56e3d6bba559",
    "c5758329-0590-4b1f-8447-f64d20c21b96", "1abc3b49-cb7a-4d1d-a507-69fd139e57ae",
    "61164b98-a492-4009-b2a9-9c94f01ef8a8", "f650e3df-80fa-4e27-b254-3dd802a071a7",
    "015b365f-9bcd-41c4-92fd-9e3e475cbdac", "281d8e09-ea24-4aee-9d62-bb945c33fc7a",
    "9f1b6c5b-ff23-4c7e-b3e6-576f36f893d5", "3610abcc-b6f4-4a8e-b593-77c165755778",
    "9697e209-d83d-41f3-a51b-8de4de0bbe54", "9a4a2f10-f5bd-420f-a71c-3e25f70c2ceb",
    "cfeff396-511e-472b-bd3f-288dff86a343", "151656b3-5b14-4397-a293-8c8962ef1075",
    "c8f816f8-836d-4fe6-9ad6-d48fe5fd372d", "5473cf88-4fca-4b1c-a978-b1c25589654c",
    "b7ec2e38-e5e8-44f1-9427-229b4c15c443", "8f5f4ff5-6322-414f-a26d-38a2ebaaaf58",
    "ad35005d-9bb8-4e59-8df6-c4a164d4be1f", "9c95a180-5ae6-4109-b5bf-ca28b3f45c53",
    "c1323b4a-12ec-4906-86d2-fcbc4cc261be", "5eba9f0f-94be-45c5-b811-b351b9e81a2d",
    "d4dee91f-ee3f-4153-a78f-2114bf3e5b56", "b5c43777-62fb-4841-8044-df9635e168a5",
    "b55f9101-3379-4f7d-8ee5-be8c4662b73d", "705909cd-368f-4d89-8bc4-b88e545448aa",
    "6591339a-64fd-419b-82a2-01b4198184f7", "e9280c07-148f-4634-86fd-566e2b99ca95",
    "7ce72cef-ca43-47b2-ab98-b98e08c3fd86"
];

// Headers for the API request
const HEADERS = {
    "accept": "application/json, text/plain, */*",
    "accept-language": "en-US,en;q=0.9",
    "content-type": "application/json",
    "origin": "https://admin.ltimindtree.iamneo.ai",
    "priority": "u=1, i",
    "referer": "https://admin.ltimindtree.iamneo.ai/",
    "sec-ch-ua": '"Not(A:Brand";v="99", "Google Chrome";v="133", "Chromium";v="133"',
    "sec-ch-ua-mobile": "?0",
    "sec-ch-ua-platform": '"Windows"',
    "sec-fetch-dest": "empty",
    "sec-fetch-mode": "cors",
    "sec-fetch-site": "cross-site",
    "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/133.0.0.0 Safari/537.36"
};

// Utility to check storage usage
async function checkStorageUsage() {
    return new Promise((resolve) => {
        chrome.storage.local.getBytesInUse(null, (bytesInUse) => {
            console.log(`Current storage usage: ${bytesInUse} bytes (${(bytesInUse / 1024 / 1024).toFixed(2)} MB)`);
            resolve(bytesInUse);
        });
    });
}

// Fetch all rule-based tests
async function fetchAllRuleBasedTests(token, departmentIds, branchId = "All", limit = 1100) {
    console.log("Starting fetchAllRuleBasedTests with token:", token);

    if (!token) {
        throw new Error("Token is undefined or empty. Cannot fetch tests.");
    }

    const payload = {
        page: 1,
        limit: limit,
        branch_id: branchId,
        testType: "Rule Based Test",
        department_id: departmentIds,
        mainDepartmentUser: true
    };

    let allRuleBasedTests = [];
    let page = 1;

    while (true) {
        payload.page = page;
        console.log(`Fetching page ${page} with payload:`, payload);

        try {
            HEADERS.authorization = token;
            const response = await fetch(ENDPOINT, {
                method: 'POST',
                headers: HEADERS,
                body: JSON.stringify(payload)
            });

            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}, Status Text: ${response.statusText}`);
            }

            const data = await response.json();
            console.log(`API response for page ${page}:`, data);
            const tests = data.data || [];

            if (!tests.length) {
                console.log(`No more tests found on page ${page}. Stopping fetch.`);
                break;
            }

            allRuleBasedTests.push(...tests);
            console.log(`Page ${page}: Fetched ${tests.length} tests, Total tests: ${allRuleBasedTests.length}`);
            page++;
            await new Promise(resolve => setTimeout(resolve, 500)); // Delay to avoid rate limiting
        } catch (error) {
            console.error(`Error on page ${page}:`, error.message);
            throw error;
        }
    }

    return allRuleBasedTests;
}

// Extract QB names from tests
function extractQBNames(tests) {
    console.log("Extracting QB names from tests:", tests.length);
    const qbNames = new Set();

    for (const test of tests) {
        const testRules = test.test_rules || [];
        console.log(`Test ${test.testId} rules:`, testRules);
        if (testRules) {
            for (const ruleGroup of testRules) {
                for (const subGroup of ruleGroup) {
                    for (const rule of subGroup) {
                        for (const qb of rule.questionbank || []) {
                            const qbName = qb.qb_name || 'Unknown QB';
                            if (qbName && qbName !== "No Question Banks Available") {
                                // Normalize the QB name
                                const normalizedQBName = qbName.toLowerCase().replace(/_/g, ' ').trim();
                                console.log(`Found QB name: ${qbName} (normalized: ${normalizedQBName})`);
                                qbNames.add(normalizedQBName);
                            }
                        }
                    }
                }
            }
        }
    }

    const qbNamesArray = Array.from(qbNames).sort();
    console.log(`Total unique QB names extracted: ${qbNamesArray.length}`);
    return qbNamesArray;
}

// Keep the service worker alive during async operations
let keepAliveInterval = null;
function keepServiceWorkerAlive() {
    if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
    }
    keepAliveInterval = setInterval(() => {
        console.log("Keeping service worker alive...");
    }, 20000);
}

function stopServiceWorkerKeepAlive() {
    if (keepAliveInterval) {
        clearInterval(keepAliveInterval);
        keepAliveInterval = null;
        console.log("Stopped keeping service worker alive.");
    }
}

// Get cached QB names
function getCachedQBNames() {
    return new Promise((resolve) => {
        chrome.storage.local.get(['qbNames'], (result) => {
            console.log("Retrieved cached QB names:", result.qbNames);
            resolve(result.qbNames || []);
        });
    });
}

// Cache QB names
function cacheQBNames(qbNames) {
    return new Promise((resolve) => {
        chrome.storage.local.set({ qbNames: qbNames }, () => {
            console.log("QB names cached successfully:", qbNames.length);
            resolve();
        });
    });
}

// Handle messages from popup.js
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    console.log("Message received in background.js:", message);

    if (message.action === 'fetchQBNames') {
        const token = message.token;
        console.log("Fetching QB names with token:", token);

        keepServiceWorkerAlive();

        if (!token) {
            console.error("Token is undefined or empty in message.");
            const qbNames = [
                "edge week 04 dotnet verified questions",
                "java fs march ms1 a2 easy cod",
                "lti april batch java ms2 project busstand bus vs code",
                "lti ignite week 8 practice 1",
                "practice number math",
                "restful aplckcq"
            ];
            console.warn("Using fallback QB names due to missing token:", qbNames);

            // Cache the fallback QB names
            cacheQBNames(qbNames).then(() => {
                // Prioritize sender's tab if available
                let targetTabId = sender.tab ? sender.tab.id : null;
                if (targetTabId) {
                    console.log("Using sender's tab ID:", targetTabId);
                    injectConvertedJS(targetTabId, sendResponse, qbNames, "Token was undefined, used fallback QB names");
                } else {
                    console.log("Sender tab ID not available, querying all tabs...");
                    chrome.tabs.query({ url: "https://admin.ltimindtree.iamneo.ai/*" }, (tabs) => {
                        if (tabs.length > 0) {
                            console.log("Found matching tab:", tabs[0].id);
                            injectConvertedJS(tabs[0].id, sendResponse, qbNames, "Token was undefined, used fallback QB names");
                        } else {
                            console.error("No matching tab found for https://admin.ltimindtree.iamneo.ai/*");
                            sendResponse({ success: false, error: "No matching tab found for https://admin.ltimindtree.iamneo.ai/*" });
                            stopServiceWorkerKeepAlive();
                        }
                    });
                }
            });
            return true;
        }

        // Main logic for fetching QB names
        (async () => {
            let qbNames = [];
            let errorMessage = null;

            try {
                // Try to get cached QB names first
                const cachedQBNames = await getCachedQBNames();
                if (cachedQBNames.length > 0) {
                    console.log("Using cached QB names:", cachedQBNames.length);
                    qbNames = cachedQBNames;
                } else {
                    // Check storage usage before proceeding
                    await checkStorageUsage();

                    // Clear existing storage to free up space
                    console.log("Clearing existing storage...");
                    await new Promise((resolve) => {
                        chrome.storage.local.clear(() => {
                            console.log("Storage cleared");
                            resolve();
                        });
                    });

                    // Check storage usage after clearing
                    await checkStorageUsage();

                    // Fetch rule-based tests
                    console.log("Attempting to fetch rule-based tests...");
                    const tests = await fetchAllRuleBasedTests(token, DEPARTMENT_IDS);
                    console.log(`Total Rule Based Tests fetched: ${tests.length}`);

                    // Extract QB names
                    console.log("Extracting QB names...");
                    qbNames = extractQBNames(tests);
                    console.log(`Total unique QB names: ${qbNames.length}`);

                    if (qbNames.length === 0) {
                        console.warn("No QB names fetched from API. Using fallback list.");
                        qbNames = [
                            "edge week 04 dotnet verified questions",
                            "java fs march ms1 a2 easy cod",
                            "lti april batch java ms2 project busstand bus vs code",
                            "lti ignite week 8 practice 1",
                            "practice number math",
                            "restful aplckcq"
                        ];
                        console.log("Fallback QB names applied:", qbNames);
                    }

                    // Cache the fetched QB names
                    await cacheQBNames(qbNames);
                }

                // Prioritize sender's tab if available
                let targetTabId = sender.tab ? sender.tab.id : null;
                if (targetTabId) {
                    console.log("Using sender's tab ID:", targetTabId);
                    injectConvertedJS(targetTabId, sendResponse, qbNames, errorMessage);
                } else {
                    console.log("Sender tab ID not available, querying all tabs...");
                    chrome.tabs.query({ url: "https://admin.ltimindtree.iamneo.ai/*" }, (tabs) => {
                        if (tabs.length > 0) {
                            console.log("Found matching tab:", tabs[0].id);
                            injectConvertedJS(tabs[0].id, sendResponse, qbNames, errorMessage);
                        } else {
                            console.error("No matching tab found for https://admin.ltimindtree.iamneo.ai/*");
                            sendResponse({ success: false, error: "No matching tab found for https://admin.ltimindtree.iamneo.ai/*" });
                            stopServiceWorkerKeepAlive();
                        }
                    });
                }
            } catch (error) {
                console.error('Error in fetchQBNames:', error.message);
                errorMessage = error.message;
                qbNames = [
                    "edge week 04 dotnet verified questions",
                    "java fs march ms1 a2 easy cod",
                    "lti april batch java ms2 project busstand bus vs code",
                    "lti ignite week 8 practice 1",
                    "practice number math",
                    "restful aplckcq"
                ];
                console.warn("API fetch failed. Using fallback QB names:", qbNames);

                // Cache the fallback QB names
                await cacheQBNames(qbNames);

                // Prioritize sender's tab if available
                let targetTabId = sender.tab ? sender.tab.id : null;
                if (targetTabId) {
                    console.log("Using sender's tab ID:", targetTabId);
                    injectConvertedJS(targetTabId, sendResponse, qbNames, errorMessage);
                } else {
                    console.log("Sender tab ID not available, querying all tabs...");
                    chrome.tabs.query({ url: "https://admin.ltimindtree.iamneo.ai/*" }, (tabs) => {
                        if (tabs.length > 0) {
                            console.log("Found matching tab:", tabs[0].id);
                            injectConvertedJS(tabs[0].id, sendResponse, qbNames, errorMessage);
                        } else {
                            console.error("No matching tab found for https://admin.ltimindtree.iamneo.ai/*");
                            sendResponse({ success: false, error: "No matching tab found for https://admin.ltimindtree.iamneo.ai/*" });
                            stopServiceWorkerKeepAlive();
                        }
                    });
                }
            }
        })();

        return true;
    } else {
        console.warn("Unknown message action:", message.action);
        sendResponse({ success: false, error: "Unknown action" });
    }
});

// Helper function to inject converted.js and send response
function injectConvertedJS(tabId, sendResponse, qbNames, errorMessage) {
    console.log("Injecting QB names into tab:", tabId);

    // Verify the tab's URL matches the expected host
    chrome.tabs.get(tabId, (tab) => {
        if (chrome.runtime.lastError) {
            console.error("Error accessing tab:", chrome.runtime.lastError.message);
            sendResponse({ success: false, error: chrome.runtime.lastError.message });
            stopServiceWorkerKeepAlive();
            return;
        }

        if (!tab.url || !tab.url.startsWith("https://admin.ltimindtree.iamneo.ai/")) {
            console.error("Tab URL does not match expected host:", tab.url);
            sendResponse({ success: false, error: "Tab URL does not match expected host: " + tab.url });
            stopServiceWorkerKeepAlive();
            return;
        }

        // Inject the script into the ISOLATED world (content script context)
        chrome.scripting.executeScript({
            target: { tabId: tabId },
            world: "ISOLATED",
            func: (qbNamesArray) => {
                console.log("converted.js is loading...");
                window.qbNamesToHighlight = new Set(qbNamesArray);
                console.log("converted.js loaded, qbNamesToHighlight size:", window.qbNamesToHighlight.size);
                const event = new Event('convertedJSUpdated');
                document.dispatchEvent(event);
                console.log("Dispatched convertedJSUpdated event");
            },
            args: [qbNames]
        }, (results) => {
            if (chrome.runtime.lastError) {
                console.error("Error injecting script:", chrome.runtime.lastError.message);
                sendResponse({ success: false, error: chrome.runtime.lastError.message });
            } else {
                console.log("Script injected successfully, sending response...");
                sendResponse({
                    success: true,
                    qbNamesCount: qbNames ? qbNames.length : 0,
                    message: errorMessage ? `API fetch failed: ${errorMessage}, used fallback` : ''
                });
            }
            stopServiceWorkerKeepAlive();
        });
    });
}