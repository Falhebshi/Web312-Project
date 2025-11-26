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
  //if container not found, exit
    if (!container) return;

    let favorites = JSON.parse(localStorage.getItem("favorites")) || [];

    if (favorites.length === 0) {
        container.innerHTML = "<p style='text-align:center'>لا توجد فعاليات مفضلة بعد</p>";
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

    // format the time in Arabic
    const options = {
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit'
    };
    const timeString = now.toLocaleTimeString('ar-SA', options);
    document.getElementById("realTimeClock").textContent = "الوقت الآن: " + timeString;
}

// update every second
setInterval(updateClock, 1000);

updateClock();

let mybutton = document.getElementById("myBtn");

window.onscroll = function () {
  if (mybutton) {
  scrollFunction();
}
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

// ===============================
//       STAR RATING
// ===============================
const stars = document.querySelectorAll("#starRating .star");
let rating = 0;        
let lastClickedIndex = 0;
let clickCount = 0;

stars.forEach(star => {
  star.addEventListener("click", function () {
    const index = parseInt(this.dataset.index);

    if (index === lastClickedIndex) {
      clickCount++;   // clicking the same star again
    } else {
      clickCount = 1; // new star clicked
    }

    // first click = half star
    if (clickCount === 1) {
      rating = index - 0.5;
    }

    // second click = full star
    if (clickCount === 2) {
      rating = index;
      clickCount = 0; // reset click count
    }

    lastClickedIndex = index;

    updateStars();
  });
});

function updateStars() {
  stars.forEach(star => {
    const idx = parseInt(star.dataset.index);

    if (idx < rating) {
      star.src = "images/fillystar.png"; // full
    } else if (idx === Math.ceil(rating) && rating % 1 !== 0) {
      star.src = "images/halfgstar.png"; // half
    } else if (idx === rating) {
      star.src = "images/fillystar.png"; // current star full
    } else {
      star.src = "images/graystar.png"; // empty
    }
  });

  document.getElementById("ratingValue").value = rating;
}

// ========== Validate Evaluate Service Form ==========
const evalForm = document.querySelector(".evaluation-form");

if (evalForm) {
    evalForm.addEventListener("submit", function (e) {
        e.preventDefault();

        const selectedEvent = document.getElementById("event").value;
        const feedback = document.getElementById("feedback").value.trim();

        if (selectedEvent === "") {
            alert("الرجاء اختيار الفعالية.");
            return;
        }

        if (rating === 0) {
            alert("الرجاء إضافة تقييم.");
            return;
        }

        if (feedback.length < 1) {
            alert("الرجاء كتابة تعليقك.");
            return;
        }

        if (rating >= 3) {
            alert("شكرًا لك! سعدنا برأيك.");
        } else {
            alert("نعتذر لعدم رضاك، سنعمل على تحسين خدماتنا.");
        }

        window.location.href = "customer.html";
    });
}

// ===================== Request a Service Validation =====================
// Select the form
const requestForm = document.querySelector(".request-form");

// Only run validation if the form exists on the page
if (requestForm) {

// Listen for submit action
requestForm.addEventListener("submit", function (e) {
    e.preventDefault(); // Prevent form submission before validation

    // Get form inputs
    const eventSelected = document.getElementById("event").value;
    const username = document.getElementById("username").value.trim();
    const date = document.getElementById("date").value;
    const description = document.getElementById("description").value.trim();

    // ===== Validate Event Selection =====
    if (eventSelected === "") {
        alert("الرجاء اختيار فعالية.");
        return;
    }

    // ===== Validate Customer Name =====
    const nameParts = username.split(" ");

    if (nameParts.length < 2) {
        alert("الرجاء كتابة الاسم الكامل (اسم + اسم عائلة).");
        return;
    }

    if (!/^[A-Za-z\u0600-\u06FF\s]+$/.test(username)) {
        // Regex: Arabic letters only
        alert("الاسم يجب أن يحتوي على حروف فقط بدون أرقام أو رموز.");
        return;
    }

   // ===== Validate Date =====

// today's date (starting 0:00)
const today = new Date();
today.setHours(0,0,0,0);

// selected date
const selectedDate = new Date(date);
selectedDate.setHours(0,0,0,0);

// CALCULATE minimum allowed date = today + 2 days
const minAllowed = new Date();
minAllowed.setDate(minAllowed.getDate() + 2);
minAllowed.setHours(0,0,0,0);

// If selected date is before today (past date)
if (selectedDate < today) {
    alert("لا يمكن اختيار تاريخ سابق لليوم.");
    return;
}

// If selected date is less than 2 days ahead
if (selectedDate < minAllowed) {
    alert("تاريخ الفعالية قريب جدًا! الرجاء اختيار تاريخ بعد يومين على الأقل.");
    return;
}

    // ===== Validate Description =====
    if (description.length < 100) {
        alert("وصف الطلب قصير جدًا. يجب أن يكون أكثر من 100 حرف.");
        return;
    }
    // Save request always before asking user
    saveRequest(eventSelected, username, date, description);
    // If everything is valid 
    const stay = confirm("تم إرسال الطلب بنجاح! هل ترغب في البقاء في الصفحة؟");

    if (stay) {
      requestForm.reset();
      // Clear arabic date display
      const arabicDate = document.getElementById("arabicDate");
      if (arabicDate) arabicDate.textContent = "اليوم / الشهر / السنة";
        displayRequest(eventSelected, username, date, description);
        return;

    } else {
        window.location.href = "customer.html";
    }
});
}

// ===================== Display request info on page =====================

// This function adds the request to the page dynamically
function displayRequest(eventName, username, date, description) {
    // Create container if not exists
    let listContainer = document.getElementById("requestList");

    if (!listContainer) {
        listContainer = document.createElement("div");
        listContainer.id = "requestList";
        listContainer.style.marginTop = "30px";
        listContainer.style.padding = "15px";
        listContainer.style.border = "2px solid #b07a28";
        listContainer.style.borderRadius = "10px";
        listContainer.style.backgroundColor = "#f9f4ee";
        document.querySelector(".request-section").appendChild(listContainer);
    }

    // Add request block
    const block = document.createElement("div");
    block.style.marginBottom = "15px";
    block.style.padding = "10px 15px";
    block.style.borderBottom = "1px solid #ccc";

    block.innerHTML = `
      <p><strong>الفعالية:</strong> ${eventName}</p>
      <p><strong>اسم العميل:</strong> ${username}</p>
      <p><strong>تاريخ الفعالية:</strong> ${date}</p>
      <p><strong>وصف الطلب:</strong> ${description}</p>
    `;

    listContainer.appendChild(block);
}

// ==========================
//   EVENTS INFO FROM SERVICES
// ==========================
function getServiceDetails(name) {

    const services = [
        { title: "رحلة منطاد العلا", price: "180", img: "images/img-airballoon.png" },
        { title: "ورشة فخار", price: "250", img: "images/pottery_image.jpg" },
        { title: "التزلج الهوائي", price: "400", img: "images/parasailing_image.jpg" },
        { title: "ورشة الخوص", price: "180", img: "images/ws.jpeg" },
        { title: "صناعة العطور العربية", price: "300", img: "images/perfume.jpeg" },
        { title: "ورشة السدو", price: "210", img: "images/sdo.jpeg" },
        { title: "ورشة الطهي الشعبي", price: "180", img: "images/food.jpeg" },
        { title: "ركوب الخيل", price: "350", img: "images/horses.jpeg" },
        { title: "المسار الرياضي", price: "160", img: "images/masar.jpeg" }
    ];

    return services.find(s => s.title === name) || {
        price: "غير معروف",
        img: "images/default.jpg"
    };
}

// ==========================
//       SAVE REQUEST
// ==========================
function saveRequest(eventName, username, date, description) {

    // Get service details
    const service = getServiceDetails(eventName);

    let reqs = JSON.parse(localStorage.getItem("requests")) || [];

    reqs.push({
        eventName,
        username,
        date,
        description,
        price: service.price,
        img: service.img,
        status: "مكتملة"
    });

    localStorage.setItem("requests", JSON.stringify(reqs));
}

// ==========================
//   LOAD PREVIOUS REQUESTS
// ==========================
document.addEventListener("DOMContentLoaded", function () {

    const section = document.getElementById("previous-events");
    if (!section) return; 

    const list = section.querySelector(".event-list"); 
    if (!list) return;

    let reqs = JSON.parse(localStorage.getItem("requests")) || [];

    if (reqs.length === 0) return;

    reqs.forEach(req => {
        const serviceInfo = getServiceDetails(req.eventName);

        const li = document.createElement("li");
        li.classList.add("event_card");

        li.innerHTML = `
            <img src="${serviceInfo.img}" class="event_image">

            <div class="event_details">
                <h3 class="event_title">${req.eventName}</h3>

                <p>التاريخ: ${formatArabicDate(req.date)}</p>
                <p>السعر: <span class="price">${serviceInfo.price}</span></p>
                <p>الحالة: مكتملة</p>
            </div>
        `;

        list.appendChild(li);
    });
});

// ==========================
//   FORMAT DATE TO ARABIC
// ==========================
function formatArabicDate(dateStr) {
    if (!dateStr) return "";

    const [year, month, day] = dateStr.split("-");

    // convert digits to Arabic
    const arabicNums = d => d.replace(/\d/g, n => "٠١٢٣٤٥٦٧٨٩"[n]);

    return `${arabicNums(day)} / ${arabicNums(month)} / ${arabicNums(year)}`;
}

//add events to evaluation form
document.addEventListener("DOMContentLoaded", function () {

    //check if we are in evaluation page
    const evalSelect = document.querySelector(".evaluation-form select#event");
    if (!evalSelect) return;  

    // get previous requests
    let reqs = JSON.parse(localStorage.getItem("requests")) || [];

    if (reqs.length === 0) return;

    //add options
    reqs.forEach(req => {
        const option = document.createElement("option");
        option.value = req.eventName;
        option.textContent = req.eventName;
        evalSelect.appendChild(option);
    });

});

// ===============================
//      ARABIC DATE FORMAT
// ===============================
// Convert English digits to Arabic digits
function toArabicNumbers(str) {
  return str.replace(/\d/g, d => "٠١٢٣٤٥٦٧٨٩"[d]);
}

// Show Arabic formatted date when user selects a date
document.addEventListener("DOMContentLoaded", () => {
  const dateInput = document.getElementById("date");
  const arabicDate = document.getElementById("arabicDate");

  if (!dateInput || !arabicDate) return;

  dateInput.addEventListener("change", () => {
    const dateValue = dateInput.value;
    if (dateValue) {
      const [year, month, day] = dateValue.split("-");

      const formatted = `${toArabicNumbers(day)} / ${toArabicNumbers(month)} / ${toArabicNumbers(year)}`;

      arabicDate.textContent = "التاريخ بالأرقام العربية: "+ formatted;
    } else {
      arabicDate.textContent = "اليوم / الشهر / السنة";
    }
  });
});

// ===============================
//      SIMPLE DARK MODE
// ===============================

// Apply dark mode immediately (before page loads)
(function() {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.documentElement.classList.add("dark-mode");
    document.body.classList.add("dark-mode");
  }
})();

// Also check when DOM is ready
document.addEventListener("DOMContentLoaded", function() {
  if (localStorage.getItem("darkMode") === "enabled") {
    document.body.classList.add("dark-mode");
  }
});

// Toggle dark mode function
function toggleDarkMode() {
  document.body.classList.toggle("dark-mode");
  
  // Save to localStorage
  if (document.body.classList.contains("dark-mode")) {
    localStorage.setItem("darkMode", "enabled");
  } else {
    localStorage.setItem("darkMode", "disabled");
  }
}