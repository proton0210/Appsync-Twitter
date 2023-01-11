"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.LikesTable = void 0;
const cdk = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class LikesTable extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const table = new cdk.aws_dynamodb.Table(this, 'LikesTable', {
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
            tableName: 'LikesTable'
        });
        cdk.Tags.of(table).add('Name', 'LikesTable');
        //member variable for API stack
        this.table = table;
    }
}
exports.LikesTable = LikesTable;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGlrZXNUYWJsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkxpa2VzVGFibGUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsbUNBQW1DO0FBQ25DLDJDQUF1QztBQUV2QyxNQUFhLFVBQVcsU0FBUSxzQkFBUztJQUV2QyxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBRWpCLE1BQU0sS0FBSyxHQUFHLElBQUksR0FBRyxDQUFDLFlBQVksQ0FBQyxLQUFLLENBQUMsSUFBSSxFQUFFLFlBQVksRUFBRTtZQUMzRCxZQUFZLEVBQUU7Z0JBQ1osSUFBSSxFQUFFLFFBQVE7Z0JBQ2QsSUFBSSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDNUM7WUFDRCxPQUFPLEVBQUU7Z0JBQ1AsSUFBSSxFQUFFLFNBQVM7Z0JBQ2YsSUFBSSxFQUFFLEdBQUcsQ0FBQyxZQUFZLENBQUMsYUFBYSxDQUFDLE1BQU07YUFDNUM7WUFDRCxXQUFXLEVBQUUsR0FBRyxDQUFDLFlBQVksQ0FBQyxXQUFXLENBQUMsZUFBZTtZQUN6RCxhQUFhLEVBQUUsR0FBRyxDQUFDLGFBQWEsQ0FBQyxPQUFPO1lBQ3hDLFNBQVMsRUFBRSxZQUFZO1NBQ3hCLENBQUMsQ0FBQztRQUVILEdBQUcsQ0FBQyxJQUFJLENBQUMsRUFBRSxDQUFDLEtBQUssQ0FBQyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsWUFBWSxDQUFDLENBQUM7UUFFN0MsK0JBQStCO1FBQy9CLElBQUksQ0FBQyxLQUFLLEdBQUcsS0FBSyxDQUFDO0lBQ3JCLENBQUM7Q0FDRjtBQXhCRCxnQ0F3QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBMaWtlc1RhYmxlIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHRhYmxlOiBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlO1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIGNvbnN0IHRhYmxlID0gbmV3IGNkay5hd3NfZHluYW1vZGIuVGFibGUodGhpcywgJ0xpa2VzVGFibGUnLCB7XG4gICAgICBwYXJ0aXRpb25LZXk6IHtcbiAgICAgICAgbmFtZTogJ3VzZXJJZCcsXG4gICAgICAgIHR5cGU6IGNkay5hd3NfZHluYW1vZGIuQXR0cmlidXRlVHlwZS5TVFJJTkdcbiAgICAgIH0sXG4gICAgICBzb3J0S2V5OiB7XG4gICAgICAgIG5hbWU6ICd0d2VldElkJyxcbiAgICAgICAgdHlwZTogY2RrLmF3c19keW5hbW9kYi5BdHRyaWJ1dGVUeXBlLlNUUklOR1xuICAgICAgfSxcbiAgICAgIGJpbGxpbmdNb2RlOiBjZGsuYXdzX2R5bmFtb2RiLkJpbGxpbmdNb2RlLlBBWV9QRVJfUkVRVUVTVCxcbiAgICAgIHJlbW92YWxQb2xpY3k6IGNkay5SZW1vdmFsUG9saWN5LkRFU1RST1ksXG4gICAgICB0YWJsZU5hbWU6ICdMaWtlc1RhYmxlJ1xuICAgIH0pO1xuXG4gICAgY2RrLlRhZ3Mub2YodGFibGUpLmFkZCgnTmFtZScsICdMaWtlc1RhYmxlJyk7XG5cbiAgICAvL21lbWJlciB2YXJpYWJsZSBmb3IgQVBJIHN0YWNrXG4gICAgdGhpcy50YWJsZSA9IHRhYmxlO1xuICB9XG59XG4iXX0=