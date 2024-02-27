// Task 1
const button1 = document.querySelector('#task1 button');
const input1 = document.querySelector('#task1 input');
const helloText = document.querySelector('#task1 #helloText');

//console.log(button1, input1, helloText);
button1.addEventListener('click', sayHello)

function sayHello(){
    helloText.style.fontSize ='50px';
    helloText.innerText =`Hello ${input1.value}!`
}

// Task 2
const button2 = document.querySelector('#task2 button')
const input2 = document.querySelector('#task2 input');
const helloRepeats = document.querySelector('#task2 #helloRepeats')

button2.addEventListener('click', ()=>{
    helloRepeats.innerHTML = ""

    console.log(typeof(input2.value))
    let val2 = parseInt(input2.value)
    for(let i = 0; i < val2; i++){
        const new2 = document.createElement('p')
        new2.innerText = "Hello World!"
        new2.style.fontSize = `${i*10+5}px`
        helloRepeats.append(new2);
    }
})

// Task 3
const button3 = document.querySelector('#task3 button')
const input3 = document.querySelector('#task3 input')
const circleResult = document.querySelector('#task3 #circleResult')

button3.addEventListener('click',()=>{
    let r = parseInt(input3.value)
    let p = 2 * 3.1416 * r
    circleResult.innerText =`The perimeter of the circle is ${p}!`
    
})


// Task 4


const hyperlinksList = document.querySelector('#task4 #hyperlinksList')
const links = document.querySelectorAll('a');

for(let i = 0; i < links.length; i++)
{
    const new2 = document.createElement('li');
    new2.innerText = links[i].href;
    hyperlinksList.appendChild(new2);
}




// })
// Task 5

const button5 = document.querySelector('#task5 button');
const input5 = document.querySelector('#task5 input');
const imageContainer = document.querySelector('#task5 #imageContainer');

button5.addEventListener('click',()=>{
    const img = new Image ();
    img.src = input5.value;
    imageContainer.appendChild(img)
})

// Task 6
const children = [
    { name: "Anna", class: "3/A", age: 8 },
    { name: "Becnce", class: "4/B", age: 9 },
    { name: "Cecilia", class: "2/C", age: 7 },
    { name: "David", class: "5/D", age: 10 },
    { name: "Emma", class: "1/E", age: 6 }
];

const button6 = document.querySelector('#task6 button')
const in1 = document.querySelector('#task6 #input1');
const in2 = document.querySelector('#task6 #input2');
const in3 = document.querySelector('#task6 #input3');
const dataTable = document.querySelector('#task6 #dataTable');

for(let i = 0; i < children.length; i++){
    let newRow = dataTable.insertRow();
    let c1 = newRow.insertCell(0);
    let c2 = newRow.insertCell(1);
    let c3 = newRow.insertCell(2);

    c1.innerHTML = children[i].name;
    c2.innerHTML = children[i].class;
    c3.innerHTML = children[i].age;
}

button6.addEventListener('click',()=>{
    let newRow = dataTable.insertRow();
    let c1 = newRow.insertCell(0);
    let c2 = newRow.insertCell(1);
    let c3 = newRow.insertCell(2);

    c1.innerHTML = in1.value;
    c2.innerHTML = in2.value;
    c3.innerHTML = in3.value;
})


// Task 7
const booksList = [
    {
        author: "J.K. Rowling",
        title: "Harry Potter and the Philosopher's Stone",
        publicationYear: 1997,
        publisher: "Bloomsbury",
        isbn: "978-0747532743"
    },
    {
        author: "George Orwell",
        title: "1984",
        publicationYear: 1949,
        publisher: "Secker & Warburg",
        isbn: "978-0451524935"
    },
    {
        author: "Harper Lee",
        title: "To Kill a Mockingbird",
        publicationYear: 1960,
        publisher: "J. B. Lippincott & Co.",
        isbn: "978-0061120084"
    },
    {
        author: "F. Scott Fitzgerald",
        title: "The Great Gatsby",
        publicationYear: 1925,
        publisher: "Charles Scribner's Sons",
        isbn: "978-0743273565"
    },
    {
        author: "Leo Tolstoy",
        title: "War and Peace",
        publicationYear: 1869,
        publisher: "The Russian Messenger",
        isbn: "No ISBN"
    }
];


const button7 = document.querySelector('#task7 button');
const input7 = document.querySelector('#task7 #year');
const booksByYear = document.querySelector('#task7 #booksByYear');


button7.addEventListener('click',()=>{
    booksByYear.innerHTML = "";
    let inputYear = parseInt(input7.value);
    const filteredBooks = booksList.filter(b => b.publicationYear == inputYear);
    if(filteredBooks.length < 1){
        const li = document.createElement('li');
        li.textContent = "No books found in this year";
        booksByYear.appendChild(li);
    }
    else{
        filteredBooks.forEach(book =>{
            const li = document.createElement('li');
            li.textContent = book.title;
            booksByYear.appendChild(li);
        });
    }
})

// Task 8
const button8 = document.querySelector('#task8 button');
const input8 = document.querySelector('#task8 #publisher')
const booksByPublisher = document.querySelector('#task8 #booksByPublisher')

button8.addEventListener('click',()=>{
    while (booksByPublisher.rows.length > 1) {
        booksByPublisher.deleteRow(1);
    }
    if(input8.value == "publisher1"){
        let newRow = booksByPublisher.insertRow();
        let c1 = newRow.insertCell(0);
        let c2 = newRow.insertCell(1);
        let c3 = newRow.insertCell(2);
        let c4 = newRow.insertCell(3);

        c1.innerText = booksList[0].author
        c2.innerText = booksList[0].title
        c3.innerText = booksList[0].publicationYear
        c4.innerText = booksList[0].publisher
    }
    else if(input8.value == "publisher2"){
        let newRow = booksByPublisher.insertRow();
        let c1 = newRow.insertCell(0);
        let c2 = newRow.insertCell(1);
        let c3 = newRow.insertCell(2);
        let c4 = newRow.insertCell(3);

        c1.innerText = booksList[1].author
        c2.innerText = booksList[1].title
        c3.innerText = booksList[1].publicationYear
        c4.innerText = booksList[1].publisher
    }
    else if(input8.value == "publisher3"){
        let newRow = booksByPublisher.insertRow();
        let c1 = newRow.insertCell(0);
        let c2 = newRow.insertCell(1);
        let c3 = newRow.insertCell(2);
        let c4 = newRow.insertCell(3);

        c1.innerText = booksList[2].author
        c2.innerText = booksList[2].title
        c3.innerText = booksList[2].publicationYear
        c4.innerText = booksList[2].publisher
    }
})


// Task 9
const inc = document.querySelector('#task9 #inc')
const dec = document.querySelector('#task9 #dec')
const input9 = document.querySelector('#task9 #counterValue')
let value = 0;
let min = -10;
let max = 10;
let intervalId;

inc.addEventListener('click',()=>{
    if(value < max)
    {
        value += 1;
        input9.value = value;
        inRange(value);

    }
})
inc.addEventListener('mousedown',()=>{
    intervalId = setInterval(() => {
        if (value+1 < max) {
            value += 1;
            input9.value = value;
            inRange(value);
        }
    }, 100);
})
inc.addEventListener('mouseup', () => {
    clearInterval(intervalId);
});
dec.addEventListener('click',()=>{
    if(value > min)
    {
        value -= 1;
        input9.value = value;    
        inRange(value);
    }
})
dec.addEventListener('mousedown',()=>{
    intervalId = setInterval(() => {
        if (value-1 > min) {
            value -= 1;
            input9.value = value;
            inRange(value);
        }
    }, 100);
})
dec.addEventListener('mouseup', () => {
    clearInterval(intervalId);
});


function inRange(x){
    if(x >= max){
        inc.disabled = true;
    }
    else{
        inc.disabled = false;
    }
    if(x == min){
        dec.disabled = true;
    }
    else{
        dec.disabled = false;
    }
}


// Task 10

document.querySelectorAll("ul li a").forEach(function(link) {
    link.addEventListener("click", function(e) {
        e.preventDefault(); // Prevent the page from jumping to the link on click
        const targetId = this.getAttribute("href").substring(1); // Get the value of the "href" attribute without the "#" symbol
        const tasks = document.querySelectorAll(".task");
        tasks.forEach(function(task) {
            if (task.id === targetId) {
                task.classList.add("current");
            } else {
                task.classList.remove("current");
            }
        });
    });
});
const input10 = document.querySelector('#task10 #guess');
const button10 = document.querySelector('#task10 button');
const guessResult = document.querySelector('#task10 #guessResult');

let x = Math.floor(Math.random() * (10 - 1)) + 1;

button10.addEventListener("click",()=>{
    let number = parseInt(input10.value);
    if(number > x){
        guessResult.innerHTML = "This number is higher than the expected"
    }
    else if(number < x){
        guessResult.innerHTML = "This number is lower than the expected"
    }
    else{
        guessResult.innerHTML = "<strong>Congratulations!, you guessed the number, press Guess to play again</strong>"
        x = Math.floor(Math.random() * (10 - 1)) + 1;
    }
});


