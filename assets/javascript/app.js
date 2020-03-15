$(document).ready(function () {

// Your web app's Firebase configuration
var firebaseConfig = {
    apiKey: "AIzaSyAl8tSTTwC3FIPamosaXCO9tUFiCgHubd4",
    authDomain: "employees-2aa4a.firebaseapp.com",
    databaseURL: "https://employees-2aa4a.firebaseio.com",
    projectId: "employees-2aa4a",
    storageBucket: "employees-2aa4a.appspot.com",
    messagingSenderId: "846406660678",
    appId: "1:846406660678:web:05d5dddcf887320955d047"
  };
  // Initialize Firebase
  firebase.initializeApp(firebaseConfig);

  var database = firebase.database();

  var name = "";
  var location = "";
  var time = "";
  var frequency = "";

  $("#submit").on("click", function(event) {
    event.preventDefault();
  
    name = $("#name").val().trim();
    location = $("#location").val().trim();
    time = $("#time").val().trim();
    frequency = $("#frequency").val().trim();

    database.ref().push({
      name: name,
      location: location,
      time: time,
      frequency: frequency
    });
  });

	// 	$("#train-name-input").val("");
	// 	$("#dest-input").val("");
	// 	$("#firstTrain-input").val("");
	// 	$("#freq-input").val("");
	// });

  database.ref().on("child_added", function(childSnapshot) {
    console.log(childSnapshot.val().name);
    console.log(childSnapshot.val().location);
    console.log(childSnapshot.val().time);
    console.log(childSnapshot.val().frequency);

    var trainName = childSnapshot.val().name;
    var trainLocation = childSnapshot.val().location;
    var trainTime = childSnapshot.val().time;
    var trainFrequency = childSnapshot.val().frequency;

    // first time
    var firstTime = 0;
    var firstTimeConverted = moment(firstTime, "HH:mm").subtract(1, "years");
    console.log(firstTimeConverted);

    // current time
    var currentTime = moment().format("hh:mm");
    console.log(currentTime);

    // difference between first time input and current time in minutes (this includes the full year in minutes)
    var diffTime = moment().diff(moment(firstTimeConverted), "minutes");
    console.log(diffTime);

    // getting the remainder from time difference and frequency input
    var trainRemainder = diffTime % trainFrequency;
    console.log(trainRemainder);

    // calculates the minutes away
    var trainMinAway = trainFrequency - trainRemainder;
    console.log(trainMinAway);

    // calculates arrival time
    var trainNextArrival = moment().add(trainMinAway, "minutes");
    console.log(moment(trainNextArrival).format("hh:mm"));

    trainNextArrival = (moment(trainNextArrival).format("hh:mm a"));

    var tableRow = $("<tr>");

    // Creates elements
    var tableName = $("<td>");
    var tableLocation = $("<td>");
    var tableFrequency = $("<td>");
    var tableNextArrival = $("<td>");
    var tableMinutesAway = $("<td>");

    // Change text in each of them
    tableName.text(trainName);
    tableLocation.text(trainLocation);
    tableFrequency.text(trainFrequency + " minutes");
    tableNextArrival.text(trainNextArrival);
    tableMinutesAway.text(trainMinAway);

    tableRow.append(tableName);
    tableRow.append(tableLocation);
    tableRow.append(tableFrequency);
    tableRow.append("<td id='next-arrival'>" + trainNextArrival);
    tableRow.append("<td id='minutes-away'>" + trainMinAway + " minutes");
    $("#table-body").append(tableRow);

}, function(errorObject) {
    console.log("Errors handles: " + errorObject.code);
  });

  $("#submit").on("click", function() {
    $("#name").val("");
    $("#location").val("");
    $("#time").val("");
    $("#frequency").val("");
  });

});