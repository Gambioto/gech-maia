import { connectDatabase } from "./db/connection";
import User from "./models/User"
import app from "./app"

connectDatabase()
    .then(() => {
        console.log("Connected to database!")
        app.listen(3000, () => {
            console.log('Server is running on port 3000');
        })
    })
    .catch((err) => console.log(err));


