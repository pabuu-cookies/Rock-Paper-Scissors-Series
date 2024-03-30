function AnotherRound(){
    location.reload();
}
function displayimages(choice, classname){
    if (choice == 'rock'){
        var button = document.getElementById('rock');
        if (classname == "player_images"){
            button.style.opacity = '0.5'; 
        }
        var image = document.createElement('img');
        image.src = 'rock.jpeg'; // Set the image source
        image.alt = 'Rock';
        image.classList.add(classname)
        document.body.appendChild(image);
    }
    else if (choice== 'paper'){
        var button = document.getElementById('paper');
        if (classname == "player_images"){
            button.style.opacity = '0.5'; 
        }
        var image = document.createElement('img');
        image.src = 'paper.jpeg'; // Set the image source
        image.alt = 'paper';
        image.classList.add(classname)
        document.body.appendChild(image);
    }
    else if (choice=='scissors'){
        var button = document.getElementById('scissors');
        if (classname == "player_images"){
            button.style.opacity = '0.5'; 
        }
        var image = document.createElement('img');
        image.src = 'scissors.png'; // Set the image source
        image.alt = 'scissors';
        image.classList.add(classname)
        document.body.appendChild(image);
    }
}
function throwConfetti(resultis){
    console.log('confetti falna diyena ');
    var canvas=document.querySelector('#confetti');
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
    console.log(canvas.width, canvas.height, window.innerWidth, innerHeight);
    var jsConfetti = new JSConfetti({ canvas });
    if (resultis =="It's a tie!"){
            jsConfetti.addConfetti({
                emojis: ['💫', '🌸'],
                emojiSize: 30,
                confettiNumber: 100,
            })
    }
    else if (resultis =="You Won!"){
            jsConfetti.addConfetti({
                emojis: ['✨','🎈'],
                emojiSize: 30,
                confettiNumber: 100,
            })
    }
    else if (resultis =='You Lost!'){
            jsConfetti.addConfetti({
                emojis: ['🤓','⚡'],
                emojiSize: 30,
                confettiNumber: 100, 
            })
    }
}    
function play(playerChoice) { 
    document.getElementById('rock').disabled = true;
    document.getElementById('paper').disabled = true;
    document.getElementById('scissors').disabled = true;   
    displayimages(playerChoice,'player_images');
    var choices = ['rock', 'paper', 'scissors'];
    var computerChoice = choices[Math.floor(Math.random() * choices.length)];
    displayimages(computerChoice,'computer_images');
        var result;
        if (playerChoice === computerChoice) {
            result = "It's a tie!";
        } else if (
            (playerChoice === 'rock' && computerChoice === 'scissors') ||
            (playerChoice === 'paper' && computerChoice === 'rock') ||
            (playerChoice === 'scissors' && computerChoice === 'paper')
        ) {
            result= "You Won!";
        } else {
            result = "You Lost!";
        }
        
        var audio = new Audio();
        if (result== "It's a tie!"){
            audio.src = 'gameTie.mp3';
        }
        else if(result== "You Won!"){
            audio.src = 'gameWin.mp3';
        }
        else if (result== "You Lost!"){
            audio.src = 'gameLose.mp3';
        }
        else{
            console.log('ASAMBHAV!');
        }
        audio.play();
        throwConfetti(result);

    var resultText = document.getElementById('result'); 
    resultText.textContent = result; 
    resultText.style.opacity = 1;
}