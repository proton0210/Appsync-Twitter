"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ConfirmUserSignUp = void 0;
const constructs_1 = require("constructs");
const cdk = require("aws-cdk-lib");
const path = require("path");
class ConfirmUserSignUp extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        // Nodejs Construct
        const confirmUserSignUp = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'ConfirmUserSignUp', {
            entry: path.join(__dirname, '../Functions/ConfirmSignUpTrigger/index.js'),
            handler: 'handler',
            runtime: cdk.aws_lambda.Runtime.NODEJS_16_X,
            memorySize: 526,
            timeout: cdk.Duration.seconds(30),
            environment: {
                USERS_TABLE: 'UsersTable'
            }
        });
        this.confirmUserSignUp = confirmUserSignUp;
    }
}
exports.ConfirmUserSignUp = ConfirmUserSignUp;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29uZmlybS11c2VyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiY29uZmlybS11c2VyLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLDJDQUF1QztBQUN2QyxtQ0FBbUM7QUFDbkMsNkJBQTZCO0FBQzdCLE1BQWEsaUJBQWtCLFNBQVEsc0JBQVM7SUFFOUMsWUFBWSxLQUFnQixFQUFFLEVBQVU7UUFDdEMsS0FBSyxDQUFDLEtBQUssRUFBRSxFQUFFLENBQUMsQ0FBQztRQUVqQixtQkFBbUI7UUFDbkIsTUFBTSxpQkFBaUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ2hFLElBQUksRUFDSixtQkFBbUIsRUFDbkI7WUFDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FDZCxTQUFTLEVBQ1QsNENBQTRDLENBQzdDO1lBQ0QsT0FBTyxFQUFFLFNBQVM7WUFDbEIsT0FBTyxFQUFFLEdBQUcsQ0FBQyxVQUFVLENBQUMsT0FBTyxDQUFDLFdBQVc7WUFDM0MsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxXQUFXLEVBQUUsWUFBWTthQUMxQjtTQUNGLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyxpQkFBaUIsR0FBRyxpQkFBaUIsQ0FBQztJQUM3QyxDQUFDO0NBQ0Y7QUExQkQsOENBMEJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBjZGsgZnJvbSAnYXdzLWNkay1saWInO1xuaW1wb3J0ICogYXMgcGF0aCBmcm9tICdwYXRoJztcbmV4cG9ydCBjbGFzcyBDb25maXJtVXNlclNpZ25VcCBleHRlbmRzIENvbnN0cnVjdCB7XG4gIHB1YmxpYyByZWFkb25seSBjb25maXJtVXNlclNpZ25VcDogY2RrLmF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uO1xuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIC8vIE5vZGVqcyBDb25zdHJ1Y3RcbiAgICBjb25zdCBjb25maXJtVXNlclNpZ25VcCA9IG5ldyBjZGsuYXdzX2xhbWJkYV9ub2RlanMuTm9kZWpzRnVuY3Rpb24oXG4gICAgICB0aGlzLFxuICAgICAgJ0NvbmZpcm1Vc2VyU2lnblVwJyxcbiAgICAgIHtcbiAgICAgICAgZW50cnk6IHBhdGguam9pbihcbiAgICAgICAgICBfX2Rpcm5hbWUsXG4gICAgICAgICAgJy4uL0Z1bmN0aW9ucy9Db25maXJtU2lnblVwVHJpZ2dlci9pbmRleC5qcydcbiAgICAgICAgKSxcbiAgICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLFxuICAgICAgICBydW50aW1lOiBjZGsuYXdzX2xhbWJkYS5SdW50aW1lLk5PREVKU18xNl9YLFxuICAgICAgICBtZW1vcnlTaXplOiA1MjYsXG4gICAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDMwKSxcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICBVU0VSU19UQUJMRTogJ1VzZXJzVGFibGUnXG4gICAgICAgIH1cbiAgICAgIH1cbiAgICApO1xuXG4gICAgdGhpcy5jb25maXJtVXNlclNpZ25VcCA9IGNvbmZpcm1Vc2VyU2lnblVwO1xuICB9XG59XG4iXX0=