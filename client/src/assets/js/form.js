document.querySelector('.contact-form')
.addEventListener('submit', submitForm);
document.querySelector('.contact-form')
.addEventListener('reset', reset).reset();

const url = 'https://portfolio-dimo-default-rtdb.europe-west1.firebasedatabase.app/';

function submitForm (e) {
    e.preventDefault();
const data = Object.fromEntries(new FormData(e.target));
if (data.name == "" || data.email_address == "" || data.message  == ""){
    return
    };

    saveMessage(data.name, data.email_address, data.message);
};
