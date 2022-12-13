import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';
import { Construct } from 'constructs';

export class NestedReplyRetweeted extends Construct {
  public api: appsync.GraphqlApi;
  public retweetsTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;

  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    retweetsTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.retweetsTable = retweetsTable;
    this.resolver = this.createNestedReplyRetweetedResolver();
  }

  public createNestedReplyRetweetedResolver() {
    // we can use the same resolvers as NestedTweetRetweeted
    return this.api
      .addDynamoDbDataSource(
        'NestedReplyRetweetedDataSource',
        this.retweetsTable
      )
      .createResolver({
        typeName: 'Reply',
        fieldName: 'retweeted',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/Retweeted/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/Retweeted/response.vtl'
          )
        )
      });
  }
}
