const modalOpenLinks = document.querySelectorAll(".modal-link");
const modalContainer = document.querySelector(".modal");
const modalOverlay = document.querySelector(".modal__overlay");

const onDocumentKeydown = (evt) => {
  if (evt.key === "Escape") {
    closeModal();
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

modalOpenLinks.forEach((button) => button.addEventListener("click", openModal));
