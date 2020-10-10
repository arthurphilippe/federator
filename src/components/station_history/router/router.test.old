// import * as router from ".";
import * as express from "express";
import * as bodyParser from "body-parser";
import * as request from "supertest";
import * as stationHistory from "..";
import { mongoose } from "@typegoose/typegoose";
import * as HttpError from "../../../HttpError";
import * as dbErrorMatcher from "../../../dbErrorMatcher";

let api = express();
api.use(bodyParser.json());
api.use(bodyParser.urlencoded({ extended: true }));

let odm: typeof mongoose;
let dbMemory: typeof import("../../../dbConnectMemory");

beforeAll(async () => {
    dbMemory = await import("../../../dbConnectMemory");
    odm = await dbMemory.default();
    stationHistory.useRouter(api);
    api.use(dbErrorMatcher.handler);
    api.use(HttpError.handler);
});

afterAll(async () => {
    odm.connection.close();
    dbMemory.server.stop();
});

it("should rcv 201 when posting", async (done) => {
    let entry: stationHistory.StationHistory = {
        ipAddr: "172.17.80.151",
        hostname: "alarmpi",
        loggedIn: ["cameron"],
    };
    await request(api).post("/station_history").send(entry).expect(201);

    done();
});

it("should rcv 400 with missing ip", async (done) => {
    let entry = {
        hostname: "alarmpi",
        loggedIn: ["cameron"],
    };
    await request(api).post("/station_history").send(entry).expect(400);

    done();
});
