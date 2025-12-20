import React from "react";

export default function PostCard({ className = "", ...props }) {
  return (
    <div
      className={`rounded-2xl bg-white dark:bg-neutral-950 ${className}`}
      {...props}
    />
  );
}
