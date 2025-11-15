// quick helpers
const el = id => document.getElementById(id);
const billInput = el('billInput');
const tipInput  = el('tipInput');
const calcBtn   = el('calculateBtn');

const formatter = new Intl.NumberFormat('en-IN', {
  style: 'currency',
  currency: 'INR',
  maximumFractionDigits: 2
});

// compute and update button text
function computeTip() {
  const bill = parseFloat(billInput.value || 0);
  const percent = parseFloat(tipInput.value || 0);

  if (!isFinite(bill) || bill < 0) {
    calcBtn.textContent = 'Enter a valid bill amount';
    return;
  }
  if (!isFinite(percent) || percent < 0) {
    calcBtn.textContent = 'Enter a valid tip %';
    return;
  }

  const tipAmount = (bill * percent) / 100;
  // show tip amount (you can also show total or per-person later)
  calcBtn.textContent = `Tip Amount: ${formatter.format(tipAmount)}`;
}

// click the "Tip Amount" button to compute
calcBtn.addEventListener('click', computeTip);

// also compute when user presses Enter inside either input
[billInput, tipInput].forEach(input => {
  input.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') computeTip();
  });
});

// optional: live-update as user types (uncomment if you want)
 // billInput.addEventListener('input', computeTip);
 // tipInput.addEventListener('input', computeTip);
