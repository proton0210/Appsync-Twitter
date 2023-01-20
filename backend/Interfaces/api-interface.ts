import * as cdk from 'aws-cdk-lib';

export interface ApiStackProps extends cdk.StackProps {
  userPool: cdk.aws_cognito.UserPool;
  usersTable: cdk.aws_dynamodb.Table;
  tweetsTable: cdk.aws_dynamodb.Table;
  timelinesTable: cdk.aws_dynamodb.Table;
  likesTable: cdk.aws_dynamodb.Table;
  retweetsTable: cdk.aws_dynamodb.Table;
  relationshipsTable: cdk.aws_dynamodb.Table;
  notificationsTable: cdk.aws_dynamodb.Table;
  conversationsTable: cdk.aws_dynamodb.Table;
  directMessagesTable: cdk.aws_dynamodb.Table;
}
