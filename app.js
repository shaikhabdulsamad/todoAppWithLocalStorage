var todoOrderList = document.getElementById('todoList');
var todoInputText = document.getElementById('todoText');
var todoInputTime = document.getElementById('todoTime');
var pending = document.getElementById('pending');
var completed = document.getElementById('completed');

// var now = new Date()
// var nowTime = now.toLocaleTimeString()
// var nowDate = now.toLocaleDateString()

todoInputText.addEventListener('keydown', function (e) {
	if (e.code == "Enter") {
		add()
	}
})

function add() {

	if (todoInputText.value != "") {

		var userData = JSON.parse(localStorage.getItem('todo')) ?? [];

		userData.push({
			'text': (todoInputTime.value == '') ? `${todoInputText.value}` : `${todoInputTime.value} ${todoInputText.value}`

		});

		localStorage.setItem('todo', JSON.stringify(userData))
	}
	dataFromStorage();
	todoInputText.value = "";

}



var dataFromStorage = () => {
	pending.style.background = 'rgb(159, 33, 33)' ;
	completed.style.background = '#fa6b7e';

	var data = JSON.parse(localStorage.getItem('todo')) ?? [];

	finalData = "";

	if (data.length == 0) {
		finalData = `<h3 class="list-placeholder">Your to-do list is empty!<br>Get started by adding tasks.<h3>
	<p class="about-developer">Developed by A.S.WebDev.</p>`
	}
	else {


		data.forEach(function (item, index) {

			finalData += `<li>
		<input type="text" class="listInput" value="${item.text}" disabled>
	
		<button onclick="edit(${index},this)" class="editBtn"><i class="fa-regular fa-pen-to-square"></i></button>
		<button onclick="save(${index},this)" class="saveBtn"><i class="fa-regular fa-share-from-square"></i></button>
		<button onclick="taskCheck(${index},this)" class="taskCheck"><i class="fa-solid fa-check"></i></button>
		
		</li>`

		})


	}

	todoOrderList.innerHTML = finalData;
}

dataFromStorage();


function delt(i) {
	var checkData = JSON.parse(localStorage.getItem('checkedTodo')) ?? [];

	checkData.splice(i, 1);

	localStorage.setItem('checkedTodo', JSON.stringify(checkData))
	completedTasks();
}

function edit(i, e) {
	e.style.display = 'none'
	var saveBtn = document.getElementsByClassName('saveBtn')
	saveBtn[i].style.display = 'block'
	var listInput = document.getElementsByClassName('listInput')
	listInput[i].removeAttribute('disabled')
	listInput[i].style.borderBottom = '2px solid red'
	listInput[i].style.borderRadius = '0 0 0 5px'
}

function save(i, e) {
	e.style.display = 'none'
	var editBtn = document.getElementsByClassName('editBtn')
	editBtn[i].style.display = 'block'

	var userData = JSON.parse(localStorage.getItem('todo')) ?? [];
	var listInput = document.getElementsByClassName('listInput')
	userData[i].text = listInput[i].value

	localStorage.setItem('todo', JSON.stringify(userData))
	dataFromStorage();
}

function taskCheck(i, e) {
	// console.log(e.parentElement.firstElementChild.value)

	var userData = JSON.parse(localStorage.getItem('todo')) ?? [];

	userData.splice(i, 1);

	localStorage.setItem('todo', JSON.stringify(userData))
	dataFromStorage();

	var checkData = JSON.parse(localStorage.getItem('checkedTodo')) ?? [];
	checkData.push({
		'text': e.parentElement.firstElementChild.value
	})
	localStorage.setItem('checkedTodo', JSON.stringify(checkData));

}



function pendingTasks() {
	pending.style.background = 'rgb(159, 33, 33)' ;
completed.style.background = '#fa6b7e';
	dataFromStorage();
}

function completedTasks() {
pending.style.background = '#fa6b7e';
completed.style.background = 'rgb(159, 33, 33)';

	var data = JSON.parse(localStorage.getItem('checkedTodo')) ?? [];

	finalData = "";

	if (data.length == 0) {
		finalData = `<h3 class="list-placeholder">No task completed!<h3>`
	}
	else {
		data.forEach(function (item, index) {

			finalData += `<li>
		<input type="text" class="listInput" value="${item.text}" disabled>
		<button onclick="delt(${index})" class="delBtn"><i class="fa-regular fa-trash-can"></i></button>
		
		</li>`

		})


	}

	todoOrderList.innerHTML = finalData;
}
