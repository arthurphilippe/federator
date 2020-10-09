import {
    prop,
    modelOptions,
    getModelForClass,
    ReturnModelType,
    queryMethod,
    Ref,
    index,
} from "@typegoose/typegoose";

@modelOptions({ schemaOptions: { timestamps: true } })
@index({ ipAddr: "text", loggedIn: "text", hostname: "text" })
export class StationHistory {
    @prop()
    ipAddr: string;

    @prop()
    hostname: string;

    @prop()
    loggedIn: string[];
}

// This produces the model, which is the object to use when queriying the database.
export const model = getModelForClass(StationHistory);
