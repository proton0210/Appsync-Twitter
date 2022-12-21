import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class GetFollowing extends Construct {
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
    this.resolver = this.createGetFollowing();
  }
  public createGetFollowing() {
    // create a  appsync Function
    const GetFollowingFunction = new appsync.AppsyncFunction(
      this,
      'GetFollowingFunction',
      {
        api: this.api,
        dataSource: this.api.addDynamoDbDataSource(
          'RelationShipsTableForGetFollowingPipeline',
          this.relationShipsTable
        ),
        name: 'GetFollowing',
        description: 'Get all followers of a user pipeline',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/GetFollowing/request.vtl')
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(__dirname, '../resolvers/query/GetFollowing/response.vtl')
        )
      }
    );
    const hydrateFollowersFunction = new appsync.AppsyncFunction(
      this,
      'HydrateFollowersFunction',
      {
        api: this.api,
        dataSource: this.api.addDynamoDbDataSource(
          'UsersTableForGetFollowingPipeline',
          this.usersTable
        ),
        name: 'hydrateFollowers',
        description: 'Get all followers of a user',
        requestMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/GetFollowing/hydrateFollowing/request.vtl'
          )
        ),
        responseMappingTemplate: appsync.MappingTemplate.fromFile(
          path.join(
            __dirname,
            '../resolvers/query/GetFollowing/hydrateFollowing/response.vtl'
          )
        )
      }
    );

    return this.api.createResolver({
      typeName: 'Query',
      fieldName: 'getFollowing',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        path.join(__dirname, '../resolvers/query/SimplePipeline/request.vtl')
      ),
      pipelineConfig: [GetFollowingFunction, hydrateFollowersFunction],
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        path.join(__dirname, '../resolvers/query/SimplePipeline/response.vtl')
      )
    });
  }
}
