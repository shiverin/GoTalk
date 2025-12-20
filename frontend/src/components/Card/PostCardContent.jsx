export default function CardContent({ className, ...props }) {
  return <div className={`p-4 ${className} `} {...props} />;
}
