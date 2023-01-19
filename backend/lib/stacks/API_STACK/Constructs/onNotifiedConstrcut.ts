import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import { Construct } from 'constructs';
import * as path from 'path';
export class OnNotified extends Construct {
  public api: appsync.GraphqlApi;
  public resolver: appsync.Resolver;
  constructor(scope: Construct, id: string, api: appsync.GraphqlApi) {
    super(scope, id);
    this.api = api;
    this.resolver = this.OnNotified();
  }
  public OnNotified() {
    // create a appsync resolver

    return this.api.addNoneDataSource('onNotified').createResolver({
      typeName: 'Subscription',
      fieldName: 'onNotified',
      requestMappingTemplate: appsync.MappingTemplate.fromFile(
        path.join(__dirname, '../resolvers/subscription/onNotified/request.vtl')
      ),
      responseMappingTemplate: appsync.MappingTemplate.fromFile(
        path.join(
          __dirname,
          '../resolvers/subscription/onNotified/response.vtl'
        )
      )
    });
  }
}
