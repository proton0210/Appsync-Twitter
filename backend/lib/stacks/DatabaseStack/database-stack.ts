import { RetweetsTable } from './Constructs/RetweetsTable';
import { LikesTable } from './Constructs/LikesTable';
import { TweetsTable } from './Constructs/TweetsTable';
import { DataBaseStackProps } from './../../../Interfaces/database-interface';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import { UsersTable } from './Constructs/UsersTable';
import { TimelinesTable } from './Constructs/TimelinesTable';

export class DataBaseStack extends cdk.Stack {
  public usersTable: UsersTable;
  public tweetsTable: TweetsTable;
  public timelinesTable: TimelinesTable;
  public likesTable: LikesTable;
  public retweetTable: RetweetsTable;
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
  }

  initializeUserTableWithAccess() {
    this.usersTable = new UsersTable(this, 'UsersTable');
    this.usersTable.table.grantFullAccess(this.props.postConfirmationHook);
  }

  initializeTweetsTableWithAccess() {
    this.tweetsTable = new TweetsTable(this, 'TweetsTable');
  }

  initializeTimeLinesTableWithAccess() {
    this.timelinesTable = new TimelinesTable(this, 'TimelinesTable');
  }

  initializeLikesTableWithAccess() {
    this.likesTable = new LikesTable(this, 'LikesTable');
  }
  initializeRetweetTableWithAccess() {
    this.retweetTable = new RetweetsTable(this, 'RetweetsTable');
  }
}
