export const generateShareLink = (userId) => {
  return `${window.location.origin}/?professionalId=${userId}`;
};

export const copyToClipboard = (text) => {
  navigator.clipboard.writeText(text);
};