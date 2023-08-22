const preloader = document.querySelector(".preloader")
console.log(preloader);
window.addEventListener("load",()=>{
  preloader.style.display = "none"
})

const Formcontrol = document.querySelector(".Formcontrol");
const msgs = document.querySelector(".msgs");
console.log(Formcontrol);

Formcontrol.addEventListener("submit", function(e) {
    e.preventDefault();
    const namecomment = document.getElementById("comentername").value;
    const exampleFormControlTextarea1 = document.getElementById("exampleFormControlTextarea1").value.trim();
    const comentermail = document.getElementById("comentermail").value;
    const postiddata = document.getElementById("ided").value;

    const commentData = {
        comentername: namecomment,
       msg: exampleFormControlTextarea1,
       postid : postiddata,
       comentermail : comentermail
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/comments", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                msgs.innerHTML = xhr.responseText;
            }
        }
    };

    // Send the commentData in the request
    xhr.send(JSON.stringify(commentData));
});


setTimeout(() => {
    msgs.innerHTML = "";
}, 7000);


const blogs = document.querySelectorAll(".blogscommentreplyId")
const ided = document.getElementById("ided");
blogs.forEach(blog => blog.value = ided.value )
console.log(blogs);
console.log(ided);




const replyForms = document.querySelectorAll(".reply");
replyForms.forEach(replyForm => {
  replyForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    const comenternamereply = form.querySelector(".comenternamereply").value;
    const replymsg = form.querySelector(".replymsg").value.trim();
    const blogscommentreplyId = form.querySelector(".blogscommentreplyId").value;
    const blogscommentsided = form.querySelector(".blogscommentsided").value;
    const coomentEmail = form.querySelector(".coomentEmail").value;
    console.log(coomentEmail);

    const replyData = {
      comenternamereply,
      replymsg,
      blogscommentreplyId,
      blogscommentsided,
      coomentEmail
    };

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/replycomments", true);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.onreadystatechange = function() {
      if (xhr.readyState === XMLHttpRequest.DONE) {
        if (xhr.status === 200) {
          const replytext = form.querySelector(".replytext");
          replytext.innerHTML = xhr.responseText;
          setTimeout(() => {
            replytext.innerHTML = ""
        }, 3000);
        
        }
      }
    };

    xhr.send(JSON.stringify(replyData));
  });
});


