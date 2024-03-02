const table = document.querySelector('table');
let episodeCount = 0;
let currentTr;

episodes.forEach(episode => {
    if (episodeCount === 0 || episodeCount % 4 === 0) {
        currentTr = document.createElement("tr");
        table.appendChild(currentTr);
    }

    const td = document.createElement("td");
    const newDiv = document.createElement("div");
    newDiv.style.display = "flex";
    newDiv.style.flexDirection = "column";
    newDiv.style.alignItems = "center";

    const img = document.createElement("img");
    img.src = episode.image.medium;
    img.alt = episode.name;
    img.style.width = "100%";
    img.style.height = "auto";

    const name = document.createElement("p");
    name.textContent = (episodeCount+1) + " - " + episode.name;

    newDiv.appendChild(img);
    newDiv.appendChild(name);

    td.appendChild(newDiv);
    currentTr.appendChild(td);

    episodeCount++;
});

let cells = document.querySelectorAll("td")

cells.forEach(function(cell){
    cell.addEventListener("click", function(){
        let image = cell.querySelector("img");
        image.style.filter = "grayscale(100%)";
        let paragraph = cell.querySelector("p");
        paragraph.style.backgroundColor = "rgb(143, 188, 143)";
    })
})