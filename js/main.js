const getValue = (inputId) => {
  const input = document.getElementById(inputId);
  const inputText = input.value;
  input.value = "";
  return inputText;
};
//
const showElement = (inputId, display) => {
  document.getElementById(inputId).style.display = display;
};

// elements selects
const container = document.getElementById("container");
const loadData = async () => {
  container.textContent = "";
  showElement("loading-sipnner", "block");
  showElement("error-msg", "none");

  const inputText = getValue("input-field");
  const url = `https://www.thesportsdb.com/api/v1/json/2/searchplayers.php?p=${inputText}`;
  const response = await fetch(url);
  const data = await response.json();
  if (data.player) {
    showElement("loading-sipnner", "none");
    showElement("error-msg", "block");
  } else {
    displayData(data.player);
  }
};

const displayData = (players) => {
  const container = document.getElementById("container");
  container.textContent = "";
  players.forEach((player) => {
    const { idPlayer, strPlayer, dateBorn, strThumb } = player;
    // create and append
    const div = document.createElement("div");
    div.classList.add("col");
    div.classList.add("mb-3");
    div.innerHTML = `
      
    <div id="card" class="card mx-3 h-80 rounded">
      <div id="card-profile">
        <div class="img-body">
           <img src="${strThumb}" alt="" />
          </div>
               </div>
                <div class="card-body text-center mb-3">
                    <h5 class="card-title mb-2">${strPlayer}</h5>
                    <p class="card-text">
                     ${dateBorn}
                    </p>
                    <div class="my-2">
                      <button class="btn btn-danger p-1 delete-btn">Delete</button>
                      <button class="btn btn-success p-1" onclick ="seeDetails(${idPlayer})">Details</button>
                    </div>
                    <!-- icons -->
                    <div class="text-primary">
                      <ul
                        class="list-unstyled d-flex justify-content-center align-items-center fs-4"
                      >
                        <li class="mx-2">
                          <i class="fa-brands fa-facebook"></i>
                        </li>
                        <li class="mx-2">
                          <i class="fa-brands fa-linkedin-in"></i>
                        </li>
                        <li class="mx-2">
                          <i class="fa-brands fa-twitter"></i>
                        </li>
                      </ul>
                    </div>
                  </div>
                </div>
      `;
    container.appendChild(div);
    showElement("loading-sipnner", "none");
  });
};
// delete details
container.addEventListener("click", function (e) {
  if (e.target.className == "btn btn-danger p-1 delete-btn") {
    e.target.parentNode.parentNode.parentNode.remove();
  }
});
const seeDetails = (playerId) => {
  console.log(playerId);
};
