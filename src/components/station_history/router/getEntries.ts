import { routesToApply } from "./router";
import * as express from "express";
import * as sationHistory from "..";

import HttpError from "../../../HttpError";

let handler: express.Handler = async (req, res) => {
    let textq = req.query["q"];
    let builder = {};

    if (textq instanceof Array) {
        textq.join(" ");
    }
    if (typeof textq == "string") {
        console.log(textq);
        builder["$text"] = { $search: textq, $language: "fr" };
    } else if (textq) {
        throw new HttpError(400, `"q" query parameter could not be parsed.`);
    }

    let query = sationHistory.model.find(builder);

    req.applyQueryParam(query);

    res.send(await query);
};

routesToApply.push((router) => {
    // middlewares would be added here, before "handler"
    router.get("/", handler);
});
