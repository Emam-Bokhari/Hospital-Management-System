import mongoose from "mongoose";
import app from "./app";
import config from "./app/config";
const PORT = 3000;

async function main() {
    try {
        await mongoose.connect(config.database_url as string);
        app.listen(PORT, () => {
            console.log(`Server is running on port: ${PORT}`);
        });
    } catch (err) {
        console.log(err);
    }
}


main()