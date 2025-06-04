// src/components/common/ErrorBoundary.tsx
import { Component, ErrorInfo, ReactNode } from 'react';

interface Props {
  children: ReactNode;
  fallback?: ReactNode;
}

interface State {
  hasError: boolean;
  error?: Error;
}

class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError(error: Error): State {
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    console.error('ErrorBoundary caught an error:', error, errorInfo);
  }

  render(): ReactNode {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-fallback">
          <div className="error-content">
            <h1>Oops! Algo deu errado</h1>
            <p>Ocorreu um erro inesperado na aplicação:</p>
            {this.state.error && (
              <pre style={{ 
                background: 'rgba(0,0,0,0.1)', 
                padding: '1rem', 
                borderRadius: '8px',
                overflow: 'auto',
                maxHeight: '200px'
              }}>
                {this.state.error.toString()}
              </pre>
            )}
            <button 
              onClick={() => window.location.reload()}
              style={{
                padding: '1rem 2rem',
                background: '#b9954a',
                color: 'white',
                border: 'none',
                borderRadius: '8px',
                cursor: 'pointer',
                marginTop: '1rem'
              }}
            >
              Recarregar Página
            </button>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
