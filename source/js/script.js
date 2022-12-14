"use strict";

const headerContainer = document.querySelector(".main-header");
const headerButtonMenu = document.querySelector(".main-header__button");
const popularButton = document.querySelector(".popular__link");
const basketButtons = document.querySelectorAll(".catalog__link-basket");
const modalOverlay = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal__container");

if (headerContainer.classList.contains("is-open")) {
  headerContainer.classList.remove("is-open");
}

if (popularButton) {
  popularButton.addEventListener("click", openModal);
}

if (basketButtons.length !== 0) {
  for (const button of basketButtons) {
    button.addEventListener("click", openModal);
  }
}

headerButtonMenu.addEventListener("click", openMainMenu);

function addEventForCloseElement() {
  document.addEventListener("click", closeElement);
  document.addEventListener("keydown", closeElementEsc);
}

function removeEventForCloseElement() {
  document.removeEventListener("click", closeElement);
  document.removeEventListener("keydown", closeElementEsc);
}

function openMainMenu() {
  headerContainer.classList.toggle("is-open");

  addEventForCloseElement();
}

function openModal(event) {
  event.preventDefault();
  modalOverlay.classList.add("is-open");

  addEventForCloseElement();
}

function closeElement(event) {
  const withinMainMenu = event.composedPath().includes(headerContainer);
  const withinPopularButton = event.composedPath().includes(popularButton);
  const withinModalContainer = event.composedPath().includes(modalContainer);

  let searchBasketButton = function () {
    for (let i = 0; i < basketButtons.length; i++) {
      const withinBasketButton = event
        .composedPath()
        .includes(basketButtons[i]);

      if (withinBasketButton) return withinBasketButton;
    }
  };

  if (!withinMainMenu) {
    headerContainer.classList.remove("is-open");
  }

  if (!withinPopularButton && !withinModalContainer && !searchBasketButton()) {
    modalOverlay.classList.remove("is-open");
  }

  if (
    !withinPopularButton &&
    !withinModalContainer &&
    !withinMainMenu &&
    !searchBasketButton()
  ) {
    removeEventForCloseElement();
  }
}

function closeElementEsc(event) {
  if (event.keyCode == 27) {
    headerContainer.classList.remove("is-open");
    modalOverlay.classList.remove("is-open");

    removeEventForCloseElement();
  }
}
