//For sound analysis
let classifier;
// Label
let label = '   ';
// Teachable Machine model URL:
let soundModel = 'https://teachablemachine.withgoogle.com/models/i69SyMDOv/';
//for face tracking
let icon;
let capture;
let tracker;
let w = 1920,
h = 1080;




function preload() {
  // Load the model
  classifier = ml5.soundClassifier(soundModel + 'model.json');
}

function setup() {
  createCanvas(320, 240);
  // Start classifying
  // The sound model will continuously listen to the microphone
  classifier.classify(gotResult);

  //ForVideotracking
  capture = createCapture({
    audio: false,
    video: {
      width: w,
      height: h
    }
  }, function() {
    console.log('capture ready.')
  });
  capture.elt.setAttribute('playsinline', '');
  createCanvas(w, h);
  capture.size(w, h);
  capture.hide();
  tracker = new clm.tracker();
  tracker.init();
  tracker.start(capture.elt)
}
// The model recognizing a sound will trigger this event
function gotResult(error, results) {
  if (error) {
    console.error(error);
    return;
  }
  // The results are in an array ordered by confidence.
  // console.log(results[0]);
  label = results[0].label;
  console.log(results);
}
function draw() {
  background(0);
  textSize(32);
  imageMode(CORNERS);
  image(capture, 0, 0, w, h);
  var positions = tracker.getCurrentPosition();
  imageMode(CENTER);
  noFill();
  stroke(255);
  beginShape();
  // for (let i = 0; i < positions.length; i++) {
  //     vertex(positions[i][0], positions[i][1]);
  // }
  endShape();

  fill(255,0,0);

  noStroke();
  for (let i = 0; i < positions.length; i++) {
    // fill(map(i, 0, positions.length, 0, 360), 50, 100);
    // ellipse(positions[i][0], positions[i][1], 4, 4);
    // text(i, positions[i][0], positions[i][1]);
    textSize(65);
    text(label, positions[33][0], positions[33][1]);

    let icon = '😀';
    if (label == '1'){
      icon == '😉';
    } else if (label == '2'){
      icon == ' 🤯';
    } else if (label == '3'){
      icon == ' 🤯';
    } else if (label == '4'){
      icon == ' 🤯';
    } else if (label == '5'){
      icon == ' 🤯';
    } else if (label == '6'){
      icon == ' 🤯';
    } else if (label == '7'){
      icon == ' 🤯';
    } else if (label == '8'){
      icon == ' 🤯';
    } else if (label == '9'){
      icon == ' 🤯';
    }
    textSize(100);
    text(icon,positions[62][0], positions[62][1] );

  }

  if (positions.length > 0) {
    var mouthLeft = createVector(positions[44][0], positions[44][1]);
    var mouthRight = createVector(positions[50][0], positions[50][1]);
    var smile = mouthLeft.dist(mouthRight);
    // uncomment the line below to show an estimate of amount "smiling"
    // rect(20, 20, smile * 3, 20);

    // uncomment for a surprise
    // noStroke();
    // fill(0, 255, 255);
    // ellipse(positions[62][0], positions[62][1], 50, 50);
  }


}
