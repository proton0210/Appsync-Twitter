import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class Unlike extends Construct {
  public api: appsync.GraphqlApi;
  public likesTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;
  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    likesTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.likesTable = likesTable;
    this.resolver = this.unlike();
  }
  public unlike() {
    // first arg should always be different!
    return this.api
      .addDynamoDbDataSource('likesTableforUnlikeResolver', this.likesTable)
      .createResolver({
        typeName: 'Mutation',
        fieldName: 'unlike',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/mutations/Unlike/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/mutations/Unlike/response.vtl')
        )
      });
  }
}
