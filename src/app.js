import Posts from "./models/Posts";
import UI from "./views/ui";


let ui=new UI();

let state={};
window.state=state;

window.addEventListener("load", e=>{
	state.posts=new Posts();
	state.posts.getFromLocalStorage();
	console.log(state.posts)
	ui.renderPosts(state.posts.posts);
	
	// state.posts.forEach(post=>{
	// 	ui.renderSinglePost(post);
	// })

})


document.querySelector(".post-submit").addEventListener("click", e=>{
	let name=ui.getInputData().name;
	let body=ui.getInputData().body;

	let newPost=state.posts.addPost(name,body);
	ui.renderSinglePost(newPost);
	ui.showMessage("success", "You successfully added a post");
	ui.clearInputValue();

}) 

document.querySelector("#posts").addEventListener("click", e=>{
	const id=e.target.closest(`.post1 `).dataset.id;
	console.log(id);
	e.preventDefault();
	if(e.target.matches(`.delete, .delete *`)){
		state.posts.deletePost(id);
		ui.deletePostFromDom(id);
		ui.showMessage("deleted", "You successfully deleted a post");
	}else if(e.target.matches(`.edit, .edit *`)){
		controlEdit(e);
		
	}
})



function controlEdit(e){
	const id=e.target.closest(`.post1 `).dataset.id;
	
	state.currentPost=state.posts.findCurrent(id);
	console.log(state.currentPost);

	ui.fillForm(state.currentPost);
	ui.changeState("add");
	
}

document.querySelector(".card-form").addEventListener("click", e=>{
	if(e.target.matches(`.post-cancel`)){
	ui.changeState("normal");
	ui.clearInputValue();
		}else if(e.target.matches(`.post-update`)){
			controlUpdate();
		}
})


function controlUpdate() {
	let title=ui.getInputData().name;
	let body=ui.getInputData().body;
	state.posts.updatePost(state.currentPost,title,body);

	ui.renderPosts(state.posts.posts);
	ui.changeState("normal");
	ui.clearInputValue();
	ui.showMessage("success", "You successfully updated a post");
}