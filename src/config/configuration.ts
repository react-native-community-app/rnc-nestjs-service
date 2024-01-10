import * as Joi from "joi";

export type NODE_ENV = "development" | "production";
export interface EnvironmentVariables {
    NODE_ENV: NODE_ENV;
    PORT: number;
    GITHUB_APP_ID: string;
    GITHUB_JWT_EXPIRESIN: string;
}

export const validationSchema = Joi.object({
    NODE_ENV: Joi.string()
        .valid("development", "production")
        .default("development"),
    PORT: Joi.number().default(3001),
    GITHUB_APP_ID: Joi.string().required(),
    GITHUB_JWT_EXPIRESIN: Joi.string().required(),
});

export default () => (<EnvironmentVariables>{
    NODE_ENV: process.env.NODE_ENV,
    PORT: parseInt(process.env.PORT),
    GITHUB_APP_ID: process.env.GITHUB_APP_ID,
    GITHUB_JWT_EXPIRESIN: process.env.GITHUB_JWT_EXPIRESIN
});