"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserPoolStack = void 0;
const cdk = require("aws-cdk-lib");
class UserPoolStack extends cdk.Stack {
    constructor(scope, id, props) {
        super(scope, id, props);
        //Cognito User Pool- How you want to user to sign up for you application and verify
        //Once the Pool is created you cannot change the schema...
        const userPool = new cdk.aws_cognito.UserPool(this, "UserPool", {
            userPoolName: "TwitterUserPool",
            autoVerify: {
                email: true,
            },
            passwordPolicy: {
                minLength: 8,
                requireLowercase: false,
                requireDigits: false,
                requireUppercase: false,
                requireSymbols: false,
            },
            signInAliases: {
                email: true,
            },
            customAttributes: {
                name: new cdk.aws_cognito.StringAttribute({
                    mutable: true,
                }),
            },
        });
        userPool.addTrigger(cdk.aws_cognito.UserPoolOperation.POST_CONFIRMATION, props.postConfirmationHook);
        //Member Variable for API stack
        this.userPool = userPool;
        const userPoolWebClient = new cdk.aws_cognito.UserPoolClient(this, "TwitterUserPool", {
            userPool,
            authFlows: {
                userPassword: true,
                userSrp: true,
            },
        });
        // Cognito User Pool id
        const userPoolId = new cdk.CfnOutput(this, "UserPoolId", {
            value: userPool.userPoolId,
            exportName: "UserPoolId",
        });
        const WebClientId = new cdk.CfnOutput(this, "Web Client Id ", {
            value: userPoolWebClient.userPoolClientId,
            exportName: "Web-Client-Id",
        });
    }
}
exports.UserPoolStack = UserPoolStack;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNlci1wb29sLXN0YWNrLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsidXNlci1wb29sLXN0YWNrLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLG1DQUFtQztBQU1uQyxNQUFhLGFBQWMsU0FBUSxHQUFHLENBQUMsS0FBSztJQUcxQyxZQUFZLEtBQWdCLEVBQUUsRUFBVSxFQUFFLEtBQXlCO1FBQ2pFLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxFQUFFLEtBQUssQ0FBQyxDQUFDO1FBQ3hCLG1GQUFtRjtRQUVuRiwwREFBMEQ7UUFDMUQsTUFBTSxRQUFRLEdBQUcsSUFBSSxHQUFHLENBQUMsV0FBVyxDQUFDLFFBQVEsQ0FBQyxJQUFJLEVBQUUsVUFBVSxFQUFFO1lBQzlELFlBQVksRUFBRSxpQkFBaUI7WUFDL0IsVUFBVSxFQUFFO2dCQUNWLEtBQUssRUFBRSxJQUFJO2FBQ1o7WUFDRCxjQUFjLEVBQUU7Z0JBQ2QsU0FBUyxFQUFFLENBQUM7Z0JBQ1osZ0JBQWdCLEVBQUUsS0FBSztnQkFDdkIsYUFBYSxFQUFFLEtBQUs7Z0JBQ3BCLGdCQUFnQixFQUFFLEtBQUs7Z0JBQ3ZCLGNBQWMsRUFBRSxLQUFLO2FBQ3RCO1lBQ0QsYUFBYSxFQUFFO2dCQUNiLEtBQUssRUFBRSxJQUFJO2FBQ1o7WUFDRCxnQkFBZ0IsRUFBRTtnQkFDaEIsSUFBSSxFQUFFLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxlQUFlLENBQUM7b0JBQ3hDLE9BQU8sRUFBRSxJQUFJO2lCQUNkLENBQUM7YUFDSDtTQUNGLENBQUMsQ0FBQztRQUNILFFBQVEsQ0FBQyxVQUFVLENBQ2pCLEdBQUcsQ0FBQyxXQUFXLENBQUMsaUJBQWlCLENBQUMsaUJBQWlCLEVBQ25ELEtBQUssQ0FBQyxvQkFBb0IsQ0FDM0IsQ0FBQztRQUVGLCtCQUErQjtRQUMvQixJQUFJLENBQUMsUUFBUSxHQUFHLFFBQVEsQ0FBQztRQUV6QixNQUFNLGlCQUFpQixHQUFHLElBQUksR0FBRyxDQUFDLFdBQVcsQ0FBQyxjQUFjLENBQzFELElBQUksRUFDSixpQkFBaUIsRUFDakI7WUFDRSxRQUFRO1lBQ1IsU0FBUyxFQUFFO2dCQUNULFlBQVksRUFBRSxJQUFJO2dCQUNsQixPQUFPLEVBQUUsSUFBSTthQUNkO1NBQ0YsQ0FDRixDQUFDO1FBRUYsdUJBQXVCO1FBQ3ZCLE1BQU0sVUFBVSxHQUFHLElBQUksR0FBRyxDQUFDLFNBQVMsQ0FBQyxJQUFJLEVBQUUsWUFBWSxFQUFFO1lBQ3ZELEtBQUssRUFBRSxRQUFRLENBQUMsVUFBVTtZQUMxQixVQUFVLEVBQUUsWUFBWTtTQUN6QixDQUFDLENBQUM7UUFFSCxNQUFNLFdBQVcsR0FBRyxJQUFJLEdBQUcsQ0FBQyxTQUFTLENBQUMsSUFBSSxFQUFFLGdCQUFnQixFQUFFO1lBQzVELEtBQUssRUFBRSxpQkFBaUIsQ0FBQyxnQkFBZ0I7WUFDekMsVUFBVSxFQUFFLGVBQWU7U0FDNUIsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQUNGO0FBNURELHNDQTREQyIsInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAqIGFzIGNkayBmcm9tIFwiYXdzLWNkay1saWJcIjtcbmltcG9ydCB7IENvbnN0cnVjdCB9IGZyb20gXCJjb25zdHJ1Y3RzXCI7XG5leHBvcnQgaW50ZXJmYWNlIFVzZXJQb29sU3RhY2tQcm9wcyBleHRlbmRzIGNkay5TdGFja1Byb3BzIHtcbiAgcG9zdENvbmZpcm1hdGlvbkhvb2s6IGNkay5hd3NfbGFtYmRhX25vZGVqcy5Ob2RlanNGdW5jdGlvbjsgLy8gQ29taW5nIGZyb20gQ29tcHV0ZSBTdGFja1xufVxuXG5leHBvcnQgY2xhc3MgVXNlclBvb2xTdGFjayBleHRlbmRzIGNkay5TdGFjayB7XG4gIHB1YmxpYyByZWFkb25seSB1c2VyUG9vbDogY2RrLmF3c19jb2duaXRvLlVzZXJQb29sO1xuXG4gIGNvbnN0cnVjdG9yKHNjb3BlOiBDb25zdHJ1Y3QsIGlkOiBzdHJpbmcsIHByb3BzOiBVc2VyUG9vbFN0YWNrUHJvcHMpIHtcbiAgICBzdXBlcihzY29wZSwgaWQsIHByb3BzKTtcbiAgICAvL0NvZ25pdG8gVXNlciBQb29sLSBIb3cgeW91IHdhbnQgdG8gdXNlciB0byBzaWduIHVwIGZvciB5b3UgYXBwbGljYXRpb24gYW5kIHZlcmlmeVxuXG4gICAgLy9PbmNlIHRoZSBQb29sIGlzIGNyZWF0ZWQgeW91IGNhbm5vdCBjaGFuZ2UgdGhlIHNjaGVtYS4uLlxuICAgIGNvbnN0IHVzZXJQb29sID0gbmV3IGNkay5hd3NfY29nbml0by5Vc2VyUG9vbCh0aGlzLCBcIlVzZXJQb29sXCIsIHtcbiAgICAgIHVzZXJQb29sTmFtZTogXCJUd2l0dGVyVXNlclBvb2xcIixcbiAgICAgIGF1dG9WZXJpZnk6IHtcbiAgICAgICAgZW1haWw6IHRydWUsXG4gICAgICB9LFxuICAgICAgcGFzc3dvcmRQb2xpY3k6IHtcbiAgICAgICAgbWluTGVuZ3RoOiA4LFxuICAgICAgICByZXF1aXJlTG93ZXJjYXNlOiBmYWxzZSxcbiAgICAgICAgcmVxdWlyZURpZ2l0czogZmFsc2UsXG4gICAgICAgIHJlcXVpcmVVcHBlcmNhc2U6IGZhbHNlLFxuICAgICAgICByZXF1aXJlU3ltYm9sczogZmFsc2UsXG4gICAgICB9LFxuICAgICAgc2lnbkluQWxpYXNlczoge1xuICAgICAgICBlbWFpbDogdHJ1ZSxcbiAgICAgIH0sXG4gICAgICBjdXN0b21BdHRyaWJ1dGVzOiB7XG4gICAgICAgIG5hbWU6IG5ldyBjZGsuYXdzX2NvZ25pdG8uU3RyaW5nQXR0cmlidXRlKHtcbiAgICAgICAgICBtdXRhYmxlOiB0cnVlLFxuICAgICAgICB9KSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdXNlclBvb2wuYWRkVHJpZ2dlcihcbiAgICAgIGNkay5hd3NfY29nbml0by5Vc2VyUG9vbE9wZXJhdGlvbi5QT1NUX0NPTkZJUk1BVElPTixcbiAgICAgIHByb3BzLnBvc3RDb25maXJtYXRpb25Ib29rXG4gICAgKTtcblxuICAgIC8vTWVtYmVyIFZhcmlhYmxlIGZvciBBUEkgc3RhY2tcbiAgICB0aGlzLnVzZXJQb29sID0gdXNlclBvb2w7XG5cbiAgICBjb25zdCB1c2VyUG9vbFdlYkNsaWVudCA9IG5ldyBjZGsuYXdzX2NvZ25pdG8uVXNlclBvb2xDbGllbnQoXG4gICAgICB0aGlzLFxuICAgICAgXCJUd2l0dGVyVXNlclBvb2xcIixcbiAgICAgIHtcbiAgICAgICAgdXNlclBvb2wsXG4gICAgICAgIGF1dGhGbG93czoge1xuICAgICAgICAgIHVzZXJQYXNzd29yZDogdHJ1ZSxcbiAgICAgICAgICB1c2VyU3JwOiB0cnVlLFxuICAgICAgICB9LFxuICAgICAgfVxuICAgICk7XG5cbiAgICAvLyBDb2duaXRvIFVzZXIgUG9vbCBpZFxuICAgIGNvbnN0IHVzZXJQb29sSWQgPSBuZXcgY2RrLkNmbk91dHB1dCh0aGlzLCBcIlVzZXJQb29sSWRcIiwge1xuICAgICAgdmFsdWU6IHVzZXJQb29sLnVzZXJQb29sSWQsXG4gICAgICBleHBvcnROYW1lOiBcIlVzZXJQb29sSWRcIixcbiAgICB9KTtcblxuICAgIGNvbnN0IFdlYkNsaWVudElkID0gbmV3IGNkay5DZm5PdXRwdXQodGhpcywgXCJXZWIgQ2xpZW50IElkIFwiLCB7XG4gICAgICB2YWx1ZTogdXNlclBvb2xXZWJDbGllbnQudXNlclBvb2xDbGllbnRJZCxcbiAgICAgIGV4cG9ydE5hbWU6IFwiV2ViLUNsaWVudC1JZFwiLFxuICAgIH0pO1xuICB9XG59XG4iXX0=