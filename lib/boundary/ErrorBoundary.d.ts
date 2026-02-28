import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ErrorInfo } from 'react';
export interface ErrorBoundaryProps {
    onReset?: (details: {
        reason: 'imperative-api';
        args: unknown[];
    } | {
        reason: 'keys';
        prev: unknown[] | undefined;
        next: unknown[] | undefined;
    }) => void;
    onError?: (error: unknown, info: ErrorInfo) => void;
    resetKeys?: unknown[];
    fallback?: React.ReactNode;
    [key: string]: any;
}
export declare function ErrorFallback(args: FallbackProps): React.JSX.Element;
export declare const setDefaultErrorFallback: (CustComponents: any) => void;
export default ErrorBoundary;
