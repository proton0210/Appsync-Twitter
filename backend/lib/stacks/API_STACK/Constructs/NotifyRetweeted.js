"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.NotifyRetweeted = void 0;
const appsync = require("@aws-cdk/aws-appsync-alpha");
const constructs_1 = require("constructs");
const path = require("path");
class NotifyRetweeted extends constructs_1.Construct {
    constructor(scope, id, api, notificationsTable) {
        super(scope, id);
        this.api = api;
        this.notificationsTable = notificationsTable;
        this.resolver = this.NotifyRetweeted();
    }
    NotifyRetweeted() {
        // first arg should always be different!
        return this.api
            .addDynamoDbDataSource('NotificationsTable', this.notificationsTable)
            .createResolver({
            typeName: 'Mutation',
            fieldName: 'notifyRetweeted',
            requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/mutations/NotifyRetweeted/request.vtl')),
            responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, '../resolvers/mutations/NotifyRetweeted/response.vtl'))
        });
    }
}
exports.NotifyRetweeted = NotifyRetweeted;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90aWZ5UmV0d2VldGVkLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiTm90aWZ5UmV0d2VldGVkLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUNBLHNEQUFzRDtBQUN0RCwyQ0FBdUM7QUFDdkMsNkJBQTZCO0FBQzdCLE1BQWEsZUFBZ0IsU0FBUSxzQkFBUztJQUk1QyxZQUNFLEtBQWdCLEVBQ2hCLEVBQVUsRUFDVixHQUF1QixFQUN2QixrQkFBMEM7UUFFMUMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxrQkFBa0IsR0FBRyxrQkFBa0IsQ0FBQztRQUM3QyxJQUFJLENBQUMsUUFBUSxHQUFHLElBQUksQ0FBQyxlQUFlLEVBQUUsQ0FBQztJQUN6QyxDQUFDO0lBQ00sZUFBZTtRQUNwQix3Q0FBd0M7UUFDeEMsT0FBTyxJQUFJLENBQUMsR0FBRzthQUNaLHFCQUFxQixDQUFDLG9CQUFvQixFQUFFLElBQUksQ0FBQyxrQkFBa0IsQ0FBQzthQUNwRSxjQUFjLENBQUM7WUFDZCxRQUFRLEVBQUUsVUFBVTtZQUNwQixTQUFTLEVBQUUsaUJBQWlCO1lBQzVCLHNCQUFzQixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN0RCxJQUFJLENBQUMsSUFBSSxDQUNQLFNBQVMsRUFDVCxvREFBb0QsQ0FDckQsQ0FDRjtZQUNELHVCQUF1QixFQUFFLE9BQU8sQ0FBQyxlQUFlLENBQUMsUUFBUSxDQUN2RCxJQUFJLENBQUMsSUFBSSxDQUNQLFNBQVMsRUFDVCxxREFBcUQsQ0FDdEQsQ0FDRjtTQUNGLENBQUMsQ0FBQztJQUNQLENBQUM7Q0FDRjtBQXBDRCwwQ0FvQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYy1hbHBoYSc7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5leHBvcnQgY2xhc3MgTm90aWZ5UmV0d2VldGVkIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpO1xuICBwdWJsaWMgbm90aWZpY2F0aW9uc1RhYmxlOiBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlO1xuICBwdWJsaWMgcmVzb2x2ZXI6IGFwcHN5bmMuUmVzb2x2ZXI7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHNjb3BlOiBDb25zdHJ1Y3QsXG4gICAgaWQ6IHN0cmluZyxcbiAgICBhcGk6IGFwcHN5bmMuR3JhcGhxbEFwaSxcbiAgICBub3RpZmljYXRpb25zVGFibGU6IGNkay5hd3NfZHluYW1vZGIuVGFibGVcbiAgKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICB0aGlzLmFwaSA9IGFwaTtcbiAgICB0aGlzLm5vdGlmaWNhdGlvbnNUYWJsZSA9IG5vdGlmaWNhdGlvbnNUYWJsZTtcbiAgICB0aGlzLnJlc29sdmVyID0gdGhpcy5Ob3RpZnlSZXR3ZWV0ZWQoKTtcbiAgfVxuICBwdWJsaWMgTm90aWZ5UmV0d2VldGVkKCkge1xuICAgIC8vIGZpcnN0IGFyZyBzaG91bGQgYWx3YXlzIGJlIGRpZmZlcmVudCFcbiAgICByZXR1cm4gdGhpcy5hcGlcbiAgICAgIC5hZGREeW5hbW9EYkRhdGFTb3VyY2UoJ05vdGlmaWNhdGlvbnNUYWJsZScsIHRoaXMubm90aWZpY2F0aW9uc1RhYmxlKVxuICAgICAgLmNyZWF0ZVJlc29sdmVyKHtcbiAgICAgICAgdHlwZU5hbWU6ICdNdXRhdGlvbicsXG4gICAgICAgIGZpZWxkTmFtZTogJ25vdGlmeVJldHdlZXRlZCcsXG4gICAgICAgIHJlcXVlc3RNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmZyb21GaWxlKFxuICAgICAgICAgIHBhdGguam9pbihcbiAgICAgICAgICAgIF9fZGlybmFtZSxcbiAgICAgICAgICAgICcuLi9yZXNvbHZlcnMvbXV0YXRpb25zL05vdGlmeVJldHdlZXRlZC9yZXF1ZXN0LnZ0bCdcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5mcm9tRmlsZShcbiAgICAgICAgICBwYXRoLmpvaW4oXG4gICAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgICAnLi4vcmVzb2x2ZXJzL211dGF0aW9ucy9Ob3RpZnlSZXR3ZWV0ZWQvcmVzcG9uc2UudnRsJ1xuICAgICAgICAgIClcbiAgICAgICAgKVxuICAgICAgfSk7XG4gIH1cbn1cbiJdfQ==