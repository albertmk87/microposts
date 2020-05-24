var ID = function () {
  // Math.random should be unique because of its seeding algorithm.
  // Convert it to base 36 (numbers + letters), and grab the first 9 characters
  // after the decimal.
  return '_' + Math.random().toString(36).substr(2, 9);
};
export default class Posts {
	constructor(){
		this.posts=[
		
		];
	}

	addPost(title,body) {
		let newPost={
			title,
			body,
			id:ID()
		}
		this.posts.push(newPost);
		this.saveToLocalStorage();
		return newPost;

	}

	deletePost(id) {
		const findIndex=this.posts.findIndex(post=> post.id===id);

		this.posts.splice(findIndex,1);
		this.saveToLocalStorage();
	}
	updatePost(postToUp,title,body){
		postToUp.title=title;
		postToUp.body=body;
		this.saveToLocalStorage();
	}

	findCurrent(id){
		const find=this.posts.find(post=>post.id===id);
		return find;
	}

	getFromLocalStorage(){
		let storage=JSON.parse(localStorage.getItem("posts"));
		if(storage){
			this.posts=storage;
		}
	}

	saveToLocalStorage() {
	localStorage.setItem("posts", JSON.stringify(this.posts));
	}


}