import * as cdk from "aws-cdk-lib";
import { Construct } from "constructs";
import { UsersTable } from "./Constructs/UsersTable";

export class DataBaseStack extends cdk.Stack {
  public usersTable: UsersTable;

  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);
    this.initialize();
  }

  initialize() {
    const usersTable = new UsersTable(this, "UsersTable");
  }
}
