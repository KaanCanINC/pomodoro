//Bakılcak kodlar: self, apply

var pomodoro = {
    started: false,
    minutes: 0,
    seconds: 0,
    fillelHeight: 0,
    fillerIncrement: 0,
    interval: null,
    minutesDom: null,
    secondsDom: null,
    fillerDom: null,
    init: function () {
      var self = this;
      this.minutesDom = document.querySelector("#minutes");
      this.secondsDom = document.querySelector("#seconds");
      this.fillersDom = document.querySelector("#filler");
      this.interval = setInterval(function () {
        self.intervalCallback.apply(self);
      }, 1000);
      document.querySelector("#work").onclick = function () {
        self.startWork.apply(self);
        document.body.style.backgroundColor = "#923737";
        document.getElementById("container").style.backgroundColor = "#863434";
      };
      document.querySelector("#shortBreak").onclick = function () {
        self.startShortBreak.apply(self);
        document.body.style.backgroundColor = "#2d6a6e";
        document.getElementById("container").style.backgroundColor = "#1e494d";
      };
      document.querySelector("#longBreak").onclick = function () {
        self.startLongBreak.apply(self);
        document.body.style.backgroundColor = "#2e5a79";
        document.getElementById("container").style.backgroundColor = "#193345";
      };
      document.querySelector("#stop").onclick = function () {
        self.stopTimer.apply(self);
        document.body.style.backgroundColor = "#923737";
        document.getElementById("container").style.backgroundColor = "#863434";
      };
    },
    resetVariables: function (mins, secs, started) {
      this.minutes = mins;
      this.seconds = secs;
      this.started = started;
      this.fillerIncrement = 200 / (this.minutes * 60);
      this.fillelHeight = 0;
    },
    startWork: function () {
      this.resetVariables(60, 0, true);
    },
    startShortBreak: function () {
      this.resetVariables(10, 0, true);
    },
    startLongBreak: function () {
      this.resetVariables(25, 0, true);
    },
    stopTimer: function () {
      this.resetVariables(60, 0, false);
      this.updateDom();
    },
    toDoubleDigit: function (num) {
      if (num < 10) {
        return "0" + parseInt(num, 10);
      }
      return num;
    },
    updateDom: function () {
      this.minutesDom.innerHTML = this.toDoubleDigit(this.minutes);
      this.secondsDom.innerHTML = this.toDoubleDigit(this.seconds);
      this.fillerHeight = this.fillerHeight + this.fillerIncrement;
      this.fillerDom.style.height = this.fillerHeight + "px";
    },
    intervalCallback: function () {
      if (!this.started) return false;
      if (this.seconds == 0) {
        if (this.minutes == 0) {
          this.timerComplete();
          return;
        }
        this.seconds = 59;
        this.minutes--;
      } else {
        this.seconds--;
      }
      this.updateDom();
    },
    timerComplete: function () {
      this.started = false;
      this.fillelHeight = 0;
    },
  };
  
  window.onload = function () {
    pomodoro.init();
  };
  