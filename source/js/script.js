const html = document.querySelector("html");
const headerContainer = document.querySelector(".main-header");
const headerButtonMenu = document.querySelector(".main-header__button");
const modalOpenLinks = document.querySelectorAll(".modal-link");
const modalContainer = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal__overlay");

html.classList.remove("no-js");

const onDocumentKeydown = (evt) => {
  if (evt.key === "Escape") {
    closeModal();
  }
};

const openMainMenu = () => {
  headerContainer.classList.toggle("is-open");

  document.addEventListener("keydown", closeMainMenu);
  document.addEventListener("click", closeMainMenu);
};

const closeMainMenu = (evt) => {
  if (
    evt.key === "Escape" ||
    (!evt.target.closest(".main-header__button") &&
      !evt.target.closest(".main-header__navigation"))
  ) {
    headerContainer.classList.remove("is-open");

    document.removeEventListener("keydown", closeMainMenu);
    document.removeEventListener("click", closeMainMenu);
  }
};

const openModal = (evt) => {
  evt.preventDefault();
  modalContainer.classList.add("is-open");
  html.style.overflowY = "hidden";

  document.addEventListener("keydown", onDocumentKeydown);
  modalOverlay.addEventListener("click", closeModal);
};

const closeModal = () => {
  modalContainer.classList.remove("is-open");
  html.style.overflowY = null;

  document.removeEventListener("keydown", onDocumentKeydown);
  modalOverlay.removeEventListener("click", closeModal);
};

headerButtonMenu.addEventListener("click", openMainMenu);

modalOpenLinks.forEach((button) => button.addEventListener("click", openModal));
