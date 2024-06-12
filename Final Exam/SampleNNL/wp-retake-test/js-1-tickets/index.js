const task1 = document.querySelector("#task1");
const task2 = document.querySelector("#task2");
const task3 = document.querySelector("#task3");
const task4 = document.querySelector("#task4");
const task5 = document.querySelector("#task5");
console.log(tickets);

// 1.
const  cnt  = tickets.length;
task1.innerHTML = cnt;


//2.
const number = 42;
const tickets42 = tickets.filter(e => e.includes(number)).length;
task2.innerHTML = tickets42;

//3.
const index = tickets.findIndex(e => e.every(t => t <20));
task3.innerHTML =  tickets[index];


//4.
const avg = (tickets.map(e => e.reduce((a,b) => a +b)).reduce((a,b) => a +b) / (cnt * 5));
task4.innerHTML =  avg.toFixed(2);

//5.
const frequency = []
for( let i =0; i <= 90; i++)
{
    frequency.push(0);   
}

tickets.forEach(array => {
    array.forEach(number =>{
        frequency[number]++;
    })
});

let max = 0;
let maxIndex;
for(let i = 0; i < frequency.length; i++)
{
    if(max < frequency[i])
    {
        max = frequency[i]
        maxIndex = i
    }
}

task5.innerHTML =  maxIndex;

