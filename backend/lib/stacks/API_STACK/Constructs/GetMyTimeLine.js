"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetMyTimeLine = void 0;
const constructs_1 = require("constructs");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const path = require("path");
class GetMyTimeLine extends constructs_1.Construct {
    constructor(scope, id, api, timeLineTable) {
        super(scope, id);
        this.api = api;
        this.timeLineTable = timeLineTable;
        this.resolver = this.createGetMyTimeLineResolver();
    }
    createGetMyTimeLineResolver() {
        return this.api
            .addDynamoDbDataSource('GetMyTimeLineTableQueryResolver', this.timeLineTable)
            .createResolver({
            typeName: 'Query',
            fieldName: 'getMyTimeline',
            requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/getMyTimeLine/request.vtl')),
            responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/getMyTimeLine/response.vtl'))
        });
    }
}
exports.GetMyTimeLine = GetMyTimeLine;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0TXlUaW1lTGluZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkdldE15VGltZUxpbmUudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0EsMkNBQXVDO0FBQ3ZDLHNEQUFzRDtBQUN0RCw2QkFBNkI7QUFFN0IsTUFBYSxhQUFjLFNBQVEsc0JBQVM7SUFJMUMsWUFDRSxLQUFnQixFQUNoQixFQUFVLEVBQ1YsR0FBdUIsRUFDdkIsYUFBcUM7UUFFckMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxhQUFhLEdBQUcsYUFBYSxDQUFDO1FBQ25DLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLDJCQUEyQixFQUFFLENBQUM7SUFDckQsQ0FBQztJQUVNLDJCQUEyQjtRQUNoQyxPQUFPLElBQUksQ0FBQyxHQUFHO2FBQ1oscUJBQXFCLENBQ3BCLGlDQUFpQyxFQUNqQyxJQUFJLENBQUMsYUFBYSxDQUNuQjthQUNBLGNBQWMsQ0FBQztZQUNkLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxlQUFlO1lBQzFCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw4Q0FBOEMsQ0FBQyxDQUNyRTtZQUNELHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSwrQ0FBK0MsQ0FBQyxDQUN0RTtTQUNGLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRjtBQWpDRCxzQ0FpQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcHBzeW5jLWFscGhhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5cbmV4cG9ydCBjbGFzcyBHZXRNeVRpbWVMaW5lIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpO1xuICBwdWJsaWMgdGltZUxpbmVUYWJsZTogY2RrLmF3c19keW5hbW9kYi5UYWJsZTtcbiAgcHVibGljIHJlc29sdmVyOiBhcHBzeW5jLlJlc29sdmVyO1xuICBjb25zdHJ1Y3RvcihcbiAgICBzY29wZTogQ29uc3RydWN0LFxuICAgIGlkOiBzdHJpbmcsXG4gICAgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGksXG4gICAgdGltZUxpbmVUYWJsZTogY2RrLmF3c19keW5hbW9kYi5UYWJsZVxuICApIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIHRoaXMudGltZUxpbmVUYWJsZSA9IHRpbWVMaW5lVGFibGU7XG4gICAgdGhpcy5yZXNvbHZlciA9IHRoaXMuY3JlYXRlR2V0TXlUaW1lTGluZVJlc29sdmVyKCk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlR2V0TXlUaW1lTGluZVJlc29sdmVyKCkge1xuICAgIHJldHVybiB0aGlzLmFwaVxuICAgICAgLmFkZER5bmFtb0RiRGF0YVNvdXJjZShcbiAgICAgICAgJ0dldE15VGltZUxpbmVUYWJsZVF1ZXJ5UmVzb2x2ZXInLFxuICAgICAgICB0aGlzLnRpbWVMaW5lVGFibGVcbiAgICAgIClcbiAgICAgIC5jcmVhdGVSZXNvbHZlcih7XG4gICAgICAgIHR5cGVOYW1lOiAnUXVlcnknLFxuICAgICAgICBmaWVsZE5hbWU6ICdnZXRNeVRpbWVsaW5lJyxcbiAgICAgICAgcmVxdWVzdE1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZnJvbUZpbGUoXG4gICAgICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc29sdmVycy9xdWVyeS9nZXRNeVRpbWVMaW5lL3JlcXVlc3QudnRsJylcbiAgICAgICAgKSxcbiAgICAgICAgcmVzcG9uc2VNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmZyb21GaWxlKFxuICAgICAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9yZXNvbHZlcnMvcXVlcnkvZ2V0TXlUaW1lTGluZS9yZXNwb25zZS52dGwnKVxuICAgICAgICApXG4gICAgICB9KTtcbiAgfVxufVxuIl19