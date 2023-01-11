"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Tweet = void 0;
const cdk = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const constructs_1 = require("constructs");
const path = require("path");
class Tweet extends constructs_1.Construct {
    constructor(scope, id, api) {
        super(scope, id);
        this.Tweetfunction = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'TweetFunction', {
            entry: path.join(__dirname, '../resolvers/mutations/Tweet/index.js'),
            handler: 'handler',
            memorySize: 128,
            timeout: cdk.Duration.seconds(10),
            environment: {
                USERS_TABLE: 'UsersTable',
                TWEETS_TABLE: 'TweetsTable',
                TIMELINES_TABLE: 'TimelinesTable'
            }
        });
        this.api = api;
        this.resolver = this.TweetResolver();
    }
    TweetResolver() {
        return new appsync.Resolver(this, 'TweetResolver', {
            api: this.api,
            typeName: 'Mutation',
            fieldName: 'tweet',
            dataSource: this.api.addLambdaDataSource('Tweet', this.Tweetfunction)
        });
    }
}
exports.Tweet = Tweet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHdlZXRDb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUd2VldENvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsc0RBQXNEO0FBQ3RELDJDQUF1QztBQUN2Qyw2QkFBNkI7QUFDN0IsTUFBYSxLQUFNLFNBQVEsc0JBQVM7SUFJbEMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxHQUF1QjtRQUMvRCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBS1osa0JBQWEsR0FBRyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQzdELElBQUksRUFDSixlQUFlLEVBQ2Y7WUFDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUsdUNBQXVDLENBQUM7WUFDcEUsT0FBTyxFQUFFLFNBQVM7WUFDbEIsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxXQUFXLEVBQUUsWUFBWTtnQkFDekIsWUFBWSxFQUFFLGFBQWE7Z0JBQzNCLGVBQWUsRUFBRSxnQkFBZ0I7YUFDbEM7U0FDRixDQUNGLENBQUM7UUFsQkEsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxhQUFhLEVBQUUsQ0FBQztJQUN2QyxDQUFDO0lBa0JNLGFBQWE7UUFDbEIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGVBQWUsRUFBRTtZQUNqRCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsT0FBTztZQUNsQixVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxPQUFPLEVBQUUsSUFBSSxDQUFDLGFBQWEsQ0FBQztTQUN0RSxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFsQ0Qsc0JBa0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSAnQGF3cy1jZGsvYXdzLWFwcHN5bmMtYWxwaGEnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuZXhwb3J0IGNsYXNzIFR3ZWV0IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpO1xuICBwdWJsaWMgcmVzb2x2ZXI6IGFwcHN5bmMuUmVzb2x2ZXI7XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGkpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIHRoaXMucmVzb2x2ZXIgPSB0aGlzLlR3ZWV0UmVzb2x2ZXIoKTtcbiAgfVxuXG4gIHB1YmxpYyBUd2VldGZ1bmN0aW9uID0gbmV3IGNkay5hd3NfbGFtYmRhX25vZGVqcy5Ob2RlanNGdW5jdGlvbihcbiAgICB0aGlzLFxuICAgICdUd2VldEZ1bmN0aW9uJyxcbiAgICB7XG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc29sdmVycy9tdXRhdGlvbnMvVHdlZXQvaW5kZXguanMnKSxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJyxcbiAgICAgIG1lbW9yeVNpemU6IDEyOCxcbiAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDEwKSxcbiAgICAgIGVudmlyb25tZW50OiB7XG4gICAgICAgIFVTRVJTX1RBQkxFOiAnVXNlcnNUYWJsZScsXG4gICAgICAgIFRXRUVUU19UQUJMRTogJ1R3ZWV0c1RhYmxlJyxcbiAgICAgICAgVElNRUxJTkVTX1RBQkxFOiAnVGltZWxpbmVzVGFibGUnXG4gICAgICB9XG4gICAgfVxuICApO1xuXG4gIHB1YmxpYyBUd2VldFJlc29sdmVyKCkge1xuICAgIHJldHVybiBuZXcgYXBwc3luYy5SZXNvbHZlcih0aGlzLCAnVHdlZXRSZXNvbHZlcicsIHtcbiAgICAgIGFwaTogdGhpcy5hcGksXG4gICAgICB0eXBlTmFtZTogJ011dGF0aW9uJyxcbiAgICAgIGZpZWxkTmFtZTogJ3R3ZWV0JyxcbiAgICAgIGRhdGFTb3VyY2U6IHRoaXMuYXBpLmFkZExhbWJkYURhdGFTb3VyY2UoJ1R3ZWV0JywgdGhpcy5Ud2VldGZ1bmN0aW9uKVxuICAgIH0pO1xuICB9XG59XG4iXX0=