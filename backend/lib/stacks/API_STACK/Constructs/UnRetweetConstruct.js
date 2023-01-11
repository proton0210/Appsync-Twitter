"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnRetweet = void 0;
const cdk = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const constructs_1 = require("constructs");
const path = require("path");
class UnRetweet extends constructs_1.Construct {
    constructor(scope, id, api) {
        super(scope, id);
        this.UnRetweetFunction = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'UnRetweet', {
            entry: path.join(__dirname, '../resolvers/mutations/UnRetweet/index.js'),
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
        this.resolver = this.UnRetweetResolver();
    }
    UnRetweetResolver() {
        return new appsync.Resolver(this, 'UnRetweetResolver', {
            api: this.api,
            typeName: 'Mutation',
            fieldName: 'unretweet',
            dataSource: this.api.addLambdaDataSource('UnRetweet', this.UnRetweetFunction)
        });
    }
}
exports.UnRetweet = UnRetweet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5SZXR3ZWV0Q29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVW5SZXR3ZWV0Q29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUNuQyxzREFBc0Q7QUFDdEQsMkNBQXVDO0FBQ3ZDLDZCQUE2QjtBQUM3QixNQUFhLFNBQVUsU0FBUSxzQkFBUztJQUl0QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEdBQXVCO1FBQy9ELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFLWixzQkFBaUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ2pFLElBQUksRUFDSixXQUFXLEVBQ1g7WUFDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsMkNBQTJDLENBQUM7WUFDeEUsT0FBTyxFQUFFLFNBQVM7WUFDbEIsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxXQUFXLEVBQUUsWUFBWTtnQkFDekIsWUFBWSxFQUFFLGFBQWE7Z0JBQzNCLGVBQWUsRUFBRSxnQkFBZ0I7Z0JBQ2pDLGNBQWMsRUFBRSxlQUFlO2FBQ2hDO1NBQ0YsQ0FDRixDQUFDO1FBbkJBLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsaUJBQWlCLEVBQUUsQ0FBQztJQUMzQyxDQUFDO0lBbUJNLGlCQUFpQjtRQUN0QixPQUFPLElBQUksT0FBTyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsbUJBQW1CLEVBQUU7WUFDckQsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQ3RDLFdBQVcsRUFDWCxJQUFJLENBQUMsaUJBQWlCLENBQ3ZCO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdENELDhCQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcHBzeW5jLWFscGhhJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBjbGFzcyBVblJldHdlZXQgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGk7XG4gIHB1YmxpYyByZXNvbHZlcjogYXBwc3luYy5SZXNvbHZlcjtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBhcGk6IGFwcHN5bmMuR3JhcGhxbEFwaSkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgdGhpcy5yZXNvbHZlciA9IHRoaXMuVW5SZXR3ZWV0UmVzb2x2ZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBVblJldHdlZXRGdW5jdGlvbiA9IG5ldyBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb24oXG4gICAgdGhpcyxcbiAgICAnVW5SZXR3ZWV0JyxcbiAgICB7XG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc29sdmVycy9tdXRhdGlvbnMvVW5SZXR3ZWV0L2luZGV4LmpzJyksXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXG4gICAgICBtZW1vcnlTaXplOiAxMjgsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygyMCksXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBVU0VSU19UQUJMRTogJ1VzZXJzVGFibGUnLFxuICAgICAgICBUV0VFVFNfVEFCTEU6ICdUd2VldHNUYWJsZScsXG4gICAgICAgIFRJTUVMSU5FU19UQUJMRTogJ1RpbWVsaW5lc1RhYmxlJyxcbiAgICAgICAgUkVUV0VFVFNfVEFCTEU6ICdSZXR3ZWV0c1RhYmxlJ1xuICAgICAgfVxuICAgIH1cbiAgKTtcblxuICBwdWJsaWMgVW5SZXR3ZWV0UmVzb2x2ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBhcHBzeW5jLlJlc29sdmVyKHRoaXMsICdVblJldHdlZXRSZXNvbHZlcicsIHtcbiAgICAgIGFwaTogdGhpcy5hcGksXG4gICAgICB0eXBlTmFtZTogJ011dGF0aW9uJyxcbiAgICAgIGZpZWxkTmFtZTogJ3VucmV0d2VldCcsXG4gICAgICBkYXRhU291cmNlOiB0aGlzLmFwaS5hZGRMYW1iZGFEYXRhU291cmNlKFxuICAgICAgICAnVW5SZXR3ZWV0JyxcbiAgICAgICAgdGhpcy5VblJldHdlZXRGdW5jdGlvblxuICAgICAgKVxuICAgIH0pO1xuICB9XG59XG4iXX0=