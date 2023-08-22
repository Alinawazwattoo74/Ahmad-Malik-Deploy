const preloader = document.querySelector(".preloader")
console.log(preloader);
window.addEventListener("load",()=>{
  preloader.style.display = "none"
})

const LoginBtn = document.getElementById("LoginBtn");
console.log(LoginBtn);

LoginBtn.addEventListener("click",(event)=>{
      if(!validateLoginMail() || !validateLoginPass()){
        event.preventDefault();
        return false
      } else {
         return true
      }
});

const validateLoginMail = () => {
    
    const email = document.getElementById("email").value;
    const errinfo = document.getElementsByClassName("errinfo")[0];
    if(email.length === 0) {
        errinfo.innerHTML = "Email Is required";
        return false
    }  else {
         errinfo.innerHTML = "";
         return true
    }

}

const validateLoginPass = () => {
    const password = document.getElementById("password").value;
    const errinfo = document.getElementsByClassName("errinfo")[1];
    if(password.length === 0) {
        errinfo.innerHTML = "password is required"
        return false
    } else if(password.length < 8) {
       errinfo.innerHTML = "password is Must Greater Then 8 Or Equals to"
       return false
    } else {
       errinfo.innerHTML = ""
       return true
    }
}

const SuccessAlert = document.getElementById("SuccessAlert");
console.log(SuccessAlert);

setTimeout(() => {
    SuccessAlert.style.display="none"
}, 7000);

const dangerAlert = document.getElementById("dangerAlert");
setTimeout(() => {
    dangerAlert.style.display="none"
}, 7000);





