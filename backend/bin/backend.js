"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const amplify_stack_1 = require("./../lib/stacks/AmplifyStack/amplify-stack");
const storage_stack_1 = require("./../lib/stacks/StorageStack/storage-stack");
const database_stack_1 = require("./../lib/stacks/DatabaseStack/database-stack");
const compute_stack_1 = require("./../lib/stacks/ComputeStack/compute-stack");
const user_pool_stack_1 = require("./../lib/stacks/CognitoStack/user-pool-stack");
const api_stack_1 = require("./../lib/stacks/API_STACK/api-stack");
// #!/usr/bin/env node
require("source-map-support/register");
const cdk = require("aws-cdk-lib");
/*
 * First We Deploy the User Pool Stack to get the User Pool Id for Api Stack
 * Order Matters
 * User Pool for handling Signups and Logins and users
 * User Pool Client for Web ,Mobile Clients
 */
const app = new cdk.App();
const computeStack = new compute_stack_1.ComputeStack(app, 'ComputeStack');
const userPoolStack = new user_pool_stack_1.UserPoolStack(app, 'UserPoolStack', {
    postConfirmationHook: computeStack.postConfirmationHook
});
const dataBaseStack = new database_stack_1.DataBaseStack(app, 'DataBaseStack', {
    postConfirmationHook: computeStack.postConfirmationHook,
    distributedTweet: computeStack.distributedTweet,
    distributeTweetWithFollowers: computeStack.distributeTweetToFollowers
});
const apiStack = new api_stack_1.ApiStack(app, 'ApiStack', {
    userPool: userPoolStack.userPool,
    usersTable: dataBaseStack.usersTable.table,
    tweetsTable: dataBaseStack.tweetsTable.table,
    timelinesTable: dataBaseStack.timelinesTable.table,
    likesTable: dataBaseStack.likesTable.table,
    retweetsTable: dataBaseStack.retweetTable.table,
    relationshipsTable: dataBaseStack.relationShipsTable.table
});
const storageStack = new storage_stack_1.StorageStack(app, 'StorageStack', {
    imageUploadFunction: apiStack.imageUploadFunction
});
const frontEndStack = new amplify_stack_1.AmplifyStack(app, 'AmplifyStack');
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmFja2VuZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImJhY2tlbmQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSw4RUFBMEU7QUFDMUUsOEVBQTBFO0FBQzFFLGlGQUE2RTtBQUM3RSw4RUFBMEU7QUFDMUUsa0ZBQTZFO0FBQzdFLG1FQUErRDtBQUMvRCxzQkFBc0I7QUFFdEIsdUNBQXFDO0FBQ3JDLG1DQUFtQztBQUVuQzs7Ozs7R0FLRztBQUNILE1BQU0sR0FBRyxHQUFHLElBQUksR0FBRyxDQUFDLEdBQUcsRUFBRSxDQUFDO0FBQzFCLE1BQU0sWUFBWSxHQUFHLElBQUksNEJBQVksQ0FBQyxHQUFHLEVBQUUsY0FBYyxDQUFDLENBQUM7QUFDM0QsTUFBTSxhQUFhLEdBQUcsSUFBSSwrQkFBYSxDQUFDLEdBQUcsRUFBRSxlQUFlLEVBQUU7SUFDNUQsb0JBQW9CLEVBQUUsWUFBWSxDQUFDLG9CQUFvQjtDQUN4RCxDQUFDLENBQUM7QUFFSCxNQUFNLGFBQWEsR0FBRyxJQUFJLDhCQUFhLENBQUMsR0FBRyxFQUFFLGVBQWUsRUFBRTtJQUM1RCxvQkFBb0IsRUFBRSxZQUFZLENBQUMsb0JBQW9CO0lBQ3ZELGdCQUFnQixFQUFFLFlBQVksQ0FBQyxnQkFBZ0I7SUFDL0MsNEJBQTRCLEVBQUUsWUFBWSxDQUFDLDBCQUEwQjtDQUN0RSxDQUFDLENBQUM7QUFFSCxNQUFNLFFBQVEsR0FBRyxJQUFJLG9CQUFRLENBQUMsR0FBRyxFQUFFLFVBQVUsRUFBRTtJQUM3QyxRQUFRLEVBQUUsYUFBYSxDQUFDLFFBQVE7SUFDaEMsVUFBVSxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSztJQUMxQyxXQUFXLEVBQUUsYUFBYSxDQUFDLFdBQVcsQ0FBQyxLQUFLO0lBQzVDLGNBQWMsRUFBRSxhQUFhLENBQUMsY0FBYyxDQUFDLEtBQUs7SUFDbEQsVUFBVSxFQUFFLGFBQWEsQ0FBQyxVQUFVLENBQUMsS0FBSztJQUMxQyxhQUFhLEVBQUUsYUFBYSxDQUFDLFlBQVksQ0FBQyxLQUFLO0lBQy9DLGtCQUFrQixFQUFFLGFBQWEsQ0FBQyxrQkFBa0IsQ0FBQyxLQUFLO0NBQzNELENBQUMsQ0FBQztBQUVILE1BQU0sWUFBWSxHQUFHLElBQUksNEJBQVksQ0FBQyxHQUFHLEVBQUUsY0FBYyxFQUFFO0lBQ3pELG1CQUFtQixFQUFFLFFBQVEsQ0FBQyxtQkFBbUI7Q0FDbEQsQ0FBQyxDQUFDO0FBQ0gsTUFBTSxhQUFhLEdBQUcsSUFBSSw0QkFBWSxDQUFDLEdBQUcsRUFBRSxjQUFjLENBQUMsQ0FBQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IEFtcGxpZnlTdGFjayB9IGZyb20gJy4vLi4vbGliL3N0YWNrcy9BbXBsaWZ5U3RhY2svYW1wbGlmeS1zdGFjayc7XG5pbXBvcnQgeyBTdG9yYWdlU3RhY2sgfSBmcm9tICcuLy4uL2xpYi9zdGFja3MvU3RvcmFnZVN0YWNrL3N0b3JhZ2Utc3RhY2snO1xuaW1wb3J0IHsgRGF0YUJhc2VTdGFjayB9IGZyb20gJy4vLi4vbGliL3N0YWNrcy9EYXRhYmFzZVN0YWNrL2RhdGFiYXNlLXN0YWNrJztcbmltcG9ydCB7IENvbXB1dGVTdGFjayB9IGZyb20gJy4vLi4vbGliL3N0YWNrcy9Db21wdXRlU3RhY2svY29tcHV0ZS1zdGFjayc7XG5pbXBvcnQgeyBVc2VyUG9vbFN0YWNrIH0gZnJvbSAnLi8uLi9saWIvc3RhY2tzL0NvZ25pdG9TdGFjay91c2VyLXBvb2wtc3RhY2snO1xuaW1wb3J0IHsgQXBpU3RhY2sgfSBmcm9tICcuLy4uL2xpYi9zdGFja3MvQVBJX1NUQUNLL2FwaS1zdGFjayc7XG4vLyAjIS91c3IvYmluL2VudiBub2RlXG5cbmltcG9ydCAnc291cmNlLW1hcC1zdXBwb3J0L3JlZ2lzdGVyJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5cbi8qXG4gKiBGaXJzdCBXZSBEZXBsb3kgdGhlIFVzZXIgUG9vbCBTdGFjayB0byBnZXQgdGhlIFVzZXIgUG9vbCBJZCBmb3IgQXBpIFN0YWNrXG4gKiBPcmRlciBNYXR0ZXJzXG4gKiBVc2VyIFBvb2wgZm9yIGhhbmRsaW5nIFNpZ251cHMgYW5kIExvZ2lucyBhbmQgdXNlcnNcbiAqIFVzZXIgUG9vbCBDbGllbnQgZm9yIFdlYiAsTW9iaWxlIENsaWVudHNcbiAqL1xuY29uc3QgYXBwID0gbmV3IGNkay5BcHAoKTtcbmNvbnN0IGNvbXB1dGVTdGFjayA9IG5ldyBDb21wdXRlU3RhY2soYXBwLCAnQ29tcHV0ZVN0YWNrJyk7XG5jb25zdCB1c2VyUG9vbFN0YWNrID0gbmV3IFVzZXJQb29sU3RhY2soYXBwLCAnVXNlclBvb2xTdGFjaycsIHtcbiAgcG9zdENvbmZpcm1hdGlvbkhvb2s6IGNvbXB1dGVTdGFjay5wb3N0Q29uZmlybWF0aW9uSG9va1xufSk7XG5cbmNvbnN0IGRhdGFCYXNlU3RhY2sgPSBuZXcgRGF0YUJhc2VTdGFjayhhcHAsICdEYXRhQmFzZVN0YWNrJywge1xuICBwb3N0Q29uZmlybWF0aW9uSG9vazogY29tcHV0ZVN0YWNrLnBvc3RDb25maXJtYXRpb25Ib29rLFxuICBkaXN0cmlidXRlZFR3ZWV0OiBjb21wdXRlU3RhY2suZGlzdHJpYnV0ZWRUd2VldCxcbiAgZGlzdHJpYnV0ZVR3ZWV0V2l0aEZvbGxvd2VyczogY29tcHV0ZVN0YWNrLmRpc3RyaWJ1dGVUd2VldFRvRm9sbG93ZXJzXG59KTtcblxuY29uc3QgYXBpU3RhY2sgPSBuZXcgQXBpU3RhY2soYXBwLCAnQXBpU3RhY2snLCB7XG4gIHVzZXJQb29sOiB1c2VyUG9vbFN0YWNrLnVzZXJQb29sLFxuICB1c2Vyc1RhYmxlOiBkYXRhQmFzZVN0YWNrLnVzZXJzVGFibGUudGFibGUsXG4gIHR3ZWV0c1RhYmxlOiBkYXRhQmFzZVN0YWNrLnR3ZWV0c1RhYmxlLnRhYmxlLFxuICB0aW1lbGluZXNUYWJsZTogZGF0YUJhc2VTdGFjay50aW1lbGluZXNUYWJsZS50YWJsZSxcbiAgbGlrZXNUYWJsZTogZGF0YUJhc2VTdGFjay5saWtlc1RhYmxlLnRhYmxlLFxuICByZXR3ZWV0c1RhYmxlOiBkYXRhQmFzZVN0YWNrLnJldHdlZXRUYWJsZS50YWJsZSxcbiAgcmVsYXRpb25zaGlwc1RhYmxlOiBkYXRhQmFzZVN0YWNrLnJlbGF0aW9uU2hpcHNUYWJsZS50YWJsZVxufSk7XG5cbmNvbnN0IHN0b3JhZ2VTdGFjayA9IG5ldyBTdG9yYWdlU3RhY2soYXBwLCAnU3RvcmFnZVN0YWNrJywge1xuICBpbWFnZVVwbG9hZEZ1bmN0aW9uOiBhcGlTdGFjay5pbWFnZVVwbG9hZEZ1bmN0aW9uXG59KTtcbmNvbnN0IGZyb250RW5kU3RhY2sgPSBuZXcgQW1wbGlmeVN0YWNrKGFwcCwgJ0FtcGxpZnlTdGFjaycpO1xuIl19