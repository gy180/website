//prevents refresh
document.getElementById("addtask").addEventListener("click", function(event){
    event.preventDefault()
  });

  var list = document.querySelector('ul');
  list.addEventListener('click', function(event) {
    if (event.target.tagName === 'LI') {
        event.target.classList.toggle('checked');
    }
  }, false);

//add task to list
function add(){
    let tasks = document.getElementById("tasks");
    let taskList = document.createElement("li");

    var txt = document.getElementById("newtodo").value;
    if (txt!=""){
    var addTxt = document.createTextNode(txt);
    taskList.appendChild(addTxt);
    tasks.appendChild(taskList);
    }
}

