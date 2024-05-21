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

function openModal(e){
  e.preventDefault();
  modal.classList.add("modal__opened");
  modalName.value = profileTitle.textContent;
  modalDesc.value = profileDesc.textContent;
}

function closeModal(){
  modal.classList.remove("modal__opened");
}

function saveModal(e){
  e.preventDefault();
  profileTitle.textContent = modalName.value;
  profileDesc.textContent = modalDesc.value;
  closeModal();
}

profileEditButton.addEventListener("click", openModal);
modalCloseButton.addEventListener("click", closeModal);
modalEditForm.addEventListener("submit", saveModal);
