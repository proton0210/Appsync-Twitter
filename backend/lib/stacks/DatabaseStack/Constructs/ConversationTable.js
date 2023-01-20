"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConversationsTable = void 0;
const cdk = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class ConversationsTable extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const table = new cdk.aws_dynamodb.Table(this, 'ConversationsTable', {
            partitionKey: {
                name: 'userId',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: 'otherUserId',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableName: 'ConversationsTable'
        });
        // add global secondary index
        table.addGlobalSecondaryIndex({
            indexName: 'byUserId',
            partitionKey: {
                name: 'userId',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: 'lastModified',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            projectionType: cdk.aws_dynamodb.ProjectionType.ALL
        });
        cdk.Tags.of(table).add('Name', 'ConversationTable');
        //member variable for API stack
        this.table = table;
    }
}
exports.ConversationsTable = ConversationsTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udmVyc2F0aW9uVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJDb252ZXJzYXRpb25UYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsMkNBQXVDO0FBRXZDLE1BQWEsa0JBQW1CLFNBQVEsc0JBQVM7SUFFL0MsWUFBWSxLQUFnQixFQUFFLEVBQVU7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxvQkFBb0IsRUFBRTtZQUNuRSxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDNUM7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsV0FBVyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWU7WUFDekQsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxTQUFTLEVBQUUsb0JBQW9CO1NBQ2hDLENBQUMsQ0FBQztRQUVILDZCQUE2QjtRQUM3QixLQUFLLENBQUMsdUJBQXVCLENBQUM7WUFDNUIsU0FBUyxFQUFFLFVBQVU7WUFDckIsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxjQUFjO2dCQUNwQixJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUM1QztZQUNELGNBQWMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHO1NBQ3BELENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsbUJBQW1CLENBQUMsQ0FBQztRQUVwRCwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBdENELGdEQXNDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZXhwb3J0IGNsYXNzIENvbnZlcnNhdGlvbnNUYWJsZSBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyB0YWJsZTogY2RrLmF3c19keW5hbW9kYi5UYWJsZTtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBjb25zdCB0YWJsZSA9IG5ldyBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlKHRoaXMsICdDb252ZXJzYXRpb25zVGFibGUnLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogJ3VzZXJJZCcsXG4gICAgICAgIHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBzb3J0S2V5OiB7XG4gICAgICAgIG5hbWU6ICdvdGhlclVzZXJJZCcsXG4gICAgICAgIHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBiaWxsaW5nTW9kZTogY2RrLmF3c19keW5hbW9kYi5CaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgICAgdGFibGVOYW1lOiAnQ29udmVyc2F0aW9uc1RhYmxlJ1xuICAgIH0pO1xuXG4gICAgLy8gYWRkIGdsb2JhbCBzZWNvbmRhcnkgaW5kZXhcbiAgICB0YWJsZS5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdieVVzZXJJZCcsXG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogJ3VzZXJJZCcsXG4gICAgICAgIHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBzb3J0S2V5OiB7XG4gICAgICAgIG5hbWU6ICdsYXN0TW9kaWZpZWQnLFxuICAgICAgICB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9LFxuICAgICAgcHJvamVjdGlvblR5cGU6IGNkay5hd3NfZHluYW1vZGIuUHJvamVjdGlvblR5cGUuQUxMXG4gICAgfSk7XG5cbiAgICBjZGsuVGFncy5vZih0YWJsZSkuYWRkKCdOYW1lJywgJ0NvbnZlcnNhdGlvblRhYmxlJyk7XG5cbiAgICAvL21lbWJlciB2YXJpYWJsZSBmb3IgQVBJIHN0YWNrXG4gICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICB9XG59XG4iXX0=