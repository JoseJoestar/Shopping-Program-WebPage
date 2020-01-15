// the handle click function takes the item first and console ligs the item to be added
//the changeitemcart function is what displays to user what item is being added to the cart
// we call a function to add the selected item to my cart which is addtocart
//add row is more explained down below but it displays the added items in the mycart
function assignItemEventHandler(item, button, theInventory) {
    var handleClick = function () {
        if (item.totalCount <= 0) {
            alert("WARNING: Inventory is now empty. Unable to add Anymore of this Item");
            var addButtonDisabled = document.getElementById(item.name + "-addToCartButton");
            addButtonDisabled.setAttribute("disabled", "disabled");
        } else {
            myCart.addToCart(item);
            addRowItem(myCart.checkShoppingCartItem(item));
            inventory.SubtractFromInventory(item);
            var amountInventory = document.getElementById(item.name + "-amountInventory");
            var amount = item.totalCount;
            amountInventory.textContent = amount;
        }
    }
    button.addEventListener("click", handleClick);
}

//we chose to define item as follows. the item quantity is set to 0 by default because there are none in the cart yet

function assignShowMoreEventHandler(button, ) {
    button.addEventListener("click", function (buttonEvent) {
        var button = this;
        var itemInfoNodes = document.getElementsByClassName("ItemInfo")
        for (var i = 0; i < itemInfoNodes.length; i++) {
            var singleItemInfoNode = itemInfoNodes[i];
            var itemData = singleItemInfoNode.dataset.itemName;
            if (button.dataset.itemName === itemData) {
                //alert(desc + count);
                if (singleItemInfoNode.style.display === "block") {
                    singleItemInfoNode.style.display = "none";
                } else {
                    singleItemInfoNode.style.display = "block";
                }
            } else {
                singleItemInfoNode.style.display = "none";
            }
        }
    })
}

//this actually adds a item(name and price) into the shopping cart.
//we set the shoppingCartItemTextId to the itemname -"text" to help differentiate the ID of the span with the item info, and the button
//that adds the item to the cart
// if the shoppingcartspanitemelemnt is null then it creates and appends the item name, price and number of items into the span
// it it does exist in the cart, it instead updates the number of that item and multiples the price set, by that number 
function addRowItem(shoppingCartItem) {
    var shoppingCartItemTextId = shoppingCartItem.name + "-text";
    var ShoppingCartSpanItemElement = document.getElementById(shoppingCartItemTextId);
    var text = shoppingCartItem.name + "( " + shoppingCartItem.num + " )" + " $" + (shoppingCartItem.price * shoppingCartItem.num).toFixed(2);
    var li = document.createElement("li");
    li.setAttribute("class", "list-group-item");
    li.setAttribute("id", shoppingCartItem.name + "-itemList");
    var ul = document.createElement("ul");
    var span = document.createElement("span");
    ul.append(li);
    if (ShoppingCartSpanItemElement === null) {
        span.textContent = text;
        span.setAttribute("id", shoppingCartItemTextId);
        li.append(span);
        var removeButton = document.createElement("button");
        removeButton.setAttribute("id", shoppingCartItem.name + "-button");
        removeButton.setAttribute("class", "btn btn-danger");
        removeButton.textContent = "Remove Item";
        removeButton.style.cssFloat = "right";
        removeButton.dataset.itemName = shoppingCartItem.name;
        removeButton.addEventListener("click", function (event) {
            const cartItem = myCart.checkShoppingCartItem(shoppingCartItem);
            myCart.removeFromCart(cartItem.name);
            inventory.AddFromCartBackToInventory(cartItem.name, cartItem.num);
        })
        var listBody = document.getElementById("shoppingList");
        li.append(removeButton);
        listBody.append(li);
    } else {
        var getItemIdElement = document.getElementById(shoppingCartItemTextId);
        getItemIdElement.textContent = text;
    }
}

var getObjectValueFromLocalStorage = function (key) {
    var keyValue = JSON.parse(localStorage.getItem(key));
    return keyValue;
}

var inventoryRawData = [
    {
        name: "Juice",
        description: "Juice: You got the Juice? No, you don't. Thats why you are here. So you can get some juice.",
        price: 1.99,
        totalCount: 6,
    }, {
        name: "Apple",
        description: " Apple: Enjoy a  delicious crisp LonLon Ranch Apple straight off the great Deku Tree itself. ",
        price: 4.99,
        totalCount: 20,
    }, {
        name: "Banana",
        description: " Banana: Of course, a Yuga Clan favorite, the mighty Banana. grants +3 strength. ",
        price: 2.99,
        totalCount: 27,
    }, {
        name: "Milk",
        description: " Milk: A staple of hylian agriculture, LonLon milk, it doesn't get fresher than this. ",
        price: 4.50,
        totalCount: 5,
    }, {
        name: "Soda",
        description: " Soda: Though not as potent due to lack of a certain... outlawed substance, still a nice treat on a hot day. ",
        price: .99,
        totalCount: 5,
    }, {
        name: "Chips",
        description: " Chips: Frito lay flamin hot cheetos. Clench up, you aren't ready for this heat. ",
        price: 2.49,
        totalCount: 9,
    }, {
        name: "Dragon Fruit",
        description: " Dragon Fruit: It was believed that these were the eggs of dragons. Not sure who believed that, but they are pretty sweet fruits ",
        price: 5,
        totalCount: 13,
    }, {
        name: "Tea",
        description: " Tea: Earl grey tea is the key to life. ",
        price: .69,
        totalCount: 46,
    }, {
        name: "Pineapple",
        description: " Pineapple: A great snack that pairs perfectly with pepporoni pizza. ",
        price: 2.39,
        totalCount: 45,
    }, {
        name: "Orange",
        description: " Oranges: Great for fighting off scurvy, these bad boys make a nice mid-summer snack. Would NOT recommend juicing Dx ",
        price: .25,
        totalCount: 30,
    }, {
        name: "Chicken Soup",
        description: " Chicken Soup: For the soul. Comes with magic vegetables that cures any ailments you may have. Just Like Granny used to make. ",
        price: 1.25,
        totalCount: 12,
    }, {
        name: "Potato",
        description: " Potato: One of Gods greatest creations, the Potato can make liqour, Fries, Hasbowns, and those who are skilled enough can mix it with the soup above to make a special dish... ",
        price: 3.49,
        totalCount: 20,
    }, {
        name: "Bacon",
        description: " Bacon: Nirvana. what more must be said. each bite is an emerald splash on your taste buds. yum.",
        price: 6,
        totalCount: 6,

    }
]
function getInventoryDataFromURL(url) {
    var result = fetch(url, {
        method: "GET",
        headers: {
            "Content-Type": "application/json"
        }
    }).then(function (response){
        return response.json();
    })

console.log(result);
return result;
}
function getInventoryRawData(data) {
    var rawData = []
    for (var i = 0; i < data.length; i++) {
        ItemIndexed = data[i];
        ItemIndexed = new InventoryItem(ItemIndexed.name, ItemIndexed.price, ItemIndexed.totalCount, ItemIndexed.description);
        rawData.push(ItemIndexed);

    }
    return rawData;
}






