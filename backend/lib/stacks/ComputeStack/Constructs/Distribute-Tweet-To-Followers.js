"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.DistributeTweetsToFollowers = void 0;
const constructs_1 = require("constructs");
const cdk = require("aws-cdk-lib");
const path = require("path");
class DistributeTweetsToFollowers extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        // Nodejs Construct
        const DistributeTweetsToFollowers = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'DistributeTweetsToFollowers', {
            entry: path.join(__dirname, '../Functions/DistributeTweetsToFollowers/index.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            memorySize: 526,
            timeout: cdk.Duration.seconds(30),
            environment: {
                TWEETS_TABLE: 'TweetsTable',
                TIMELINES_TABLE: 'TimelinesTable'
            }
        });
        this.DistributeTweetsToFollowers = DistributeTweetsToFollowers;
    }
}
exports.DistributeTweetsToFollowers = DistributeTweetsToFollowers;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGlzdHJpYnV0ZS1Ud2VldC1Uby1Gb2xsb3dlcnMuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJEaXN0cmlidXRlLVR3ZWV0LVRvLUZvbGxvd2Vycy50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSwyQ0FBdUM7QUFDdkMsbUNBQW1DO0FBQ25DLDZCQUE2QjtBQUM3QixNQUFhLDJCQUE0QixTQUFRLHNCQUFTO0lBRXhELFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsbUJBQW1CO1FBQ25CLE1BQU0sMkJBQTJCLEdBQy9CLElBQUksR0FBRyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FDdEMsSUFBSSxFQUNKLDZCQUE2QixFQUM3QjtZQUNFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUNkLFNBQVMsRUFDVCxtREFBbUQsQ0FDcEQ7WUFDRCxPQUFPLEVBQUUsU0FBUztZQUNsQixPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVztZQUMzQyxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7WUFDakMsV0FBVyxFQUFFO2dCQUNYLFlBQVksRUFBRSxhQUFhO2dCQUMzQixlQUFlLEVBQUUsZ0JBQWdCO2FBQ2xDO1NBQ0YsQ0FDRixDQUFDO1FBRUosSUFBSSxDQUFDLDJCQUEyQixHQUFHLDJCQUEyQixDQUFDO0lBQ2pFLENBQUM7Q0FDRjtBQTVCRCxrRUE0QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuZXhwb3J0IGNsYXNzIERpc3RyaWJ1dGVUd2VldHNUb0ZvbGxvd2VycyBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBEaXN0cmlidXRlVHdlZXRzVG9Gb2xsb3dlcnM6IGNkay5hd3NfbGFtYmRhX25vZGVqcy5Ob2RlanNGdW5jdGlvbjtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG5cbiAgICAvLyBOb2RlanMgQ29uc3RydWN0XG4gICAgY29uc3QgRGlzdHJpYnV0ZVR3ZWV0c1RvRm9sbG93ZXJzID1cbiAgICAgIG5ldyBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb24oXG4gICAgICAgIHRoaXMsXG4gICAgICAgICdEaXN0cmlidXRlVHdlZXRzVG9Gb2xsb3dlcnMnLFxuICAgICAgICB7XG4gICAgICAgICAgZW50cnk6IHBhdGguam9pbihcbiAgICAgICAgICAgIF9fZGlybmFtZSxcbiAgICAgICAgICAgICcuLi9GdW5jdGlvbnMvRGlzdHJpYnV0ZVR3ZWV0c1RvRm9sbG93ZXJzL2luZGV4LmpzJ1xuICAgICAgICAgICksXG4gICAgICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLFxuICAgICAgICAgIHJ1bnRpbWU6IGNkay5hd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICAgICAgbWVtb3J5U2l6ZTogNTI2LFxuICAgICAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDMwKSxcbiAgICAgICAgICBlbnZpcm9ubWVudDoge1xuICAgICAgICAgICAgVFdFRVRTX1RBQkxFOiAnVHdlZXRzVGFibGUnLFxuICAgICAgICAgICAgVElNRUxJTkVTX1RBQkxFOiAnVGltZWxpbmVzVGFibGUnXG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICApO1xuXG4gICAgdGhpcy5EaXN0cmlidXRlVHdlZXRzVG9Gb2xsb3dlcnMgPSBEaXN0cmlidXRlVHdlZXRzVG9Gb2xsb3dlcnM7XG4gIH1cbn1cbiJdfQ==