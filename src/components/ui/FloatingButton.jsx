import { Link } from "react-router-dom";

export default function FloatingButton({ path, icon: Icon, ...props }) {
  return (
    <Link
      to={path}
      className="fixed bottom-4 right-4 cursor-pointer size-16 bg-primary hover:bg-primary-dark rounded-full flex items-center justify-center text-white"
      {...props}
    >
      <Icon />
    </Link>
  );
}
