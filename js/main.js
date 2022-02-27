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
  if (data.player === null || inputText == "") {
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
                <div class="card-body text-center">
                    <h5 class="card-title mb-2">${strPlayer}</h5>
                    <p class="card-text">
                     ${dateBorn}
                    </p>
                    <div class="my-2">
                      <button class="btn btn-danger p-1 delete-btn">Delete</button>
                      <button class="btn btn-success p-1" onclick ="seeDetails(${idPlayer})"  data-bs-toggle="modal"
                      data-bs-target="#exampleModal">Details</button>
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
const seeDetails = async (playerId) => {
  const url = `https://www.thesportsdb.com/api/v1/json/2/lookupplayer.php?id=${playerId}`;
  const response = await fetch(url);
  const data = await response.json();
  showInfo(data.players[0]);
  console.log(data.players[0]);
};

const showInfo = (data) => {
  const {
    idPlayer,
    strPlayer,
    strDescriptionEN,
    dateBorn,
    strThumb,
    strGender,
    strHeight,
    strWeight,
    strNationality,
    strSport,
    strTeam,
  } = data;
  const modalBody = document.getElementById("modal-body");
  modalBody.innerHTML = `
   <div class="card">
              <div class="row g-0">
                <div class="col-md-4">
                  <img src="${strThumb}" class="img-fluid  rounded-start" alt="..." />
                </div>
                <div class="col-md-8">
                  <div class="card-body">
                    <h5 class="card-title">${strPlayer}</h5>
                    <div class="card-text">
                     <p>Player ID : ${idPlayer}</p>
                     <p>BOD: ${dateBorn}</p>
                     <p>Gender: ${strGender}</p>
                     <p>Height: ${strHeight}</p>
                     <p>Weight: ${strWeight}</p>
                     <p>Sport: ${strSport}</p>
                     <p>Team: ${strTeam}</p>
                     <p>Nationality: ${strNationality}</p>
                    </div>
                    <p class="card-text">
                      <small class="text-muted">
                      ${strDescriptionEN.slice(0, 100)}
                      </small>
                    </p>
                  </div>
                </div>
              </div>
            </div>
  `;
};
