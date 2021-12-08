let myLibrary = [];
const form =  document.querySelector('#formElement')
const formContainer = document.querySelector('.formContainer')
let container = document.querySelector('.container')
const submitBtn = document.getElementById('submit')
const close = document.querySelector('.close')

close.addEventListener('click', () => {
    formContainer.style.display = 'none'
})

submitBtn.addEventListener('click', addBookToLibrary)


function Book(title,author,pages,read){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.read = read
    
}

//add book to library
function addBookToLibrary(){

    event.preventDefault();
    formContainer.style.display = 'none'

    title = document.getElementById('title').value
    author = document.getElementById('author').value
    pages = document.getElementById('noofpgs').value
    read = document.getElementById('read').value

    let nBook = new Book(title, author, pages, read)
    myLibrary.push(nBook)
    localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
    render()
    form.reset()
    
}

function render(){
    const book = document.querySelectorAll('.book')
    book.forEach(book => container.removeChild(book))
    
    for (let i = 0; i<myLibrary.length; i++){
        loopMyLibrary(myLibrary[i])
    }
}


function loopMyLibrary(item){
    const bookDiv = document.createElement('div');
    const titleDiv = document.createElement('div');
    const authorDiv = document.createElement('div');
    const pagesDiv = document.createElement('div');
    const readBtn = document.createElement('button');
    const deleteBtn = document.createElement('button');

    bookDiv.classList.add('book');
    bookDiv.setAttribute('id', myLibrary.indexOf(item));

    titleDiv.textContent = `Title: ${item.title}`;
    titleDiv.classList.add('title');
    bookDiv.appendChild(titleDiv);

    authorDiv.textContent = `Author: ${item.author}`;
    authorDiv.classList.add('author');
    bookDiv.appendChild(authorDiv);

    pagesDiv.textContent = `Pages: ${item.pages}`;
    pagesDiv.classList.add('pages');
    bookDiv.appendChild(pagesDiv);

    readBtn.textContent = `${item.read}${item.read  === 'Yes'? "😃" : "😢"}`
    if (item.read === 'Yes'){
        readBtn.style.backgroundColor = 'green'
    }
    else {
        readBtn.style.backgroundColor = 'red'
    }
    readBtn.classList.add('read')
    bookDiv.appendChild(readBtn)

    deleteBtn.textContent = 'Delete'
    deleteBtn.setAttribute('id', 'deleteBtn');
    bookDiv.appendChild(deleteBtn)
    deleteBtn.style.display = 'block'

    container.appendChild(bookDiv)

    deleteBtn.addEventListener('click', () => {
        myLibrary.splice(myLibrary.indexOf(item), 1)
        localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
        reload()
        location.reload()
    })

    readBtn.addEventListener('click', () => {
        if (readBtn.textContent == "Yes😃"){
            item.read = "No"
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
            reload()
        }
        else{
            item.read = "Yes"
            localStorage.setItem("myLibrary", JSON.stringify(myLibrary))
            reload()
        }
        
        //reload()
    })
   
}


function showForm(){
    formContainer.style.display = 'block';
}



function reload(){
    if (!localStorage.myLibrary){
        //render()
    }
    else {
        let objects = localStorage.getItem('myLibrary')
        objects = JSON.parse(objects);
        myLibrary = objects
        render()
    }
}
reload()



console.log(myLibrary)
console.log(localStorage)

