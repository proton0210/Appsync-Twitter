"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NestedInReplyToTweet = void 0;
const appsync = require("@aws-cdk/aws-appsync-alpha");
const path = require("path");
const constructs_1 = require("constructs");
class NestedInReplyToTweet extends constructs_1.Construct {
    constructor(scope, id, api, tweetsTable) {
        super(scope, id);
        this.api = api;
        this.tweetsTable = tweetsTable;
        this.resolver = this.createNestedInReplyToTweetResolver();
    }
    createNestedInReplyToTweetResolver() {
        return this.api
            .addDynamoDbDataSource('NestedInReplyToTweetDataSource', this.tweetsTable)
            .createResolver({
            typeName: 'Reply',
            fieldName: 'inReplyToTweet',
            requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/Nested/InReplyToTweet/request.vtl')),
            responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/Nested/InReplyToTweet/response.vtl'))
        });
    }
}
exports.NestedInReplyToTweet = NestedInReplyToTweet;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTmVzdGVkSW5SZXBsVG9Ud2VldC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIk5lc3RlZEluUmVwbFRvVHdlZXQudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esc0RBQXNEO0FBQ3RELDZCQUE2QjtBQUM3QiwyQ0FBdUM7QUFFdkMsTUFBYSxvQkFBcUIsU0FBUSxzQkFBUztJQUtqRCxZQUNFLEtBQWdCLEVBQ2hCLEVBQVUsRUFDVixHQUF1QixFQUN2QixXQUFtQztRQUVuQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLFdBQVcsR0FBRyxXQUFXLENBQUM7UUFDL0IsSUFBSSxDQUFDLFFBQVEsR0FBRyxJQUFJLENBQUMsa0NBQWtDLEVBQUUsQ0FBQztJQUM1RCxDQUFDO0lBRU0sa0NBQWtDO1FBQ3ZDLE9BQU8sSUFBSSxDQUFDLEdBQUc7YUFDWixxQkFBcUIsQ0FBQyxnQ0FBZ0MsRUFBRSxJQUFJLENBQUMsV0FBVyxDQUFDO2FBQ3pFLGNBQWMsQ0FBQztZQUNkLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxnQkFBZ0I7WUFDM0Isc0JBQXNCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQ3RELElBQUksQ0FBQyxJQUFJLENBQ1AsU0FBUyxFQUNULHNEQUFzRCxDQUN2RCxDQUNGO1lBQ0QsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQ3ZELElBQUksQ0FBQyxJQUFJLENBQ1AsU0FBUyxFQUNULHVEQUF1RCxDQUN4RCxDQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGO0FBckNELG9EQXFDQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcHBzeW5jLWFscGhhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcblxuZXhwb3J0IGNsYXNzIE5lc3RlZEluUmVwbHlUb1R3ZWV0IGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpO1xuICBwdWJsaWMgdHdlZXRzVGFibGU6IGNkay5hd3NfZHluYW1vZGIuVGFibGU7XG4gIHB1YmxpYyByZXNvbHZlcjogYXBwc3luYy5SZXNvbHZlcjtcblxuICBjb25zdHJ1Y3RvcihcbiAgICBzY29wZTogQ29uc3RydWN0LFxuICAgIGlkOiBzdHJpbmcsXG4gICAgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGksXG4gICAgdHdlZXRzVGFibGU6IGNkay5hd3NfZHluYW1vZGIuVGFibGVcbiAgKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICB0aGlzLnR3ZWV0c1RhYmxlID0gdHdlZXRzVGFibGU7XG4gICAgdGhpcy5yZXNvbHZlciA9IHRoaXMuY3JlYXRlTmVzdGVkSW5SZXBseVRvVHdlZXRSZXNvbHZlcigpO1xuICB9XG5cbiAgcHVibGljIGNyZWF0ZU5lc3RlZEluUmVwbHlUb1R3ZWV0UmVzb2x2ZXIoKSB7XG4gICAgcmV0dXJuIHRoaXMuYXBpXG4gICAgICAuYWRkRHluYW1vRGJEYXRhU291cmNlKCdOZXN0ZWRJblJlcGx5VG9Ud2VldERhdGFTb3VyY2UnLCB0aGlzLnR3ZWV0c1RhYmxlKVxuICAgICAgLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgICAgdHlwZU5hbWU6ICdSZXBseScsXG4gICAgICAgIGZpZWxkTmFtZTogJ2luUmVwbHlUb1R3ZWV0JyxcbiAgICAgICAgcmVxdWVzdE1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZnJvbUZpbGUoXG4gICAgICAgICAgcGF0aC5qb2luKFxuICAgICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgICAgJy4uL3Jlc29sdmVycy9xdWVyeS9OZXN0ZWQvSW5SZXBseVRvVHdlZXQvcmVxdWVzdC52dGwnXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICByZXNwb25zZU1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZnJvbUZpbGUoXG4gICAgICAgICAgcGF0aC5qb2luKFxuICAgICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgICAgJy4uL3Jlc29sdmVycy9xdWVyeS9OZXN0ZWQvSW5SZXBseVRvVHdlZXQvcmVzcG9uc2UudnRsJ1xuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==