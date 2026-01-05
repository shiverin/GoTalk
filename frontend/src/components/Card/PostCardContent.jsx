import React from "react";

export default function CardContent({ className = "", padding = "p-4", ...props }) {
  return <div className={`${padding} ${className}`} {...props} />;
}
