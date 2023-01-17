"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiStack = void 0;
const HashTagConstruct_1 = require("./Constructs/HashTagConstruct");
const GetFollowingConstruct_1 = require("./Constructs/GetFollowingConstruct");
const UnfollowConstruct_1 = require("./Constructs/UnfollowConstruct");
const NestedFollowingProfie_1 = require("./Constructs/NestedFollowingProfie");
const NestedInReplyToUsers_1 = require("./Constructs/NestedInReplyToUsers");
const NestedInReplToTweet_1 = require("./Constructs/NestedInReplToTweet");
const NestedReplyProfile_1 = require("./Constructs/NestedReplyProfile");
const ReplyConstruct_1 = require("./Constructs/ReplyConstruct");
const NestedTweetRetweeted_1 = require("./Constructs/NestedTweetRetweeted");
const NestedRetweetOf_1 = require("./Constructs/NestedRetweetOf");
const Nested_RetweetProfile_1 = require("./Constructs/Nested_RetweetProfile");
const RetweetConstruct_1 = require("./Constructs/RetweetConstruct");
const Nested_OtherProfileTweet_1 = require("./Constructs/Nested_OtherProfileTweet");
const Nested_MyProfileTweet_1 = require("./Constructs/Nested_MyProfileTweet");
const GetLikesConstruct_1 = require("./Constructs/GetLikesConstruct");
const UnlikeConstruct_1 = require("./Constructs/UnlikeConstruct");
const NestedLiked_1 = require("./Constructs/NestedLiked");
const LikeContruct_1 = require("./Constructs/LikeContruct");
const NestedUnhydratedTweets_1 = require("./Constructs/NestedUnhydratedTweets");
const GetMyTimeLine_1 = require("./Constructs/GetMyTimeLine");
const TweetConstruct_1 = require("./Constructs/TweetConstruct");
const GetMyProfileConstruct_1 = require("./Constructs/GetMyProfileConstruct");
const cdk = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const path = require("path");
const EditMyProfileConstruct_1 = require("./Constructs/EditMyProfileConstruct");
const GetImageUploadUrlConstruct_1 = require("./Constructs/GetImageUploadUrlConstruct");
const GetTweetsConstuct_1 = require("./Constructs/GetTweetsConstuct");
const NestedProfile_Type_Tweet_1 = require("./Constructs/NestedProfile_Type_Tweet");
const UnRetweetConstruct_1 = require("./Constructs/UnRetweetConstruct");
const NestedReplyRetweeted_1 = require("./Constructs/NestedReplyRetweeted");
const NestedReplyLike_1 = require("./Constructs/NestedReplyLike");
const FollowConstruct_1 = require("./Constructs/FollowConstruct");
const NestedFollowedByProfile_1 = require("./Constructs/NestedFollowedByProfile");
const GetProfileConstruct_1 = require("./Constructs/GetProfileConstruct");
const GetFollowersConstruct_1 = require("./Constructs/GetFollowersConstruct");
const SearchConstruct_1 = require("./Constructs/SearchConstruct");
class ApiStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        this.api = new appsync.GraphqlApi(this, 'Api', {
            name: 'twitter-api',
            schema: appsync.Schema.fromAsset(path.join(__dirname, 'Schema/schema.api.graphql')),
            authorizationConfig: {
                defaultAuthorization: {
                    authorizationType: appsync.AuthorizationType.USER_POOL,
                    userPoolConfig: {
                        userPool: props.userPool
                    }
                }
            }
        });
        this.props = props;
        this.queries();
        this.mutations();
        this.nestedResolvers();
        //output API URL
        new cdk.CfnOutput(this, 'GraphQLAPIURL', {
            value: this.api.graphqlUrl
        });
    }
    queries() {
        new GetMyProfileConstruct_1.GetMyProfileResolver(this, 'QueryGetMyProfileResolver', this.api, this.props.usersTable).resolver;
        const getImageUploadUrl = new GetImageUploadUrlConstruct_1.GetImageUploadURL(this, 'QueryGetImageUploadUrl', this.api);
        getImageUploadUrl.resolver;
        this.imageUploadFunction = getImageUploadUrl.getImageUploadURLfunction;
        new GetTweetsConstuct_1.GetTweetsResolver(this, 'QueryGetTweetsResolver', this.api, this.props.tweetsTable).resolver;
        new GetMyTimeLine_1.GetMyTimeLine(this, 'QueryGetMyTimeLineResolver', this.api, this.props.timelinesTable).resolver;
        new GetLikesConstruct_1.GetLikes(this, 'QueryGetLikesResolver', this.api, this.props.likesTable)
            .resolver;
        new GetProfileConstruct_1.GetProfile(this, 'QueryGetProfile', this.api, this.props.usersTable)
            .resolver;
        // This is pipeline resolver example
        new GetFollowersConstruct_1.GetFollowers(this, 'QueryGetFollowers', this.api, this.props.relationshipsTable, this.props.usersTable).resolver;
        new GetFollowingConstruct_1.GetFollowing(this, 'QueryGetFollowing', this.api, this.props.relationshipsTable, this.props.usersTable).resolver;
        new SearchConstruct_1.Search(this, 'QuerySearch', this.api).resolver;
        new HashTagConstruct_1.Hashtag(this, 'QueryHashtag', this.api).resolver;
    }
    nestedResolvers() {
        new NestedProfile_Type_Tweet_1.NestedProfileTweet(this, 'NestedProfileTweet', this.api, this.props.usersTable).resolver;
        new NestedUnhydratedTweets_1.NestedUnhydratedTweetsPage(this, 'NestedUnhydratedTweetsPage', this.api, this.props.tweetsTable).resolver;
        new NestedLiked_1.NestedLiked(this, 'NestedLiked', this.api, this.props.likesTable)
            .resolver;
        new Nested_MyProfileTweet_1.NestedMyProfile(this, 'NestedMyProfile', this.api, this.props.tweetsTable).resolver;
        new Nested_OtherProfileTweet_1.NestedOtherProfile(this, 'NestedOtherProfile', this.api, this.props.tweetsTable).resolver;
        new Nested_RetweetProfile_1.NestedRetweetProfile(this, 'NestedRetweetProfile', this.api, this.props.usersTable).resolver;
        new NestedRetweetOf_1.NestedRetweetOf(this, 'NestedRetweetOf', this.api, this.props.tweetsTable).resolver;
        new NestedTweetRetweeted_1.NestedTweetRetweeted(this, 'NestedTweetRetweeted', this.api, this.props.retweetsTable).resolver;
        new NestedReplyProfile_1.NestedReplyProfile(this, 'NestedReplyProfile', this.api, this.props.usersTable).resolver;
        new NestedInReplToTweet_1.NestedInReplyToTweet(this, 'NestedInReplyToTweet', this.api, this.props.tweetsTable).resolver;
        new NestedInReplyToUsers_1.NestedInReplyToUsers(this, 'NestedInReplyToUsers', this.api, this.props.usersTable).resolver;
        new NestedReplyRetweeted_1.NestedReplyRetweeted(this, 'NestedReplyRetweeted', this.api, this.props.retweetsTable).resolver;
        new NestedReplyLike_1.NestedReplyLike(this, 'NestedReplyLike', this.api, this.props.likesTable).resolver;
        new NestedFollowingProfie_1.NestedFollowingOtherProfile(this, 'NestedFollowingOtherProfile', this.api, this.props.relationshipsTable).resolver;
        new NestedFollowedByProfile_1.NestedFollowedByOtherProfile(this, 'NestedFollowedByOtherProfile', this.api, this.props.relationshipsTable).resolver;
    }
    // id string should be unique for each construct
    mutations() {
        new EditMyProfileConstruct_1.EditMyProfile(this, 'EditMyProfileResolver', this.api, this.props.usersTable).resolver;
        //Tweet Mutation
        const tweetMutation = new TweetConstruct_1.Tweet(this, 'TweetMutation', this.api);
        tweetMutation.resolver;
        this.props.usersTable.grantFullAccess(tweetMutation.Tweetfunction);
        this.props.tweetsTable.grantFullAccess(tweetMutation.Tweetfunction);
        this.props.timelinesTable.grantFullAccess(tweetMutation.Tweetfunction);
        //RetweetMutation
        const retweetMutation = new RetweetConstruct_1.Retweet(this, 'RetweetMutation', this.api);
        retweetMutation.resolver;
        this.props.usersTable.grantFullAccess(retweetMutation.Retweetfunction);
        this.props.tweetsTable.grantFullAccess(retweetMutation.Retweetfunction);
        this.props.timelinesTable.grantFullAccess(retweetMutation.Retweetfunction);
        this.props.retweetsTable.grantFullAccess(retweetMutation.Retweetfunction);
        //UnRetweetMutation
        const unretweetMutation = new UnRetweetConstruct_1.UnRetweet(this, 'UnRetweetMutation', this.api);
        unretweetMutation.resolver;
        this.props.usersTable.grantFullAccess(unretweetMutation.UnRetweetFunction);
        this.props.tweetsTable.grantFullAccess(unretweetMutation.UnRetweetFunction);
        this.props.timelinesTable.grantFullAccess(unretweetMutation.UnRetweetFunction);
        this.props.retweetsTable.grantFullAccess(unretweetMutation.UnRetweetFunction);
        //ReplyMutation
        const replyMutation = new ReplyConstruct_1.Reply(this, 'ReplyMutation', this.api);
        replyMutation.resolver;
        this.props.usersTable.grantFullAccess(replyMutation.Replyfunction);
        this.props.tweetsTable.grantFullAccess(replyMutation.Replyfunction);
        this.props.timelinesTable.grantFullAccess(replyMutation.Replyfunction);
        //Like Mutation
        // Manually have to add access in the service role from console for tweets and users table
        const LikeMutation = new LikeContruct_1.Like(this, 'LikeMutation', this.api, this.props.likesTable);
        LikeMutation.resolver;
        //Unlike Mutation
        // Manually have to add access in the service role from console for tweets and users table
        const UnlikeMutation = new UnlikeConstruct_1.Unlike(this, 'UnlikeMutation', this.api, this.props.likesTable);
        UnlikeMutation.resolver;
        //Follow Mutation
        // Manually add access in the service role from console for users table
        const FollowMutation = new FollowConstruct_1.Follow(this, 'FollowMutation', this.api, this.props.relationshipsTable).resolver;
        //Unfollow Mutation
        // Manually add access in the service role from console for users table
        const UnfollowMutation = new UnfollowConstruct_1.UnFollow(this, 'UnfollowMutation', this.api, this.props.relationshipsTable).resolver;
    }
}
exports.ApiStack = ApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG9FQUF3RDtBQUN4RCw4RUFBa0U7QUFDbEUsc0VBQTBEO0FBQzFELDhFQUFpRjtBQUNqRiw0RUFBeUU7QUFDekUsMEVBQXdFO0FBQ3hFLHdFQUFxRTtBQUNyRSxnRUFBb0Q7QUFDcEQsNEVBQXlFO0FBQ3pFLGtFQUErRDtBQUMvRCw4RUFBMEU7QUFDMUUsb0VBQXdEO0FBQ3hELG9GQUEyRTtBQUMzRSw4RUFBcUU7QUFDckUsc0VBQTBEO0FBQzFELGtFQUFzRDtBQUN0RCwwREFBdUQ7QUFDdkQsNERBQWlEO0FBQ2pELGdGQUFpRjtBQUNqRiw4REFBMkQ7QUFDM0QsZ0VBQW9EO0FBQ3BELDhFQUEwRTtBQUUxRSxtQ0FBbUM7QUFFbkMsc0RBQXNEO0FBQ3RELDZCQUE2QjtBQUM3QixnRkFBb0U7QUFDcEUsd0ZBQTRFO0FBQzVFLHNFQUFtRTtBQUNuRSxvRkFBMkU7QUFDM0Usd0VBQTREO0FBQzVELDRFQUF5RTtBQUN6RSxrRUFBK0Q7QUFDL0Qsa0VBQXNEO0FBQ3RELGtGQUFvRjtBQUNwRiwwRUFBOEQ7QUFDOUQsOEVBQWtFO0FBQ2xFLGtFQUFzRDtBQUN0RCxNQUFhLFFBQVMsU0FBUSxHQUFHLENBQUMsS0FBSztJQU1yQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQW9CO1FBQzVELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLElBQUksQ0FBQyxHQUFHLEdBQUcsSUFBSSxPQUFPLENBQUMsVUFBVSxDQUFDLElBQUksRUFBRSxLQUFLLEVBQUU7WUFDN0MsSUFBSSxFQUFFLGFBQWE7WUFDbkIsTUFBTSxFQUFFLE9BQU8sQ0FBQyxNQUFNLENBQUMsU0FBUyxDQUM5QixJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSwyQkFBMkIsQ0FBQyxDQUNsRDtZQUNE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QUFrQixDQUM5QixDQUFDLFFBQVEsQ0FBQztRQUVYLG1CQUFtQjtRQUNuQix1RUFBdUU7UUFDdkUsTUFBTSxnQkFBZ0IsR0FBRyxJQUFJLDRCQUFRLENBQ25DLElBQUksRUFDSixrQkFBa0IsRUFDbEIsSUFBSSxDQUFDLEdBQUcsRUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUM5QixDQUFDLFFBQVEsQ0FBQztJQUNiLENBQUM7Q0FDRjtBQXRSRCw0QkFzUkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBIYXNodGFnIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL0hhc2hUYWdDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgR2V0Rm9sbG93aW5nIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL0dldEZvbGxvd2luZ0NvbnN0cnVjdCc7XG5pbXBvcnQgeyBVbkZvbGxvdyB9IGZyb20gJy4vQ29uc3RydWN0cy9VbmZvbGxvd0NvbnN0cnVjdCc7XG5pbXBvcnQgeyBOZXN0ZWRGb2xsb3dpbmdPdGhlclByb2ZpbGUgfSBmcm9tICcuL0NvbnN0cnVjdHMvTmVzdGVkRm9sbG93aW5nUHJvZmllJztcbmltcG9ydCB7IE5lc3RlZEluUmVwbHlUb1VzZXJzIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZEluUmVwbHlUb1VzZXJzJztcbmltcG9ydCB7IE5lc3RlZEluUmVwbHlUb1R3ZWV0IH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZEluUmVwbFRvVHdlZXQnO1xuaW1wb3J0IHsgTmVzdGVkUmVwbHlQcm9maWxlIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZFJlcGx5UHJvZmlsZSc7XG5pbXBvcnQgeyBSZXBseSB9IGZyb20gJy4vQ29uc3RydWN0cy9SZXBseUNvbnN0cnVjdCc7XG5pbXBvcnQgeyBOZXN0ZWRUd2VldFJldHdlZXRlZCB9IGZyb20gJy4vQ29uc3RydWN0cy9OZXN0ZWRUd2VldFJldHdlZXRlZCc7XG5pbXBvcnQgeyBOZXN0ZWRSZXR3ZWV0T2YgfSBmcm9tICcuL0NvbnN0cnVjdHMvTmVzdGVkUmV0d2VldE9mJztcbmltcG9ydCB7IE5lc3RlZFJldHdlZXRQcm9maWxlIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZF9SZXR3ZWV0UHJvZmlsZSc7XG5pbXBvcnQgeyBSZXR3ZWV0IH0gZnJvbSAnLi9Db25zdHJ1Y3RzL1JldHdlZXRDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgTmVzdGVkT3RoZXJQcm9maWxlIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZF9PdGhlclByb2ZpbGVUd2VldCc7XG5pbXBvcnQgeyBOZXN0ZWRNeVByb2ZpbGUgfSBmcm9tICcuL0NvbnN0cnVjdHMvTmVzdGVkX015UHJvZmlsZVR3ZWV0JztcbmltcG9ydCB7IEdldExpa2VzIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL0dldExpa2VzQ29uc3RydWN0JztcbmltcG9ydCB7IFVubGlrZSB9IGZyb20gJy4vQ29uc3RydWN0cy9Vbmxpa2VDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgTmVzdGVkTGlrZWQgfSBmcm9tICcuL0NvbnN0cnVjdHMvTmVzdGVkTGlrZWQnO1xuaW1wb3J0IHsgTGlrZSB9IGZyb20gJy4vQ29uc3RydWN0cy9MaWtlQ29udHJ1Y3QnO1xuaW1wb3J0IHsgTmVzdGVkVW5oeWRyYXRlZFR3ZWV0c1BhZ2UgfSBmcm9tICcuL0NvbnN0cnVjdHMvTmVzdGVkVW5oeWRyYXRlZFR3ZWV0cyc7XG5pbXBvcnQgeyBHZXRNeVRpbWVMaW5lIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL0dldE15VGltZUxpbmUnO1xuaW1wb3J0IHsgVHdlZXQgfSBmcm9tICcuL0NvbnN0cnVjdHMvVHdlZXRDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgR2V0TXlQcm9maWxlUmVzb2x2ZXIgfSBmcm9tICcuL0NvbnN0cnVjdHMvR2V0TXlQcm9maWxlQ29uc3RydWN0JztcbmltcG9ydCB7IEFwaVN0YWNrUHJvcHMgfSBmcm9tICcuLy4uLy4uLy4uL0ludGVyZmFjZXMvYXBpLWludGVyZmFjZSc7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcHBzeW5jLWFscGhhJztcbmltcG9ydCAqIGFzIHBhdGggZnJvbSAncGF0aCc7XG5pbXBvcnQgeyBFZGl0TXlQcm9maWxlIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL0VkaXRNeVByb2ZpbGVDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgR2V0SW1hZ2VVcGxvYWRVUkwgfSBmcm9tICcuL0NvbnN0cnVjdHMvR2V0SW1hZ2VVcGxvYWRVcmxDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgR2V0VHdlZXRzUmVzb2x2ZXIgfSBmcm9tICcuL0NvbnN0cnVjdHMvR2V0VHdlZXRzQ29uc3R1Y3QnO1xuaW1wb3J0IHsgTmVzdGVkUHJvZmlsZVR3ZWV0IH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZFByb2ZpbGVfVHlwZV9Ud2VldCc7XG5pbXBvcnQgeyBVblJldHdlZXQgfSBmcm9tICcuL0NvbnN0cnVjdHMvVW5SZXR3ZWV0Q29uc3RydWN0JztcbmltcG9ydCB7IE5lc3RlZFJlcGx5UmV0d2VldGVkIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZFJlcGx5UmV0d2VldGVkJztcbmltcG9ydCB7IE5lc3RlZFJlcGx5TGlrZSB9IGZyb20gJy4vQ29uc3RydWN0cy9OZXN0ZWRSZXBseUxpa2UnO1xuaW1wb3J0IHsgRm9sbG93IH0gZnJvbSAnLi9Db25zdHJ1Y3RzL0ZvbGxvd0NvbnN0cnVjdCc7XG5pbXBvcnQgeyBOZXN0ZWRGb2xsb3dlZEJ5T3RoZXJQcm9maWxlIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZEZvbGxvd2VkQnlQcm9maWxlJztcbmltcG9ydCB7IEdldFByb2ZpbGUgfSBmcm9tICcuL0NvbnN0cnVjdHMvR2V0UHJvZmlsZUNvbnN0cnVjdCc7XG5pbXBvcnQgeyBHZXRGb2xsb3dlcnMgfSBmcm9tICcuL0NvbnN0cnVjdHMvR2V0Rm9sbG93ZXJzQ29uc3RydWN0JztcbmltcG9ydCB7IFNlYXJjaCB9IGZyb20gJy4vQ29uc3RydWN0cy9TZWFyY2hDb25zdHJ1Y3QnO1xuZXhwb3J0IGNsYXNzIEFwaVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgcHVibGljIGFwaTogYXBwc3luYy5HcmFwaHFsQXBpO1xuICBwdWJsaWMgcHJvcHM6IEFwaVN0YWNrUHJvcHM7XG4gIHB1YmxpYyBpbWFnZVVwbG9hZEZ1bmN0aW9uOiBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb247XG4gIHB1YmxpYyB0d2VldEZ1bmN0aW9uOiBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb247XG5cbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM6IEFwaVN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcbiAgICB0aGlzLmFwaSA9IG5ldyBhcHBzeW5jLkdyYXBocWxBcGkodGhpcywgJ0FwaScsIHtcbiAgICAgIG5hbWU6ICd0d2l0dGVyLWFwaScsXG4gICAgICBzY2hlbWE6IGFwcHN5bmMuU2NoZW1hLmZyb21Bc3NldChcbiAgICAgICAgcGF0aC5qb2luKF9fZGlybmFtZSwgJ1NjaGVtYS9zY2hlbWEuYXBpLmdyYXBocWwnKVxuICAgICAgKSxcbiAgICAgIGF1dGhvcml6YXRpb25Db25maWc6IHtcbiAgICAgICAgZGVmYXVsdEF1dGhvcml6YXRpb246IHtcbiAgICAgICAgICBhdXRob3JpemF0aW9uVHlwZTogYXBwc3luYy5BdXRob3JpemF0aW9uVHlwZS5VU0VSX1BPT0wsXG4gICAgICAgICAgdXNlclBvb2xDb25maWc6IHtcbiAgICAgICAgICAgIHVzZXJQb29sOiBwcm9wcy51c2VyUG9vbFxuICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICAgIHRoaXMucHJvcHMgPSBwcm9wcztcbiAgICB0aGlzLnF1ZXJpZXMoKTtcbiAgICB0aGlzLm11dGF0aW9ucygpO1xuICAgIHRoaXMubmVzdGVkUmVzb2x2ZXJzKCk7XG5cbiAgICAvL291dHB1dCBBUEkgVVJMXG4gICAgbmV3IGNkay5DZm5PdXRwdXQodGhpcywgJ0dyYXBoUUxBUElVUkwnLCB7XG4gICAgICB2YWx1ZTogdGhpcy5hcGkuZ3JhcGhxbFVybFxuICAgIH0pO1xuICB9XG5cbiAgcHVibGljIHF1ZXJpZXMoKSB7XG4gICAgbmV3IEdldE15UHJvZmlsZVJlc29sdmVyKFxuICAgICAgdGhpcyxcbiAgICAgICdRdWVyeUdldE15UHJvZmlsZVJlc29sdmVyJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy51c2Vyc1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIGNvbnN0IGdldEltYWdlVXBsb2FkVXJsID0gbmV3IEdldEltYWdlVXBsb2FkVVJMKFxuICAgICAgdGhpcyxcbiAgICAgICdRdWVyeUdldEltYWdlVXBsb2FkVXJsJyxcbiAgICAgIHRoaXMuYXBpXG4gICAgKTtcbiAgICBnZXRJbWFnZVVwbG9hZFVybC5yZXNvbHZlcjtcbiAgICB0aGlzLmltYWdlVXBsb2FkRnVuY3Rpb24gPSBnZXRJbWFnZVVwbG9hZFVybC5nZXRJbWFnZVVwbG9hZFVSTGZ1bmN0aW9uO1xuXG4gICAgbmV3IEdldFR3ZWV0c1Jlc29sdmVyKFxuICAgICAgdGhpcyxcbiAgICAgICdRdWVyeUdldFR3ZWV0c1Jlc29sdmVyJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy50d2VldHNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgR2V0TXlUaW1lTGluZShcbiAgICAgIHRoaXMsXG4gICAgICAnUXVlcnlHZXRNeVRpbWVMaW5lUmVzb2x2ZXInLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnRpbWVsaW5lc1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIG5ldyBHZXRMaWtlcyh0aGlzLCAnUXVlcnlHZXRMaWtlc1Jlc29sdmVyJywgdGhpcy5hcGksIHRoaXMucHJvcHMubGlrZXNUYWJsZSlcbiAgICAgIC5yZXNvbHZlcjtcblxuICAgIG5ldyBHZXRQcm9maWxlKHRoaXMsICdRdWVyeUdldFByb2ZpbGUnLCB0aGlzLmFwaSwgdGhpcy5wcm9wcy51c2Vyc1RhYmxlKVxuICAgICAgLnJlc29sdmVyO1xuXG4gICAgLy8gVGhpcyBpcyBwaXBlbGluZSByZXNvbHZlciBleGFtcGxlXG4gICAgbmV3IEdldEZvbGxvd2VycyhcbiAgICAgIHRoaXMsXG4gICAgICAnUXVlcnlHZXRGb2xsb3dlcnMnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnJlbGF0aW9uc2hpcHNUYWJsZSxcbiAgICAgIHRoaXMucHJvcHMudXNlcnNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgR2V0Rm9sbG93aW5nKFxuICAgICAgdGhpcyxcbiAgICAgICdRdWVyeUdldEZvbGxvd2luZycsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMucmVsYXRpb25zaGlwc1RhYmxlLFxuICAgICAgdGhpcy5wcm9wcy51c2Vyc1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIG5ldyBTZWFyY2godGhpcywgJ1F1ZXJ5U2VhcmNoJywgdGhpcy5hcGkpLnJlc29sdmVyO1xuICAgIG5ldyBIYXNodGFnKHRoaXMsICdRdWVyeUhhc2h0YWcnLCB0aGlzLmFwaSkucmVzb2x2ZXI7XG4gIH1cblxuICBwdWJsaWMgbmVzdGVkUmVzb2x2ZXJzKCkge1xuICAgIG5ldyBOZXN0ZWRQcm9maWxlVHdlZXQoXG4gICAgICB0aGlzLFxuICAgICAgJ05lc3RlZFByb2ZpbGVUd2VldCcsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMudXNlcnNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgTmVzdGVkVW5oeWRyYXRlZFR3ZWV0c1BhZ2UoXG4gICAgICB0aGlzLFxuICAgICAgJ05lc3RlZFVuaHlkcmF0ZWRUd2VldHNQYWdlJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy50d2VldHNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgTmVzdGVkTGlrZWQodGhpcywgJ05lc3RlZExpa2VkJywgdGhpcy5hcGksIHRoaXMucHJvcHMubGlrZXNUYWJsZSlcbiAgICAgIC5yZXNvbHZlcjtcbiAgICBuZXcgTmVzdGVkTXlQcm9maWxlKFxuICAgICAgdGhpcyxcbiAgICAgICdOZXN0ZWRNeVByb2ZpbGUnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnR3ZWV0c1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIG5ldyBOZXN0ZWRPdGhlclByb2ZpbGUoXG4gICAgICB0aGlzLFxuICAgICAgJ05lc3RlZE90aGVyUHJvZmlsZScsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMudHdlZXRzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IE5lc3RlZFJldHdlZXRQcm9maWxlKFxuICAgICAgdGhpcyxcbiAgICAgICdOZXN0ZWRSZXR3ZWV0UHJvZmlsZScsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMudXNlcnNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgTmVzdGVkUmV0d2VldE9mKFxuICAgICAgdGhpcyxcbiAgICAgICdOZXN0ZWRSZXR3ZWV0T2YnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnR3ZWV0c1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIG5ldyBOZXN0ZWRUd2VldFJldHdlZXRlZChcbiAgICAgIHRoaXMsXG4gICAgICAnTmVzdGVkVHdlZXRSZXR3ZWV0ZWQnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnJldHdlZXRzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IE5lc3RlZFJlcGx5UHJvZmlsZShcbiAgICAgIHRoaXMsXG4gICAgICAnTmVzdGVkUmVwbHlQcm9maWxlJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy51c2Vyc1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIG5ldyBOZXN0ZWRJblJlcGx5VG9Ud2VldChcbiAgICAgIHRoaXMsXG4gICAgICAnTmVzdGVkSW5SZXBseVRvVHdlZXQnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnR3ZWV0c1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIG5ldyBOZXN0ZWRJblJlcGx5VG9Vc2VycyhcbiAgICAgIHRoaXMsXG4gICAgICAnTmVzdGVkSW5SZXBseVRvVXNlcnMnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnVzZXJzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IE5lc3RlZFJlcGx5UmV0d2VldGVkKFxuICAgICAgdGhpcyxcbiAgICAgICdOZXN0ZWRSZXBseVJldHdlZXRlZCcsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMucmV0d2VldHNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgTmVzdGVkUmVwbHlMaWtlKFxuICAgICAgdGhpcyxcbiAgICAgICdOZXN0ZWRSZXBseUxpa2UnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLmxpa2VzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IE5lc3RlZEZvbGxvd2luZ090aGVyUHJvZmlsZShcbiAgICAgIHRoaXMsXG4gICAgICAnTmVzdGVkRm9sbG93aW5nT3RoZXJQcm9maWxlJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy5yZWxhdGlvbnNoaXBzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IE5lc3RlZEZvbGxvd2VkQnlPdGhlclByb2ZpbGUoXG4gICAgICB0aGlzLFxuICAgICAgJ05lc3RlZEZvbGxvd2VkQnlPdGhlclByb2ZpbGUnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnJlbGF0aW9uc2hpcHNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG4gIH1cblxuICAvLyBpZCBzdHJpbmcgc2hvdWxkIGJlIHVuaXF1ZSBmb3IgZWFjaCBjb25zdHJ1Y3RcbiAgcHVibGljIG11dGF0aW9ucygpIHtcbiAgICBuZXcgRWRpdE15UHJvZmlsZShcbiAgICAgIHRoaXMsXG4gICAgICAnRWRpdE15UHJvZmlsZVJlc29sdmVyJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy51c2Vyc1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIC8vVHdlZXQgTXV0YXRpb25cbiAgICBjb25zdCB0d2VldE11dGF0aW9uID0gbmV3IFR3ZWV0KHRoaXMsICdUd2VldE11dGF0aW9uJywgdGhpcy5hcGkpO1xuICAgIHR3ZWV0TXV0YXRpb24ucmVzb2x2ZXI7XG4gICAgdGhpcy5wcm9wcy51c2Vyc1RhYmxlLmdyYW50RnVsbEFjY2Vzcyh0d2VldE11dGF0aW9uLlR3ZWV0ZnVuY3Rpb24pO1xuICAgIHRoaXMucHJvcHMudHdlZXRzVGFibGUuZ3JhbnRGdWxsQWNjZXNzKHR3ZWV0TXV0YXRpb24uVHdlZXRmdW5jdGlvbik7XG4gICAgdGhpcy5wcm9wcy50aW1lbGluZXNUYWJsZS5ncmFudEZ1bGxBY2Nlc3ModHdlZXRNdXRhdGlvbi5Ud2VldGZ1bmN0aW9uKTtcblxuICAgIC8vUmV0d2VldE11dGF0aW9uXG4gICAgY29uc3QgcmV0d2VldE11dGF0aW9uID0gbmV3IFJldHdlZXQodGhpcywgJ1JldHdlZXRNdXRhdGlvbicsIHRoaXMuYXBpKTtcbiAgICByZXR3ZWV0TXV0YXRpb24ucmVzb2x2ZXI7XG4gICAgdGhpcy5wcm9wcy51c2Vyc1RhYmxlLmdyYW50RnVsbEFjY2VzcyhyZXR3ZWV0TXV0YXRpb24uUmV0d2VldGZ1bmN0aW9uKTtcbiAgICB0aGlzLnByb3BzLnR3ZWV0c1RhYmxlLmdyYW50RnVsbEFjY2VzcyhyZXR3ZWV0TXV0YXRpb24uUmV0d2VldGZ1bmN0aW9uKTtcbiAgICB0aGlzLnByb3BzLnRpbWVsaW5lc1RhYmxlLmdyYW50RnVsbEFjY2VzcyhyZXR3ZWV0TXV0YXRpb24uUmV0d2VldGZ1bmN0aW9uKTtcbiAgICB0aGlzLnByb3BzLnJldHdlZXRzVGFibGUuZ3JhbnRGdWxsQWNjZXNzKHJldHdlZXRNdXRhdGlvbi5SZXR3ZWV0ZnVuY3Rpb24pO1xuXG4gICAgLy9VblJldHdlZXRNdXRhdGlvblxuICAgIGNvbnN0IHVucmV0d2VldE11dGF0aW9uID0gbmV3IFVuUmV0d2VldChcbiAgICAgIHRoaXMsXG4gICAgICAnVW5SZXR3ZWV0TXV0YXRpb24nLFxuICAgICAgdGhpcy5hcGlcbiAgICApO1xuICAgIHVucmV0d2VldE11dGF0aW9uLnJlc29sdmVyO1xuICAgIHRoaXMucHJvcHMudXNlcnNUYWJsZS5ncmFudEZ1bGxBY2Nlc3ModW5yZXR3ZWV0TXV0YXRpb24uVW5SZXR3ZWV0RnVuY3Rpb24pO1xuICAgIHRoaXMucHJvcHMudHdlZXRzVGFibGUuZ3JhbnRGdWxsQWNjZXNzKHVucmV0d2VldE11dGF0aW9uLlVuUmV0d2VldEZ1bmN0aW9uKTtcbiAgICB0aGlzLnByb3BzLnRpbWVsaW5lc1RhYmxlLmdyYW50RnVsbEFjY2VzcyhcbiAgICAgIHVucmV0d2VldE11dGF0aW9uLlVuUmV0d2VldEZ1bmN0aW9uXG4gICAgKTtcbiAgICB0aGlzLnByb3BzLnJldHdlZXRzVGFibGUuZ3JhbnRGdWxsQWNjZXNzKFxuICAgICAgdW5yZXR3ZWV0TXV0YXRpb24uVW5SZXR3ZWV0RnVuY3Rpb25cbiAgICApO1xuXG4gICAgLy9SZXBseU11dGF0aW9uXG4gICAgY29uc3QgcmVwbHlNdXRhdGlvbiA9IG5ldyBSZXBseSh0aGlzLCAnUmVwbHlNdXRhdGlvbicsIHRoaXMuYXBpKTtcbiAgICByZXBseU11dGF0aW9uLnJlc29sdmVyO1xuICAgIHRoaXMucHJvcHMudXNlcnNUYWJsZS5ncmFudEZ1bGxBY2Nlc3MocmVwbHlNdXRhdGlvbi5SZXBseWZ1bmN0aW9uKTtcbiAgICB0aGlzLnByb3BzLnR3ZWV0c1RhYmxlLmdyYW50RnVsbEFjY2VzcyhyZXBseU11dGF0aW9uLlJlcGx5ZnVuY3Rpb24pO1xuICAgIHRoaXMucHJvcHMudGltZWxpbmVzVGFibGUuZ3JhbnRGdWxsQWNjZXNzKHJlcGx5TXV0YXRpb24uUmVwbHlmdW5jdGlvbik7XG5cbiAgICAvL0xpa2UgTXV0YXRpb25cbiAgICAvLyBNYW51YWxseSBoYXZlIHRvIGFkZCBhY2Nlc3MgaW4gdGhlIHNlcnZpY2Ugcm9sZSBmcm9tIGNvbnNvbGUgZm9yIHR3ZWV0cyBhbmQgdXNlcnMgdGFibGVcbiAgICBjb25zdCBMaWtlTXV0YXRpb24gPSBuZXcgTGlrZShcbiAgICAgIHRoaXMsXG4gICAgICAnTGlrZU11dGF0aW9uJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy5saWtlc1RhYmxlXG4gICAgKTtcbiAgICBMaWtlTXV0YXRpb24ucmVzb2x2ZXI7XG5cbiAgICAvL1VubGlrZSBNdXRhdGlvblxuICAgIC8vIE1hbnVhbGx5IGhhdmUgdG8gYWRkIGFjY2VzcyBpbiB0aGUgc2VydmljZSByb2xlIGZyb20gY29uc29sZSBmb3IgdHdlZXRzIGFuZCB1c2VycyB0YWJsZVxuXG4gICAgY29uc3QgVW5saWtlTXV0YXRpb24gPSBuZXcgVW5saWtlKFxuICAgICAgdGhpcyxcbiAgICAgICdVbmxpa2VNdXRhdGlvbicsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMubGlrZXNUYWJsZVxuICAgICk7XG4gICAgVW5saWtlTXV0YXRpb24ucmVzb2x2ZXI7XG5cbiAgICAvL0ZvbGxvdyBNdXRhdGlvblxuICAgIC8vIE1hbnVhbGx5IGFkZCBhY2Nlc3MgaW4gdGhlIHNlcnZpY2Ugcm9sZSBmcm9tIGNvbnNvbGUgZm9yIHVzZXJzIHRhYmxlXG4gICAgY29uc3QgRm9sbG93TXV0YXRpb24gPSBuZXcgRm9sbG93KFxuICAgICAgdGhpcyxcbiAgICAgICdGb2xsb3dNdXRhdGlvbicsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMucmVsYXRpb25zaGlwc1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIC8vVW5mb2xsb3cgTXV0YXRpb25cbiAgICAvLyBNYW51YWxseSBhZGQgYWNjZXNzIGluIHRoZSBzZXJ2aWNlIHJvbGUgZnJvbSBjb25zb2xlIGZvciB1c2VycyB0YWJsZVxuICAgIGNvbnN0IFVuZm9sbG93TXV0YXRpb24gPSBuZXcgVW5Gb2xsb3coXG4gICAgICB0aGlzLFxuICAgICAgJ1VuZm9sbG93TXV0YXRpb24nLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnJlbGF0aW9uc2hpcHNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG4gIH1cbn1cbiJdfQ==