export const Button = ({ children, className, ...props }: React.ComponentProps<"button">) => (
    <button
      className={`p-2 bg-orange-500 text-white rounded-lg hover:bg-orange-600 transition ${className}`}
      {...props}
    >
      {children}
    </button>
  );
  