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
}

async function activation(){
    var barcode = $("#activate").val();
    var snap = await firebase.database().ref(`Rolls/Inventory/${barcode}`).once('value')
    var data = snap.val()
    console.log(data)
    await firebase.database().ref(`Rolls/Activated/${barcode}`).set(data)
    console.log('data saved')
    firebase.database().ref(`Rolls/Inventory/${barcode}`).remove();
    console.log('data removed')
    $("#activate").val("");
    $("#activate").focus();
}
