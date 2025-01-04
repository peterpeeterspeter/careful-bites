import { Button } from "@/components/ui/button";
import { Loader2 } from "lucide-react";

interface GeneratorHeaderProps {
  loading: boolean;
  generationsLeft: number;
  isAuthenticated: boolean;
  onGenerate: () => void;
}

export function GeneratorHeader({
  loading,
  generationsLeft,
  isAuthenticated,
  onGenerate,
}: GeneratorHeaderProps) {
  return (
    <div className="flex justify-between items-center">
      <div>
        <h1 className="text-3xl font-bold">AI Recipe Generator</h1>
        {!isAuthenticated && (
          <p className="text-gray-600 mt-2">
            Try it free! {generationsLeft} free recipes remaining
          </p>
        )}
      </div>
      <Button onClick={onGenerate} disabled={loading || (!isAuthenticated && generationsLeft === 0)}>
        {loading ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Generating...
          </>
        ) : (
          "Generate Recipe"
        )}
      </Button>
    </div>
  );
}