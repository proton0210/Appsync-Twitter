"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedProfileTweet = void 0;
const appsync = require("@aws-cdk/aws-appsync-alpha");
const path = require("path");
const constructs_1 = require("constructs");
class NestedProfileTweet extends constructs_1.Construct {
    constructor(scope, id, api, usersTable) {
        super(scope, id);
        this.api = api;
        this.usersTable = usersTable;
        this.resolver = this.createNestedProfileTweetResolver();
    }
    createNestedProfileTweetResolver() {
        return this.api
            .addDynamoDbDataSource('usersTableNestedProfileTweetQuery', this.usersTable)
            .createResolver({
            typeName: 'Tweet',
            fieldName: 'profile',
            requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/Nested/Tweet/request.vtl')),
            responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/Nested/Tweet/response.vtl'))
        });
    }
}
exports.NestedProfileTweet = NestedProfileTweet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmVzdGVkUHJvZmlsZV9UeXBlX1R3ZWV0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTmVzdGVkUHJvZmlsZV9UeXBlX1R3ZWV0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHNEQUFzRDtBQUN0RCw2QkFBNkI7QUFDN0IsMkNBQXVDO0FBRXZDLE1BQWEsa0JBQW1CLFNBQVEsc0JBQVM7SUFLL0MsWUFDRSxLQUFnQixFQUNoQixFQUFVLEVBQ1YsR0FBdUIsRUFDdkIsVUFBa0M7UUFFbEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGdDQUFnQyxFQUFFLENBQUM7SUFDMUQsQ0FBQztJQUVNLGdDQUFnQztRQUNyQyxPQUFPLElBQUksQ0FBQyxHQUFHO2FBQ1oscUJBQXFCLENBQ3BCLG1DQUFtQyxFQUNuQyxJQUFJLENBQUMsVUFBVSxDQUNoQjthQUNBLGNBQWMsQ0FBQztZQUNkLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxTQUFTO1lBQ3BCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw2Q0FBNkMsQ0FBQyxDQUNwRTtZQUNELHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw4Q0FBOEMsQ0FBQyxDQUNyRTtTQUNGLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRjtBQWxDRCxnREFrQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYy1hbHBoYSc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5cbmV4cG9ydCBjbGFzcyBOZXN0ZWRQcm9maWxlVHdlZXQgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGk7XG4gIHB1YmxpYyB1c2Vyc1RhYmxlOiBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlO1xuICBwdWJsaWMgcmVzb2x2ZXI6IGFwcHN5bmMuUmVzb2x2ZXI7XG5cbiAgY29uc3RydWN0b3IoXG4gICAgc2NvcGU6IENvbnN0cnVjdCxcbiAgICBpZDogc3RyaW5nLFxuICAgIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpLFxuICAgIHVzZXJzVGFibGU6IGNkay5hd3NfZHluYW1vZGIuVGFibGVcbiAgKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICB0aGlzLnVzZXJzVGFibGUgPSB1c2Vyc1RhYmxlO1xuICAgIHRoaXMucmVzb2x2ZXIgPSB0aGlzLmNyZWF0ZU5lc3RlZFByb2ZpbGVUd2VldFJlc29sdmVyKCk7XG4gIH1cblxuICBwdWJsaWMgY3JlYXRlTmVzdGVkUHJvZmlsZVR3ZWV0UmVzb2x2ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBpXG4gICAgICAuYWRkRHluYW1vRGJEYXRhU291cmNlKFxuICAgICAgICAndXNlcnNUYWJsZU5lc3RlZFByb2ZpbGVUd2VldFF1ZXJ5JyxcbiAgICAgICAgdGhpcy51c2Vyc1RhYmxlXG4gICAgICApXG4gICAgICAuY3JlYXRlUmVzb2x2ZXIoe1xuICAgICAgICB0eXBlTmFtZTogJ1R3ZWV0JyxcbiAgICAgICAgZmllbGROYW1lOiAncHJvZmlsZScsXG4gICAgICAgIHJlcXVlc3RNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmZyb21GaWxlKFxuICAgICAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9yZXNvbHZlcnMvcXVlcnkvTmVzdGVkL1R3ZWV0L3JlcXVlc3QudnRsJylcbiAgICAgICAgKSxcbiAgICAgICAgcmVzcG9uc2VNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmZyb21GaWxlKFxuICAgICAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9yZXNvbHZlcnMvcXVlcnkvTmVzdGVkL1R3ZWV0L3Jlc3BvbnNlLnZ0bCcpXG4gICAgICAgIClcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=