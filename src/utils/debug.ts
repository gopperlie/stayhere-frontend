// src/utils/debug.ts
import debug from "debug";

const log = debug("app:DateSelector"); // Replace 'app:component' with your namespace

export const debugLog = (message: string) => {
  log(message);
};
