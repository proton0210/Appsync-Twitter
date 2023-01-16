"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetTweetsResolver = void 0;
const appsync = require("@aws-cdk/aws-appsync-alpha");
const constructs_1 = require("constructs");
const path = require("path");
class GetTweetsResolver extends constructs_1.Construct {
    constructor(scope, id, api, tweetsTable) {
        super(scope, id);
        this.api = api;
        this.tweetsTable = tweetsTable;
        this.resolver = this.createGetTweetsResolver();
    }
    createGetTweetsResolver() {
        return this.api
            .addDynamoDbDataSource('tweetsTableGetTweetsQuery', this.tweetsTable)
            .createResolver({
            typeName: 'Query',
            fieldName: 'getTweets',
            requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/getTweets/request.vtl')),
            responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/getTweets/response.vtl'))
        });
    }
}
exports.GetTweetsResolver = GetTweetsResolver;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0VHdlZXRzQ29uc3R1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJHZXRUd2VldHNDb25zdHVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzREFBc0Q7QUFDdEQsMkNBQXVDO0FBQ3ZDLDZCQUE2QjtBQUM3QixNQUFhLGlCQUFrQixTQUFRLHNCQUFTO0lBSTlDLFlBQ0UsS0FBZ0IsRUFDaEIsRUFBVSxFQUNWLEdBQXVCLEVBQ3ZCLFdBQW1DO1FBRW5DLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixJQUFJLENBQUMsV0FBVyxHQUFHLFdBQVcsQ0FBQztRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyx1QkFBdUIsRUFBRSxDQUFDO0lBQ2pELENBQUM7SUFDTSx1QkFBdUI7UUFDNUIsT0FBTyxJQUFJLENBQUMsR0FBRzthQUNaLHFCQUFxQixDQUFDLDJCQUEyQixFQUFFLElBQUksQ0FBQyxXQUFXLENBQUM7YUFDcEUsY0FBYyxDQUFDO1lBQ2QsUUFBUSxFQUFFLE9BQU87WUFDakIsU0FBUyxFQUFFLFdBQVc7WUFDdEIsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQ3RELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDBDQUEwQyxDQUFDLENBQ2pFO1lBQ0QsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQ3ZELElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxFQUFFLDJDQUEyQyxDQUFDLENBQ2xFO1NBQ0YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGO0FBN0JELDhDQTZCQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcHBzeW5jLWFscGhhJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBjbGFzcyBHZXRUd2VldHNSZXNvbHZlciBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyBhcGk6IGFwcHN5bmMuR3JhcGhxbEFwaTtcbiAgcHVibGljIHR3ZWV0c1RhYmxlOiBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlO1xuICBwdWJsaWMgcmVzb2x2ZXI6IGFwcHN5bmMuUmVzb2x2ZXI7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHNjb3BlOiBDb25zdHJ1Y3QsXG4gICAgaWQ6IHN0cmluZyxcbiAgICBhcGk6IGFwcHN5bmMuR3JhcGhxbEFwaSxcbiAgICB0d2VldHNUYWJsZTogY2RrLmF3c19keW5hbW9kYi5UYWJsZVxuICApIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIHRoaXMudHdlZXRzVGFibGUgPSB0d2VldHNUYWJsZTtcbiAgICB0aGlzLnJlc29sdmVyID0gdGhpcy5jcmVhdGVHZXRUd2VldHNSZXNvbHZlcigpO1xuICB9XG4gIHB1YmxpYyBjcmVhdGVHZXRUd2VldHNSZXNvbHZlcigpIHtcbiAgICByZXR1cm4gdGhpcy5hcGlcbiAgICAgIC5hZGREeW5hbW9EYkRhdGFTb3VyY2UoJ3R3ZWV0c1RhYmxlR2V0VHdlZXRzUXVlcnknLCB0aGlzLnR3ZWV0c1RhYmxlKVxuICAgICAgLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgICAgdHlwZU5hbWU6ICdRdWVyeScsXG4gICAgICAgIGZpZWxkTmFtZTogJ2dldFR3ZWV0cycsXG4gICAgICAgIHJlcXVlc3RNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmZyb21GaWxlKFxuICAgICAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9yZXNvbHZlcnMvcXVlcnkvZ2V0VHdlZXRzL3JlcXVlc3QudnRsJylcbiAgICAgICAgKSxcbiAgICAgICAgcmVzcG9uc2VNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmZyb21GaWxlKFxuICAgICAgICAgIHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9yZXNvbHZlcnMvcXVlcnkvZ2V0VHdlZXRzL3Jlc3BvbnNlLnZ0bCcpXG4gICAgICAgIClcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=