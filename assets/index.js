function productAddToTable() {
    // First check if a <tbody> tag exists, add one if not
    if ($("#productTable tbody").length == 0) {
        $("#productTable").append("<tbody></tbody>");
    }
    if($("#barcodeScan").val() != null && $("#barcodeScan").val() != ''){
    // Append product to the table
        $("#productTable tbody").append("<tr>" + "<td>" + $("#barcodeScan").val() + "</td>" + "</tr>");
        document.getElementById('rollNumber').innerHTML = $("#barcodeScan").val();
        $("#barcodeScan").val("");
        $("#barcodeScan").focus();
    }
    else{
        console.log('Enter non zero value')
        $("#barcodeScan").focus();
    }
}