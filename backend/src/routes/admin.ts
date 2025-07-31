import express from 'express';
import { User } from '../models/User';
import { Job } from '../models/Job';
import { PasswordResetToken } from '../models/PasswordResetToken';

const router = express.Router();

// Clear all data (development only)
router.delete('/clear-db', async (req, res) => {
  try {
    if (process.env.NODE_ENV === 'production') {
      return res.status(403).json({ 
        success: false, 
        message: 'This endpoint is not available in production' 
      });
    }

    await User.deleteMany({});
    await Job.deleteMany({});
    await PasswordResetToken.deleteMany({});

    res.status(200).json({ 
      success: true, 
      message: 'Database cleared successfully' 
    });
  } catch (error) {
    console.error('Error clearing database:', error);
    res.status(500).json({ 
      success: false, 
      message: 'Failed to clear database' 
    });
  }
});

export default router; 