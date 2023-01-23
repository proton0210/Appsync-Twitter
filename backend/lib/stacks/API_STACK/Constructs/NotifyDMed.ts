import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class NotifyDMed extends Construct {
  public api: appsync.GraphqlApi;
  public notificationTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;
  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    notificationTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.notificationTable = notificationTable;
    this.resolver = this.NotifyDMed();
  }
  public NotifyDMed() {
    // first arg should always be different!
    return this.api
      .addDynamoDbDataSource('notificationTableDMed', this.notificationTable)
      .createResolver({
        typeName: 'Mutation',
        fieldName: 'notifyDMed',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/mutations/NotifyDMed/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/mutations/NotifyDMed/response.vtl')
        )
      });
  }
}
