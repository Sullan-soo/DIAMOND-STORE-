const pages = {
  home: document.getElementById("homePage"),
  payment: document.getElementById("paymentPage"),
  success: document.getElementById("successPage")
};

const selectedName = document.getElementById("selectedName");
const selectedAmount = document.getElementById("selectedAmount");
const upiButton = document.getElementById("upiButton");
const successText = document.getElementById("successText");

let order = { name: "MONTHLY", amount: 200 };

function show(page){
  Object.values(pages).forEach(p => p.classList.remove("active"));
  pages[page].classList.add("active");
  window.scrollTo({top:0, behavior:"smooth"});
}

function setOrder(name, amount){
  order = {name, amount};
  selectedName.textContent = name;
  selectedAmount.textContent = `₹${amount}`;

  // UPI intent. This opens a supported UPI app with the selected amount.
  const params = new URLSearchParams({
    pa: "jothivel@fam",
    pn: "M JOTHIVEL",
    am: String(amount),
    cu: "INR",
    tn: `DIAMOND TOP-UP - ${name}`
  });
  upiButton.href = `upi://pay?${params.toString()}`;
}

document.querySelectorAll(".price-card").forEach(card => {
  card.addEventListener("click", () => {
    setOrder(card.dataset.name, Number(card.dataset.amount));
    show("payment");
  });
});

document.getElementById("backBtn").addEventListener("click", () => show("home"));

document.getElementById("confirmBtn").addEventListener("click", () => {
  successText.textContent =
    `₹${order.amount} for ${order.name} was submitted for confirmation.`;
  show("success");
});

document.getElementById("homeBtn").addEventListener("click", () => show("home"));

setOrder("MONTHLY", 200);
