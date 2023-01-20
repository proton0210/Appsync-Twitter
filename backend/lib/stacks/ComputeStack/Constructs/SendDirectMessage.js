"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendDirectMessage = void 0;
const constructs_1 = require("constructs");
const cdk = require("aws-cdk-lib");
const path = require("path");
class SendDirectMessage extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        // create iam policy for accessing appsync
        const appsyncPolicy = new cdk.aws_iam.PolicyStatement({
            effect: cdk.aws_iam.Effect.ALLOW,
            actions: ['appsync:GraphQL', 'dynamodb:*'],
            resources: ['*']
        });
        // Nodejs Construct
        const SendDirectMessage = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'SendDirectMessage', {
            entry: path.join(__dirname, '../Functions/SendDirectMessage/index.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            memorySize: 526,
            timeout: cdk.Duration.seconds(30),
            environment: {
                GRAPHQL_API_URL: 'https://hj4awsi6dfgbfmbpltrfcd42ra.appsync-api.us-east-1.amazonaws.com/graphql',
                CONVERSATIONS_TABLE: 'ConversationsTable',
                DIRECT_MESSAGES_TABLE: 'DirectMessagesTable'
            }
        });
        // add policy to lambda
        SendDirectMessage.addToRolePolicy(appsyncPolicy);
        this.SendDirectMessage = SendDirectMessage;
    }
}
exports.SendDirectMessage = SendDirectMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VuZERpcmVjdE1lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZW5kRGlyZWN0TWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBdUM7QUFDdkMsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QixNQUFhLGlCQUFrQixTQUFRLHNCQUFTO0lBRTlDLFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsMENBQTBDO1FBQzFDLE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7WUFDcEQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDaEMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDO1lBQzFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNqQixDQUFDLENBQUM7UUFFSCxtQkFBbUI7UUFDbkIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ2hFLElBQUksRUFDSixtQkFBbUIsRUFDbkI7WUFDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUseUNBQXlDLENBQUM7WUFDdEUsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDM0MsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxlQUFlLEVBQ2IsZ0ZBQWdGO2dCQUNsRixtQkFBbUIsRUFBRSxvQkFBb0I7Z0JBQ3pDLHFCQUFxQixFQUFFLHFCQUFxQjthQUM3QztTQUNGLENBQ0YsQ0FBQztRQUVGLHVCQUF1QjtRQUN2QixpQkFBaUIsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFakQsSUFBSSxDQUFDLGlCQUFpQixHQUFHLGlCQUFpQixDQUFDO0lBQzdDLENBQUM7Q0FDRjtBQXBDRCw4Q0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuZXhwb3J0IGNsYXNzIFNlbmREaXJlY3RNZXNzYWdlIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlYWRvbmx5IFNlbmREaXJlY3RNZXNzYWdlOiBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb247XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgLy8gY3JlYXRlIGlhbSBwb2xpY3kgZm9yIGFjY2Vzc2luZyBhcHBzeW5jXG4gICAgY29uc3QgYXBwc3luY1BvbGljeSA9IG5ldyBjZGsuYXdzX2lhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgZWZmZWN0OiBjZGsuYXdzX2lhbS5FZmZlY3QuQUxMT1csXG4gICAgICBhY3Rpb25zOiBbJ2FwcHN5bmM6R3JhcGhRTCcsICdkeW5hbW9kYjoqJ10sXG4gICAgICByZXNvdXJjZXM6IFsnKiddXG4gICAgfSk7XG5cbiAgICAvLyBOb2RlanMgQ29uc3RydWN0XG4gICAgY29uc3QgU2VuZERpcmVjdE1lc3NhZ2UgPSBuZXcgY2RrLmF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgICdTZW5kRGlyZWN0TWVzc2FnZScsXG4gICAgICB7XG4gICAgICAgIGVudHJ5OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vRnVuY3Rpb25zL1NlbmREaXJlY3RNZXNzYWdlL2luZGV4LmpzJyksXG4gICAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJyxcbiAgICAgICAgcnVudGltZTogY2RrLmF3c19sYW1iZGEuUnVudGltZS5OT0RFSlNfMTZfWCxcbiAgICAgICAgbWVtb3J5U2l6ZTogNTI2LFxuICAgICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMCksXG4gICAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgICAgR1JBUEhRTF9BUElfVVJMOlxuICAgICAgICAgICAgJ2h0dHBzOi8vaGo0YXdzaTZkZmdiZm1icGx0cmZjZDQycmEuYXBwc3luYy1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vZ3JhcGhxbCcsXG4gICAgICAgICAgQ09OVkVSU0FUSU9OU19UQUJMRTogJ0NvbnZlcnNhdGlvbnNUYWJsZScsXG4gICAgICAgICAgRElSRUNUX01FU1NBR0VTX1RBQkxFOiAnRGlyZWN0TWVzc2FnZXNUYWJsZSdcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBhZGQgcG9saWN5IHRvIGxhbWJkYVxuICAgIFNlbmREaXJlY3RNZXNzYWdlLmFkZFRvUm9sZVBvbGljeShhcHBzeW5jUG9saWN5KTtcblxuICAgIHRoaXMuU2VuZERpcmVjdE1lc3NhZ2UgPSBTZW5kRGlyZWN0TWVzc2FnZTtcbiAgfVxufVxuIl19