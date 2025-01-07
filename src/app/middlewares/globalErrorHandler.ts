/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import config from "../config";
import express from "express";

export const globalErrorHandler = ((err: any, req: Request, res: Response, next: NextFunction) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || "Internal server error";

    const error = [
        {
            path: "",
            message: "",
        },
    ]

    return res.status(statusCode).json({
        success: false,
        message: message,
        statusCode,
        error,
        stack: config.node_env === "development" ? err.stack : null,
    })
}) as unknown as express.ErrorRequestHandler;