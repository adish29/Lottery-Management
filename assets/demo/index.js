function inventoryAddToTable() {
    if ($("#inventoryTable tbody").length == 0) {
        $("#inventoryTable").append("<tbody></tbody>");
    }
    if($("#barcodeScan").val() != null && $("#barcodeScan").val() != ''){
    // Append lottery rolls to the table
        let total = 300/$("#ticketCost").val();
        $("#inventoryTable tbody").append(
            "<tr>" + 
            "<td>" + $("#barcodeScan").val() + "</td>" +
            "<td>" + $("#gameName").val() + "</td>" + 
            "<td>" + $("#ticketCost").val() +'$' + "</td>" + 
            "<td>" + total + "</td>" + 
            "</tr>");
        $("#barcodeScan").val("");
        $("#gameName").val("");
        $("#ticketCost").val("");
        document.getElementById('rollNumber').innerHTML='';
        $("#barcodeScan").focus();
    }
    else{
        console.log('Enter non zero value')
        $("#barcodeScan").focus();
    }
}

function activation(){
    console.log('Hi')
    if ($("#activationTable tbody").length == 0) {
        $("#activationTable").append("<tbody></tbody>");
    }
}

function emptyField() {
    document.getElementById('barcodeScan').value='';
    document.getElementById('rollNumber').innerHTML='';
    $("#barcodeScan").focus();
}

//order by key realtime database firebase eg.
function inventoryTable(){
    var inventory = firebase.database().ref('Rolls/Inventory/').orderByKey();
    inventory.once("value")
     .then(function(snapshot) {
      snapshot.forEach(function(childSnapshot) {
      // key will be barcode numbers in inventory
      var key = childSnapshot.key;
      console.log(key)
      // childData will be the actual contents of the child
      var childData = childSnapshot.val();
      console.log(childData.Name)
      console.log(childData.barcodeNo)
      console.log(childData.cost)
      console.log(childData.numberOfTickets)
      });
    });
}
//snapshot.numChildren().....get count of number of children