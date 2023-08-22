const preloader = document.querySelector(".preloader")
console.log(preloader);
window.addEventListener("load",()=>{
  preloader.style.display = "none"
})


const RegisterBtn = document.getElementById("register");
console.log(RegisterBtn);

RegisterBtn.addEventListener("click",(event)=>{
      if(!validateName() || !validateLoginMail() || !validateLoginPass()){
        event.preventDefault();
        return false
      } else {
         return true
      }
});

const validateName = () => {
    const name = document.getElementById("name").value;
    const errinfo = document.getElementsByClassName("errinfo")[0];

    if(name.length === 0) {
          errinfo.innerHTML = "Name Is required";
          return false
    } else {
          errinfo.innerHTML = "";
          return true
    }
}

const validateLoginMail = () => {
    
    const email = document.getElementById("email").value;
    const errinfo = document.getElementsByClassName("errinfo")[1];
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
    const errinfo = document.getElementsByClassName("errinfo")[2];
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