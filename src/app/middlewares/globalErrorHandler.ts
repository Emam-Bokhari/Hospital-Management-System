/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { NextFunction, Request, Response } from "express";
import config from "../config";
import express from "express";
import { TError } from "../interface/error";
import { ZodError } from "zod";
import { handleZodValidationError } from "../errors/handleZodValidationError";

export const globalErrorHandler = ((err: any, req: Request, res: Response, next: NextFunction) => {
    let statusCode = err.statusCode || 500;
    let message = err.message || "Internal server error";

    let error: TError = [
        {
            path: "",
            message: "",
        },
    ]

    if (err instanceof ZodError) {
        const formattedZodError = handleZodValidationError(err);

        statusCode = formattedZodError?.statusCode;
        message = formattedZodError?.message;
        error = formattedZodError?.error;
    }

    return res.status(statusCode).json({
        success: false,
        message: message,
        statusCode,
        error,
        stack: config.node_env === "development" ? err.stack : null,
    })
}) as unknown as express.ErrorRequestHandler;