const headerContainer = document.querySelector(".main-header");
const headerButtonMenu = document.querySelector(".main-header__button");

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

headerButtonMenu.addEventListener("click", openMainMenu);
