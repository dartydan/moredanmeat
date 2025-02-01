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
    
    // Check each input
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
        if (value > 0) hasOrders = true;
    });
    
    if (!isValid) {
        alert('Please ensure all ordered items have a minimum of 10 people.');
        return;
    }
    
    if (!hasOrders) {
        alert('Please select at least one menu item.');
        return;
    }
    
    // If valid, submit the form
    alert('Thank you for your order! We will contact you soon to confirm the details.');
    document.getElementById('orderForm').style.display = 'none';
} 