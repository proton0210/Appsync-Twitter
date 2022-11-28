import { StorageInterfaceProps } from "./../../../Interfaces/storage-interface";
import { UserImageBucket } from "./Constructs/UserImageBucket";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";

export class StorageStack extends cdk.Stack {
  public readonly imageUploadFunction: cdk.aws_lambda_nodejs.NodejsFunction;
  constructor(scope: Construct, id: string, props: StorageInterfaceProps) {
    super(scope, id, props);
    this.imageUploadFunction = props.imageUploadFunction;
    this.initializeUserImageBucket();
  }
  public initializeUserImageBucket() {
    const bucket = new UserImageBucket(this, "UserImageBucket");
    bucket.userImageBucket.grantReadWrite(this.imageUploadFunction);
    new cdk.CfnOutput(this, "UserImageBucketName", {
      value: bucket.userImageBucket.bucketName,
    });
  }
}
