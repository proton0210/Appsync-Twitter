"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendDirectMessage = void 0;
const cdk = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const constructs_1 = require("constructs");
const path = require("path");
class SendDirectMessage extends constructs_1.Construct {
    constructor(scope, id, api) {
        super(scope, id);
        this.SendDirectMessagefunction = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'SendDirectMessageFunction', {
            entry: path.join(__dirname, '../resolvers/mutations/SendDirectMessage/index.js'),
            handler: 'handler',
            memorySize: 128,
            timeout: cdk.Duration.seconds(10),
            environment: {
                CONVERSATIONS_TABLE: 'ConversationsTable',
                DIRECT_MESSAGES_TABLE: 'DirectMessagesTable'
            }
        });
        this.api = api;
        this.resolver = this.SendDirectMessageResolver();
    }
    SendDirectMessageResolver() {
        return new appsync.Resolver(this, 'SendDirectMessageResolver', {
            api: this.api,
            typeName: 'Mutation',
            fieldName: 'sendDirectMessage',
            dataSource: this.api.addLambdaDataSource('SendDirectMessage', this.SendDirectMessagefunction)
        });
    }
}
exports.SendDirectMessage = SendDirectMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VuZERpcmVjdE1lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZW5kRGlyZWN0TWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsc0RBQXNEO0FBQ3RELDJDQUF1QztBQUN2Qyw2QkFBNkI7QUFDN0IsTUFBYSxpQkFBa0IsU0FBUSxzQkFBUztJQUk5QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEdBQXVCO1FBQy9ELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFLWiw4QkFBeUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ3pFLElBQUksRUFDSiwyQkFBMkIsRUFDM0I7WUFDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FDZCxTQUFTLEVBQ1QsbURBQW1ELENBQ3BEO1lBQ0QsT0FBTyxFQUFFLFNBQVM7WUFDbEIsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxtQkFBbUIsRUFBRSxvQkFBb0I7Z0JBQ3pDLHFCQUFxQixFQUFFLHFCQUFxQjthQUM3QztTQUNGLENBQ0YsQ0FBQztRQXBCQSxJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDbkQsQ0FBQztJQW9CTSx5QkFBeUI7UUFDOUIsT0FBTyxJQUFJLE9BQU8sQ0FBQyxRQUFRLENBQUMsSUFBSSxFQUFFLDJCQUEyQixFQUFFO1lBQzdELEdBQUcsRUFBRSxJQUFJLENBQUMsR0FBRztZQUNiLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxtQkFBbUI7WUFDOUIsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQ3RDLG1CQUFtQixFQUNuQixJQUFJLENBQUMseUJBQXlCLENBQy9CO1NBQ0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBdkNELDhDQXVDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcHBzeW5jLWFscGhhJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBjbGFzcyBTZW5kRGlyZWN0TWVzc2FnZSBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyBhcGk6IGFwcHN5bmMuR3JhcGhxbEFwaTtcbiAgcHVibGljIHJlc29sdmVyOiBhcHBzeW5jLlJlc29sdmVyO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICB0aGlzLnJlc29sdmVyID0gdGhpcy5TZW5kRGlyZWN0TWVzc2FnZVJlc29sdmVyKCk7XG4gIH1cblxuICBwdWJsaWMgU2VuZERpcmVjdE1lc3NhZ2VmdW5jdGlvbiA9IG5ldyBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb24oXG4gICAgdGhpcyxcbiAgICAnU2VuZERpcmVjdE1lc3NhZ2VGdW5jdGlvbicsXG4gICAge1xuICAgICAgZW50cnk6IHBhdGguam9pbihcbiAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAnLi4vcmVzb2x2ZXJzL211dGF0aW9ucy9TZW5kRGlyZWN0TWVzc2FnZS9pbmRleC5qcydcbiAgICAgICksXG4gICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXG4gICAgICBtZW1vcnlTaXplOiAxMjgsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMCksXG4gICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICBDT05WRVJTQVRJT05TX1RBQkxFOiAnQ29udmVyc2F0aW9uc1RhYmxlJyxcbiAgICAgICAgRElSRUNUX01FU1NBR0VTX1RBQkxFOiAnRGlyZWN0TWVzc2FnZXNUYWJsZSdcbiAgICAgIH1cbiAgICB9XG4gICk7XG5cbiAgcHVibGljIFNlbmREaXJlY3RNZXNzYWdlUmVzb2x2ZXIoKSB7XG4gICAgcmV0dXJuIG5ldyBhcHBzeW5jLlJlc29sdmVyKHRoaXMsICdTZW5kRGlyZWN0TWVzc2FnZVJlc29sdmVyJywge1xuICAgICAgYXBpOiB0aGlzLmFwaSxcbiAgICAgIHR5cGVOYW1lOiAnTXV0YXRpb24nLFxuICAgICAgZmllbGROYW1lOiAnc2VuZERpcmVjdE1lc3NhZ2UnLFxuICAgICAgZGF0YVNvdXJjZTogdGhpcy5hcGkuYWRkTGFtYmRhRGF0YVNvdXJjZShcbiAgICAgICAgJ1NlbmREaXJlY3RNZXNzYWdlJyxcbiAgICAgICAgdGhpcy5TZW5kRGlyZWN0TWVzc2FnZWZ1bmN0aW9uXG4gICAgICApXG4gICAgfSk7XG4gIH1cbn1cbiJdfQ==