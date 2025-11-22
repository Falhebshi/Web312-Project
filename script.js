"use strict";

document.addEventListener("DOMContentLoaded", function () {
  const header = document.querySelector("header");
  const menuBtn = document.querySelector(".menu-toggle");
  const nav = document.querySelector(".navigation_bar");

  if (!header || !menuBtn || !nav) return;

  menuBtn.addEventListener("click", function () {
    const isOpen = header.classList.toggle("nav-open");
    // Update aria-expanded for accessibility
    menuBtn.setAttribute("aria-expanded", isOpen ? "true" : "false");
  });

  // Optional: close menu when a link is clicked (on phones)
  nav.addEventListener("click", function (e) {
    if (e.target.tagName === "A") {
      header.classList.remove("nav-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  }); //redo this to be simpler syntax -Fatimah
});

document.getElementById

//====== Services Sorting =======
function sorting() {
  container = document.getElementById("ServicesPageContainer");
  let services = document.getElementsByClassName("service_card");

    var cards = [];
    for (var i = 0; i < cardElements.length; i++) {
      cards.push(services[i]);
    }

    select = document.getElementById("sortSelect");

    select.onchange = sortServices();

// ------Helper functions------

  function getPrice(card) {
        var priceElement = card.querySelector(".price");
        return Number(priceElement.getAttribute("data-price"));
    }

    function getName(card) {
        var titleElement = card.querySelector(".service_title");
        return titleElement.textContent.trim();
    }

    // Run when user changes the dropdown
    function sortServices() {
        var value = select.value;
        var sorted = cards.slice(); // work on a copy

        if (value === "price-asc") {
            sorted.sort(function (a, b) {
                return getPrice(a) - getPrice(b);
            });
        }
        else if (value === "price-desc") {
            sorted.sort(function (a, b) {
                return getPrice(b) - getPrice(a);
            });
        }
        else if (value === "name-asc") {
            sorted.sort(function (a, b) {
                return getName(a).localeCompare(getName(b), "ar");
            });
        }
        else if (value === "name-desc") {
            sorted.sort(function (a, b) {
                return getName(b).localeCompare(getName(a), "ar");
            });
        }
        else {
            // User selected "no sorting" → show original HTML order
            sorted = cards;
        }

        redraw(sorted);
    }
}



function sortServices() {
   let value = select.value;
   let sortedCards = cards.slice();
}