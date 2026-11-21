"use client";

import { useEffect } from "react";
import Link from "next/link";
import { LeafMark } from "@/components/garanemsa/decor";
import "./garanemsa.css";

interface GaranemsaErrorProps {
  error: Error & { digest?: string };
  reset: () => void;
}

export default function GaranemsaError({ error, reset }: GaranemsaErrorProps) {
  useEffect(() => {
    console.error(error);
  }, [error]);

  return (
    <div className="gr gr-error" lang="fr">
      <div className="gr-error__inner">
        <span className="gr-error__mark">
          <LeafMark aria-hidden="true" />
        </span>
        <h1 className="gr-error__title">Un instant…</h1>
        <p className="gr-error__text">
          Le profil n’a pas pu s’afficher. Réessayez, ou revenez dans quelques
          minutes.
        </p>
        <button
          type="button"
          className="gr-btn gr-btn--gold"
          onClick={() => reset()}
        >
          Réessayer
        </button>
        <Link className="gr-btn gr-btn--outline-light" href="/">
          Retour à Scaniha
        </Link>
      </div>
    </div>
  );
}
