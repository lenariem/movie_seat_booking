const btn = document.getElementById("mode");
const container = document.querySelector(".container");
const seats = document.querySelectorAll(".row .seat:not(.occupied)");
const count = document.getElementById("count");
const total = document.getElementById("total");
const clearBtn = document.getElementById("clearBtn");
const movieSelect = document.getElementById("movie");

populateUI();

let ticketPrice = +movieSelect.value;

// Dark/Light mode
function toggleMode() {
  const element = document.body;
  element.classList.toggle("light-mode");
  localStorage.setItem("theme", element.classList);
}

btn.addEventListener("click", toggleMode);

//Save selected movie and price to LocalStorage
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

//Update total and count
function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  //console.log("selected seats: " + selectedSeats.forEach(item => console.log(item)));

  const seatsIndex = [...selectedSeats].map(seat => [...seats].indexOf(seat));

  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndex));

  const selectedSeatsCount = selectedSeats.length;

  count.innerText = selectedSeatsCount;
  total.innerText = selectedSeatsCount * ticketPrice;

  setMovieData(movie.selectedIndex, movieSelect.value);
}

//Get data from Local Storage and populate UI
function populateUI() {
  //Dark/light mode
  const theme = localStorage.getItem("theme");
  if (theme === "light-mode") {
    document.body.classList.toggle("light-mode");
  }

  //JSON.parse will make back array from string
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));

  if (selectedSeats !== null && selectedSeats.length > 0) {
    seats.forEach((seat, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");

  if (selectedMovieIndex !== null) {
    movieSelect.selectedIndex = selectedMovieIndex;
  }
}

//Movie select event
movieSelect.addEventListener("change", e => {
  ticketPrice = +e.target.value;
  setMovieData(e.target.selectedIndex, e.target.value);
  updateSelectedCount();
});

//Set row for title
function setRow(element, min, max, row) {
  if (+element.innerHTML >= min && +element.innerHTML <= max) {
    return element.setAttribute("data-row", row);
  }
}

//Dynamic title of seats
container.addEventListener("mousemove", e => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    setRow(e.target, 1, 8, "1");
    setRow(e.target, 9, 16, "2");
    setRow(e.target, 17, 24, "3");
    setRow(e.target, 25, 32, "4");
    setRow(e.target, 33, 40, "5");
    setRow(e.target, 41, 48, "6");

    e.target.setAttribute("title",`seat ${e.target.innerHTML} row ${e.target.dataset.row}`);
  }
});

//Seat click event
container.addEventListener("click", e => {
  if (e.target.classList.contains("seat") && !e.target.classList.contains("occupied")) {
    e.target.classList.toggle("selected");

    updateSelectedCount();
  }
});

//Initial count and total set
updateSelectedCount();

//Clear local storage
clearBtn.addEventListener("click", () => {
  
  for(let i=0; i<localStorage.length; i++) {
    if( localStorage.key(i).search("theme") === -1 ) {
        localStorage.removeItem(localStorage.key(i))
    }
  }
    
  /* localStorage.removeItem("selectedMovieIndex");
  localStorage.removeItem("selectedMoviePrice");
  localStorage.removeItem("selectedSeats"); */
    
  //localStorage.clear();
  location.reload();
});
