const { MongoClient, ServerApiVersion } = require('mongodb');
const uri = "mongodb+srv://Vitalii_Bezghin:Qw8hy4PfVqdoei1r@cluster0.lrwgdo8.mongodb.net/?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true, useUnifiedTopology: true, serverApi: ServerApiVersion.v1 });
let _db

const mongoConnect = (callback) => {
    client.connect().then(client => {
        console.log('Connected !')
        _db = client.db('shop')
        callback()
    }).catch(err => {
        console.log(err)
        throw err
    })
}

const getDb = () => {
    if (_db) {
        return _db
    }
    throw "No database found !"
}

exports.mongoConnect = mongoConnect
exports.getDb = getDb