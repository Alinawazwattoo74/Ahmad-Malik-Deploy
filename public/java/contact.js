 

 const preloader = document.querySelector(".preloader")
 console.log(preloader);
 window.addEventListener("load",()=>{
   preloader.style.display = "none"
 })
 
const contactbtn = document.querySelector(".cont_btn");

contactbtn.addEventListener("click", (e) => {
    if (!validateFname() || !validateLname() || !validateEmails() || !validatePhone()) {
        e.preventDefault();
        return false;
    } else {
        return true;
    }
});


const validateFname = () => {
    const fname = document.getElementById("fname").value;
    const err = document.getElementsByClassName("err-info")[0];
    if (fname.length === 0) {
        err.innerHTML = "Enter your first Name, please***";
        return false;
    } else if (fname.length <= 2) {
        err.innerHTML = "Enter a valid first name, please***";
        return false;
    }
    err.innerHTML = ""; 
    return true;
};

const validateLname = () => {
    const lastName = document.getElementById("LastName").value;
    const err = document.getElementsByClassName("err-info")[1];
    if (lastName.length === 0) {
        err.innerHTML = "Enter your last Name, please***";
        return false;
    } else if (lastName.length <= 2) {
        err.innerHTML = "Enter a valid last name, please***";
        return false;
    }
    err.innerHTML = ""; 
    return true;
};

const validateEmails = () => {
    const email = document.getElementById("email").value;
    const err = document.getElementsByClassName("err-info")[2];
    if (email.length === 0) {
        err.innerHTML = "Enter your email, please***";
        return false;
    }
    err.innerHTML = ""; 
    return true;
};

const validatePhone = () => {
    const phone = document.getElementById("phone").value;
    const err = document.getElementsByClassName("err-info")[3];
    if (phone.length === 0) {
        err.innerHTML = "Enter your phone number, please***";
        return false;
    } else if (isNaN(phone)) {
        err.innerHTML = "Enter a valid Phone number, please***";
        return false;
    }
    err.innerHTML = ""; 
    return true;
};


const SuccessAlert = document.getElementById("SuccessAlert");
setTimeout(() => {
    SuccessAlert.style.display = "none"
}, 5000);
