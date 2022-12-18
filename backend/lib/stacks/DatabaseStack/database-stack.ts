import { RelationshipsTable } from './Constructs/RelationshipsTable';
import { RetweetsTable } from './Constructs/RetweetsTable';
import { LikesTable } from './Constructs/LikesTable';
import { TweetsTable } from './Constructs/TweetsTable';
import { DataBaseStackProps } from './../../../Interfaces/database-interface';
import * as cdk from 'aws-cdk-lib';
import * as eventsources from 'aws-cdk-lib/aws-lambda-event-sources';
import { Construct } from 'constructs';
import { UsersTable } from './Constructs/UsersTable';
import { TimelinesTable } from './Constructs/TimelinesTable';

export class DataBaseStack extends cdk.Stack {
  public usersTable: UsersTable;
  public tweetsTable: TweetsTable;
  public timelinesTable: TimelinesTable;
  public likesTable: LikesTable;
  public retweetTable: RetweetsTable;
  public relationShipsTable: RelationshipsTable;
  public props: DataBaseStackProps;

  constructor(scope: Construct, id: string, props: DataBaseStackProps) {
    super(scope, id, props);
    this.props = props;
    this.initialize();
  }

  initialize() {
    this.initializeUserTableWithAccess();
    this.initializeTweetsTableWithAccess();
    this.initializeTimeLinesTableWithAccess();
    this.initializeLikesTableWithAccess();
    this.initializeRetweetTableWithAccess();
    this.initializeRelationshipsTableWithAccess();
  }

  initializeUserTableWithAccess() {
    this.usersTable = new UsersTable(this, 'UsersTable');
    this.usersTable.table.grantFullAccess(this.props.postConfirmationHook);
  }

  initializeTweetsTableWithAccess() {
    this.tweetsTable = new TweetsTable(this, 'TweetsTable');
    this.tweetsTable.table.grantFullAccess(
      this.props.distributeTweetWithFollowers
    );
    this.props.distributedTweet.addEventSource(
      new eventsources.DynamoEventSource(this.tweetsTable.table, {
        startingPosition: cdk.aws_lambda.StartingPosition.LATEST
      })
    );
  }

  initializeTimeLinesTableWithAccess() {
    this.timelinesTable = new TimelinesTable(this, 'TimelinesTable');
    this.timelinesTable.table.grantFullAccess(this.props.distributedTweet);
    this.timelinesTable.table.grantFullAccess(
      this.props.distributeTweetWithFollowers
    );
  }

  initializeLikesTableWithAccess() {
    this.likesTable = new LikesTable(this, 'LikesTable');
  }
  initializeRetweetTableWithAccess() {
    this.retweetTable = new RetweetsTable(this, 'RetweetsTable');
  }

  initializeRelationshipsTableWithAccess() {
    this.relationShipsTable = new RelationshipsTable(
      this,
      'RelationshipsTable'
    );
    this.relationShipsTable.table.grantFullAccess(this.props.distributedTweet);
    this.relationShipsTable.table.grantFullAccess(
      this.props.distributeTweetWithFollowers
    );
    this.props.distributeTweetWithFollowers.addEventSource(
      new eventsources.DynamoEventSource(this.relationShipsTable.table, {
        startingPosition: cdk.aws_lambda.StartingPosition.LATEST
      })
    );
  }
}
