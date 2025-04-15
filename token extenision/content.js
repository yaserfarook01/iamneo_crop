console.log("Auth Token Copier script loaded");

function extractToken() {
    const pageSource = document.documentElement.outerHTML;
    const tokenMatch = pageSource.match(/"token":"([^"]+)"/);
    return tokenMatch ? tokenMatch[1] : null;
}

function copyToken() {
    const token = extractToken();
    if (token) {
        navigator.clipboard.writeText(token)
            .then(() => alert('Token copied to clipboard!'))
            .catch(() => alert('Failed to copy token. Please try again.'));
    } else {
        alert('No token found on this page.');
    }
}

function addButton() {
    const button = document.createElement('button');
    button.textContent = 'Copy Auth Token';
    button.style.position = 'fixed';
    button.style.bottom = '20px';
    button.style.right = '20px';
    button.style.zIndex = '9999';
    button.addEventListener('click', copyToken);
    document.body.appendChild(button);
}

if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', addButton);
} else {
    addButton();
}
