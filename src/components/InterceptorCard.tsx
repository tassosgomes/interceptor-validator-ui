import { cn } from '../lib/utils';
import { Shield, Clock, FileText, Activity, Code, ArrowRight } from 'lucide-react';

export interface Interceptor {
    position: number;
    type: string;
    content: Record<string, any>;
    executionPoint: string;
    status: string;
}

interface InterceptorCardProps {
    interceptor: Interceptor;
}

const getTypeIcon = (type: string) => {
    switch (type.toLowerCase()) {
        case 'log': return <FileText className="w-4 h-4" />;
        case 'rate limit': return <Clock className="w-4 h-4" />;
        case 'custom': return <Code className="w-4 h-4" />;
        case 'xss threat protection': return <Shield className="w-4 h-4" />;
        case 'xml to json': return <ArrowRight className="w-4 h-4" />;
        default: return <Activity className="w-4 h-4" />;
    }
};

const getTypeColor = (type: string) => {
    switch (type.toLowerCase()) {
        case 'log': return 'bg-blue-500/10 text-blue-400 border-blue-500/20';
        case 'rate limit': return 'bg-orange-500/10 text-orange-400 border-orange-500/20';
        case 'custom': return 'bg-purple-500/10 text-purple-400 border-purple-500/20';
        case 'xss threat protection': return 'bg-green-500/10 text-green-400 border-green-500/20';
        case 'xml to json': return 'bg-indigo-500/10 text-indigo-400 border-indigo-500/20';
        default: return 'bg-slate-500/10 text-slate-400 border-slate-500/20';
    }
};

export function InterceptorCard({ interceptor }: InterceptorCardProps) {
    return (
        <div className={cn(
            "relative p-4 rounded-lg border backdrop-blur-sm transition-all hover:scale-[1.01] duration-200 group",
            "bg-card text-card-foreground shadow-sm",
            getTypeColor(interceptor.type)
        )}>
            <div className="flex items-center justify-between mb-2">
                <div className="flex items-center gap-2">
                    <span className="flex items-center justify-center w-6 h-6 rounded-full bg-background/50 text-xs font-bold border border-current opacity-70">
                        {interceptor.position}
                    </span>
                    <div className="flex items-center gap-2 font-semibold">
                        {getTypeIcon(interceptor.type)}
                        <span>{interceptor.type}</span>
                    </div>
                </div>
                <span className="text-[10px] uppercase tracking-wider opacity-60 font-mono">
                    {interceptor.executionPoint}
                </span>
            </div>

            <div className="text-xs opacity-80 font-mono space-y-1 bg-background/30 p-2 rounded overflow-hidden">
                {Object.entries(interceptor.content).slice(0, 3).map(([key, value]) => (
                    <div key={key} className="flex gap-2">
                        <span className="opacity-50 min-w-[80px] truncate">{key}:</span>
                        <span className="truncate">{String(value)}</span>
                    </div>
                ))}
                {Object.keys(interceptor.content).length > 3 && (
                    <div className="opacity-40 italic">... {Object.keys(interceptor.content).length - 3} more properties</div>
                )}
            </div>
        </div>
    );
}
