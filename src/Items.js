function ShoppingCartItem(name, price) {
    this.name = name;
    this.price = price;
    this.num = 0;
}

function InventoryItem(name, price, totalCount, description) {
    this.name = name;
    this.description = description;
    this.price = price;
    this.totalCount = totalCount;
}