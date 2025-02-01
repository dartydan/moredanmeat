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
        } else if (value > 0 && value < 10) {
            isValid = false;
            input.setCustomValidity('Minimum of 10 people required');
        } else {
            input.setCustomValidity('');
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
    const phone = document.getElementById('phone').value;
    const eventDate = document.getElementById('eventDate').value;
    const notes = document.getElementById('notes').value;

    // Construct email body with totals included
    const emailBody = `
New Catering Quote Request:

Contact Information:
------------------
Name: ${name}
Phone: ${phone}
Event Date: ${eventDate}
Total Guests: ${document.getElementById('totalGuests').value}

Order Details:
-------------
${orderDetails.join('\n')}

Estimated Pricing (Final quote may vary):
--------------------------------------
Estimated Subtotal: $${document.getElementById('subtotal').textContent.replace('$', '')}
Base Delivery Fee: $100
Estimated Total: $${document.getElementById('total').textContent.replace('$', '')}

Additional Notes:
---------------
${notes}
    `.trim();

    // Store order details in localStorage first
    const orderData = {
        name,
        phone,
        eventDate,
        totalGuests: document.getElementById('totalGuests').value,
        notes,
        orderDetails,
        subtotal: document.getElementById('subtotal').textContent.replace('$', ''),
        total: document.getElementById('total').textContent.replace('$', '')
    };
    localStorage.setItem('orderData', JSON.stringify(orderData));

    // Create mailto link with the complete email body
    const mailtoLink = `mailto:catering@moredanmeat.com?subject=New Catering Quote Request from ${name}&body=${encodeURIComponent(emailBody)}`;
    
    // Open email client and wait for user interaction
    const emailWindow = window.open(mailtoLink);
    
    // Check if email window was blocked
    if (emailWindow === null) {
        alert('Please allow popups to send your order via email.');
        return;
    }

    // Redirect to confirmation page after a longer delay
    setTimeout(() => {
        window.location.href = 'confirmation.html';
    }, 2000);
}

// Add this at the start of the file
const PRICES = {
    pulledPork: 10,
    pulledChicken: 9,
    ribs: 13,
    sausage: 9,
    brisket: 15,
    macCheese: 3,
    quesoDip: 4,
    greenBeans: 3,
    bakedBeans: 3,
    cornCasserole: 4,
    sweetTea: 4,
    unsweetTea: 4,
    lemonade: 4,
    water: 1,
    originalBBQ: 2,
    hotBBQ: 2,
    tangyBBQ: 2,
    chickenSauce: 2,
    creamyRanch: 2,
    bleuCheese: 2,
    classicHot: 1,
    insaneHot: 2
};

// Add this function to update totals
function updateTotal() {
    let subtotal = 0;
    const numberInputs = document.querySelectorAll('input[type="number"]');
    
    numberInputs.forEach(input => {
        const value = parseInt(input.value) || 0;
        const price = PRICES[input.id];
        if (price) {
            subtotal += value * price;
        }
    });
    
    const deliveryFee = 100;
    const total = subtotal + deliveryFee;
    
    document.getElementById('subtotal').textContent = `$${subtotal}`;
    document.getElementById('total').textContent = `$${total}`;
}

// Add event listeners to all number inputs
document.querySelectorAll('input[type="number"]').forEach(input => {
    input.addEventListener('input', updateTotal);
});

// Initialize total on page load
document.addEventListener('DOMContentLoaded', updateTotal); 