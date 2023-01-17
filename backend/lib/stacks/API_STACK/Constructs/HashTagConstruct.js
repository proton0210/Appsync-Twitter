"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Hashtag = void 0;
const constructs_1 = require("constructs");
const cdk = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const path = require("path");
class Hashtag extends constructs_1.Construct {
    constructor(scope, id, api) {
        super(scope, id);
        this.api = api;
        const ssmPolicy = new cdk.aws_iam.PolicyStatement({
            effect: cdk.aws_iam.Effect.ALLOW,
            actions: ['ssm:*'],
            resources: ['*']
        });
        // Nodejs Construct
        const Hashtag = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'Hashtag', {
            entry: path.join(__dirname, '../resolvers/query/Hashtag/index.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            memorySize: 128,
            timeout: cdk.Duration.seconds(30)
        });
        // add policy to lambda
        Hashtag.addToRolePolicy(ssmPolicy);
        this.Hashtag = Hashtag;
        const HashtagResolver = () => {
            return new appsync.Resolver(this, 'HashtagResolver', {
                api: this.api,
                typeName: 'Query',
                fieldName: 'getHashTag',
                dataSource: this.api.addLambdaDataSource('HashtagLambda', Hashtag)
            });
        };
        this.resolver = HashtagResolver();
    }
}
exports.Hashtag = Hashtag;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGFzaFRhZ0NvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkhhc2hUYWdDb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXVDO0FBQ3ZDLG1DQUFtQztBQUNuQyxzREFBc0Q7QUFFdEQsNkJBQTZCO0FBQzdCLE1BQWEsT0FBUSxTQUFRLHNCQUFTO0lBSXBDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsR0FBdUI7UUFDL0QsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7WUFDaEQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDaEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNqQixDQUFDLENBQUM7UUFFSCxtQkFBbUI7UUFDbkIsTUFBTSxPQUFPLEdBQUcsSUFBSSxHQUFHLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUFDLElBQUksRUFBRSxTQUFTLEVBQUU7WUFDeEUsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLHFDQUFxQyxDQUFDO1lBQ2xFLE9BQU8sRUFBRSxTQUFTO1lBQ2xCLE9BQU8sRUFBRSxHQUFHLENBQUMsVUFBVSxDQUFDLE9BQU8sQ0FBQyxXQUFXO1lBQzNDLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUNsQyxDQUFDLENBQUM7UUFFSCx1QkFBdUI7UUFDdkIsT0FBTyxDQUFDLGVBQWUsQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUVuQyxJQUFJLENBQUMsT0FBTyxHQUFHLE9BQU8sQ0FBQztRQUV2QixNQUFNLGVBQWUsR0FBRyxHQUFHLEVBQUU7WUFDM0IsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLGlCQUFpQixFQUFFO2dCQUNuRCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7Z0JBQ2IsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFNBQVMsRUFBRSxZQUFZO2dCQUN2QixVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxtQkFBbUIsQ0FBQyxlQUFlLEVBQUUsT0FBTyxDQUFDO2FBQ25FLENBQUMsQ0FBQztRQUNMLENBQUMsQ0FBQztRQUVGLElBQUksQ0FBQyxRQUFRLEdBQUcsZUFBZSxFQUFFLENBQUM7SUFDcEMsQ0FBQztDQUNGO0FBdENELDBCQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSAnQGF3cy1jZGsvYXdzLWFwcHN5bmMtYWxwaGEnO1xuXG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuZXhwb3J0IGNsYXNzIEhhc2h0YWcgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgSGFzaHRhZzogY2RrLmF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uO1xuICBwdWJsaWMgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGk7XG4gIHB1YmxpYyByZXNvbHZlcjogYXBwc3luYy5SZXNvbHZlcjtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGkpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIGNvbnN0IHNzbVBvbGljeSA9IG5ldyBjZGsuYXdzX2lhbS5Qb2xpY3lTdGF0ZW1lbnQoe1xuICAgICAgZWZmZWN0OiBjZGsuYXdzX2lhbS5FZmZlY3QuQUxMT1csXG4gICAgICBhY3Rpb25zOiBbJ3NzbToqJ10sXG4gICAgICByZXNvdXJjZXM6IFsnKiddXG4gICAgfSk7XG5cbiAgICAvLyBOb2RlanMgQ29uc3RydWN0XG4gICAgY29uc3QgSGFzaHRhZyA9IG5ldyBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb24odGhpcywgJ0hhc2h0YWcnLCB7XG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc29sdmVycy9xdWVyeS9IYXNodGFnL2luZGV4LmpzJyksXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXG4gICAgICBydW50aW1lOiBjZGsuYXdzX2xhbWJkYS5SdW50aW1lLk5PREVKU18xNl9YLFxuICAgICAgbWVtb3J5U2l6ZTogMTI4LFxuICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMzApXG4gICAgfSk7XG5cbiAgICAvLyBhZGQgcG9saWN5IHRvIGxhbWJkYVxuICAgIEhhc2h0YWcuYWRkVG9Sb2xlUG9saWN5KHNzbVBvbGljeSk7XG5cbiAgICB0aGlzLkhhc2h0YWcgPSBIYXNodGFnO1xuXG4gICAgY29uc3QgSGFzaHRhZ1Jlc29sdmVyID0gKCkgPT4ge1xuICAgICAgcmV0dXJuIG5ldyBhcHBzeW5jLlJlc29sdmVyKHRoaXMsICdIYXNodGFnUmVzb2x2ZXInLCB7XG4gICAgICAgIGFwaTogdGhpcy5hcGksXG4gICAgICAgIHR5cGVOYW1lOiAnUXVlcnknLFxuICAgICAgICBmaWVsZE5hbWU6ICdnZXRIYXNoVGFnJyxcbiAgICAgICAgZGF0YVNvdXJjZTogdGhpcy5hcGkuYWRkTGFtYmRhRGF0YVNvdXJjZSgnSGFzaHRhZ0xhbWJkYScsIEhhc2h0YWcpXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXNvbHZlciA9IEhhc2h0YWdSZXNvbHZlcigpO1xuICB9XG59XG4iXX0=