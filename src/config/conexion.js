import mongoose from "mongoose";
import {config} from "./config.js";

export default class Conexion{
    static #instance

    constructor(){
        mongoose.connect(config.mongo_url)
    }

    static getInstance = () => {
        if(this.#instance){
            console.log("Already connected")
            return this.#instance
        }
        this.#instance = new Conexion()
        console.log("Connected")
        return this.#instance
    }
}