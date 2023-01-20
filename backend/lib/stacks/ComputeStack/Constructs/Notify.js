"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Notify = void 0;
const constructs_1 = require("constructs");
const cdk = require("aws-cdk-lib");
const path = require("path");
class Notify extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        // create iam policy for accesing appsync
        const appsyncPolicy = new cdk.aws_iam.PolicyStatement({
            effect: cdk.aws_iam.Effect.ALLOW,
            actions: ['appsync:GraphQL', 'dynamodb:*'],
            resources: ['*']
        });
        // Nodejs Construct
        const Notify = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'Notify', {
            entry: path.join(__dirname, '../Functions/Notify/index.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            memorySize: 526,
            timeout: cdk.Duration.seconds(30),
            environment: {
                GRAPHQL_API_URL: 'https://hj4awsi6dfgbfmbpltrfcd42ra.appsync-api.us-east-1.amazonaws.com/graphql',
                TWEETS_TABLE: 'TweetsTable'
            }
        });
        // add policy to lambda
        Notify.addToRolePolicy(appsyncPolicy);
        this.Notify = Notify;
    }
}
exports.Notify = Notify;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTm90aWZ5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsNkJBQTZCO0FBQzdCLE1BQWEsTUFBTyxTQUFRLHNCQUFTO0lBRW5DLFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIseUNBQXlDO1FBQ3pDLE1BQU0sYUFBYSxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7WUFDcEQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDaEMsT0FBTyxFQUFFLENBQUMsaUJBQWlCLEVBQUUsWUFBWSxDQUFDO1lBQzFDLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNqQixDQUFDLENBQUM7UUFFSCxtQkFBbUI7UUFDbkIsTUFBTSxNQUFNLEdBQUcsSUFBSSxHQUFHLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxRQUFRLEVBQUU7WUFDdEUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDhCQUE4QixDQUFDO1lBQzNELE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQzNDLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsZUFBZSxFQUNiLGdGQUFnRjtnQkFDbEYsWUFBWSxFQUFFLGFBQWE7YUFDNUI7U0FDRixDQUFDLENBQUM7UUFFSCx1QkFBdUI7UUFDdkIsTUFBTSxDQUFDLGVBQWUsQ0FBQyxhQUFhLENBQUMsQ0FBQztRQUV0QyxJQUFJLENBQUMsTUFBTSxHQUFHLE1BQU0sQ0FBQztJQUN2QixDQUFDO0NBQ0Y7QUEvQkQsd0JBK0JDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBjbGFzcyBOb3RpZnkgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgTm90aWZ5OiBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb247XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgLy8gY3JlYXRlIGlhbSBwb2xpY3kgZm9yIGFjY2VzaW5nIGFwcHN5bmNcbiAgICBjb25zdCBhcHBzeW5jUG9saWN5ID0gbmV3IGNkay5hd3NfaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBlZmZlY3Q6IGNkay5hd3NfaWFtLkVmZmVjdC5BTExPVyxcbiAgICAgIGFjdGlvbnM6IFsnYXBwc3luYzpHcmFwaFFMJywgJ2R5bmFtb2RiOionXSxcbiAgICAgIHJlc291cmNlczogWycqJ11cbiAgICB9KTtcblxuICAgIC8vIE5vZGVqcyBDb25zdHJ1Y3RcbiAgICBjb25zdCBOb3RpZnkgPSBuZXcgY2RrLmF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uKHRoaXMsICdOb3RpZnknLCB7XG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL0Z1bmN0aW9ucy9Ob3RpZnkvaW5kZXguanMnKSxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJyxcbiAgICAgIHJ1bnRpbWU6IGNkay5hd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICBtZW1vcnlTaXplOiA1MjYsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMCksXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBHUkFQSFFMX0FQSV9VUkw6XG4gICAgICAgICAgJ2h0dHBzOi8vaGo0YXdzaTZkZmdiZm1icGx0cmZjZDQycmEuYXBwc3luYy1hcGkudXMtZWFzdC0xLmFtYXpvbmF3cy5jb20vZ3JhcGhxbCcsXG4gICAgICAgIFRXRUVUU19UQUJMRTogJ1R3ZWV0c1RhYmxlJ1xuICAgICAgfVxuICAgIH0pO1xuXG4gICAgLy8gYWRkIHBvbGljeSB0byBsYW1iZGFcbiAgICBOb3RpZnkuYWRkVG9Sb2xlUG9saWN5KGFwcHN5bmNQb2xpY3kpO1xuXG4gICAgdGhpcy5Ob3RpZnkgPSBOb3RpZnk7XG4gIH1cbn1cbiJdfQ==