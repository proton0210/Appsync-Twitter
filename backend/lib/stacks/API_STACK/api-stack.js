"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ApiStack = void 0;
const NotifyRetweeted_1 = require("./Constructs/NotifyRetweeted");
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
const onNotifiedConstrcut_1 = require("./Constructs/onNotifiedConstrcut");
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
                },
                // additional iam auth
                additionalAuthorizationModes: [
                    {
                        authorizationType: appsync.AuthorizationType.IAM
                    }
                ]
            }
        });
        this.props = props;
        this.queries();
        this.mutations();
        this.nestedResolvers();
        this.subscriptions();
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
        new NotifyRetweeted_1.NotifyRetweeted(this, 'NotifyRetweeted', this.api, this.props.notificationsTable);
    }
    subscriptions() {
        new onNotifiedConstrcut_1.OnNotified(this, 'OnNotifiedSubscription', this.api);
    }
}
exports.ApiStack = ApiStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXBpLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiYXBpLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtFQUErRDtBQUMvRCxvRUFBd0Q7QUFDeEQsOEVBQWtFO0FBQ2xFLHNFQUEwRDtBQUMxRCw4RUFBaUY7QUFDakYsNEVBQXlFO0FBQ3pFLDBFQUF3RTtBQUN4RSx3RUFBcUU7QUFDckUsZ0VBQW9EO0FBQ3BELDRFQUF5RTtBQUN6RSxrRUFBK0Q7QUFDL0QsOEVBQTBFO0FBQzFFLG9FQUF3RDtBQUN4RCxvRkFBMkU7QUFDM0UsOEVBQXFFO0FBQ3JFLHNFQUEwRDtBQUMxRCxrRUFBc0Q7QUFDdEQsMERBQXVEO0FBQ3ZELDREQUFpRDtBQUNqRCxnRkFBaUY7QUFDakYsOERBQTJEO0FBQzNELGdFQUFvRDtBQUNwRCw4RUFBMEU7QUFFMUUsbUNBQW1DO0FBRW5DLHNEQUFzRDtBQUN0RCw2QkFBNkI7QUFDN0IsZ0ZBQW9FO0FBQ3BFLHdGQUE0RTtBQUM1RSxzRUFBbUU7QUFDbkUsb0ZBQTJFO0FBQzNFLHdFQUE0RDtBQUM1RCw0RUFBeUU7QUFDekUsa0VBQStEO0FBQy9ELGtFQUFzRDtBQUN0RCxrRkFBb0Y7QUFDcEYsMEVBQThEO0FBQzlELDhFQUFrRTtBQUNsRSxrRUFBc0Q7QUFDdEQsMEVBQThEO0FBQzlELE1BQWEsUUFBUyxTQUFRLEdBQUcsQ0FBQyxLQUFLO0lBTXJDLFlBQVksS0FBZ0IsRUFBRSxFQUFVLEVBQUUsS0FBb0I7UUFDNUQsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLEVBQUUsS0FBSyxDQUFDLENBQUM7UUFDeEIsSUFBSSxDQUFDLEdBQUcsR0FBRyxJQUFJLE9BQU8sQ0FBQyxVQUFVLENBQUMsSUFBSSxFQUFFLEtBQUssRUFBRTtZQUM3QyxJQUFJLEVBQUUsYUFBYTtZQUNuQixNQUFNLEVBQUUsT0FBTyxDQUFDLE1BQU0sQ0FBQyxTQUFTLENBQzlCLElBQUksQ0FBQyxJQUFJLENBQUMsU0FBUyxF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UUFDRixjQUFjLENBQUMsUUFBUSxDQUFDO1FBRXhCLGlCQUFpQjtRQUNqQix1RUFBdUU7UUFDdkUsTUFBTSxjQUFjLEdBQUcsSUFBSSx3QkFBTSxDQUMvQixJQUFJLEVBQ0osZ0JBQWdCLEVBQ2hCLElBQUksQ0FBQyxHQUFHLEVBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FDOUIsQ0FBQyxRQUFRLENBQUM7UUFFWCxtQkFBbUI7UUFDbkIsdUVBQXVFO1FBQ3ZFLE1BQU0sZ0JBQWdCLEdBQUcsSUFBSSw0QkFBUSxDQUNuQyxJQUFJLEVBQ0osa0JBQWtCLEVBQ2xCLElBQUksQ0FBQyxHQUFHLEVBQ1IsSUFBSSxDQUFDLEtBQUssQ0FBQyxrQkFBa0IsQ0FDOUIsQ0FBQyxRQUFRLENBQUM7UUFFWCxJQUFJLGlDQUFlLENBQ2pCLElBQUksRUFDSixpQkFBaUIsRUFDakIsSUFBSSxDQUFDLEdBQUcsRUFDUixJQUFJLENBQUMsS0FBSyxDQUFDLGtCQUFrQixDQUM5QixDQUFDO0lBQ0osQ0FBQztJQUVNLGFBQWE7UUFDbEIsSUFBSSxnQ0FBVSxDQUFDLElBQUksRUFBRSx3QkFBd0IsRUFBRSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7SUFDM0QsQ0FBQztDQUNGO0FBeFNELDRCQXdTQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IE5vdGlmeVJldHdlZXRlZCB9IGZyb20gJy4vQ29uc3RydWN0cy9Ob3RpZnlSZXR3ZWV0ZWQnO1xuaW1wb3J0IHsgSGFzaHRhZyB9IGZyb20gJy4vQ29uc3RydWN0cy9IYXNoVGFnQ29uc3RydWN0JztcbmltcG9ydCB7IEdldEZvbGxvd2luZyB9IGZyb20gJy4vQ29uc3RydWN0cy9HZXRGb2xsb3dpbmdDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgVW5Gb2xsb3cgfSBmcm9tICcuL0NvbnN0cnVjdHMvVW5mb2xsb3dDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgTmVzdGVkRm9sbG93aW5nT3RoZXJQcm9maWxlIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZEZvbGxvd2luZ1Byb2ZpZSc7XG5pbXBvcnQgeyBOZXN0ZWRJblJlcGx5VG9Vc2VycyB9IGZyb20gJy4vQ29uc3RydWN0cy9OZXN0ZWRJblJlcGx5VG9Vc2Vycyc7XG5pbXBvcnQgeyBOZXN0ZWRJblJlcGx5VG9Ud2VldCB9IGZyb20gJy4vQ29uc3RydWN0cy9OZXN0ZWRJblJlcGxUb1R3ZWV0JztcbmltcG9ydCB7IE5lc3RlZFJlcGx5UHJvZmlsZSB9IGZyb20gJy4vQ29uc3RydWN0cy9OZXN0ZWRSZXBseVByb2ZpbGUnO1xuaW1wb3J0IHsgUmVwbHkgfSBmcm9tICcuL0NvbnN0cnVjdHMvUmVwbHlDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgTmVzdGVkVHdlZXRSZXR3ZWV0ZWQgfSBmcm9tICcuL0NvbnN0cnVjdHMvTmVzdGVkVHdlZXRSZXR3ZWV0ZWQnO1xuaW1wb3J0IHsgTmVzdGVkUmV0d2VldE9mIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZFJldHdlZXRPZic7XG5pbXBvcnQgeyBOZXN0ZWRSZXR3ZWV0UHJvZmlsZSB9IGZyb20gJy4vQ29uc3RydWN0cy9OZXN0ZWRfUmV0d2VldFByb2ZpbGUnO1xuaW1wb3J0IHsgUmV0d2VldCB9IGZyb20gJy4vQ29uc3RydWN0cy9SZXR3ZWV0Q29uc3RydWN0JztcbmltcG9ydCB7IE5lc3RlZE90aGVyUHJvZmlsZSB9IGZyb20gJy4vQ29uc3RydWN0cy9OZXN0ZWRfT3RoZXJQcm9maWxlVHdlZXQnO1xuaW1wb3J0IHsgTmVzdGVkTXlQcm9maWxlIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZF9NeVByb2ZpbGVUd2VldCc7XG5pbXBvcnQgeyBHZXRMaWtlcyB9IGZyb20gJy4vQ29uc3RydWN0cy9HZXRMaWtlc0NvbnN0cnVjdCc7XG5pbXBvcnQgeyBVbmxpa2UgfSBmcm9tICcuL0NvbnN0cnVjdHMvVW5saWtlQ29uc3RydWN0JztcbmltcG9ydCB7IE5lc3RlZExpa2VkIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZExpa2VkJztcbmltcG9ydCB7IExpa2UgfSBmcm9tICcuL0NvbnN0cnVjdHMvTGlrZUNvbnRydWN0JztcbmltcG9ydCB7IE5lc3RlZFVuaHlkcmF0ZWRUd2VldHNQYWdlIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL05lc3RlZFVuaHlkcmF0ZWRUd2VldHMnO1xuaW1wb3J0IHsgR2V0TXlUaW1lTGluZSB9IGZyb20gJy4vQ29uc3RydWN0cy9HZXRNeVRpbWVMaW5lJztcbmltcG9ydCB7IFR3ZWV0IH0gZnJvbSAnLi9Db25zdHJ1Y3RzL1R3ZWV0Q29uc3RydWN0JztcbmltcG9ydCB7IEdldE15UHJvZmlsZVJlc29sdmVyIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL0dldE15UHJvZmlsZUNvbnN0cnVjdCc7XG5pbXBvcnQgeyBBcGlTdGFja1Byb3BzIH0gZnJvbSAnLi8uLi8uLi8uLi9JbnRlcmZhY2VzL2FwaS1pbnRlcmZhY2UnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gJ2NvbnN0cnVjdHMnO1xuaW1wb3J0ICogYXMgYXBwc3luYyBmcm9tICdAYXdzLWNkay9hd3MtYXBwc3luYy1hbHBoYSc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0IHsgRWRpdE15UHJvZmlsZSB9IGZyb20gJy4vQ29uc3RydWN0cy9FZGl0TXlQcm9maWxlQ29uc3RydWN0JztcbmltcG9ydCB7IEdldEltYWdlVXBsb2FkVVJMIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL0dldEltYWdlVXBsb2FkVXJsQ29uc3RydWN0JztcbmltcG9ydCB7IEdldFR3ZWV0c1Jlc29sdmVyIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL0dldFR3ZWV0c0NvbnN0dWN0JztcbmltcG9ydCB7IE5lc3RlZFByb2ZpbGVUd2VldCB9IGZyb20gJy4vQ29uc3RydWN0cy9OZXN0ZWRQcm9maWxlX1R5cGVfVHdlZXQnO1xuaW1wb3J0IHsgVW5SZXR3ZWV0IH0gZnJvbSAnLi9Db25zdHJ1Y3RzL1VuUmV0d2VldENvbnN0cnVjdCc7XG5pbXBvcnQgeyBOZXN0ZWRSZXBseVJldHdlZXRlZCB9IGZyb20gJy4vQ29uc3RydWN0cy9OZXN0ZWRSZXBseVJldHdlZXRlZCc7XG5pbXBvcnQgeyBOZXN0ZWRSZXBseUxpa2UgfSBmcm9tICcuL0NvbnN0cnVjdHMvTmVzdGVkUmVwbHlMaWtlJztcbmltcG9ydCB7IEZvbGxvdyB9IGZyb20gJy4vQ29uc3RydWN0cy9Gb2xsb3dDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgTmVzdGVkRm9sbG93ZWRCeU90aGVyUHJvZmlsZSB9IGZyb20gJy4vQ29uc3RydWN0cy9OZXN0ZWRGb2xsb3dlZEJ5UHJvZmlsZSc7XG5pbXBvcnQgeyBHZXRQcm9maWxlIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL0dldFByb2ZpbGVDb25zdHJ1Y3QnO1xuaW1wb3J0IHsgR2V0Rm9sbG93ZXJzIH0gZnJvbSAnLi9Db25zdHJ1Y3RzL0dldEZvbGxvd2Vyc0NvbnN0cnVjdCc7XG5pbXBvcnQgeyBTZWFyY2ggfSBmcm9tICcuL0NvbnN0cnVjdHMvU2VhcmNoQ29uc3RydWN0JztcbmltcG9ydCB7IE9uTm90aWZpZWQgfSBmcm9tICcuL0NvbnN0cnVjdHMvb25Ob3RpZmllZENvbnN0cmN1dCc7XG5leHBvcnQgY2xhc3MgQXBpU3RhY2sgZXh0ZW5kcyBjZGsuU3RhY2sge1xuICBwdWJsaWMgYXBpOiBhcHBzeW5jLkdyYXBocWxBcGk7XG4gIHB1YmxpYyBwcm9wczogQXBpU3RhY2tQcm9wcztcbiAgcHVibGljIGltYWdlVXBsb2FkRnVuY3Rpb246IGNkay5hd3NfbGFtYmRhX25vZGVqcy5Ob2RlanNGdW5jdGlvbjtcbiAgcHVibGljIHR3ZWV0RnVuY3Rpb246IGNkay5hd3NfbGFtYmRhX25vZGVqcy5Ob2RlanNGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBwcm9wczogQXBpU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuICAgIHRoaXMuYXBpID0gbmV3IGFwcHN5bmMuR3JhcGhxbEFwaSh0aGlzLCAnQXBpJywge1xuICAgICAgbmFtZTogJ3R3aXR0ZXItYXBpJyxcbiAgICAgIHNjaGVtYTogYXBwc3luYy5TY2hlbWEuZnJvbUFzc2V0KFxuICAgICAgICBwYXRoLmpvaW4oX19kaXJuYW1lLCAnU2NoZW1hL3NjaGVtYS5hcGkuZ3JhcGhxbCcpXG4gICAgICApLFxuICAgICAgYXV0aG9yaXphdGlvbkNvbmZpZzoge1xuICAgICAgICBkZWZhdWx0QXV0aG9yaXphdGlvbjoge1xuICAgICAgICAgIGF1dGhvcml6YXRpb25UeXBlOiBhcHBzeW5jLkF1dGhvcml6YXRpb25UeXBlLlVTRVJfUE9PTCxcbiAgICAgICAgICB1c2VyUG9vbENvbmZpZzoge1xuICAgICAgICAgICAgdXNlclBvb2w6IHByb3BzLnVzZXJQb29sXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAvLyBhZGRpdGlvbmFsIGlhbSBhdXRoXG4gICAgICAgIGFkZGl0aW9uYWxBdXRob3JpemF0aW9uTW9kZXM6IFtcbiAgICAgICAgICB7XG4gICAgICAgICAgICBhdXRob3JpemF0aW9uVHlwZTogYXBwc3luYy5BdXRob3JpemF0aW9uVHlwZS5JQU1cbiAgICAgICAgICB9XG4gICAgICAgIF1cbiAgICAgIH1cbiAgICB9KTtcbiAgICB0aGlzLnByb3BzID0gcHJvcHM7XG4gICAgdGhpcy5xdWVyaWVzKCk7XG4gICAgdGhpcy5tdXRhdGlvbnMoKTtcbiAgICB0aGlzLm5lc3RlZFJlc29sdmVycygpO1xuICAgIHRoaXMuc3Vic2NyaXB0aW9ucygpO1xuXG4gICAgLy9vdXRwdXQgQVBJIFVSTFxuICAgIG5ldyBjZGsuQ2ZuT3V0cHV0KHRoaXMsICdHcmFwaFFMQVBJVVJMJywge1xuICAgICAgdmFsdWU6IHRoaXMuYXBpLmdyYXBocWxVcmxcbiAgICB9KTtcbiAgfVxuXG4gIHB1YmxpYyBxdWVyaWVzKCkge1xuICAgIG5ldyBHZXRNeVByb2ZpbGVSZXNvbHZlcihcbiAgICAgIHRoaXMsXG4gICAgICAnUXVlcnlHZXRNeVByb2ZpbGVSZXNvbHZlcicsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMudXNlcnNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBjb25zdCBnZXRJbWFnZVVwbG9hZFVybCA9IG5ldyBHZXRJbWFnZVVwbG9hZFVSTChcbiAgICAgIHRoaXMsXG4gICAgICAnUXVlcnlHZXRJbWFnZVVwbG9hZFVybCcsXG4gICAgICB0aGlzLmFwaVxuICAgICk7XG4gICAgZ2V0SW1hZ2VVcGxvYWRVcmwucmVzb2x2ZXI7XG4gICAgdGhpcy5pbWFnZVVwbG9hZEZ1bmN0aW9uID0gZ2V0SW1hZ2VVcGxvYWRVcmwuZ2V0SW1hZ2VVcGxvYWRVUkxmdW5jdGlvbjtcblxuICAgIG5ldyBHZXRUd2VldHNSZXNvbHZlcihcbiAgICAgIHRoaXMsXG4gICAgICAnUXVlcnlHZXRUd2VldHNSZXNvbHZlcicsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMudHdlZXRzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IEdldE15VGltZUxpbmUoXG4gICAgICB0aGlzLFxuICAgICAgJ1F1ZXJ5R2V0TXlUaW1lTGluZVJlc29sdmVyJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy50aW1lbGluZXNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgR2V0TGlrZXModGhpcywgJ1F1ZXJ5R2V0TGlrZXNSZXNvbHZlcicsIHRoaXMuYXBpLCB0aGlzLnByb3BzLmxpa2VzVGFibGUpXG4gICAgICAucmVzb2x2ZXI7XG5cbiAgICBuZXcgR2V0UHJvZmlsZSh0aGlzLCAnUXVlcnlHZXRQcm9maWxlJywgdGhpcy5hcGksIHRoaXMucHJvcHMudXNlcnNUYWJsZSlcbiAgICAgIC5yZXNvbHZlcjtcblxuICAgIC8vIFRoaXMgaXMgcGlwZWxpbmUgcmVzb2x2ZXIgZXhhbXBsZVxuICAgIG5ldyBHZXRGb2xsb3dlcnMoXG4gICAgICB0aGlzLFxuICAgICAgJ1F1ZXJ5R2V0Rm9sbG93ZXJzJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy5yZWxhdGlvbnNoaXBzVGFibGUsXG4gICAgICB0aGlzLnByb3BzLnVzZXJzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IEdldEZvbGxvd2luZyhcbiAgICAgIHRoaXMsXG4gICAgICAnUXVlcnlHZXRGb2xsb3dpbmcnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnJlbGF0aW9uc2hpcHNUYWJsZSxcbiAgICAgIHRoaXMucHJvcHMudXNlcnNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgU2VhcmNoKHRoaXMsICdRdWVyeVNlYXJjaCcsIHRoaXMuYXBpKS5yZXNvbHZlcjtcbiAgICBuZXcgSGFzaHRhZyh0aGlzLCAnUXVlcnlIYXNodGFnJywgdGhpcy5hcGkpLnJlc29sdmVyO1xuICB9XG5cbiAgcHVibGljIG5lc3RlZFJlc29sdmVycygpIHtcbiAgICBuZXcgTmVzdGVkUHJvZmlsZVR3ZWV0KFxuICAgICAgdGhpcyxcbiAgICAgICdOZXN0ZWRQcm9maWxlVHdlZXQnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnVzZXJzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IE5lc3RlZFVuaHlkcmF0ZWRUd2VldHNQYWdlKFxuICAgICAgdGhpcyxcbiAgICAgICdOZXN0ZWRVbmh5ZHJhdGVkVHdlZXRzUGFnZScsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMudHdlZXRzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IE5lc3RlZExpa2VkKHRoaXMsICdOZXN0ZWRMaWtlZCcsIHRoaXMuYXBpLCB0aGlzLnByb3BzLmxpa2VzVGFibGUpXG4gICAgICAucmVzb2x2ZXI7XG4gICAgbmV3IE5lc3RlZE15UHJvZmlsZShcbiAgICAgIHRoaXMsXG4gICAgICAnTmVzdGVkTXlQcm9maWxlJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy50d2VldHNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgTmVzdGVkT3RoZXJQcm9maWxlKFxuICAgICAgdGhpcyxcbiAgICAgICdOZXN0ZWRPdGhlclByb2ZpbGUnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnR3ZWV0c1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIG5ldyBOZXN0ZWRSZXR3ZWV0UHJvZmlsZShcbiAgICAgIHRoaXMsXG4gICAgICAnTmVzdGVkUmV0d2VldFByb2ZpbGUnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnVzZXJzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IE5lc3RlZFJldHdlZXRPZihcbiAgICAgIHRoaXMsXG4gICAgICAnTmVzdGVkUmV0d2VldE9mJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy50d2VldHNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgTmVzdGVkVHdlZXRSZXR3ZWV0ZWQoXG4gICAgICB0aGlzLFxuICAgICAgJ05lc3RlZFR3ZWV0UmV0d2VldGVkJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy5yZXR3ZWV0c1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIG5ldyBOZXN0ZWRSZXBseVByb2ZpbGUoXG4gICAgICB0aGlzLFxuICAgICAgJ05lc3RlZFJlcGx5UHJvZmlsZScsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMudXNlcnNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgTmVzdGVkSW5SZXBseVRvVHdlZXQoXG4gICAgICB0aGlzLFxuICAgICAgJ05lc3RlZEluUmVwbHlUb1R3ZWV0JyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy50d2VldHNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICBuZXcgTmVzdGVkSW5SZXBseVRvVXNlcnMoXG4gICAgICB0aGlzLFxuICAgICAgJ05lc3RlZEluUmVwbHlUb1VzZXJzJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy51c2Vyc1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIG5ldyBOZXN0ZWRSZXBseVJldHdlZXRlZChcbiAgICAgIHRoaXMsXG4gICAgICAnTmVzdGVkUmVwbHlSZXR3ZWV0ZWQnLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnJldHdlZXRzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IE5lc3RlZFJlcGx5TGlrZShcbiAgICAgIHRoaXMsXG4gICAgICAnTmVzdGVkUmVwbHlMaWtlJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy5saWtlc1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIG5ldyBOZXN0ZWRGb2xsb3dpbmdPdGhlclByb2ZpbGUoXG4gICAgICB0aGlzLFxuICAgICAgJ05lc3RlZEZvbGxvd2luZ090aGVyUHJvZmlsZScsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMucmVsYXRpb25zaGlwc1RhYmxlXG4gICAgKS5yZXNvbHZlcjtcblxuICAgIG5ldyBOZXN0ZWRGb2xsb3dlZEJ5T3RoZXJQcm9maWxlKFxuICAgICAgdGhpcyxcbiAgICAgICdOZXN0ZWRGb2xsb3dlZEJ5T3RoZXJQcm9maWxlJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy5yZWxhdGlvbnNoaXBzVGFibGVcbiAgICApLnJlc29sdmVyO1xuICB9XG5cbiAgLy8gaWQgc3RyaW5nIHNob3VsZCBiZSB1bmlxdWUgZm9yIGVhY2ggY29uc3RydWN0XG4gIHB1YmxpYyBtdXRhdGlvbnMoKSB7XG4gICAgbmV3IEVkaXRNeVByb2ZpbGUoXG4gICAgICB0aGlzLFxuICAgICAgJ0VkaXRNeVByb2ZpbGVSZXNvbHZlcicsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMudXNlcnNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICAvL1R3ZWV0IE11dGF0aW9uXG4gICAgY29uc3QgdHdlZXRNdXRhdGlvbiA9IG5ldyBUd2VldCh0aGlzLCAnVHdlZXRNdXRhdGlvbicsIHRoaXMuYXBpKTtcbiAgICB0d2VldE11dGF0aW9uLnJlc29sdmVyO1xuICAgIHRoaXMucHJvcHMudXNlcnNUYWJsZS5ncmFudEZ1bGxBY2Nlc3ModHdlZXRNdXRhdGlvbi5Ud2VldGZ1bmN0aW9uKTtcbiAgICB0aGlzLnByb3BzLnR3ZWV0c1RhYmxlLmdyYW50RnVsbEFjY2Vzcyh0d2VldE11dGF0aW9uLlR3ZWV0ZnVuY3Rpb24pO1xuICAgIHRoaXMucHJvcHMudGltZWxpbmVzVGFibGUuZ3JhbnRGdWxsQWNjZXNzKHR3ZWV0TXV0YXRpb24uVHdlZXRmdW5jdGlvbik7XG5cbiAgICAvL1JldHdlZXRNdXRhdGlvblxuICAgIGNvbnN0IHJldHdlZXRNdXRhdGlvbiA9IG5ldyBSZXR3ZWV0KHRoaXMsICdSZXR3ZWV0TXV0YXRpb24nLCB0aGlzLmFwaSk7XG4gICAgcmV0d2VldE11dGF0aW9uLnJlc29sdmVyO1xuICAgIHRoaXMucHJvcHMudXNlcnNUYWJsZS5ncmFudEZ1bGxBY2Nlc3MocmV0d2VldE11dGF0aW9uLlJldHdlZXRmdW5jdGlvbik7XG4gICAgdGhpcy5wcm9wcy50d2VldHNUYWJsZS5ncmFudEZ1bGxBY2Nlc3MocmV0d2VldE11dGF0aW9uLlJldHdlZXRmdW5jdGlvbik7XG4gICAgdGhpcy5wcm9wcy50aW1lbGluZXNUYWJsZS5ncmFudEZ1bGxBY2Nlc3MocmV0d2VldE11dGF0aW9uLlJldHdlZXRmdW5jdGlvbik7XG4gICAgdGhpcy5wcm9wcy5yZXR3ZWV0c1RhYmxlLmdyYW50RnVsbEFjY2VzcyhyZXR3ZWV0TXV0YXRpb24uUmV0d2VldGZ1bmN0aW9uKTtcblxuICAgIC8vVW5SZXR3ZWV0TXV0YXRpb25cbiAgICBjb25zdCB1bnJldHdlZXRNdXRhdGlvbiA9IG5ldyBVblJldHdlZXQoXG4gICAgICB0aGlzLFxuICAgICAgJ1VuUmV0d2VldE11dGF0aW9uJyxcbiAgICAgIHRoaXMuYXBpXG4gICAgKTtcbiAgICB1bnJldHdlZXRNdXRhdGlvbi5yZXNvbHZlcjtcbiAgICB0aGlzLnByb3BzLnVzZXJzVGFibGUuZ3JhbnRGdWxsQWNjZXNzKHVucmV0d2VldE11dGF0aW9uLlVuUmV0d2VldEZ1bmN0aW9uKTtcbiAgICB0aGlzLnByb3BzLnR3ZWV0c1RhYmxlLmdyYW50RnVsbEFjY2Vzcyh1bnJldHdlZXRNdXRhdGlvbi5VblJldHdlZXRGdW5jdGlvbik7XG4gICAgdGhpcy5wcm9wcy50aW1lbGluZXNUYWJsZS5ncmFudEZ1bGxBY2Nlc3MoXG4gICAgICB1bnJldHdlZXRNdXRhdGlvbi5VblJldHdlZXRGdW5jdGlvblxuICAgICk7XG4gICAgdGhpcy5wcm9wcy5yZXR3ZWV0c1RhYmxlLmdyYW50RnVsbEFjY2VzcyhcbiAgICAgIHVucmV0d2VldE11dGF0aW9uLlVuUmV0d2VldEZ1bmN0aW9uXG4gICAgKTtcblxuICAgIC8vUmVwbHlNdXRhdGlvblxuICAgIGNvbnN0IHJlcGx5TXV0YXRpb24gPSBuZXcgUmVwbHkodGhpcywgJ1JlcGx5TXV0YXRpb24nLCB0aGlzLmFwaSk7XG4gICAgcmVwbHlNdXRhdGlvbi5yZXNvbHZlcjtcbiAgICB0aGlzLnByb3BzLnVzZXJzVGFibGUuZ3JhbnRGdWxsQWNjZXNzKHJlcGx5TXV0YXRpb24uUmVwbHlmdW5jdGlvbik7XG4gICAgdGhpcy5wcm9wcy50d2VldHNUYWJsZS5ncmFudEZ1bGxBY2Nlc3MocmVwbHlNdXRhdGlvbi5SZXBseWZ1bmN0aW9uKTtcbiAgICB0aGlzLnByb3BzLnRpbWVsaW5lc1RhYmxlLmdyYW50RnVsbEFjY2VzcyhyZXBseU11dGF0aW9uLlJlcGx5ZnVuY3Rpb24pO1xuXG4gICAgLy9MaWtlIE11dGF0aW9uXG4gICAgLy8gTWFudWFsbHkgaGF2ZSB0byBhZGQgYWNjZXNzIGluIHRoZSBzZXJ2aWNlIHJvbGUgZnJvbSBjb25zb2xlIGZvciB0d2VldHMgYW5kIHVzZXJzIHRhYmxlXG4gICAgY29uc3QgTGlrZU11dGF0aW9uID0gbmV3IExpa2UoXG4gICAgICB0aGlzLFxuICAgICAgJ0xpa2VNdXRhdGlvbicsXG4gICAgICB0aGlzLmFwaSxcbiAgICAgIHRoaXMucHJvcHMubGlrZXNUYWJsZVxuICAgICk7XG4gICAgTGlrZU11dGF0aW9uLnJlc29sdmVyO1xuXG4gICAgLy9Vbmxpa2UgTXV0YXRpb25cbiAgICAvLyBNYW51YWxseSBoYXZlIHRvIGFkZCBhY2Nlc3MgaW4gdGhlIHNlcnZpY2Ugcm9sZSBmcm9tIGNvbnNvbGUgZm9yIHR3ZWV0cyBhbmQgdXNlcnMgdGFibGVcblxuICAgIGNvbnN0IFVubGlrZU11dGF0aW9uID0gbmV3IFVubGlrZShcbiAgICAgIHRoaXMsXG4gICAgICAnVW5saWtlTXV0YXRpb24nLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLmxpa2VzVGFibGVcbiAgICApO1xuICAgIFVubGlrZU11dGF0aW9uLnJlc29sdmVyO1xuXG4gICAgLy9Gb2xsb3cgTXV0YXRpb25cbiAgICAvLyBNYW51YWxseSBhZGQgYWNjZXNzIGluIHRoZSBzZXJ2aWNlIHJvbGUgZnJvbSBjb25zb2xlIGZvciB1c2VycyB0YWJsZVxuICAgIGNvbnN0IEZvbGxvd011dGF0aW9uID0gbmV3IEZvbGxvdyhcbiAgICAgIHRoaXMsXG4gICAgICAnRm9sbG93TXV0YXRpb24nLFxuICAgICAgdGhpcy5hcGksXG4gICAgICB0aGlzLnByb3BzLnJlbGF0aW9uc2hpcHNUYWJsZVxuICAgICkucmVzb2x2ZXI7XG5cbiAgICAvL1VuZm9sbG93IE11dGF0aW9uXG4gICAgLy8gTWFudWFsbHkgYWRkIGFjY2VzcyBpbiB0aGUgc2VydmljZSByb2xlIGZyb20gY29uc29sZSBmb3IgdXNlcnMgdGFibGVcbiAgICBjb25zdCBVbmZvbGxvd011dGF0aW9uID0gbmV3IFVuRm9sbG93KFxuICAgICAgdGhpcyxcbiAgICAgICdVbmZvbGxvd011dGF0aW9uJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy5yZWxhdGlvbnNoaXBzVGFibGVcbiAgICApLnJlc29sdmVyO1xuXG4gICAgbmV3IE5vdGlmeVJldHdlZXRlZChcbiAgICAgIHRoaXMsXG4gICAgICAnTm90aWZ5UmV0d2VldGVkJyxcbiAgICAgIHRoaXMuYXBpLFxuICAgICAgdGhpcy5wcm9wcy5ub3RpZmljYXRpb25zVGFibGVcbiAgICApO1xuICB9XG5cbiAgcHVibGljIHN1YnNjcmlwdGlvbnMoKSB7XG4gICAgbmV3IE9uTm90aWZpZWQodGhpcywgJ09uTm90aWZpZWRTdWJzY3JpcHRpb24nLCB0aGlzLmFwaSk7XG4gIH1cbn1cbiJdfQ==