const inputField = document.getElementById("input-task");
const inputBtn = document.getElementById("add-task-button");
const inputList = document.getElementById("task-list");
const tasks = document.getElementsByClassName('task');
const clearBtn = document.querySelector('.clear-btn');

let taskList = JSON.parse(localStorage.getItem("newList")) || [];

let todoItemElems = [];

function createTask(description) {
  this.task = description;
  this.checked = false;
}


const updateLocal = () => {
	localStorage.setItem("newList", JSON.stringify(taskList));
}

const createTemplate = (tsk, index) => {
	return `
		<li class="main__task-item">
			<input onclick="completeTask(${index})" type="checkbox" ${tsk.checked ? 'checked' : ''}>
			<span class="task">${tsk.task}</span>
			<button onclick="deleteTask(${index})" class="delete-btn"></button>
		</li>
	`
}

const fillTaskList = () => {
	inputList.innerHTML = "";
	if (taskList.length > 0) {
		taskList.forEach((item, index) => {
			inputList.innerHTML += createTemplate(item, index);
		});
		todoItemElems = document.querySelectorAll('.main__task-item');
  }
}

fillTaskList();

const completeTask = index => {
	taskList[index].checked = !taskList[index].checked;
	if (taskList[index].checked) {
		todoItemElems[index].classList.add('.checked');
	} else {
		todoItemElems[index].classList.remove('.checked');
	}
	updateLocal();
	fillTaskList();
}

inputBtn.addEventListener('click', () => {
	if (inputField.value != '') {
		taskList.push(new createTask(inputField.value.trim()));
		updateLocal();
		fillTaskList();
		inputField.value = "";
	}
});

clearBtn.addEventListener('click', () => {
  inputList.innerHTML = "";
  taskList = [];
  localStorage.clear();
  clearBtn.style.display = "none";
  // inputList.innerHTML = `<span>input new element</span>`;
  console.log('localStorage && "taskList" is cleaned!');
})

const deleteTask = index => {
  todoItemElems[index].classList.add('delete')
  setTimeout(() => {
	taskList.splice(index, 1);
	updateLocal();
	fillTaskList();
  }, 500)
}

