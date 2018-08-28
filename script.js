var quiztitle = "Trivia";


var quiz = [
			 {
					 "question" : "Q1: Who came up with the theory of relativity?",
					 "image" : "http://upload.wikimedia.org/wikipedia/commons/thumb/d/d3/Albert_Einstein_Head.jpg/220px-Albert_Einstein_Head.jpg",
					 "choices" : [
																	 "Sir Isaac Newton",
																	 "Nicolaus Copernicus",
																	 "Albert Einstein",
																	 "Ralph Waldo Emmerson"
															 ],
					 "correct" : "Albert Einstein",
					 "explanation" : "Albert Einstein drafted the special theory of relativity in 1905.",
			 },
			 {
					 "question" : "Q2: Who is on the two dollar bill?",
					 "image" : "http://upload.wikimedia.org/wikipedia/commons/thumb/9/94/US_%242_obverse-high.jpg/320px-US_%242_obverse-high.jpg",
					 "choices" : [
																	 "Thomas Jefferson",
																	 "Dwight D. Eisenhower",
																	 "Benjamin Franklin",
																	 "Abraham Lincoln"
															 ],
					 "correct" : "Thomas Jefferson",
					 "explanation" : "The two dollar bill is seldom seen in circulation. As a result, some businesses are confused when presented with the note.",
			 },
			 {
					 "question" : "Q3: What event began on April 12, 1861?",
					 "image" : 
					 "https://assets4.bigthink.com/system/idea_thumbnails/65652/size_896/Second_Civil_War.jpg?1530889376",
					 "choices" : [
																	 "First manned flight",
																	 "California became a state",
																	 "American Civil War began",
																	 "Declaration of Independence"
															 ],
					 "correct" : "American Civil War began",
					 "explanation" : "South Carolina came under attack when Confederate soldiers attacked Fort Sumter. The war lasted until April 9th 1865.",
			 },
			 {
				"question" : "Q4: Grand Central Terminal, Park Avenue, New York is the world's:",
				"image" : 
				"https://amp.businessinsider.com/images/5b327d971ae66219008b577e-750-511.jpg",
				"choices" : [
																"Largest railway station",
																"Highest railway station",
																"Longest railway station",
																"None of the above"
														],
				"correct" : "Largest railway station",
				"explanation" : "Grand Central Terminal was built by and named for the New York Central Railroad in the pinnacle of American long-distance passenger rail travel.",
			 },


	 ];


var currentquestion = 0,
		score = 0,
		submt = true,
		picked;

		$(document).ready(function(){ 
			$("#submitbutton").hide();

		function htmlEncode(value) {
				return $(document.createElement('div')).text(value).html();
		}


		function addChoices(choices) {
				if (typeof choices !== "undefined" && $.type(choices) == "array") {
						$('#choice-block').empty();
						for (var i = 0; i < choices.length; i++) {
								$(document.createElement('li')).addClass('choice choice-box').attr('data-index', i).text(choices[i]).appendTo('#choice-block');
						}
				}
		}


		function nextQuestion() {
				submt = true;
				//alert("nQ");
				$('#explanation').empty();
				$('#question').text(quiz[currentquestion]['question']);
				$('#pager').text('Question ' + Number(currentquestion + 1) + ' of ' + quiz.length);
				if (quiz[currentquestion].hasOwnProperty('image') && quiz[currentquestion]['image'] != "") {
						if ($('#question-image').length == 0) {
								$(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question'])).insertAfter('#question');
						} else {
								$('#question-image').attr('src', quiz[currentquestion]['image']).attr('alt', htmlEncode(quiz[currentquestion]['question']));
						}
				} else {
						$('#question-image').remove();
				}
				addChoices(quiz[currentquestion]['choices']);
				setupButtons();


		}


		function processQuestion() {

				//alert(choice);
				currentquestion++;
				 //alert(currentquestion);
				$("#submitbutton").hide();

						if (currentquestion == quiz.length) {
								endQuiz();
						} else {

								nextQuestion();
						}
		}


		function setupButtons() {
				$('.choice').on('mouseover', function () {
						$(this).css({
								'background-color': '#e1e1e1'
						});
				});
				$('.choice').on('mouseout', function () {
						$(this).css({
								'background-color': '#fff'
						});
				})
				$('.choice').on('click', function () {
						//alert("");
						choice = $(this).attr('data-index');
						$('.choice').removeAttr('style').off('mouseout mouseover');
						$(this).css({
								'border-color': '#222',
								'font-weight': 700,
								'background-color': '#c1c1c1'
						});
						if (quiz[currentquestion]['choices'][choice] == quiz[currentquestion]['correct']) {
						$('.choice').eq(choice).css({
								'background-color': '#50D943'
						});
						$('#explanation').html('<strong>Correct!</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
						score++;
				} else {
						$('.choice').eq(choice).css({
								'background-color': '#D92623'
						});
						$('#explanation').html('<strong>Incorrect.</strong> ' + htmlEncode(quiz[currentquestion]['explanation']));
				}

						if (submt) {
								//alert("submit");
								submt = false;

							 setTimeout(processQuestion,2000);

						}
				})
		}


		function endQuiz() {
				$('#explanation').empty();
				$('#question').empty();
				$('#choice-block').empty();
				$('#submitbutton').remove();
				$('#question-image').hide();
				$('#question').text("You got " + score + " out of " + quiz.length + " correct.");
				$(document.createElement('h2')).css({
						'text-align': 'center',
						'font-size': '4em'
				}).text(Math.round(score / quiz.length * 100) + '%').insertAfter('#question');

				var result = Math.round(score / quiz.length * 100);
				var g = document.createElement('img');
				 g.id = 'imgId';
				 $(g).css({
						'height':'100px',
						'width': '100px',
						'margin-left':'40%'
				}).insertAfter('#explanation');

				if(result < 33){
					 $("#imgId").attr("src","http://www.chaaps.com/wp-content/uploads/2010/07/fail.jpg");
				}
				else if(result < 67){
					 $("#imgId").attr("src","http://www.ytechie.com/2008/04/how-does-your-boss-know-youre-doing-a-great-job/good-job.png");
				}
				 else if(result < 100){
					 $("#imgId").attr("src","http://www.ytechie.com/2008/04/how-does-your-boss-know-youre-doing-a-great-job/good-job.png");
				}
				else if(result == 100){
					 $("#imgId").attr("src","https://upload.wikimedia.org/wikipedia/commons/thumb/7/72/Fxemoji_u1F4AF.svg/1024px-Fxemoji_u1F4AF.svg.png");
				}
		}


		function init() {
				//add title
				if (typeof quiztitle !== "undefined" && $.type(quiztitle) === "string") {
						$(document.createElement('h1')).text(quiztitle).appendTo('#frame');
				} else {
						$(document.createElement('h1')).text("Quiz").appendTo('#frame');
				}

				//add pager and questions
				if (typeof quiz !== "undefined" && $.type(quiz) === "array") {
						//add pager
						$(document.createElement('p')).addClass('pager').attr('id', 'pager').text('Question 1 of ' + quiz.length).appendTo('#frame');
						//add first question
						$(document.createElement('h2')).addClass('question').attr('id', 'question').text(quiz[0]['question']).appendTo('#frame');
						//add image if present
						if (quiz[0].hasOwnProperty('image') && quiz[0]['image'] != "") {
								$(document.createElement('img')).addClass('question-image').attr('id', 'question-image').attr('src', quiz[0]['image']).attr('alt', htmlEncode(quiz[0]['question'])).appendTo('#frame');
						}

						//questions holder
						$(document.createElement('ul')).attr('id', 'choice-block').appendTo('#frame');

						//add choices
						addChoices(quiz[0]['choices']);

						 $(document.createElement('p')).addClass('explanation').attr('id', 'explanation').html('&nbsp;').appendTo('#frame');

						setupButtons();

				}
		}

		init();
});    
