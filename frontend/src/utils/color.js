export function getRandomColor() {
  const colors = [
    "#0079D3", // Reddit blue
    "#FF4500", // Reddit orange
    "#46D160", // Green
    "#FFB000", // Yellow
    "#9147FF", // Purple
    "#00A6A6", // Teal
  ];
  return colors[Math.floor(Math.random() * colors.length)];
}
