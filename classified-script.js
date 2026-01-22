// ========================================
// CLASSIFIED DOCUMENT VIEWER
// Interactive Features (Optional)
// ========================================

document.addEventListener('DOMContentLoaded', function() {
    
    // Optional: Add hover effect to redacted content
    // This creates a subtle interaction without revealing content
    const redactedElements = document.querySelectorAll('.redacted, .redacted-block, .redacted-long');
    
    redactedElements.forEach(element => {
        element.addEventListener('mouseenter', function() {
            this.style.opacity = '0.8';
        });
        
        element.addEventListener('mouseleave', function() {
            this.style.opacity = '1';
        });
    });

    // Optional: Print warning
    window.addEventListener('beforeprint', function() {
        console.log('SECURITY NOTICE: Printing classified document');
    });

    // Optional: Watermark effect (for demonstration purposes)
    addWatermark();
});

// Function to add a subtle watermark
function addWatermark() {
    const container = document.querySelector('.document-container');
    if (!container) return;

    const watermark = document.createElement('div');
    watermark.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%) rotate(-45deg);
        font-size: 120px;
        font-weight: bold;
        color: rgba(0, 0, 0, 0.03);
        pointer-events: none;
        z-index: 1;
        user-select: none;
        font-family: Arial Black, sans-serif;
    `;
    watermark.textContent = 'CLASSIFIED';
    document.body.appendChild(watermark);
}

// Optional: Function to reveal redacted content (for educational purposes only)
// This is disabled by default - uncomment to enable
/*
function enableRedactionReveal() {
    const redactedElements = document.querySelectorAll('.redacted, .redacted-block, .redacted-long');
    
    redactedElements.forEach(element => {
        element.addEventListener('click', function() {
            if (confirm('SECURITY WARNING: Reveal redacted content? (Educational purposes only)')) {
                this.style.backgroundColor = 'yellow';
                this.style.color = '#000';
            }
        });
    });
}
*/

// Optional: Generate random document ID on load
function generateDocumentId() {
    const year = new Date().getFullYear();
    const randomNum = Math.floor(Math.random() * 99999).toString().padStart(5, '0');
    return `TS-${year}-FBI-${randomNum}`;
}

// Optional: Add current date to header
function updateDocumentDate() {
    const dateElements = document.querySelectorAll('.header-item .value');
    dateElements.forEach(element => {
        if (element.textContent.includes('JANUARY 2026')) {
            const today = new Date();
            const options = { day: '2-digit', month: 'long', year: 'numeric' };
            element.textContent = today.toLocaleDateString('en-US', options).toUpperCase();
        }
    });
}
