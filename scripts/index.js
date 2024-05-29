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
const profileForm = document.querySelector(".modal__form")

const profileEditButton = document.querySelector(".profile__edit-button");

const cardModal = document.querySelector("#add-card-modal");
const cardsList = document.querySelector(".cards");
const cardForm = cardModal.querySelector(".modal__form");
const cardFormTitle = cardForm.querySelector(".modal__input_title");
const cardFormURL = cardForm.querySelector(".modal__input_url");

const cardAddButton = document.querySelector(".profile__add-button");

const cardsEl = document.querySelector(".cards");
const cardTemplate = document.querySelector("#card-template").content.firstElementChild;

const zoomModal = document.querySelector("#zoom-modal");
const zoomImageEl = zoomModal.querySelector(".modal__image");
const zoomSubtitleEl = zoomModal.querySelector(".modal__subtitle");

const modals = [...document.querySelectorAll('.modal')];

function getCardElement(data) {

  const cardElement = cardTemplate.cloneNode(true);
  const cardImageEl = cardElement.querySelector(".card__image");
  const cardTitleEl = cardElement.querySelector(".card__title");
  const likeButton = cardElement.querySelector('.card__like-button');
  const trashButton = cardElement.querySelector(".card__trash");

  likeButton.addEventListener("click", () => likeButton.classList.toggle("card__like-button_active"))

  trashButton.addEventListener("click", () => cardElement.remove())

  cardImageEl.addEventListener("click", () => {

    zoomImageEl.src = data.link;
    zoomImageEl.alt = data.name;
    zoomSubtitleEl.textContent = data.name;
    openModal(zoomModal);
  })

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
  modal.tabIndex = '-1'
  setTimeout(() => {
    modal.focus({focusVisible: true});
  }, 50);
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

modals.forEach(modal => {
  modal.addEventListener('keydown', handleEsc)
  modal.addEventListener('click', handleClick);
})
