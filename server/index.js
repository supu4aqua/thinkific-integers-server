const app = require('./app');

/*const connectToMongoDB = async () => {
    await app().then((mongoose) => {
        try {
            console.log('Connected to mongodb!')
        } finally {
            mongoose.connection.close()
        }
    })
}

connectToMongoDB()*/

// Start the server
const port = process.env.PORT || 8000;
app.listen(port);
console.log(`Server listening at ${port}`)