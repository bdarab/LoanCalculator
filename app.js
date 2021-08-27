/* eslint-disable no-use-before-define */

// Listen for submit
document.getElementById('loan-form').addEventListener('submit', calculateResults)


// Calculate Result Function
function calculateResults (e) {
  console.log('calculating')
  // UI Variables
  const amount = document.getElementById('amount')
  const interest = document.getElementById('interest')
  const years = document.getElementById('years')
  const monthlyPayment = document.getElementById('monthly-payment')
  const totalPayment = document.getElementById('total-payment')
  const totalInterest = document.getElementById('total-interest')

  // General Calculations
  const principal = parseFloat(amount.value)
  const calculatedInterest = parseFloat(interest.value) / 100 / 12
  const calculatedPayments = parseFloat(years.value) * 12

  // Monthly Payments Calculations
  // eslint-disable-next-line no-restricted-properties
  const x = Math.pow(1 + calculatedInterest, calculatedPayments)
  const monthly = (principal * x * calculatedInterest) / (x - 1)

  if (isFinite(monthly)) {
    monthlyPayment.value = monthly.toFixed(2)
    totalPayment.value = (monthly * calculatedPayments).toFixed(2)
    totalInterest.value = ((monthly * calculatedPayments) - principal).toFixed(2)
  } else {
    showError('Please check your numbers!')
  }



  e.preventDefault()
}

// Show error function
function showError (error) {
  // Create a div
  const errorDiv = document.createElement('div')
  // get Elements
  const card = document.querySelector('.card')
  const heading = document.querySelector('.heading')
  // Add class
  errorDiv.className = 'alert alert-danger'
  // create text node and append to div
  errorDiv.appendChild(document.createTextNode(error))
  // insert error above heading
  card.insertBefore(errorDiv, heading)
  // clear error aftr 3 seconds
  setTimeout(clearError, 3000)
}

// Clear Error Function
function clearError () {
  document.querySelector('.alert').remove()
}