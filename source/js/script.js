const html = document.querySelector("html");
const headerContainer = document.querySelector(".main-header");
const headerButtonMenu = document.querySelector(".main-header__button");
const modalOpenLinks = document.querySelectorAll(".modal-link");
const modalOverlay = document.querySelector(".modal");
const modalContainer = document.querySelector(".modal__container");

const openMainMenu = () => {
  headerContainer.classList.toggle("is-open");
};

const openModal = (event) => {
  event.preventDefault();
  modalOverlay.classList.add("is-open");

  modalOverlay.addEventListener("click", closeModal);
};

const closeModal = () => {
  modalOverlay.classList.remove("is-open");
  modalOverlay.removeEventListener("click", closeModal);
};

if (html.classList.contains("no-js")) {
  html.classList.remove("no-js");
}

headerButtonMenu.addEventListener("click", openMainMenu);

modalOpenLinks.forEach((button) => button.addEventListener("click", openModal));
