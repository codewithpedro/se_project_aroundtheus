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

const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const profileModal = document.querySelector("#edit-modal");
const profileFormName = document.querySelector("#modal__name");
const profileFormDesc = document.querySelector("#modal__desc");
const profileForm = document.querySelector(".modal__form")

const profileCloseButton = profileModal.querySelector(".modal__close")
const profileEditButton = document.querySelector(".profile__edit-button");

const cardModal = document.querySelector("#add-card-modal");
const cardsList = document.querySelector(".cards");
const cardForm = cardModal.querySelector(".modal__form");
const cardFormTitle = cardForm.querySelector(".modal__input_title");
const cardFormURL = cardForm.querySelector(".modal__input_url");

const cardCloseButton = cardModal.querySelector(".modal__close");
const cardAddButton = document.querySelector(".profile__add-button");

const cardsEl = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;


function getCardElement(data) {

  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");

  cardTitleEl.textContent = data.name;
  cardImageEl.src = data.link;
  cardImageEl.alt = data.name;
  return cardElement;
}


initialCards.forEach(cardData => renderCard(cardData, cardsList));

function renderCard(cardData, list) {
  const cardElement = getCardElement(cardData);
  list.prepend(cardElement);
}

function openModal(modal){
  modal.classList.add("modal_opened");
}

function closeModal(modal){
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

  renderCard({name, link}, cardsList);
  closeModal(modal);
}

profileEditButton.addEventListener("click", () => {
  profileFormName.value = profileTitle.textContent;
  profileFormDesc.value = profileDesc.textContent;
  openModal(profileModal)
});
profileCloseButton.addEventListener("click", () => closeModal(profileModal));
profileForm.addEventListener("submit",(e) => handleProfileFormSubmit(e, profileModal));

cardForm.addEventListener("submit", (e) => handleCardFormSubmit(e, cardModal));
cardAddButton.addEventListener("click", () => openModal(cardModal));
cardCloseButton.addEventListener("click", () => closeModal(cardModal));


const likeButtons = document.querySelectorAll('.card__like-button');

likeButtons.forEach(heart => {
  heart.addEventListener("click", () => {
    heart.classList.toggle("card__like-button_active");
  })
});
