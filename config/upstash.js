import { Client as WorkflowClient } from "@upstash/workflow";
import { QSTASH_TOKEN, UPSTASH_URL } from "./env.js";

export const workflow = new WorkflowClient({
    baseUrl: UPSTASH_URL,
    token: QSTASH_TOKEN
})