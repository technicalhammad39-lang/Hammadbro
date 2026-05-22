"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type SourceBackLinkProps = {
  source: string;
  homeHref: string;
  defaultHref: string;
  className?: string;
  children: React.ReactNode;
};

export default function SourceBackLink({
  source,
  homeHref,
  defaultHref,
  className = "",
  children,
}: SourceBackLinkProps) {
  const [href, setHref] = useState(defaultHref);

  useEffect(() => {
    const from = new URLSearchParams(window.location.search).get("from");

    if (from === source) {
      setHref(homeHref);
    }
  }, [homeHref, source]);

  return (
    <Link href={href} className={className}>
      {children}
    </Link>
  );
}
