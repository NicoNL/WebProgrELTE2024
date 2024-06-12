const amountSpan = document.querySelector("#amount");
const banknoteContainer = document.querySelector("#banknotes");
const table = document.querySelector("tbody");
const select = document.querySelector("select");
const transferButton = document.querySelector("button");

table.innerHTML = "";
const notes = document.querySelectorAll("#banknotes div");

banknoteContainer.addEventListener("click", (event) => {
  if (event.target.tagName == "IMG") {
    const value = event.target.getAttribute("data-value");
    amountSpan.textContent = parseInt(amountSpan.textContent) + parseInt(value);
  }
});

transferButton.addEventListener("click", () => {
  let money = parseInt(amountSpan.textContent);
  let index = select.selectedIndex;
  let selectedValue = select.value;
  let rows = table.querySelectorAll("tr");
  let cells = rows[2].querySelectorAll("td");
  for (let i = 0; i < cells.length; i++) {
    if (i == index) {
      if (money + parseInt(cells[i].innerText) < parseInt(selectedValue)) {
        let sum = parseInt(cells[i].innerText) + money;
        cells[i].innerText = sum;
      } else {
        cells[i].classList.add("overpaid");
        let sum = parseInt(cells[i].innerText) + money;
        cells[i].innerText = sum;
      }
    }
  }
  amountSpan.textContent = 0;
});

table.addEventListener("click", (event) => {
  if (event.target.tagName == "IMG") {
    select.selectedIndex = event.target.getAttribute("data-value");
  }
});

peopleInfo = [];

people.forEach((person) => {
  var option = document.createElement("option");
  option.text = person.name;
  option.value = person.to_pay;
  select.appendChild(option);
  const personInfo = {
    name: person.name,
    photo: person.photo,
    paid: person.paid,
    to_pay: person.to_pay,
  };
  peopleInfo.push(personInfo);
});

for (let i = 0; i < 4; i++) {
  switch (i) {
    case 0:
      var row = document.createElement("tr");
      peopleInfo.forEach((person) => {
        var cell = document.createElement("td");
        cell.textContent = person.name;
        row.appendChild(cell);
      });
      table.appendChild(row);
      break;
    case 1:
      var row = document.createElement("tr");
      let i = 0;
      peopleInfo.forEach((person) => {
        var cell = document.createElement("td");
        var img = document.createElement("img");
        img.setAttribute("data-value", i);
        img.src = "img/" + person.photo;
        cell.appendChild(img);
        row.appendChild(cell);
        i++;
      });
      table.appendChild(row);
      break;
    case 2:
      var row = document.createElement("tr");
      peopleInfo.forEach((person) => {
        var cell = document.createElement("td");
        cell.textContent = person.paid;
        row.appendChild(cell);
      });
      table.appendChild(row);
      break;
    case 3:
      var row = document.createElement("tr");
      peopleInfo.forEach((person) => {
        var cell = document.createElement("td");
        cell.textContent = person.to_pay;
        row.appendChild(cell);
      });
      table.appendChild(row);
      break;
  }
}
