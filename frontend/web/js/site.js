var newTaskText;
var newTaskDate;
var tasks;
var taskCount;
var counter;
var clearer;
var markAll;
var complete = 0;
var unComplete = 0;
var tmp;

function createTask(text, due) {
	if (text) {
		tasks = document.getElementById("task-list");

		// Post
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "http://localhost/your-task/task/create", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(
			"Task[_Order]=1&Task[Done]=0&Task[Text]="+text+"&Task[Date]="+due+" 00:00:00"
		);

		addNewTask(text, due);
	}
}

function addNewTask(taskText, due) {
	tasks.innerHTML += "<tr>\
		<td>\
			<input type='checkbox' name='check' id='check-1'>\
		</td>\
		<td>\
			<span id='task-text-1'>" + taskText + "</span>\
		</td>\
		<td>\
			<span id='task-text-1'>" + due + "</span>\
		</td>\
	</tr>";
}

function clearComplete() {
	var task = tasks.getElementsByTagName("td");
	for (var i = 0; i < task.length; i++) {
		tmp = task[i].children;
		if (tmp[0].hasAttribute("checked")) {
			task[i].closest('tr').remove();
		}
	}

	complete -= 1;
	clearer.innerHTML = "Clear " + complete + " completed item";
}

function countComplete() {
	unComplete = tasks.children.length;
	var task = tasks.getElementsByTagName("td");
	for (var i = 0; i < task.length; i++) {
		tmp = task[i].children;
		if (tmp[0].hasAttribute("checked")) {
			complete += 1;
			unComplete -= 1;
		}
	}
}

function markAll() {
	console.log("change");
}


window.onload=function() {
	newTaskText = document.getElementById("newTodo");
	newTaskDate = document.getElementById("newDue");
	clearer = document.getElementById("clear-complete");
	tasks = document.getElementById("task-list");
	counter = document.getElementById("counter");
	markAll =document.getElementById("mark-all");
	if (newTaskText) {
		newTaskDate.addEventListener(
			"change", 
			function() {
				createTask(newTaskText.value, this.value)
			}
		);
	}

	if (markAll) {
		markAll.addEventListener(
			"change", 
			function() {
				markAll()
			}
		)
	}

	if (clearer && counter) {
		countComplete();

		clearer.innerHTML = "Clear " + complete + " completed item";
		clearer.addEventListener(
			"click",
			clearComplete
		);

		counter.innerHTML = unComplete + " items left";
	}
}

/**
 * jQuery AJAX
 */
