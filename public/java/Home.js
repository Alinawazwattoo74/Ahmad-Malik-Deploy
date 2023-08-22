const preloader = document.querySelector(".preloader")
console.log(preloader);
window.addEventListener("load",()=>{
  preloader.style.display = "none"
})


const descriptions = document.querySelectorAll(".card-text");

for (let i = 0; i < descriptions.length; i++) {
    const description = descriptions[i];
    const words = description.textContent.split(' ');
    const maxWords = 30;

    if (words.length > maxWords) {
        const limitedWords = words.slice(0, maxWords).join(" ") + '...';
        description.textContent = limitedWords;
    }
}

const posts = document.querySelector(".posts")
var socket = io();
socket.on("post_data",function(data){

  console.log(data);

    var html =`
    
    <div class="card" style="width: 28rem;">
  <img src="/`+data.blog_logo+`" class="card-img-top img-fluid" alt="`+data.blog_logo+`" style="height: 50vh;">
  <div class="card-body">
    <h5 class="card-title">`+data.blog_title+`</h5>
    <p class="card-text">`+data.descripton+`</p>
    <a href="/deatail/`+data._id+`" class="btn btn-primary mb-4">Read More</a>
  </div>
</div>


    `;
    console.log(html);

    posts.prepend(html);
  
})