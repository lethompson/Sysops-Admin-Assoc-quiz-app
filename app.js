//single state object

var state = {
  questions: [{
      question: 'For which aspects of physical and environmental security is Amazon Web Services responsible?',
      answers: ['Fire detection and suppression', 'Power redundancy', 'Climate and temperature control in AWS datacenters', 'All of the above'],
      answerCorrect: 3
    },
    {
      question: 'Which AWS service provides centralized management of access and authentication of users administering the services in an AWS account?',
      answers: ['AWS Directory Service', 'AWS Identity and Access Management Service', 'Amazon Cognito', 'AWS Config'],
      answerCorrect: 1
    },
    {
      question: 'The AWS CloudTrail service provides which of the following?',
      answers: ['Logs of the API requests for AWS resources within your account', 'Information about the IP traffic going to and from network interfaces', 'Monitoring of the utilization of AWS resources within your account', 'Information on configuration changes to AWS resources within your AWS account'],
      answerCorrect: 0
    },
    {
      question: 'Which AWS Cloud service allows organizations to gain system-wide visibility into resource utilization, application performance, and operational health?',
      answers: ['AWS Identity and Access Management (IAM)', 'Amazon Simple Notification Service (Amazon SNS)', 'Amazon CloudWatch', 'AWS CloudFormation'],
      answerCorrect: 2
    },
    {
      question: 'Amazon CloudWatch Logs enable Amazon CloudWatch to monitor log files. Pattern filtering can be used to analyze the logs and trigger Amazon CloudWatch alarms based on customer specified thresholds. Which types of log files can be sent to Amazon CloudWatch Logs?',
      answers: ['Operating system logs', 'AWS CloudTrail logs', 'Access Flow Logs', 'All of the above'],
      answerCorrect: 3
    },
    {
      question: 'A workload consisting of Amazon EC2 instances is placed in an Amazon VPC. What feature of VPC can be used to deny network traffic based on IP source address and port number?',
      answers: ['Subnets', 'Security groups', 'Route tables', 'Network Access Control Lists'],
      answerCorrect: 3
    },
    {
      question: 'Your company provides an online photo sharing service. The development team is looking for ways to deliver image files with the lowest latency to end users so the website content is delivered with the best possible performance. What service can help speed up distribution of these image files to end users around the world?',
      answers: ['Amazon Elastic Compute Cloud (Amazon EC2)', 'Amazon Route 53', 'AWS Storage Gateway', 'Amazon CloudFront'],
      answerCorrect: 3
    },
    {
      question: 'When an Amazon Relational Database Service database instance is run within an Amazon Private Cloud, which Amazon VPC security features can be used to protect the database instance?',
      answers: ['Security groups', 'Network ACLs', 'Private subnets', 'All of the above'],
      answerCorrect: 3
    },
    {
      question: 'You need to spin up an Apache Web Server on an Amazon Elastic Compute Cloud (Amazon EC2) instance. What is the best way to do so?',
      answers: ['Spin up an Amazon EC2 instance, use Secure Shell (SSH) to access it after it has booted up, and configure it to be an Apache Web Server', 'In the metadata field, load the necessary software to spin up an Apache Web Server', 'In the user data field, load the necessary software to spin up an Apache Web Server', 'Go to AWS Marketplace and find an Apache Web Server Amazon Machine Image (AMI)'],
      answerCorrect: 2
    },
    {
      question: 'You have just spun up an M4.2xlarge Amazon Elastic Compute Cloud (Amazon EC2) instance. What does the "4" stand for?',
      answers: ['Indicates the amount of RAM associated with the instance', 'Indicates the generation of M class family instance', 'Indicates the baseline number of CPUs associated with the instance', 'Has no meaning at all and is only an AWS naming convention'],
      answerCorrect: 1
    }
  ],

  currentQuestion: 0,
  userScore: 0
}

//register when start button is clicked and removes div with heading
//and start button
function clickStart() {
  $('.js-startPage').on('click', 'button', function(event) {

    $('.js-startPage').remove();
    $('#question-container').removeClass('hidden');
  })
};

//register when an answer/button has been clicked/chosen by the user
function clickAnswer(chosenElement, state) {

  var chosenAnswer = $(chosenElement).val();

  //if the chosen answer is correct, then tell the user "correct", otherwise "wrong :("
  if (chosenAnswer == state.questions[state.currentQuestion].answerCorrect) {

    state.userScore += 1;
    $('.response1').text('Correct!');
  } else {
    $('.response1').text('Wrong :(');

    //add class "wrong answer" so that the button that was clicked can be
    //marked with a red colour
    $(chosenElement).addClass('wrong-answer');
  }

  //add class to the correct answer so that this can be highlighted in green
  $('.button' + state.questions[state.currentQuestion].answerCorrect).addClass('button-correct');

  //remove hover class from button so the highlighted answers will still stay red and green
  //when you hover over them
  $('button').removeClass('hover');

  //show result
  $('.result').removeClass('hidden');
  //show continue button
  $('.js-continue').removeClass('hidden');
  //disable the answer buttons so user cannot continue clicking them
  $('.js-answer').attr('disabled', true);

  return state;
}


function clickContinue(state) {
  //increment which question user is on by one when continue is clicked
  state.currentQuestion += 1;
  //hide continue button and result again, remove questions and answer
  $('.js-continue').addClass('hidden');
  $('.result').addClass('hidden');
  $('section').remove();

  //if quiz is done insert "you're done" and user's score
  //remove count and score from bottom of page
  if (state.currentQuestion > 9) {
    $('body').append('<h1 class="end">You\'re done!</h1><p class ="endScore">You scored ' + state.userScore + " out of " + state.currentQuestion);
    $('.js-count').remove();
    $('.js-score').remove();

  } else {
    //if quiz is not done insert new question and answers and update user score and question count
    $('#question-container').append("<section class = 'question-container col-8'>" +
      "<p class='question'>" + state.questions[state.currentQuestion].question + "</p><br>" +
      "<button class='button0 js-answer hover' value = '0'>" + state.questions[state.currentQuestion].answers[0] + "</button><br>" +
      "<button class='button1 js-answer hover' value = '1'>" + state.questions[state.currentQuestion].answers[1] + "</button><br>" +
      "<button class='button2 js-answer hover' value = '2'>" + state.questions[state.currentQuestion].answers[2] + "</button><br>" +
      "<button class='button3 js-answer hover' value = '3'>" + state.questions[state.currentQuestion].answers[3] + "</button>" +
      "</section>");

    $('.js-count').text("Question: " + (state.currentQuestion + 1) + "/" + state.questions.length);
    $('.js-score').text("Correct: " + state.userScore + "/" + state.currentQuestion);
  }

}

$(function() {
  clickStart();
  $('#question-container').on('click', 'button', function(event) {

    clickAnswer($(this), state);
  });

  $('.js-continue').click(function(event) {

    clickContinue(state);
  });

});
