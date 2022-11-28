import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class UserImageBucket extends Construct {
  public readonly userImageBucket: cdk.aws_s3.Bucket;
  constructor(scope: Construct, id: string) {
    super(scope, id);
    const userImageBucket = new cdk.aws_s3.Bucket(this, "UserImageBucket", {
      transferAcceleration: true,
      cors: [
        {
          allowedMethods: [
            cdk.aws_s3.HttpMethods.GET,
            cdk.aws_s3.HttpMethods.PUT,
          ],
          allowedOrigins: ["*"],
          allowedHeaders: ["*"],
        },
      ],
    });

    this.userImageBucket = userImageBucket;
  }
}
