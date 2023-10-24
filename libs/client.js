import { createClient } from "microcms-js-sdk";

export const client = createClient({
    serviceDomain: "netyear-blog01",
    apiKey: process.env.API_KEY,
});