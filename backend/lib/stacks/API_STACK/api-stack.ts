import { NotifyRetweeted } from './Constructs/NotifyRetweeted';
import { Hashtag } from './Constructs/HashTagConstruct';
import { GetFollowing } from './Constructs/GetFollowingConstruct';
import { UnFollow } from './Constructs/UnfollowConstruct';
import { NestedFollowingOtherProfile } from './Constructs/NestedFollowingProfie';
import { NestedInReplyToUsers } from './Constructs/NestedInReplyToUsers';
import { NestedInReplyToTweet } from './Constructs/NestedInReplToTweet';
import { NestedReplyProfile } from './Constructs/NestedReplyProfile';
import { Reply } from './Constructs/ReplyConstruct';
import { NestedTweetRetweeted } from './Constructs/NestedTweetRetweeted';
import { NestedRetweetOf } from './Constructs/NestedRetweetOf';
import { NestedRetweetProfile } from './Constructs/Nested_RetweetProfile';
import { Retweet } from './Constructs/RetweetConstruct';
import { NestedOtherProfile } from './Constructs/Nested_OtherProfileTweet';
import { NestedMyProfile } from './Constructs/Nested_MyProfileTweet';
import { GetLikes } from './Constructs/GetLikesConstruct';
import { Unlike } from './Constructs/UnlikeConstruct';
import { NestedLiked } from './Constructs/NestedLiked';
import { SendDirectMessageMutation } from './Constructs/SendDirectMessageMutation';
import { Like } from './Constructs/LikeContruct';
import { NestedUnhydratedTweetsPage } from './Constructs/NestedUnhydratedTweets';
import { GetMyTimeLine } from './Constructs/GetMyTimeLine';
import { Tweet } from './Constructs/TweetConstruct';
import { GetMyProfileResolver } from './Constructs/GetMyProfileConstruct';
import { ApiStackProps } from './../../../Interfaces/api-interface';
import * as cdk from 'aws-cdk-lib';
import { Construct } from 'constructs';
import * as appsync from '@aws-cdk/aws-appsync-alpha';
import * as path from 'path';
import { EditMyProfile } from './Constructs/EditMyProfileConstruct';
import { GetImageUploadURL } from './Constructs/GetImageUploadUrlConstruct';
import { GetTweetsResolver } from './Constructs/GetTweetsConstuct';
import { NestedProfileTweet } from './Constructs/NestedProfile_Type_Tweet';
import { UnRetweet } from './Constructs/UnRetweetConstruct';
import { NestedReplyRetweeted } from './Constructs/NestedReplyRetweeted';
import { NestedReplyLike } from './Constructs/NestedReplyLike';
import { Follow } from './Constructs/FollowConstruct';
import { NestedFollowedByOtherProfile } from './Constructs/NestedFollowedByProfile';
import { GetProfile } from './Constructs/GetProfileConstruct';
import { GetFollowers } from './Constructs/GetFollowersConstruct';
import { Search } from './Constructs/SearchConstruct';
import { OnNotified } from './Constructs/onNotifiedConstrcut';
import { NotifyLiked } from './Constructs/NotifyLiked';
import { NotifyMention } from './Constructs/NotifyMention';
import { NotifyReplied } from './Constructs/NotifyReplied';
import { OtherUserConversation } from './Constructs/NestedOtherUserConversationConstruct';
import { ListConversations } from './Constructs/ListConversations';
import { GetDirectMessages } from './Constructs/GetDirectMessages';
import { MessageFrom } from './Constructs/NestedMessageFrom';
import { NotifyDMed } from './Constructs/NotifyDMed';
export class ApiStack extends cdk.Stack {
  public api: appsync.GraphqlApi;
  public props: ApiStackProps;
  public imageUploadFunction: cdk.aws_lambda_nodejs.NodejsFunction;
  public tweetFunction: cdk.aws_lambda_nodejs.NodejsFunction;

  constructor(scope: Construct, id: string, props: ApiStackProps) {
    super(scope, id, props);
    this.api = new appsync.GraphqlApi(this, 'Api', {
      name: 'twitter-api',
      schema: appsync.Schema.fromAsset(
        path.join(__dirname, 'Schema/schema.api.graphql')
      ),
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

  public queries() {
    new GetMyProfileResolver(
      this,
      'QueryGetMyProfileResolver',
      this.api,
      this.props.usersTable
    ).resolver;

    const getImageUploadUrl = new GetImageUploadURL(
      this,
      'QueryGetImageUploadUrl',
      this.api
    );
    getImageUploadUrl.resolver;
    this.imageUploadFunction = getImageUploadUrl.getImageUploadURLfunction;

    new GetTweetsResolver(
      this,
      'QueryGetTweetsResolver',
      this.api,
      this.props.tweetsTable
    ).resolver;

    new GetMyTimeLine(
      this,
      'QueryGetMyTimeLineResolver',
      this.api,
      this.props.timelinesTable
    ).resolver;

    new GetLikes(this, 'QueryGetLikesResolver', this.api, this.props.likesTable)
      .resolver;

    new GetProfile(this, 'QueryGetProfile', this.api, this.props.usersTable)
      .resolver;

    // This is pipeline resolver example
    new GetFollowers(
      this,
      'QueryGetFollowers',
      this.api,
      this.props.relationshipsTable,
      this.props.usersTable
    ).resolver;

    new GetFollowing(
      this,
      'QueryGetFollowing',
      this.api,
      this.props.relationshipsTable,
      this.props.usersTable
    ).resolver;

    new Search(this, 'QuerySearch', this.api).resolver;
    new Hashtag(this, 'QueryHashtag', this.api).resolver;

    new ListConversations(
      this,
      'QueryListConversations',
      this.api,
      this.props.conversationsTable
    ).resolver;

    new GetDirectMessages(
      this,
      'QueryGetDirectMessages',
      this.api,
      this.props.directMessagesTable
    ).resolver;
  }

  public nestedResolvers() {
    new NestedProfileTweet(
      this,
      'NestedProfileTweet',
      this.api,
      this.props.usersTable
    ).resolver;

    new NestedUnhydratedTweetsPage(
      this,
      'NestedUnhydratedTweetsPage',
      this.api,
      this.props.tweetsTable
    ).resolver;

    new NestedLiked(this, 'NestedLiked', this.api, this.props.likesTable)
      .resolver;
    new NestedMyProfile(
      this,
      'NestedMyProfile',
      this.api,
      this.props.tweetsTable
    ).resolver;

    new NestedOtherProfile(
      this,
      'NestedOtherProfile',
      this.api,
      this.props.tweetsTable
    ).resolver;

    new NestedRetweetProfile(
      this,
      'NestedRetweetProfile',
      this.api,
      this.props.usersTable
    ).resolver;

    new NestedRetweetOf(
      this,
      'NestedRetweetOf',
      this.api,
      this.props.tweetsTable
    ).resolver;

    new NestedTweetRetweeted(
      this,
      'NestedTweetRetweeted',
      this.api,
      this.props.retweetsTable
    ).resolver;

    new NestedReplyProfile(
      this,
      'NestedReplyProfile',
      this.api,
      this.props.usersTable
    ).resolver;

    new NestedInReplyToTweet(
      this,
      'NestedInReplyToTweet',
      this.api,
      this.props.tweetsTable
    ).resolver;

    new NestedInReplyToUsers(
      this,
      'NestedInReplyToUsers',
      this.api,
      this.props.usersTable
    ).resolver;

    new NestedReplyRetweeted(
      this,
      'NestedReplyRetweeted',
      this.api,
      this.props.retweetsTable
    ).resolver;

    new NestedReplyLike(
      this,
      'NestedReplyLike',
      this.api,
      this.props.likesTable
    ).resolver;

    new NestedFollowingOtherProfile(
      this,
      'NestedFollowingOtherProfile',
      this.api,
      this.props.relationshipsTable
    ).resolver;

    new NestedFollowedByOtherProfile(
      this,
      'NestedFollowedByOtherProfile',
      this.api,
      this.props.relationshipsTable
    ).resolver;

    new OtherUserConversation(
      this,
      'OtherUserConversation',
      this.api,
      this.props.usersTable
    ).resolver;

    new MessageFrom(this, 'MessageFrom', this.api, this.props.usersTable)
      .resolver;
  }

  // id string should be unique for each construct
  public mutations() {
    new EditMyProfile(
      this,
      'EditMyProfileResolver',
      this.api,
      this.props.usersTable
    ).resolver;

    //Tweet Mutation
    const tweetMutation = new Tweet(this, 'TweetMutation', this.api);
    tweetMutation.resolver;
    this.props.usersTable.grantFullAccess(tweetMutation.Tweetfunction);
    this.props.tweetsTable.grantFullAccess(tweetMutation.Tweetfunction);
    this.props.timelinesTable.grantFullAccess(tweetMutation.Tweetfunction);

    //RetweetMutation
    const retweetMutation = new Retweet(this, 'RetweetMutation', this.api);
    retweetMutation.resolver;
    this.props.usersTable.grantFullAccess(retweetMutation.Retweetfunction);
    this.props.tweetsTable.grantFullAccess(retweetMutation.Retweetfunction);
    this.props.timelinesTable.grantFullAccess(retweetMutation.Retweetfunction);
    this.props.retweetsTable.grantFullAccess(retweetMutation.Retweetfunction);

    //UnRetweetMutation
    const unretweetMutation = new UnRetweet(
      this,
      'UnRetweetMutation',
      this.api
    );
    unretweetMutation.resolver;
    this.props.usersTable.grantFullAccess(unretweetMutation.UnRetweetFunction);
    this.props.tweetsTable.grantFullAccess(unretweetMutation.UnRetweetFunction);
    this.props.timelinesTable.grantFullAccess(
      unretweetMutation.UnRetweetFunction
    );
    this.props.retweetsTable.grantFullAccess(
      unretweetMutation.UnRetweetFunction
    );

    //ReplyMutation
    const replyMutation = new Reply(this, 'ReplyMutation', this.api);
    replyMutation.resolver;
    this.props.usersTable.grantFullAccess(replyMutation.Replyfunction);
    this.props.tweetsTable.grantFullAccess(replyMutation.Replyfunction);
    this.props.timelinesTable.grantFullAccess(replyMutation.Replyfunction);

    //Like Mutation
    // Manually have to add access in the service role from console for tweets and users table
    const LikeMutation = new Like(
      this,
      'LikeMutation',
      this.api,
      this.props.likesTable
    );
    LikeMutation.resolver;

    //Unlike Mutation
    // Manually have to add access in the service role from console for tweets and users table

    const UnlikeMutation = new Unlike(
      this,
      'UnlikeMutation',
      this.api,
      this.props.likesTable
    );
    UnlikeMutation.resolver;

    //Follow Mutation
    // Manually add access in the service role from console for users table
    const FollowMutation = new Follow(
      this,
      'FollowMutation',
      this.api,
      this.props.relationshipsTable
    ).resolver;

    //Unfollow Mutation
    // Manually add access in the service role from console for users table
    const UnfollowMutation = new UnFollow(
      this,
      'UnfollowMutation',
      this.api,
      this.props.relationshipsTable
    ).resolver;

    new NotifyRetweeted(
      this,
      'NotifyRetweeted',
      this.api,
      this.props.notificationsTable
    );

    new NotifyLiked(
      this,
      'NotifyLiked',
      this.api,
      this.props.notificationsTable
    );

    new NotifyMention(
      this,
      'NotifyMention',
      this.api,
      this.props.notificationsTable
    );

    new NotifyReplied(
      this,
      'NotifyReplied',
      this.api,
      this.props.notificationsTable
    );

    new SendDirectMessageMutation(
      this,
      'SendDirectMessageMutationResolver',
      this.api,
      this.props.directMesssageFunction
    ).resolver;

    new NotifyDMed(this, 'NotifyDMed', this.api, this.props.notificationsTable);
  }

  public subscriptions() {
    new OnNotified(this, 'OnNotifiedSubscription', this.api);
  }
}
