export default function Container({ children, ...props }) {
  return (
    <div {...props} className="containermx-auto">
      {children}
    </div>
  );
}
