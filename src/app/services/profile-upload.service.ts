import { Injectable } from '@angular/core';
import * as S3 from 'aws-sdk/clients/s3';
import { awsS3Config } from '../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ProfileUploadService {
  private bucket = new S3({
    accessKeyId: awsS3Config.aws_access_key_id,
    secretAccessKey: awsS3Config.aws_secret_access_key,
    region: 'ap-southeast-2',
  });

  constructor() {}
}
