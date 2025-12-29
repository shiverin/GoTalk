export function getRandomColor(seed) {
  const colors = [
    "#0079D3", // Reddit blue
    "#FF4500", // Reddit orange
    "#46D160", // Green
    "#FFB000", // Yellow
    "#9147FF", // Purple
    "#00A6A6", // Teal
  ];

  if (!seed) {
    // fallback to random
    return colors[Math.floor(Math.random() * colors.length)];
  }

  // simple hash: sum of char codes
  let hash = 0;
  const str = seed.toString();
  for (let i = 0; i < str.length; i++) {
    hash += str.charCodeAt(i);
  }

  // pick color based on hash
  return colors[hash % colors.length];
}
