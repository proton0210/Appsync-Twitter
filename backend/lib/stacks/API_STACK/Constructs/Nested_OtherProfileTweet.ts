//Similar to My Profile

import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';
import { Construct } from 'constructs';

export class NestedOtherProfile extends Construct {
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
    this.resolver = this.createNestedOtherProfileResolver();
  }

  public createNestedOtherProfileResolver() {
    return this.api
      .addDynamoDbDataSource(
        'NestedOtherProfileTweetsDataSource',
        this.tweetsTable
      )
      .createResolver({
        typeName: 'OtherProfile',
        fieldName: 'tweets',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/OtherProfile/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/OtherProfile/response.vtl'
          )
        )
      });
  }
}
