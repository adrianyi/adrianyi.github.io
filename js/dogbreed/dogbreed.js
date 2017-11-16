var canvas  = document.querySelector("#canvas");
var context = canvas.getContext("2d");
var input_file = document.querySelector("#input_file")
// var submit = document.querySelector("#submit")
canvas.width = 256;
canvas.height = 256;

// submit.addEventListener('click', function() {
//     var image = canvas.toDataURL();
//     var result = $("#result")
//     result.text("...thinking... (this might take up to 20 seconds)")
//     $.ajax({
//         type: "POST",
//         url: "https://dog-breed-app.appspot.com/",
//         data: image,
//         success: function(data){
//             result.text(data);
//         }
//     });
// }, false);

function drawImg() {
    if ( this.files && this.files[0] ) {
        var reader = new FileReader();
        reader.onload = function(e) {
            var img = new Image();
            img.addEventListener("load", function() {
                context.drawImage(img, 0, 0, 256, 256);
            });
            img.src = reader.result;
        };
        reader.readAsDataURL( this.files[0] );
    }
};

input_file.addEventListener("change", drawImg, false);

var video = document.querySelector("#video");
var webcam = document.querySelector("#webcam");

function startMedia() {
    navigator.mediaDevices.getUserMedia({ video: true, audio: false })
        .then(function(stream) {
            video.srcObject = stream;
            video.play();
        })
        .catch(function(err) {
            console.log("An error occured! " + err);
        });
};

webcam.addEventListener('click', function(e){
    console.log('clicked');
    if ($("#webcam").text() !== 'Snap photo') {
        startMedia();
        $("#webcam").text('Snap photo');
    } else {
        context.drawImage(video, 0, 0, canvas.width, canvas.height);
    };
}, false);
