const update = () => {
  const date = new Date();
  document.getElementById("time").innerText = date.toLocaleTimeString();
};
setInterval(update, 1000);
// toggle

const toggle = (state1, state2) => {
  document.getElementById("dashboard-profile").style.display = state1;
  document.getElementById("main-container").style.display = state2;
};
// button here
// for open menu
document
  .querySelector(".fa-bars-staggered")
  .addEventListener("click", () => toggle("block", "none"));

// for close menu
document
  .querySelector(".fa-times")
  .addEventListener("click", () => toggle("none", "block"));
