import dbMiddleware from "./mongodb";
import nextConnect from "next-connect";
import next from "next";

export default function createHandler(...middlewares) {
    return nextConnect().use(dbMiddleware, ...middlewares);
}
