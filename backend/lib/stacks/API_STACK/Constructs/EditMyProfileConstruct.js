"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.EditMyProfile = void 0;
const appsync = require("@aws-cdk/aws-appsync-alpha");
const constructs_1 = require("constructs");
const path = require("path");
class EditMyProfile extends constructs_1.Construct {
    constructor(scope, id, api, usersTable) {
        super(scope, id);
        this.api = api;
        this.usersTable = usersTable;
        this.resolver = this.createEditMyProfile();
    }
    createEditMyProfile() {
        // first arg should always be different!
        return this.api
            .addDynamoDbDataSource("UsersTableEditMyProfile", this.usersTable)
            .createResolver({
            typeName: "Mutation",
            fieldName: "editMyProfile",
            requestMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, "../resolvers/mutations/EditMyProfile/request.vtl")),
            responseMappingTemplate: appsync.MappingTemplate.fromFile(path.join(__dirname, "../resolvers/mutations/EditMyProfile/response.vtl")),
        });
    }
}
exports.EditMyProfile = EditMyProfile;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdE15UHJvZmlsZUNvbnN0cnVjdC5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIkVkaXRNeVByb2ZpbGVDb25zdHJ1Y3QudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQ0Esc0RBQXNEO0FBQ3RELDJDQUF1QztBQUN2Qyw2QkFBNkI7QUFDN0IsTUFBYSxhQUFjLFNBQVEsc0JBQVM7SUFJMUMsWUFDRSxLQUFnQixFQUNoQixFQUFVLEVBQ1YsR0FBdUIsRUFDdkIsVUFBa0M7UUFFbEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUNqQixJQUFJLENBQUMsR0FBRyxHQUFHLEdBQUcsQ0FBQztRQUNmLElBQUksQ0FBQyxVQUFVLEdBQUcsVUFBVSxDQUFDO1FBQzdCLElBQUksQ0FBQyxRQUFRLEdBQUcsSUFBSSxDQUFDLG1CQUFtQixFQUFFLENBQUM7SUFDN0MsQ0FBQztJQUNNLG1CQUFtQjtRQUN4Qix3Q0FBd0M7UUFDeEMsT0FBTyxJQUFJLENBQUMsR0FBRzthQUNaLHFCQUFxQixDQUFDLHlCQUF5QixFQUFFLElBQUksQ0FBQyxVQUFVLENBQUM7YUFDakUsY0FBYyxDQUFDO1lBQ2QsUUFBUSxFQUFFLFVBQVU7WUFDcEIsU0FBUyxFQUFFLGVBQWU7WUFDMUIsc0JBQXNCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQ3RELElBQUksQ0FBQyxJQUFJLENBQ1AsU0FBUyxFQUNULGtEQUFrRCxDQUNuRCxDQUNGO1lBQ0QsdUJBQXVCLEVBQUUsT0FBTyxDQUFDLGVBQWUsQ0FBQyxRQUFRLENBQ3ZELElBQUksQ0FBQyxJQUFJLENBQ1AsU0FBUyxFQUNULG1EQUFtRCxDQUNwRCxDQUNGO1NBQ0YsQ0FBQyxDQUFDO0lBQ1AsQ0FBQztDQUNGO0FBcENELHNDQW9DQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSBcIkBhd3MtY2RrL2F3cy1hcHBzeW5jLWFscGhhXCI7XG5pbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tIFwiY29uc3RydWN0c1wiO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tIFwicGF0aFwiO1xuZXhwb3J0IGNsYXNzIEVkaXRNeVByb2ZpbGUgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGk7XG4gIHB1YmxpYyB1c2Vyc1RhYmxlOiBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlO1xuICBwdWJsaWMgcmVzb2x2ZXI6IGFwcHN5bmMuUmVzb2x2ZXI7XG4gIGNvbnN0cnVjdG9yKFxuICAgIHNjb3BlOiBDb25zdHJ1Y3QsXG4gICAgaWQ6IHN0cmluZyxcbiAgICBhcGk6IGFwcHN5bmMuR3JhcGhxbEFwaSxcbiAgICB1c2Vyc1RhYmxlOiBjZGsuYXdzX2R5bmFtb2RiLlRhYmxlXG4gICkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgdGhpcy51c2Vyc1RhYmxlID0gdXNlcnNUYWJsZTtcbiAgICB0aGlzLnJlc29sdmVyID0gdGhpcy5jcmVhdGVFZGl0TXlQcm9maWxlKCk7XG4gIH1cbiAgcHVibGljIGNyZWF0ZUVkaXRNeVByb2ZpbGUoKSB7XG4gICAgLy8gZmlyc3QgYXJnIHNob3VsZCBhbHdheXMgYmUgZGlmZmVyZW50IVxuICAgIHJldHVybiB0aGlzLmFwaVxuICAgICAgLmFkZER5bmFtb0RiRGF0YVNvdXJjZShcIlVzZXJzVGFibGVFZGl0TXlQcm9maWxlXCIsIHRoaXMudXNlcnNUYWJsZSlcbiAgICAgIC5jcmVhdGVSZXNvbHZlcih7XG4gICAgICAgIHR5cGVOYW1lOiBcIk11dGF0aW9uXCIsXG4gICAgICAgIGZpZWxkTmFtZTogXCJlZGl0TXlQcm9maWxlXCIsXG4gICAgICAgIHJlcXVlc3RNYXBwaW5nVGVtcGxhdGU6IGFwcHN5bmMuTWFwcGluZ1RlbXBsYXRlLmZyb21GaWxlKFxuICAgICAgICAgIHBhdGguam9pbihcbiAgICAgICAgICAgIF9fZGlybmFtZSxcbiAgICAgICAgICAgIFwiLi4vcmVzb2x2ZXJzL211dGF0aW9ucy9FZGl0TXlQcm9maWxlL3JlcXVlc3QudnRsXCJcbiAgICAgICAgICApXG4gICAgICAgICksXG4gICAgICAgIHJlc3BvbnNlTWFwcGluZ1RlbXBsYXRlOiBhcHBzeW5jLk1hcHBpbmdUZW1wbGF0ZS5mcm9tRmlsZShcbiAgICAgICAgICBwYXRoLmpvaW4oXG4gICAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgICBcIi4uL3Jlc29sdmVycy9tdXRhdGlvbnMvRWRpdE15UHJvZmlsZS9yZXNwb25zZS52dGxcIlxuICAgICAgICAgIClcbiAgICAgICAgKSxcbiAgICAgIH0pO1xuICB9XG59XG4iXX0=