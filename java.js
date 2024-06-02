
// 4 verschillende victory sounds die random afspelen wanneer je wint door de array
const victorySound = ['sound/victory.mp3', 'sound/victory2.mp3', 'sound/victory3.mp3', 'sound/victory4.mp3']; // link victorysound: https://pixabay.com/sound-effects/search/victory/
const gameoverSound = new Audio('sound/gameoversound.mp3'); // link sound: https://www.101soundboards.com/boards/76930-lebron-james-tts-computer-ai-voice (zelf gemaakt met ai)

// Alle id's die ik oproep vanaf html
const nameInput = document.getElementById('nameInput');
const confirm = document.getElementById('confirm');
const startscherm = document.getElementById('startscherm');
const victoryscherm = document.getElementById('victoryscherm');
const victorytekst = document.getElementById('victorytekst');
const healthBarLeft = document.getElementById('health-bar-left');
const healthBarRight = document.getElementById('health-bar-right');
const basketballerfoto = document.getElementById('basketballer1'); // basketballer1 link: https://giphy.com/stickers/niketoronto-nba-2WH6P8Z2yYbarCFLl8
const trainKnop = document.getElementById('train');
const cooldownMessage = document.getElementById('cooldown-message');

// Dit geeft aan hoeveel de healthbar naar beneden en omhoog gaat
const decreaseRate = 1.5; 
const increaseAmount = 5; 

const minHealth = 0; // minimale health 

let maxHealth = 100; // maximale health
let audio; // Variabele voor audio dingen

let healthLeft = 20; // Dit is hoeveel health de linker bar mee begint
let healthRight = 5; // en dit is hoeveel health de rechter bar mee begint

let victoryPlayed = false; // Deze houdt bij of de victory sound afgespeeld wordt en dan gaat ie dus op true als ie afgespeeld wordt.

let canIncrease = true; // Deze geeft aan of de linker healthbar omhoog kan ofniet, deze gaat op false als de cooldown actief is (hulp van Diego)

// Deze functie stelt de hoogte in op basis van de waarde van healthright en left (Hulp van chatgpt. Prompt: I want to make a vertical healthbar that 
// goes op when I click on a button, but slowly goes down if I don't click on it)

function updateHealthBar() {
    healthBarLeft.style.height = `${healthLeft}%`;
    healthBarRight.style.height = `${healthRight}%`;
    console.log(canIncrease);
}


// Functie om ervoor te zorgen dat allebij de healthbars langzaam naar beneden gaan als er niet wordt geklikt.
function decreaseHealth() {
    if (healthLeft > minHealth && healthLeft < maxHealth) { 
        healthLeft = Math.max(minHealth, healthLeft - decreaseRate); // math.max zorgt ervoor dat de nieuwe waarde van health left nooit lager is dan minHealth
    } else if (healthLeft === minHealth) {  // Als healthLeft gelijk staat aan minHealth dan veranderd de basketballerfoto in de game over foto
        basketballerfoto.src = 'images/gameOver.png'; // Link foto: https://www.pngmart.com/image/287293
        gameoverSound.play(); // Er gaat ook een geluid af als healthLeft minHealth is
    }
    
    // Hier geld hetzelfde voor de rechter bar 
    // Ik had aan chatgpt gevraagd: "How do I make another healthbar on the right side of the screen. it has to be exactly the same as the other healthbar". Om te kijken hoe hij dat zou doen, want ik had alles gecopy paste maar dat werkte niet helemaal
    if (healthRight > minHealth && healthRight < maxHealth) {
        healthRight = Math.max(minHealth, healthRight - 10); //Hier gaat de bar alleen met meer decrease rate omlaag 

    } else if (healthRight == maxHealth || healthRight > maxHealth) {
        basketballerfoto.src = 'images/sporterinjuredcopy.png' // Als de rechter bar op maxhhealth komt dan veranderd basketballer1 naar sporterinjuredcopy. chat gpt prompt: "I want to change basketballer.png to LeBron-james.png when the health bar reaches 100. How do i do that? with explanation"
        // best makkelijk en daarna zelfs andere mensen geholpen die hetzelfde wilden
        // Link sporterinjuredcopy: https://www.svgrepo.com/svg/50607/injury

        cooldownMessage.style.display = "block"; 
        canIncrease = false; // Bij dit stukje heeft diego mij geholpen, omdat het mij niet lukte om het stoppen van omhoog gaan van de andere bar te stoppen.
        healthRight = minHealth;

        setTimeout(function () { 
            cooldownMessage.style.display = "none"; // Na dat de timout van 5 seconden over is gaan de basketbalfoto weer terug naar de normale gif en gaat het cooldown bericht weg
            canIncrease = true;
            basketballerfoto.src = 'images/basketbalgiffie.gif' 
        }, 5000);

    }
    updateHealthBar(); // Dit zorgt ervoor dat gezondheidsbalken weer bijgewerkt worden
}

// Functie om de bar omhoog te laten gaan als je op de button "trainen klikt"
function increaseHealth() {
    if (canIncrease === true) {

        if (healthLeft < maxHealth) {
            healthLeft = Math.min(maxHealth, healthLeft + Math.floor(Math.random() * 8));

            if (healthLeft === maxHealth && !victoryPlayed) { // Als health max is gaat er dus een sound spelen. 
                basketballerfoto.src = 'images/lebronjamesgif.gif'; // link: https://giphy.com/stickers/SportsManias-nba-lebron-james-stomp-Rii3sk0WkevL1Y8tEn
                audio = new Audio(victorySound[Math.floor(Math.random() * victorySound.length)]); // Dit zorgt ervoor dat er een van de 4 victory sounds random worden afgespeeld
                audio.play();
                victoryPlayed = true; // Set flag to true to indicate victory sound has been played
                victoryscherm.style.display = "block";
                victorytekst.textContent =  "je hebt gewonnen!";
            }
        }
        if (healthRight < maxHealth) {
            healthRight = Math.min(maxHealth, healthRight + 10);
        }
    }
    updateHealthBar();
}

// Dit zorgt ervoor dat de balk begint te dalen als je de pagina opent
updateHealthBar();
setInterval(decreaseHealth, 1000);

trainKnop.addEventListener('click', increaseHealth);

// Nba logo foto link: https://freebiesupply.com/logos/nba-logo/
// fav icon link: https://knowyourmeme.com/memes/lebron-james-you-are-my-sunshine-edits

// Heb ik veel gebruik gemaakt van https://www.w3schools.com/jsref/met_audio_play.asp 