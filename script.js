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

//creating table
function tableCreation(guessableWord) {
    //console.log("imma make a table");
    const target = document.getElementById("target");

    const table = document.createElement("table");
    const tableBody = document.createElement("tbody");
    
    let wordLength = guessableWord.length;
    console.log("length of the word is "+wordLength);

   //create rows
    for (i = 0 ; i < 2 ; i++){
        let counter = 1 
        const row = document.createElement("tr");
        //create columns
        for (j = 0; j < wordLength ; j++) {
            const col = document.createElement("td");
            col.setAttribute("id", "row"+i+"col"+j);
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
                    console.log("the counter is "+counter);
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



document.getElementById("run").addEventListener( "click", () => {
    //setup must start with first image, select word and generate the table
    //First - the image
    //----------------
    const start = hangmanimages[0];
    console.log(start);
    const img = document.getElementById("image");
    img.setAttribute("src", start);
    img.setAttribute("height","70vh");
    
    //Second - the word
    //-----------------
    let wordSelect = Math.floor((Math.random()*9)+1);
    guessableWord = guessableWords[wordSelect];
    console.log(guessableWord);

    //Third - the table
    //-----------------
    tableCreation(guessableWord);
    letter = prompt ("Please guess a letter");
    lives = 10;
    //Shred the guessableWord
    //----------------------
    let shreddedWord = new Array;
    shreddedWord = guessableWord.split('');
    console.log(shreddedWord);
    document.getElementById("run").disabled = true;
});
  
    //Check the letter
function letterChecker (letter) {
    if (letter==null) {
        letter = prompt ("Please guess a letter");
    }
    else {
        for (i = 0; i<shreddedWord.length; i++){
        let temp = shreddedWord[i];
            if (temp == letter){
            //make the letter appear
            }
            else{
            //make another image appear
            lives-=1;
            alert ("You have "+lives+" left.");
            }
        }
    }

}; 
    //is it in the array ->make function locate, returns a true or false
    //if not in array, so false, make function hangHim, increment the images 
    // if in the array, so true, make function showLetter, grab the columns in the table corresponding to the letter and show the letter
    //the locate function should return both index and the true/false thing
})();

