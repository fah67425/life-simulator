let actiontimer;
const items = {
    apple: {
        price: 5,
        category: "food",
        description: "a fresh and edible golden apple",
        hunger: 20
    },

    bread: {
        price: 8,
        category: "food",
        description: "a loaf of bread.",
        hunger: 35
    },

    water_bottle: {
        price: 3,
        category: "food",
        description: "a bottle of fresh water.",
        hunger: 10
    },

    phone: {
        price: 100,
        category: "tool",
        description: "a useful nokia phone.",
        happiness: 10
    },

    candy: {
        price: 2,
        category: "halloween",
        description: "a sweet halloween candy.",
        hunger: 8,
        happiness: 5
    }
};

//let halloweenvisitedday = character.day;
//let halloweenvisitedhouses = [];

let character = {
    name: "",
    gender: "",
    age: 18,
    money: 100,
    hunger: 100,
    energy: 100,
    happiness: 100,
    day: 1,
    hour:8,
    minute: 0,

    inventory:[],
    inventorycapacity: 10
    
};

let halloweenvisitedday = character.day;
let halloweenvisitedhouses = [];

let iseating = false;

function createcharacter() {
    let name = document.getElementById("nameinput").value.trim();
    let gender = document.getElementById("genderinput").value;
    let age = Number(document.getElementById("ageinput").value);

    if (name === "") {
        alert("Enter a name");
        return;
    }
    character.name = name;
    character.gender = gender;
    character.age = age;

    document.getElementById("charactercreation").style.display = "none";
    document.getElementById("game").style.display = "block";

    updategame();

    document.getElementById("status").textContent = "your life has started.";
}

function advancetime(minutes) {
    let oldhour = character.hour;

    character.minute += minutes;

    while (character.minute >= 60) {
        character.minute -= 60;
        character.hour++;
        updateneeds();
    }

    if (character.hour >= 24) {
        character.hour -= 24;
        character.day++;
    }
    updatetime();
}

function updateneeds() {
    character.hunger -= 5;
    character.happiness -= 2;
    character.energy -= 3;

    if (character.hunger < 0) {
        character.hunger = 0;
    }
    if (character.happiness < 0) {
        character.happiness = 0;
    }
    if (character.energy < 0) {
        character.energy = 0;
    }
}

function updatetime() {
    let hour = character.hour;
    let minute = character.minute;

    let period = "AM"
    if (hour >= 12) period = "PM";

    let displayhour = hour;
    if (displayhour === 0) {
        displayhour = 12;
    } else if (displayhour > 12) {
        displayhour -= 12;
    }

    let displayminutes = minute.toString().padStart(2, "0");

    document.getElementById("daydisplay").textContent = "day " + character.day;
    document.getElementById("timedisplay").textContent = displayhour + ":" + displayminutes + " " + period;

    let periodtext;

    if (hour >= 5 && hour < 12) {
        periodtext = "morning";
    } else if (hour >= 12 && hour < 17) {
        periodtext = "afternoon";
    } else if (hour >= 17 && hour < 21) {
        periodtext = "evening";
    } else {
        periodtext = "night";
    }

    document.getElementById("perioddisplay").textContent = periodtext;

    updatehalloween();
    checklifeevent();
}

function checkneeds() {
    if (character.hunger <= 20) {
        document.getElementById("status").textContent = "you're getting really hungry! go eat some food";
        return;
    }
    if (character.energy <= 20) {
        document.getElementById("status").textContent = "you're exhausted! go rest";
        return;
    }
    if (character.happiness <= 20) {
        document.getElementById("status").textContent = "you're feeling unhappy :( just relax"
    }
}

function updategame() {
    document.getElementById("playername").textContent = character.name;
    document.getElementById("cardname").textContent = character.name;
    document.getElementById("playerinfo").textContent = "age " + character.age + " | " + character.gender;
    document.getElementById("money").textContent = character.money; 
    document.getElementById("hunger").textContent = character.hunger;
    document.getElementById("energy").textContent = character.energy;
    document.getElementById("happiness").textContent = character.happiness;

    updatetime();
    updateinventory();
}

function eat() {
    if (iseating) {
        return;
    }

    if (character.money < 10) {
        document.getElementById("status").textContent = "you dont have enough money for food.";
        return;
    }

    character.money -= 10;

    iseating = true;
    const food = document.getElementById("eatingfood");
    const charactervisual = document.querySelector(".charactervisual");
    const eatingtext = document.getElementById("eatingtext");

    food.classList.remove("eatanimation")
    void food.offsetWidth;
    food.classList.add("eatanimation");
    charactervisual.classList.add("charactereating");
    eatingtext.textContent = "eating..........";

    setTimeout(() => {
        character.hunger += 25;

        if (character.hunger > 100) {
            character.hunger = 100;
        }

        charactervisual.classList.remove("charactereating");
        eatingtext.textContent = "you finished your meal!";

        setTimeout(() => {
            eatingtext.textContent = "";
        }, 1200)

        iseating = false;

        updategame();
        checkneeds();
    }, 850);

    advancetime(30);

    document.getElementById("status").textContent = `${character.name} ate a meal. hunger restored.`;
    //checkneeds();
    //updategame();
}

function sleep() {
    playactionanimation("sleeping", 4000);

    character.energy += 35;

    if (character.energy > 100) {
        character.energy = 100;
    }

    character.hunger -= 10;
    advancetime(480);

    if (character.hunger < 0) {
        character.hunger = 0;
    }

    document.getElementById("status").textContent = "you slept and recovered energy.";
    checkneeds();
    updategame();
}

function work() {
    playactionanimation("working", 1200);

    if (character.energy < 20) {
        document.getElementById("status").textContent = "you're too tired to work. get some sleep!";
        return;
    }

    character.money += 30;
    character.energy -= 20;
    character.hunger -= 15;
    character.happiness -= 5;
    advancetime(120);

    if (character.hunger < 0) character.hunger = 0;
    if (character.happiness < 0) character.happiness = 0;

    document.getElementById("status").textContent = "you worked and earned $30";
    checkneeds();
    updategame();
}

function relax() {
    playactionanimation("relaxing", 1200);

    character.hunger -=5;
    character.happiness += 20;
    advancetime(60);

    if (character.energy < 0) character.energy = 0;
    if (character.happiness > 100) character.happiness = 100;

    document.getElementById("status").textContent = "you relaxed and feel better!";
    checkneeds();
    updategame();
}

function updateinventory() {
    let inventorylist = document.getElementById("inventorylist");

    inventorylist.innerHTML = "";

    if (character.inventory.length === 0) {
        inventorylist.innerHTML = "<p>your inventory is empty.</p>";
        return;
    }
    
    let itemcounts = {};
    
    character.inventory.forEach(function(item) {
        if (itemcounts[item]) {
            itemcounts[item]++;
        } else {
            itemcounts[item] = 1;
        }
    });

    for(let item in itemcounts) {
        let itemdata = items[item];

        let itemelement = document.createElement("div");

        itemelement.className = "inventoryitem";

        let information = document.createElement("div");
        let name = document.createElement("strong");

        name.textContent = item + " x" + itemcounts[item];

        let category = document.createElement("small");

        category.textContent = itemdata.category;

        let description = document.createElement("p");

        description.textContent = itemdata.description;

        let usebutton = document.createElement("button");
        usebutton.textContent = "USE";
        usebutton.onclick = function () {
            useitem(item);
        }

        information.appendChild(name);
        information.appendChild(category);
        information.appendChild(description);

        itemelement.appendChild(information);
        itemelement.appendChild(usebutton);
        inventorylist.appendChild(itemelement);
    }
}

function useitem(item) {
    let itemindex = character.inventory.indexOf(item);

    if (itemindex === -1) {
        return;
    }

    let itemdata = items[item];
    if (itemdata.hunger) {
        character.hunger += itemdata.hunger;

        if(character.hunger > 100) {
            character.hunger = 100;
        }
    }

    if (itemdata.energy) {
        character.energy += itemdata.energy;

        if (character.energy > 100) {
            character.energy = 100;
        }
    }

    if (itemdata.happiness) {
        character.happiness += itemdata.happiness;

        if (character.happiness > 100) {
            character.happiness = 100;
        }
    }

    character.inventory.splice(itemindex, 1);

    document.getElementById("status").textContent = "you used " + item + ".";
    updategame();
    updateinventory();
}

function additem(item) {
    if (!items[item]) {
        console.log("item doesnt exist!");
        return;
    }

    if (character.inventory.length >= character.inventorycapacity) {
        document.getElementById("status").textContent = "your backpack is full!";
        return;
    }

    character.inventory.push(item);

    document.getElementById("status").textContent = item + " was added to your backpack.";

    updateinventory();
}

additem("bread");
additem("bread");
additem("bread");
additem("water_bottle");
additem("water_bottle");
additem("apple");

function updatehalloween() {
    const area = document.getElementById("halloweenarea");

    if (halloweenvisitedday !== character.day) {
        halloweenvisitedday = character.day;
        halloweenvisitedhouses = [];

        for (let i = 1; i <= 3; i++) {
            document.getElementById("house" + i).disabled = false;
        }
    }

    if (character.hour >= 18) {
        area.style.display = "block";
        document.body.classList.add("halloweennight");
    } else {
        area.style.display = "none";
        document.body.classList.remove("halloweennight");
    }
}

function visithouse(number) {
    if (character.hour < 18) {
        return;
    }

    if (halloweenvisitedhouses.includes(number)) {
        return;
    }

    halloweenvisitedhouses.push(number);

    document.getElementById("house" + number).disabled = true;
    const message = document.getElementById("halloweenmessage");
    const reward = Math.random();

    if (reward < 0.7) {
        additem("candy");
        message.textContent = "you recieved some candy!";
    } else {
        character.money += 20;
        message.textContent = "you recieved $20!";
    }

    if (halloweenvisitedhouses.length === 3) {
        character.money += 50;
        message.textContent += " all houses visited! you got $50!";
    }
    updategame();
}

function playactionanimation(action, duration) {
    const charactervisual = document.querySelector(".charactervisual");
    const actiontext = document.getElementById("actiontext");

    clearTimeout(actiontimer);

    charactervisual.classList.remove(
        "characterworking",
        "characterrelaxing",
        "charactersleeping"
    );
    charactervisual.querySelectorAll(".sleepsymbol").forEach(s => s.remove());

    void charactervisual.offsetWidth;
    charactervisual.classList.add("character" + action);

    const messages = {
        working: "working hard.......",
        relaxing: "taking a break.......",
        sleeping: "sleeping......"
    };
    actiontext.textContent = messages[action];

    if (action === "sleeping") {
        const symbol = document.createElement("span");
        symbol.className = "sleepsymbol";
        symbol.textContent = "Z";
        charactervisual.appendChild(symbol);
    }

    actiontimer = setTimeout(() => {
        charactervisual.classList.remove("character" + action);
        charactervisual.querySelectorAll(".sleepsymbol").forEach(s => s.remove());
        actiontext.textContent = "";
    }, duration);
}

let lastlifeevent = "";
let activelifeevent = null;

const lifeevent = [
    {
        title: "a neighbour needs help!",
        description: "your neighbour asks you to help carry some boxes.",
        choices : [
            {
                label: "help them",
                result: "your neighbour thanks you and pays you $25.",
                effects: {
                    money: 25,
                    energy: -10,
                    happiness: 8
                }
            },
            {
                label: "decline",
                result: "you decide to continue with your day.",
                effects: {}
            }
        ]
    },
    {
        title: "you found a wallet",
        description: "you find a wallet on the pavement. it contains $67.  SIX SEVEN",
        choices: [
            {
                label: "return it",
                result: "the owner thanks you! you feel good about helping.",
                effects: {
                    happiness: 15
                }
            },
            {
                label: "keep $67 |SIX SEVENN",
                result: "you take $67 from the stolen wallet",
                effects: {
                    money: 67,
                    happiness: -8
                }
            }
        ]
    },
    {
        title:  "a food vendor",
        description: "a food vendor offers you a cheap meal",
        choices: [
            {
                label: "buy for $5",
                result: "you enjoy a warm meal",
                effects: {
                    money: -5,
                    hunger: 20,
                    happiness: 5
                }
            },
            {
                label: "save money and walk away",
                result: "you decide to save your money",
                effects: {}
            }
        ]
    },
    {
        title: "a stray cat",
        description: "a friendly stray cat approaches you.",
        choices:[
            {
                label: "pet the cat",
                result: "the cat stays with you for a while. you feel happy!",
                effects: {
                    happiness: 15
                }
            },
            {
                label: "ignore it",
                result: "you continue walking",
                effects: {}
            }
        ]
    },
    {
        title: "unexpected rain",
        description: "heavy rain suddenly starts falling.",
        choices: [
            {
                label: "find shelter",
                result: "you wait under a shelter and recover some energy!",
                effects: {
                    energy: 10
                }
            },
            {
                label: "keep walking",
                result: "you sad because got soaked in the rain :(",
                effects: {
                    happiness: -8,
                    energy: -5
                }
            }
        ]
    }
]

function checklifeevent() {
    const currenttime = character.day + "-" + character.hour;

    if (currenttime === lastlifeevent) {
        return;
    }

    lastlifeevent = currenttime;

    if (activelifeevent !== null) {
        return;
    }

    if (Math.random() > 0.25) {
        return;
    }

    const randomindex = Math.floor(
        Math.random() * lifeevent.length
    );

    activelifeevent = lifeevent[randomindex];

    const panel = document.getElementById("lifeevent");
    document.getElementById("eventdescription").textContent = activelifeevent.description;
    const choices = document.getElementById("eventchoices");

    choices.innerHTML = "";

    activelifeevent.choices.forEach((choice, index) => {
        const button = document.createElement("button");

        button.textContent = choice.label;

        button.onclick = function() {
            resolvelifeevent(index);
        };
        choices.appendChild(button);
    });
    panel.style.display = "block";
}

function resolvelifeevent(index) {
    if (activelifeevent === null) {
        return;
    }

    const choice = activelifeevent.choices[index];

    if (!choice) {
        return;
    }
    const effect = choice.effects;

    for (const stat in effect) {
        character[stat] += effect[stat];
    }

    character.money = Math.max(0, character.money);

    character.hunger = Math.max(
        0, Math.min(100,character.hunger)
    );

    character.happiness = Math.max(
        0, Math.min(100,character.happiness)
    );

    character.energy = Math.max(
        0, Math.min(100,character.energy)
    );

    document.getElementById("eventdescription").textContent = choice.result;
    document.getElementById("eventchoices").innerHTML = "<p>event completed.</p>";
    activelifeevent = null;

    updategame();
    checkneeds();
}