"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersTable = void 0;
const cdk = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class UsersTable extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const table = new cdk.aws_dynamodb.Table(this, 'UsersTable', {
            partitionKey: {
                name: 'id',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            billingMode: cdk.aws_dynamodb.BillingMode.PAY_PER_REQUEST,
            removalPolicy: cdk.RemovalPolicy.DESTROY,
            tableName: 'UsersTable'
        });
        table.addGlobalSecondaryIndex({
            indexName: 'byScreenName',
            partitionKey: {
                name: 'screenName',
                type: cdk.aws_dynamodb.AttributeType.STRING
            },
            projectionType: cdk.aws_dynamodb.ProjectionType.ALL
        });
        cdk.Tags.of(table).add('Name', 'UsersTable');
        //member variable for API stack
        this.table = table;
    }
}
exports.UsersTable = UsersTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlcnNUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlVzZXJzVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLDJDQUF1QztBQUV2QyxNQUFhLFVBQVcsU0FBUSxzQkFBUztJQUV2QyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUMzRCxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLElBQUk7Z0JBQ1YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDNUM7WUFDRCxXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsZUFBZTtZQUN6RCxhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPO1lBQ3hDLFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQztRQUNILEtBQUssQ0FBQyx1QkFBdUIsQ0FBQztZQUM1QixTQUFTLEVBQUUsY0FBYztZQUN6QixZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLFlBQVk7Z0JBQ2xCLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsY0FBYyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsY0FBYyxDQUFDLEdBQUc7U0FDcEQsQ0FBQyxDQUFDO1FBRUgsR0FBRyxDQUFDLElBQUksQ0FBQyxFQUFFLENBQUMsS0FBSyxDQUFDLENBQUMsR0FBRyxDQUFDLE1BQU0sRUFBRSxZQUFZLENBQUMsQ0FBQztRQUU3QywrQkFBK0I7UUFDL0IsSUFBSSxDQUFDLEtBQUssR0FBRyxLQUFLLENBQUM7SUFDckIsQ0FBQztDQUNGO0FBNUJELGdDQTRCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZXhwb3J0IGNsYXNzIFVzZXJzVGFibGUgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgdGFibGU6IGNkay5hd3NfZHluYW1vZGIuVGFibGU7XG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcpIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuXG4gICAgY29uc3QgdGFibGUgPSBuZXcgY2RrLmF3c19keW5hbW9kYi5UYWJsZSh0aGlzLCAnVXNlcnNUYWJsZScsIHtcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnaWQnLFxuICAgICAgICB0eXBlOiBjZGsuYXdzX2R5bmFtb2RiLkF0dHJpYnV0ZVR5cGUuU1RSSU5HXG4gICAgICB9LFxuICAgICAgYmlsbGluZ01vZGU6IGNkay5hd3NfZHluYW1vZGIuQmlsbGluZ01vZGUuUEFZX1BFUl9SRVFVRVNULFxuICAgICAgcmVtb3ZhbFBvbGljeTogY2RrLlJlbW92YWxQb2xpY3kuREVTVFJPWSxcbiAgICAgIHRhYmxlTmFtZTogJ1VzZXJzVGFibGUnXG4gICAgfSk7XG4gICAgdGFibGUuYWRkR2xvYmFsU2Vjb25kYXJ5SW5kZXgoe1xuICAgICAgaW5kZXhOYW1lOiAnYnlTY3JlZW5OYW1lJyxcbiAgICAgIHBhcnRpdGlvbktleToge1xuICAgICAgICBuYW1lOiAnc2NyZWVuTmFtZScsXG4gICAgICAgIHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBwcm9qZWN0aW9uVHlwZTogY2RrLmF3c19keW5hbW9kYi5Qcm9qZWN0aW9uVHlwZS5BTExcbiAgICB9KTtcblxuICAgIGNkay5UYWdzLm9mKHRhYmxlKS5hZGQoJ05hbWUnLCAnVXNlcnNUYWJsZScpO1xuXG4gICAgLy9tZW1iZXIgdmFyaWFibGUgZm9yIEFQSSBzdGFja1xuICAgIHRoaXMudGFibGUgPSB0YWJsZTtcbiAgfVxufVxuIl19