import { LeafMark } from "@/components/garanemsa/decor";
import "./garanemsa.css";

export default function GaranemsaLoading() {
  return (
    <div className="gr gr-loading" lang="fr" role="status" aria-live="polite">
      <div className="gr-loading__inner">
        <span className="gr-loading__mark">
          <LeafMark aria-hidden="true" />
        </span>
        <p className="gr-loading__name">Garanemsa</p>
        <span className="gr-loading__line" aria-hidden="true" />
        <p className="gr-loading__text">Chargement du profil…</p>
      </div>
    </div>
  );
}
