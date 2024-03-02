const table = document.querySelector('table');
let episodeCount = 0;
let currentTr;

episodes.forEach(episode => {
    if (episodeCount === 0 || episodeCount % 4 === 0) {
        currentTr = document.createElement("tr");
        table.appendChild(currentTr);
    }

    const td = document.createElement("td");

    const img = document.createElement("img");
    img.src = episode.image.medium;
    img.alt = episode.name;

    let imgCaption = document.createElement('figcaption');
    imgCaption.innerHTML = (episodeCount+1) + " - " + episode.name;

    td.appendChild(img);
    td.appendChild(u=imgCaption);
    currentTr.appendChild(td);

    episodeCount++;
});

let cells = document.querySelectorAll("td")

cells.forEach(function(cell){
    cell.addEventListener("click", function(){
        let image = cell.querySelector("img");
        image.className = "viewed"
        let imgCaption = cell.querySelector("figcaption");
        imgCaption.className = "viewedCaption"
    })
})