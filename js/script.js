"use strict"
const elResult = document.querySelector(".result");
const elForm = document.querySelector(".search");
const elInput = document.querySelector(".search__input");
const elList = document.querySelector(".list");
const elBookmarkList = document.querySelector(".bookmark-list");
const elOrdernewest= document.querySelector(".order-newest");
const modal = document.querySelector('.modall');
const closeModalBtn = document.querySelector('.close-modal');
const overlay = document.querySelector('.overlay');
const elPrevLink= document.querySelector(".prev-link");
const elNextLink= document.querySelector(".next-link");
const elPrevBtn = document.querySelector(".prev-btn")
const elNextBtn = document.querySelector(".next-btn")
const elPagesNum = document.querySelector(".pages-number")


let search = "python"
let page = 1

const bookmarks = [];




console.log(bookmarks);


//logout
const token = window.localStorage.getItem("token");

if (!token) {
  window.location.replace("index.html");
}

logout.addEventListener("click", function () {
  window.localStorage.removeItem("token");

  window.location.replace("index.html");
});


//renderBooks
const renderBooks = function (books, htmlElement){
  elList.innerHTML = null
  for(let book of books.items){

    const html = `
    <li class="card mt-5" style="width: 15rem;">
    <img src=${book.volumeInfo.imageLinks.smallThumbnail} class="card-img-top" alt="photo" width="200" height="200">
    <div class="card-body">
    <h5 class="card-title pb-0 mb-0">${book.volumeInfo.title}</h5>
    <p class="card-text m-0 p-0">${book.volumeInfo.authors}</p>
    <p class="card-text m-0 p-0">${book.volumeInfo.publishedDate}</p>
    <div class="d-flex justify-content-between">
    <button class="bookmark-btn btn btn-warning mt-2 mb-2 fw-semibold" data-bookmark-btn-id=${book.id}>Bookmark</button>
    <button id="info" class="info-button btn btn-light text-primary mt-2 mb-2 fw-semibold" data-more-info-btn-id=${book.id}>More Info</button>
    </div>
    <a href=${book.volumeInfo.previewLink} class="btn btn-secondary w-100 fw-semibold">Read</a>
    </div>
    </li>
    `


    elResult.textContent= `Showing ${books.totalItems} Result(s)`;
    htmlElement.insertAdjacentHTML("beforeend",html)
  }
};



// // get API
const getBooks = async function() {
  try {
    let startIndex = (page - 1) * 10 + 1;
    const request = await fetch (`https://www.googleapis.com/books/v1/volumes?q=${search}&startIndex=${startIndex}`);

    const books = await request.json();
    const dataBooks = books.items


    renderBooks(books, elList)

  } catch(err){
    alert("Can not find")
  }
}

getBooks()



elList.addEventListener("click", (evt) => {
  const isBookmarkBtn = evt.target.matches(".bookmark-btn");

  if (isBookmarkBtn) {
    const foundBtnId = evt.target.dataset.bookmarkBtnId;

    const foundBook = books.items.find((film) => film.id === foundBtnId);

    if (!bookmarks.includes(foundBook)) {
      bookmarks.push(foundBook);

      localStorage.setItem("localStorageBookmark", JSON.stringify(arr));
      elList.innerHTML = null;

      read(arr);
      renderBooks(books, elList)
    }
  }
});

function read(data) {
  let i = 0;
  data.forEach((item) => {
    const html = `
    <div class="col-4__card">
      <div class="card-p">
       <h3>${item.volumeInfo.title}</h3>
      <p>${item.volumeInfo.authors}</p>
      </div>
     <div class="card-img">
        <img class="card-img__1" src="./images/home-page/book-open%201.png" alt="book" />
        <img data-deleteid="${i}" class="card-img__2" src="./images/home-page/delete%201.png" alt="delete" />
      </div>
    </div>
    `;
    i++;
    elBookmarkList.insertAdjacentHTML("beforeend", html);
  });
}


elInput.addEventListener("input", function(evt){
  evt.preventDefault()
  search = elInput.value;

  getBooks();
})


// ORDER NEWEST
elOrdernewest.addEventListener("click", function (){

  const getNewest = async function(){
    const request = await fetch (`https://www.googleapis.com/books/v1/volumes?q=${search}&orderBy=newest`);
    const books = await request.json();

    renderBooks(books, elList)
  }
  getNewest()
})
/*
function moreBtn(data) {
  data.items.forEach((book) => {
    const more = `
    <div>
    <div class="d-flex justify-content-sm-between p-4">
    <p>${book.volumeInfo.title}</p>
    <button class="close-modal">&times;</button>
    </div>
    <img class="ms-4" src=${book.volumeInfo.imageLinks.smallThumbnail} alt="" width="200" height="200">
    <p>${book.volumeInfo.description}</p>
    <p>"Author : ${book.volumeInfo.authors}"</p>
    <p>"Published : ${book.volumeInfo.publisher}"</p>
    <p>"Categories:${book.volumeInfo.categories}"</p>

    <a href=${book.volumeInfo.previewLink} class="btn btn-secondary w-100 fw-semibold">Read</a>
    </div>
    `;
    modal.insertAdjacentHTML("beforeend", more);
  });
}
 */
const openModal = function () {
  modal.classList.remove('hidden');
  overlay.classList.remove('hidden');
};

const closeModal = function () {
  modal.classList.add('hidden');
  overlay.classList.add('hidden');
};

elList.addEventListener('click', openModal);
closeModalBtn.addEventListener('click', closeModal);
overlay.addEventListener('click', closeModal);

document.addEventListener('keydown', function (evt) {
  console.log(evt);

  if (evt.metaKey && evt.keyCode === 67) {
    closeModal();
  }
});


elPrevBtn.addEventListener("click", function(){
  page--

  getBooks()
});

elNextBtn.addEventListener("click", function(){
  page++

  getBooks()
})