declare module "*.module.scss";

declare global {
    namespace NodeJS {
        export interface ProcessEnv {
            [key: string]: string | undefined;
        }
    }
}
