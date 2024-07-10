console.log("hello world");
const inputSlider=document.querySelector(".slider");
const passwordDisplay=document.querySelector("#data");
const lengthDisplay=document.querySelector("[data-length]");
const copyBtn=document.querySelector("[data-copy]");
const copymsg=document.querySelector("[data-copymsg]");
const uppercase=document.querySelector("#Uppercase");
const lowercase=document.querySelector("#lowercase");
const number=document.querySelector("#number");
const Symbol=document.querySelector("#Symbol");

const indicator=document.querySelector("[data-indicator]");
const generateBtn=document.querySelector(".Generate-button");
const allcheckbox=document.querySelectorAll("input[type=checkbox]");
const ran_Symbol='!@#$%^&*()_+/|\}{}=-';
let password=" ";
let passwordlength=4;
console.log(passwordDisplay);
let checkCount=0;
handleslider();
//set paswordlength
setIndicator("#ccc");


function handleslider(){
    inputSlider.value=passwordlength;
    lengthDisplay.innerText=passwordlength;
    let min=inputSlider.min;
    let max=inputSlider.max;
    inputSlider.style.backgroundsize= ((passwordlength-min)*100/(max-min))+"% 100%";

}
console.log("h");
function setIndicator(color)
{
    indicator.style.backgroundcolor=color; 
}
function getRndInteger(min,max)
{
    //floor:get value like 7.8 to 7
    //random:get values from -1 to 1
    //-1 is included 1 is excluded 
    return Math.floor(Math.random()*(max-min+1))+min;
}
function generateRandomNumber(){
    return getRndInteger(0,9);
}
 
function getUppercase()
{
    return  String.fromCharCode(getRndInteger(65,90)); 
    //65-'a'

}
function getlowercase()
{
    return  String.fromCharCode(getRndInteger(97,123));
}
function getrandomSymbol()
{
    const str=getRndInteger(0,ran_Symbol.length-1);
    return ran_Symbol.charAt(str);
}

function calStrength()
{

}
async function copycontent()//return promise use to write await
{
    try{
        await navigator.clipboard.writeText(passwordDisplay.value);
        copymsg.innerText="Copied";
        
    }
    catch(e){
        copymsg.innerText="fail";
    }//to make copywala visible
    //copy button war timeout visible
    //to make visible
    copymsg.classList.add("active");
    setTimeout(()=>{
        copymsg.classList.remove("active");
    },2000);
    //ui change
    
};
console.log("shuffle Array");
function shufflepassword(array){
    //fisher yets method
    for(let i=array.length-1; i>0; i--)
        {
            const j=Math.floor(Math.random()*(i+1));
            const temp=array[i];
            array[i]=array[j];
            array[j]=temp;

        }
        let str="";
        array.forEach((el)=>(str +=el));
        return str;
}
console.log("Any field is defined");
function handlecheckboxChange(){//if any field is not checked then we can't generate the password.
    checkCount=0;
    allcheckbox.forEach((checkbox)=>{
        if(checkbox.checked)
            checkCount++;
    });
    
    if(passwordlength<checkCount)
        {
            passwordlength=checkCount;
            handleslider();//passwordlength ko UI pe reflect karta hai
        }
};
//aapn jr 4 checkbox war tick aasel tr password.length=4 generate hoil pn password chi length <4 pn passworlength length=1 keli tr

allcheckbox.forEach((checkbox)=>{
    checkbox.addEventListener('change',handlecheckboxChange);

})
inputSlider.addEventListener('input',(e)=>{
    passwordlength=e.target.value;
    handleslider();
});
copyBtn.addEventListener('click',()=>{
    if(passwordDisplay.value.length > 0)//value jar aasel tr copy hoil
        {
            copycontent();
        }
});
console.log("generate pass");
generateBtn.addEventListener('click',()=>{
    //none of the checkbox is selected
    if(checkCount<=0)return;

    if(passwordlength<checkCount)
        {
            passwordlength=checkCount;
            handleslider();

        }
        //let's generate random password
        //remove old password
        password="";

        //let's put the stuff mentioned by checkboxes
        // if(uppercase.checked){
        //     password+=getUppercase();

        // }
        // if(lowercase.checked)
        //     {
        //         password+=getlowercase();
        //     }
        // if(numberCheck.checked){
        //     password+=getRndInteger();
        // }
        // if(Symbol.checked){
        //     password+=getrandomSymbol();
        // }

    let funcArra = [];
        if(uppercase.checked){
            funcArra.push(getUppercase);

        }
        if(lowercase.checked){
            funcArra.push(getlowercase);
        }
        if(number.checked){
            funcArra.push(getRndInteger);
        }
        if(Symbol.checked){
            funcArra.push(getrandomSymbol);

        }

        console.log("compulsory addition");
        for(let i=0; i<funcArra.length; i++)
            {
                password+=funcArra[i]();
            }

            console.log("remaining addition");
        for(let i=0; i<passwordlength-funcArra.length; i++)
            {
                let randIndex=getRndInteger(0,funcArra.length-1);
                console.log("index:"+randIndex);
                password+=funcArra[randIndex]();

            }
            //shuffle the password
            console.log("remaining addition done");
            password=shufflepassword(Array.from(password));
            console.log("shuffle done");
            
            //show in UI
            passwordDisplay.value=password;
            console.log("shuffle done");
            
});

