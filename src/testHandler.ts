import { APIGatewayEvent, Callback, Context, Handler } from 'aws-lambda';
import { config } from './common/config';
import * as mysql from 'mysql';


const createErrorResponse = (statusCode, message) => ({
  statusCode: statusCode || 501,
  headers: { 'Content-Type': 'text/plain' },
  body: message
});

const connection = mysql.createConnection({
  host: config.DB_URL,
  user: config.DB_USER,
  password: config.DB_PASSWORD,
  database: config.DB_NAME
});


export const get: Handler = (event: APIGatewayEvent, context: Context, cb: Callback) => {
  console.log('start...'); // The logs can be restored in the CloudWatch logs
  connection.connect((error, args) => {
    console.log(`connected`);
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      cb(null, createErrorResponse(501, error.message));
    }
    else {
      query(cb);
    }
  });
};


function query(cb: Callback) {
  connection.query('SELECT 1 + 1 AS solution', (error, results: any[], fields) => {
    if (error) {
      console.log(`error: ${JSON.stringify(error)}`);
      cb(null, createErrorResponse(501, error.message));
    }
    connection.end();
    cb(null, {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*', // Required for CORS support to work
      },
      body: JSON.stringify({ body: results[0].solution })
    });
  });
}