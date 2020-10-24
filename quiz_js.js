const initalValues {
	name: "";
	numCorrect:0;
	totalQuestions: 20;
	questionNum: 0;	
}

document.addEventListener('DOMContentLoaded', function(){


})

function load_quiz(){
	let var {

}

function load_question(){
	
	
	
	if initalValues.questionNum == initalValues == 20; {
		end_quiz();
	}
}

async function get_quiz_info(question[num])
{
	const response = await fetch('https://my-json-server.typicode.com/samanthav416/Milestone_3/');
	const data = await response.json();
	return data[num]; 
}
