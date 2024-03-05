
const avatarCharacters = [
    {
        name: "Aang",
        age: 112,
        element: "Air"
    },
    {
        name: "Katara",
        age: 16,
        element: "Water"
    },
    {
        name: "Sokka",
        age: 17,
        element: "Non-bender"
    },
    {
        name: "Zuko",
        age: 17,
        element: "Fire"
    },
    {
        name: "Toph",
        age: 12,
        element: "Earth"
    },
    {
        name: "Iroh",
        age: 60,
        element: "Fire"
    },
    {
        name: "Azula",
        age: 14,
        element: "Fire"
    },
    {
        name: "Mai",
        age: 15,
        element: "Non-bender"
    },
    {
        name: "Ty Lee",
        age: 15,
        element: "Non-bender"
    },
    {
        name: "Suki",
        age: 16,
        element: "Non-bender"
    },
    {
        name: "King Bumi",
        age: 112,
        element: "Earth"
    },
    {
        name: "Ozai",
        age: 43,
        element: "Fire"
    },
    {
        name: "Gran Gran",
        age: 85,
        element: "Water"
    },
    {
        name: "Pakku",
        age: 70,
        element: "Water"
    },
    {
        name: "Jeong Jeong",
        age: 70,
        element: "Fire"
    },
    {
        name: "Hakoda",
        age: 40,
        element: "Non-bender"
    },
    {
        name: "Bato",
        age: 45,
        element: "Non-bender"
    },
    {
        name: "Jet",
        age: 16,
        element: "Non-bender"
    },
    {
        name: "Long Feng",
        age: 55,
        element: "Non-bender"
    },
    {
        name: "Haru",
        age: 16,
        element: "Earth"
    }
];

// ==================== TASK 1 ====================

const taskA = document.querySelector('#task-a')
const taskB = document.querySelector('#task-b')
const taskC = document.querySelector('#task-c')

// A) What kind of 'element' is what Zuko bends?

let zukoElement = avatarCharacters.find(zuko => zuko.name == "Zuko");
zukoElement = zukoElement.element;
taskA.append(zukoElement);

// B) Are all characters adults (older than 18 years)? Display, 'Yes.' or 'No.' into the given field.
let areAllAdults = avatarCharacters.every(character => character.age >= 18);
if(areAllAdults){
    taskB.append("Yes.");
}else{
    taskB.append("No.");
}

// C) List the names of waterbenders!
let waterBenders = avatarCharacters.filter(character => character.element == "Water");
waterBenders = waterBenders.map(character => character.name);
taskC.append(waterBenders);``


// ==================== TASK 2 ====================

let selected = []
const table = document.querySelector('table')

 /*YOU SHOULD INSERT YOUR SOLUTION HERE */

let allTds = document.querySelectorAll('td');
allTds.forEach(td =>{
    td.addEventListener("click", () =>{
        if(selected.length == 4){
            selected = [];
            allTds.forEach(td =>{
                td.style.backgroundColor = "unset";
            })
        }
        if(selected.length <4 && !selected.includes(td.textContent)){
            td.style.backgroundColor = "lightgreen";
            selected.push(td.textContent);
        }
    })
})



document.querySelector('button').addEventListener('click', (e) => {
    if(selected.length == 4){
        // generate an unordered list (ul) out of the selected array! 
        // First create a `ul` and then append list items `li`-s inside of it.
        // After that, append the created ul to the div with the id `#answers`
        /*YOU SHOULD INSERT YOUR SOLUTION HERE */
        let ul = document.createElement('ul');
        selected.forEach(sel =>{
            let tempIl = document.createElement('li');
            tempIl.textContent = sel;
            ul.appendChild(tempIl);
        })
        let answers = document.querySelector("#answers");
        answers.append(ul);

        const p = document.createElement("p")
        if(checkElementInQuartets()){
            p.classList.add('good')
            p.innerHTML = 'YEEES! Nice job! 😊'
        } else {
            p.classList.add('bad')
            p.innerHTML = 'Try again 😭'
        }
        // selected = []
        ul.append(p)
    }
})
function checkElementInQuartets() {
    const goodies = [
        ["Dog", "Cat", "Hen", "Rabbit"],
        ["Cheese", "Meat", "Rice", "Eggs"],
        ["Watermelon", "Cherry", "Lemon", "Grapes"],
        ["Socks", "Gloves", "Scarf", "Boots"]
    ];
    let isGood = false;
    for (let i = 0; i < goodies.length; i++) {
        const quartet = goodies[i];
        let foundAll = true;
        for (let j = 0; j < selected.length; j++) {
            if (!quartet.includes(selected[j])) {
                foundAll = false;
                break;
            }
        }
        if (foundAll) {
            isGood = true;
            break;
        }
    }
    return isGood;
}

