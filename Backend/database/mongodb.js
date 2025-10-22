import mongoose from "mongoose";
import { ENROLLMENT_DB_URI, LEARNING_DB_URI, LIBRARY_DB_URI, SERVICES_DB_URI, NODE_ENV } from "../config/env.js";

let libraryConnection = null
let enrollmentConnection = null
let learningConnection = null
let servicesConnection = null
//db connection
export const connectToDatabaseLibrary = async() => {

    if(!LIBRARY_DB_URI){
        throw new Error(`Please define the MONGODB__URI environment variable inside .env.${NODE_ENV}.local`)
    }

    if(!libraryConnection) {
        libraryConnection = mongoose.createConnection(LIBRARY_DB_URI, {
            tls: true,
            tlsAllowInvalidCertificates: true,
        })
        libraryConnection.on('connected', () => {
            console.log('Connected to Library Database')
        })
        libraryConnection.on('error',(err) => {
            console.error('Library DB connection error', err)
        })
    }

    return libraryConnection
}

export const connectToDatabaseEnrollment = async() => {

    if(!ENROLLMENT_DB_URI){
        throw new Error(`Please define the MONGODB__URI environment variable inside .env.${NODE_ENV}.local`)
    }

    if(!enrollmentConnection) {
        enrollmentConnection = mongoose.createConnection(ENROLLMENT_DB_URI, {
            tls: true,
            tlsAllowInvalidCertificates: true,
        })
        enrollmentConnection.on('connected', () => {
            console.log('Connected to Enrollment Database')
        })
        enrollmentConnection.on('error',(err) => {
            console.error('Enrollment DB connection error', err)
        })
    }

    return enrollmentConnection
}

export const connectToDatabaseLearning = async() => {

    if(!LEARNING_DB_URI){
        throw new Error(`Please define the MONGODB__URI environment variable inside .env.${NODE_ENV}.local`)
    }

    if(!learningConnection) {
        learningConnection = mongoose.createConnection(LEARNING_DB_URI, {
            tls: true,
            tlsAllowInvalidCertificates: true,
        })
        learningConnection.on('connected', () => {
            console.log('Connected to Learning Management Database')
        })
        learningConnection.on('error',(err) => {
            console.error('Learning Management DB connection error', err)
        })
    }

    return learningConnection
}

export const connectToDatabaseServices = async() => {

    if(!SERVICES_DB_URI){
        throw new Error(`Please define the MONGODB__URI environment variable inside .env.${NODE_ENV}.local`)
    }

    if(!servicesConnection) {
        servicesConnection = mongoose.createConnection(SERVICES_DB_URI, {
            tls: true,
            tlsAllowInvalidCertificates: true,
        })
        servicesConnection.on('connected', () => {
            console.log('Connected to School Services Database')
        })
        servicesConnection.on('error',(err) => {
            console.error('School Services DB connection error', err)
        })
    }

    return servicesConnection
}