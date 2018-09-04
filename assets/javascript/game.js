

var player = {
    name: "Mike",
    age: 0,
    mistakes: 5,
    assignedWordlist: ['bad','good','ugly','from','pizza','shoes','pants'],
    assignedWord: '',
    assignedWordArray: [''],
    lettersAlreadyGuessed: [''],
    guessedLetter: '',
    hangman: [''],
    hangmanString: '',
    numGamesPlayed: 0,
    NumOfGuesses: 0,
    NumOfWins: 0,
    NumOfLosses: 0,
    temp: '',
    assigningAWord: function () { 
        //debugger;
        //This method assignes the word to random word to be guessed
        //1.reset number of mitakes variable
        this.mistakes = 5;
        //2.reset hangman variabl
        this.hangman = [''];
        //3.choose a random word from the array called assignedWordlist
        this.assignedWord = this.assignedWordlist[Math.floor(Math.random() * (this.assignedWordlist.length -1))];
        
        //5.if the random word from our array is the same as last word, than re-run random
        if (this.numGamesPlayed > 0){
            if (this.temp === this.assignedWord){
            this.assignedWord = this.assignedWordlist[Math.floor(Math.random() * (this.assignedWordlist.length))];
            };
            this.lettersAlreadyGuessed = [''];
        };
        
        //4.pass the assigned Word to varable temp, and increment numGamesPlayed variable 
        this.temp = this.assignedWord;
        this.numGamesPlayed++;

        //6. for loop to assign "_" place holders to each position of the hangman array
        for (var i = 0; i < this.assignedWord.length; i++) {
            this.hangman[i] = '_';
        };
        this.hangmanString = this.hangman.join(' ');
        //7.show the hangman word variables (including underline placeholders), letters player has already guessed, enable the input text box for player to place their guesses, number of wins and losses.
        document.getElementById('hangMan').innerText = this.hangmanString;
        document.getElementById('guessedLetters').innerText= "Already guessed: " + this.lettersAlreadyGuessed;
        document.getElementById('playerInput').disabled = false;
        document.getElementById('youWin').innerText = '';
        document.getElementById('GamesWon').innerText= "win's: " + this.NumOfWins;
        document.getElementById('GamesLost').innerText= "Losses: " + this.NumOfLosses;
        document.getElementById(tempId).setAttribute('id','leftbox');
        tempId = 'leftbox';
        //8.return statment getting us back to the DOM so we could start playing
        return document.getElementById('numberOfInfractions').innerText = 'Chances left: ' + this.mistakes + '.';
    },




    compareWord: function (playerInput) {
        debugger;
        //This method takes in the players guessed letter, compares it, makes updates where necessary and prints out status to the game
        //9.taken in the players guess and assign it to variable guessedLetter 
        this.guessedLetter = document.getElementById('playerInput').value;
        //9-1.make sure it's the first time this letter is beign guessed; otherwise leave function and go back so player can make another guess.
        for (var i = 0;i<this.lettersAlreadyGuessed.length;i++){
            if (this.lettersAlreadyGuessed[i] === this.guessedLetter){
                return document.getElementById('playerInput').value=''; 
            };
        };
        //10.we are pushing the letter which our players has guessed into an array for storage 
        this.lettersAlreadyGuessed.push(this.guessedLetter);
        //11.since push takes up next available slot of the array, we have to delete the first empty slot which was defined during the initiation of the array using the shift function
        if (this.lettersAlreadyGuessed[0] === ''){
            this.lettersAlreadyGuessed.shift();
        };
        //12.starting comparison; below "if" statement checks as to whether the letter our player guessed exists in his/her assigned word.  If the letter does not exist we are sent to the else statement 14.
        if (this.assignedWord.includes(this.guessedLetter) === true) {
        //13.find out which position of the assigned string (word) the player guessed letter belongs to startign at position 0
            for (var i=0; i < this.assignedWord.length;i++) {
                    //13-1.if current postion i matches the same letter that player has guessed enter the if statement and proceed to 13-2; otherwise increment i and check the next character position in the array using below if statment 
                    if (this.guessedLetter === this.assignedWord.charAt(i)) {
                        document.getElementById(tempId).setAttribute('id','rightAnswer')
                        tempId = 'rightAnswer';
                        //13-2. assign the guessed letter from assignedWord position i to the hangman array  position i
                        this.hangman[i] = this.guessedLetter;  
                        //13-3.joing the array hangman into a global string variable called arrayWithOutSperator, so we can remove the commas "," when passing it back to it's block in HTML.
                        //13-4.clear any pre-existing values from the input block in HMTL
                        document.getElementById('playerInput').value='';              
                        //13-5.print the new string of correctly guessed letters and underscore place holders in HTML.
                        this.hangmanString = this.hangman.join(' ');
                        document.getElementById('hangMan').innerText = this.hangmanString;
                        this.hangmanString = this.hangman.join('');
                        //13-6.compare what's been guessed so far to see if player has won, update number of wins variable and inform player on the DOM. 
                        if (this.hangmanString === this.assignedWord){
                            document.getElementById('playerInput').disabled = true;
                            this.NumOfWins++;
                            document.getElementById(tempId).setAttribute('id','winner');
                            tempId = 'winner';
                            return document.getElementById('GamesWon').innerText = "win's: " + this.NumOfWins;
                            

                        };
                    };                      
            } ;         

        } 
        //14.since the guessed letter does not exist in the assigned word take below actions
        else {
                //debugger;                    
                    //14-1. Decrease the number of chances player has left and give him audio warning :).
                    this.mistakes--;
                    if(this.mistakes === 4){
                        document.getElementById('firstWrong').play();
                        document.getElementById(tempId).setAttribute('id','firstWrongImg');
                        tempId = 'firstWrongImg';
                    }
                    if(this.mistakes === 3){
                        document.getElementById('secondWrong').play();
                        document.getElementById(tempId).setAttribute('id','secondWrongImg');
                        tempId = 'secondWrongImg';
                    }
                    if(this.mistakes === 2){
                        document.getElementById('thirdWrong').play();
                        document.getElementById(tempId).setAttribute('id','thirdWrongImg');
                        tempId = 'thirdWrongImg';
                    }
                    if(this.mistakes === 1){
                        document.getElementById('fourthWrong').play();
                        document.getElementById(tempId).setAttribute('id','fourthWrongImg');
                        tempId ='fourthWrongImg';
                    }
                    if(this.mistakes === 0){
                        document.getElementById('fifthWrong').play();
                        document.getElementById(tempId).setAttribute('id','fifthWrongImg');
                        tempId = 'fifthWrongImg';
                    }

                    //14-2.if the player has made 5 mistakes notify them that they've lost the game, increment their total losses, and reset the array containing all the guessed letters on DOM.
                        if (this.mistakes < 0){
                            document.getElementById('sixthWrong').play();
                            document.getElementById(tempId).setAttribute('id','sixthWrongImg');
                            this.temp = 'leftbox';
                            document.getElementById('playerInput').value='';
                            this.NumOfLosses++;
                            document.getElementById('GamesLost').innerText = "losses: " + this.NumOfLosses;
                            document.getElementById('playerInput').disabled = true;
                            document.getElementById('guessedLetters').innerText= "Letters already guessed: " + this.lettersAlreadyGuessed;
                            return document.getElementById('numberOfInfractions').innerText = "You're finished in this town!"
                        }
                    //14-3.clear any pre-existing values and update the number of chances they have on the DOM.  
                    document.getElementById('playerInput').value=''; 
                    document.getElementById('numberOfInfractions').innerText = 'Chances left: ' + this.mistakes + '.'; 
                    
        };

        //15.update the letters they've already guessed
        document.getElementById('guessedLetters').innerText= "Already guessed: " + this.lettersAlreadyGuessed;
    },
};

var tempId = 'leftbox';

//disable the input text box, until they click the start game button
//document.getElementById('playerInput').disabled = true;

