const initalValues {
	name: "";
	numCorrect:0;
	totalQuestions: 20;
	questionNum: 0;	
}

document.addEventListener('DOMContentLoaded', () => {

	create_quiz();
	
	document.querySelector("#quiz_widget").onclick = (e) => {
		select_quiz(e)
	}
});

const select_quiz = (e) => {
	if (e.target.dataset.selection == "quiz1") {
		
	}
	else if (e.target.dataset.selection == "quiz2") {
		
	}
	
	
}

async function create_quiz(num)
{
	const response = await fetch('https://my-json-server.typicode.com/samanthav416/Milestone_3/', { mode: 'no-cors' });
	const data = await response.json();
	return data[num]; 
}


const render_view =(model, view) => {
	template_source = document.querySelector(view).innerHTML;
	
	var template = Handlebars.compile(template_source);
	var html_widget_element = template(model);
	return html_widget_element;
}
	
