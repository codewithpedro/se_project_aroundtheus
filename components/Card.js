export default class Card {
  constructor({name, link}, cardSelector, handleImageClick){
    this._name = name
    this._link = link
    this._cardSelector = cardSelector
    this._handleImageClick = handleImageClick;
  }

  _handleLike(){
    this._likeButton.classList.toggle("card__like-button_active")
  }

  _handleRemove(){
     this._cardElement.remove()
  }

  _setEventListeners(){
    this._imageElement.addEventListener("click", () => this._handleImageClick(this._name, this._link));
    this._likeButton.addEventListener("click", () => this._handleLike())
    this._trashButton.addEventListener("click", () => this._handleRemove())
  }

  _getTemplate(){
    return document.querySelector(this._cardSelector).content.firstElementChild.cloneNode(true);
  }

  getView(){
    //Creating element
    this._cardElement = this._getTemplate();

    //Initiating buttons
    this._likeButton = this._cardElement
      .querySelector(".card__like-button");
    this._trashButton = this._cardElement
      .querySelector(".card__trash");

    //Selecting elements of cards
    this._imageElement = this._cardElement.querySelector(".card__image");
    this._titleElement = this._cardElement.querySelector(".card__title");

    //Initiating title and image
    this._imageElement.src = this._link;
    this._imageElement.alt = this._name
    this._titleElement.textContent = this._name;

    //Setting eventListeners
    this._setEventListeners();

    //Returning element
    return this._cardElement;
  }
}
