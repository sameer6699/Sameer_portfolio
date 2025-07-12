import mongoose, { Schema, Document } from 'mongoose';

export interface IChat extends Document {
  sessionId: string;
  userMessage: string;
  aiResponse: string;
  timestamp: Date;
  context?: any;
}

const chatSchema = new Schema<IChat>({
  sessionId: {
    type: String,
    required: true,
    index: true
  },
  userMessage: {
    type: String,
    required: true
  },
  aiResponse: {
    type: String,
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  context: {
    type: Schema.Types.Mixed,
    default: null
  }
});

// Create compound index for efficient querying
chatSchema.index({ sessionId: 1, timestamp: -1 });

export const Chat = mongoose.model<IChat>('sam_ai_chat', chatSchema); 