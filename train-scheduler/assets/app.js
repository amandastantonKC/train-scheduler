$(document).ready(function () {


    //Initialize Firebase
    var config = {
        apiKey: "AIzaSyCb_2Usxp4daE5hfH1j_jEvdg49smbUojg",
        authDomain: "train-scheduler-a3e2f.firebaseapp.com",
        databaseURL: "https://train-scheduler-a3e2f.firebaseio.com",
        projectId: "train-scheduler-a3e2f",
        storageBucket: "train-scheduler-a3e2f.appspot.com",
        messagingSenderId: "430702320916"
    };
    firebase.initializeApp(config);
});


var database = firebase.database();
var trainName = "";
var destination = "";
var frequency = "";
var firstArrival = "";


$("#addTrain").on("click", function () {
    event.preventDefault();

    trainName = $("#train-name").val().trim();
    destination = $("#train-dest").val().trim();
    frequency = $("#train-freq").val().trim();
    firstArrival = $("#train-time").val().trim();


    var currentTime = moment();  
console.log("CURRENT TIME:" + moment(currentTime).format("hh:mm"));

var newTrain = {
    trainName: trainName,
    destination: destination,
    firstArrival: firstArrival,
    frequency : frequency,
    dateAdded: firebase.database.serverValue.TIMESTAMP
};

database.ref().push(newTrain);

$("#train-name").val("");
$("#train-dest").val("");
$("#train-Time").val("");
$("#train-freq").val("");

});

firebase.database().ref().on("child_added", function(childSnapShot) {
    console.log(childSnapShot.val());

    var tName = childSnapshot.val().trainName;
    var tDest = childSnapShot.val().destination;
    var tArrival = childSnapShot.val().firstArrival;
    var tFreq = childSnapShot.val().frequency;

    var tFrequency = tFreq;
    var firstTime = tArrival;
    var firstTimeConverted = moment(firstTime, "hh:mm").subtract(1, "years");
    var currentTime = moment();

    var diffTime = moment().diff(moment(firstTimeConverted), 'minutes');
    var tRemainder = diffTime % tFrequency;
    var tMinUntil = tFrequency - tRemainder;
    var nextTrain = moment().add(tMinUntil, "minutes").format("hh:mm");

    $("tbody").append("<tr><td>" + tName + "</td><td>" + tDest + "</td><td>" + tFreq + "</td><td>" + nextTrain + "</td><td>" + tminUntil + "</td></tr>");
    

  }, function(errorObject) {
    console.log("Errors handled: " + errorObject.code);
  });



    
