"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AmplifyStack = void 0;
const variables_1 = require("./../../../variables");
const cdk = require("aws-cdk-lib");
const amplify = require("@aws-cdk/aws-amplify-alpha");
class AmplifyStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        // The code that defines your stack goes here
        const amplifyApp = new amplify.App(this, `Amplify Twitter Frontend App`, {
            sourceCodeProvider: new amplify.GitHubSourceCodeProvider({
                owner: variables_1.GITHUB_USER_NAME,
                repository: variables_1.REPO_NAME,
                oauthToken: cdk.SecretValue.secretsManager('appsync-token')
            }),
            environmentVariables: {
                USER_POOL_ID: variables_1.COGNITO_USER_POOL_ID,
                USER_POOL_CLIENT_ID: variables_1.WEB_COGNITO_USER_POOL_CLIENT_ID,
                REGION: variables_1.REGION,
                APPSYNC_API: variables_1.GRAPHQL_URL
            }
        });
        amplifyApp.addBranch('main');
    }
}
exports.AmplifyStack = AmplifyStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYW1wbGlmeS1zdGFjay5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbImFtcGxpZnktc3RhY2sudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsb0RBUThCO0FBRTlCLG1DQUFtQztBQUNuQyxzREFBc0Q7QUFFdEQsTUFBYSxZQUFhLFNBQVEsR0FBRyxDQUFDLEtBQUs7SUFDekMsWUFBWSxLQUFnQixFQUFFLEVBQVUsRUFBRSxLQUFzQjtRQUM5RCxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsRUFBRSxLQUFLLENBQUMsQ0FBQztRQUN4Qiw2Q0FBNkM7UUFDN0MsTUFBTSxVQUFVLEdBQUcsSUFBSSxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksRUFBRSw4QkFBOEIsRUFBRTtZQUN2RSxrQkFBa0IsRUFBRSxJQUFJLE9BQU8sQ0FBQyx3QkFBd0IsQ0FBQztnQkFDdkQsS0FBSyxFQUFFLDRCQUFnQjtnQkFDdkIsVUFBVSxFQUFFLHFCQUFTO2dCQUNyQixVQUFVLEVBQUUsR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQUMsZUFBZSxDQUFDO2FBQzVELENBQUM7WUFDRixvQkFBb0IsRUFBRTtnQkFDcEIsWUFBWSxFQUFFLGdDQUFvQjtnQkFDbEMsbUJBQW1CLEVBQUUsMkNBQStCO2dCQUNwRCxNQUFNLEVBQUUsa0JBQU07Z0JBQ2QsV0FBVyxFQUFFLHVCQUFXO2FBQ3pCO1NBR0YsQ0FBQyxDQUFDO1FBQ0gsVUFBVSxDQUFDLFNBQVMsQ0FBQyxNQUFNLENBQUMsQ0FBQztJQUMvQixDQUFDO0NBQ0Y7QUFyQkQsb0NBcUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHtcbiAgR0lUSFVCX1VTRVJfTkFNRSxcbiAgUkVQT19OQU1FLFxuICBDT0dOSVRPX1VTRVJfUE9PTF9JRCxcbiAgV0VCX0NPR05JVE9fVVNFUl9QT09MX0NMSUVOVF9JRCxcbiAgUkVHSU9OLFxuICBHUkFQSFFMX1VSTCxcbiAgU0VDUkVUX0FSTlxufSBmcm9tICcuLy4uLy4uLy4uL3ZhcmlhYmxlcyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGFtcGxpZnkgZnJvbSAnQGF3cy1jZGsvYXdzLWFtcGxpZnktYWxwaGEnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5leHBvcnQgY2xhc3MgQW1wbGlmeVN0YWNrIGV4dGVuZHMgY2RrLlN0YWNrIHtcbiAgY29uc3RydWN0b3Ioc2NvcGU6IENvbnN0cnVjdCwgaWQ6IHN0cmluZywgcHJvcHM/OiBjZGsuU3RhY2tQcm9wcykge1xuICAgIHN1cGVyKHNjb3BlLCBpZCwgcHJvcHMpO1xuICAgIC8vIFRoZSBjb2RlIHRoYXQgZGVmaW5lcyB5b3VyIHN0YWNrIGdvZXMgaGVyZVxuICAgIGNvbnN0IGFtcGxpZnlBcHAgPSBuZXcgYW1wbGlmeS5BcHAodGhpcywgYEFtcGxpZnkgVHdpdHRlciBGcm9udGVuZCBBcHBgLCB7XG4gICAgICBzb3VyY2VDb2RlUHJvdmlkZXI6IG5ldyBhbXBsaWZ5LkdpdEh1YlNvdXJjZUNvZGVQcm92aWRlcih7XG4gICAgICAgIG93bmVyOiBHSVRIVUJfVVNFUl9OQU1FLFxuICAgICAgICByZXBvc2l0b3J5OiBSRVBPX05BTUUsXG4gICAgICAgIG9hdXRoVG9rZW46IGNkay5TZWNyZXRWYWx1ZS5zZWNyZXRzTWFuYWdlcignYXBwc3luYy10b2tlbicpXG4gICAgICB9KSxcbiAgICAgIGVudmlyb25tZW50VmFyaWFibGVzOiB7XG4gICAgICAgIFVTRVJfUE9PTF9JRDogQ09HTklUT19VU0VSX1BPT0xfSUQsXG4gICAgICAgIFVTRVJfUE9PTF9DTElFTlRfSUQ6IFdFQl9DT0dOSVRPX1VTRVJfUE9PTF9DTElFTlRfSUQsXG4gICAgICAgIFJFR0lPTjogUkVHSU9OLFxuICAgICAgICBBUFBTWU5DX0FQSTogR1JBUEhRTF9VUkxcbiAgICAgIH1cbiAgICAgIMKgwqBcblxuICAgIH0pO1xuICAgIGFtcGxpZnlBcHAuYWRkQnJhbmNoKCdtYWluJyk7XG4gIH1cbn1cbiJdfQ==