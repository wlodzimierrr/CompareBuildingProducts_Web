import type { ReactNode } from "react";
import { SearchX } from "lucide-react";

interface EmptyStateProps {
  title: string;
  message: ReactNode;
}

const EmptyState = ({ title, message }: EmptyStateProps) => {
  return (
    <div className="app-surface p-10 text-center">
      <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full border border-stone-700 bg-stone-900 text-stone-400">
        <SearchX className="h-6 w-6" />
      </div>
      <h2 className="app-title mt-4 text-lg font-semibold">{title}</h2>
      <p className="app-copy mx-auto mt-2 max-w-md text-sm leading-6">{message}</p>
    </div>
  );
};

export default EmptyState;
