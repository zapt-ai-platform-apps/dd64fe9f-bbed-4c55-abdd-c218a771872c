import { useState, useEffect } from 'react';
import { getStatus, getProfile, updateStatus, updateProfile } from '../services/workerDashboardService';

export default function useWorkerDashboard(session) {
  const [status, setStatus] = useState('');
  const [loading, setLoading] = useState(false);
  const [profile, setProfile] = useState({ name: '', bio: '' });
  const [shareLink, setShareLink] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const fetchedStatus = await getStatus(session.user.id);
      if (fetchedStatus !== null) {
        setStatus(fetchedStatus);
      }

      const fetchedProfile = await getProfile(session.user.id);
      setProfile(fetchedProfile);

      setShareLink(`${window.location.origin}/?professionalId=${session.user.id}`);
    };

    fetchData();
  }, [session.user.id]);

  const handleUpdateStatus = async () => {
    setLoading(true);
    await updateStatus(session.access_token, status);
    setLoading(false);
    alert('Status updated');
  };

  const handleUpdateProfile = async () => {
    await updateProfile(session.access_token, profile);
    alert('Profile updated');
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