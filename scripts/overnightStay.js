"use strict";

window.onload = init;

function init(){
    const calcBtn = document.getElementById("calculateBtn");
    calcBtn.onclick = calculateCost;
}

function calculateCost(){
    //text boxes
    const messageDiv = document.getElementById("numPplError");
    const fullName = document.getElementById("fullName").value;
    const monthCheckIn = new Date(document.getElementById("dateCheckIn").value);
    const numNights = Number(document.getElementById("numNights").value);

    //room type radios
    const queenRadio = document.getElementById("queenRadio");
    const kingRadio = document.getElementById("kingRadio");
    const twoBedRadio = document.getElementById("twoBedRadio");

    //number of people
    const numAdults = Number(document.getElementById("numAdults").value);
    const numChildren = Number(document.getElementById("numChildren").value);

    //discounts
    const seniorDiscount = document.getElementById("seniorDiscountRadio");
    const militaryDiscount = document.getElementById("militaryDiscountRadio");

    const numPpl = numAdults + numChildren;
    let preRoomCost = 0, postRoomCost = 0, discountCost = 0, taxCost = 0, totalCost = 0;
    

    let confirmationCode = fullName.toUpperCase().substring(0, 3) + "-" + (Number(monthCheckIn.getUTCMonth())+1) +
        monthCheckIn.getUTCFullYear() + "-" + numNights + ":" + numAdults + ":" + numChildren;

    if(queenRadio.checked){
        if(numPpl > 5){
            messageDiv.innerText = "The room you selected will not hold your party.";
            document.getElementById("confirmationCode").innerText = "";
        }
        else{
            messageDiv.innerText = "";
            
            preRoomCost = getRoomRate(monthCheckIn.getMonth(), "Queen") * numNights;

                if(seniorDiscount.checked){
                    discountCost = preRoomCost * 0.1;
                }
                else if(militaryDiscount.checked){
                    discountCost = preRoomCost * 0.2;
                }

                displayTotals(preRoomCost, discountCost, postRoomCost, taxCost, totalCost, confirmationCode);
            }
        }
        else if(kingRadio.checked){
            if(numPpl > 2){
                messageDiv.innerText = "The room you selected will not hold your party.";
                document.getElementById("confirmationCode").innerText = "";
            }
            else{
                messageDiv.innerText = "";
                
                preRoomCost = getRoomRate(monthCheckIn, "King") * numNights;
    
                    if(seniorDiscount.checked){
                        discountCost = preRoomCost * 0.1;
                    }
                    else if(militaryDiscount.checked){
                        discountCost = preRoomCost * 0.2;
                    }

                    displayTotals(preRoomCost, discountCost, postRoomCost, taxCost, totalCost, confirmationCode);
                }
            }
            else if(twoBedRadio.checked){
                if(numPpl > 6){
                    messageDiv.innerText = "The room you selected will not hold your party.";
                    document.getElementById("confirmationCode").innerText = "";
                }
                else{
                    messageDiv.innerText = "";
                    
                    preRoomCost = getRoomRate(monthCheckIn, "twoBedSuite") * numNights;
        
                        if(seniorDiscount.checked){
                            discountCost = preRoomCost * 0.1;
                        }
                        else if(militaryDiscount.checked){
                            discountCost = preRoomCost * 0.2;
                        }
        
                        displayTotals(preRoomCost, discountCost, postRoomCost, taxCost, totalCost, confirmationCode);
                    }
                }
    }

function getRoomRate(checkInDate, roomType){
    if(roomType == "Queen"){
        if(checkInDate < 5 || checkInDate > 7){
            return 150;
        }
        else{
            return 250;
        }
    }
    else if(roomType == "King"){
        if(checkInDate < 5 || checkInDate > 7){
            return 150;
        }
        else{
            return 250;
        }
    }
    else if(roomType == "twoBedSuite"){
        if(checkInDate < 5 || checkInDate > 7){
            return 210;
        }
        else{
            return 350;
        }
    }
}

function displayTotals(preRoomCost, discountCost, postRoomCost, taxCost, totalCost, confirmationCode){
    let taxRate = 0.12;

    postRoomCost = preRoomCost - discountCost;
    
    taxCost = postRoomCost * taxRate;
    
    totalCost = postRoomCost + taxCost;

    document.getElementById("roomCost").innerText = "$" + preRoomCost.toFixed(2);
    document.getElementById("discountCost").innerText = "$" + discountCost.toFixed(2);
    document.getElementById("discountedRoomCost").innerText = "$" + postRoomCost.toFixed(2);
    document.getElementById("taxCost").innerText = "$" + taxCost.toFixed(2);
    document.getElementById("totalCost").innerText = "$" + totalCost.toFixed(2);
    document.getElementById("confirmationCode").innerText = confirmationCode;
}