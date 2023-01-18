//Book Class: Represent A Book//
class Book {
    constructor(title, author, isbn) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
    }
}

//UI class:Handle UI Tasks//
class UI {
    static displayBooks() {
        const books = Store.getBooks();
        books.forEach((book) => {
            UI.addBookToList(book)
        });
    }

    //Show UI Alert //
    static showAlert(message, className) {
        const div = document.createElement('div');
        div.classList = `alert alert-${className}`
        div.appendChild(document.createTextNode(message))
        const container = document.querySelector('.container')
        const bookForm = document.querySelector("#book-form")
        container.insertBefore(div, bookForm)

        // set animation for alert 
        function gradualFade() {
            let selectAlert = document.querySelector('.alert');

            setInterval(function () {
                selectAlert.style.opacity = '0'
            }, 500)

            setInterval(function () {
                if (selectAlert.style.opacity = '0') {
                    selectAlert.remove()
                }
            }, 1080)
        }
        gradualFade()

    }

    // Add Item Into BookList
    static addBookToList(book) {
        let list = document.querySelector("#book-list");
        let row = document.createElement("tr");
        row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;
        list.appendChild(row)
    }

    static clearFields() {
        document.querySelector('#title').value = '';
        document.querySelector('#author').value = '';
        document.querySelector('#isbn').value = '';
    }

    static deleteBook(el) {
        if (el.classList.contains("delete")) {
            el.parentElement.parentElement.remove();
        }
    }
}
//Store Class: Handles Storage//
class Store {
    static getBooks() {
        let booksArray
        if (localStorage.getItem('booksArray') === null) {
            booksArray = []
        } else {
            // getItem will return as string, must use JSON.parse to return it as normal //
            booksArray = JSON.parse(localStorage.getItem('booksArray'));

        }
        return booksArray
    }

    static addBooks(book) {
        const booksArray = Store.getBooks();
        booksArray.push(book);
        localStorage.setItem('booksArray', JSON.stringify(booksArray))

    }

    static removeBooks(isbn) {
        const booksArray = Store.getBooks();
        booksArray.forEach((book, index) => {
            if (book.isbn === isbn) {
                booksArray.splice(index, 1)
            }
        });
        localStorage.setItem('booksArray', JSON.stringify(booksArray))
    }
}

//Event: Display Books//
document.addEventListener("DOMContentLoaded", UI.displayBooks)

//Event: Add A Book//
document.querySelector("#book-form").addEventListener('submit', (e) => {
    //Prevent actual submit,(this context prevent submit button from sending out )
    e.preventDefault();

    //Get form values
    const title = document.querySelector("#title").value;
    const author = document.querySelector("#author").value;
    const isbn = document.querySelector("#isbn").value;

    //Validate the input
    if (title === "" || author === "" || isbn === "") {
        UI.showAlert("Please fill in the form", 'danger')
    } else {
        //Instantiate book
        const book = new Book(title, author, isbn);
        UI.addBookToList(book)

        //add Book To Storage//
        Store.addBooks(book)

        UI.showAlert("Book added into list", 'success')

        //Clear Fields
        UI.clearFields()
    }
});

//Event: Remove A Book//
document.querySelector('#book-list').addEventListener("click", (e) => {
    UI.deleteBook(e.target)

    //Event: Delete Item Memory In Storage //
    Store.removeBooks(e.target.parentElement.previousElementSibling.textContent)
    UI.showAlert("Book deleted successfully", 'success')
})

console.log(Store.getBooks())

/*let rowInners = [book.title, book.author, book.isbn];
for (let rowInner of rowInners) {
    let rowContent = document.createElement("td");
    rowContent.innerText = `${rowInner}`;
    list.appendChild(row)
    row.appendChild(rowContent);
};
let iconX = document.createElement("td");
iconX.classList.add('btn', 'btn-danger', 'btn-sm', 'delete');
iconX.href = "#";
iconX.innerText = "X";
row.appendChild(iconX)*/

let myObj = {
    name: "Domenic",
    jobs: "Developer",
    age: 35
};

let stringRepresenation = JSON.stringify(myObj)
console.log(stringRepresenation) // output:{"name":"Domenic","jobs":"Developer","age":35}
// let showKeyValue = JSON.parse(stringRepresenation)
// console.log(showKeyValue)
localStorage.setItem('myObj', stringRepresenation)
let showkeyValue = JSON.parse(localStorage.getItem("myObj"))
console.log(showkeyValue) //output: age: 35 jobs: "Developer" name: "Domenic"//
console.log(localStorage) // Storage {myObj: '{"name":"Domenic","jobs":"Developer","age":35}',
