"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedFollowingOtherProfile = void 0;
const appsync = require("@aws-cdk/aws-appsync-alpha");
const path = require("path");
const constructs_1 = require("constructs");
class NestedFollowingOtherProfile extends constructs_1.Construct {
    constructor(scope, id, api, relationShipsTable) {
        super(scope, id);
        this.api = api;
        this.relationShipsTable = relationShipsTable;
        this.resolver = this.createNestedFollowingOtherProfileResolver();
    }
    createNestedFollowingOtherProfileResolver() {
        return this.api
            .addDynamoDbDataSource('NestedFollowingOtherProfileDataSource', this.relationShipsTable)
            .createResolver({
            typeName: 'OtherProfile',
            fieldName: 'following',
            requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/Nested/FollowingOtherProfile/request.vtl')),
            responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/Nested/FollowingOtherProfile/response.vtl'))
        });
    }
}
exports.NestedFollowingOtherProfile = NestedFollowingOtherProfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmVzdGVkRm9sbG93aW5nUHJvZmllLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTmVzdGVkRm9sbG93aW5nUHJvZmllLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHNEQUFzRDtBQUN0RCw2QkFBNkI7QUFDN0IsMkNBQXVDO0FBRXZDLE1BQWEsMkJBQTRCLFNBQVEsc0JBQVM7SUFLeEQsWUFDRSxLQUFnQixFQUNoQixFQUFVLEVBQ1YsR0FBdUIsRUFDdkIsa0JBQTBDO1FBRTFDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsa0JBQWtCLEdBQUcsa0JBQWtCLENBQUM7UUFDN0MsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMseUNBQXlDLEVBQUUsQ0FBQztJQUNuRSxDQUFDO0lBRU0seUNBQXlDO1FBQzlDLE9BQU8sSUFBSSxDQUFDLEdBQUc7YUFDWixxQkFBcUIsQ0FDcEIsdUNBQXVDLEVBQ3ZDLElBQUksQ0FBQyxrQkFBa0IsQ0FDeEI7YUFDQSxjQUFjLENBQUM7WUFDZCxRQUFRLEVBQUUsY0FBYztZQUN4QixTQUFTLEVBQUUsV0FBVztZQUN0QixzQkFBc0IsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FDdEQsSUFBSSxDQUFDLElBQUksQ0FDUCxTQUFTLEVBQ1QsNkRBQTZELENBQzlELENBQ0Y7WUFDRCx1QkFBdUIsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FDdkQsSUFBSSxDQUFDLElBQUksQ0FDUCxTQUFTLEVBQ1QsOERBQThELENBQy9ELENBQ0Y7U0FDRixDQUFDLENBQUM7SUFDUCxDQUFDO0NBQ0Y7QUF4Q0Qsa0VBd0NDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSAnQGF3cy1jZGsvYXdzLWFwcHN5bmMtYWxwaGEnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuXG5leHBvcnQgY2xhc3MgTmVzdGVkRm9sbG93aW5nT3RoZXJQcm9maWxlIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpO1xuICBwdWJsaWMgcmVsYXRpb25TaGlwc1RhYmxlOiBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlO1xuICBwdWJsaWMgcmVzb2x2ZXI6IGFwcHN5bmMuUmVzb2x2ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgc2NvcGU6IENvbnN0cnVjdCxcbiAgICBpZDogc3RyaW5nLFxuICAgIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpLFxuICAgIHJlbGF0aW9uU2hpcHNUYWJsZTogY2RrLmF3c19keW5hbW9kYi5UYWJsZVxuICApIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIHRoaXMucmVsYXRpb25TaGlwc1RhYmxlID0gcmVsYXRpb25TaGlwc1RhYmxlO1xuICAgIHRoaXMucmVzb2x2ZXIgPSB0aGlzLmNyZWF0ZU5lc3RlZEZvbGxvd2luZ090aGVyUHJvZmlsZVJlc29sdmVyKCk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlTmVzdGVkRm9sbG93aW5nT3RoZXJQcm9maWxlUmVzb2x2ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBpXG4gICAgICAuYWRkRHluYW1vRGJEYXRhU291cmNlKFxuICAgICAgICAnTmVzdGVkRm9sbG93aW5nT3RoZXJQcm9maWxlRGF0YVNvdXJjZScsXG4gICAgICAgIHRoaXMucmVsYXRpb25TaGlwc1RhYmxlXG4gICAgICApXG4gICAgICAuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgICB0eXBlTmFtZTogJ090aGVyUHJvZmlsZScsXG4gICAgICAgIGZpZWxkTmFtZTogJ2ZvbGxvd2luZycsXG4gICAgICAgIHJlcXVlc3RNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmZyb21GaWxlKFxuICAgICAgICAgIHBhdGguam9pbihcbiAgICAgICAgICAgIF9fZGlybmFtZSxcbiAgICAgICAgICAgICcuLi9yZXNvbHZlcnMvcXVlcnkvTmVzdGVkL0ZvbGxvd2luZ090aGVyUHJvZmlsZS9yZXF1ZXN0LnZ0bCdcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5mcm9tRmlsZShcbiAgICAgICAgICBwYXRoLmpvaW4oXG4gICAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgICAnLi4vcmVzb2x2ZXJzL3F1ZXJ5L05lc3RlZC9Gb2xsb3dpbmdPdGhlclByb2ZpbGUvcmVzcG9uc2UudnRsJ1xuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==