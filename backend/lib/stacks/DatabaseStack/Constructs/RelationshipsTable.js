"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RelationshipsTable = void 0;
const cdk = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class RelationshipsTable extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const table = new cdk.aws_dynamodb.Table(this, 'RelationshipsTable', {
            partitionKey: {
                name: 'userId',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            stream: cdk.aws_dynamodb.StreamViewType.NEW_AND_OLD_IMAGES,
            sortKey: {
                //opaque key for the relationship
                name: 'sk',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableName: 'RelationshipsTable'
        });
        //add a global secondary index for the relationship
        table.addGlobalSecondaryIndex({
            indexName: 'byOtherUser',
            partitionKey: {
                name: 'otherUserId',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            sortKey: {
                name: 'sk',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            projectionType: cdk.aws_dynamodb.ProjectionType.ALL
        });
        cdk.Tags.of(table).add('Name', 'RelationshipsTable');
        //member variable for API stack
        this.table = table;
    }
}
exports.RelationshipsTable = RelationshipsTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmVsYXRpb25zaGlwc1RhYmxlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiUmVsYXRpb25zaGlwc1RhYmxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUNuQywyQ0FBdUM7QUFFdkMsTUFBYSxrQkFBbUIsU0FBUSxzQkFBUztJQUUvQyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLG9CQUFvQixFQUFFO1lBQ25FLFlBQVksRUFBRTtnQkFDWixJQUFJLEVBQUUsUUFBUTtnQkFDZCxJQUFJLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxhQUFhLENBQUMsTUFBTTthQUM1QztZQUNELE1BQU0sRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGNBQWMsQ0FBQyxrQkFBa0I7WUFDMUQsT0FBTyxFQUFFO2dCQUNQLGlDQUFpQztnQkFDakMsSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDNUM7WUFDRCxXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsZUFBZTtZQUN6RCxhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPO1lBQ3hDLFNBQVMsRUFBRSxvQkFBb0I7U0FDaEMsQ0FBQyxDQUFDO1FBRUgsbURBQW1EO1FBQ25ELEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztZQUM1QixTQUFTLEVBQUUsYUFBYTtZQUN4QixZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLGFBQWE7Z0JBQ25CLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxJQUFJO2dCQUNWLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsY0FBYyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUc7U0FDcEQsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxvQkFBb0IsQ0FBQyxDQUFDO1FBRXJELCtCQUErQjtRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUF4Q0QsZ0RBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgY2xhc3MgUmVsYXRpb25zaGlwc1RhYmxlIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHRhYmxlOiBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlO1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIGNvbnN0IHRhYmxlID0gbmV3IGNkay5hd3NfZHluYW1vZGIuVGFibGUodGhpcywgJ1JlbGF0aW9uc2hpcHNUYWJsZScsIHtcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAndXNlcklkJyxcbiAgICAgICAgdHlwZTogY2RrLmF3c19keW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgfSxcbiAgICAgIHN0cmVhbTogY2RrLmF3c19keW5hbW9kYi5TdHJlYW1WaWV3VHlwZS5ORVdfQU5EX09MRF9JTUFHRVMsXG4gICAgICBzb3J0S2V5OiB7XG4gICAgICAgIC8vb3BhcXVlIGtleSBmb3IgdGhlIHJlbGF0aW9uc2hpcFxuICAgICAgICBuYW1lOiAnc2snLFxuICAgICAgICB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9LFxuICAgICAgYmlsbGluZ01vZGU6IGNkay5hd3NfZHluYW1vZGIuQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNULFxuICAgICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICAgIHRhYmxlTmFtZTogJ1JlbGF0aW9uc2hpcHNUYWJsZSdcbiAgICB9KTtcblxuICAgIC8vYWRkIGEgZ2xvYmFsIHNlY29uZGFyeSBpbmRleCBmb3IgdGhlIHJlbGF0aW9uc2hpcFxuICAgIHRhYmxlLmFkZEdsb2JhbFNlY29uZGFyeUluZGV4KHtcbiAgICAgIGluZGV4TmFtZTogJ2J5T3RoZXJVc2VyJyxcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnb3RoZXJVc2VySWQnLFxuICAgICAgICB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9LFxuICAgICAgc29ydEtleToge1xuICAgICAgICBuYW1lOiAnc2snLFxuICAgICAgICB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9LFxuICAgICAgcHJvamVjdGlvblR5cGU6IGNkay5hd3NfZHluYW1vZGIuUHJvamVjdGlvblR5cGUuQUxMXG4gICAgfSk7XG5cbiAgICBjZGsuVGFncy5vZih0YWJsZSkuYWRkKCdOYW1lJywgJ1JlbGF0aW9uc2hpcHNUYWJsZScpO1xuXG4gICAgLy9tZW1iZXIgdmFyaWFibGUgZm9yIEFQSSBzdGFja1xuICAgIHRoaXMudGFibGUgPSB0YWJsZTtcbiAgfVxufVxuIl19