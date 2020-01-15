
//var remoteData = getInventoryDataFromURL("https://cdn.portofportland.com/temp/jose/inventory.json");
//var inventory = new Inventory(getInventoryRawData(inventoryRawData)); // this will have this.items = existingItems
//var inventory = new Inventory(getInventoryRawData(remoteData));
var  inventory =  null;
var myCart = null;


console.log(myCart);



document.getElementById("search").addEventListener("submit", function (event) {
    event.preventDefault();
    var searchField = document.getElementById("searchField");

    //gets value of search and iterates through inventory for matches and pushes any matches to the result.name
    //since all we are looking fo ris the name of the object to test if it is indeed valid or exists
    var results = inventory.search(searchField.value);
    var resultNames = [];
    for (var i = 0; i < results.length; i++) {
        var result = results[i];
        resultNames.push(result.name);
    }

    //determines the display of the search items. if the resultnames match anything in the inventory than only those items are displayed
    var itemRow = document.getElementById("inventory").children;
    var tdElementItem = document.getElementsByClassName("trClassElem");
    for (var i = 0; i < itemRow.length; i++) {
        var row = itemRow[i];//DOM element
        var rowID = row.getAttribute("id");

        if (resultNames.indexOf(rowID) > -1) {
            row.style.display = "table-row";
        } else {
            row.style.display = "none";
        }
    }

    for (var i = 0; i < tdElementItem.length; i++) {
        var theItemText = tdElementItem[i];
        var itemTextId = theItemText.getAttribute("id");

        if (resultNames.indexOf(itemTextId) > -1) {
            theItemText.style.display = "table-row";
        } else {
            theItemText.style.display = "none";
        }
    }
})

document.getElementById("file-input").addEventListener("change", function (event) {
    var blob = event.target.files[0];
    var reader = new FileReader();

    reader.onload = function (progressEvent) {
        var jsonObject = JSON.parse(progressEvent.target.result);
       inventory = new Inventory(getInventoryRawData(jsonObject));
       myCart = new shoppingCart()
       myCart.getShoppingCartItemsFromLocalStorage(inventory.items);

       inventory.printInventory();
       myCart.printCart();
       
    }

    reader.readAsBinaryString(blob);
})
console.log(localStorage)

