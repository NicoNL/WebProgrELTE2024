let planets = [
    {"name": "P26-007", "info": "Friendly", "gate": "Destroyed"},
    {"name": "P2A-018", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P2A-270", "info": "Hostile", "gate": "Reachable"},
    {"name": "P2A-347", "info": "Hostile", "gate": "Reachable"},
    {"name": "P2A-463", "info": "Neutral", "gate": "Reachable"},
    {"name": "P2A-509", "info": "Hostile", "gate": "Reachable"},
    {"name": "P2C-257", "info": "Friendly", "gate": "Reachable"},
    {"name": "P2M-903", "info": "Hostile", "gate": "Reachable"},
    {"name": "P2R-866", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P2X-338", "info": "Hostile", "gate": "Reachable"},
    {"name": "P2X-374", "info": "Neutral", "gate": "Reachable"},
    {"name": "P2X-416", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P2X-555", "info": "Friendly", "gate": "Reachable"},
    {"name": "P2X-787", "info": "Friendly", "gate": "Reachable"},
    {"name": "P2X-885", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P2X-887", "info": "Hostile", "gate": "Reachable"},
    {"name": "P3A-194", "info": "Friendly", "gate": "Destroyed"},
    {"name": "P3C-117", "info": "Neutral", "gate": "Reachable"},
    {"name": "P3C-249", "info": "Neutral", "gate": "Destroyed"},
    {"name": "P3C-599", "info": "Friendly", "gate": "Destroyed"},
    {"name": "P3K-447", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3L-997", "info": "Friendly", "gate": "Reachable"},
    {"name": "P3M-736", "info": "Friendly", "gate": "Destroyed"},
    {"name": "P3R-112", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3R-118", "info": "Hostile", "gate": "Reachable"},
    {"name": "P3R-233", "info": "Hostile", "gate": "Reachable"},
    {"name": "P3R-272", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3R-636", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3S-114", "info": "Friendly", "gate": "Destroyed"},
    {"name": "P3S-452", "info": "Hostile", "gate": "Reachable"},
    {"name": "P3W-451", "info": "Hostile", "gate": "Destroyed"},
    {"name": "P3W-924", "info": "Hostile", "gate": "Reachable"},
    {"name": "P3X-116", "info": "Neutral", "gate": "Reachable"},
    {"name": "P3X-118", "info": "Friendly", "gate": "Destroyed"},
    {"name": "P3X-233", "info": "Neutral", "gate": "Reachable"},
    {"name": "P3X-234", "info": "Hostile", "gate": "Destroyed"},
    {"name": "P3X-289", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3X-298", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3X-367", "info": "Hostile", "gate": "Destroyed"},
    {"name": "P3X-403", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3X-421", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3X-439", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3X-447", "info": "Friendly", "gate": "Reachable"},
    {"name": "P3X-474", "info": "Hostile", "gate": "Reachable"},
    {"name": "P3X-562", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3X-584", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3X-595", "info": "Hostile", "gate": "Reachable"},
    {"name": "P3X-666", "info": "Hostile", "gate": "Reachable"},
    {"name": "P3X-729", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3X-744", "info": "Neutral", "gate": "Destroyed"},
    {"name": "P3X-775", "info": "Friendly", "gate": "Reachable"},
    {"name": "P3X-797", "info": "Friendly", "gate": "Reachable"},
    {"name": "P3X-8596", "info": "unknown", "gate": "Not visited yet"},
    {"name": "P3X-888", "info": "Hostile", "gate": "Destroyed"},
    {"name": "P3X-984", "info": "unknown", "gate": "Not visited yet"}
    ]

// 1. VISITED PLANETS
let visitedPlanets = planets.filter(e => e.gate !== "Not visited yet");
let planetsNames1 = visitedPlanets.map(e => e.name);

document.getElementById("d1").innerHTML = "<strong>Visted Planets:</strong> " + planetsNames1.join(" ");

// 2. NUMBER OF PLANETS TO VISIT
let noVisitedPlanets = planets.filter(e => e.gate == "Not visited yet");
document.getElementById("d2").innerHTML = "SG-1 needs to visit " + noVisitedPlanets.length + " planets";

//3. NUMBER OF FRIENDLY PLANETS

let friendlyPlanets = planets.filter(e => e.gate == "Reachable" && e.info == "Friendly");
let planetsNames2 = friendlyPlanets.map(e => e.name);
document.getElementById("d3").innerHTML = "<strong>Friendly Planets:</strong> " + planetsNames2.join(" ");





