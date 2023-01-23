"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyDMed = void 0;
const constructs_1 = require("constructs");
const cdk = require("aws-cdk-lib");
const path = require("path");
class NotifyDMed extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        // create iam policy for accesing appsync
        const appsyncPolicy = new cdk.aws_iam.PolicyStatement({
            effect: cdk.aws_iam.Effect.ALLOW,
            actions: ['appsync:GraphQL', 'dynamodb:*'],
            resources: ['*']
        });
        // Nodejs Construct
        const NotifyDMed = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'NotifyDMed', {
            entry: path.join(__dirname, '../Functions/NotifyDMed/index.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            memorySize: 526,
            timeout: cdk.Duration.seconds(30),
            environment: {
                GRAPHQL_API_URL: 'https://hj4awsi6dfgbfmbpltrfcd42ra.appsync-api.us-east-1.amazonaws.com/graphql'
            }
        });
        // add policy to lambda
        NotifyDMed.addToRolePolicy(appsyncPolicy);
        this.NotifyDMed = NotifyDMed;
    }
}
exports.NotifyDMed = NotifyDMed;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5RG1lZC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk5vdGlmeURtZWQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXVDO0FBQ3ZDLG1DQUFtQztBQUNuQyw2QkFBNkI7QUFDN0IsTUFBYSxVQUFXLFNBQVEsc0JBQVM7SUFFdkMsWUFBWSxLQUFnQixFQUFFLEVBQVU7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQix5Q0FBeUM7UUFDekMsTUFBTSxhQUFhLEdBQUcsSUFBSSxHQUFHLENBQUMsT0FBTyxDQUFDLGVBQWUsQ0FBQztZQUNwRCxNQUFNLEVBQUUsR0FBRyxDQUFDLE9BQU8sQ0FBQyxNQUFNLENBQUMsS0FBSztZQUNoQyxPQUFPLEVBQUUsQ0FBQyxpQkFBaUIsRUFBRSxZQUFZLENBQUM7WUFDMUMsU0FBUyxFQUFFLENBQUMsR0FBRyxDQUFDO1NBQ2pCLENBQUMsQ0FBQztRQUVILG1CQUFtQjtRQUNuQixNQUFNLFVBQVUsR0FBRyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ3pELElBQUksRUFDSixZQUFZLEVBQ1o7WUFDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsa0NBQWtDLENBQUM7WUFDL0QsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDM0MsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxlQUFlLEVBQ2IsZ0ZBQWdGO2FBQ25GO1NBQ0YsQ0FDRixDQUFDO1FBRUYsdUJBQXVCO1FBQ3ZCLFVBQVUsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFMUMsSUFBSSxDQUFDLFVBQVUsR0FBRyxVQUFVLENBQUM7SUFDL0IsQ0FBQztDQUNGO0FBbENELGdDQWtDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5leHBvcnQgY2xhc3MgTm90aWZ5RE1lZCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBOb3RpZnlETWVkOiBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb247XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgLy8gY3JlYXRlIGlhbSBwb2xpY3kgZm9yIGFjY2VzaW5nIGFwcHN5bmNcbiAgICBjb25zdCBhcHBzeW5jUG9saWN5ID0gbmV3IGNkay5hd3NfaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBlZmZlY3Q6IGNkay5hd3NfaWFtLkVmZmVjdC5BTExPVyxcbiAgICAgIGFjdGlvbnM6IFsnYXBwc3luYzpHcmFwaFFMJywgJ2R5bmFtb2RiOionXSxcbiAgICAgIHJlc291cmNlczogWycqJ11cbiAgICB9KTtcblxuICAgIC8vIE5vZGVqcyBDb25zdHJ1Y3RcbiAgICBjb25zdCBOb3RpZnlETWVkID0gbmV3IGNkay5hd3NfbGFtYmRhX25vZGVqcy5Ob2RlanNGdW5jdGlvbihcbiAgICAgIHRoaXMsXG4gICAgICAnTm90aWZ5RE1lZCcsXG4gICAgICB7XG4gICAgICAgIGVudHJ5OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vRnVuY3Rpb25zL05vdGlmeURNZWQvaW5kZXguanMnKSxcbiAgICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLFxuICAgICAgICBydW50aW1lOiBjZGsuYXdzX2xhbWJkYS5SdW50aW1lLk5PREVKU18xNl9YLFxuICAgICAgICBtZW1vcnlTaXplOiA1MjYsXG4gICAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDMwKSxcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICBHUkFQSFFMX0FQSV9VUkw6XG4gICAgICAgICAgICAnaHR0cHM6Ly9oajRhd3NpNmRmZ2JmbWJwbHRyZmNkNDJyYS5hcHBzeW5jLWFwaS51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS9ncmFwaHFsJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIGFkZCBwb2xpY3kgdG8gbGFtYmRhXG4gICAgTm90aWZ5RE1lZC5hZGRUb1JvbGVQb2xpY3koYXBwc3luY1BvbGljeSk7XG5cbiAgICB0aGlzLk5vdGlmeURNZWQgPSBOb3RpZnlETWVkO1xuICB9XG59XG4iXX0=