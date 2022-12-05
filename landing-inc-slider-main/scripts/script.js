const entities = [
  {
    city: "Rostov-on-Don <br>LCD Admiral",
    area: "81 m2",
    time: "3.5 months",
    img: "./img/project-example1.png",
  },
  {
    city: "Sochi <br>Thieves",
    area: "105 m2",
    time: "4 months",
    img: "./img/project-example2.png",
  },
  {
    city: "Rostov-on-Don <br>Patriotic",
    area: "93 m2",
    time: "3 months",
    img: "./img/project-example3.png",
  },
];

let img = document.querySelectorAll(".js-projects-img");
let city = document.querySelectorAll(".js-table__item-city");
let area = document.querySelectorAll(".js-table__item-area");
let time = document.querySelectorAll(".js-table__item-time");
let leftArrow = document.querySelectorAll(".js-arrow-left");
let rightArrow = document.querySelectorAll(".js-arrow-right");
let currentIndex = 0;

setEntity = (index, mobile = 0) => {
  city[mobile].innerHTML = entities[index].city;
  area[mobile].innerHTML = entities[index].area;
  time[mobile].innerHTML = entities[index].time;
  img[mobile].style.backgroundImage = `url(${entities[index].img})`;
  return;
};
function leftArrowClick(data = 0) {
  currentIndex = currentIndex - 1 < 0 ? entities.length : currentIndex;
  currentIndex--;
  setEntity(currentIndex, data);
  moveSlider(currentIndex);
  moveExample(currentIndex);
  return currentIndex;
}
function rightArrowClick(data = 0) {
  currentIndex = currentIndex + 1 == entities.length ? -1 : currentIndex;
  currentIndex++;
  setEntity(currentIndex, data);
  moveSlider(currentIndex);
  moveExample(currentIndex);
  return currentIndex;
}

leftArrow[0].addEventListener("click", () => {
  leftArrowClick(0);
});
rightArrow[0].addEventListener("click", () => {
  rightArrowClick(0);
});

leftArrow[1].addEventListener("click", () => {
  leftArrowClick(1);
});
rightArrow[1].addEventListener("click", () => {
  rightArrowClick(1);
});

let nav = document.getElementById("slider-navigation");
let slides = document.getElementById("js-slides");

function initDots() {
  entities.forEach((img, index) => {
    let hiddenDot = document.createElement("input");
    hiddenDot.setAttribute("type", "radio");
    hiddenDot.setAttribute("name", "r");
    hiddenDot.setAttribute("id", `r${index}`);
    if (index === 0) {
      hiddenDot.setAttribute("checked", "true");
    }
    slides.insertAdjacentElement("beforeend", hiddenDot);
    let dot = document.createElement("label");
    dot.setAttribute("for", `r${index}`);
    dot.setAttribute(
      "class",
      index == 0 ? `slider-bar n${index} bar-active` : `slider-bar n${index}`
    );
    dot.setAttribute("data-index", `${index}`);
    nav.insertBefore(dot, rightArrow[0]);
  });
  nav.querySelectorAll(".slider-bar").forEach((dot) => {
    dot.addEventListener("click", function () {
      moveSlider(this.dataset.index);
      setEntity(this.dataset.index);
      moveExample(this.dataset.index);
      return (currentIndex = this.dataset.index);
    });
  });
}
function moveSlider(num) {
  nav.querySelector(".bar-active").classList.remove("bar-active");
  nav.querySelector(`.n${num}`).classList.add("bar-active");
}
initDots();

function moveExample(num) {
  let example = document.querySelector(".projects-example");
  example.querySelectorAll(".projects-link").forEach((data) => {
    data.classList.remove("projects-link-onclick");
  });
  example.querySelector(`.n${num}`).classList.add("projects-link-onclick");
}

let examples = document.querySelectorAll(".projects-example__item");
examples.forEach((data, index) => {
  data
    .querySelector(".projects-link")
    .setAttribute(
      "class",
      index == 0
        ? `link projects-link projects-link-onclick n${index}`
        : `link projects-link n${index}`
    );
  data.addEventListener("click", function (evt) {
    evt.preventDefault();
    moveSlider(index);
    setEntity(index);
    moveExample(index);
    return (currentIndex = index);
  });
});
