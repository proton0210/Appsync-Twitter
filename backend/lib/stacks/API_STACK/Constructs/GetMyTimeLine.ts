import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';

export class GetMyTimeLine extends Construct {
  public api: appsync.GraphqlApi;
  public timeLineTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;
  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    timeLineTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.timeLineTable = timeLineTable;
    this.resolver = this.createGetMyTimeLineResolver();
  }

  public createGetMyTimeLineResolver() {
    return this.api
      .addDynamoDbDataSource(
        'GetMyTimeLineTableQueryResolver',
        this.timeLineTable
      )
      .createResolver({
        typeName: 'Query',
        fieldName: 'getMyTimeline',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/getMyTimeLine/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/getMyTimeLine/response.vtl')
        )
      });
  }
}
