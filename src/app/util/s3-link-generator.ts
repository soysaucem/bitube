import * as S3 from 'aws-sdk/clients/s3';
import { BUCKET_NAME } from './variables';
import { awsS3Config } from '../../environments/environment';

export function generateS3Link(id: string) {
  const bucket = new S3({
    accessKeyId: awsS3Config.aws_access_key_id,
    secretAccessKey: awsS3Config.aws_secret_access_key,
    region: 'ap-southeast-2',
  });

  return bucket.getSignedUrlPromise('getObject', {
    Bucket: BUCKET_NAME,
    Key: id,
    Expires: 3600,
  });
}
