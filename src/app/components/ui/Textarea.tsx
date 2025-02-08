export const Textarea = ({ className, ...props }: React.ComponentProps<"textarea">) => (
    <textarea
      className={`p-2 border rounded-lg w-full resize-none ${className}`}
      rows={2}
      {...props}
    />
  );
  