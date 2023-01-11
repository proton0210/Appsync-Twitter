"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TweetsTable = void 0;
const cdk = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class TweetsTable extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const table = new cdk.aws_dynamodb.Table(this, 'TweetsTable', {
            partitionKey: {
                name: 'id',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            stream: cdk.aws_dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
            billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableName: 'TweetsTable'
        });
        table.addGlobalSecondaryIndex({
            indexName: 'byCreator',
            partitionKey: {
                name: 'creator',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: 'id',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            projectionType: cdk.aws_dynamodb.ProjectionType.ALL
        });
        table.addGlobalSecondaryIndex({
            indexName: 'retweetsByCreator',
            partitionKey: {
                name: 'creator',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: 'retweetOf',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            projectionType: cdk.aws_dynamodb.ProjectionType.ALL
        });
        table.addGlobalSecondaryIndex({
            indexName: 'repliesForTweet',
            partitionKey: {
                name: 'inReplyToTweetId',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: 'id',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            projectionType: cdk.aws_dynamodb.ProjectionType.ALL
        });
        cdk.Tags.of(table).add('Name', 'TweetsTable');
        //member variable for API stack
        this.table = table;
    }
}
exports.TweetsTable = TweetsTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHdlZXRzVGFibGUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJUd2VldHNUYWJsZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsMkNBQXVDO0FBRXZDLE1BQWEsV0FBWSxTQUFRLHNCQUFTO0lBRXhDLFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSxLQUFLLEdBQUcsSUFBSSxHQUFHLENBQUMsWUFBWSxDQUFDLEtBQUssQ0FBQyxJQUFJLEVBQUUsYUFBYSxFQUFFO1lBQzVELFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUM1QztZQUNELE1BQU0sRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0I7WUFDMUQsV0FBVyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWU7WUFDekQsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxTQUFTLEVBQUUsYUFBYTtTQUN6QixDQUFDLENBQUM7UUFDSCxLQUFLLENBQUMsdUJBQXVCLENBQUM7WUFDNUIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsY0FBYyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUc7U0FDcEQsQ0FBQyxDQUFDO1FBQ0gsS0FBSyxDQUFDLHVCQUF1QixDQUFDO1lBQzVCLFNBQVMsRUFBRSxtQkFBbUI7WUFDOUIsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxXQUFXO2dCQUNqQixJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUM1QztZQUNELGNBQWMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHO1NBQ3BELENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztZQUM1QixTQUFTLEVBQUUsaUJBQWlCO1lBQzVCLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsa0JBQWtCO2dCQUN4QixJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUM1QztZQUNELE9BQU8sRUFBRTtnQkFDUCxJQUFJLEVBQUUsSUFBSTtnQkFDVixJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUM1QztZQUNELGNBQWMsRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxHQUFHO1NBQ3BELENBQUMsQ0FBQztRQUNILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsYUFBYSxDQUFDLENBQUM7UUFFOUMsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7Q0FDRjtBQXhERCxrQ0F3REMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBUd2VldHNUYWJsZSBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyB0YWJsZTogY2RrLmF3c19keW5hbW9kYi5UYWJsZTtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICBjb25zdCB0YWJsZSA9IG5ldyBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlKHRoaXMsICdUd2VldHNUYWJsZScsIHtcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9LFxuICAgICAgc3RyZWFtOiBjZGsuYXdzX2R5bmFtb2RiLlN0cmVhbVZpZXdUeXBlLk5FV19BTkRfT0xEX0lNQUdFUyxcbiAgICAgIGJpbGxpbmdNb2RlOiBjZGsuYXdzX2R5bmFtb2RiLkJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVCxcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICB0YWJsZU5hbWU6ICdUd2VldHNUYWJsZSdcbiAgICB9KTtcbiAgICB0YWJsZS5hZGRHbG9iYWxTZWNvbmRhcnlJbmRleCh7XG4gICAgICBpbmRleE5hbWU6ICdieUNyZWF0b3InLFxuICAgICAgcGFydGl0aW9uS2V5OiB7XG4gICAgICAgIG5hbWU6ICdjcmVhdG9yJyxcbiAgICAgICAgdHlwZTogY2RrLmF3c19keW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgfSxcbiAgICAgIHNvcnRLZXk6IHtcbiAgICAgICAgbmFtZTogJ2lkJyxcbiAgICAgICAgdHlwZTogY2RrLmF3c19keW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgfSxcbiAgICAgIHByb2plY3Rpb25UeXBlOiBjZGsuYXdzX2R5bmFtb2RiLlByb2plY3Rpb25UeXBlLkFMTFxuICAgIH0pO1xuICAgIHRhYmxlLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ3JldHdlZXRzQnlDcmVhdG9yJyxcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnY3JlYXRvcicsXG4gICAgICAgIHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBzb3J0S2V5OiB7XG4gICAgICAgIG5hbWU6ICdyZXR3ZWV0T2YnLFxuICAgICAgICB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9LFxuICAgICAgcHJvamVjdGlvblR5cGU6IGNkay5hd3NfZHluYW1vZGIuUHJvamVjdGlvblR5cGUuQUxMXG4gICAgfSk7XG4gICAgdGFibGUuYWRkR2xvYmFsU2Vjb25kYXJ5SW5kZXgoe1xuICAgICAgaW5kZXhOYW1lOiAncmVwbGllc0ZvclR3ZWV0JyxcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnaW5SZXBseVRvVHdlZXRJZCcsXG4gICAgICAgIHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBzb3J0S2V5OiB7XG4gICAgICAgIG5hbWU6ICdpZCcsXG4gICAgICAgIHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBwcm9qZWN0aW9uVHlwZTogY2RrLmF3c19keW5hbW9kYi5Qcm9qZWN0aW9uVHlwZS5BTExcbiAgICB9KTtcbiAgICBjZGsuVGFncy5vZih0YWJsZSkuYWRkKCdOYW1lJywgJ1R3ZWV0c1RhYmxlJyk7XG5cbiAgICAvL21lbWJlciB2YXJpYWJsZSBmb3IgQVBJIHN0YWNrXG4gICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICB9XG59XG4iXX0=