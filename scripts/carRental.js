"use strict";

window.onload = init;

function init(){
    const calculateBtn = document.getElementById("calculateBtn");

    calculateBtn.onclick = calculateTotalCost;
}

function calculateTotalCost(){
    const numDays = Number(document.getElementById("numDaysText").value);
    const tollOptionCheck = document.getElementById("elecTollOption");
    const gpsOptionCheck = document.getElementById("gpsOption");
    const roadsideOptionCheck = document.getElementById("roadsideOption");
    const underRadio = document.getElementById("yesRadio");
    let carRentalCost = (29.99 * numDays)
    let optionCost = 0, underCost = 0;

    if(tollOptionCheck.checked){
        optionCost += 3.95;
    }
    if(gpsOptionCheck.checked){
        optionCost += 2.95;
    }
    if(roadsideOptionCheck.checked){
        optionCost += 2.95;
    }
    optionCost = optionCost * numDays;

    if(underRadio.checked){
        underCost = (carRentalCost + optionCost) * 0.3;
    }

    let totalCost = carRentalCost + optionCost + underCost;

    document.getElementById("rentalCost").innerText = "$" + carRentalCost.toFixed(2);
    document.getElementById("optionCost").innerText = "$" + optionCost.toFixed(2);
    document.getElementById("underCost").innerText = "$" + underCost.toFixed(2);

    document.getElementById("totalCost").innerText = "$" + totalCost.toFixed(2);
}