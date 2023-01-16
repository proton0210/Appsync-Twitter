"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SyncTweetsToAlgolia = void 0;
const constructs_1 = require("constructs");
const cdk = require("aws-cdk-lib");
const path = require("path");
class SyncTweetsToAlgolia extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const ssmPolicy = new cdk.aws_iam.PolicyStatement({
            effect: cdk.aws_iam.Effect.ALLOW,
            actions: ['ssm:*'],
            resources: ['*']
        });
        // Nodejs Construct
        const SyncTweetsToAlgolia = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'SyncTweetsToAlgolia', {
            entry: path.join(__dirname, '../Functions/SyncTweetsToAlgolia/index.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            memorySize: 526,
            timeout: cdk.Duration.seconds(30)
        });
        // add policy to lambda
        SyncTweetsToAlgolia.addToRolePolicy(ssmPolicy);
        this.SyncTweetsToAlgolia = SyncTweetsToAlgolia;
    }
}
exports.SyncTweetsToAlgolia = SyncTweetsToAlgolia;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU3luY1R3ZWV0c1RvQWxnb2xpYS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIlN5bmNUd2VldHNUb0FsZ29saWEudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsMkNBQXVDO0FBQ3ZDLG1DQUFtQztBQUNuQyw2QkFBNkI7QUFDN0IsTUFBYSxtQkFBb0IsU0FBUSxzQkFBUztJQUVoRCxZQUFZLEtBQWdCLEVBQUUsRUFBVTtRQUN0QyxLQUFLLENBQUMsS0FBSyxFQUFFLEVBQUUsQ0FBQyxDQUFDO1FBQ2pCLE1BQU0sU0FBUyxHQUFHLElBQUksR0FBRyxDQUFDLE9BQU8sQ0FBQyxlQUFlLENBQUM7WUFDaEQsTUFBTSxFQUFFLEdBQUcsQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDLEtBQUs7WUFDaEMsT0FBTyxFQUFFLENBQUMsT0FBTyxDQUFDO1lBQ2xCLFNBQVMsRUFBRSxDQUFDLEdBQUcsQ0FBQztTQUNqQixDQUFDLENBQUM7UUFFSCxtQkFBbUI7UUFDbkIsTUFBTSxtQkFBbUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ2xFLElBQUksRUFDSixxQkFBcUIsRUFDckI7WUFDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FDZCxTQUFTLEVBQ1QsMkNBQTJDLENBQzVDO1lBQ0QsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDM0MsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1NBQ2xDLENBQ0YsQ0FBQztRQUVGLHVCQUF1QjtRQUN2QixtQkFBbUIsQ0FBQyxlQUFlLENBQUMsU0FBUyxDQUFDLENBQUM7UUFFL0MsSUFBSSxDQUFDLG1CQUFtQixHQUFHLG1CQUFtQixDQUFDO0lBQ2pELENBQUM7Q0FDRjtBQS9CRCxrREErQkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBDb25zdHJ1Y3QgfSBmcm9tICdjb25zdHJ1Y3RzJztcbmltcG9ydCAqIGFzIGNkayBmcm9tICdhd3MtY2RrLWxpYic7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuZXhwb3J0IGNsYXNzIFN5bmNUd2VldHNUb0FsZ29saWEgZXh0ZW5kcyBDb25zdHJ1Y3Qge1xuICBwdWJsaWMgcmVhZG9ubHkgU3luY1R3ZWV0c1RvQWxnb2xpYTogY2RrLmF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uO1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcbiAgICBjb25zdCBzc21Qb2xpY3kgPSBuZXcgY2RrLmF3c19pYW0uUG9saWN5U3RhdGVtZW50KHtcbiAgICAgIGVmZmVjdDogY2RrLmF3c19pYW0uRWZmZWN0LkFMTE9XLFxuICAgICAgYWN0aW9uczogWydzc206KiddLFxuICAgICAgcmVzb3VyY2VzOiBbJyonXVxuICAgIH0pO1xuXG4gICAgLy8gTm9kZWpzIENvbnN0cnVjdFxuICAgIGNvbnN0IFN5bmNUd2VldHNUb0FsZ29saWEgPSBuZXcgY2RrLmF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgICdTeW5jVHdlZXRzVG9BbGdvbGlhJyxcbiAgICAgIHtcbiAgICAgICAgZW50cnk6IHBhdGguam9pbihcbiAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgJy4uL0Z1bmN0aW9ucy9TeW5jVHdlZXRzVG9BbGdvbGlhL2luZGV4LmpzJ1xuICAgICAgICApLFxuICAgICAgICBoYW5kbGVyOiAnaGFuZGxlcicsXG4gICAgICAgIHJ1bnRpbWU6IGNkay5hd3NfbGFtYmRhLlJ1bnRpbWUuTk9ERUpTXzE2X1gsXG4gICAgICAgIG1lbW9yeVNpemU6IDUyNixcbiAgICAgICAgdGltZW91dDogY2RrLkR1cmF0aW9uLnNlY29uZHMoMzApXG4gICAgICB9XG4gICAgKTtcblxuICAgIC8vIGFkZCBwb2xpY3kgdG8gbGFtYmRhXG4gICAgU3luY1R3ZWV0c1RvQWxnb2xpYS5hZGRUb1JvbGVQb2xpY3koc3NtUG9saWN5KTtcblxuICAgIHRoaXMuU3luY1R3ZWV0c1RvQWxnb2xpYSA9IFN5bmNUd2VldHNUb0FsZ29saWE7XG4gIH1cbn1cbiJdfQ==