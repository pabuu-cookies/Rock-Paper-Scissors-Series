const urlParams = new URLSearchParams(window.location.search);
    const totalrounds = urlParams.get('bestOf');
    console.log(totalrounds);
    if (totalrounds==3){
        document.getElementById,('bestofthree').disabled=true;
    }
    else if(totalrounds==5){
        document.getElementById('bestoffive').disabled=true;
    }
    else{
        console.log('3 ra 5 bahek aru value aaunaii mildaina ta ');
    }
    let roundsPlayed = 0;
    let playerWins = 0;
    let computerWins = 0;
    console.log('best of:', totalrounds,'played:', roundsPlayed);
    console.log('we are now at playing',totalrounds, 'having completed',roundsPlayed,'till now');
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
        roundsPlayed = roundsPlayed + 1;
        console.log('totalrounds:',totalrounds,'rounds:', roundsPlayed,'computer:', computerWins, 'player:', playerWins);
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
                result= "You won!";
                playerWins++;
            } else {
                result = "You lost!";
                computerWins++;
            }
        console.log('rounds:', roundsPlayed,'computer:', computerWins, 'player:', playerWins);
        if (roundsPlayed <= totalrounds){
            document.getElementById("tablebody").innerHTML=`
            <tr>
                <td>${roundsPlayed}</td>
                <td>${computerWins}</td>
                <td>${playerWins}</td>
            </tr>`;
            var resultText = document.getElementById('result'); 
            console.log('ek');
            resultText.textContent = result; 
            resultText.style.opacity = 1;
            if (roundsPlayed < totalrounds){
                setTimeout(function() {
                    document.getElementById('rock').disabled = false ;
                    document.getElementById('rock').style.opacity=1 ;
                    document.getElementById('paper').disabled = false ;
                    document.getElementById('paper').style.opacity=1;
                    document.getElementById('scissors').disabled = false ;
                    document.getElementById('scissors').style.opacity=1;
                    resultText.style.opacity = 0;
                    document.getElementById('dynamicText').style.opacity=1;
                    if ("vibrate" in navigator) {
                        navigator.vibrate(2000); 
                        console.log('vibration');// Vibrate for 200 milliseconds
                    } else {
                        console.log("Vibration not supported");
                    }
                    setTimeout(function(){
                        document.getElementById('dynamicText').style.opacity=0;
                        var elements = document.getElementsByClassName('player_images');
                        for (var i = 0; i < elements.length; i++) {
                            var element = elements[i];
                            element.parentNode.removeChild(element);
                        }
                        console.log('opacity, disabled haru chaliraxa ta ');
                        var elements = document.getElementsByClassName('computer_images');
                        for (var i = 0; i < elements.length; i++) {
                            var element = elements[i];
                            element.parentNode.removeChild(element); // Remove the element after the transition completes    
                        }
                    },1000);
                }, 1500);
            }
        }
        if (roundsPlayed== totalrounds){
            if (computerWins > playerWins){
                result = "You Lost!";
            }
            else if (computerWins < playerWins){
                result = "You Won!";
            }
            else if (computerWins == playerWins){
                result = "It's a tie!";
            }
            setTimeout(function(){
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
                console.log('ek');
                resultText.textContent = result; 
                resultText.style.opacity = 1;
            }, 2100);
        }
        else if (totalrounds < roundsPlayed){
            console.log('yo ta aaunaii nahuney chijj');
        } 
    }