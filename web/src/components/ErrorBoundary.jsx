import React, { Component } from 'react'

class ErrorBoundary extends Component {
    state = { hasError: false };

    static getDerivedStateFromError(error) {
        return { hasError: true };
    }

    componentDidCatch(error, info) {
        console.error('Error caught by ErrorBoundary:', error, info);
    }

    render() {
        if (this.state.hasError) {
            return <h3>---错误边界捕获问题---</h3>;
        }

        return this.props.children;
    }
}

export default ErrorBoundary;