import { filmsJson } from './film-list.js';

console.log(filmsJson);

let initialFilmsList = Object.values(filmsJson);

var navigationElement = null;

var newTable = document.createElement("table");
newTable.className = "filmsTable";

document.body.onload = onLoad;
var elementNavigation = null;

function sortFilmsByName(filmsList) {
  return filmsList.sort(function(a, b){
    if(a.Name_eng < b.Name_eng) {
      return -1;
    } else {
      return 1;
    }
  });
}

function sortFilmsByRating(filmsList) {
  return filmsList.sort((a, b) => b.Rating - a.Rating);
}

function sortFilmsByYear(filmsList) {
  return filmsList.sort((a, b) => b.Year - a.Year);
}

function createOption({ value, label, select }) {
  const option = document.createElement('option');
  option.value = value;
  option.innerHTML = label
  select.appendChild(option);
}
function onLoad() {
  console.log(initialFilmsList);
  var divForTable = document.createElement("div");
  divForTable.className = "tableDiv"
  divForTable.id = "tableDiv";

  divForTable.appendChild(newTable)

  elementNavigation = document.getElementById("footer");
  document.body.insertBefore(divForTable, elementNavigation);
  var newSelect = document.createElement('select');
  newSelect.className = "selector__field";
  newSelect.id = 'selectId'

  createOption({ value: "sortRating", label: 'Сортировать по рейтингу (убывание)', select: newSelect });
  createOption({ value: "sortRatingReverse", label: 'Сортировать по рейтингу (возрастание)', select: newSelect });
  createOption({ value: "sortYear", label: 'Сортировать по году (убывание)', select: newSelect });
  createOption({ value: "sortYearReverse", label: 'Сортировать по году (возрастание)', select: newSelect });
  createOption({ value: "sortName", label: 'Сортировать по алфавиту (A-Z)', select: newSelect });
  createOption({ value: "sortNameReverse", label: 'Сортировать по алфавиту (Z-A)', select: newSelect });

  var divForSelect = document.createElement("div");
  divForSelect.className = "selector"

  divForSelect.appendChild(newSelect)
  navigationElement = document.getElementById("tableDiv");
  document.body.insertBefore(divForSelect, navigationElement);

  newSelect.addEventListener("change", function(e) {
    const filmsList = initialFilmsList.slice();
    switch (e.target.value) {
      case 'sortRating': {
        const filmsListSorted = sortFilmsByRating(filmsList);
        createTable(true, filmsListSorted);
        break;
      }
      case 'sortYear': {
        const filmsListSorted = sortFilmsByYear(filmsList);
        createTable(true, filmsListSorted);
        break;
      }
      case 'sortName': {
        const filmsListSorted = sortFilmsByName(filmsList)
        createTable(true, filmsListSorted);
        break;
      }
      case 'sortRatingReverse': {
        const filmsListSorted = sortFilmsByRating(filmsList).reverse();
        createTable(true, filmsListSorted);
        break;
      }
      case 'sortYearReverse': {
        const filmsListSorted = sortFilmsByYear(filmsList).reverse();
        createTable(true, filmsListSorted);
        break
      }
      case 'sortNameReverse': {
        const filmsListSorted = sortFilmsByName(filmsList).reverse();
        createTable(true, filmsListSorted);
      }
    }
  });
}

function createCell({ tr, classname, value }) {
  let td = document.createElement('td');
  td.className = classname;
  td.innerHTML = value;
  tr.appendChild(td);
}

function createTable(checkTable, filmsList) {

  var tableUpdate = document.createElement("table");
  tableUpdate.className = "filmsTable";

  for (let film of filmsList) {
    var tr = document.createElement('tr');
    tr.className = "thisIsTr";

    createCell({ tr: tr, classname: 'filmName', value: film.Name_eng })
    createCell({ tr: tr, classname: 'filmRating', value: film.Rating })
    createCell({ tr: tr, classname: 'filmYear', value: film.Year })

    let td4 = document.createElement('td');
    let imageUrl = document.createElement('img');
    imageUrl.className = "image";
    imageUrl.src = film.Image;
    imageUrl.alt = film.Name_rus;
    td4.className = "filmImg";
    td4.appendChild(imageUrl);

    tr.appendChild(td4);

    if (checkTable === false) {
      newTable.appendChild(tr);
    } else {
      tableUpdate.appendChild(tr);
    }
  }
  if (checkTable === true) {
    var elementForChange = document.getElementsByClassName("tableDiv")[0];

    var tableForDelete = elementForChange.firstChild;

    elementForChange.replaceChild(tableUpdate, tableForDelete);
  }
}

createTable(false, initialFilmsList);

