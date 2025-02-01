// Close popup when clicking outside
window.onclick = function(event) {
    if (event.target.className === 'popup-overlay') {
        event.target.style.display = 'none';
    }
}

// Close popup when clicking close button
document.querySelector('.close-button').onclick = function() {
    document.getElementById('orderForm').style.display = 'none';
}

// Handle form submission
document.getElementById('cateringForm').onsubmit = function(e) {
    e.preventDefault();
    
    // Get all number inputs
    const numberInputs = this.querySelectorAll('input[type="number"]');
    let isValid = true;
    let hasOrders = false;
    let orderDetails = [];
    
    // Check each input and collect order details
    numberInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        if (input.id === 'brisket') {
            if (value > 0 && value < 20) {
                isValid = false;
                input.setCustomValidity('Minimum of 20 people required for brisket');
            } else {
                input.setCustomValidity('');
            }
        } else {
            if (value > 0 && value < 10) {
                isValid = false;
                input.setCustomValidity('Minimum of 10 people required');
            } else {
                input.setCustomValidity('');
            }
        }
        if (value > 0) {
            hasOrders = true;
            orderDetails.push(`${input.previousElementSibling.textContent}: ${value} people`);
        }
    });
    
    if (!isValid) {
        alert('Please ensure all ordered items have a minimum of 10 people.');
        return;
    }
    
    if (!hasOrders) {
        alert('Please select at least one menu item.');
        return;
    }

    // Get contact info
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const phone = document.getElementById('phone').value;
    const eventDate = document.getElementById('eventDate').value;
    const notes = document.getElementById('notes').value;

    // Construct email body
    const emailBody = `
New Catering Order:

Contact Information:
------------------
Name: ${name}
Email: ${email}
Phone: ${phone}
Event Date: ${eventDate}

Order Details:
-------------
${orderDetails.join('\n')}

Additional Notes:
---------------
${notes}
    `.trim();

    // Create mailto link
    const mailtoLink = `mailto:catering@moredanmeat.com?subject=New Catering Order from ${name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client
    window.location.href = mailtoLink;
    
    // Show confirmation and reset form
    alert('Thank you for your order! Your email client will open to send the order details.');
    document.getElementById('orderForm').style.display = 'none';
    e.target.reset();
} 