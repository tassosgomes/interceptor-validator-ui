import { useState, useEffect } from 'react';
import yaml from 'js-yaml';
import { YAMLValidationEditor } from './components/Editor';
import { Visualizer } from './components/Visualizer';
import type { Interceptor } from './components/InterceptorCard';
import { Split } from 'lucide-react';

const DEFAULT_YAML = `apiVersion: api-management.sensedia.com/v1
kind: Interceptors
spec:
  interceptors:
    - position: 1
      type: Custom
      content:
        location: $custom_script.js
      executionPoint: FIRST
      status: REFERENCE
    - position: 2
      type: Log
      content:
        acceptedTerms: true
      executionPoint: FIRST
      status: REFERENCE
`;

function App() {
  const [yamlContent, setYamlContent] = useState<string>(DEFAULT_YAML);
  const [parsedInterceptors, setParsedInterceptors] = useState<Interceptor[]>([]);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    try {
      const parsed = yaml.load(yamlContent) as any;

      if (!parsed || typeof parsed !== 'object') {
        throw new Error('Invalid YAML format');
      }

      if (!parsed.spec?.interceptors || !Array.isArray(parsed.spec.interceptors)) {
        // If it's empty or initial load of structure, forgive it, but if it has content, warn
        if (parsed.spec) {
          throw new Error('YAML must contain spec.interceptors array');
        }
        setParsedInterceptors([]);
        setError(null);
        return;
      }

      setParsedInterceptors(parsed.spec.interceptors);
      setError(null);
    } catch (err: any) {
      console.error(err);
      setError(err.message || 'Error parsing YAML');
      // We don't clear interceptors immediately on error to prevent flickering, 
      // but in this case maybe we should? No, keep the last good state or just show error.
      // For now, let's keep the last good state but show the error overlay in Editor.
    }
  }, [yamlContent]);

  const handleEditorChange = (value: string | undefined) => {
    if (value !== undefined) {
      setYamlContent(value);
    }
  };

  return (
    <div className="h-screen w-screen flex flex-col bg-background text-foreground overflow-hidden">
      {/* Header */}
      <header className="h-14 border-b border-border flex items-center px-6 justify-between bg-card/50 backdrop-blur-sm z-50">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-primary/10 rounded-lg text-primary">
            <Split className="w-5 h-5" />
          </div>
          <h1 className="font-semibold tracking-tight">Interceptor Validator</h1>
        </div>
        <div className="text-xs text-muted-foreground font-mono">
          v1.0.0
        </div>
      </header>

      {/* Main Split Layout */}
      <main className="flex-1 flex overflow-hidden">
        {/* Left Pane: Editor */}
        <div className="w-1/2 h-full flex flex-col">
          <YAMLValidationEditor
            value={yamlContent}
            onChange={handleEditorChange}
            error={error}
          />
        </div>

        {/* Right Pane: Visualizer */}
        <div className="w-1/2 h-full border-l border-border relative bg-muted/10 shadow-inner">
          <Visualizer interceptors={parsedInterceptors} error={error} />
        </div>
      </main>
    </div>
  );
}

export default App;
