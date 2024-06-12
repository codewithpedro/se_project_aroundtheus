import Card from "../components/Card.js"
import FormValidator from "../components/FormValidator.js";

const initialCards = [
  {
  name: "Yosemite Valley",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/yosemite.jpg",
  },
  {
  name:"Lake Louise" ,
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lake-louise.jpg",
  },
  {
  name: "Bald Mountains" ,
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/bald-mountains.jpg",
  },
  {
  name: "Latemar",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/latemar.jpg",
  },
  {
  name: "Vanoise National Park",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/vanoise.jpg",
  },
  {
  name: "Lago di Braies",
  link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/around-project/lago.jpg",
  },
]


const closeButtons = document.querySelectorAll('.modal__close');

const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const profileModal = document.querySelector("#edit-modal");
const profileFormName = document.querySelector("#modal__name");
const profileFormDesc = document.querySelector("#modal__desc");
const profileForm = profileModal.querySelector(".modal__form")

const profileEditButton = document.querySelector(".profile__edit-button");

const cardModal = document.querySelector("#add-card-modal");
const cardsList = document.querySelector(".cards");
const cardForm = cardModal.querySelector(".modal__form");
const cardFormTitle = cardForm.querySelector(".modal__input_title");
const cardFormURL = cardForm.querySelector(".modal__input_url");

const cardAddButton = document.querySelector(".profile__add-button");

const cardsEl = document.querySelector(".cards");
//const cardTemplate = document.querySelector("#card-template").content.firstElementChild;
const cardTemplate = '#card-template';

const zoomModal = document.querySelector("#zoom-modal");
const zoomImageEl = zoomModal.querySelector(".modal__image");
const zoomSubtitleEl = zoomModal.querySelector(".modal__subtitle");

const modals = [...document.querySelectorAll('.modal')];


/* Validation */
const validationSettings =  {
  inputSelector: ".modal__input",
  submitButtonSelector: ".modal__button",
  inactiveButtonClass: "modal__button_disabled",
  inputErrorClass: "modal__input_type_error",
  errorClass: "modal__error_visible",
}

const editFormValidator = new FormValidator(validationSettings, profileForm);
const addFormValidator = new FormValidator(validationSettings, cardForm);

editFormValidator.enableValidation();
addFormValidator.enableValidation();

function handleImageClick(data){
    zoomImageEl.src = data._link;
    zoomImageEl.alt = data._name;
    zoomSubtitleEl.textContent = data._name;
    openModal(zoomModal);
}

initialCards.forEach(cardData => renderCard(cardData, cardsList));

function renderCard(cardData, list) {
  //const cardElement = getCardElement(cardData);
  const cardEl = new Card(cardData, cardTemplate, handleImageClick);
  list.prepend(cardEl.getView());
}

function openModal(modal){
  modal.classList.add("modal_opened");
  modal.addEventListener('keydown', handleEsc)
  modal.addEventListener('click', handleClick);

  modal.tabIndex = '-1'
  setTimeout(() => {
    modal.focus({focusVisible: true});
  }, 50);
}

function closeModal(modal){
  modal.removeEventListener('keydown', handleEsc);
  modal.removeEventListener('click', handleClick);
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(e, modal){
  e.preventDefault();
  profileTitle.textContent = profileFormName.value;
  profileDesc.textContent = profileFormDesc.value;
  closeModal(modal);
}

function handleCardFormSubmit(e, modal){
  e.preventDefault();
  const name = cardFormTitle.value;
  const link = cardFormURL.value;

  e.target.reset();

  renderCard({name, link}, cardsList);
  closeModal(modal);
}

function handleEsc(e) {
  if (e.key === "Escape") closeModal(e.target);
}

function handleClick(e){
  if (e.target.classList.contains("modal")) closeModal(e.target);
}

profileEditButton.addEventListener("click", () => {
  profileFormName.value = profileTitle.textContent;
  profileFormDesc.value = profileDesc.textContent;
  openModal(profileModal)
});
profileForm.addEventListener("submit",(e) => handleProfileFormSubmit(e, profileModal));

cardForm.addEventListener("submit", (e) => handleCardFormSubmit(e, cardModal));
cardAddButton.addEventListener("click", () => openModal(cardModal));


closeButtons.forEach(button => {
  const modal = button.closest('.modal');
  button.addEventListener("click", () => closeModal(modal));
})
