import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class NotifyLiked extends Construct {
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
    this.resolver = this.NotifyLiked();
  }
  public NotifyLiked() {
    // first arg should always be different!
    return this.api
      .addDynamoDbDataSource(
        'notificationTableLikes',
        this.notificationTable
      )
      .createResolver({
        typeName: 'Mutation',
        fieldName: 'notifyLiked',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/mutations/NotifyLiked/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/mutations/NotifyLiked/response.vtl'
          )
        )
      });
  }
}
