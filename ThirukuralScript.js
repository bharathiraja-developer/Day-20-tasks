// create a reference for the class and id
let KuralDivisions = document.querySelector("#KuralDivisions");
let KuralSubDivisions = document.querySelector("#KuralSubDivisions");
let chapterGroups = document.querySelector("#chapterGroups");
let kural = document.querySelector(".kural");
let KuralSubDivisionsArray = [];
let chapterGroupArray = [];

// fectchCall returns the promise
function fechCall(number) {
  return fetch(`https://api-thirukkural.vercel.app/api?num=${number}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

// assignOption function update the page for choose options
function assignOptions(data) {
  if (data.sect_tam === KuralDivisions.value) {
    if (!chapterGroupArray.includes(data.chapgrp_tam)) {
      chapterGroupArray.push(data.chapgrp_tam);
      let option = document.createElement("option");
      option.innerText = `${data.chapgrp_tam}`;
      chapterGroups.appendChild(option);
    }
  }
  if (data.chapgrp_tam === chapterGroups.value) {
    if (!KuralSubDivisionsArray.includes(data.chap_tam)) {
      KuralSubDivisionsArray.push(data.chap_tam);
      let option = document.createElement("option");
      option.innerText = `${data.chap_tam}`;
      KuralSubDivisions.appendChild(option);
    }
  }
  if (data.chap_tam === KuralSubDivisions.value) {
    let kuraldiv = document.createElement("div");
    kuraldiv.innerText = `  ${data.line1}
    ${data.line2}`;
    let hr = document.createElement("hr");
    kural.append(kuraldiv, hr);
  }
}

// this function makes a call between the fetch call and the assingOptions function
function optionCall() {
  kural.innerHTML = "";
  if (KuralDivisions.value === "அறத்துப்பால்") {
    for (let number = 1; number <= 380; number++) {
      fechCall(number).then((data) => assignOptions(data));
    }
  }
  if (KuralDivisions.value === "பொருட்பால்") {
    for (let number = 381; number <= 1080; number++) {
      fechCall(number).then((data) => assignOptions(data));
    }
  }
  if (KuralDivisions.value === "காமத்துப்பால்") {
    for (let number = 1081; number <= 1330; number++) {
      fechCall(number).then((data) => assignOptions(data));
    }
  }
}

// Add eventListener for choosing the option
KuralDivisions.addEventListener("change", () => {
  chapterGroups.innerHTML = "";
  KuralSubDivisions.innerHTML = "";
  optionCall();
});
chapterGroups.addEventListener("change", () => {
  KuralSubDivisions.innerHTML = "";
  optionCall();
});
KuralSubDivisions.addEventListener("change", optionCall);
optionCall();
