import { AlertCircle, Info } from "lucide-react";

type Props = {
  title?: string;
  error?: unknown;
};

function toMessage(err: unknown) {
  if (err && typeof err === 'object' && 'response' in err) {
    const axiosError = err as { response: { data: { message?: string } } };
    if (axiosError.response.data.message) return axiosError.response.data.message;
  }
  if (err instanceof Error) return err.message;
  return "Something went wrong. Please try again.";
}

export default function ErrorState({ title = "Error", error }: Props) {
  return (
    <div className="max-w-4xl mx-auto my-12 animate-fade-in">
      <div className="bg-red-50 border border-red-100 rounded-2xl p-6 shadow-sm">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-red-100 rounded-xl">
            <AlertCircle className="w-6 h-6 text-red-600" />
          </div>
          <div className="flex-1">
            <h3 className="text-lg font-bold text-red-900 mb-1">{title}</h3>
            <p className="text-red-700 text-sm leading-relaxed">
              {toMessage(error)}
            </p>
            <div className="mt-6 flex items-center gap-2 text-xs font-medium text-red-500 bg-white/50 w-fit px-3 py-1.5 rounded-lg border border-red-100">
              <Info className="w-3.5 h-3.5" />
              Tip: if you see rate limit errors (429), reduce refresh/polling.
            </div>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center">
        <button
          onClick={() => window.location.reload()}
          className="text-sm font-bold text-slate-500 hover:text-brand-600 transition-colors"
        >
          Try refreshing the page
        </button>
      </div>
    </div>
  );
}
