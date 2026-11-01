// src/components/ErrorBoundary.jsx
import React from "react";
class ErrorBoundaryClass extends React.Component {
  constructor(props) {
    super(props);
    this.state = { hasError: false, error: null };
  }
  static getDerivedStateFromError(error) {
    return { hasError: true, error };
  }
  componentDidCatch(error, errorInfo) {
    console.error("Uncaught UI error:", error, errorInfo);
  }
  render() {
    if (this.state.hasError) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50 text-center px-4">
          <h1 className="text-3xl font-bold text-red-600 mb-2">Unexpected Error</h1>
          <p className="text-gray-700 mb-4">
            {this.state.error?.message || "Something went wrong."}
          </p>
          <button
            onClick={() => window.location.href = "/"}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg"
          >
            Reload App
          </button>
        </div>
      );
    }
    return this.props.children;
  }
}
export default ErrorBoundaryClass;
