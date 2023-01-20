"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DirectMessagesTable = void 0;
const cdk = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class DirectMessagesTable extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const table = new cdk.aws_dynamodb.Table(this, 'DirectMessagesTable', {
            partitionKey: {
                name: 'conversationId',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: 'messageId',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            stream: cdk.aws_dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
            billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableName: 'DirectMessagesTable'
        });
        cdk.Tags.of(table).add('Name', 'DirectMessagesTable');
        //member variable for API stack
        this.table = table;
    }
}
exports.DirectMessagesTable = DirectMessagesTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlyZWN0TWVzc2FnZXNUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkRpcmVjdE1lc3NhZ2VzVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLDJDQUF1QztBQUV2QyxNQUFhLG1CQUFvQixTQUFRLHNCQUFTO0lBRWhELFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUU7WUFDcEUsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxnQkFBZ0I7Z0JBQ3RCLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUM1QztZQUNELE1BQU0sRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0I7WUFDMUQsV0FBVyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWU7WUFDekQsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxTQUFTLEVBQUUscUJBQXFCO1NBQ2pDLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUscUJBQXFCLENBQUMsQ0FBQztRQUV0RCwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBekJELGtEQXlCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZXhwb3J0IGNsYXNzIERpcmVjdE1lc3NhZ2VzVGFibGUgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgdGFibGU6IGNkay5hd3NfZHluYW1vZGIuVGFibGU7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgY29uc3QgdGFibGUgPSBuZXcgY2RrLmF3c19keW5hbW9kYi5UYWJsZSh0aGlzLCAnRGlyZWN0TWVzc2FnZXNUYWJsZScsIHtcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnY29udmVyc2F0aW9uSWQnLFxuICAgICAgICB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9LFxuICAgICAgc29ydEtleToge1xuICAgICAgICBuYW1lOiAnbWVzc2FnZUlkJyxcbiAgICAgICAgdHlwZTogY2RrLmF3c19keW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgfSxcbiAgICAgIHN0cmVhbTogY2RrLmF3c19keW5hbW9kYi5TdHJlYW1WaWV3VHlwZS5ORVdfQU5EX09MRF9JTUFHRVMsXG4gICAgICBiaWxsaW5nTW9kZTogY2RrLmF3c19keW5hbW9kYi5CaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgICAgdGFibGVOYW1lOiAnRGlyZWN0TWVzc2FnZXNUYWJsZSdcbiAgICB9KTtcblxuICAgIGNkay5UYWdzLm9mKHRhYmxlKS5hZGQoJ05hbWUnLCAnRGlyZWN0TWVzc2FnZXNUYWJsZScpO1xuXG4gICAgLy9tZW1iZXIgdmFyaWFibGUgZm9yIEFQSSBzdGFja1xuICAgIHRoaXMudGFibGUgPSB0YWJsZTtcbiAgfVxufVxuIl19