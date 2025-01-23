import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { getStatus, getProfile, updateStatus, updateProfile } from '../services/workerDashboardService';

export default function useWorkerDashboard(session) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true); // Initialize loading as true
  const [profile, setProfile] = useState({ name: '', bio: '' });
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedStatus = await getStatus(session.user.id);
        if (fetchedStatus !== null) {
          setStatus(fetchedStatus);
        }

        const fetchedProfile = await getProfile(session.user.id);
        setProfile(fetchedProfile);

        setShareLink(`${window.location.origin}/?professionalId=${session.user.id}`);
      } catch (error) {
        Sentry.captureException(error);
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [session.user.id]);

  const handleUpdateStatus = async () => {
    setLoading(true);
    try {
      await updateStatus(session.access_token, status);
      alert('Status updated');
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      alert('Could not update status. Please check error logs in Sentry.');
    } finally {
      setLoading(false);
    }
  };

  const handleUpdateProfile = async () => {
    setLoading(true);
    try {
      await updateProfile(session.access_token, profile);
      alert('Profile updated');
    } catch (error) {
      Sentry.captureException(error);
      console.error(error);
      alert('Could not update profile. Please check error logs in Sentry.');
    } finally {
      setLoading(false);
    }
  };

  const handleCopyToClipboard = () => {
    navigator.clipboard.writeText(shareLink);
    alert('Share link copied to clipboard!');
  };

  return {
    status,
    setStatus,
    loading,
    profile,
    setProfile,
    shareLink,
    handleUpdateStatus,
    handleUpdateProfile,
    handleCopyToClipboard,
  };
}