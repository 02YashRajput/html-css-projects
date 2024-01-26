const passwordDisplay = document.querySelector("[data-passwordDisplay]");
const Slider = document.querySelector("[data-Slider]");
const lengthDisplay = document.querySelector("[data-lengthDisplay]");
const copyButton = document.querySelector("[data-copyButton]");
const uppercase = document.querySelector("#uppercase");
const lowercase = document.querySelector("#lowercase");
const numbers = document.querySelector("#numbers");
const symbols = document.querySelector("#symbols");
const generateButton = document.querySelector("[data-generateButton]");
const allCheckBox = document.querySelectorAll("input[type=checkbox]");
const copyMsg = document.querySelector("[data-copyMsg]");
const symbol = '`~!@#$%^&*()-=_+[]{}|;:\'",.<>?/';
let password = "";
let passwordLength = 10;
let checkCount = 1;
handleSlider();

function handleSlider() {
    Slider.value = passwordLength ;
    lengthDisplay.innerHTML = passwordLength 
};


copyButton.addEventListener("click",copy);


async function copy() {
    if(passwordDisplay.value !=='' ){
        try{

            await navigator.clipboard.writeText(passwordDisplay.value );
            copyMsg.innerHTML = "copied";
        }catch(e){
            copyMsg.innerHTML = "failed";
        }
    }
    else{
        copyMsg.innerHTML = "failed";
    }
    setTimeout(()=>{
        copyMsg.innerHTML = "";
    },1000);
};


Slider.addEventListener('input',()=>{
    passwordLength = parseInt(Slider.value); 
    handleSlider();
});


function generateRandomInteger(min,max){
    return Math.floor(Math.random()*(max-min)) + min;
};
function generateRandomUpperCase(){
    return String.fromCharCode(generateRandomInteger(65,91));
};
function generateRandomLowerCase(){
    return String.fromCharCode(generateRandomInteger(97,123));
};
function generateRandomNumber(){
    return generateRandomInteger(0,9);
};
function generateRandomSymbol(){
    let random = generateRandomInteger(0,symbol.length);
    return symbol.charAt(random);
};

allCheckBox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handleCheckBoxChange);
});
function handleCheckBoxChange(){
    checkCount = 0;
    allCheckBox.forEach((checkbox)=>{
        if(checkbox.checked){
            checkCount++;
        }
    });
    if(passwordLength <checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
};



generateButton.addEventListener("click",generator);
function generator(){
    if (checkCount<=0) return;
    if(passwordLength<checkCount){
        passwordLength = checkCount;
        handleSlider();
    }
    password = "";
    funcarr=[]
    if(uppercase.checked){
        funcarr.push(generateRandomUpperCase);
    };
    if(lowercase.checked){
        funcarr.push(generateRandomLowerCase);
    };
    if(numbers.checked){
        funcarr.push(generateRandomNumber);
    };
    if(symbols.checked){
        funcarr.push(generateRandomSymbol);
    };

    for(let i = 0;i<funcarr.length;i++){
        password+=funcarr[i]();
    }
    for(let i = 0;i<passwordLength-funcarr.length;i++){
        let random = generateRandomInteger(0,funcarr.length);
        password+=funcarr[random]();
    }
    password = shufflePassword(Array.from(password));
    passwordDisplay.value=password;
};
function shufflePassword(array){
    for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      let str = '';
      array.forEach((el) =>{str +=el});
      return str;
};