"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetImageUploadURL = void 0;
const cdk = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const constructs_1 = require("constructs");
const path = require("path");
class GetImageUploadURL extends constructs_1.Construct {
    constructor(scope, id, api) {
        super(scope, id);
        this.getImageUploadURLfunction = new cdk.aws_lambda_nodejs.NodejsFunction(this, "GetImageUploadURL", {
            entry: path.join(__dirname, "../resolvers/query/GetImageUploadUrl/index.js"),
            handler: "handler",
            memorySize: 128,
            timeout: cdk.Duration.seconds(10),
        });
        this.api = api;
        this.resolver = this.ImageUploadUrlResolver();
    }
    ImageUploadUrlResolver() {
        return new appsync.Resolver(this, "getImageUploadUrl", {
            api: this.api,
            typeName: "Query",
            fieldName: "getImageUploadUrl",
            dataSource: this.api.addLambdaDataSource("getImageUploadUrl", this.getImageUploadURLfunction),
        });
    }
}
exports.GetImageUploadURL = GetImageUploadURL;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0SW1hZ2VVcGxvYWRVcmxDb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHZXRJbWFnZVVwbG9hZFVybENvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFDbkMsc0RBQXNEO0FBQ3RELDJDQUF1QztBQUN2Qyw2QkFBNkI7QUFDN0IsTUFBYSxpQkFBa0IsU0FBUSxzQkFBUztJQUc5QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEdBQXVCO1FBQy9ELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFLbkIsOEJBQXlCLEdBQUcsSUFBSSxHQUFHLENBQUMsaUJBQWlCLENBQUMsY0FBYyxDQUNsRSxJQUFJLEVBQ0osbUJBQW1CLEVBQ25CO1lBQ0UsS0FBSyxFQUFFLElBQUksQ0FBQyxJQUFJLENBQ2QsU0FBUyxFQUNULCtDQUErQyxDQUNoRDtZQUNELE9BQU8sRUFBRSxTQUFTO1lBQ2xCLFVBQVUsRUFBRSxHQUFHO1lBQ2YsT0FBTyxFQUFFLEdBQUcsQ0FBQyxRQUFRLENBQUMsT0FBTyxDQUFDLEVBQUUsQ0FBQztTQUNsQyxDQUNGLENBQUM7UUFoQkEsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxzQkFBc0IsRUFBRSxDQUFDO0lBQ2hELENBQUM7SUFnQk0sc0JBQXNCO1FBQzNCLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxtQkFBbUIsRUFBRTtZQUNyRCxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixRQUFRLEVBQUUsT0FBTztZQUNqQixTQUFTLEVBQUUsbUJBQW1CO1lBQzlCLFVBQVUsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLG1CQUFtQixDQUN0QyxtQkFBbUIsRUFDbkIsSUFBSSxDQUFDLHlCQUF5QixDQUMvQjtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQWxDRCw4Q0FrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSBcImF3cy1jZGstbGliXCI7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gXCJAYXdzLWNkay9hd3MtYXBwc3luYy1hbHBoYVwiO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSBcImNvbnN0cnVjdHNcIjtcbmltcG9ydCAqIGFzIHBhdGggZnJvbSBcInBhdGhcIjtcbmV4cG9ydCBjbGFzcyBHZXRJbWFnZVVwbG9hZFVSTCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyBhcGk6IGFwcHN5bmMuR3JhcGhxbEFwaTtcbiAgcHVibGljIHJlc29sdmVyOiBhcHBzeW5jLlJlc29sdmVyO1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBhcGk6IGFwcHN5bmMuR3JhcGhxbEFwaSkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgdGhpcy5yZXNvbHZlciA9IHRoaXMuSW1hZ2VVcGxvYWRVcmxSZXNvbHZlcigpO1xuICB9XG5cbiAgZ2V0SW1hZ2VVcGxvYWRVUkxmdW5jdGlvbiA9IG5ldyBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb24oXG4gICAgdGhpcyxcbiAgICBcIkdldEltYWdlVXBsb2FkVVJMXCIsXG4gICAge1xuICAgICAgZW50cnk6IHBhdGguam9pbihcbiAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICBcIi4uL3Jlc29sdmVycy9xdWVyeS9HZXRJbWFnZVVwbG9hZFVybC9pbmRleC5qc1wiXG4gICAgICApLFxuICAgICAgaGFuZGxlcjogXCJoYW5kbGVyXCIsXG4gICAgICBtZW1vcnlTaXplOiAxMjgsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygxMCksXG4gICAgfVxuICApO1xuXG4gIHB1YmxpYyBJbWFnZVVwbG9hZFVybFJlc29sdmVyKCkge1xuICAgIHJldHVybiBuZXcgYXBwc3luYy5SZXNvbHZlcih0aGlzLCBcImdldEltYWdlVXBsb2FkVXJsXCIsIHtcbiAgICAgIGFwaTogdGhpcy5hcGksXG4gICAgICB0eXBlTmFtZTogXCJRdWVyeVwiLFxuICAgICAgZmllbGROYW1lOiBcImdldEltYWdlVXBsb2FkVXJsXCIsXG4gICAgICBkYXRhU291cmNlOiB0aGlzLmFwaS5hZGRMYW1iZGFEYXRhU291cmNlKFxuICAgICAgICBcImdldEltYWdlVXBsb2FkVXJsXCIsXG4gICAgICAgIHRoaXMuZ2V0SW1hZ2VVcGxvYWRVUkxmdW5jdGlvblxuICAgICAgKSxcbiAgICB9KTtcbiAgfVxufVxuIl19