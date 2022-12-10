import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';
import { Construct } from 'constructs';

export class NestedMyProfile extends Construct {
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
    this.resolver = this.createNestedMyProfileResolver();
  }

  public createNestedMyProfileResolver() {
    return this.api
      .addDynamoDbDataSource(
        'NestedMyProfileTweetsDataSource',
        this.tweetsTable
      )
      .createResolver({
        typeName: 'MyProfile',
        fieldName: 'tweets',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/MyProfile/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/Nested/MyProfile/response.vtl'
          )
        )
      });
  }
}
