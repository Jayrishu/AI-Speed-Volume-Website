song="";
leftWristx = 0;
leftWristy = 0;
rightWristx = 0;
rightWristy = 0;
ScoreLeftWrist = 0;
ScoreRightWrist = 0;
function preload(){
    song = loadSound("music.mp3");
}
function setup(){
    canvas = createCanvas(600,500);
    canvas.position(600,200);

    video = createCapture(VIDEO);
    video.hide();
    poseNet = ml5.poseNet(video, modelLoaded);
    poseNet.on("pose", gotPoses);
}
function draw(){
    image(video,0,0,600,500);
    fill(255,0,0);
    stroke(0,255,255);
    if (ScoreLeftWrist > 0.2) {
    circle(leftWristx,leftWristy,10);
    leftWristYNumber = Number(leftWristy);
    remove_decimal = floor(leftWristYNumber);
    divide = remove_decimal/500;
    document.getElementById("volume").innerHTML = "Volume - "+divide;
    song.setVolume(divide);
    console.log("Volume - "+divide);
    }
    if (ScoreRightWrist > 0.2) {
        circle(rightWristx,rightWristy,10);
        if (rightWristy >0 && rightWristy <100) {
            document.getElementById("speed").innerHTML = "Speed - 0.5x";
            song.rate(0.5);
        }else if(rightWristy >100 && rightWristy <200) {
            document.getElementById("speed").innerHTML = "Speed - 1x";
            song.rate(1);
        }else if(rightWristy >200 && rightWristy <300) {
            document.getElementById("speed").innerHTML = "Speed - 1.5x";
            song.rate(1.5);
        }else if(rightWristy >300 && rightWristy <400) {
            document.getElementById("speed").innerHTML = "Speed - 2x";
            song.rate(2);
        }else if(rightWristy >400 && rightWristy <500) {
            document.getElementById("speed").innerHTML = "Speed - 2.5x";
            song.rate(2.5);
        }
    }
}
function playsong(){
    song.play();
    song.setVolume(1);
    song.rate(1);
}
function modelLoaded(){
    console.log("Model Is Loaded");
}
function gotPoses(results){
    if (results.length > 0) {
        console.log(results);
        ScoreRightWrist = results[0].pose.keypoints[10].score;
        ScoreLeftWrist = results[0].pose.keypoints[9].score;
        console.log("Score Left Wrist - "+ScoreLeftWrist);
        leftWristx = results[0].pose.leftWrist.x;
        leftWristy = results[0].pose.leftWrist.y;
        rightWristx = results[0].pose.rightWrist.x;
        rightWristy = results[0].pose.rightWrist.y;
        console.log("Left Wrist X - "+leftWristx+" , Left Wrist Y - "+leftWristy);
        console.log("Right Wrist X - "+rightWristx+" , Right Wrist Y - "+rightWristy);
    }
}