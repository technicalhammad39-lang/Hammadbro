"use client";

import { Component, ReactNode } from "react";

type SectionErrorBoundaryProps = {
  children: ReactNode;
  fallback?: ReactNode;
};

type SectionErrorBoundaryState = {
  hasError: boolean;
};

export default class SectionErrorBoundary extends Component<SectionErrorBoundaryProps, SectionErrorBoundaryState> {
  state: SectionErrorBoundaryState = {
    hasError: false,
  };

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return (
        this.props.fallback ?? (
          <div className="w-full rounded-[28px] bg-[#F2F4F7] p-6 text-center text-sm font-medium text-[#667085]">
            This section could not load. Please refresh the page.
          </div>
        )
      );
    }

    return this.props.children;
  }
}
