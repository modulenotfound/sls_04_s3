const AWS = require('aws-sdk');
const s3 = new AWS.S3();

export const hello = async (event, context, callback) => {
  try {
    //get S3 bucket and key from event
    const bucket = event.Records[0].s3.bucket.name;
    const key = decodeURIComponent(event.Records[0].s3.object.key.replace(/\+/g, " "));

    //copy the file into the folder copy
    await copyFile(bucket, key);
  } catch(e) {
    callback(e);
  }
};


const copyFile = async (bucket, key) => {
  const index = key.indexOf("/");
  const destKey= "copy" + key.substr(index);
  var params = {
    Bucket: bucket,
    CopySource: bucket + '/' + key,
    Key: destKey
  };
  await s3.copyObject(params).promise();
}