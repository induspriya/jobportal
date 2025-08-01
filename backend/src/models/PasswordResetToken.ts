import mongoose, { Document, Schema } from 'mongoose';
import { IPasswordResetToken } from '../types';

export interface PasswordResetTokenDocument extends Omit<IPasswordResetToken, '_id'>, Document {}

const passwordResetTokenSchema = new Schema<PasswordResetTokenDocument>({
  userId: {
    type: String,
    required: [true, 'User ID is required']
  },
  token: {
    type: String,
    required: [true, 'Token is required']
  },
  expiresAt: {
    type: Date,
    required: [true, 'Expiration date is required'],
    default: function() {
      return new Date(Date.now() + 60 * 60 * 1000); // 1 hour from now
    }
  }
}, {
  timestamps: true
});

// Index for token lookups
passwordResetTokenSchema.index({ token: 1 }, { unique: true });
passwordResetTokenSchema.index({ userId: 1 });
passwordResetTokenSchema.index({ expiresAt: 1 }, { expireAfterSeconds: 0 });

// Static method to create a new reset token
passwordResetTokenSchema.statics.createToken = async function(userId: string, token: string) {
  // Remove any existing tokens for this user
  await this.deleteMany({ userId });
  
  // Create new token
  return this.create({
    userId,
    token,
    expiresAt: new Date(Date.now() + 60 * 60 * 1000) // 1 hour
  });
};

// Static method to verify token
passwordResetTokenSchema.statics.verifyToken = async function(token: string) {
  const resetToken = await this.findOne({ 
    token,
    expiresAt: { $gt: new Date() }
  }).populate('userId', 'email name');
  
  return resetToken;
};

// Add static methods to the interface
export interface PasswordResetTokenModel extends mongoose.Model<PasswordResetTokenDocument> {
  createToken(userId: string, token: string): Promise<PasswordResetTokenDocument>;
  verifyToken(token: string): Promise<PasswordResetTokenDocument | null>;
}

export const PasswordResetToken = mongoose.model<PasswordResetTokenDocument, PasswordResetTokenModel>('PasswordResetToken', passwordResetTokenSchema); 