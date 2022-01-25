import  throttle from "lodash.throttle";

const FORM_DATA = 'feedback-form-state';
const form = document.querySelector(".feedback-form");

form.addEventListener('input',throttle(onInput,500));
form.addEventListener('submit', onSubmit);
populateFormData(form);

function onInput(e){
    const inputName = e.target.name
    const inputValue = e.target.value;
    let data = getFormValuesFromLocalStorage();
    if(!!data){
        data[inputName]=inputValue;
    }
    else{
        data = {
            [inputName]:inputValue
        }
    }
    saveFormValuesInLocalStorage(data);
}
function onSubmit(e){
    e.preventDefault();
    const data ={
        email: e.target.elements.email?.value,
        message: e.target.elements.message?.value,
    }
    console.log(data);
    e.currentTarget.reset()
    deleleFormValuesFromLocalStorage();
    
}
function saveFormValuesInLocalStorage(data){
    try{
        const stringifiedData = JSON.stringify(data)
        localStorage.setItem(FORM_DATA,stringifiedData);
    }
    catch(error){
        console.error(error.name);
        console.error(error.message);
    }
}
function getFormValuesFromLocalStorage(){
    try{
        const data = localStorage.getItem(FORM_DATA);
        const parsedData = JSON.parse(data);
        return parsedData;
    }
    catch(e){
        console.error(e.name);
        console.error(e.message);
    }
}
function deleleFormValuesFromLocalStorage(){
    localStorage.removeItem(FORM_DATA)
}
function populateFormData(formRef){
    const data = getFormValuesFromLocalStorage();
    if(data){
        for(const k in data){
            formRef.elements[k].value = data[k];
        }
    }
}