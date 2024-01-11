import nextConnect from 'next-connect';
import middleware from '../../../middleware/database'; // Import the database middleware
import pool from '../../../config/db'; // Import the database connection
import bodyParser from 'body-parser';

// Function to handle POST requests
async function handler(req, res) {

  try{

    if(!req.body.table_id) {
      res.status(400).json({
        status: 0, 
        code:400, 
        message: 'Table id is required!', 
        data: null 
      });
    }
    let result = [];
    if(req.body.table_id ==1) {
      result = [{
        name: "employee_id",
        data_type: "integer"
      },{
        name: "name",
        data_type: "varchar",
      },
      {
        name: "email",
        data_type: "varchar",
      },
      {
        name: "hire_date",
        data_type: "Date",
      },
      {
        name: "phone_number",
        data_type: "varchar",
      },
      {
        name: "salary",
        data_type: "integer",
      }];
    } else if(req.body.table_id ==2){
      result = [{
        name: "id",
        data_type: "integer"
      },{
        name: "employee_id",
        data_type: "integer"
      },{
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
      }];
    }

    res.status(201).json({ 
      status: 1, 
      code:200, 
      message: 'Table fileds get successfully!', 
      data: result 
    });

  }catch(error){
    res.status(500).json({ 
      status: 0, 
      code:500, 
      message: 'Error Occur!', 
      data: null 
    });
  }
}

export default handler;