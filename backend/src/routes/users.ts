import express from 'express';
import { protect, authorize } from '../middleware/auth';
import { AuthRequest } from '../types';

const router = express.Router();

// @route   GET /api/users/profile
// @desc    Get current user profile
// @access  Private
router.get('/profile', protect, async (req: AuthRequest, res) => {
  try {
    res.json({
      success: true,
      data: {
        user: req.user as any
      }
    });
  } catch (error) {
    console.error('Get profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching profile'
    });
  }
});

// @route   PUT /api/users/profile
// @desc    Update current user profile
// @access  Private
router.put('/profile', protect, async (req: AuthRequest, res) => {
  try {
    const user = req.user!;
    
    // Update allowed fields
    const allowedFields = ['name', 'bio', 'location', 'skills', 'experience', 'education'];
    allowedFields.forEach(field => {
      if (req.body[field] !== undefined) {
        (user as any)[field] = req.body[field];
      }
    });

    await (user as any).save();

    res.json({
      success: true,
      message: 'Profile updated successfully',
      data: {
        user: user as any
      }
    });
  } catch (error) {
    console.error('Update profile error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while updating profile'
    });
  }
});

// @route   GET /api/users/applications
// @desc    Get user's job applications
// @access  Private
router.get('/applications', protect, async (req: AuthRequest, res) => {
  try {
    // This would typically fetch from an Application model
    // For now, we'll return an empty array
    res.json({
      success: true,
      data: {
        applications: []
      }
    });
  } catch (error) {
    console.error('Get applications error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching applications'
    });
  }
});

// @route   GET /api/users/stats
// @desc    Get user statistics
// @access  Private
router.get('/stats', protect, async (req: AuthRequest, res) => {
  try {
    // This would typically calculate various statistics
    // For now, we'll return basic stats
    const stats = {
      totalApplications: 0,
      activeApplications: 0,
      interviews: 0,
      offers: 0
    };

    res.json({
      success: true,
      data: { stats }
    });
  } catch (error) {
    console.error('Get stats error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching statistics'
    });
  }
});

// @route   GET /api/users/saved-jobs
// @desc    Get user's saved jobs
// @access  Private
router.get('/saved-jobs', protect, async (req: AuthRequest, res) => {
  try {
    // This would typically fetch from a SavedJob model
    // For now, we'll return an empty array
    res.json({
      success: true,
      data: {
        savedJobs: []
      }
    });
  } catch (error) {
    console.error('Get saved jobs error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while fetching saved jobs'
    });
  }
});

// @route   POST /api/users/saved-jobs
// @desc    Save a job for user
// @access  Private
router.post('/saved-jobs', protect, async (req: AuthRequest, res) => {
  try {
    const { jobId } = req.body;
    
    if (!jobId) {
      return res.status(400).json({
        success: false,
        message: 'Job ID is required'
      });
    }

    // This would typically save to a SavedJob model
    // For now, we'll return success
    res.json({
      success: true,
      message: 'Job saved successfully'
    });
  } catch (error) {
    console.error('Save job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while saving job'
    });
  }
});

// @route   DELETE /api/users/saved-jobs/:jobId
// @desc    Remove a saved job
// @access  Private
router.delete('/saved-jobs/:jobId', protect, async (req: AuthRequest, res) => {
  try {
    const { jobId } = req.params;
    
    // This would typically remove from a SavedJob model
    // For now, we'll return success
    res.json({
      success: true,
      message: 'Job removed from saved jobs'
    });
  } catch (error) {
    console.error('Remove saved job error:', error);
    res.status(500).json({
      success: false,
      message: 'Server error while removing saved job'
    });
  }
});

export default router; 