(() => {

    const hangmanimages = [
        "assets/images-hangman/hangman01.jpg",
        "assets/images-hangman/hangman02.jpg",
        "assets/images-hangman/hangman03.jpg",
        "assets/images-hangman/hangman04.jpg",
        "assets/images-hangman/hangman05.jpg",
        "assets/images-hangman/hangman06.jpg",
        "assets/images-hangman/hangman07.jpg",
        "assets/images-hangman/hangman08.jpg",
        "assets/images-hangman/hangman09.jpg",
        "assets/images-hangman/hangman10.jpg",
        "assets/images-hangman/hangman11.jpg"
    ]

    const guessableWords = [
        "stable",
        "middle",
        "pencil",
        "puzzle",
        "animal",
        "anchor",
        "basket",
        "batman",
        "bowtie"
    
    ]
    let guessableWord, letter, lives;
    let count = 0 ;
    let imagecounter = 0;
    let guess = new Boolean;
    guess = false ;
    let shreddedWord = new Array;

    //creating table
    function tableCreation(guessableWord) {
    //console.log("imma make a table");
    const target = document.getElementById("target");

    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");
    
    let wordLength = guessableWord.length;
    //console.log("length of the word is "+wordLength);

   //create rows
    for (i = 0 ; i < 2 ; i++){
        let counter = 1 
        const row = document.createElement("tr");
        //create columns
        for (j = 0; j < wordLength ; j++) {
            const col = document.createElement("td");
            col.setAttribute("id", "row"+(i+1)+"col"+(j+1));
            //create numbers in first row
            if (i == 0) {
                col.innerText = j+1;
            }
            //add random letters in second row and a border
            else if (i == 1) {
                col.setAttribute("style", "border: 1px solid red;");
                let selector = Math.floor((Math.random()*2));
                console.log("selector is "+selector);
                if (selector == 1 && counter < 3) {
                    counter = counter + 1; 
                    //this is to avoid too much hints
                    //console.log("the counter is "+counter);
                    col.innerText = guessableWord[j];
                }
            }
            row.appendChild(col);        
        }
        tableBody.appendChild(row);
        
    }
    table.appendChild(tableBody);
    table.setAttribute("style", "border: 2px solid black;");
    target.appendChild(table);
    }

    function letterChecker (letter) {
       document.getElementById("run").disabled = true;
       guess = false; 
       console.log("letterchecker is running");
            if (letter == null) 
            {
                letter = prompt ("Please guess a letter");
            }
            else {
                for (i = 0; i<shreddedWord.length; i++){
                    let tempWord = shreddedWord[i];
                    if (tempWord == letter){
                        console.log("you guessed right");
                        guess = true ;
                        //the letters corresponding to the index should be made visible
                        makeVisible(i);
                     }
                }                
                if (guess == false)
                {
                    console.log("you guessed wrong");
                    lives = lives-1;
                    imagecounter+=1;
                    const followup = hangmanimages[imagecounter];
                    const img = document.getElementById("image");
                    img.setAttribute("src", followup);
                    img.setAttribute("height","350px");
                    }
                else
                {
                    count+=1;

                    }    
               
            }
            alert ("You have "+lives+" lives left."); 
            stopLight(count);
           
    }; 

    function stopLight(count){
        console.log("stoplight is running")    
        if (count < (guessableWord.length)-2 && lives !== 0){
            letter = prompt ("Give another letter")            
            letterChecker(letter);
                        }
    }

    function makeVisible(i){
            console.log("makevisible function is running");
            var toShow = shreddedWord[i];
            var pickCol = "row2col"+(i+1);
            document.getElementById(pickCol).innerText = toShow;
    };

    document.getElementById("run").addEventListener( "click", () => {
        //setup must start with first image, select word and generate the table
        //First - the image
        //----------------
        const start = hangmanimages[0];
        const img = document.getElementById("image");
        img.setAttribute("src", start);
        img.setAttribute("height","350px");

        //Second - the word
        //-----------------
        let wordSelect = Math.floor((Math.random()*9)+1);
        guessableWord = guessableWords[wordSelect];
        console.log(guessableWord);

        //Third - the table
        //-----------------
        tableCreation(guessableWord);
        letter = prompt ("Please guess a letter");
        console.log("The letter is "+letter);
        lives = 10;
        
        //Call the checker function as long as there are empty spaces in the table
        //Shred the guessableWord
        shreddedWord = guessableWord.split('');
        console.log(shreddedWord);
        letterChecker(letter);
        });

    window.onload = () => {
        document.getElementById("run").disabled = false;
    }
})();
//if I want to do this with buttons instead of prompt, I can always do it with a "onClick" attribute in my HTML. If after the = symbol you put the name of the function that the onClick should send something to, it will.
//In the example I saw it was onClick="GFG_click(this.id)", which sent the id of the <> to the function called GFG_click in the javascript
