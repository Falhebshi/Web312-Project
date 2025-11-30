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
      //check if we are in services page
      if (!document.querySelector("#ServicesPageContainer")) return;
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

        const eventSelect = document.getElementById("event");
        const feedbackInput = document.getElementById("feedback");
        const starBox = document.getElementById("starRating");

        // Remove previous error styles
        eventSelect.classList.remove("input-error");
        feedbackInput.classList.remove("input-error");
        starBox.classList.remove("input-error");

        let errors = [];  // to collect error messages

        // check service
        if (eventSelect.value === "") {
            eventSelect.classList.add("input-error");
            errors.push("الرجاء اختيار الفعالية.");
        }

        // check rating
        if (rating === 0) {
            starBox.classList.add("input-error");
            errors.push("الرجاء إضافة تقييم.");
        }

        // check feedback
        if (feedbackInput.value.trim().length < 1) {
            feedbackInput.classList.add("input-error");
            errors.push("الرجاء كتابة تعليقك.");
        }

        // Display errors if any
        if (errors.length > 0) {
            alert(errors.join("\n")); 
            return;
        }

        // All good
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
        alert("الرجاء كتابة الاسم الكامل (الاسم + اسم العائلة).");
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
    saveRequest(eventSelected);
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
//       SAVE REQUEST
// ==========================
function saveRequest(eventName) {
    // Increment service counter
   let counters = JSON.parse(localStorage.getItem("serviceCounters")) || {};
    if (!counters[eventName]) {
        counters[eventName] = 0;
    }
    counters[eventName]++;
    localStorage.setItem("serviceCounters", JSON.stringify(counters)); 
}

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
//       DARK MODE TOGGLE
// ===============================
// Apply saved theme immediately
(function() {
  const theme = localStorage.getItem("theme") || "light";
  document.body.classList.add(theme + "-mode");
})();

// Toggle between 3 themes
function toggleDarkMode() {
  const body = document.body;
  const currentTheme = getCurrentTheme();
  
  // Remove all theme classes
  body.classList.remove("light-mode", "dark-mode", "blue-mode");
  
  // Cycle through themes: light → blue → dark → light
  let newTheme;
  if (currentTheme === "light") {
    newTheme = "blue";
  } else if (currentTheme === "blue") {
    newTheme = "dark";
  } else {
    newTheme = "light";
  }
  
  body.classList.add(newTheme + "-mode");
  localStorage.setItem("theme", newTheme);
  
  updateThemeIcon(newTheme);
}

// Get current theme
function getCurrentTheme() {
  if (document.body.classList.contains("dark-mode")) return "dark";
  if (document.body.classList.contains("blue-mode")) return "blue";
  return "light";
}

// Update theme button icon
function updateThemeIcon(theme) {
  const themeBtn = document.getElementById("themeBtn");
  if (!themeBtn) return;
  
  const icon = themeBtn.querySelector("img");

  
  
  if (theme === "light") {
    icon.src = "images/light theme.png"; // Moon for light mode
  } else if (theme === "blue") {
    icon.src = "images/dark theme.png"; // Sun for blue mode 
  } else {
    icon.src = "images/Biege theme.png"; // Sun for dark mode
  }
}

// Initialize icon on page load
document.addEventListener("DOMContentLoaded", function() {
  const theme = getCurrentTheme();
  updateThemeIcon(theme);
});

/* =========================================================
   SERVICE COUNTERS SYSTEM (English Numbers Only)
   ========================================================= */

// Load counters from localStorage 
function getServiceCounters() {
    return JSON.parse(localStorage.getItem("serviceCounters")) || {};
}

function saveServiceCounters(obj) {
    localStorage.setItem("serviceCounters", JSON.stringify(obj));
}

/* =========================================================
     SHOW COUNTERS ON SERVICES PAGE IN ENGLISH NUMBERS
   ========================================================= */
function applyServiceCounters() {
    const cards = document.querySelectorAll(".service_card");
    let counters = getServiceCounters();

    cards.forEach(card => {
        const title = card.querySelector(".service_title").textContent.trim();
        const counterBox = card.querySelector(".counter-container .count");

        if (counterBox) {
            let count = counters[title] || 0;
            counterBox.textContent = count; // English digits only
        }
    });

    highlightTopThree();
}

/* =========================================================
     HIGHLIGHT TOP 3 MOST REQUESTED SERVICES
   ========================================================= */
function highlightTopThree() {
    const cards = document.querySelectorAll(".service_card");
    let counters = getServiceCounters();

    // Convert to array → sort by highest count
    let sorted = Object.entries(counters)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 3);

    // Names of the top 3 services
    let topThree = sorted.map(entry => entry[0]);

    cards.forEach(card => {
        const title = card.querySelector(".service_title").textContent.trim();
        const counterContainer = card.querySelector(".counter-container");

        // Remove old viral flames
        counterContainer.classList.remove("viral");

        // Add flame to top 3
        if (topThree.includes(title)) {
            counterContainer.classList.add("viral");
        }
    });
}

/* =========================================================
   RUN ONLY ON services.html
   ========================================================= */
document.addEventListener("DOMContentLoaded", function () {
    const isServicesPage = document.body.contains(
        document.querySelector("#ServicesPageContainer")
    );

    if (isServicesPage) {
        applyServiceCounters();
    }
});

//join us form
const form = document.querySelector(".join-us");
if (form) {
form.addEventListener("submit",function(e) {
 e.preventDefault();


    const nameField = document.getElementById("member-name");
    const emailField = document.getElementById("member-email");
    const dobField = document.getElementById("date-birth");
    const experField = document.getElementById("experties-member");
    const skillsField = document.getElementById("skills-member");
    const eduField = document.getElementById("education-member");
    const msgField = document.getElementById("message-member");
    const photoField = document.getElementById("service-photo");
  //no empty field
  if (
        nameField.value.trim() === "" ||
        emailField.value.trim() === "" ||
        dobField.value === "" ||
        experField.value.trim() === "" ||
        skillsField.value.trim() === "" ||
        eduField.value.trim() === "" ||
        msgField.value.trim() === "" ||
        !photoField.files.length
    ) {
        alert("الرجاء تعبة جميع الحقول!");
        return;
    }
    //name field does't start with numbers
    if (/^[0-9]/.test(nameField.value.trim())) {
        alert("الاسم لا يمكن أن يبدأ برقم!");
        return;
    }

    //Photo field accepts only image
    const photo = photoField.files[0];
     if (photo && !photo.type.startsWith("image/")) {
        alert("الرجاء رفع صورة فقط!");
        return;
    }

    //DOB should not be after 2008
    const maxDate = new Date("2008-12-31");
    const userDate = new Date(dobField.value);

    if (userDate > maxDate) {
        alert("تاريخ الميلاد يجب أن يكون قبل عام 2009! ");
        return;
    }
    alert("تم إرسال الطلب بنجاح ! شكراً لك يا "+ nameField.value);
    form.submit();

});
}
