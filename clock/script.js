setInterval(currentTime, 1000); // jede Sekunde wird die Funktion ausgeführt

const analogClock = document.querySelector("#analog-clock");
//console.log(redColor);
const hourHand = document.querySelector("#hour");
const minuteHand = document.querySelector("#minute");
const secondHand = document.querySelector("#second");
const digitalHour = document.querySelector("#hourDig");
const digitalMinute = document.querySelector("#minuteDig");
const digitalSecond = document.querySelector("#secondDig");
const digitalDots = document.querySelectorAll(".dig");
console.log(digitalDots);
function currentTime() {
  const clock = new Date();

  let hour = clock.getHours();
  let minute = clock.getMinutes();
  let second = clock.getSeconds();
  console.log(hour);
  console.log(minute);
  console.log(second);

  ///// analog clock //////
  const angleSecond = (second * 360) / 60;
  const angleMinute = (minute * 360) / 60;
  const angleHour = (hour * 360) / 12 + angleMinute / 12;

  hourHand.style.transform = `rotate(${angleHour}deg)`;
  //   if (second === 59) {
  //     //zusätzliche Bedienung second >= 0
  //     hourHand.style.transform = `rotate(${30.1 * hour}deg)`; // der Uhrzeiger springt zurück zu 30deg....
  //     //hourHand.style.transform = hour + `rotate(${0.1 * hour}deg)`;
  //   }
  minuteHand.style.transform = `rotate(${angleMinute}deg)`;
  secondHand.style.transform = `rotate(${angleSecond}deg)`;

  ///// analog clock //////

  //// digital clock //////
  if (hour < 10) {
    hour = "0" + hour;
  }

  if (minute < 10) {
    minute = "0" + minute;
  }

  if (second < 10) {
    second = "0" + second;
  }

  digitalHour.textContent = hour;
  digitalMinute.textContent = minute;
  digitalSecond.textContent = second;

  digitalDots.forEach((element) => element.classList.toggle("hidden"));

  ////// digital clock //////
}

currentTime();
