let grades = [22, 13, 26, 27, 28, 30, 30, 25, 17, 18, 21, 21, 25, 26]   

//First Point
let gradesA = grades.filter(grade => grade >= 24);
let f1_1 = document.querySelector("#f1-1");
f1_1.innerHTML = f1_1.innerHTML + "The grades with five are " + gradesA.length;

//Second Point
let sumOfGrades = 0;
grades.forEach(grade => {
    sumOfGrades += parseInt(grade);
});
let f1_2 = document.querySelector("#f1-2");
f1_2.innerHTML = f1_2.innerHTML + "The average of the class is " +(sumOfGrades/grades.length);

// Third Point
let failGrade = grades.every(grade => grade > 10);
let f1_3 = document.querySelector("#f1-3");
if(failGrade){
    f1_3.innerHTML = f1_3.innerHTML + " Yes, there was."
}
else{
    f1_3.innerHTML = f1_3.innerHTML + " No, there wasn't."    
}

//fourth Point
grades.forEach(grade => {
    grade += 3;
    console.log(grade)
})

//TABLE
// First Point
const rows = document.querySelector("#rows");
const cols = document.querySelector("#cols");
const generateButton = document.querySelector("#generate");
let table = document.querySelector("table")

generateButton.addEventListener("click",() =>{
    table.innerHTML = ""
    let cnt =0;
    for(let i = 0; i < rows.value; i++){
        let newRow = document.createElement("tr");
        for(let j = 0; j < cols.value; j++){
            let newColum = document.createElement("td");
            cnt++;
            newColum.innerText = cnt;
            newRow.appendChild(newColum);
        }
        table.appendChild(newRow);
    }
})




