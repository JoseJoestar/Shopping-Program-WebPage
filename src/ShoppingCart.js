function shoppingCart(items) {
    this.shoppingCartItems = [];
    this.total = 0;
    if (items !== undefined && items !== null) {
        this.shoppingCartItems = existingItems;
    }
}

shoppingCart.prototype.getShoppingCartItemsFromLocalStorage = function (inventoryItems){
    for( var i = 0; i < inventoryItems.length; i++){
        var indexedCartItem = inventoryItems[i]; 
        var cachedShoppingCartItem = getObjectValueFromLocalStorage(indexedCartItem.name);
        if(cachedShoppingCartItem === null){
            continue;
        }
        var newCartItem = new ShoppingCartItem(cachedShoppingCartItem.name, cachedShoppingCartItem.price);
        newCartItem.num = cachedShoppingCartItem.num;
        this.shoppingCartItems.push(newCartItem);
    }
    this.addTotalAndPrint();
}
//this checks if the shopping cart and inventory items are a match and passes the resulut to the above function addrow
shoppingCart.prototype.checkShoppingCartItem = function (inventoryItem) {
    var found = null;

    for (var i = 0; i < this.shoppingCartItems.length; i++) {
        var shoppingCartItem = this.shoppingCartItems[i];
        if (shoppingCartItem.name === inventoryItem.name) {
            found = shoppingCartItem;
            break;
        }
    }
    return found;
}

//this is the function that adds the item from the invenotry to the shopping cart
// if the shoppping cart item and inventory item don't match, it creates a new instance of a shoppingcartitem
// nd passes the inventoryitem.name/price as the parameters, and increments the num of 
//that item by 1. otherwise it simply invrements the number by 1 each time it is "added".
// which also updates the amount wer are multiplying it by to get a new price and total price up above
shoppingCart.prototype.addToCart = function (inventoryItem) {
    var foundItem = this.checkShoppingCartItem(inventoryItem)
    if (foundItem === null) {
        var item = new ShoppingCartItem(inventoryItem.name, inventoryItem.price);
        item.num++;
        this.shoppingCartItems.push(item);
        this.saveToLocalStorage(item.name, item);
    } else {
        foundItem.num++;
        this.saveToLocalStorage(foundItem.name, foundItem);
    }
    this.addTotalAndPrint();
}

shoppingCart.prototype.addSavedCartItems = function (cartItems) {
    for (var i = 0; i < cartItems.length; i++) {
        var item = cartItems[i];
        var shoppingItem = new ShoppingCartItem(item.name, item.price);
        shoppingItem.num = item.num;
        this.shoppingCartItems.push(shoppingItem);
    }

}

shoppingCart.prototype.getCartFromLocalStorage = function () {
    var localArray = []
    for (var i = 0; i < this.shoppingCartItems.length; i++) {
        var StorageItemCheck = this.shoppingCartItems[i];
        var value = getObjectValueFromLocalStorage(StorageItemCheck.name);
        if (value === null) {
            continue;
        } else {
            localArray.push(value);
           

        }

    }
    return localArray;
}
shoppingCart.prototype.printCart = function () {
    //var items = this.getCartFromLocalStorage();
    for (var i = 0; i < this.shoppingCartItems.length; i++) {
        var item = this.shoppingCartItems[i];
        addRowItem(item);
    }
}
//this calculates the total of the cart items and sets the total to this.total the carts actual total
shoppingCart.prototype.addTotal = function () {
    var totalSum = 0;
    for (var i = 0; i < this.shoppingCartItems.length; i++) {
        var item = this.shoppingCartItems[i];
        var itemTotal = item.price * item.num;
        totalSum = itemTotal + totalSum;

    };
    this.total = totalSum;
    return totalSum;
}

//uses add total and print total function together for convenience
shoppingCart.prototype.addTotalAndPrint = function () {
    this.addTotal();
    this.printTotal();

}



shoppingCart.prototype.saveToLocalStorage = function (key, value) {
    var cartItemsSerialized = JSON.stringify(value);
    localStorage.setItem(key, cartItemsSerialized);
    var localData = JSON.parse(localStorage.getItem("myCart"));
}



//this is the function that removes the item from the car. it is what makes the remove tem button work
//if the singleitem.name matches the item name passed in, then is is spliced from the shopping cart at that index.
//removing the element with that item name text and item name button
shoppingCart.prototype.removeFromCart = function (itemName) {
    for (var i = 0; i < this.shoppingCartItems.length; i++) {
        var singleItem = this.shoppingCartItems[i];
        if (singleItem.name === itemName) {
            this.shoppingCartItems.splice(i, 1);
        }
    }
    document.getElementById(itemName + "-addToCartButton").removeAttribute("disabled");
    document.getElementById(itemName + "-button").remove();
    document.getElementById(itemName + "-itemList").remove();
    this.addTotalAndPrint();
    localStorage.removeItem(itemName)
}

//prints the total of the items, from mycarts total
shoppingCart.prototype.printTotal = function () {
    var totalID = document.getElementById("Total");
    totalID.textContent = "TOTAL = " + this.total.toFixed(2);
}
//print total of items
shoppingCart.prototype.printTotal = function () {
    var totalID = document.getElementById("Total");
    totalID.textContent = "TOTAL = " + this.total.toFixed(2);
}
