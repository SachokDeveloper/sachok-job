import { FileText } from "lucide-react";
import { Button } from "./Button";

export function TermsCard({
  title,
  description,
  onView,
}: {
  title: string;
  description: string;
  onView: () => void;
}) {
  return (
    <div className="bg-white border border-gray-100 rounded-2xl shadow-card p-8 text-center flex flex-col items-center">
      <span className="h-14 w-14 rounded-2xl bg-primary-50 flex items-center justify-center text-primary-600 mb-5">
        <FileText size={26} />
      </span>
      <h3 className="text-xl font-bold text-ink-900 mb-2 leading-snug whitespace-pre-line">{title}</h3>
      <p className="text-sm text-gray-500 mb-6 max-w-xs">{description}</p>
      <Button variant="primary" size="md" onClick={onView} className="w-full sm:w-auto px-8">
        <FileText size={16} /> View Document
      </Button>
    </div>
  );
}
