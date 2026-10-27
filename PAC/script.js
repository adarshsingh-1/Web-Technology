
const searchInput = document.getElementById("searchDestination");
const destinationItems = document.querySelectorAll(".destination-item");
const noResults = document.getElementById("noResults");
searchInput.addEventListener("input", function () {
    const searchValue = this.value.toLowerCase().trim();
    let found = 0;
    destinationItems.forEach(function (item) {
        const destinationName = item.dataset.name;
        if (destinationName.includes(searchValue)) {
            item.style.display = "grid";
            found++;
        } else {
            item.style.display = "none";
        }
    });
    noResults.style.display = found === 0 ? "block" : "none";
});
const filterButton = document.getElementById("filterButton");
filterButton.addEventListener("click", function () {
    const items = Array.from(destinationItems);
    items.sort(function (a, b) {
        return a.dataset.name.localeCompare(b.dataset.name);
    });
    const destinationList = document.getElementById("destinationList");
    items.forEach(function (item) {
        destinationList.appendChild(item);
    });
});
document.getElementById("exploreButton").addEventListener("click", function () {
    document.querySelector(".best-destination").scrollIntoView({
        behavior: "smooth"
    });
});
const calendarGrid = document.getElementById("calendarGrid");
const calendarMonth = document.getElementById("calendarMonth");
const previousButton = document.getElementById("prevMonth");
const nextButton = document.getElementById("nextMonth");
let currentDate = new Date();
let selectedDate = new Date(
    currentDate.getFullYear(),
    currentDate.getMonth(),
    currentDate.getDate()
);
function displayCalendar() {
    calendarGrid.innerHTML = "";
    const weekdays = ["Mo", "Tu", "We", "Th", "Fr", "Sa", "Su"];
    weekdays.forEach(function (day) {
        const weekday = document.createElement("div");
        weekday.className = "weekday";
        weekday.textContent = day;
        calendarGrid.appendChild(weekday);
    });
    const year = currentDate.getFullYear();
    const month = currentDate.getMonth();
    calendarMonth.textContent = currentDate.toLocaleDateString("en-US",{ month: "long", year: "numeric" }
    );
    const firstDay = new Date(year, month, 1);
    let startingDay = firstDay.getDay();
    startingDay = (startingDay + 6) % 7;
    const totalDays = new Date(year, month + 1, 0).getDate();
    const previousMonthDays = new Date(year, month, 0).getDate();
    for (let i = 0; i < startingDay; i++) {
        const day = document.createElement("div");
        day.className = "date muted";
        day.textContent = previousMonthDays - startingDay + i + 1;
        calendarGrid.appendChild(day);
    }
    for (let dayNumber = 1; dayNumber <= totalDays; dayNumber++) {
        const day = document.createElement("div");
        day.className = "date";
        day.textContent = dayNumber;
        const thisDate = new Date(year, month, dayNumber);
        if (
            thisDate.getFullYear() === selectedDate.getFullYear() &&
            thisDate.getMonth() === selectedDate.getMonth() &&
            thisDate.getDate() === selectedDate.getDate()
        ) {
            day.classList.add("selected");
        }
        day.addEventListener("click", function () {
            selectedDate = new Date(year, month, dayNumber);
            displayCalendar();
        });
        calendarGrid.appendChild(day);
    }
    const totalCells = calendarGrid.children.length - 7;
    const remainingCells = (7 - totalCells % 7) % 7;
    for (let i = 1; i <= remainingCells; i++) {
        const day = document.createElement("div");
        day.className = "date muted";
        day.textContent = i;
        calendarGrid.appendChild(day);
    }
}
previousButton.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() - 1);
    displayCalendar();
});
nextButton.addEventListener("click", function () {
    currentDate.setMonth(currentDate.getMonth() + 1);
    displayCalendar();
});
displayCalendar();
const navLinks = document.querySelectorAll(".nav-link");
navLinks.forEach(function (link) {
    link.addEventListener("click", function () {
        navLinks.forEach(function (item) {
            item.classList.remove("active");
        });
        this.classList.add("active");
    });
});
