import nextConnect from "next-connect";
import middleware from "../../../middleware/database"; // Import the database middleware
import pool from "../../../config/db"; // Import the database connection
import bodyParser from "body-parser";
import Cors from "cors"; // Import the cors middleware

import initMiddleware from "../../../lib/init-middleware"; // Create a separate file to initialize middleware
// Initialize the Cors middleware
const cors = initMiddleware(
  Cors({
    origin: "*",
    methods: ["GET", "HEAD", "POST"], // Add the HTTP methods you want to allow
  })
);

// Function to handle POST requests
async function handler(req, res) {
  try {
    if (!req.body.table_id) {
      res.status(400).json({
        status: 0,
        code: 400,
        message: "Table id is required!",
        data: null,
      });
    }
    let result = [];
    if (req.body.table_id == 1) {
      result = [
        {
          name: "employee_id",
          data_type: "all",
        },
        {
          name: "name",
          data_type: "varchar",
        },
        {
          name: "email",
          data_type: "varchar",
        },
        {
          name: "phone_number",
          data_type: "varchar",
        },
        {
          name: "salary",
          data_type: "all",
        },
      ];
    } else if (req.body.table_id == 2) {
      result = [
        {
          name: "id",
          data_type: "integer",
        },
        {
          name: "employee_id",
          data_type: "integer",
        },
        {
          name: "address",
          data_type: "varchar",
        },
        {
          name: "total_exp",
          data_type: "varchar",
        },
        {
          name: "joining_date",
          data_type: "Date",
        },
      ];
    }

    res.status(201).json({
      status: 1,
      code: 200,
      message: "Table fileds get successfully!",
      data: result,
    });
  } catch (error) {
    res.status(500).json({
      status: 0,
      code: 500,
      message: "Error Occur!",
      data: null,
    });
  }
}

// handler.use(cors({
//   origin: '*', // Specify the allowed origin
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Enable credentials (cookies, authorization headers, etc.)
// }));

export default handler;
