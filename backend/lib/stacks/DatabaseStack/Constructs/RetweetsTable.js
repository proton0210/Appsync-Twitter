"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.RetweetsTable = void 0;
const cdk = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class RetweetsTable extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        // Need to store who has retweeted which tweet.
        const table = new cdk.aws_dynamodb.Table(this, 'RetweetsTable', {
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
            tableName: 'RetweetsTable'
        });
        cdk.Tags.of(table).add('Name', 'RetweetsTable');
        //member variable for API stack
        this.table = table;
    }
}
exports.RetweetsTable = RetweetsTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmV0d2VldHNUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlJldHdlZXRzVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLDJDQUF1QztBQUV2QyxNQUFhLGFBQWMsU0FBUSxzQkFBUztJQUUxQyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLCtDQUErQztRQUUvQyxNQUFNLEtBQUssR0FBRyxJQUFJLEdBQUcsQ0FBQyxZQUFZLENBQUMsS0FBSyxDQUFDLElBQUksRUFBRSxlQUFlLEVBQUU7WUFDOUQsWUFBWSxFQUFFO2dCQUNaLElBQUksRUFBRSxRQUFRO2dCQUNkLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsT0FBTyxFQUFFO2dCQUNQLElBQUksRUFBRSxTQUFTO2dCQUNmLElBQUksRUFBRSxHQUFHLENBQUMsWUFBWSxDQUFDLGFBQWEsQ0FBQyxNQUFNO2FBQzVDO1lBQ0QsV0FBVyxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsV0FBVyxDQUFDLGVBQWU7WUFDekQsYUFBYSxFQUFFLEdBQUcsQ0FBQyxhQUFhLENBQUMsT0FBTztZQUN4QyxTQUFTLEVBQUUsZUFBZTtTQUMzQixDQUFDLENBQUM7UUFFSCxHQUFHLENBQUMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxLQUFLLENBQUMsQ0FBQyxHQUFHLENBQUMsTUFBTSxFQUFFLGVBQWUsQ0FBQyxDQUFDO1FBRWhELCtCQUErQjtRQUMvQixJQUFJLENBQUMsS0FBSyxHQUFHLEtBQUssQ0FBQztJQUNyQixDQUFDO0NBQ0Y7QUF6QkQsc0NBeUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgY2xhc3MgUmV0d2VldHNUYWJsZSBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyB0YWJsZTogY2RrLmF3c19keW5hbW9kYi5UYWJsZTtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgLy8gTmVlZCB0byBzdG9yZSB3aG8gaGFzIHJldHdlZXRlZCB3aGljaCB0d2VldC5cblxuICAgIGNvbnN0IHRhYmxlID0gbmV3IGNkay5hd3NfZHluYW1vZGIuVGFibGUodGhpcywgJ1JldHdlZXRzVGFibGUnLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogJ3VzZXJJZCcsXG4gICAgICAgIHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBzb3J0S2V5OiB7XG4gICAgICAgIG5hbWU6ICd0d2VldElkJyxcbiAgICAgICAgdHlwZTogY2RrLmF3c19keW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgfSxcbiAgICAgIGJpbGxpbmdNb2RlOiBjZGsuYXdzX2R5bmFtb2RiLkJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVCxcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICB0YWJsZU5hbWU6ICdSZXR3ZWV0c1RhYmxlJ1xuICAgIH0pO1xuXG4gICAgY2RrLlRhZ3Mub2YodGFibGUpLmFkZCgnTmFtZScsICdSZXR3ZWV0c1RhYmxlJyk7XG5cbiAgICAvL21lbWJlciB2YXJpYWJsZSBmb3IgQVBJIHN0YWNrXG4gICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICB9XG59XG4iXX0=