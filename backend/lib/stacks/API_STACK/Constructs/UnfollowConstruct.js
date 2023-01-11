"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UnFollow = void 0;
const appsync = require("@aws-cdk/aws-appsync-alpha");
const constructs_1 = require("constructs");
const path = require("path");
class UnFollow extends constructs_1.Construct {
    constructor(scope, id, api, relationShipsTable) {
        super(scope, id);
        this.api = api;
        this.relationShipsTable = relationShipsTable;
        this.resolver = this.createUnFollow();
    }
    createUnFollow() {
        return this.api
            .addDynamoDbDataSource('UnFollowMutation', this.relationShipsTable)
            .createResolver({
            typeName: 'Mutation',
            fieldName: 'unfollow',
            requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/mutations/UnFollow/request.vtl')),
            responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/mutations/UnFollow/response.vtl'))
        });
    }
}
exports.UnFollow = UnFollow;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVW5mb2xsb3dDb25zdHJ1Y3QuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJVbmZvbGxvd0NvbnN0cnVjdC50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFDQSxzREFBc0Q7QUFDdEQsMkNBQXVDO0FBQ3ZDLDZCQUE2QjtBQUM3QixNQUFhLFFBQVMsU0FBUSxzQkFBUztJQUlyQyxZQUNFLEtBQWdCLEVBQ2hCLEVBQVUsRUFDVixHQUF1QixFQUN2QixrQkFBMEM7UUFFMUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxjQUFjLEVBQUUsQ0FBQztJQUN4QyxDQUFDO0lBQ00sY0FBYztRQUNuQixPQUFPLElBQUksQ0FBQyxHQUFHO2FBQ1oscUJBQXFCLENBQUMsa0JBQWtCLEVBQUUsSUFBSSxDQUFDLGtCQUFrQixDQUFDO2FBQ2xFLGNBQWMsQ0FBQztZQUNkLFFBQVEsRUFBRSxVQUFVO1lBQ3BCLFNBQVMsRUFBRSxVQUFVO1lBQ3JCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw2Q0FBNkMsQ0FBQyxDQUNwRTtZQUNELHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw4Q0FBOEMsQ0FBQyxDQUNyRTtTQUNGLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRjtBQTdCRCw0QkE2QkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYy1hbHBoYSc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5leHBvcnQgY2xhc3MgVW5Gb2xsb3cgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGk7XG4gIHB1YmxpYyByZWxhdGlvblNoaXBzVGFibGU6IGNkay5hd3NfZHluYW1vZGIuVGFibGU7XG4gIHB1YmxpYyByZXNvbHZlcjogYXBwc3luYy5SZXNvbHZlcjtcbiAgY29uc3RydWN0b3IoXG4gICAgc2NvcGU6IENvbnN0cnVjdCxcbiAgICBpZDogc3RyaW5nLFxuICAgIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpLFxuICAgIHJlbGF0aW9uU2hpcHNUYWJsZTogY2RrLmF3c19keW5hbW9kYi5UYWJsZVxuICApIHtcbiAgICBzdXBlcihzY29wZSwgaWQpO1xuICAgIHRoaXMuYXBpID0gYXBpO1xuICAgIHRoaXMucmVsYXRpb25TaGlwc1RhYmxlID0gcmVsYXRpb25TaGlwc1RhYmxlO1xuICAgIHRoaXMucmVzb2x2ZXIgPSB0aGlzLmNyZWF0ZVVuRm9sbG93KCk7XG4gIH1cbiAgcHVibGljIGNyZWF0ZVVuRm9sbG93KCkge1xuICAgIHJldHVybiB0aGlzLmFwaVxuICAgICAgLmFkZER5bmFtb0RiRGF0YVNvdXJjZSgnVW5Gb2xsb3dNdXRhdGlvbicsIHRoaXMucmVsYXRpb25TaGlwc1RhYmxlKVxuICAgICAgLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgICAgdHlwZU5hbWU6ICdNdXRhdGlvbicsXG4gICAgICAgIGZpZWxkTmFtZTogJ3VuZm9sbG93JyxcbiAgICAgICAgcmVxdWVzdE1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZnJvbUZpbGUoXG4gICAgICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc29sdmVycy9tdXRhdGlvbnMvVW5Gb2xsb3cvcmVxdWVzdC52dGwnKVxuICAgICAgICApLFxuICAgICAgICByZXNwb25zZU1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZnJvbUZpbGUoXG4gICAgICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc29sdmVycy9tdXRhdGlvbnMvVW5Gb2xsb3cvcmVzcG9uc2UudnRsJylcbiAgICAgICAgKVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==