"use strict";
console.log("JS FILE LOADED SUCCESSFULLY");
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
  console.log("sorting ran");
console.log(select);
console.log(cards);
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
document.addEventListener("DOMContentLoaded", function () {
  setupHeader();

  if (document.getElementById("sortSelect")) {
    sorting();
  }
});

// ===============================
//       FAVORITE BUTTONS
// ===============================
//in favorites page
document.addEventListener("DOMContentLoaded", function() {
  const container = document.querySelector("#favorite-events");
  let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

  if (favorites.length === 0) {
    container.innerHTML += "<p style='text-align:center'>لا توجد فعاليات مفضلة بعد</p>";
    return;
  }

  favorites.forEach(item => {
    const card = document.createElement("div");
    card.classList.add("favorite_card");
    card.innerHTML = `
      <button class="fav-btn active"><span class="heart"></span></button>
      <img src="${item.img}" alt="${item.title}" class="event_image">
      <div class="event_details">
        <h3 class="event_title">${item.title}</h3>
        <p>${item.description}</p>
        <p>السعر: <span class="price">${item.price}</span></p>
      </div>
    `;
    container.appendChild(card);
  });

  container.addEventListener("click", function(e) {
    if (e.target.closest(".fav-btn")) {
      const btn = e.target.closest(".fav-btn");
      const card = btn.closest(".favorite_card");
      const title = card.querySelector(".event_title").textContent.trim();

      favorites = favorites.filter(item => item.title !== title);
      localStorage.setItem("favorites", JSON.stringify(favorites));

      card.remove();

      if (favorites.length === 0) {
        container.innerHTML = "<p style='text-align:center'>لا توجد فعاليات مفضلة بعد</p>";
      }
    }
  });
});

//in services page
    document.addEventListener("DOMContentLoaded", function() {
    const favButtons = document.querySelectorAll(".fav-btn");
    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    favButtons.forEach(btn => {
     const card = btn.closest(".service_card");
     const title = card.querySelector(".service_title").textContent.trim();

      const isFavorite = favorites.some(item => item.title === title);
      if (isFavorite) {
        btn.classList.add("active");
      }

      btn.addEventListener("click", function() {
      btn.classList.toggle("active");

      const description = card.querySelector(".service_description-services").textContent.trim();
      const price = card.querySelector(".price").textContent.trim();
      const img = card.querySelector(".service_image").getAttribute("src");

      if (btn.classList.contains("active")) {
        const exists = favorites.some(item => item.title === title);
        if (!exists) favorites.push({ title, description, price, img });
      } else {
        favorites = favorites.filter(item => item.title !== title);
      }

      localStorage.setItem("favorites", JSON.stringify(favorites));
     });
    });
  });

// ===============================
//      REAL-TIME CLOCK
// ===============================
  function updateClock() {
    const now = new Date();

    // تنسيق الوقت بالعربية
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };

    const timeString = now.toLocaleTimeString('ar-SA', options);

    // عرضها داخل الفوتر
    document.getElementById("realTimeClock").textContent = "الوقت الآن: " + timeString;
}

// تحديث الساعة كل ثانية
setInterval(updateClock, 1000);

// تشغيلها بمجرد تحميل الصفحة
updateClock();

let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  scrollFunction();
};

function scrollFunction() {
  if (document.body.scrollTop > 90 || document.documentElement.scrollTop > 90) {
    mybutton.style.display = "block";
  } else {
    mybutton.style.display = "none";
  }
}

function topFunction() {
  document.body.scrollTop = 0;
  document.documentElement.scrollTop = 0;
}
