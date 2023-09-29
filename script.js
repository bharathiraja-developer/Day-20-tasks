let input = document.getElementsByClassName("wordInput");
let wordClass = document.getElementsByClassName("wordClass");
let soundDiv = document.createElement("div");

// fetchCall function returns the data in JSON format.
function fetchCall() {
  return fetch(
    `https://api.dictionaryapi.dev/api/v2/entries/en/${input[0].value}`
  )
    .then((response) => response.json())
    .catch((error) => console.log(`${error}`));
}

// Event listener for search button click
let searchButton = document.getElementsByClassName("searchButton");
searchButton[0].addEventListener("click", () =>
  fetchCall().then((data) => meaning(data))
);

// Event listener for enter
input[0].addEventListener("keypress", (e) => {
  if (e.key === "Enter") {
    fetchCall().then((data) => meaning(data));
  }
});

// the function meaning get the data from the response and display the definitions of the word.
function meaning(data) {
  wordClass[0].innerHTML = " ";
  let div = document.createElement("div");
  div.innerHTML = `<i class="fa-solid fa-volume-high sound"></i> Word : <b>${input[0].value}</b>`;

  let orderList = document.createElement("ol");
  orderList.style.listStyle = "none";
  data[0].meanings.forEach((element) => {
    let list = document.createElement("li");
    list.innerText = `Part Of Speech : ${element.partOfSpeech}`;
    let innerList = document.createElement("ol");

    element.definitions.forEach((listElement) => {
      let innerListElements = document.createElement("li");
      innerListElements.innerText = `${listElement.definition}`;
      innerList.appendChild(innerListElements);
    });
    list.appendChild(innerList);
    orderList.appendChild(list);
  });

  wordClass[0].append(div, orderList);

  let sound = document.getElementsByClassName("sound");
  sound[0].addEventListener("click", playSound);
}

// playSound function used to play the sound of the word.
function playSound() {
  if (document.getElementById("soundId"))
    document.getElementById("soundId").remove();
  soundDiv.setAttribute("id", "soundId");
  fetchCall().then((data) => {
    soundDiv.innerHTML = `<audio src=${data[0].phonetics[0].audio} id="sound" type="audio/mpeg" </audio>`;
    document.body.appendChild(soundDiv);
    document.getElementById("sound").play();
  });
}
