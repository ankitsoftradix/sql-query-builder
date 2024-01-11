import nextConnect from 'next-connect';
import middleware from '../../../middleware/database'; // Import the database middleware
import pool from '../../../config/db'; // Import the database connection
import bodyParser from 'body-parser';
import Cors from 'cors'; // Import the cors middleware

import initMiddleware from '../../../lib/init-middleware'; // Create a separate file to initialize middleware
// Initialize the Cors middleware
const cors = initMiddleware(
  Cors({
    origin: '*',
    methods: ['GET', 'HEAD', 'POST'], // Add the HTTP methods you want to allow
  })
);

// Function to handle POST requests
async function handler(req, res) {

  try{ 

    if(!req.body.table) {
      res.status(400).json({
        status: 0, 
        code:400, 
        message: 'Table is required!', 
        data: null 
      });
    }
  
    if(!req.body.field) {
      res.status(400).json({
        status: 0, 
        code:400, 
        message: 'Field is required!', 
        data: null 
      });
    }
  
    let query = `SELECT ${req.body.field} FROM ${req.body.table}`;
  
    if(req.body.aggregation) {
      if(req.body.aggregation == "COUNT" || req.body.aggregation == "SUM" || req.body.aggregation == "AVG"){
        query = `SELECT ${req.body.aggregation}(${req.body.field}) FROM ${req.body.table}`;
      }
    }
    if(req.body.is_join==1) {
      req.body.is_where = 0;
    }
   
    if(req.body.is_where == 1) {
  
      // if(!req.body.compare_field) {
      //   res.status(400).json({
      //     status: 0, 
      //     code:400, 
      //     message: 'Compare field is required!', 
      //     data: null 
      //   });
      // }
  
      // if(!req.body.operator) {
      //   res.status(400).json({
      //     status: 0, 
      //     code:400, 
      //     message: 'Operator is required!', 
      //     data: null 
      //   });
      // }
  
      // if(!req.body.value) {
      //   res.status(400).json({
      //     status: 0, 
      //     code:400, 
      //     message: 'Value is required!', 
      //     data: null 
      //   });
      // }
      // query += ` where ${req.body.compare_field} ${req.body.operator} '${req.body.value}'`
  
      if(req.body.is_condition && req.body.is_condition.length > 0) {
        for(let i in req.body.is_condition) {
          query += ` where ${req.body.is_condition[i].condition_type ? req.body.is_condition[i].condition_type: ""} ${req.body.is_condition[i].condition_field} ${req.body.is_condition[i].operator} '${req.body.is_condition[i].condition_value}'`
        }
      }
    }

    console.log(query, "====query==")
  
    if(req.body.is_join==1) {
  
      if(!req.body.join_type) {
        res.status(400).json({
          status: 0, 
          code:400, 
          message: 'Join type is required!', 
          data: null 
        });
      }
  
      if(!req.body.joined_table) {
        res.status(400).json({
          status: 0, 
          code:400, 
          message: 'Joined table is required!', 
          data: null 
        });
      }
  
      if(!req.body.joined_table_1_field) {
        res.status(400).json({
          status: 0, 
          code:400, 
          message: 'Joined table 1 field is required!', 
          data: null 
        });
      }
  
      if(!req.body.joined_table_field) {
        res.status(400).json({
          status: 0, 
          code:400, 
          message: 'Joined table field is required!', 
          data: null 
        });
      }
  
      if(req.body.join_type == "INNER JOIN" || req.body.join_type == "LEFT JOIN" || req.body.join_type == "RIGHT JOIN" || req.body.join_type == "FULL JOIN"){
        query += ` ${req.body.join_type} ${req.body.joined_table}
        ON ${req.body.table}.${req.body.joined_table_1_field} = ${req.body.joined_table}.${req.body.joined_table_field};`
      }
    }
  
    const result = await pool.query(query);
    res.status(201).json({ 
      status: 1, 
      code:200, 
      message: 'Query executed!', 
      data: result.rows 
    });

  }catch(error){
    res.status(500).json({ 
      status: 0, 
      code:500, 
      message: 'Query not executed!', 
      data: null 
    });
  }

}

// handler.use(cors({
//   origin: '*', // Specify the allowed origin
//   methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
//   credentials: true, // Enable credentials (cookies, authorization headers, etc.)
// }));

export default handler;