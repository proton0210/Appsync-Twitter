import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class GetFollowers extends Construct {
  public api: appsync.GraphqlApi;
  public relationShipsTable: cdk.aws_dynamodb.Table;
  public usersTable: cdk.aws_dynamodb.Table;
  public resolver: appsync.Resolver;
  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    relationShipsTable: cdk.aws_dynamodb.Table,
    usersTable: cdk.aws_dynamodb.Table
  ) {
    super(scope, id);
    this.api = api;
    this.relationShipsTable = relationShipsTable;
    this.usersTable = usersTable;
    this.resolver = this.createGetFollowers();
  }
  public createGetFollowers() {
    // create a  apssync Function
    const getFollowersFunction = new appsync.AppsyncFunction(
      this,
      'GetFollowersFunction',
      {
        api: this.api,
        dataSource: this.api.addDynamoDbDataSource(
          'RelationShipsTableForGetfollowersPipeline',
          this.usersTable
        ),
        name: 'getFollowers',
        description: 'Get all followers of a user pipeline',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/GetFollowers/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/GetFollowers/response.vtl')
        )
      }
    );
    const hydrateFollowersFunction = new appsync.AppsyncFunction(
      this,
      'HydrateFollowersFunction',
      {
        api: this.api,
        dataSource: this.api.addDynamoDbDataSource(
          'UsersTableForGetfollowersPipeline',
          this.relationShipsTable
        ),
        name: 'hydrateFollowers',
        description: 'Get all followers of a user',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/GetFollowers/hydrateFollowers/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/GetFollowers/hydrateFollowers/response.vtl'
          )
        )
      }
    );

    return this.api.createResolver({
      typeName: 'Query',
      fieldName: 'getFollowers',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        path.join(__dirname, '../resolvers/query/SimplePipeline/request.vtl')
      ),
      pipelineConfig: [getFollowersFunction, hydrateFollowersFunction],
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        path.join(__dirname, '../resolvers/query/SimplePipeline/response.vtl')
      )
    });
  }
}
