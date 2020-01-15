function Inventory(existingItems) {
    this.items = [];
   
    if (existingItems !== undefined && existingItems !== null) {
        this.items = existingItems;
    } 
    for (var f = 0; f < this.items.length; f++) {
        var item = this.items[f];
    var cacheItemValue = getObjectValueFromLocalStorage(item.name);
    if(cacheItemValue !== null && cacheItemValue !== undefined){
        //"!!" is a truthy syntax. means the same as up above
        var cacheItemNum = cacheItemValue.num;
        item.totalCount = item.totalCount - cacheItemNum;

    }
}






// this creates the buttons of an inventory for
//clicking and selecting items to go into the shopping cart
//thisInventory is the inventory array. when called this function also
//creates the td, tr, and gives each element an ID and class
Inventory.prototype.printInventory = function () {
    var theInventory = this;
    var inventory = document.getElementById("inventory");
    
  for (var f = 0; f < this.items.length; f++) {
        var item = this.items[f];
        var tdItem = document.createElement("td");
        var descAlertDiv = document.createElement("div");
        descAlertDiv.setAttribute("class", "alert alert-primary alert-dismissible fade show AlertBox");
        descAlertDiv.setAttribute("role", "alert");
        var tr = document.createElement("tr");
        var amount = item.totalCount;
        var itemDescription = item.name + " is only " + (item.price).toFixed(2) + " Amount in inventory: ";
        var amountOfItemInventory = document.createElement("span");
        amountOfItemInventory.setAttribute("id", item.name +"-amountInventory");
        amountOfItemInventory.textContent = amount;
        var backUp = item.totalCount;
        tdItem.setAttribute("class", "TdClassElem");
        tr.setAttribute("class", "trClassElem")
        tr.setAttribute("id", item.name);
        var button = document.createElement("button");
        button.setAttribute("id", item.name + "-addToCartButton");
        button.setAttribute("class", "btn btn-primary addToCartButton")
        button.textContent = "add to cart";
        tdItem.append(itemDescription);
        tdItem.append(amountOfItemInventory);
        tdItem.append(button);
        tr.append(tdItem);
        inventory.append(tr);
        var DescButton = document.createElement("button");
        DescButton.setAttribute("class", "btn btn-primary itemDescButton");
        DescButton.textContent = "Show More";
        DescButton.dataset.itemName = item.name;
        tdItem.append(DescButton);
        var div = document.createElement("div");
        div.setAttribute("class", "ItemInfo");
        div.dataset.itemName = item.name;
        var span = document.createElement("span");
        var p = document.createElement("p");
        div.append(span);
        div.append(p);
        var description = item.description;
        descAlertDiv.append(div);
        tdItem.append(descAlertDiv)
        span.append(description); 
        assignItemEventHandler(item, button, theInventory);
        var count = " ";
        p.append(count);
        div.style.display = "none";
        assignShowMoreEventHandler(DescButton, description, count);
        }
    }
};

Inventory.prototype.inventoryCheck = function (itemName) {
    var item = null;
    for (var i = 0; i < this.items.length; i++) {
        var inventoryItem = this.items[i];
        if (inventoryItem.name === itemName) {
            item = inventoryItem;
            break;
        }
    }
    return item;
}

Inventory.prototype.AddFromCartBackToInventory = function (itemName, count) {
    var checkedInventoryItem = this.inventoryCheck(itemName);
    if(checkedInventoryItem === null){
        return;
    }
    checkedInventoryItem.totalCount = checkedInventoryItem.totalCount + count;
var amountInventory = document.getElementById(checkedInventoryItem.name + "-amountInventory");
amountInventory.textContent = checkedInventoryItem.totalCount;
}


Inventory.prototype.SubtractFromInventory = function (item) {

    if (item.totalCount > 0) {
        item.totalCount--
    }
    this.printInventory;
}

Inventory.prototype.saveInventoryAmountLocalStorage = function(key, value){
    var inventoryItemSerialized = JSON.stringify(value);
    localStorage.setItem(key, inventoryItemSerialized);
    var localData = JSON.parse(localStorage.getItem("inventory"));
}

//this function of the inventory searches for characters that are in the search bar
//and sets the typed item and the name of the inventory to lower case to find matches and return
//the list of found items
//index of, once the index item is submitted, it is turned to lowercase writing. and the name of the indexed item is also set to lowercase
// to avoid any case sensitive errors. if the phrase that is input in the search field is located in any of the selected items,
// it gives a value greater than -1 and pushes that item to the found items array. it then returns the found items
Inventory.prototype.search = function (searchTerm) {
    var foundItems = [];
    for (var i = 0; i < this.items.length; i++) {
        var selectedItem = this.items[i];
        var lowerCaseName = selectedItem.name.toLowerCase();
        var lowerCaseSearchTerm = searchTerm.toLowerCase();
        //partial match match that returns the index placement of search term
        if (lowerCaseName.indexOf(lowerCaseSearchTerm) > -1) {
            foundItems.push(selectedItem);
        }
    }
    return foundItems;
}