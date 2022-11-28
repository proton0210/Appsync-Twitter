import * as cdk from "aws-cdk-lib";

export interface StorageInterfaceProps extends cdk.StackProps {
    imageUploadFunction: cdk.aws_lambda_nodejs.NodejsFunction;
}