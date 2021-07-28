let myLibrary = [],
    idnum = 0,
    statusIcons,
    deletebtnList,
    addBookbtn;
const overlay = document.querySelector(".container");
const formCont = document.querySelector(".input-form-container")
const libCont = document.getElementById("library-container");
const defaultImage = "books.png";
const inputFormCont = document.getElementById("input-form");



addBookbtn = document.querySelector(".form-btn");
addBookbtn.addEventListener("click", () => {
    toggleOverlay(overlay, formCont);
});

overlay.addEventListener("click", () => {
    toggleOverlay(overlay,formCont);
});

statusIcons = document.querySelectorAll(".status")
statusIcons.forEach(element => {
    element.addEventListener("click", () => {
        element.classList.toggle("check");
    });
});

deletebtnList = document.querySelectorAll(".delete-button");
deletebtnList.forEach(element => {
    element.addEventListener("click", () => {
        let book = element.parentElement.parentElement.parentElement;
        book.parentElement.removeChild(book);
    }); 
});

let submitBtn = document.querySelector("#submit-button");
submitBtn.addEventListener("click", () => {
    let newBook,
    newTitle,
    newAuthor,
    newPages,
    newStatus,
    newImage,
    imgFromUrl = document.getElementById("image-url");

    console.log(idnum);

    newTitle = document.getElementById("title").value;
    newAuthor = document.getElementById("author").value;
    newPages = document.getElementById("pages").value;
    newStatus = document.getElementById("status").checked;

    if(imgFromUrl.value){
        newImage = imgFromUrl.value;
    } else{
        newImage = defaultImage;
    }

    if(!(newTitle || newAuthor || newPages)){
        alert("Please fill in all the details required")
    } else{
        newBook = new Book(idnum, newTitle, newAuthor, newPages, newStatus, newImage)

        addBookToLibrary(newBook);
        

        addBookToScript(newBook);
        idnum += 1;

        inputFormCont.reset();

        toggleOverlay(overlay,formCont);
    }
});


function Book(id, title, author, pages, status, image){
    this.id = id;
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.status = status;
    this.image = image;
    this.info = () => {
        return `${title} by ${author}, ${pages} pages, ${status}`
    }
}

function addBookToLibrary(book){
    myLibrary.push(book);
};

function createBookSections(sectionType,sectionClass){
    let section = document.createElement(sectionType);
    section.className = sectionClass;
    return section;
};

function addBookToScript(book){
    let bookCont,
        bookCover,
        coverImageCont,
        coverImage,
        bookTitleCont,
        bookTitle,
        detailsCont,
        statusIcon,
        pagesText,
        deleteCont,
        deleteButton;
    // Assigning variables to the new book elements to be operated on later 
    bookCont = libCont.appendChild(createBookSections("div", "book"));
    bookCover = bookCont.appendChild(createBookSections("div", "cover"));
    coverImageCont = bookCover.appendChild(createBookSections("div", "image"));
    coverImage = coverImageCont.appendChild(createBookSections("img", "cover-image"));
    bookTitleCont = coverImageCont.appendChild(createBookSections("div", "title"));
    bookTitle = bookTitleCont.appendChild(createBookSections("p", "title-text"));
    detailsCont = bookCont.appendChild(createBookSections("div", "details"));
    statusIcon = detailsCont.appendChild(createBookSections("i", "fa fa-check-circle"));
    pagesText = detailsCont.appendChild(createBookSections("p", "pages-text"));
    deleteCont = detailsCont.appendChild(createBookSections("div", "delete-cont"));
    deleteButton = deleteCont.appendChild(createBookSections("button", "delete-button"));
    deleteButton.appendChild(createBookSections("span", ""));

    bookCont.id = book.id;
    if (book.status){
        statusIcon.classList.add("check");
    }
    if (book.image === defaultImage){
        coverImage.className = "default-img";
    } else{
        coverImage.className = `${book.title} cover-image`;
    }
    coverImage.src = book.image;
    bookTitle.textContent = book.title;
    pagesText.textContent = `${book.pages} pgs`;
    deleteButton.textContent = "Delete";

    statusIcon.addEventListener("click", (element) => {
        element.classList.toggle("check");
        let bookId = element.parentElement.parentElement.id;
        myLibrary[bookId].status = true;
    });

    deleteButton.addEventListener("click", (element) => {
        deleteBook(myLibrary, element.target);
    });
};

function deleteBook(library, child){
    let parent = child.parentElement.parentElement,
            bookId = child.parentElement.parentElement.id,
            bookIndex;

        library.forEach(book => {
            console.log(book.id === parseInt(bookId));
            if(book.id === parseInt(bookId)){
                bookIndex = myLibrary.indexOf(book);
            };
        });

        library.splice(bookIndex,1);

        parent.parentElement.removeChild(parent);
}

function toggleOverlay(overlay, form){
    overlay.classList.toggle("inactive");
    form.classList.toggle("inactive");
}

const theHobbit= new Book("The Hobbit", "J.R.R. Tolkien", 295, "not read yet");
console.log(theHobbit.info());