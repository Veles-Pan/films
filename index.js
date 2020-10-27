import * as filmsJson from './flm.json';

let filmsList = Object.values(filmsJson);

filmsList.splice(-1,1);

var newTable = document.createElement("table");
newTable.className = "filmsTable";

function createTable(checkTable){

  var tableUpdate = document.createElement("table");
  tableUpdate.className = "filmsTable";

  for (let film of filmsList) {
        
    let tr = document.createElement('tr');
    tr.className = "thisIsTr";
            
    let td1 = document.createElement('td');
    td1.className = "filmName";
    td1.innerHTML = film.Name_eng;
    tr.appendChild(td1);
            
    let td2 = document.createElement('td');
    td2.className = "filmRating";
    td2.innerHTML = film.Rating;
    tr.appendChild(td2);
            
    let td3 = document.createElement('td');
    td3.className = "filmYear";
    td3.innerHTML = film.Year;
    tr.appendChild(td3);

    let td4 = document.createElement('td');
    let imageUrl = document.createElement('img');
    imageUrl.className = "image";
    imageUrl.src = film.Image;
    imageUrl.alt = film.Name_rus;
    td4.className = "filmImg";
    td4.appendChild(imageUrl);
    tr.appendChild(td4);

    if (checkTable == false) {
      newTable.appendChild(tr);

      document.body.onload = addElement;
      var elementNavigation = null;

      function addElement() {

        var divForTable = document.createElement("div");
        divForTable.className = "tableDiv"
        divForTable.id = "tableDiv";
      
        divForTable.appendChild(newTable)
          
        elementNavigation = document.getElementById("tableR");
        document.body.insertBefore(divForTable, elementNavigation);

      };
    } else {
      var elementForChange = document.getElementsByClassName("tableDiv")[0];

      var tableForDelete = elementForChange.firstChild; 

      tableUpdate.appendChild(tr); 
    };
  };
  if (checkTable == true) {
    elementForChange.replaceChild(tableUpdate, tableForDelete);
  };
};

createTable(false);

var navigationElement = null;
var divForSelect = null;

var newSelect = document.createElement('select');
newSelect.className = "selestFunc";

var firstOption = document.createElement('option');
firstOption.value = "sortRating";
firstOption.innerHTML = "Сортировать по рейтингу (убывание)"

newSelect.appendChild(firstOption);

var secondOption = document.createElement('option');
secondOption.value = "sortRatingReverse";
secondOption.innerHTML = "Сортировать по рейтингу (возрастание)"

newSelect.appendChild(secondOption);

var thirdOption = document.createElement('option');
thirdOption.value = "sortYear";
thirdOption.innerHTML = "Сортировать по году (убывание)"

newSelect.appendChild(thirdOption);

var fourthOption = document.createElement('option');
fourthOption.value = "sortYearReverse";
fourthOption.innerHTML = "Сортировать по году (возрастание"

newSelect.appendChild(fourthOption);

var fifthOption = document.createElement('option');
fifthOption.value = "sortName";
fifthOption.innerHTML = "Сортировать по алфавиту (A-Z)"

newSelect.appendChild(fifthOption);

var sixthOption = document.createElement('option');
sixthOption.value = "sortNameReverse";
sixthOption.innerHTML = "Сортировать по алфавиту (Z-A)"

newSelect.appendChild(sixthOption);

var divForSelect = document.createElement("div");
divForSelect.className = "mySelect"

divForSelect.appendChild(newSelect)
  
navigationElement = document.getElementById("tableDiv");
document.body.insertBefore(divForSelect, navigationElement);

newSelect.addEventListener("change", function() {
  if (newSelect.value == 'sortRating') {
    (function () {
      filmsList.sort((a, b) => b.Rating - a.Rating);
      createTable(true);
      }());
  } else if (newSelect.value == "sortYear") {
    (function () {
      filmsList.sort((a, b) => b.Year - a.Year);
      createTable(true);
      }());
  } else if (newSelect.value == "sortName") {
    (function () {
      filmsList.sort(function(a, b){
        if(a.Name_eng < b.Name_eng) return -1;
        if(a.Name_eng > b.Name_eng) return 1;
      });
      createTable(true);
      }());
  } else if (newSelect.value == "sortRatingReverse") {
    (function () {
      filmsList.sort((a, b) => a.Rating - b.Rating);
      createTable(true);
      }());
  } else if (newSelect.value == "sortYearReverse") {
    (function () {
      filmsList.sort((a, b) => a.Year - b.Year);
      createTable(true);
      }());
  } else if (newSelect.value == "sortNameReverse") {
    (function () {
      filmsList.sort(function(a, b){
        if(a.Name_eng < b.Name_eng) return 1;
        if(a.Name_eng > b.Name_eng) return -1;
      });
      createTable(true);
      }());
  };
});
