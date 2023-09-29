let KuralDivisions = document.querySelector("#KuralDivisions");
let KuralSubDivisions = document.querySelector("#KuralSubDivisions");
let chapterGroups = document.querySelector("#chapterGroups");
let KuralSubDivisionsArray = [];
let chapterGroupArray = [];

function fechCall(number) {
  return fetch(`https://api-thirukkural.vercel.app/api?num=${number}`)
    .then((response) => response.json())
    .catch((error) => console.log(error));
}

function assignOptions(data) {
  if (data.sect_tam === KuralDivisions.value) {
    if (!KuralSubDivisionsArray.includes(data.chap_tam)) {
      KuralSubDivisionsArray.push(data.chap_tam);
      let option = document.createElement("option");
      option.innerText = `${data.chap_tam}`;
      KuralSubDivisions.appendChild(option);
    }
  }
}

function chapterGroupAssign(data) {
  if (data.sect_tam === KuralDivisions.value) {
    if (!chapterGroupArray.includes(data.chapgrp_tam)) {
      chapterGroupArray.push(data.chapgrp_tam);
      let option = document.createElement("option");
      option.innerText = `${data.chap_tam}`;
      chapterGroups.appendChild(option);
    }
  }
}

function optionCall() {
  KuralSubDivisions.innerHTML = "";
  if (KuralDivisions.value === "அறத்துப்பால்") {
    for (let number = 1; number <= 380; number++) {
      fechCall(number)
        .then((data) => assignOptions(data))
        .then((data) => chapterGroupAssign(data));
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

function chapterGroupCall() {
  if (KuralDivisions.value === "அறத்துப்பால்") {
    chapterGroupArray1.forEach((value) => {
      let option = document.createElement("option");
      option.innerText = value;
      chapterGroups.appendChild(option);
    });
  }
  if (KuralDivisions.value === "பொருட்பால்") {
  }
  if (KuralDivisions.value === "காமத்துப்பால்") {
  }
}

KuralDivisions.addEventListener("change", optionCall);
KuralSubDivisions.addEventListener("change", chapterGroupCall);
optionCall();
chapterGroupCall();
