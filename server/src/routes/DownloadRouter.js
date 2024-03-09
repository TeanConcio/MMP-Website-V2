// Imports Modules
import express from "express";
import { db as prisma } from "../utils/db.server.js";
import JSZip from "jszip";
import { parse as parseToCSV } from "json2csv";
import { exclude, allowed } from "../utils/helpers.js";

// Express Router
const DownloadRouter = express.Router();

/* Helpers */

/* Controllers */

/* GET Endpoints */


// Export Router
export default DownloadRouter;
