import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class Follow extends Construct {
  public api: appsync.GraphqlApi;
  public relationShipsTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;
  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    relationShipsTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.relationShipsTable = relationShipsTable;
    this.resolver = this.createFollow();
  }
  public createFollow() {
    return this.api
      .addDynamoDbDataSource('FollowMutation', this.relationShipsTable)
      .createResolver({
        typeName: 'Mutation',
        fieldName: 'follow',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/mutations/Follow/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/mutations/Follow/response.vtl')
        )
      });
  }
}
