import fs from "fs";
import path from "path";
import log4js from "log4js";

const logsDir = path.resolve(process.cwd(), "logs");
if (!fs.existsSync(logsDir)) {
  fs.mkdirSync(logsDir, { recursive: true });
}

log4js.configure({
  appenders: {
    out: { type: "stdout" },
    file: { type: "file", filename: path.join(logsDir, "wdio.log") },
  },
  categories: {
    default: { appenders: ["out", "file"], level: "info" },
  },
});

export const logger = log4js.getLogger();


