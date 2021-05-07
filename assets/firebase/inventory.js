displayInventory();
displayActivation();

function updateInventory(){
    var barcode = $("#barcodeScan").val();
    let total = 300/$("#ticketCost").val();
    var updates = {
        Name: $("#gameName").val(),
        barcodeNo: $("#barcodeScan").val(), 
        cost: $("#ticketCost").val(),
        numberOfTickets: total
    }
    //Updating database
    firebase.database().ref(`Rolls/Inventory/${barcode}`).set(updates);
    //Clearing input fields
    $("#barcodeScan").val("");
    $("#gameName").val("");
    $("#ticketCost").val("");
    document.getElementById('rollNumber').innerHTML='';
    $("#barcodeScan").focus();
    window.location.reload();
}

async function updateActivation(){
    var barcode = $("#activate").val();
    //getting roll details from inventory
    var snap = await firebase.database().ref(`Rolls/Inventory/${barcode}`).once('value')
    var data = snap.val()
    console.log(data)
    //activating roll for sales in shop
    await firebase.database().ref(`Rolls/Activated/${barcode}`).set(data)
    console.log('data saved')
    //Removing activated roll from inventory
    firebase.database().ref(`Rolls/Inventory/${barcode}`).remove();
    console.log('data removed')
    $("#activate").val("");
    $("#activate").focus();
    window.location.reload();
}

async function displayInventory() {
    var snapshot = await firebase.database().ref(`Rolls/Inventory`).once('value');
    var data = snapshot.val();
    eachRow = ""
    jQuery.each(data, function(barNum, details) {
        if(details) {
            let barcode = details.barcodeNo;
            let name = details.Name;
            let cost = details.cost;
            let numberOfTickets = details.numberOfTickets
            // console.log(barcode,name,cost,numberOfTickets)
            eachRowContent = `<tr><td>${barcode}</td> <td>${name}</td> <td>${cost}</td> <td>${numberOfTickets}</td></tr>`
            eachRow += eachRowContent
        }
    })
    document.getElementById("tableInventoryBody").innerHTML = eachRow
}

async function displayActivation() {
    var snapshot = await firebase.database().ref(`Rolls/Activated`).once('value');
    var data = snapshot.val();
    eachRow = ""
    jQuery.each(data, function(barNum, details) {
        if(details) {
            let barcode = details.barcodeNo;
            let name = details.Name;
            let cost = details.cost;
            let numberOfTickets = details.numberOfTickets
            // console.log(barcode,name,cost,numberOfTickets)
            eachRowContent = `<tr><td>${barcode}</td> <td>${name}</td> <td>${cost}</td> <td>${numberOfTickets}</td></tr>`
            eachRow += eachRowContent
        }
    })
    document.getElementById("tableActivatedBody").innerHTML = eachRow
}
