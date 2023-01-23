import { Construct } from 'constructs';
import * as cdk from 'aws-cdk-lib';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
export class SendDirectMessageMutation extends Construct {
  public readonly SendDirectMessageMutationFunctionDataSource: cdk.aws_lambda_nodejs.NodejsFunction;
  public api: appsync.GraphqlApi;
  public resolver: appsync.Resolver;
  constructor(
    scope: Construct,
    id: string,
    api: appsync.GraphqlApi,
    SendDirectMessageMutationFunctionDataSource: cdk.aws_lambda_nodejs.NodejsFunction
  ) {
    super(scope, id);
    this.api = api;
    this.SendDirectMessageMutationFunctionDataSource =
      SendDirectMessageMutationFunctionDataSource;
    this.resolver = this.SendDirectMessageMutation();
  }
  public SendDirectMessageMutation() {
    return new appsync.Resolver(this, 'SendDirectMessageResolver', {
      api: this.api,
      typeName: 'Mutation',
      fieldName: 'sendDirectMessage',
      dataSource: this.api.addLambdaDataSource(
        'SendDirectMessage',
        this.SendDirectMessageMutationFunctionDataSource
      )
    });
  }
}
