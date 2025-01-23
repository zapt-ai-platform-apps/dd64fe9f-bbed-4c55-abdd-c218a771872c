import { useState, useEffect } from 'react';
import * as Sentry from '@sentry/browser';
import { getStatus, getProfile } from '../services/workerDashboardService';
import { handleStatusUpdate, handleStatusClear, handleProfileUpdate, handleLinkCopy } from './workerDashboardHandlers';

export default function useWorkerDashboard(session) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(true);
  const [profile, setProfile] = useState({ name: '', bio: '', whatsappNumber: '' });
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const fetchedStatus = await getStatus(session.user.id);
        if (fetchedStatus !== null) setStatus(fetchedStatus);
        
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

  return {
    status,
    setStatus,
    loading,
    profile,
    setProfile,
    shareLink,
    handleUpdateStatus: () => handleStatusUpdate(session.access_token, status, setLoading),
    handleClearStatus: () => handleStatusClear(session.access_token, setLoading, setStatus),
    handleUpdateProfile: () => handleProfileUpdate(session.access_token, profile, setLoading, setProfile),
    handleCopyToClipboard: () => handleLinkCopy(shareLink)
  };
}