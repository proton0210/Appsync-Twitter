"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyLiked = void 0;
const constructs_1 = require("constructs");
const cdk = require("aws-cdk-lib");
const path = require("path");
class NotifyLiked extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        // create iam policy for accesing appsync
        const appsyncPolicy = new cdk.aws_iam.PolicyStatement({
            effect: cdk.aws_iam.Effect.ALLOW,
            actions: ['appsync:GraphQL', 'dynamodb:*'],
            resources: ['*']
        });
        // Nodejs Construct
        const NotifyLiked = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'NotifyLiked', {
            entry: path.join(__dirname, '../Functions/NotifyLiked/index.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            memorySize: 526,
            timeout: cdk.Duration.seconds(30),
            environment: {
                GRAPHQL_API_URL: 'https://hj4awsi6dfgbfmbpltrfcd42ra.appsync-api.us-east-1.amazonaws.com/graphql',
                LIKES_TABLE: 'LikesTable'
            }
        });
        // add policy to lambda
        NotifyLiked.addToRolePolicy(appsyncPolicy);
        this.NotifyLiked = NotifyLiked;
    }
}
exports.NotifyLiked = NotifyLiked;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5TGlrZWQuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJOb3RpZnlMaWtlZC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBdUM7QUFDdkMsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QixNQUFhLFdBQVksU0FBUSxzQkFBUztJQUV4QyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLHlDQUF5QztRQUN6QyxNQUFNLGFBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1lBQ3BELE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQ2hDLE9BQU8sRUFBRSxDQUFDLGlCQUFpQixFQUFFLFlBQVksQ0FBQztZQUMxQyxTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDakIsQ0FBQyxDQUFDO1FBRUgsbUJBQW1CO1FBQ25CLE1BQU0sV0FBVyxHQUFHLElBQUksR0FBRyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQ2hGLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxtQ0FBbUMsQ0FBQztZQUNoRSxPQUFPLEVBQUUsU0FBUztZQUNsQixPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVztZQUMzQyxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakMsV0FBVyxFQUFFO2dCQUNYLGVBQWUsRUFDYixnRkFBZ0Y7Z0JBQ2hGLFdBQVcsRUFBRSxZQUFZO2FBQzVCO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLFdBQVcsQ0FBQyxlQUFlLENBQUMsYUFBYSxDQUFDLENBQUM7UUFFM0MsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7SUFDakMsQ0FBQztDQUNGO0FBL0JELGtDQStCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5leHBvcnQgY2xhc3MgTm90aWZ5TGlrZWQgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgTm90aWZ5TGlrZWQ6IGNkay5hd3NfbGFtYmRhX25vZGVqcy5Ob2RlanNGdW5jdGlvbjtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICAvLyBjcmVhdGUgaWFtIHBvbGljeSBmb3IgYWNjZXNpbmcgYXBwc3luY1xuICAgIGNvbnN0IGFwcHN5bmNQb2xpY3kgPSBuZXcgY2RrLmF3c19pYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGVmZmVjdDogY2RrLmF3c19pYW0uRWZmZWN0LkFMTE9XLFxuICAgICAgYWN0aW9uczogWydhcHBzeW5jOkdyYXBoUUwnLCAnZHluYW1vZGI6KiddLFxuICAgICAgcmVzb3VyY2VzOiBbJyonXVxuICAgIH0pO1xuXG4gICAgLy8gTm9kZWpzIENvbnN0cnVjdFxuICAgIGNvbnN0IE5vdGlmeUxpa2VkID0gbmV3IGNkay5hd3NfbGFtYmRhX25vZGVqcy5Ob2RlanNGdW5jdGlvbih0aGlzLCAnTm90aWZ5TGlrZWQnLCB7XG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL0Z1bmN0aW9ucy9Ob3RpZnlMaWtlZC9pbmRleC5qcycpLFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLFxuICAgICAgcnVudGltZTogY2RrLmF3c19sYW1iZGEuUnVudGltZS5OT0RFSlNfMTZfWCxcbiAgICAgIG1lbW9yeVNpemU6IDUyNixcbiAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDMwKSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIEdSQVBIUUxfQVBJX1VSTDpcbiAgICAgICAgICAnaHR0cHM6Ly9oajRhd3NpNmRmZ2JmbWJwbHRyZmNkNDJyYS5hcHBzeW5jLWFwaS51cy1lYXN0LTEuYW1hem9uYXdzLmNvbS9ncmFwaHFsJyxcbiAgICAgICAgICBMSUtFU19UQUJMRTogJ0xpa2VzVGFibGUnXG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBhZGQgcG9saWN5IHRvIGxhbWJkYVxuICAgIE5vdGlmeUxpa2VkLmFkZFRvUm9sZVBvbGljeShhcHBzeW5jUG9saWN5KTtcblxuICAgIHRoaXMuTm90aWZ5TGlrZWQgPSBOb3RpZnlMaWtlZDtcbiAgfVxufVxuIl19