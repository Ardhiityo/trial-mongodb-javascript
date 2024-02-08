const mongoose = require('mongoose');
const {
    Schema
} = mongoose;

// const movieSchema = new Schema({
//     title: {
//         type: String,
//         required: true
//     },
//     rating: {
//         type: Number,
//         required: true
//     }
// });

// const Movie = mongoose.model('Movie', movieSchema);

// const movie = new Movie({
//     title : "SpiderMan"
// })

// console.log(movie);
// // movie.save();

// const movie = Movie.insertMany(
//     [{
//         title: "SpiderMan",
//         rating: 92
//         },
//         {
//         title: "IronMan",
//         rating: 90
//         },
//         {
//         title: "SuperMan",
//         rating: 93
//         },]
// ).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

// Movie.find({ title : 'SpiderMan'}).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(errt);
// });;

// Movie.findByIdAndUpdate('65c33f0f64b53ae78e640555', { rating : 93}, {runValidators: true}).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });;

// Movie.updateMany({
//     rating: {
//         $gt: 90
//     }
// }, {
//     title: "Diubah"
// }, {
//     runValidators: true
// }).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });;

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        min: [0, 'minimum']
    },
    color: {
        type: String,
        required: true
    },
    size: {
        type: String,
        required: true,
        enum: ['m', 'l', 'xl']
    },
    description: {
        type: String,
        required: true,
        maxLength: 150
    },
    condition: {
        type: String,
        required: true,
        enum: ['baru', 'bekas']
    },
    stock: {
        type: Number,
        required: true,
        min: 0
    },
    availability: {
        online: {
            type: Boolean,
            required: true
        },
        offline: {
            type: Boolean,
            required: true
        },
    }
})

// productSchema.methods.outStock = function () {
//     this.stock = 0;
//     this.availability.online = false;
//     this.availability.offline = false;
//     return this.save();
// };

productSchema.statics.closeStore = function () {
    return this.updateMany({}, {
        stock: 0,
        'availability.offline': false,
        'availability.online': false,
    });
};

const Products = mongoose.model('Product', productSchema);

Products.closeStore()
    // Jika menggunakan then & catch success diubah, jika tdk menggunakannya tidak terjadi apa-apa
    // .then((result) => {
    //     console.log(result);
    // }).catch((err) => { 
    //     console.log(err);
    // });

// const resetStock = async (id) => {
//     const foundProduct = await Products.findById(id);
//     await foundProduct.outStock();
//     console.log('Berhasil diubah');
// }

// resetStock('65c4781191c95a452feff0dd');

// const products = new Products({
// "name": "Kemeja Flanel",
// "brand": "Hollister",
// "price": 750000,
// "color": "biru muda",
// "size": "m",
// "description": "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
// "condition": "baru",
// "stock": 25,
// "availability": {
//     "online": true,
//     "offline": true
// }
// }, )

// console.log(products);
// products.save();

// Products.findOneAndUpdate({
//     name: 'Kemeja Flanel'
// }, {
//     "name": "Kemeja Flanel",
//     "brand": "Hollister",
//     "price": 950000,
//     "color": "biru muda",
//     "size": "m",
//     "description": "Kemeja flanel dengan warna yang cerah, terbuat dari bahan flanel yang nyaman dan berkualitas tinggi.",
//     "condition": "baru",
//     "stock": 25,
//     "availability": {
//         "online": true,
//         "offline": true
//     }
// }, {
//     runValidators: true,
//     new: true
// }).then((result) => {
//     console.log(result);
// }).catch((err) => {
//     console.log(err);
// });

mongoose.connect('mongodb://127.0.0.1:27017/products')
    .then((result) => {
        console.log('connected to MongoDB')
    }).catch((err) => {
        console.log(err);
    });