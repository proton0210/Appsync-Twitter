"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.GetFollowing = void 0;
const appsync = require("@aws-cdk/aws-appsync-alpha");
const constructs_1 = require("constructs");
const path = require("path");
class GetFollowing extends constructs_1.Construct {
    constructor(scope, id, api, relationShipsTable, usersTable) {
        super(scope, id);
        this.api = api;
        this.relationShipsTable = relationShipsTable;
        this.usersTable = usersTable;
        this.resolver = this.createGetFollowing();
    }
    createGetFollowing() {
        // create a  appsync Function
        const GetFollowingFunction = new appsync.AppsyncFunction(this, 'GetFollowingFunction', {
            api: this.api,
            dataSource: this.api.addDynamoDbDataSource('RelationShipsTableForGetFollowingPipeline', this.relationShipsTable),
            name: 'GetFollowing',
            description: 'Get all followers of a user pipeline',
            requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/GetFollowing/request.vtl')),
            responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/GetFollowing/response.vtl'))
        });
        const hydrateFollowersFunction = new appsync.AppsyncFunction(this, 'HydrateFollowersFunction', {
            api: this.api,
            dataSource: this.api.addDynamoDbDataSource('UsersTableForGetFollowingPipeline', this.usersTable),
            name: 'hydrateFollowers',
            description: 'Get all followers of a user',
            requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/GetFollowing/hydrateFollowing/request.vtl')),
            responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/GetFollowing/hydrateFollowing/response.vtl'))
        });
        return this.api.createResolver({
            typeName: 'Query',
            fieldName: 'getFollowing',
            requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/SimplePipeline/request.vtl')),
            pipelineConfig: [GetFollowingFunction, hydrateFollowersFunction],
            responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/query/SimplePipeline/response.vtl'))
        });
    }
}
exports.GetFollowing = GetFollowing;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR2V0Rm9sbG93aW5nQ29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiR2V0Rm9sbG93aW5nQ29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHNEQUFzRDtBQUN0RCwyQ0FBdUM7QUFDdkMsNkJBQTZCO0FBQzdCLE1BQWEsWUFBYSxTQUFRLHNCQUFTO0lBS3pDLFlBQ0UsS0FBZ0IsRUFDaEIsRUFBVSxFQUNWLEdBQXVCLEVBQ3ZCLGtCQUEwQyxFQUMxQyxVQUFrQztRQUVsQyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLElBQUksQ0FBQyxHQUFHLEdBQUcsR0FBRyxDQUFDO1FBQ2YsSUFBSSxDQUFDLGtCQUFrQixHQUFHLGtCQUFrQixDQUFDO1FBQzdDLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLGtCQUFrQixFQUFFLENBQUM7SUFDNUMsQ0FBQztJQUNNLGtCQUFrQjtRQUN2Qiw2QkFBNkI7UUFDN0IsTUFBTSxvQkFBb0IsR0FBRyxJQUFJLE9BQU8sQ0FBQyxlQUFlLENBQ3RELElBQUksRUFDSixzQkFBc0IsRUFDdEI7WUFDRSxHQUFHLEVBQUUsSUFBSSxDQUFDLEdBQUc7WUFDYixVQUFVLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxxQkFBcUIsQ0FDeEMsMkNBQTJDLEVBQzNDLElBQUksQ0FBQyxrQkFBa0IsQ0FDeEI7WUFDRCxJQUFJLEVBQUUsY0FBYztZQUNwQixXQUFXLEVBQUUsc0NBQXNDO1lBQ25ELHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw2Q0FBNkMsQ0FBQyxDQUNwRTtZQUNELHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSw4Q0FBOEMsQ0FBQyxDQUNyRTtTQUNGLENBQ0YsQ0FBQztRQUNGLE1BQU0sd0JBQXdCLEdBQUcsSUFBSSxPQUFPLENBQUMsZUFBZSxDQUMxRCxJQUFJLEVBQ0osMEJBQTBCLEVBQzFCO1lBQ0UsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO1lBQ2IsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMscUJBQXFCLENBQ3hDLG1DQUFtQyxFQUNuQyxJQUFJLENBQUMsVUFBVSxDQUNoQjtZQUNELElBQUksRUFBRSxrQkFBa0I7WUFDeEIsV0FBVyxFQUFFLDZCQUE2QjtZQUMxQyxzQkFBc0IsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FDdEQsSUFBSSxDQUFDLElBQUksQ0FDUCxTQUFTLEVBQ1QsOERBQThELENBQy9ELENBQ0Y7WUFDRCx1QkFBdUIsRUFBRSxPQUFPLENBQUMsZUFBZSxDQUFDLFFBQVEsQ0FDdkQsSUFBSSxDQUFDLElBQUksQ0FDUCxTQUFTLEVBQ1QsK0RBQStELENBQ2hFLENBQ0Y7U0FDRixDQUNGLENBQUM7UUFFRixPQUFPLElBQUksQ0FBQyxHQUFHLENBQUMsY0FBYyxDQUFDO1lBQzdCLFFBQVEsRUFBRSxPQUFPO1lBQ2pCLFNBQVMsRUFBRSxjQUFjO1lBQ3pCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN0RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSwrQ0FBK0MsQ0FBQyxDQUN0RTtZQUNELGNBQWMsRUFBRSxDQUFDLG9CQUFvQixFQUFFLHdCQUF3QixDQUFDO1lBQ2hFLHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN2RCxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxnREFBZ0QsQ0FBQyxDQUN2RTtTQUNGLENBQUMsQ0FBQztJQUNMLENBQUM7Q0FDRjtBQTdFRCxvQ0E2RUMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYy1hbHBoYSc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5leHBvcnQgY2xhc3MgR2V0Rm9sbG93aW5nIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpO1xuICBwdWJsaWMgcmVsYXRpb25TaGlwc1RhYmxlOiBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlO1xuICBwdWJsaWMgdXNlcnNUYWJsZTogY2RrLmF3c19keW5hbW9kYi5UYWJsZTtcbiAgcHVibGljIHJlc29sdmVyOiBhcHBzeW5jLlJlc29sdmVyO1xuICBjb25zdHJ1Y3RvcihcbiAgICBzY29wZTogQ29uc3RydWN0LFxuICAgIGlkOiBzdHJpbmcsXG4gICAgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGksXG4gICAgcmVsYXRpb25TaGlwc1RhYmxlOiBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlLFxuICAgIHVzZXJzVGFibGU6IGNkay5hd3NfZHluYW1vZGIuVGFibGVcbiAgKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICB0aGlzLnJlbGF0aW9uU2hpcHNUYWJsZSA9IHJlbGF0aW9uU2hpcHNUYWJsZTtcbiAgICB0aGlzLnVzZXJzVGFibGUgPSB1c2Vyc1RhYmxlO1xuICAgIHRoaXMucmVzb2x2ZXIgPSB0aGlzLmNyZWF0ZUdldEZvbGxvd2luZygpO1xuICB9XG4gIHB1YmxpYyBjcmVhdGVHZXRGb2xsb3dpbmcoKSB7XG4gICAgLy8gY3JlYXRlIGEgIGFwcHN5bmMgRnVuY3Rpb25cbiAgICBjb25zdCBHZXRGb2xsb3dpbmdGdW5jdGlvbiA9IG5ldyBhcHBzeW5jLkFwcHN5bmNGdW5jdGlvbihcbiAgICAgIHRoaXMsXG4gICAgICAnR2V0Rm9sbG93aW5nRnVuY3Rpb24nLFxuICAgICAge1xuICAgICAgICBhcGk6IHRoaXMuYXBpLFxuICAgICAgICBkYXRhU291cmNlOiB0aGlzLmFwaS5hZGREeW5hbW9EYkRhdGFTb3VyY2UoXG4gICAgICAgICAgJ1JlbGF0aW9uU2hpcHNUYWJsZUZvckdldEZvbGxvd2luZ1BpcGVsaW5lJyxcbiAgICAgICAgICB0aGlzLnJlbGF0aW9uU2hpcHNUYWJsZVxuICAgICAgICApLFxuICAgICAgICBuYW1lOiAnR2V0Rm9sbG93aW5nJyxcbiAgICAgICAgZGVzY3JpcHRpb246ICdHZXQgYWxsIGZvbGxvd2VycyBvZiBhIHVzZXIgcGlwZWxpbmUnLFxuICAgICAgICByZXF1ZXN0TWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5mcm9tRmlsZShcbiAgICAgICAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vcmVzb2x2ZXJzL3F1ZXJ5L0dldEZvbGxvd2luZy9yZXF1ZXN0LnZ0bCcpXG4gICAgICAgICksXG4gICAgICAgIHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5mcm9tRmlsZShcbiAgICAgICAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCAnLi4vcmVzb2x2ZXJzL3F1ZXJ5L0dldEZvbGxvd2luZy9yZXNwb25zZS52dGwnKVxuICAgICAgICApXG4gICAgICB9XG4gICAgKTtcbiAgICBjb25zdCBoeWRyYXRlRm9sbG93ZXJzRnVuY3Rpb24gPSBuZXcgYXBwc3luYy5BcHBzeW5jRnVuY3Rpb24oXG4gICAgICB0aGlzLFxuICAgICAgJ0h5ZHJhdGVGb2xsb3dlcnNGdW5jdGlvbicsXG4gICAgICB7XG4gICAgICAgIGFwaTogdGhpcy5hcGksXG4gICAgICAgIGRhdGFTb3VyY2U6IHRoaXMuYXBpLmFkZER5bmFtb0RiRGF0YVNvdXJjZShcbiAgICAgICAgICAnVXNlcnNUYWJsZUZvckdldEZvbGxvd2luZ1BpcGVsaW5lJyxcbiAgICAgICAgICB0aGlzLnVzZXJzVGFibGVcbiAgICAgICAgKSxcbiAgICAgICAgbmFtZTogJ2h5ZHJhdGVGb2xsb3dlcnMnLFxuICAgICAgICBkZXNjcmlwdGlvbjogJ0dldCBhbGwgZm9sbG93ZXJzIG9mIGEgdXNlcicsXG4gICAgICAgIHJlcXVlc3RNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmZyb21GaWxlKFxuICAgICAgICAgIHBhdGguam9pbihcbiAgICAgICAgICAgIF9fZGlybmFtZSxcbiAgICAgICAgICAgICcuLi9yZXNvbHZlcnMvcXVlcnkvR2V0Rm9sbG93aW5nL2h5ZHJhdGVGb2xsb3dpbmcvcmVxdWVzdC52dGwnXG4gICAgICAgICAgKVxuICAgICAgICApLFxuICAgICAgICByZXNwb25zZU1hcHBpbmdUZW1wbGF0ZTogYXBwc3luYy5NYXBwaW5nVGVtcGxhdGUuZnJvbUZpbGUoXG4gICAgICAgICAgcGF0aC5qb2luKFxuICAgICAgICAgICAgX19kaXJuYW1lLFxuICAgICAgICAgICAgJy4uL3Jlc29sdmVycy9xdWVyeS9HZXRGb2xsb3dpbmcvaHlkcmF0ZUZvbGxvd2luZy9yZXNwb25zZS52dGwnXG4gICAgICAgICAgKVxuICAgICAgICApXG4gICAgICB9XG4gICAgKTtcblxuICAgIHJldHVybiB0aGlzLmFwaS5jcmVhdGVSZXNvbHZlcih7XG4gICAgICB0eXBlTmFtZTogJ1F1ZXJ5JyxcbiAgICAgIGZpZWxkTmFtZTogJ2dldEZvbGxvd2luZycsXG4gICAgICByZXF1ZXN0TWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5mcm9tRmlsZShcbiAgICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc29sdmVycy9xdWVyeS9TaW1wbGVQaXBlbGluZS9yZXF1ZXN0LnZ0bCcpXG4gICAgICApLFxuICAgICAgcGlwZWxpbmVDb25maWc6IFtHZXRGb2xsb3dpbmdGdW5jdGlvbiwgaHlkcmF0ZUZvbGxvd2Vyc0Z1bmN0aW9uXSxcbiAgICAgIHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5mcm9tRmlsZShcbiAgICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc29sdmVycy9xdWVyeS9TaW1wbGVQaXBlbGluZS9yZXNwb25zZS52dGwnKVxuICAgICAgKVxuICAgIH0pO1xuICB9XG59XG4iXX0=