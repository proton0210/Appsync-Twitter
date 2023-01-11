"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributeTweet = void 0;
const constructs_1 = require("constructs");
const cdk = require("aws-cdk-lib");
const path = require("path");
class DistributeTweet extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        // Nodejs Construct
        const DistributeTweet = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'DistributeTweet', {
            entry: path.join(__dirname, '../Functions/DistributeTweets/index.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            memorySize: 526,
            timeout: cdk.Duration.seconds(30),
            environment: {
                RELATIONSHIPS_TABLE: 'RelationshipsTable',
                TIMELINES_TABLE: 'TimelinesTable',
                MAX_TWEETS: '100'
            }
        });
        this.DistributeTweet = DistributeTweet;
    }
}
exports.DistributeTweet = DistributeTweet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzdHJpYnV0ZS1Ud2VldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkRpc3RyaWJ1dGUtVHdlZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXVDO0FBQ3ZDLG1DQUFtQztBQUNuQyw2QkFBNkI7QUFDN0IsTUFBYSxlQUFnQixTQUFRLHNCQUFTO0lBRTVDLFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsbUJBQW1CO1FBQ25CLE1BQU0sZUFBZSxHQUFHLElBQUksR0FBRyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FDOUQsSUFBSSxFQUNKLGlCQUFpQixFQUNqQjtZQUNFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSx3Q0FBd0MsQ0FBQztZQUNyRSxPQUFPLEVBQUUsU0FBUztZQUNsQixPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVztZQUMzQyxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakMsV0FBVyxFQUFFO2dCQUNYLG1CQUFtQixFQUFFLG9CQUFvQjtnQkFDekMsZUFBZSxFQUFFLGdCQUFnQjtnQkFDakMsVUFBVSxFQUFFLEtBQUs7YUFDbEI7U0FDRixDQUNGLENBQUM7UUFFRixJQUFJLENBQUMsZUFBZSxHQUFHLGVBQWUsQ0FBQztJQUN6QyxDQUFDO0NBQ0Y7QUF6QkQsMENBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBjbGFzcyBEaXN0cmlidXRlVHdlZXQgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgRGlzdHJpYnV0ZVR3ZWV0OiBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb247XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgLy8gTm9kZWpzIENvbnN0cnVjdFxuICAgIGNvbnN0IERpc3RyaWJ1dGVUd2VldCA9IG5ldyBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb24oXG4gICAgICB0aGlzLFxuICAgICAgJ0Rpc3RyaWJ1dGVUd2VldCcsXG4gICAgICB7XG4gICAgICAgIGVudHJ5OiBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vRnVuY3Rpb25zL0Rpc3RyaWJ1dGVUd2VldHMvaW5kZXguanMnKSxcbiAgICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLFxuICAgICAgICBydW50aW1lOiBjZGsuYXdzX2xhbWJkYS5SdW50aW1lLk5PREVKU18xNl9YLFxuICAgICAgICBtZW1vcnlTaXplOiA1MjYsXG4gICAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDMwKSxcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICBSRUxBVElPTlNISVBTX1RBQkxFOiAnUmVsYXRpb25zaGlwc1RhYmxlJyxcbiAgICAgICAgICBUSU1FTElORVNfVEFCTEU6ICdUaW1lbGluZXNUYWJsZScsXG4gICAgICAgICAgTUFYX1RXRUVUUzogJzEwMCdcbiAgICAgICAgfVxuICAgICAgfVxuICAgICk7XG5cbiAgICB0aGlzLkRpc3RyaWJ1dGVUd2VldCA9IERpc3RyaWJ1dGVUd2VldDtcbiAgfVxufVxuIl19