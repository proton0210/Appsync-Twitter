"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncUsersToAlgolia = void 0;
const constructs_1 = require("constructs");
const cdk = require("aws-cdk-lib");
const path = require("path");
class SyncUsersToAlgolia extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        // allow ssm policy
        const ssmPolicy = new cdk.aws_iam.PolicyStatement({
            effect: cdk.aws_iam.Effect.ALLOW,
            actions: ['ssm:*'],
            resources: ['*']
        });
        // Nodejs Construct
        const SyncUsersToAlgolia = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'SyncUsersToAlgolia', {
            entry: path.join(__dirname, '../Functions/SyncUsersToAlgolia/index.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            memorySize: 526,
            timeout: cdk.Duration.seconds(30)
        });
        // add policy to lambda
        SyncUsersToAlgolia.addToRolePolicy(ssmPolicy);
        this.SyncUsersToAlgolia = SyncUsersToAlgolia;
    }
}
exports.SyncUsersToAlgolia = SyncUsersToAlgolia;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3luY1VzZXJzVG9BbGdvbGlhLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU3luY1VzZXJzVG9BbGdvbGlhLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsNkJBQTZCO0FBQzdCLE1BQWEsa0JBQW1CLFNBQVEsc0JBQVM7SUFFL0MsWUFBWSxLQUFnQixFQUFFLEVBQVU7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixtQkFBbUI7UUFDbkIsTUFBTSxTQUFTLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztZQUNoRCxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSztZQUNoQyxPQUFPLEVBQUUsQ0FBQyxPQUFPLENBQUM7WUFDbEIsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ2pCLENBQUMsQ0FBQztRQUVILG1CQUFtQjtRQUNuQixNQUFNLGtCQUFrQixHQUFHLElBQUksR0FBRyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FDakUsSUFBSSxFQUNKLG9CQUFvQixFQUNwQjtZQUNFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSwwQ0FBMEMsQ0FBQztZQUN2RSxPQUFPLEVBQUUsU0FBUztZQUNsQixPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVztZQUMzQyxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDbEMsQ0FDRixDQUFDO1FBRUYsdUJBQXVCO1FBQ3ZCLGtCQUFrQixDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUU5QyxJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7SUFDL0MsQ0FBQztDQUNGO0FBOUJELGdEQThCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5leHBvcnQgY2xhc3MgU3luY1VzZXJzVG9BbGdvbGlhIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlYWRvbmx5IFN5bmNVc2Vyc1RvQWxnb2xpYTogY2RrLmF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uO1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIC8vIGFsbG93IHNzbSBwb2xpY3lcbiAgICBjb25zdCBzc21Qb2xpY3kgPSBuZXcgY2RrLmF3c19pYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGVmZmVjdDogY2RrLmF3c19pYW0uRWZmZWN0LkFMTE9XLFxuICAgICAgYWN0aW9uczogWydzc206KiddLFxuICAgICAgcmVzb3VyY2VzOiBbJyonXVxuICAgIH0pO1xuXG4gICAgLy8gTm9kZWpzIENvbnN0cnVjdFxuICAgIGNvbnN0IFN5bmNVc2Vyc1RvQWxnb2xpYSA9IG5ldyBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb24oXG4gICAgICB0aGlzLFxuICAgICAgJ1N5bmNVc2Vyc1RvQWxnb2xpYScsXG4gICAgICB7XG4gICAgICAgIGVudHJ5OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vRnVuY3Rpb25zL1N5bmNVc2Vyc1RvQWxnb2xpYS9pbmRleC5qcycpLFxuICAgICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXG4gICAgICAgIHJ1bnRpbWU6IGNkay5hd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICAgIG1lbW9yeVNpemU6IDUyNixcbiAgICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMzApXG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIGFkZCBwb2xpY3kgdG8gbGFtYmRhXG4gICAgU3luY1VzZXJzVG9BbGdvbGlhLmFkZFRvUm9sZVBvbGljeShzc21Qb2xpY3kpO1xuXG4gICAgdGhpcy5TeW5jVXNlcnNUb0FsZ29saWEgPSBTeW5jVXNlcnNUb0FsZ29saWE7XG4gIH1cbn1cbiJdfQ==