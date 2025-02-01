document.addEventListener('DOMContentLoaded', function() {
    const orderData = JSON.parse(localStorage.getItem('orderData'));
    if (orderData) {
        const orderSummary = document.getElementById('orderSummary');
        orderSummary.innerHTML = `
            <h2 class="rust-font">Order Summary</h2>
            <div><strong>Name:</strong> ${orderData.name}</div>
            <div><strong>Email:</strong> ${orderData.email}</div>
            <div><strong>Phone:</strong> ${orderData.phone}</div>
            <div><strong>Event Date:</strong> ${orderData.eventDate}</div>
            <h3 class="rust-font">Items Ordered:</h3>
            ${orderData.orderDetails.map(item => `<div>${item}</div>`).join('')}
            ${orderData.notes ? `
                <h3 class="rust-font">Additional Notes:</h3>
                <div>${orderData.notes}</div>
            ` : ''}
            <h3 class="rust-font">Order Total:</h3>
            <div><strong>Subtotal:</strong> $${orderData.subtotal}</div>
            <div><strong>Delivery Fee:</strong> $100</div>
            <div><strong>Total:</strong> $${orderData.total}</div>
        `;
        localStorage.removeItem('orderData');
    }
}); 