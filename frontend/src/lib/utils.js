export function formatMessageTime(date) {
  return new Date(date).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
}
export function formatJoinDate(date){
  return new Date(date).toLocaleDateString('en-US', {
  month: 'long',
  year: 'numeric'
});
}
export function formatTimeAgo(date) {
  const seconds = Math.floor((Date.now() - new Date(date)) / 1000);

  if (seconds < 60) return `${seconds}s`;
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  const days = Math.floor(hours / 24);
  if (days < 7) return `${days}d`;
  const weeks = Math.floor(days / 7);
  if (weeks < 4) return `${weeks}w`;
  const months = Math.floor(days / 30);
  if (months < 12) return `${months}mo`;
  const years = Math.floor(days / 365);
  return `${years}y`;
}

export function moodDay(date){
  return new Date(date).toLocaleDateString('en-US',{
    weekday:'long'
  })
}

export function todaysDate(){
  return new Date().toLocaleDateString('en-US', {
  day:'numeric',
  month: 'long',
  weekday: 'long'
});
}

export function findScore(mood){
  if(mood === 'Excellent') return 5
  if(mood === 'Happy') return 4
  if(mood === 'Calm') return 3
  if(mood === 'Sad') return 2
  if(mood === 'Depressed') return 1
}
export function editMood(mood){
  if(mood === 'Excellent') return 'Excellent 😃'
  if(mood === 'Happy') return 'Happy 🙂'
  if(mood === 'Calm') return 'Calm 😌'
  if(mood === 'Sad') return 'Sad ☹️'
  if(mood === 'Depressed') return 'Depressed 😖'
}
