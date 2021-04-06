"use strict"

const evaluate = () => {
    let value = document.getElementById("task").value;
    if(value === "") {
        console.log("Nic do zrobienia?");
        return null;
    }
    return value;
}

let temporary = null;
let bin = null;
let frombin = null;

const add = () => {
	const task = evaluate();
	
	if(task === null)
	{
		console.log("tak, nic");	
		return;
	}
	const listElement = document.createElement("p");
	listElement.classList = "entry"
	
	const newTask = document.createElement("div");
	newTask.classList = "enabled";
	newTask.innerHTML = task;
	const timer = document.createElement("div");
	timer.classList = "timer"
		
	newTask.addEventListener("click", function(){
		if(newTask.classList.toggle("enabled")){
			timer.innerHTML = "";
		}
		if(newTask.classList.toggle("disabled")){
			timer.innerHTML = new Date().toLocaleDateString();
		}	
	});
	
	const remove = document.createElement("BUTTON");
	remove.innerHTML="X"
	remove.classList = "btn btn-danger float-end"
	remove.addEventListener("click", function(){
		temporary = $(this).parent();
		$("#Modal").modal('show');
	});
		
	listElement.appendChild(remove);
	listElement.appendChild(newTask);
	listElement.appendChild(timer);
	
	let list;
	if(document.getElementById("primary").checked)
	{
		list = document.getElementById("primary-list");
	}else if(document.getElementById("secondary").checked)
	{
		list = document.getElementById("secondary-list");
	}else
	{
		console.log("nie mamy takiej listy");
		return;
	}
	
	list.appendChild(listElement);
}

function remove () {
	bin = temporary;
	frombin = bin.parent();
	temporary.remove();
	$("#Modal").modal('hide');
}

function hidemodal () {
	$("#Modal").modal('hide');
}

function restore () {
	if(bin === null)
	{
		return;
	}
	frombin.append(bin);
	bin = null;
}

function hideprimary () {
	document.getElementById("primary-list").classList.toggle("hidden");
}

function hidesecondary () {
	document.getElementById("secondary-list").classList.toggle("hidden");
}

function search () {
	let term = document.getElementById("search-term").value;
	let cs = document.getElementById("case-box").value;
	let primary = document.getElementById("primary-list").getElementsByTagName("p");
	let secondary = document.getElementById("secondary-list").getElementsByTagName("p");
	
	for (let i=0; i<primary.length; i++) {
		let ele = primary[i];
		let phrase = ele.childNodes[1].outerText + ele.childNodes[2].outerText;
		if(has(phrase, term, cs))
		{
			ele.classList.remove("hidden");
		}	
		else
		{
			ele.classList.add("hidden");	
		}
	}
	
		for (let i=0; i<secondary.length; i++) {
		let ele = secondary[i];
		let phrase = ele.childNodes[1].outerText + ele.childNodes[2].outerText;
		if(has(phrase, term, cs))
		{
			ele.classList.remove("hidden");
		}	
		else
		{
			ele.classList.add("hidden");	
		}
	}
	
}

function has(phrase, fragment, cs){
	if(cs===false)
		return phrase.includes(fragment);
	else
		return phrase.toLowerCase().includes(fragment.toLowerCase());
}
