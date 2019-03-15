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

$("#trainInfoBtn").on("click", function (event) {
    event.preventDefault();
});

var name = $("#name").val().trim();

var destination = $("#destination").val().trim();

var time = moment($("#time").val().trim(), "hh:mm").subtract(1, "years").format("X");

var frequency = $("#frequency").val().trim();


var currentTime = moment();
console.log("CURRENT TIME:" + moment(currentTime).format("hh:mm"));

database.ref().push({
    train: name,
    trainGoing: destination,
    trainComing: time,
    everyXMin: frequency,
});

$("#name").val("");
$("#destination").val("");
$("#time").val("");
$("#frequency").val("");

return false;

database.ref().on("child_added", function (childSnapshot, ) {
    var newName = childSnapshot.val().train;
    var destination = childSnapshot.val().trainGoing;
    var time = childSnapshot.val().trainComing;
    var frequency = childSnapshot.val().everyXMin;
    
    console.log (newName,destination,time,frequency);
});
