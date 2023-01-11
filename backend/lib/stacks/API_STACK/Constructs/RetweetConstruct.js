"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Retweet = void 0;
const cdk = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const constructs_1 = require("constructs");
const path = require("path");
class Retweet extends constructs_1.Construct {
    constructor(scope, id, api) {
        super(scope, id);
        this.Retweetfunction = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'RetweetFunction', {
            entry: path.join(__dirname, '../resolvers/mutations/Retweet/index.js'),
            handler: 'handler',
            memorySize: 128,
            timeout: cdk.Duration.seconds(20),
            environment: {
                USERS_TABLE: 'UsersTable',
                TWEETS_TABLE: 'TweetsTable',
                TIMELINES_TABLE: 'TimelinesTable',
                RETWEETS_TABLE: 'RetweetsTable'
            }
        });
        this.api = api;
        this.resolver = this.RetweetResolver();
    }
    RetweetResolver() {
        return new appsync.Resolver(this, 'RetweetResolver', {
            api: this.api,
            typeName: 'Mutation',
            fieldName: 'retweet',
            dataSource: this.api.addLambdaDataSource('Retweet', this.Retweetfunction)
        });
    }
}
exports.Retweet = Retweet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmV0d2VldENvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJldHdlZXRDb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLHNEQUFzRDtBQUN0RCwyQ0FBdUM7QUFDdkMsNkJBQTZCO0FBQzdCLE1BQWEsT0FBUSxTQUFRLHNCQUFTO0lBSXBDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsR0FBdUI7UUFDL0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUtaLG9CQUFlLEdBQUcsSUFBSSxHQUFHLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUMvRCxJQUFJLEVBQ0osaUJBQWlCLEVBQ2pCO1lBQ0UsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHlDQUF5QyxDQUFDO1lBQ3RFLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztZQUNqQyxXQUFXLEVBQUU7Z0JBQ1gsV0FBVyxFQUFFLFlBQVk7Z0JBQ3pCLFlBQVksRUFBRSxhQUFhO2dCQUMzQixlQUFlLEVBQUUsZ0JBQWdCO2dCQUNqQyxjQUFjLEVBQUUsZUFBZTthQUNoQztTQUNGLENBQ0YsQ0FBQztRQW5CQSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGVBQWUsRUFBRSxDQUFDO0lBQ3pDLENBQUM7SUFtQk0sZUFBZTtRQUNwQixPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDbkQsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFNBQVM7WUFDcEIsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsU0FBUyxFQUFFLElBQUksQ0FBQyxlQUFlLENBQUM7U0FDMUUsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBbkNELDBCQW1DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcHBzeW5jLWFscGhhJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBjbGFzcyBSZXR3ZWV0IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpO1xuICBwdWJsaWMgcmVzb2x2ZXI6IGFwcHN5bmMuUmVzb2x2ZXI7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGkpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIHRoaXMucmVzb2x2ZXIgPSB0aGlzLlJldHdlZXRSZXNvbHZlcigpO1xuICB9XG5cbiAgcHVibGljIFJldHdlZXRmdW5jdGlvbiA9IG5ldyBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb24oXG4gICAgdGhpcyxcbiAgICAnUmV0d2VldEZ1bmN0aW9uJyxcbiAgICB7XG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc29sdmVycy9tdXRhdGlvbnMvUmV0d2VldC9pbmRleC5qcycpLFxuICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLFxuICAgICAgbWVtb3J5U2l6ZTogMTI4LFxuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMjApLFxuICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgVVNFUlNfVEFCTEU6ICdVc2Vyc1RhYmxlJyxcbiAgICAgICAgVFdFRVRTX1RBQkxFOiAnVHdlZXRzVGFibGUnLFxuICAgICAgICBUSU1FTElORVNfVEFCTEU6ICdUaW1lbGluZXNUYWJsZScsXG4gICAgICAgIFJFVFdFRVRTX1RBQkxFOiAnUmV0d2VldHNUYWJsZSdcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgcHVibGljIFJldHdlZXRSZXNvbHZlcigpIHtcbiAgICByZXR1cm4gbmV3IGFwcHN5bmMuUmVzb2x2ZXIodGhpcywgJ1JldHdlZXRSZXNvbHZlcicsIHtcbiAgICAgIGFwaTogdGhpcy5hcGksXG4gICAgICB0eXBlTmFtZTogJ011dGF0aW9uJyxcbiAgICAgIGZpZWxkTmFtZTogJ3JldHdlZXQnLFxuICAgICAgZGF0YVNvdXJjZTogdGhpcy5hcGkuYWRkTGFtYmRhRGF0YVNvdXJjZSgnUmV0d2VldCcsIHRoaXMuUmV0d2VldGZ1bmN0aW9uKVxuICAgIH0pO1xuICB9XG59XG4iXX0=