const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    id: { type: String, unique: true, required: true, lowercase: true},
    name: {type: String, required: true},
    price: {type: Number, required: true}
 }, {collection: 'product'});


//Populate DB
const Telephone = mongoose.model('Telephone', productSchema);
const mobile = new Telephone({id: '0', name: 'mobile', price : '499'})

const Pc = mongoose.model('Pc', productSchema);
const personalComputer = new Pc({id: '1', name: 'personalComputer', price : '999'})

const Keyboard = mongoose.model('Keyboard', productSchema);
const logitechKeyboard = new Keyboard({id: '2', name: 'logitechKeyboard', price : '129'})

const Mouse = mongoose.model('Mouse', productSchema);
const gamingMouse = new Mouse({id: '3', name: 'gamingMouse', price : '49'})

const Monitor = mongoose.model('Monitor', productSchema);
const sonyMonitor = new Monitor({id: '4', name: 'sonyMonitor', price : '799'});

async function saving(product){
    await product.save();
    console.log('lefutottam')
}


mongoose.model('product', productSchema);
