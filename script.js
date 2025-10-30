/* Interactive Pricing Component
   - 5 tiers of pageviews with base monthly prices
   - Yearly billing applies a 25% discount to the monthly rate
*/

const tiers = [
  { views: "10K", price: 8 },
  { views: "50K", price: 12 },
  { views: "100K", price: 16 },
  { views: "500K", price: 24 },
  { views: "1M", price: 36 },
];

const slider = document.getElementById("views");
const pageviewsEl = document.getElementById("pageviews");
const priceEl = document.getElementById("price");
const toggle = document.getElementById("billingToggle");

// initialize
updateUI();

slider.addEventListener("input", updateUI);
toggle.addEventListener("click", () => {
  const on = toggle.getAttribute("aria-checked") === "true";
  toggle.setAttribute("aria-checked", String(!on));
  updateUI();
});

function updateUI() {
  // where we are on the scale
  const idx = Number(slider.value);
  const tier = tiers[idx];

  // compute price (apply yearly discount if toggle is on)
  const yearly = toggle.getAttribute("aria-checked") === "true";
  const discount = yearly ? 0.75 : 1;
  const price = (tier.price * discount).toFixed(2);

  pageviewsEl.textContent = tier.views;
  priceEl.textContent = `$${price}`;

  // a11y
  slider.setAttribute("aria-valuenow", String(idx));

  // fill the slider track to the thumb
  const pct = (idx / (slider.max - slider.min)) * 100;
  slider.style.setProperty("--fill", `${pct}%`);
}
