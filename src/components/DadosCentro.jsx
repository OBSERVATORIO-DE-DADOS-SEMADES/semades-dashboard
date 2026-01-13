import React from "react";

export default function DadosCentro() {
  const data = [
    { label: "Afonso Pena", value: 16.3 },
    { label: "Quinze de Novembro", value: 15.6 },
    { label: "Dom Aquino", value: 15.1 },
    { label: "Marechal Rondon", value: 8.8 },
    { label: "José Antônio", value: 8.2 },
    { label: "Eduardo Santos Pereira", value: 8.1 },
    { label: "Barão do Rio Branco", value: 7.7 },
    { label: "Maracajú", value: 7.0 },
    { label: "Mato Grosso", value: 7.0 },
    { label: "Treze de Junho", value: 6.2 },
  ];

  const radius = 140;
  let start = -Math.PI / 2;

  const slices = data.map((d, i) => {
    const angle = (d.value / 100) * Math.PI * 2;
    const end = start + angle;
    const x1 = Math.cos(start) * radius;
    const y1 = Math.sin(start) * radius;
    const x2 = Math.cos(end) * radius;
    const y2 = Math.sin(end) * radius;
    const large = angle > Math.PI ? 1 : 0;
    const path = `M 0 0 L ${x1} ${y1} A ${radius} ${radius} 0 ${large} 1 ${x2} ${y2} Z`;
    start = end;
    return (
      <path key={i} d={path} fill={`var(--blue-${i + 1})`} stroke="#fff" strokeWidth="2" />
    );
  });

  return (
    <>
      <section className="dados-card">
        <div className="chart-header-left">Área de Lote por Bairro (Top 10)<span className="chart-subtitle"> - Planurb, 2025</span></div>
        <div className="chart-box">
          <svg width="340" height="340" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Área de Lote (Top 10)">
            <g transform="translate(170,170)">
              {slices}
              <circle cx="0" cy="0" r="60" fill="#ffffff" />
              <text x="0" y="-6" textAnchor="middle" fontWeight="700" fontSize="16" fill="#1f2933">Top 10</text>
              <text x="0" y="18" textAnchor="middle" fontSize="12" fill="#666">Área de Lote</text>
            </g>
          </svg>
        </div>

        <div className="legend-box">
          <div className="legend-list">
            {data.map((d, i) => (
              <div className="legend-item" key={i}>
                <div className={`legend-swatch swatch-${i + 1}`}></div>
                <div className="legend-label">{d.label}</div>
                <div className="legend-value">{d.value}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="dados-card">
        <div className="chart-header-left">Área de Lote por Proprietário (Top 10)<span className="chart-subtitle"> - Planurb, 2025</span></div>
        <div className="chart-box">
          {(() => {
            const proprietarios = [
              { label: "Ministério do Exército", value: 22.9 },
              { label: "Vista XV Empreendimentos Imobiliários LTDA", value: 17.8 },
              { label: "Trier Empreendimentos Imobiliários Limitada", value: 15.4 },
              { label: "Espólio de Myrthes Carvalho de Oliveira", value: 9.1 },
              { label: "Olga Maria Lemos Siufi", value: 8.1 },
              { label: "Alvaro Haverroth Hilgert", value: 7.4 },
              { label: "Condomínio Edifício Geneve", value: 6.1 },
              { label: "Ivan Paes Barbosa", value: 4.6 },
              { label: "Marcílio Mendonça", value: 4.4 },
              { label: "Ilson Francisco Venturin Carloto", value: 4.2 },
            ];

            const radius2 = 140;
            let start2 = -Math.PI / 2;

            const slices2 = proprietarios.map((d, i) => {
              const angle = (d.value / 100) * Math.PI * 2;
              const end = start2 + angle;
              const x1 = Math.cos(start2) * radius2;
              const y1 = Math.sin(start2) * radius2;
              const x2 = Math.cos(end) * radius2;
              const y2 = Math.sin(end) * radius2;
              const large = angle > Math.PI ? 1 : 0;
              const path = `M 0 0 L ${x1} ${y1} A ${radius2} ${radius2} 0 ${large} 1 ${x2} ${y2} Z`;
              start2 = end;
              return (
                <path key={`p-${i}`} d={path} fill={`var(--blue-${i + 1})`} stroke="#fff" strokeWidth="2" />
              );
            });

            return (
              <svg width="340" height="340" viewBox="0 0 340 340" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Área de Lote por Proprietário (Top 10)">
                <g transform="translate(170,170)">
                  {slices2}
                  <circle cx="0" cy="0" r="60" fill="#ffffff" />
                  <text x="0" y="-6" textAnchor="middle" fontWeight="700" fontSize="16" fill="#1f2933">Top 10</text>
                  <text x="0" y="18" textAnchor="middle" fontSize="12" fill="#666">Área de Lote</text>
                </g>
              </svg>
            );
          })()}
        </div>

        <div className="legend-box">
          <div className="legend-list">
            {[
              "Ministério do Exército",
              "Vista XV Empreendimentos Imobiliários LTDA",
              "Trier Empreendimentos Imobiliários Limitada",
              "Espólio de Myrthes Carvalho de Oliveira",
              "Olga Maria Lemos Siufi",
              "Alvaro Haverroth Hilgert",
              "Condomínio Edifício Geneve",
              "Ivan Paes Barbosa",
              "Marcílio Mendonça",
              "Ilson Francisco Venturin Carloto",
            ].map((label, i) => (
              <div className="legend-item" key={`lp-${i}`}>
                <div className={`legend-swatch swatch-${i + 1}`}></div>
                <div className="legend-label">{label}</div>
                <div className="legend-value">{[22.9,17.8,15.4,9.1,8.1,7.4,6.1,4.6,4.4,4.2][i]}%</div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
