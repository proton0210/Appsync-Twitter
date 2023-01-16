"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Search = void 0;
const constructs_1 = require("constructs");
const cdk = require("aws-cdk-lib");
const appsync = require("@aws-cdk/aws-appsync-alpha");
const path = require("path");
class Search extends constructs_1.Construct {
    constructor(scope, id, api) {
        super(scope, id);
        this.api = api;
        const ssmPolicy = new cdk.aws_iam.PolicyStatement({
            effect: cdk.aws_iam.Effect.ALLOW,
            actions: ['ssm:*'],
            resources: ['*']
        });
        // Nodejs Construct
        const Search = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'Search', {
            entry: path.join(__dirname, '../resolvers/query/Search/index.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            memorySize: 128,
            timeout: cdk.Duration.seconds(30)
        });
        // add policy to lambda
        Search.addToRolePolicy(ssmPolicy);
        this.Search = Search;
        const SearchResolver = () => {
            return new appsync.Resolver(this, 'SearchResolver', {
                api: this.api,
                typeName: 'Query',
                fieldName: 'search',
                dataSource: this.api.addLambdaDataSource('SearchLambda', Search)
            });
        };
        this.resolver = SearchResolver();
    }
}
exports.Search = Search;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VhcmNoQ29uc3RydWN0LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiU2VhcmNoQ29uc3RydWN0LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsc0RBQXNEO0FBRXRELDZCQUE2QjtBQUM3QixNQUFhLE1BQU8sU0FBUSxzQkFBUztJQUluQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEdBQXVCO1FBQy9ELEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFDakIsSUFBSSxDQUFDLEdBQUcsR0FBRyxHQUFHLENBQUM7UUFDZixNQUFNLFNBQVMsR0FBRyxJQUFJLEdBQUcsQ0FBQyxPQUFPLENBQUMsZUFBZSxDQUFDO1lBQ2hELE1BQU0sRUFBRSxHQUFHLENBQUMsT0FBTyxDQUFDLE1BQU0sQ0FBQyxLQUFLO1lBQ2hDLE9BQU8sRUFBRSxDQUFDLE9BQU8sQ0FBQztZQUNsQixTQUFTLEVBQUUsQ0FBQyxHQUFHLENBQUM7U0FDakIsQ0FBQyxDQUFDO1FBRUgsbUJBQW1CO1FBQ25CLE1BQU0sTUFBTSxHQUFHLElBQUksR0FBRyxDQUFDLGlCQUFpQixDQUFDLGNBQWMsQ0FBQyxJQUFJLEVBQUUsUUFBUSxFQUFFO1lBQ3RFLEtBQUssRUFBRSxJQUFJLENBQUMsSUFBSSxDQUFDLFNBQVMsRUFBRSxvQ0FBb0MsQ0FBQztZQUNqRSxPQUFPLEVBQUUsU0FBUztZQUNsQixPQUFPLEVBQUUsR0FBRyxDQUFDLFVBQVUsQ0FBQyxPQUFPLENBQUMsV0FBVztZQUMzQyxVQUFVLEVBQUUsR0FBRztZQUNmLE9BQU8sRUFBRSxHQUFHLENBQUMsUUFBUSxDQUFDLE9BQU8sQ0FBQyxFQUFFLENBQUM7U0FDbEMsQ0FBQyxDQUFDO1FBRUgsdUJBQXVCO1FBQ3ZCLE1BQU0sQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFbEMsSUFBSSxDQUFDLE1BQU0sR0FBRyxNQUFNLENBQUM7UUFFckIsTUFBTSxjQUFjLEdBQUcsR0FBRyxFQUFFO1lBQzFCLE9BQU8sSUFBSSxPQUFPLENBQUMsUUFBUSxDQUFDLElBQUksRUFBRSxnQkFBZ0IsRUFBRTtnQkFDbEQsR0FBRyxFQUFFLElBQUksQ0FBQyxHQUFHO2dCQUNiLFFBQVEsRUFBRSxPQUFPO2dCQUNqQixTQUFTLEVBQUUsUUFBUTtnQkFDbkIsVUFBVSxFQUFFLElBQUksQ0FBQyxHQUFHLENBQUMsbUJBQW1CLENBQUMsY0FBYyxFQUFFLE1BQU0sQ0FBQzthQUNqRSxDQUFDLENBQUM7UUFDTCxDQUFDLENBQUM7UUFFRixJQUFJLENBQUMsUUFBUSxHQUFHLGNBQWMsRUFBRSxDQUFDO0lBQ25DLENBQUM7Q0FDRjtBQXRDRCx3QkFzQ0MiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBhcHBzeW5jIGZyb20gJ0Bhd3MtY2RrL2F3cy1hcHBzeW5jLWFscGhhJztcblxuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBjbGFzcyBTZWFyY2ggZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgU2VhcmNoOiBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb247XG4gIHB1YmxpYyBhcGk6IGFwcHN5bmMuR3JhcGhxbEFwaTtcbiAgcHVibGljIHJlc29sdmVyOiBhcHBzeW5jLlJlc29sdmVyO1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nLCBhcGk6IGFwcHN5bmMuR3JhcGhxbEFwaSkge1xuICAgIHN1cGVyKHNjb3BlLCBpZCk7XG4gICAgdGhpcy5hcGkgPSBhcGk7XG4gICAgY29uc3Qgc3NtUG9saWN5ID0gbmV3IGNkay5hd3NfaWFtLlBvbGljeVN0YXRlbWVudCh7XG4gICAgICBlZmZlY3Q6IGNkay5hd3NfaWFtLkVmZmVjdC5BTExPVyxcbiAgICAgIGFjdGlvbnM6IFsnc3NtOionXSxcbiAgICAgIHJlc291cmNlczogWycqJ11cbiAgICB9KTtcblxuICAgIC8vIE5vZGVqcyBDb25zdHJ1Y3RcbiAgICBjb25zdCBTZWFyY2ggPSBuZXcgY2RrLmF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uKHRoaXMsICdTZWFyY2gnLCB7XG4gICAgICBlbnRyeTogcGF0aC5qb2luKF9fZGlybmFtZSwgJy4uL3Jlc29sdmVycy9xdWVyeS9TZWFyY2gvaW5kZXguanMnKSxcbiAgICAgIGhhbmRsZXI6ICdoYW5kbGVyJyxcbiAgICAgIHJ1bnRpbWU6IGNkay5hd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICBtZW1vcnlTaXplOiAxMjgsXG4gICAgICB0aW1lb3V0OiBjZGsuRHVyYXRpb24uc2Vjb25kcygzMClcbiAgICB9KTtcblxuICAgIC8vIGFkZCBwb2xpY3kgdG8gbGFtYmRhXG4gICAgU2VhcmNoLmFkZFRvUm9sZVBvbGljeShzc21Qb2xpY3kpO1xuXG4gICAgdGhpcy5TZWFyY2ggPSBTZWFyY2g7XG5cbiAgICBjb25zdCBTZWFyY2hSZXNvbHZlciA9ICgpID0+IHtcbiAgICAgIHJldHVybiBuZXcgYXBwc3luYy5SZXNvbHZlcih0aGlzLCAnU2VhcmNoUmVzb2x2ZXInLCB7XG4gICAgICAgIGFwaTogdGhpcy5hcGksXG4gICAgICAgIHR5cGVOYW1lOiAnUXVlcnknLFxuICAgICAgICBmaWVsZE5hbWU6ICdzZWFyY2gnLFxuICAgICAgICBkYXRhU291cmNlOiB0aGlzLmFwaS5hZGRMYW1iZGFEYXRhU291cmNlKCdTZWFyY2hMYW1iZGEnLCBTZWFyY2gpXG4gICAgICB9KTtcbiAgICB9O1xuXG4gICAgdGhpcy5yZXNvbHZlciA9IFNlYXJjaFJlc29sdmVyKCk7XG4gIH1cbn1cbiJdfQ==