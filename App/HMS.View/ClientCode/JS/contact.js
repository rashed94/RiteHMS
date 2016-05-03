function contact() {
    this.contacts = [
        new contact("APL", "Apple", "Eat one every day to keep the doctor away!", 12, 90, 0, 2, 0, 1, 2),
        new product("AVC", "Avocado", "Guacamole anyone?", 16, 90, 0, 1, 1, 1, 2),
        new product("BAN", "Banana", "These are rich in Potassium and easy to peel.", 4, 120, 0, 2, 1, 2, 2),
        new product("CTP", "Cantaloupe", "Delicious and refreshing.", 3, 50, 4, 4, 1, 2, 0),
    ];
    this.dvaCaption = [
        "Negligible",
        "Low",
        "Average",
        "Good",
        "Great"
    ];
    this.dvaRange = [
        "below 5%",
        "between 5 and 10%",
        "between 10 and 20%",
        "between 20 and 40%",
        "above 40%"
    ];
}
store.prototype.getProduct = function (sku) {
    for (var i = 0; i < this.products.length; i++) {
        if (this.products[i].sku == sku)
            return this.products[i];
    }
    return null;
}
