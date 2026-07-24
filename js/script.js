
// Select DOM elements
const calcForm = document.getElementById('calculator-form');
const resultsCard = document.getElementById('results');
const totalBalanceEl = document.getElementById('total-balance');
const totalContributionsEl = document.getElementById('total-contributions');
const totalInterestEl = document.getElementById('total-interest');

// Helper function to format numbers as Currency ($1,000.00)
function formatCurrency(amount) {
    return new Intl.NumberFormat('en-US', {
        style: 'currency',
        currency: 'USD'
    }).format(amount);
}

// Event listener for form submission
calcForm.addEventListener('submit', function (e) {
    e.preventDefault(); // Prevents page from refreshing on submit

    // Fetch user input values and convert them to numbers
    const initial = parseFloat(document.getElementById('initial').value) || 0;
    const monthly = parseFloat(document.getElementById('monthly').value) || 0;
    const rate = parseFloat(document.getElementById('rate').value) || 0;
    const years = parseInt(document.getElementById('years').value) || 0;

    // Calculation variables
    const months = years * 12;
    const monthlyRate = (rate / 100) / 12;

    let balance = initial;
    let totalDeposited = initial;

    // Monthly compounding loop
    for (let i = 0; i < months; i++) {
        balance += monthly;
        totalDeposited += monthly;
        balance += balance * monthlyRate;
    }

    const totalInterest = balance - totalDeposited;

    // Display formatted results
    totalBalanceEl.textContent = formatCurrency(balance);
    totalContributionsEl.textContent = formatCurrency(totalDeposited);
    totalInterestEl.textContent = formatCurrency(totalInterest);

    // Reveal the results card
    resultsCard.classList.remove('hidden');
});