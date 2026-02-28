import React from 'react';
import { ErrorBoundary, FallbackProps } from 'react-error-boundary';
import { ErrorInfo } from 'react';

export interface ErrorBoundaryProps {
  onReset?: (details: { reason: 'imperative-api'; args: unknown[] } | { reason: 'keys'; prev: unknown[] | undefined; next: unknown[] | undefined }) => void
  onError?: (error: unknown, info: ErrorInfo) => void
  resetKeys?: unknown[]
  fallback?: React.ReactNode
  [key:string]:any
}


let DefaultErrorFallback = ({ error }: FallbackProps) => {
  return (
    <div className="bizcharts-error" role="alert">
      <p>BizCharts something went wrong:</p>
      <pre>{error instanceof Error ? error.message : String(error)}</pre>
    </div>
  )
};

export function ErrorFallback(args: FallbackProps) {
  return DefaultErrorFallback(args);
}

export const setDefaultErrorFallback = (CustComponents) => {
  DefaultErrorFallback = CustComponents;
}

export default ErrorBoundary;
