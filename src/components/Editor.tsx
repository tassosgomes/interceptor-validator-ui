import type { OnMount } from '@monaco-editor/react';
import Editor from '@monaco-editor/react';

interface YAMLValidationEditorProps {
    value: string;
    onChange: (value: string | undefined) => void;
    error?: string | null;
}

export function YAMLValidationEditor({ value, onChange, error }: YAMLValidationEditorProps) {

    const handleEditorDidMount: OnMount = (_editor, monaco) => {
        // Optional configuraiton
        monaco.editor.defineTheme('custom-dark', {
            base: 'vs-dark',
            inherit: true,
            rules: [],
            colors: {
                'editor.background': '#0f172a', // Tailwind slate-900 or --background
            }
        });
        monaco.editor.setTheme('custom-dark');
    };

    return (
        <div className="h-full flex flex-col relative">
            <div className="flex-1 border-r border-border overflow-hidden">
                <Editor
                    height="100%"
                    defaultLanguage="yaml"
                    value={value}
                    onChange={onChange}
                    theme="vs-dark"
                    options={{
                        minimap: { enabled: false },
                        fontSize: 14,
                        padding: { top: 16 },
                        scrollBeyondLastLine: false,
                        automaticLayout: true,
                        tabSize: 2
                    }}
                    onMount={handleEditorDidMount}
                />
            </div>
            {error && (
                <div className="absolute bottom-4 left-4 right-4 bg-destructive/10 text-destructive border border-destructive/20 p-3 rounded-md backdrop-blur-md z-10 text-sm font-medium animate-in slide-in-from-bottom-2">
                    Warning: {error}
                </div>
            )}
        </div>
    );
}
