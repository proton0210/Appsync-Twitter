import { NotificationTable } from './Constructs/NotificationsTable';
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
import { ConversationsTable } from './Constructs/ConversationTable';
import { DirectMessagesTable } from './Constructs/DirectMessagesTable';

export class DataBaseStack extends cdk.Stack {
  public usersTable: UsersTable;
  public tweetsTable: TweetsTable;
  public timelinesTable: TimelinesTable;
  public likesTable: LikesTable;
  public retweetTable: RetweetsTable;
  public relationShipsTable: RelationshipsTable;
  public notificationsTable: NotificationTable;
  public conversationsTable: ConversationsTable;
  public directMessagesTable: DirectMessagesTable;
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
    this.initializeNotificationTableWithAccess();
    this.initializeConversationsTableWithAccess();
    this.initializeDirectMessagesTableWithAccess();
  }

  initializeUserTableWithAccess() {
    this.usersTable = new UsersTable(this, 'UsersTable');
    this.usersTable.table.grantFullAccess(this.props.postConfirmationHook);
    this.props.syncUserstoAlgolia.addEventSource(
      new eventsources.DynamoEventSource(this.usersTable.table, {
        startingPosition: cdk.aws_lambda.StartingPosition.LATEST
      })
    );
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

    this.props.syncTweetsToAlgolia.addEventSource(
      new eventsources.DynamoEventSource(this.tweetsTable.table, {
        startingPosition: cdk.aws_lambda.StartingPosition.LATEST
      })
    );

    this.props.Notify.addEventSource(
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
    // add event source
    this.props.NotifyLiked.addEventSource(
      new eventsources.DynamoEventSource(this.likesTable.table, {
        startingPosition: cdk.aws_lambda.StartingPosition.LATEST
      })
    );
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

  initializeNotificationTableWithAccess() {
    this.notificationsTable = new NotificationTable(this, 'NotificationTable');
  }

  initializeConversationsTableWithAccess() {
    this.conversationsTable = new ConversationsTable(this, 'ConversationTable');
  }

  initializeDirectMessagesTableWithAccess() {
    this.directMessagesTable = new DirectMessagesTable(
      this,
      'DirectMessagesTable'
    );
  }
}
