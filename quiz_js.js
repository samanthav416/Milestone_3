const appState = {
	current_view: 'home_page',
	name: '',
	correct_answers: 0,
	total_questions: 20,
	question_num : 0,
	score: 0
}

document.addEventListener('DOMContentLoaded', () => {


	
	document.querySelector("#quiz_widget").onclick = (e) => {
		select_quiz(e)
	}
});

const select_quiz = (e) => {
	
	if (e.target.dataset.selection == "quiz1") {
		update_view("#quiz_view")
	}
	else if (e.target.dataset.selection == "quiz2") {
		update_view("#quiz_view")
	}	
}

const create_quiz_view = async (question_num) => {

	const response = await fetch('https://my-json-server.typicode.com/samanthav416/Milestone_3/', { mode: 'no-cors' });
	const data = await response.json();
	return data[question_num]; 
}

function update_view(current_view){
	const html_element= render_view({}, current_view)
	document.querySelector("#quiz_widget").innerHTML = html_element;
}

const render_view =(model, view) => {
	
	template_source = document.querySelector(view).innerHTML;
	var template = Handlebars.compile(template_source);
	var html_widget_element = template(model);
	return html_widget_element;
}
