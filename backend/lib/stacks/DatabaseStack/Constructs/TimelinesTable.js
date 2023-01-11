"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TimelinesTable = void 0;
const cdk = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class TimelinesTable extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const table = new cdk.aws_dynamodb.Table(this, 'TimelinesTable', {
            partitionKey: {
                name: 'userId',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: 'tweetId',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableName: 'TimelinesTable'
        });
        table.addGlobalSecondaryIndex({
            indexName: 'byDistributedFrom',
            partitionKey: {
                name: 'userId',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: 'distributedFrom',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            projectionType: cdk.aws_dynamodb.ProjectionType.ALL
        });
        cdk.Tags.of(table).add('Name', 'TimelinesTable');
        //member variable for API stack
        this.table = table;
    }
}
exports.TimelinesTable = TimelinesTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGltZWxpbmVzVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUaW1lbGluZXNUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsMkNBQXVDO0FBRXZDLE1BQWEsY0FBZSxTQUFRLHNCQUFTO0lBRTNDLFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsZ0JBQWdCLEVBQUU7WUFDL0QsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsV0FBVyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWU7WUFDekQsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxTQUFTLEVBQUUsZ0JBQWdCO1NBQzVCLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztZQUM1QixTQUFTLEVBQUUsbUJBQW1CO1lBQzlCLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUM1QztZQUNELE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsaUJBQWlCO2dCQUN2QixJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUM1QztZQUNELGNBQWMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHO1NBQ3BELENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsZ0JBQWdCLENBQUMsQ0FBQztRQUVqRCwrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBcENELHdDQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZXhwb3J0IGNsYXNzIFRpbWVsaW5lc1RhYmxlIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHRhYmxlOiBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlO1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIGNvbnN0IHRhYmxlID0gbmV3IGNkay5hd3NfZHluYW1vZGIuVGFibGUodGhpcywgJ1RpbWVsaW5lc1RhYmxlJywge1xuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6ICd1c2VySWQnLFxuICAgICAgICB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9LFxuICAgICAgc29ydEtleToge1xuICAgICAgICBuYW1lOiAndHdlZXRJZCcsXG4gICAgICAgIHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBiaWxsaW5nTW9kZTogY2RrLmF3c19keW5hbW9kYi5CaWxsaW5nTW9kZS5QQVlfUEVSX1JFUVVFU1QsXG4gICAgICByZW1vdmFsUG9saWN5OiBjZGsuUmVtb3ZhbFBvbGljeS5ERVNUUk9ZLFxuICAgICAgdGFibGVOYW1lOiAnVGltZWxpbmVzVGFibGUnXG4gICAgfSk7XG4gICAgdGFibGUuYWRkR2xvYmFsU2Vjb25kYXJ5SW5kZXgoe1xuICAgICAgaW5kZXhOYW1lOiAnYnlEaXN0cmlidXRlZEZyb20nLFxuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6ICd1c2VySWQnLFxuICAgICAgICB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9LFxuICAgICAgc29ydEtleToge1xuICAgICAgICBuYW1lOiAnZGlzdHJpYnV0ZWRGcm9tJyxcbiAgICAgICAgdHlwZTogY2RrLmF3c19keW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgfSxcbiAgICAgIHByb2plY3Rpb25UeXBlOiBjZGsuYXdzX2R5bmFtb2RiLlByb2plY3Rpb25UeXBlLkFMTFxuICAgIH0pO1xuXG4gICAgY2RrLlRhZ3Mub2YodGFibGUpLmFkZCgnTmFtZScsICdUaW1lbGluZXNUYWJsZScpO1xuXG4gICAgLy9tZW1iZXIgdmFyaWFibGUgZm9yIEFQSSBzdGFja1xuICAgIHRoaXMudGFibGUgPSB0YWJsZTtcbiAgfVxufVxuIl19