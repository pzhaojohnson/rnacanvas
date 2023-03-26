import * as React from 'react';

export type Props = {
  fallback?: React.ReactNode;

  children?: React.ReactNode;
};

type State = {
  hasError: boolean;
};

export class ErrorBoundary extends React.Component<Props, State> {
  static getDerivedStateFromError() {
    return {
      hasError: true,
    };
  }

  constructor(props: Props) {
    super(props);

    this.state = {
      hasError: false,
    };
  }

  componentDidCatch(error: Error, info: React.ErrorInfo) {
    console.error(error, info);
    console.error('Unable to render children.');
    console.error('Rendering fallback.');
  }

  render() {
    if (this.state.hasError) {
      return this.props.fallback ?? null;
    }

    return this.props.children ?? null;
  }
}
