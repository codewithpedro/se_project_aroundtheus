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


const profileEditButton = document.querySelector(".profile__edit-button");
const profileTitle = document.querySelector(".profile__title");
const profileDesc = document.querySelector(".profile__description");

const modal = document.querySelector(".modal");
const modalCloseButton = modal.querySelector(".modal__close")
const modalName = document.querySelector("#modal__name");
const modalDesc = document.querySelector("#modal__desc");
const modalEditForm = document.querySelector(".modal__form")

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


initialCards.forEach(cardData => {
  const cardElement = getCardElement(cardData);
  cardsEl.prepend(cardElement);
});

function openModal(e){
  e.preventDefault();
  modal.classList.add("modal_opened");
  modalName.value = profileTitle.textContent;
  modalDesc.value = profileDesc.textContent;
}

function closeModal(){
  modal.classList.remove("modal_opened");
}

function handleProfileFormSubmit(e){
  e.preventDefault();
  profileTitle.textContent = modalName.value;
  profileDesc.textContent = modalDesc.value;
  closeModal();
}

profileEditButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);
modalEditForm.addEventListener("submit", handleProfileFormSubmit);
