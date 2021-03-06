import mongoose from "mongoose";
import mdb from "./next.config";

export async function dbConnect() {
    if (mongoose.connection.readyState >= 1) return;

    await mongoose.connect(mdb.env.mongodburl, {
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
        useNewUrlParser: true,
    });
}

export default async function dbMiddleware(req, res, next) {
    try {
        if (!global.mongoose) {
            global.mongoose = dbConnect();
        }
    } catch (e) {
        console.log();
    }
    return next();
}

// const connectDB = (handler) => async (req, res) => {
//     if (mongoose.connections[0].readyState) {
//         // Use current db connection
//         return handler(req, res);
//     }
//     // Use new db connection
//     // console.log(mdb, mdb.env.mongodburl);
//     await mongoose.connect(mdb.env.mongodburl, {
//         useUnifiedTopology: true,
//         useFindAndModify: false,
//         useCreateIndex: true,
//         useNewUrlParser: true,
//     });
//     return handler(req, res);
// };

// export default connectDB;
