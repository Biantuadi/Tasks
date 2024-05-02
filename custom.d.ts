declare module "*.png" {
    const value: any;
    return value;
}

declare module "*.jpg" {
    const value: any;
    return value;
}

declare module "*.jpeg" {
    const value: any;
    return value;
}

declare module "*.gif" {
    const value: any;
    return value;
}

declare module "*.svg" {
    const value: any;
    return value;
}

declare module "*.json" {
    const value: any;
    export default value;
}

import 'dotenv/config';

declare module '@env' {
    export const API_KEY: string;
    export const AUTH_DOMAIN: string;
    export const DATABASE_URL: string;
    export const PROJECT_ID: string;
    export const STORAGE_BUCKET: string;
    export const MESSAGING_SENDER_ID: string;
    export const APP_ID: string;
  }