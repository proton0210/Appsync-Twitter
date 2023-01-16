import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';

import * as path from 'path';
export class Search extends Construct {
  public readonly Search: cdk.aws_lambda_nodejs.NodejsFunction;
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
    const Search = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'Search', {
      entry: path.join(__dirname, '../resolvers/query/Search/index.js'),
      handler: 'handler',
      runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
      memorySize: 128,
      timeout: cdk.Duration.seconds(30)
    });

    // add policy to lambda
    Search.addToRolePolicy(ssmPolicy);

    this.Search = Search;

    const SearchResolver = () => {
      return new appsync.Resolver(this, 'SearchResolver', {
        api: this.api,
        typeName: 'Query',
        fieldName: 'search',
        dataSource: this.api.addLambdaDataSource('SearchLambda', Search)
      });
    };

    this.resolver = SearchResolver();
  }
}
