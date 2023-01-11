"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserImageBucket = void 0;
const cdk = require("aws-cdk-lib");
const constructs_1 = require("constructs");
class UserImageBucket extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const userImageBucket = new cdk.aws_s3.Bucket(this, "UserImageBucket", {
            transferAcceleration: true,
            cors: [
                {
                    allowedMethods: [
                        cdk.aws_s3.HttpMethods.GET,
                        cdk.aws_s3.HttpMethods.PUT,
                    ],
                    allowedOrigins: ["*"],
                    allowedHeaders: ["*"],
                },
            ],
        });
        this.userImageBucket = userImageBucket;
    }
}
exports.UserImageBucket = UserImageBucket;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVXNlckltYWdlQnVja2V0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiVXNlckltYWdlQnVja2V0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQUNuQywyQ0FBdUM7QUFFdkMsTUFBYSxlQUFnQixTQUFRLHNCQUFTO0lBRTVDLFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsTUFBTSxlQUFlLEdBQUcsSUFBSSxHQUFHLENBQUMsTUFBTSxDQUFDLE1BQU0sQ0FBQyxJQUFJLEVBQUUsaUJBQWlCLEVBQUU7WUFDckUsb0JBQW9CLEVBQUUsSUFBSTtZQUMxQixJQUFJLEVBQUU7Z0JBQ0o7b0JBQ0UsY0FBYyxFQUFFO3dCQUNkLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUc7d0JBQzFCLEdBQUcsQ0FBQyxNQUFNLENBQUMsV0FBVyxDQUFDLEdBQUc7cUJBQzNCO29CQUNELGNBQWMsRUFBRSxDQUFDLEdBQUcsQ0FBQztvQkFDckIsY0FBYyxFQUFFLENBQUMsR0FBRyxDQUFDO2lCQUN0QjthQUNGO1NBQ0YsQ0FBQyxDQUFDO1FBRUgsSUFBSSxDQUFDLGVBQWUsR0FBRyxlQUFlLENBQUM7SUFDekMsQ0FBQztDQUNGO0FBcEJELDBDQW9CQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5cbmV4cG9ydCBjbGFzcyBVc2VySW1hZ2VCdWNrZXQgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgdXNlckltYWdlQnVja2V0OiBjZGsuYXdzX3MzLkJ1Y2tldDtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgY29uc3QgdXNlckltYWdlQnVja2V0ID0gbmV3IGNkay5hd3NfczMuQnVja2V0KHRoaXMsIFwiVXNlckltYWdlQnVja2V0XCIsIHtcbiAgICAgIHRyYW5zZmVyQWNjZWxlcmF0aW9uOiB0cnVlLFxuICAgICAgY29yczogW1xuICAgICAgICB7XG4gICAgICAgICAgYWxsb3dlZE1ldGhvZHM6IFtcbiAgICAgICAgICAgIGNkay5hd3NfczMuSHR0cE1ldGhvZHMuR0VULFxuICAgICAgICAgICAgY2RrLmF3c19zMy5IdHRwTWV0aG9kcy5QVVQsXG4gICAgICAgICAgXSxcbiAgICAgICAgICBhbGxvd2VkT3JpZ2luczogW1wiKlwiXSxcbiAgICAgICAgICBhbGxvd2VkSGVhZGVyczogW1wiKlwiXSxcbiAgICAgICAgfSxcbiAgICAgIF0sXG4gICAgfSk7XG5cbiAgICB0aGlzLnVzZXJJbWFnZUJ1Y2tldCA9IHVzZXJJbWFnZUJ1Y2tldDtcbiAgfVxufVxuIl19