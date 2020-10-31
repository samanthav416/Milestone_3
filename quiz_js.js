const constants = {
	current_view: 'home_page',
	name: '',
	correct_answers: 0,
	total_questions: 20,
	question_num : 0,
	score: 0,
	numbers : [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29]
}

document.addEventListener('DOMContentLoaded', () => {

	create_quiz_view
	
	document.querySelector("#quiz_widget").onclick = (e) => {
		select_quiz(e)
	}
});

const select_quiz = (e) => {
	
	if (e.target.dataset.selection == "quiz1") {
		update_view("#quiz_view", "#quiz_widget", {score:constants.score})
	}
	else if (e.target.dataset.selection == "quiz2") {
		update_view("#quiz_view", "#quiz_widget", {score:constants.score})
	}	
}




const create_quiz_view = async (question_num) => {

	const response = await fetch('https://my-json-server.typicode.com/samanthav416/Milestone_3/', { mode: 'no-cors' });
	const data = await response.json();
	return data[question_num]; 
}

function update_view(current_view, target_view, model){
	const html_element= render_view(model, current_view)
	document.querySelector(target_view).innerHTML = html_element;
}

const render_view =(model, view) => {
	
	template_source = document.querySelector(view).innerHTML;
	var template = Handlebars.compile(template_source);
	var html_widget_element = template(model);
	return html_widget_element;
}

//Function to load next question
async function next_question(){
	if (constants.question_num == constants.total_questions){
		create_quiz_view.reload();
	}
	//the constants.numbers[question_num] calls the numbers array and get the number from the question num position
	let question = await create_quiz_view(constants.numbers[question_num]);
	let q_type = question["type"];


	if(q_type = "multiple"){

		let model = [
		{
			q : question["question"],
			c1 : question["c1"],
			c2 : question["c2"],
			c3 : question["c3"],
			c4 : question["c4"]
		}
		]
		update_view("#multiple_choice", "#question_view", model)
	}
	
	else if(q_type == "boolean"){
		let model = {
		q : question["question"]
		}
		update_view("#boolean", "#question_view", model)	
	}
	
	else if (q_type = "fill_in"){
		let model = {
			q : question["question"]
		}
		update_view("#fill_in","#question_view", model)			
	}	
}

//Function to check answer
async function check(){
	let question = await create_quiz_view(constants.numbers[question_num]);
	let q_type = question["type"];
	let answer = question["answer"];

	//create if statements to check what question type it is, like above.
	if (q_type == "multiple"){
		
		var answer;
        let x = document.getElementsByName('selection')
		for (i = 0; i < x.length, i++) {
			if (x[i].checked) {
				answer = x[i].value 
			}
		}
        if (answer === question["answer"])
        {
            correct_answer();
        }
        else
        {
            wrong_answer();
        }
    }
	
	else if (q_type == "boolean") {
		
		var answer;
        let x = document.getElementsByName('selection')
		for (i = 0; i < x.length, i++) {
			if (x[i].checked) {
				answer = x[i].value 
			}
		}
        if (answer === question["answer"])
        {
            correct_answer();
        }
        else
        {
            wrong_answer();
        }
	}
	
	else if (q_type == "fill_in"){
		let user_input = document.querySelector('#answer').value;
		if (user_input.toLowerCase() === question ["answer"].toLowerCase()) {
			correct_answer();
		}
		else {
		wrong_answer;
		}

		//Do checks.

		//For multiple choice, you will be using radio buttons.  Have the name attribute be the same for each and have the value attribute be the answer.
		//Do a x = document.getElementsByName(name) and iterate over x.  check to see if x[i].checked and then check the answer.  after that check to see
		//if the answer is the same or not.  Depending on that, do an appropriate right/wrong html thing.

		//do basically the same thing for t/f if you decide to use radio buttons for it.
		//for fill in, just do x = document.querySelector(answer).value and check the answer.

		//Also increment the question num
		constants.question_num++;
	}
}

  function correct_answer()
    {
        load_view('#right_answer', '#after_answer');
        constants.correct++;
        constants.question_num++;
		constants.score++;
        setTimeout(load_quiz_view, 1000);
    }
    function wrong_answer()
    {
		load_view('#explanation', '#after_answer', vars);
        constants.question_num++;  
    }
