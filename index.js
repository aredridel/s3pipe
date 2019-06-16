#!/usr/bin/env node
const AWS = require('aws-sdk');
const main = require('async-main').default;

if (!process.argv[2] || !process.argv[3]) {
    console.warn(`Use: stuff | ${process.argv[1]} bucket key`);
    process.exit(1);
}

main(async () => {
    const s3 = new AWS.S3();
    const upload = s3.upload({ Bucket: process.argv[2], Key: process.argv[3], Body: process.stdin }, {partSize: 5 * 1024 * 1024 * 1024});
    upload.on('httpUploadProgress', console.log)
    await upload.promise();
});
