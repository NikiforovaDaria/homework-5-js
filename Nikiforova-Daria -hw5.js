function Hamburger (size, stuffing) {
    this.size = size;
    this.stuffing = stuffing;
}
Hamburger.prototype.getSize = function (){
    return this.size;
}
Hamburger.prototype.getStuffing = function() {
	return this.stuffing;
};
Hamburger.prototype.calculatePrice = function () {
    return this.size.price + this.stuffing.price;    
}
Hamburger.prototype.calculateCalories = function(){
    return this.size.calories + this.stuffing.calories ;
}

//STUFFING//
    function Stuffing (){
        Drink.apply(this, arguments)
    };

    Stuffing.prototype = Object.create(Drink.prototype);
    Stuffing.prototype.constructor = Stuffing;

//DRINK//
function Drink (type){
    this.type = type;
}
Drink.prototype.getType = function (){
    return this.type;
}

Drink.prototype.calculatePrice = function () {
    return this.type.price;    
}

Drink.prototype.calculateCalories = function() {
    return this.type.calories; 
}


//SALAD/
function Salad (type, size){
    Drink.apply(this, arguments)
    this.size = size;
}
Salad.prototype = Object.create(Drink.prototype);
Salad.prototype.constructor = Salad;

Salad.prototype.calculatePrice = function () {
    return this.size*(this.type.price/100);    
}

Salad.prototype.calculateCalories = function(){
    return this.size*(this.type.calories/100);
}


//ORDER//
function Order(list){
    this.list = Array.prototype.slice.call(arguments);
    this.paid = false
}
Order.prototype.getList = function(){
    return this.list;
}
Order.prototype.addPosition = function(item){
    if (!this.paid) {
        this.list.push(item);
        return this.list;
    }
    return 'Order is paid'
}

Order.prototype.deletePosition = function(item){
    if (!this.paid) {
            for (var i = 0; i < this.list.length; i++) {
                if (this.list[i] === item) {
                    this.list.splice(i, 1);
                    return item + 'deleted'
                }
            }  return this.list
    } else {return 'Order is paid'}
} 
Order.prototype.calculateCalories = function(){
    var totalCalories = 0;
    for (var i=0; i<this.list.length; i++){
        totalCalories += this.list[i].calculateCalories();
    }
    return totalCalories
}
Order.prototype.calculatePrice = function(){
    var totalPrice = 0;
    for (var i=0; i<this.list.length; i++){
        totalPrice += this.list[i].calculatePrice();
    }
    return totalPrice
}

Order.prototype.pay = function(){
    this.paid = true
}

///OBJECTS//
Hamburger.SIZE_SMALL = {price: 50, calories: 20};
Hamburger.SIZE_LARGE = {price: 100, calories: 40};

Hamburger.STUFFING_CHEESE = {price: 10, calories: 20};
Hamburger.STUFFING_LETTUCE = {price: 20, calories: 5};
Hamburger.STUFFING_POTATO = {price: 15, calories: 10};

Salad.CAESAR = {price: 100, calories: 20};
Salad.OLIVIER = {price: 50, calories: 80};

Drink.COLA = {price: 50, calories: 40};
Drink.COFFEE = {price: 80, calories: 20};


///EXAMPLE//
var hamburger1 = new Hamburger(Hamburger.SIZE_LARGE, Hamburger.STUFFING_CHEESE)
var stuffing1 = new Stuffing(Hamburger.STUFFING_CHEESE);
var stuffing2 = new Stuffing(Hamburger.STUFFING_LETTUCE);
var salad = new Salad(Salad.OLIVIER, 150);
var drink = new Drink(Drink.COLA);

var order1 = new Order(hamburger1, salad, drink)
order1.addPosition(stuffing1)
order1.deletePosition(stuffing1);
order1.addPosition(drink)
console.log( 'Total Calories: ' + order1.calculateCalories());
console.log( 'Total Price:  ' + order1.calculatePrice());
console.log(order1)
order1.pay();
console.log(order1)
order1.addPosition(stuffing2)
console.log( 'Total Calories: ' + order1.calculateCalories());
console.log( 'Total Price:  ' + order1.calculatePrice());
console.log(order1)