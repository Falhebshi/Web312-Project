"use strict";

/* =============================
     SIMPLE HEADER MENU
   ============================= */
function setupHeader() {
  const header = document.querySelector("header");
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navigation_bar");

  if (!header || !menuBtn || !nav) return;

  menuBtn.onclick = function () {
    let open = header.classList.toggle("nav-open");
    menuBtn.setAttribute("aria-expanded", open ? "true" : "false");
  };

  nav.onclick = function (e) {
    if (e.target.tagName === "A") {
      header.classList.remove("nav-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  };
}


// ===============================
//        SERVICES SORTING
// ===============================
let container;
let cards = [];
let select;

function sorting() {
  container = document.getElementById("ServicesPageContainer");
  let services = document.getElementsByClassName("service_card");

  // put cards in array
  cards = [];
  for (let i = 0; i < services.length; i++) {
    cards.push(services[i]);
  }

  // dropdown
  select = document.getElementById("sortSelect");

  // when user selects an option
  select.onchange = sortServices;
}

function getPrice(card) {
  let priceText = card.querySelector(".price").textContent.trim();
  return Number(priceText); // now works because digits are English
}

function getName(card) {
  return card.querySelector(".service_title").textContent.trim();
}

function redraw(list) {
  container.innerHTML = "";
  for (let i = 0; i < list.length; i++) {
    container.appendChild(list[i]);
  }
}

function sortServices() {
  let value = select.value;
  let sorted = cards.slice();

  if (value === "price-asc") {
    sorted.sort((a, b) => getPrice(a) - getPrice(b));
  }
  else if (value === "price-desc") {
    sorted.sort((a, b) => getPrice(b) - getPrice(a));
  }
  else if (value === "name-asc") {
    sorted.sort((a, b) => getName(a).localeCompare(getName(b), "ar"));
  }
  else if (value === "name-desc") {
    sorted.sort((a, b) => getName(b).localeCompare(getName(a), "ar"));
  }

  redraw(sorted);
}

// run after page loads
window.onload = function() {
  setupHeader();
  sorting();
};



