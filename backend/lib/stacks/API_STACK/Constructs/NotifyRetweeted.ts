import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class NotifyRetweeted extends Construct {
  public api: appsync.GraphqlApi;
  public notificationsTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;
  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    notificationsTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.notificationsTable = notificationsTable;
    this.resolver = this.NotifyRetweeted();
  }
  public NotifyRetweeted() {
    // first arg should always be different!
    return this.api
      .addDynamoDbDataSource('NotificationsTable', this.notificationsTable)
      .createResolver({
        typeName: 'Mutation',
        fieldName: 'notifyRetweeted',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/mutations/NotifyRetweeted/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/mutations/NotifyRetweeted/response.vtl'
          )
        )
      });
  }
}
