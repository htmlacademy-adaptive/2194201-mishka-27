const html = document.querySelector("html");
const headerContainer = document.querySelector(".main-header");
const headerButtonMenu = document.querySelector(".main-header__button");
const modalOpenLinks = document.querySelectorAll(".modal-link");
const modalContainer = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal__overlay");

const openMainMenu = () => {
  headerContainer.classList.toggle("is-open");
};

const openModal = (event) => {
  event.preventDefault();
  modalContainer.classList.add("is-open");
  html.style.overflowY = "hidden";

  modalOverlay.addEventListener("click", closeModal);
};

const closeModal = () => {
  modalContainer.classList.remove("is-open");
  html.style.overflowY = null;

  modalOverlay.removeEventListener("click", closeModal);
};

if (html.classList.contains("no-js")) {
  html.classList.remove("no-js");
}

headerButtonMenu.addEventListener("click", openMainMenu);

modalOpenLinks.forEach((button) => button.addEventListener("click", openModal));
