

export default class UI {
	constructor(){
	this.post=document.querySelector("#posts");
    this.titleInput=document.querySelector("#title");
    this.bodyInput=document.querySelector("#body");
    this.idInput=document.querySelector("#id");
    this.submitBtn=document.querySelector(".post-submit"); 
    this.alert=document.querySelector(".alerts");
    this.cardForm=document.querySelector(".card-form");
    this.forState="add";
	}

	renderPosts(posts){
		this.post.innerHTML="";
		posts.forEach(post=>{
			this.renderSinglePost(post);
		})
	}

	renderSinglePost(post){
    const markUP=`
      <div class="post1 card mb-3" data-id=${post.id}> 
        <div class="card-body"> 
          <h4 class="card-title">${post.title} </h4>
          <p class="card-text">${post.body}</p>
          <a href="#" class="edit card-link" data-id=${post.id}><i class="fa fa-pencil"></i></a>
          <a href="#" class="delete card-link" data-id=${post.id}><i class="fa fa-remove" ></i></a>
         </div>
      </div>

    `
    this.post.insertAdjacentHTML("beforeend", markUP);
	}

	getInputData(){
		return {
			
		 		name:this.titleInput.value,
		 		body:this.bodyInput.value
		 
	}
}
clearAlert(){
	let alert=document.querySelector(".alert");
	if(alert){
		alert.remove();
	}
}

showMessage(type,message){
	this.clearAlert();
	 const div=`
        <div class="alert alert-${type==="success" ? "success" : "danger"}">
          <p> ${message} </p>
         </div>
      `
       this.alert.insertAdjacentHTML("beforeend", div);
       setTimeout(()=>{
       		this.clearAlert();
       },3000)
}

	clearInputValue(){
			this.titleInput.value="";
		 	this.bodyInput.value="";
	}

	deletePostFromDom(id){
		const postToDelete=document.querySelector(`[data-id="${id}"]`);
			postToDelete.parentElement.removeChild(postToDelete);
	}

	fillForm(post){
		this.titleInput.value=post.title;
		this.bodyInput.value=post.body;
	}

	changeState(type){
		if(type==="add"){
			this.submitBtn.style.visibility="hidden";
			 const btns=`
			 <button class="post-update btn btn-secondary btn-block mt-3"> Update </button>
       		 <button class="post-cancel btn btn-danger btn-block mt-3"> Cancel </button>
                `
            this.cardForm.insertAdjacentHTML("beforeend",btns);
		}else {
			this.submitBtn.style.visibility="visible";
			document.querySelector(".post-update").remove();
			document.querySelector(".post-cancel").remove();
		}
	}

}