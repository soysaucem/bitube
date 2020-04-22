import * as S3 from 'aws-sdk/clients/s3';
import { awsS3Config } from '../../environments/environment';

export class S3BucketSingleton {
  private static singleton: S3BucketSingleton;
  private s3Bucket: S3;

  private constructor() {
    this.s3Bucket = new S3({
      accessKeyId: awsS3Config.aws_access_key_id,
      secretAccessKey: awsS3Config.aws_secret_access_key,
      region: 'ap-southeast-2',
    });
  }

  public static get instance(): S3BucketSingleton {
    if (!S3BucketSingleton.singleton) {
      S3BucketSingleton.singleton = new S3BucketSingleton();
    }

    return S3BucketSingleton.singleton;
  }

  get bucket(): S3 {
    return this.s3Bucket;
  }
}
