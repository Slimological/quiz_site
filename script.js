/*This is where all the of the necessary JavaScript to ensure additional and basic functionality will reside */
/*Another deprecated attempt however PHP variables may have been implemented here: https://stackoverflow.com/questions/4287357/access-php-variable-in-javascript*/


/*This is the audio that plays per click */
var sound = new Audio("../Resources/clickbox.wav");

document.onclick = () => {

	sound.play();

}

/*This determines whether or not the points need a reset or not when starting the quiz or reloading the pages. */
var params = new URLSearchParams(window.location.search);

/*This is used to begin the point count */
var initial_points = points;


//Get string value for points, this determines whether or not to carry points from before or to get a fresh reset to 0
if (params.get("points") != null && parseInt(params.get("points")) != NaN) {

	var points = parseInt(params.get("points"));

} else {

	var points = 0;
}

/*This is used to break apart the URL for redirecting later. */
var file_name = window.location.pathname.replace("/", "");
var file_name = file_name.split("/")[file_name.split("/").length - 1];
var question_id = parseInt(file_name.replace("q", "").replace(".html", ""));

/*Timer elements are brought here for use in later time() funcs */
var timer_element = document.getElementById("timerNo");
var timer = sessionStorage.getItem("timer");
var points_element = document.getElementById("point_count");
var question_total_element = document.getElementById("question_total");


/*This is the timer and it runs down moving you to results once it ends making it so that you have to restart once it's over, it also counts your score as you go */
function time() {
	if (timer > 0) {
		timer--;

		sessionStorage.setItem("timer", timer);
		timer_element.textContent = timer;
		sessionStorage.getItem(points);
		points_element.textContent = points + "/14";

	} else {

		timer_element.textContent = "Time's up!";
		window.location = "results.html?points=" + points;

	}
}

/*This is used to print the score at the end for the results page */
function score() {

	question_total_element.textContent = "You scored " + points + "/14";

}

/*This prevents the timer from redirecting you once you are on either the index or results page */
if (file_name != "index.html", file_name != "results.html") {

	/*Delay timer is thanks to: https://stackoverflow.com/questions/3583724/how-do-i-add-a-delay-in-a-javascript-loop*/
	setInterval(time, 1000);

}

/*This is an dictionary of values that are used to determine whether or not you get points per question. */
var correctAnswers = {
	"q1.html": ["Mercury"],
	"q2.html": ["Feathers"],
	"q3.html": ["Hazelnut"],
	"q4.html": ["Luxembourg", "Switzerland", "Kosovo"],
	"q5.html": ["PNG"],
	"q6.html": ["three"],
	"q7.html": ["World", "Wide", "Web", "Whole"],
	"q8.html": ["Zonkey"],
	"q9.html": ["Nine"],
	"q10.html": ["Brain"]
}

/*This checks the validity of the selected question by checking what you selected and the correct answer is checked against in the dictionary */
function check_answer() {

	var all_radios = document.querySelectorAll("input[type='radio']:checked");

	if (all_radios == null) {
		all_radios = [];
	}

	for (var radio of all_radios) {
		if (correctAnswers[file_name].includes(radio.value)) {

			points += 1;

		}
	}

	/*This determines where to move the user following the question check after submitting, it also moves you to results after reaching question 10 */
	var new_question_id = (question_id + 1).toString();

	if (new_question_id == 11) {

		window.location = "results.html?points=" + points;

	} else {

		window.location = "q" + new_question_id + ".html?points=" + points;
	}
}

/*This is used to determine the points from the images*/
function check_answer_img() {

	var all_img = document.getElementsByTagName("img");

	if (all_img == null) {

		all_img = [];
	}

	for (var image of all_img) {
		if (correctAnswers[file_name].includes(image.id)) {

			points += 1;
		}
	}

	var new_question_id = (question_id + 1).toString();

	window.location = "q" + new_question_id + ".html?points=" + points;
}

/*This is used to determine the points from the checkboxes*/
function check_answer_box() {

	var all_checkbox = document.querySelectorAll("input[type='checkbox']:checked");

	if (all_checkbox == null) {

		all_checkbox = [];
	}

	for (var checkbox of all_checkbox) {

		if (correctAnswers[file_name].includes(checkbox.value)) {

			points += 1;
		}
	}

	var new_question_id = (question_id + 1).toString();

	if (new_question_id == 11) {

		window.location = "results.html?points=" + points;

	} else {

		window.location = "q" + new_question_id + ".html?points=" + points;
	}
}


/*This moves the user to the first page when the click the start button and assigns the starting points */
function start_quiz() {

	sessionStorage.setItem("timer", 180);
	window.location = "q1.html?points=0";

}

/*As the function says, it makes images larger */
function make_image_bigger(image_id) {

	document.getElementById(image_id).style.width = "250px";
	document.getElementById(image_id).style.height = "250px";

}

function make_image_smaller(image_id) {

	document.getElementById(image_id).style.width = "200px";
	document.getElementById(image_id).style.height = "200px";

}


/*This is going to be used to increase the selected image size and downsize others, it also can downsize both to deselect.*/
function select_img(id) {

	var all_images = document.getElementsByTagName("img");

	for (var i = 0; i < all_images.length; i++) {

		make_image_smaller(all_images[i].id);

		if (all_images[i].id == id) {
			if (all_images[i].style.width == "200px") {

				make_image_bigger(id);
			}
		}
	}
}

/*This function is used to change the footer colour of question three upon clicking it */
function footer_col() {

	document.getElementsByName("special_footer")[0].style.color = "red";

}

/*This is a special function that changes text in question 10 when clicked*/
function special_BP() {

	document.getElementsByName("special_BP")[0].textContent = "*Poof!*";
	document.getElementsByName("special_BP")[0].style.color = "green";

}