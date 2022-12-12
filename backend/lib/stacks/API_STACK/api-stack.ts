import { NestedTweetRetweeted } from './Constructs/NestedTweetRetweeted';
import { NestedRetweetOf } from './Constructs/NestedRetweetOf';
import { NestedRetweetProfile } from './Constructs/Nested_RetweetProfile';
import { Retweet } from './Constructs/RetweetConstruct';
import { NestedOtherProfile } from './Constructs/Nested_OtherProfileTweet';
import { NestedMyProfile } from './Constructs/Nested_MyProfileTweet';
import { GetLikes } from './Constructs/GetLikesConstruct';
import { Unlike } from './Constructs/UnlikeConstruct';
import { NestedLiked } from './Constructs/NestedLiked';
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
  }
}
