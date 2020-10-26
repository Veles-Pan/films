import * as filmsList from './flm.json';

let filmsNew = Object.values(filmsList);

filmsNew.splice(-1,1);

var newTable = document.createElement("table");
newTable.className = "filmsTable";

function startPage(){

  for (let film of filmsNew) {
        
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
            
    newTable.appendChild(tr);
  };
};

startPage();

document.body.onload = addElement;
var my_div = null;
var newDiv = null;


function addElement() {

  var newDiv = document.createElement("div");
  newDiv.className = "tableDiv"
  newDiv.id = "allTable";

  newDiv.appendChild(newTable)
    
  my_div = document.getElementById("tableR");
  document.body.insertBefore(newDiv, my_div);
};

var my_div1 = null;
var newDiv1 = null;

var select1 = document.createElement('select');
select1.className = "selestFunc";

var op1 = document.createElement('option');
op1.value = "sortRating";
op1.innerHTML = "Сортировать по рейтингу (убывание)"

select1.appendChild(op1);

var op11 = document.createElement('option');
op11.value = "sortRatingReverse";
op11.innerHTML = "Сортировать по рейтингу (возрастание)"

select1.appendChild(op11);

var op2 = document.createElement('option');
op2.value = "sortYear";
op2.innerHTML = "Сортировать по году (убывание)"

select1.appendChild(op2);

var op22 = document.createElement('option');
op22.value = "sortYearReverse";
op22.innerHTML = "Сортировать по году (возрастание"

select1.appendChild(op22);

var op33 = document.createElement('option');
op33.value = "sortName";
op33.innerHTML = "Сортировать по алфавиту (A-Z)"

select1.appendChild(op33);

var op3 = document.createElement('option');
op3.value = "sortNameReverse";
op3.innerHTML = "Сортировать по алфавиту (Z-A)"

select1.appendChild(op3);

var newDiv1 = document.createElement("div");
newDiv1.className = "mySelect"

newDiv1.appendChild(select1)
  
my_div1 = document.getElementById("allTable");
document.body.insertBefore(newDiv1, my_div1);

select1.addEventListener("change", function() {
  if (select1.value == 'sortRating') {
    sortRating();
  } else if (select1.value == "sortYear") {
   sortYear();
  } else if (select1.value == "sortName") {
    sortName();
  } else if (select1.value == "sortRatingReverse") {
    sortRatingReverse();
  } else if (select1.value == "sortYearReverse") {
    sortYearReverse();
  } else if (select1.value == "sortNameReverse") {
    sortNameReverse()
  };
});

function delTable(filmsNew1){
  var my_table = document.getElementsByClassName("tableDiv");
  var oh_my = my_table[0];
  var child = oh_my.firstChild; //дочерний элемент, который надо заменить

  var newTable1 = document.createElement("table"); //создаю то, на что надо заменить
  newTable1.className = "filmsTable"; //дальше процесс создания можно не читать

  for (let film of filmsNew1) {
        
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
    console.log(imageUrl);
    td4.appendChild(imageUrl);
    tr.appendChild(td4);
        
    newTable1.appendChild(tr); //получаю новую таблицу, на которую нужно изменить старую
  };
  oh_my.replaceChild(newTable1, child); //не меняется...
};


function sortRating () {
  filmsNew.sort((a, b) => b.Rating - a.Rating);
  delTable(filmsNew);
};

function sortRatingReverse () {
  filmsNew.sort((a, b) => a.Rating - b.Rating);
  delTable(filmsNew);
};

function sortYear () {
    filmsNew.sort((a, b) => b.Year - a.Year);
    delTable(filmsNew);
};

function sortYearReverse () {
  filmsNew.sort((a, b) => a.Year - b.Year);
  delTable(filmsNew);
};

function sortName () {
  filmsNew.sort(function(a, b){
    if(a.Name_eng < b.Name_eng) return -1;
    if(a.Name_eng > b.Name_eng) return 1;
  });
  delTable(filmsNew);
};

function sortNameReverse () {
  filmsNew.sort(function(a, b){
    if(a.Name_eng < b.Name_eng) return 1;
    if(a.Name_eng > b.Name_eng) return -1;
  });
  delTable(filmsNew);
};