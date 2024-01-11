import nextConnect from 'next-connect';
import middleware from '../../../middleware/database'; // Import the database middleware
import pool from '../../../config/db'; // Import the database connection
import bodyParser from 'body-parser';

// Function to handle POST requests
async function handler(req, res) {
  try{

    const result = [{
      id: 1,
      name: "employee"
    },{
      id: 2,
      name: "employee_detail"
    }];
    res.status(201).json({
      status: 1, 
      code:200, 
      message: 'Tables get successfully!', 
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