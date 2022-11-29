import { TweetsTable } from './Constructs/TweetsTable';
import { DataBaseStackProps } from "./../../../Interfaces/database-interface";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { UsersTable } from "./Constructs/UsersTable";
import { TimelinesTable } from './Constructs/TimelinesTable';

export class DataBaseStack extends cdk.Stack {
  public usersTable: UsersTable;
  public tweetsTable: TweetsTable;
  public timelinesTable: TimelinesTable;
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
  }

  initializeUserTableWithAccess() {
    this.usersTable = new UsersTable(this, "UsersTable");
    this.usersTable.table.grantFullAccess(this.props.postConfirmationHook);
  }

  initializeTweetsTableWithAccess() {
    this.tweetsTable = new TweetsTable(this, "TweetsTable");
  }

  initializeTimeLinesTableWithAccess() {
    this.timelinesTable = new TimelinesTable(this, "TimelinesTable");
  }
}
