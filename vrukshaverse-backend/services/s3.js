const AWS = require('aws-sdk');
require('dotenv').config();

AWS.config.update({
    accessKeyId: process.env.AWS_ACCESS_KEY,
    secretAccessKey: process.env.AWS_SECRET_KEY,
    region: 'eu-north-1'
});

const s3 = new AWS.S3(); // ✅ DO NOT USE @aws-sdk/... here

module.exports = s3;
