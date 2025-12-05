import { InterceptorCard } from './InterceptorCard';
import type { Interceptor } from './InterceptorCard';
import { Layers } from 'lucide-react';

interface VisualizerProps {
    interceptors: Interceptor[];
    error?: string | null;
}

export function Visualizer({ interceptors, error }: VisualizerProps) {

    if (error) {
        return (
            <div className="h-full flex items-center justify-center p-8 text-center opacity-50">
                <div className="max-w-md">
                    <Layers className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <h3 className="text-lg font-semibold mb-2">Waiting for valid configuration...</h3>
                    <p className="text-sm">Fix the errors in the editor to see the visualizer.</p>
                </div>
            </div>
        );
    }

    if (interceptors.length === 0) {
        return (
            <div className="h-full flex items-center justify-center p-8 text-center opacity-50">
                <div className="max-w-md">
                    <Layers className="w-12 h-12 mx-auto mb-4 opacity-20" />
                    <p>No interceptors found.</p>
                </div>
            </div>
        );
    }

    const firstInterceptors = interceptors
        .filter(i => i.executionPoint === 'FIRST')
        .sort((a, b) => a.position - b.position);

    const secondInterceptors = interceptors
        .filter(i => i.executionPoint === 'SECOND')
        .sort((a, b) => a.position - b.position);

    return (
        <div className="h-full overflow-auto bg-muted/30 p-8">
            <div className="space-y-8 max-w-3xl mx-auto">

                {/* FIRST Group */}
                <div>
                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 pl-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-blue-500"></span>
                        First Execution Point
                    </h2>
                    <div className="space-y-3 relative">
                        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border -z-10 dashed"></div>
                        {firstInterceptors.map((interceptor) => (
                            <InterceptorCard key={interceptor.position} interceptor={interceptor} />
                        ))}
                        {firstInterceptors.length === 0 && (
                            <div className="text-sm opacity-50 italic pl-4">No interceptors configured for FIRST</div>
                        )}
                    </div>
                </div>

                {/* SECOND Group */}
                <div>
                    <div className="flex items-center gap-4 py-4 opacity-50">
                        <div className="h-px bg-border flex-1"></div>
                        <span className="text-xs uppercase font-mono">Transition</span>
                        <div className="h-px bg-border flex-1"></div>
                    </div>

                    <h2 className="text-xs font-bold uppercase tracking-widest text-muted-foreground mb-4 pl-1 flex items-center gap-2">
                        <span className="w-2 h-2 rounded-full bg-purple-500"></span>
                        Second Execution Point
                    </h2>
                    <div className="space-y-3 relative">
                        <div className="absolute left-4 top-4 bottom-4 w-0.5 bg-border -z-10 dashed"></div>
                        {secondInterceptors.map((interceptor) => (
                            <InterceptorCard key={interceptor.position} interceptor={interceptor} />
                        ))}
                        {secondInterceptors.length === 0 && (
                            <div className="text-sm opacity-50 italic pl-4">No interceptors configured for SECOND</div>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}
