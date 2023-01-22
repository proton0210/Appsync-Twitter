"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.SendDirectMessage = void 0;
const cdk = require("aws-cdk-lib");
const constructs_1 = require("constructs");
const path = require("path");
class SendDirectMessage extends constructs_1.Construct {
    constructor(scope, id) {
        super(scope, id);
        const SendDirectMessagefunction = new cdk.aws_lambda_nodejs.NodejsFunction(this, 'SendDirectMessageFunction', {
            entry: path.join(__dirname, '../Functions/SendDirectMessage/index.js'),
            handler: 'handler',
            memorySize: 128,
            timeout: cdk.Duration.seconds(10),
            environment: {
                CONVERSATIONS_TABLE: 'ConversationsTable',
                DIRECT_MESSAGES_TABLE: 'DirectMessagesTable'
            }
        });
        this.SendDirectMessagefunction = SendDirectMessagefunction;
    }
}
exports.SendDirectMessage = SendDirectMessage;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VuZERpcmVjdE1lc3NhZ2UuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyJTZW5kRGlyZWN0TWVzc2FnZS50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFBQSxtQ0FBbUM7QUFFbkMsMkNBQXVDO0FBQ3ZDLDZCQUE2QjtBQUM3QixNQUFhLGlCQUFrQixTQUFRLHNCQUFTO0lBRzlDLFlBQVksS0FBZ0IsRUFBRSxFQUFVO1FBQ3RDLEtBQUssQ0FBQyxLQUFLLEVBQUUsRUFBRSxDQUFDLENBQUM7UUFFakIsTUFBTSx5QkFBeUIsR0FBRyxJQUFJLEdBQUcsQ0FBQyxpQkFBaUIsQ0FBQyxjQUFjLENBQ3hFLElBQUksRUFDSiwyQkFBMkIsRUFDM0I7WUFDRSxLQUFLLEVBQUUsSUFBSSxDQUFDLElBQUksQ0FBQyxTQUFTLEVBQUUseUNBQXlDLENBQUM7WUFDdEUsT0FBTyxFQUFFLFNBQVM7WUFDbEIsVUFBVSxFQUFFLEdBQUc7WUFDZixPQUFPLEVBQUUsR0FBRyxDQUFDLFFBQVEsQ0FBQyxPQUFPLENBQUMsRUFBRSxDQUFDO1lBQ2pDLFdBQVcsRUFBRTtnQkFDWCxtQkFBbUIsRUFBRSxvQkFBb0I7Z0JBQ3pDLHFCQUFxQixFQUFFLHFCQUFxQjthQUM3QztTQUNGLENBQ0YsQ0FBQztRQUVGLElBQUksQ0FBQyx5QkFBeUIsR0FBRyx5QkFBeUIsQ0FBQztJQUM3RCxDQUFDO0NBQ0Y7QUF2QkQsOENBdUJDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICogYXMgY2RrIGZyb20gJ2F3cy1jZGstbGliJztcbmltcG9ydCAqIGFzIGFwcHN5bmMgZnJvbSAnQGF3cy1jZGsvYXdzLWFwcHN5bmMtYWxwaGEnO1xuaW1wb3J0IHsgQ29uc3RydWN0IH0gZnJvbSAnY29uc3RydWN0cyc7XG5pbXBvcnQgKiBhcyBwYXRoIGZyb20gJ3BhdGgnO1xuZXhwb3J0IGNsYXNzIFNlbmREaXJlY3RNZXNzYWdlIGV4dGVuZHMgQ29uc3RydWN0IHtcbiAgcHVibGljIHJlYWRvbmx5IFNlbmREaXJlY3RNZXNzYWdlZnVuY3Rpb246IGNkay5hd3NfbGFtYmRhX25vZGVqcy5Ob2RlanNGdW5jdGlvbjtcblxuICBjb25zdHJ1Y3RvcihzY29wZTogQ29uc3RydWN0LCBpZDogc3RyaW5nKSB7XG4gICAgc3VwZXIoc2NvcGUsIGlkKTtcblxuICAgIGNvbnN0IFNlbmREaXJlY3RNZXNzYWdlZnVuY3Rpb24gPSBuZXcgY2RrLmF3c19sYW1iZGFfbm9kZWpzLk5vZGVqc0Z1bmN0aW9uKFxuICAgICAgdGhpcyxcbiAgICAgICdTZW5kRGlyZWN0TWVzc2FnZUZ1bmN0aW9uJyxcbiAgICAgIHtcbiAgICAgICAgZW50cnk6IHBhdGguam9pbihfX2Rpcm5hbWUsICcuLi9GdW5jdGlvbnMvU2VuZERpcmVjdE1lc3NhZ2UvaW5kZXguanMnKSxcbiAgICAgICAgaGFuZGxlcjogJ2hhbmRsZXInLFxuICAgICAgICBtZW1vcnlTaXplOiAxMjgsXG4gICAgICAgIHRpbWVvdXQ6IGNkay5EdXJhdGlvbi5zZWNvbmRzKDEwKSxcbiAgICAgICAgZW52aXJvbm1lbnQ6IHtcbiAgICAgICAgICBDT05WRVJTQVRJT05TX1RBQkxFOiAnQ29udmVyc2F0aW9uc1RhYmxlJyxcbiAgICAgICAgICBESVJFQ1RfTUVTU0FHRVNfVEFCTEU6ICdEaXJlY3RNZXNzYWdlc1RhYmxlJ1xuICAgICAgICB9XG4gICAgICB9XG4gICAgKTtcblxuICAgIHRoaXMuU2VuZERpcmVjdE1lc3NhZ2VmdW5jdGlvbiA9IFNlbmREaXJlY3RNZXNzYWdlZnVuY3Rpb247XG4gIH1cbn1cbiJdfQ==