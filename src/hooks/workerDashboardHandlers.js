import * as Sentry from '@sentry/browser';
import { updateStatus, clearStatus, updateProfile } from '../services/workerDashboardService';

export const handleStatusUpdate = async (token, status, setLoading) => {
  setLoading(true);
  try {
    await updateStatus(token, status);
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    alert('Could not update status. Please check error logs in Sentry.');
  } finally {
    setLoading(false);
  }
};

export const handleStatusClear = async (token, setLoading, setStatus) => {
  setLoading(true);
  try {
    await clearStatus(token);
    setStatus('');
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    alert('Could not clear status. Please check error logs in Sentry.');
  } finally {
    setLoading(false);
  }
};

export const handleProfileUpdate = async (token, profile, setLoading) => {
  setLoading(true);
  try {
    await updateProfile(token, profile);
    alert('Profile updated');
  } catch (error) {
    Sentry.captureException(error);
    console.error(error);
    alert('Could not update profile. Please check error logs in Sentry.');
  } finally {
    setLoading(false);
  }
};

export const handleLinkCopy = (shareLink) => {
  navigator.clipboard.writeText(shareLink);
  alert('Share link copied to clipboard!');
};