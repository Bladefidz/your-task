var newTaskText;
var newTaskDate;
var tasks;
var taskCount;
var counter;
var clearer;
var markAll;
var check;
var text;
var due;
var complete = 0;
var unComplete = 0;
var tmp;

function createTask(text, due) {
	text = text.value;
	console.log(due);
	// validate date
	var now = new Date();
	var dues = due.split("-");
	var dueDate = new Date(dues[0], dues[1]-1, dues[2]);

	if (text && dueDate <= now && dueDate >= new Date(2016, 6, 16)) {
		tasks = document.getElementById("task-list");

		// Post new item
		var xmlhttp = new XMLHttpRequest();
        xmlhttp.open("POST", "http://localhost/your-task/task/create", true);
		xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
		xmlhttp.send(
			"_csrf="+
			document.getElementById("_csrf").getAttribute("value")
			+"&Task[_Order]=1&Task[Done]=0&Task[Text]="+text+"&Task[Date]="+due+" 00:00:00"
		);

		addNewTask(text, due);
	} else {
		alert("Please check your due date !");
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
		if (tmp[0].getAttribute("type") == "checkbox" && tmp[0].hasAttribute("checked")) {
			task[i].closest('tr').remove();
			// Post to delete item
			var xmlhttp = new XMLHttpRequest();
	        xmlhttp.open("POST", "http://localhost/your-task/task/delete?id="+tmp[0].id.split("--")[0], true);
			xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
			xmlhttp.send("_csrf="+document.getElementById("_csrf").getAttribute("value"));
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
		if (tmp[0].getAttribute("type") == "checkbox" && tmp[0].hasAttribute("checked")) {
			complete += 1;
			unComplete -= 1;
		}
	}
}

function changeAllDone(check) {
	if (check.checked) {
		var ids = null;

		for (var i = 0; i < check.length; i++) {
			if (check[i].getAttribute("type") == "checkbox" && !check[i].hasAttribute("checked")) {
				check[i].checked = true;
				ids = check[i].id; 

				// UPDATE
				var xmlhttp = new XMLHttpRequest();
		        xmlhttp.open("POST", "http://localhost/your-task/task/update?id="+ids.split("--")[0], true);
				xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
				xmlhttp.send(
					"_csrf="+document.getElementById("_csrf").getAttribute("value")+
					"&Task[_Order]="+ids.split("--")[1]+
					"&Task[Done]=1"+
					"&Task[Text]="+text[i].innerHTML+
					"&Task[Date]="+due[i].innerHTML
				);
			}
		}
	}
}

function setDone(el) {
	var done = null;
	var ids = el.id;
	var id = ids.split("--")[0];
	var order = ids.split("--")[1];

	if (el.checked) {
		done = 1;
	} else {
		done = 0;
	}

	// UPDATE
	var xmlhttp = new XMLHttpRequest();
    xmlhttp.open("POST", "http://localhost/your-task/task/update?id="+id, true);
	xmlhttp.setRequestHeader("Content-type", "application/x-www-form-urlencoded");
	xmlhttp.send(
		"_csrf="+document.getElementById("_csrf").getAttribute("value")+
		"&Task[_Order]="+order+
		"&Task[Done]="+done
	);
}


window.onload=function() {
	newTaskText = document.getElementById("newTodo");
	newTaskDate = document.getElementById("newDue");
	clearer = document.getElementById("clear-complete");
	tasks = document.getElementById("task-list");
	counter = document.getElementById("counter");
	markAll =document.getElementById("mark-all");
	check = document.getElementsByName("task-check");
	text = document.getElementsByName("task-text");
	due = document.getElementsByName("task-due");

	if (newTaskText) {
		newTaskDate.addEventListener(
			"blur", 
			function() {
				createTask(newTaskText, this.value)
			}
		);
	}

	if (markAll) {
		markAll.addEventListener(
			"change", function() { changeAllDone(this) }
		)
	}

	if (check) {
		for (var i = 0; i < check.length; i++) {
			check[i].addEventListener(
				"click", function() {setDone(this)}
			)
		}
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
