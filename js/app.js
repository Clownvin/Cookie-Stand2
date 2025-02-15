"use strict";
//Data =========================================================================================================================
var hours = ["6:00 am", "7:00 am", "8:00 am", "9:00 am", "10:00 am", "11:00 am", "12:00 pm", "1:00 pm", "2:00 pm", "3:00 pm", "4:00 pm", "5:00 pm", "6:00 pm", "7:00 pm", "8:00 pm"];
var hoursScaling = [0.5, 0.75, 1.0, 0.6, 0.8, 1.0, 0.7, 0.4, 0.6, 0.9, 0.7, 0.5, 0.3, 0.4, 0.6];
var allSales = 0;
var hourlyTotal = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];

//Functionality =================================================================================================================
//Constructor for store sales data
function Location (name, minCustomers, maxCustomers, avgCookies) {
  this.name = name;
  this.minCustomers = minCustomers;
  this. maxCustomers = maxCustomers;
  this.avgCookies = avgCookies;
  this.hourlyPurchased = [];
  this.dailyTotal = 0;
  this.randomCustomers = function() {
    var numCustomers = Math.floor(Math.random() * (this.maxCustomers - this.minCustomers + 1)) + this.minCustomers;
    return numCustomers;
  }
  this.cookiesPurchased = function(){
    for (var i = 0; i < hours.length; i++) {
      this.hourlyPurchased[i] = Math.floor(this.randomCustomers() * hoursScaling[i] * this.avgCookies);
    }
  }
  this.totalSales = function(){
    for (var i = 0; i < hours.length; i++) {
    this.dailyTotal += this.hourlyPurchased[i];
    }
    allSales += this.dailyTotal;
  }
}

//Generates table header with the hours opened
function generateTableHeader() {
  var tableRowLocation = document.getElementById("tableHeader");
  var blankHeader = document.createElement("th");
  tableRowLocation.appendChild(blankHeader);
  for (var i = 0; i < hours.length; i++) {
    var hoursElement = document.createElement("th");
    hoursElement.textContent = hours[i];
    tableRowLocation.appendChild(hoursElement);
  }
  var totalHeader = document.createElement("th");
  totalHeader.textContent = "Daily Total";
  tableRowLocation.appendChild(totalHeader);
}

//Fills in table with sales data for each individual location
function generateTable(location) {
  var tableBodyLocation = document.getElementById("tableBody");
  var newRow = document.createElement("tr");
  newRow.setAttribute("id", location.name);
  tableBodyLocation.appendChild(newRow);
  var tableRowLocation = document.getElementById(location.name);
  var locationName = document.createElement("td");
  locationName.textContent = location.name;
  tableRowLocation.appendChild(locationName);
  for (var i = 0; i < hours.length; i++) {
    hourlyTotal[i] += location.hourlyPurchased[i];
    var salesElement = document.createElement("td");
    var numPurchased = location.hourlyPurchased[i];
    salesElement.textContent = numPurchased;
    tableRowLocation.appendChild(salesElement);
  }
  var totalElement = document.createElement("td");
  totalElement.textContent = location.dailyTotal;
  tableRowLocation.appendChild(totalElement);
}


//Generates the hourly totals footer for list
function generateTableFooter() {
  var tableRowLocation = document.getElementById("footer");
  var totalHeader = document.createElement("td");
  totalHeader.textContent = "Hourly Total";
  tableRowLocation.appendChild(totalHeader);
  for (var i = 0; i < hours.length; i++) {
    var hourlyElement = document.createElement("td");
    hourlyElement.textContent = hourlyTotal[i];
    tableRowLocation.appendChild(hourlyElement);
  }
  var totalSalesElement = document.createElement("td");
  totalSalesElement.textContent = allSales;
  tableRowLocation.appendChild(totalSalesElement); 
}

//Function to Clear Footer as Additional Locations are Added
function clearFooter() {
  var footerLocation = document.getElementById("footer");
  footerLocation.innerHTML = "";
}

//Event Function to Create New Object
function createNewObject(event) {
  event.preventDefault();

  var elName = event.target.locationName.value;
  var elMin = parseInt(event.target.minCustomers.value);
  var elMax = parseInt(event.target.maxCustomers.value);
  var elCookies = parseFloat(event.target.cookiesPurchased.value);

  var elName = new Location(elName, elMin, elMax, elCookies);
  
  elName.cookiesPurchased();
  elName.totalSales();
  
//Creates additional table row for new location  
  generateTable(elName);
//Clears footer with old total values
  clearFooter();
//Generates new footer with totals including new locations
  generateTableFooter();

  
}

//Executables ================================================================================================================
//Event listener for submitting form
document.getElementById("locationForm").addEventListener("submit", createNewObject);

//Creates constructor objects for each location
var firstAndPike = new Location('1st and Pike', 23, 65, 6.3);
var seaTacAirport = new Location('SeaTac Airport', 3, 24, 1.2);
var seattleCenter = new Location('Seattle Center', 11, 38, 3.7);
var capitolHill = new Location('Capitol Hill', 20, 38, 2.3);
var alki = new Location('Alki', 2, 16, 4.6);

//Calls function to generate array with random number of cookies purchased per hour for each location
firstAndPike.cookiesPurchased();
seaTacAirport.cookiesPurchased();
seattleCenter.cookiesPurchased();
capitolHill.cookiesPurchased();
alki.cookiesPurchased();

//Calls function to calculate total daily sales for each location
firstAndPike.totalSales();
seaTacAirport.totalSales();
seattleCenter.totalSales();
capitolHill.totalSales();
alki.totalSales();


generateTableHeader();


//Generates List on sales.html
generateTable(firstAndPike, "firstAndPike");
generateTable(seaTacAirport, "seaTac");
generateTable(seattleCenter, "seattle");
generateTable(capitolHill, "capitol");
generateTable(alki, "alki");

generateTableFooter();
