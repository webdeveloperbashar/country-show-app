const row = document.getElementById("row");
const inputVal = document.getElementById("input-value");
// event handler
inputVal.addEventListener("keyup", getCountry);
// get data using fetch
function getCountry() {
  fetch(`https://restcountries.eu/rest/v2/name/${inputVal.value}`)
    .then((res) => res.json())
    .then((data) => {
      uiSetup(data);
    });
}

// one by one country show on UI
function uiSetup(countryData) {
  let country = "";
  if (countryData) {
    countryData.forEach((item) => {
      country += `
        <div class="col-md-2">
            <div class="country-info info shadow p-3 mb-5 bg-white rounded" identity=${item.name}>
            <img src="${item.flag}" class="img-fluid" alt="" />
            <h4 class="text-center">${item.name}</h4>
            <p class="text-center"><span>Currency:</span> ${item.currencies[0].code}</p>
            <p class="text-center"><span>Capital:</span> ${item.capital}</p>
            </div>
        </div>
        `;
    });
  }
  document.getElementById("row").innerHTML = country;
}
// close button work
const closeBtn = document.getElementById("close");
closeBtn.addEventListener("click", function(){
  itemPanel.style.display = "block";
  detailsPanel.style.display = "none";
});

const itemPanel = document.querySelector(".item-panel");
const detailsPanel = document.getElementById("details-panel");
// one item find
row.addEventListener("click", (e) => {
  const findClass = e.path.find((c) => {
    return c.classList.contains("info");
  });
  const id = findClass.getAttribute("identity");
  getDetails(id);
  itemPanel.style.display = "none";
  detailsPanel.style.display = "block";
});

// get details content
function getDetails(id) {
  fetch(`https://restcountries.eu/rest/v2/name/${id}`)
    .then((res) => res.json())
    .then((data) => {
      detailsSetup(data);
    });
}
// details block setup function
function detailsSetup(cData) {
  let details = "";
  cData.map((item) => {
    details += `
    <div id="country-desc" class="shadow p-3 mb-5 bg-white rounded">
    <img src="${item.flag}" class="img-fluid mb-2 w-100" />
    <h2 id="country-name" class="text-center">${item.name}</h2>
    <table>
      <tr>
        <th>Name</th>
        <th>Description</th>
      </tr>
      <tr>
        <td>Country Name</td>
        <td>${item.name}</td>
      </tr>
      <tr>
        <td>Capital</td>
        <td>${item.capital}</td>
      </tr>
      <tr>
        <td>Language</td>
        <td>${item.languages[0].name}</td>
      </tr>
      <tr>
        <td>Region</td>
        <td>${item.region}</td>
      </tr>
      <tr>
        <td>Sub-Region</td>
        <td>${item.subregion}</td>
      </tr>
      
      <tr>
        <td>Population</td>
        <td>${item.population} People</td>
      </tr>
      <tr>
        <td>Demonym</td>
        <td>${item.demonym}</td>
      </tr>
      <tr>
        <td>Area</td>
        <td>${item.area} sq.km</td>
      </tr>
      <tr>
        <td>Timezone</td>
        <td>${item.timezones[0]}</td>
      </tr>
      <tr>
        <td>Currencies</td>
        <td>Code: ${item.currencies[0].code}, Name: ${item.currencies[0].name}</td>
      </tr>
      <tr>
        <td>Calling Code</td>
        <td>${item.callingCodes[0]}</td>
      </tr>
    </table>
  </div>
  `;
  });
  document.getElementById("col").innerHTML = details;
}