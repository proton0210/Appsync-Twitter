"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StorageStack = void 0;
const UserImageBucket_1 = require("./Constructs/UserImageBucket");
const cdk = require("aws-cdk-lib");
class StorageStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.imageUploadFunction = props.imageUploadFunction;
        this.initializeUserImageBucket();
    }
    initializeUserImageBucket() {
        const bucket = new UserImageBucket_1.UserImageBucket(this, "UserImageBucket");
        bucket.userImageBucket.grantReadWrite(this.imageUploadFunction);
        // Important Put ACL
        bucket.userImageBucket.grantPutAcl(this.imageUploadFunction);
        new cdk.CfnOutput(this, "UserImageBucketName", {
            value: bucket.userImageBucket.bucketName,
        });
    }
}
exports.StorageStack = StorageStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmFnZS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbInN0b3JhZ2Utc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esa0VBQStEO0FBQy9ELG1DQUFtQztBQUduQyxNQUFhLFlBQWEsU0FBUSxHQUFHLENBQUMsS0FBSztJQUV6QyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQTRCO1FBQ3BFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxtQkFBbUIsR0FBRyxLQUFLLENBQUMsbUJBQW1CLENBQUM7UUFDckQsSUFBSSxDQUFDLHlCQUF5QixFQUFFLENBQUM7SUFDbkMsQ0FBQztJQUNNLHlCQUF5QjtRQUM5QixNQUFNLE1BQU0sR0FBRyxJQUFJLGlDQUFlLENBQUMsSUFBSSxFQUFFLGlCQUFpQixDQUFDLENBQUM7UUFDNUQsTUFBTSxDQUFDLGVBQWUsQ0FBQyxjQUFjLENBQUMsSUFBSSxDQUFDLG1CQUFtQixDQUFDLENBQUM7UUFDaEUsb0JBQW9CO1FBQ3BCLE1BQU0sQ0FBQyxlQUFlLENBQUMsV0FBVyxDQUFDLElBQUksQ0FBQyxtQkFBbUIsQ0FBQyxDQUFDO1FBRTdELElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUscUJBQXFCLEVBQUU7WUFDN0MsS0FBSyxFQUFFLE1BQU0sQ0FBQyxlQUFlLENBQUMsVUFBVTtTQUN6QyxDQUFDLENBQUM7SUFDTCxDQUFDO0NBQ0Y7QUFqQkQsb0NBaUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgU3RvcmFnZUludGVyZmFjZVByb3BzIH0gZnJvbSBcIi4vLi4vLi4vLi4vSW50ZXJmYWNlcy9zdG9yYWdlLWludGVyZmFjZVwiO1xuaW1wb3J0IHsgVXNlckltYWdlQnVja2V0IH0gZnJvbSBcIi4vQ29uc3RydWN0cy9Vc2VySW1hZ2VCdWNrZXRcIjtcbmltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5cbmV4cG9ydCBjbGFzcyBTdG9yYWdlU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBwdWJsaWMgcmVhZG9ubHkgaW1hZ2VVcGxvYWRGdW5jdGlvbjogY2RrLmF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uO1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogU3RvcmFnZUludGVyZmFjZVByb3BzKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkLCBwcm9wcyk7XG4gICAgdGhpcy5pbWFnZVVwbG9hZEZ1bmN0aW9uID0gcHJvcHMuaW1hZ2VVcGxvYWRGdW5jdGlvbjtcbiAgICB0aGlzLmluaXRpYWxpemVVc2VySW1hZ2VCdWNrZXQoKTtcbiAgfVxuICBwdWJsaWMgaW5pdGlhbGl6ZVVzZXJJbWFnZUJ1Y2tldCgpIHtcbiAgICBjb25zdCBidWNrZXQgPSBuZXcgVXNlckltYWdlQnVja2V0KHRoaXMsIFwiVXNlckltYWdlQnVja2V0XCIpO1xuICAgIGJ1Y2tldC51c2VySW1hZ2VCdWNrZXQuZ3JhbnRSZWFkV3JpdGUodGhpcy5pbWFnZVVwbG9hZEZ1bmN0aW9uKTtcbiAgICAvLyBJbXBvcnRhbnQgUHV0IEFDTFxuICAgIGJ1Y2tldC51c2VySW1hZ2VCdWNrZXQuZ3JhbnRQdXRBY2wodGhpcy5pbWFnZVVwbG9hZEZ1bmN0aW9uKTtcblxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsIFwiVXNlckltYWdlQnVja2V0TmFtZVwiLCB7XG4gICAgICB2YWx1ZTogYnVja2V0LnVzZXJJbWFnZUJ1Y2tldC5idWNrZXROYW1lLFxuICAgIH0pO1xuICB9XG59XG4iXX0=