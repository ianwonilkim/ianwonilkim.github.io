var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Guitar = function () {
  function Guitar(context, buffer) {
    _classCallCheck(this, Guitar);

    this.context = context;
    this.buffer = buffer;
  }

  _createClass(Guitar, [{
    key: 'setup',
    value: function setup() {
      this.gainNode = this.context.createGain();
      this.source = this.context.createBufferSource();
      this.source.buffer = this.buffer;
      this.source.connect(this.gainNode);
      this.gainNode.connect(this.context.destination);

      this.gainNode.gain.setValueAtTime(0.8, this.context.currentTime);
    }
  }, {
    key: 'play',
    value: function play() {
      this.setup();
      this.source.start(this.context.currentTime);
    }
  }, {
    key: 'stop',
    value: function stop() {
      var ct = this.context.currentTime + 0.5;
      this.gainNode.gain.exponentialRampToValueAtTime(0.001, ct);
      this.source.stop(ct);
    }
  }]);

  return Guitar;
}();

var Buffer = function () {
  function Buffer(context, urls) {
    _classCallCheck(this, Buffer);

    this.context = context;
    this.urls = urls;
    this.buffer = [];
  }

  _createClass(Buffer, [{
    key: 'loadSound',
    value: function loadSound(url, index) {
      var request = new XMLHttpRequest();
      request.open('get', url, true);
      request.responseType = 'arraybuffer';
      var thisBuffer = this;
      request.onload = function () {
        // Safari doesn't support promise based syntax
        thisBuffer.context.decodeAudioData(request.response, function (buffer) {
          thisBuffer.buffer[index] = buffer;
          updateProgress(thisBuffer.urls.length);
          if (index == thisBuffer.urls.length - 1) {
            thisBuffer.loaded();
          }
        });
      };
      request.send();
    }
  }, {
    key: 'getBuffer',
    value: function getBuffer() {
      var _this = this;

      this.urls.forEach(function (url, index) {
        _this.loadSound(url, index);
      });
    }
  }, {
    key: 'loaded',
    value: function loaded() {
      document.querySelector('.loading').style.opacity = 0;
      document.querySelector('.loading').style.height = 0;
      document.querySelector('.notes').style.height = "auto";
      document.querySelector('.notes').style.opacity = 1;
      _loaded = true;
    }
  }, {
    key: 'getSound',
    value: function getSound(index) {
      return this.buffer[index];
    }
  }]);

  return Buffer;
}();

var progressBar = document.querySelector('.progress');
var iteration = 0;

function updateProgress(total) {
  progressBar.style.width = ++iteration / total * 100 + '%';
}

var guitar = null;
var preset = 0;
var _loaded = false;

function playGuitar_Cm() {

  var index = parseInt(this.dataset.note) + preset;
  guitar = new Guitar(context, buffer.getSound(index));
  guitar.play();
}

function playGuitar_F7() {

  var index = parseInt(this.dataset.note) + 9;
  guitar = new Guitar(context, buffer.getSound(index));
  guitar.play();
}

function playGuitar_Bb() {

  var index = parseInt(this.dataset.note) + 18;
  guitar = new Guitar(context, buffer.getSound(index));
  guitar.play();
}


function playGuitar_Eb() {

  var index = parseInt(this.dataset.note) + 27;
  guitar = new Guitar(context, buffer.getSound(index));
  guitar.play();
}

function playGuitar_Am() {

  var index = parseInt(this.dataset.note) + 36;
  guitar = new Guitar(context, buffer.getSound(index));
  guitar.play();
}

function playGuitar_D7alt() {

  var index = parseInt(this.dataset.note) + 45;
  guitar = new Guitar(context, buffer.getSound(index));
  guitar.play();
}

function playGuitar_Gm() {

  var index = parseInt(this.dataset.note) + 54;
  guitar = new Guitar(context, buffer.getSound(index));
  guitar.play();
}

function playGuitar_Gbm() {

  var index = parseInt(this.dataset.note) + 63;
  guitar = new Guitar(context, buffer.getSound(index));
  guitar.play();
}

function playGuitar_Fm() {

  var index = parseInt(this.dataset.note) + 72;
  guitar = new Guitar(context, buffer.getSound(index));
  guitar.play();
}

function playGuitar_Bb7() {

  var index = parseInt(this.dataset.note) + 81;
  guitar = new Guitar(context, buffer.getSound(index));
  guitar.play();
}

function playGuitar_G7alt() {

  var index = parseInt(this.dataset.note) + 90;
  guitar = new Guitar(context, buffer.getSound(index));
  guitar.play();
}















///////////////////

function stopGuitar() {
  guitar.stop();
}

var context = new (window.AudioContext || window.webkitAudioContext)();
var now = context.currentTime;

var sounds = 
['Final/piano/C4.mp3', 'Final/piano/D4.mp3', 'Final/piano/Eb4.mp3', 'Final/piano/F4.mp3', 'Final/piano/G4.mp3', 'Final/piano/A4.mp3', 'Final/piano/Bb4.mp3', 'Final/piano/C5.mp3', 'Final/piano/D5.mp3', 


'Final/piano/C4.mp3', 'Final/piano/D4.mp3', 'Final/piano/Eb4.mp3', 'Final/piano/F4.mp3', 'Final/piano/Gb4.mp3', 'Final/piano/Ab4.mp3', 'Final/piano/A4.mp3', 'Final/piano/B4.mp3', 'Final/piano/C5.mp3', 


'Final/piano/Bb3.mp3', 'Final/piano/C4.mp3', 'Final/piano/D4.mp3', 'Final/piano/Eb4.mp3', 'Final/piano/F4.mp3', 'Final/piano/G4.mp3', 'Final/piano/A4.mp3', 'Final/piano/Bb4.mp3', 'Final/piano/C5.mp3', 


'Final/piano/Bb3.mp3', 'Final/piano/C4.mp3', 'Final/piano/D4.mp3', 'Final/piano/Eb4.mp3', 'Final/piano/F4.mp3', 'Final/piano/G4.mp3', 'Final/piano/A4.mp3', 'Final/piano/Bb4.mp3', 'Final/piano/C5.mp3', 


'Final/piano/A3.mp3', 'Final/piano/Bb3.mp3', 'Final/piano/C4.mp3', 'Final/piano/D4.mp3', 'Final/piano/Eb4.mp3', 'Final/piano/F4.mp3', 'Final/piano/G4.mp3', 'Final/piano/A4.mp3', 'Final/piano/Bb4.mp3', 


'Final/piano/A3.mp3', 'Final/piano/Bb3.mp3', 'Final/piano/C4.mp3', 'Final/piano/D4.mp3', 'Final/piano/Eb4.mp3', 'Final/piano/F4.mp3', 'Final/piano/Gb4.mp3', 'Final/piano/Ab4.mp3', 'Final/piano/A4.mp3', 


'Final/piano/G3.mp3', 'Final/piano/A3.mp3', 'Final/piano/Bb3.mp3', 'Final/piano/C4.mp3', 'Final/piano/D4.mp3', 'Final/piano/Eb4.mp3', 'Final/piano/F4.mp3', 'Final/piano/G4.mp3', 'Final/piano/A4.mp3', 


'Final/piano/Gb3.mp3', 'Final/piano/Ab3.mp3', 'Final/piano/Bb3.mp3', 'Final/piano/B3.mp3', 'Final/piano/Db4.mp3', 'Final/piano/Eb4.mp3', 'Final/piano/E4.mp3', 'Final/piano/Gb4.mp3', 'Final/piano/Ab4.mp3', 


'Final/piano/F3.mp3', 'Final/piano/G3.mp3', 'Final/piano/Ab3.mp3', 'Final/piano/Bb3.mp3', 'Final/piano/C4.mp3', 'Final/piano/Db4.mp3', 'Final/piano/Eb4.mp3', 'Final/piano/F4.mp3', 'Final/piano/G4.mp3', 


'Final/piano/F3.mp3', 'Final/piano/G3.mp3', 'Final/piano/Ab3.mp3', 'Final/piano/Bb3.mp3', 'Final/piano/C4.mp3', 'Final/piano/D4.mp3', 'Final/piano/Eb4.mp3', 'Final/piano/F4.mp3', 'Final/piano/G4.mp3', 


'Final/piano/G3.mp3', 'Final/piano/Ab3.mp3', 'Final/piano/Bb3.mp3', 'Final/piano/B3.mp3', 'Final/piano/Db4.mp3', 'Final/piano/Eb4.mp3', 'Final/piano/F4.mp3', 'Final/piano/G4.mp3', 'Final/piano/Ab4.mp3', 




];



//////////////악보







// var audio = document.getElementById("player");


// // Countup
// audio.addEventListener("timeupdate", function() {
//     var timeline = document.getElementById('duration');
//     var s = parseInt(audio.currentTime % 60);
//     var m = parseInt((audio.currentTime / 60) % 60);
//     if (s < 10) {
//         timeline.innerHTML = m + ':0' + s;
//     }
//     else {
//         timeline.innerHTML = m + ':' + s;
//     }
// }, false);


////////////

var audio = document.querySelector('audio');
var play = document.querySelector('.play');
var rewind = document.querySelector('.rewind');
var circle = document.querySelector('.circle');

function getCurTime() { 

    console.log(audio.currentTime);
} 

function setCurTime1() { 
    var input = prompt('Message');


    audio.currentTime = input;
} 

function setCurTime2() { 
  

    audio.currentTime += 2;
} 

// Countup
audio.addEventListener("timeupdate", function () {
  var timeline = document.getElementById('duration');
  var s = parseInt(audio.currentTime);
  timeline.innerHTML = s;
}, false);

audio.addEventListener('pause', pauseTrack);
audio.addEventListener('play', playTrack);

play.addEventListener('click', function () {
  if (audio.paused) {
    audio.play();
    playTrack();
  } else {
    audio.pause();
    pauseTrack();
  }
});
rewind.addEventListener('click', function () {
  audio.currentTime = 0;
});
circle.addEventListener('click', function () {
  preset = preset == 0 ? 15 : 0;
  circle.classList.toggle('rock');
});
audio.addEventListener('ended', function () {
  pauseTrack();
});

function playTrack() {
  play.querySelector('.pause-icon').style.display = "block";
  play.querySelector('.play-icon').style.display = "none";
}

function pauseTrack() {
  play.querySelector('.pause-icon').style.display = "none";
  play.querySelector('.play-icon').style.display = "block";
}

////////notemaking

function notereset(){

  var x = document.getElementsByClassName('note key');
      while (x && x.length) {
      x[0].className = 'note'
      }

}


function notemaking(name1,name2,name3,name4,name5){

  document.getElementById(name1).className = "note key";
  document.getElementById(name2).className = "note key";
  document.getElementById(name3).className = "note key";
  document.getElementById(name4).className = "note key";
  if (name5 != 0){
    document.getElementById(name5).className = "note key";
  }
  else{
    document.getElementById(name1).className = "note key";
  }

}

//////////

var buffer = new Buffer(context, sounds);
var guitarSound = buffer.getBuffer();

var buttons = document.querySelectorAll('.notes .note');

window.setInterval(function () {

  if (audio.currentTime > 8.0 && audio.currentTime < 10) {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.addEventListener('mouseenter', playGuitar_Cm);
      button.addEventListener('mouseleave', stopGuitar); 
    });
  }


  if (audio.currentTime > 10 && audio.currentTime < 12)  {
    
    notereset();
    notemaking(3,4,7,9,0);
    

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Cm);
      button.addEventListener('mouseenter', playGuitar_F7);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 12 && audio.currentTime < 14)  {
    notereset();
    notemaking(1,3,5,7,8);


    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_F7);
      button.addEventListener('mouseenter', playGuitar_Bb);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }

   if (audio.currentTime > 14 && audio.currentTime < 16)  {

    notereset();
    notemaking(1,3,4,6,8);


    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Bb);
      button.addEventListener('mouseenter', playGuitar_Eb);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }

   if (audio.currentTime > 16 && audio.currentTime < 18)  {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Eb);
      button.addEventListener('mouseenter', playGuitar_Am);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 18 && audio.currentTime < 20)  {
    notereset();
    notemaking(1,3,5,7,9);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Am);
      button.addEventListener('mouseenter', playGuitar_D7alt);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 20 && audio.currentTime < 24)  {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_D7alt);
      button.addEventListener('mouseenter', playGuitar_Gm);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
////////////Bar 9



  if (audio.currentTime > 24.0 && audio.currentTime < 26) {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Gm);
      button.addEventListener('mouseenter', playGuitar_Cm);
      button.addEventListener('mouseleave', stopGuitar); 
    });
  }


  if (audio.currentTime > 26 && audio.currentTime < 28)  {
    
    notereset();
    notemaking(3,4,7,9,0);
    

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Cm);
      button.addEventListener('mouseenter', playGuitar_F7);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 28 && audio.currentTime < 30)  {
    notereset();
    notemaking(1,3,5,7,8);


    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_F7);
      button.addEventListener('mouseenter', playGuitar_Bb);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }

   if (audio.currentTime > 30 && audio.currentTime < 32)  {

    notereset();
    notemaking(1,3,4,6,8);


    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Bb);
      button.addEventListener('mouseenter', playGuitar_Eb);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }



  //////////////34

   if (audio.currentTime > 32 && audio.currentTime < 34)  {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Eb);
      button.addEventListener('mouseenter', playGuitar_Am);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 34 && audio.currentTime < 36)  {
    notereset();
    notemaking(1,3,5,7,9);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Am);
      button.addEventListener('mouseenter', playGuitar_D7alt);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 36 && audio.currentTime < 40)  {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_D7alt);
      button.addEventListener('mouseenter', playGuitar_Gm);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }

///////////////////////B part

   if (audio.currentTime > 40 && audio.currentTime < 42)  {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Gm);
      button.addEventListener('mouseenter', playGuitar_Am);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 42 && audio.currentTime < 44)  {
    notereset();
    notemaking(1,3,5,7,9);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Am);
      button.addEventListener('mouseenter', playGuitar_D7alt);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 44 && audio.currentTime < 48)  {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_D7alt);
      button.addEventListener('mouseenter', playGuitar_Gm);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }


  if (audio.currentTime > 48 && audio.currentTime < 50) {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Gm);
      button.addEventListener('mouseenter', playGuitar_Cm);
      button.addEventListener('mouseleave', stopGuitar); 
    });
  }


  if (audio.currentTime > 50 && audio.currentTime < 52)  {
    
    notereset();
    notemaking(3,4,7,9,0);
    

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Cm);
      button.addEventListener('mouseenter', playGuitar_F7);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 52 && audio.currentTime < 54)  {
    notereset();
    notemaking(1,3,5,7,8);


    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_F7);
      button.addEventListener('mouseenter', playGuitar_Bb);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }

   if (audio.currentTime > 54 && audio.currentTime < 56)  {
 

    notereset();
    notemaking(1,3,4,6,8);


    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Bb);
      button.addEventListener('mouseenter', playGuitar_Eb);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
////////last

   if (audio.currentTime > 56 && audio.currentTime < 58)  {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Eb);
      button.addEventListener('mouseenter', playGuitar_Am);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 58 && audio.currentTime < 60)  {
    notereset();
    notemaking(1,3,5,7,9);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Am);
      button.addEventListener('mouseenter', playGuitar_D7alt);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 60 && audio.currentTime < 61)  {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_D7alt);
      button.addEventListener('mouseenter', playGuitar_Gm);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
   if (audio.currentTime > 61 && audio.currentTime < 62)  {
    notereset();
    notemaking(2,4,5,7,9);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Gm);
      button.addEventListener('mouseenter', playGuitar_Gbm);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
  
   if (audio.currentTime > 62 && audio.currentTime < 63)  {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Gbm);
      button.addEventListener('mouseenter', playGuitar_Fm);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
  
  if (audio.currentTime > 63 && audio.currentTime < 64)  {
    notereset();
    notemaking(1,3,5,6,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Fm);
      button.addEventListener('mouseenter', playGuitar_Bb7);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
  
  if (audio.currentTime > 64 && audio.currentTime < 66)  {
    notereset();
    notemaking(1,3,4,6,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Bb7);
      button.addEventListener('mouseenter', playGuitar_Eb);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }

  if (audio.currentTime > 66 && audio.currentTime < 67)  {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Eb);
      button.addEventListener('mouseenter', playGuitar_Am);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }

  if (audio.currentTime > 67 && audio.currentTime < 68)  {
    notereset();
    notemaking(1,3,5,7,9);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_Am);
      button.addEventListener('mouseenter', playGuitar_D7alt);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }
  if (audio.currentTime > 68 && audio.currentTime < 72)  {
    notereset();
    notemaking(1,3,5,7,8);

    buttons.forEach(function (button, element) {
      button.removeEventListener('mouseenter', playGuitar_D7alt);
      button.addEventListener('mouseenter', playGuitar_Gm);
      button.addEventListener('mouseleave', stopGuitar);
    });
  }







}, 250);

////악보


