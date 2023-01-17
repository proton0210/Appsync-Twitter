import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';

import * as path from 'path';
export class Hashtag extends Construct {
  public readonly Hashtag: cdk.aws_lambda_nodejs.NodejsFunction;
  public api: appsync.GraphqlApi;
  public resolver: appsync.Resolver;
  constructor(scope: Construct, id: string, api: appsync.GraphqlApi) {
    super(scope, id);
    this.api = api;
    const ssmPolicy = new cdk.aws_iam.PolicyStatement({
      effect: cdk.aws_iam.Effect.ALLOW,
      actions: ['ssm:*'],
      resources: ['*']
    });

    // Nodejs Construct
    const Hashtag = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'Hashtag', {
      entry: path.join(__dirname, '../resolvers/query/Hashtag/index.js'),
      handler: 'handler',
      runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
      memorySize: 128,
      timeout: cdk.Duration.seconds(30)
    });

    // add policy to lambda
    Hashtag.addToRolePolicy(ssmPolicy);

    this.Hashtag = Hashtag;

    const HashtagResolver = () => {
      return new appsync.Resolver(this, 'HashtagResolver', {
        api: this.api,
        typeName: 'Query',
        fieldName: 'getHashTag',
        dataSource: this.api.addLambdaDataSource('HashtagLambda', Hashtag)
      });
    };

    this.resolver = HashtagResolver();
  }
}
