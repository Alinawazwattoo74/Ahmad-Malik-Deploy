const blogBtn = document.getElementById("submit");
const img = document.getElementById("imgs");
const iconUpload = document.getElementById("file");

iconUpload.addEventListener("change", (event) => {
    const selectedFile = event.target.files[0];

    if (selectedFile) {
        const reader = new FileReader();

        reader.onload = function () {
            img.src = reader.result;
        };

        reader.readAsDataURL(selectedFile);
    } else {
        img.src = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAHkA4gMBIgACEQEDEQH/xAAZAAADAQEBAAAAAAAAAAAAAAABAgMABAb/xAAdEAEBAQEBAAMBAQAAAAAAAAAAAQIREgMTMWEh/8QAFgEBAQEAAAAAAAAAAAAAAAAAAAEC/8QAFhEBAQEAAAAAAAAAAAAAAAAAABEB/9oADAMBAAIRAxEAPwD0LMLTICwyAAmkGQCyDw0gzIE8jIp5GYBPg8Umf8N5FR43FvDeAR43FvDeAR4HF/AeQR4FytcFuREuBxW5DyCXAUsCwCAbgcAGGgDMzAIyGGQC+TcGQ8gFkNMnmTzIJzB5hSZPMCpTBphaYNMAhMG8OifGaYKOafG31ur6x+so5Prb63X4C4KOT6w8Ou/GW/GUclwW4ddwS4By3Bbl1XJLkHNcluXRrKdyIjYWxW5LYCVjcPYAEYeUQMaRjSAMh8xsxTMBsw+cjmKZgoZypnI5iuYBJk8wpnKkyglMHmP4rMHmARmG8OiYHwK5vDXH8dPgLgHLcFuHVcEuBHLcEuHVck1kHLcJ6y6tRLUBzaynrLp1E9RRz6idi+oTUEQsDilhLAKwsBofJIeAeKZhMqZBTMVzEsq5FUzFcxLKuagrmKZieapngHkPIWU8oppB4HR6DcCwet0CWEsUtJqgnqJ6ilT0IlqJaiuqloE9JaV0lpRLRKppOgnpOxTRKIVhYAh5UzSgtmnzUc0+aC+armufNPnQrpzpXOnNnSmdIOnNUzpy50pNA6Zo805po02K6Zofbn9j7B0ev6F2h7C7Ba6JdJ3ZLsFNaT1ot2nrQhtVLVbWk9aBtVPVDWiaqgapLWtJaAUla0togsHQAOjKSGA8p5U4MBfNPNISnlBeaPnSEppRXRNHm3PKaUHTNmm3PNDNIOj2PtD03oF/be0eh0Frsl2n6LdApdEuiei2qG1ol0W0loGuk7prSWiNaS1rS39BrSswAwMA8EIaA0NPwIMA0PCw8A0NCw0A8NCw0FNP0Z+hP00/QGMwmjALGBaFGhQIWnpKBaSnpKIWkp6SgShTUoF4w0ALwWYBYBA0GUogeU0pIaApKaVOHgHmjSpw8FPKaVOCCnW6QQP0LStQG0vQoAPS2sWg10S0aWiBaW0b+FAtCjfwoBQGgDMzA//Z";
    }
});

blogBtn.addEventListener("click", (event) => {
    if (!validateTitle() || !Descriptions() || !validateName() || !validateEmail() || !validatepass()) {
        event.preventDefault();
        return false;
    } else {
        return true;
    }
});

const validateTitle = () => {
    const title = document.getElementById("title").value;
    const errinfo = document.getElementsByClassName("errinfo")[0];
    const info = document.getElementsByClassName("info")[0];

    if (title.length === 0) {
        errinfo.innerHTML = "Title Is required";
        info.innerHTML = ""; 
        return false;
    } else if (title.length > 20) {
        errinfo.innerHTML = "Title Is Too Long";
        info.innerHTML = ""; 
        return false;
    } else {
        errinfo.innerHTML = "";
        info.innerHTML = "Looks Good Now";
        return true;
    }
}

const Descriptions = () => {
    const description = document.getElementById("descriptions").value;
    const errinfo = document.getElementsByClassName("errinfo")[1];
    
    if (description.length === 0) {
        errinfo.innerHTML = "Description Is required";
        return false;
    } else if (description.length < 150) {
        errinfo.innerHTML = "Description Is too Short Must Greater than 150 words ";
        return false;
    } else {
        errinfo.innerHTML = "";
        return true;
    }
}

const validateName = () => {
     const name = document.getElementById("name").value;
     const errinfo = document.getElementsByClassName("errinfo")[2];

     if(name.length === 0) {
           errinfo.innerHTML = "Name Is required";
           return false
     } else {
           errinfo.innerHTML = "";
           return true
     }
}

const validateEmail = ()=>{
     const email = document.getElementById("email").value;
     const errinfo = document.getElementsByClassName("errinfo")[3];
     if(email.length === 0) {
         errinfo.innerHTML = "Email Is required";
         return false
     }  else {
          errinfo.innerHTML = "";
          return true
     }

}


const validatepass = () => {
     const password = document.getElementById("password").value;
     const errinfo = document.getElementsByClassName("errinfo")[4];
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





     





