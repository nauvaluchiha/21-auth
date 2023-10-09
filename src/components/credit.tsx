export function Credit({ children }: { children?: React.ReactNode }) {
  return (
    <div className="text-center pt-5 pb-5">
      {children}
      <h5 className="text-sm">
        Made by <span className="text-red-500 text-sm">Naufal Nasrullah</span> with{" "}
        <span className="underline text-emerald-500 text-sm">
          React, Tailwind, Shadcn, React Hook Form, Zod, Redux, TypeScript, and ❤
        </span>
      </h5>
      <h6 className="text-xs mt-1">⚠️ please contact me if you found any bug ⚠️</h6>
    </div>
  );
}
