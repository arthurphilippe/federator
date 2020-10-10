import { routesToApply } from "./router";
import * as express from "express";
import * as stationHistory from "..";
import * as context from "../../context";
import HttpError from "../../../HttpError";

let handler: express.RequestHandler = async function (req, res, next) {
    try {
        let entry = new stationHistory.model(req.body);

        await entry.save();
        res.sendStatus(201);
    } catch (err) {
        next(err);
    }
};

routesToApply.push((router) => {
    router.post("/", handler);
    router.get("/tata", (_req, res) => {
        res.send({ msg: "au revoir" });
    });
});
