/* Goal of this file is to create a signed url for uploading an image to S3 bucket. */

const S3 = require('aws-sdk/clients/s3');
const s3 = new S3({ useAccelerateEndpoint: true });
const ulid = require('ulid');

const BUCKET_NAME = 'storagestack-userimagebucket48266e16-1vlipo7j4dxax';

module.exports.handler = async (event) => {
  const id = ulid.ulid(); // to create order in unordered database.
  let key = `${event.identity.username}/${id}`;

  const extension = event.arguments.extension;
  if (extension) {
    if (extension.startsWith('.')) {
      key += extension;
    } else {
      key += `.${extension}`;
    }
  }

  const contentType = event.arguments.contentType || 'image/jpeg';
  if (!contentType.startsWith('image/')) {
    throw new Error('content type should be an image');
  }

  const params = {
    Bucket: BUCKET_NAME,
    Key: key,
    ACL: 'public-read',
    ContentType: contentType
  };
  const signedUrl = s3.getSignedUrl('putObject', params); // this requires put ACL turned on S3 bucket.
  return signedUrl;
};
