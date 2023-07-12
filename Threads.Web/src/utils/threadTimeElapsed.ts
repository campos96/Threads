const timeElapsed = (created: Date) => {
  const current = new Date();
  const thread = new Date(created);
  const millis = current.getTime() - thread.getTime();

  const seconds = Math.floor(millis / 1000);
  if (seconds < 60) return `${seconds}s`;

  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;

  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;

  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;

  return thread.toDateString();
};

export default timeElapsed;
