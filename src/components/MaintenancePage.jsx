import React from "react";

export default function MaintenancePage() {
  return (
    <main className="maintenance-page">
      <div className="maintenance-card">
        <img
          src="/maintenance-warning.svg"
          alt="Aviso de indisponibilidade"
          className="maintenance-warning"
        />
        <p className="maintenance-eyebrow">SEMADES</p>
        <h1>Portal temporariamente indisponível</h1>
        <p>
          Este site está em manutenção no momento e o acesso público foi
          temporariamente suspenso.
        </p>
      </div>
    </main>
  );
}
