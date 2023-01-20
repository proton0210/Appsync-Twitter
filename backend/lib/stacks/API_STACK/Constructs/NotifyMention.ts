import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class NotifyMention extends Construct {
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
    this.resolver = this.NotifyMention();
  }
  public NotifyMention() {
    // first arg should always be different!
    return this.api
      .addDynamoDbDataSource(
        'MentionsNotificationsTable',
        this.notificationsTable
      )
      .createResolver({
        typeName: 'Mutation',
        fieldName: 'notifyMentioned',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/mutations/NotifyMention/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/mutations/NotifyMention/response.vtl'
          )
        )
      });
  }
}
