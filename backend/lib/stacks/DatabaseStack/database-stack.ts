import { DataBaseStackProps } from "./../../../Interfaces/database-interface";
import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { UsersTable } from "./Constructs/UsersTable";

export class DataBaseStack extends cdk.Stack {
  public usersTable: UsersTable;
  public props: DataBaseStackProps;

  constructor(scope: Construct, id: string, props: DataBaseStackProps) {
    super(scope, id, props);
    this.props = props;
    this.initialize();
  }

  initialize() {
    this.initializeUserTableWithAccess();
  }

  initializeUserTableWithAccess() {
    this.usersTable = new UsersTable(this, "UsersTable");
    this.usersTable.table.grantFullAccess(this.props.postConfirmationHook);
  }
}
