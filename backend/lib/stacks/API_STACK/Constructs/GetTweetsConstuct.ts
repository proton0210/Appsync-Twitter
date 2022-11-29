import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class GetTweetsResolver extends Construct {
  public api: appsync.GraphqlApi;
  public tweetsTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;
  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    tweetsTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.tweetsTable = tweetsTable;
    this.resolver = this.createGetTweetsResolver();
  }
  public createGetTweetsResolver() {
    return this.api
      .addDynamoDbDataSource('tweetsTableGetTweetsQuery', this.tweetsTable)
      .createResolver({
        typeName: 'Query',
        fieldName: 'getTweets',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/getTweets/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/getTweets/response.vtl')
        )
      });
  }
}
