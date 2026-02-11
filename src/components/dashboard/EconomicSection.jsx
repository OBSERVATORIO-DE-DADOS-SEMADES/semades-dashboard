import React from "react";
import "../../styles/EconomicSection.css";
import {
  ResponsiveContainer,
  ComposedChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  Cell,
} from "recharts";

const data = [
  { month: "Jan", empMS: 1298, empCG: 554, jobMS: 3176, jobCG: 620 },
  { month: "Fev", empMS: 1251, empCG: 551, jobMS: 8333, jobCG: 2624 },
  { month: "Mar", empMS: 1201, empCG: 463, jobMS: 1114, jobCG: 569 },
  { month: "Abr", empMS: 1118, empCG: 478, jobMS: 5701, jobCG: 1459 },
  { month: "Mai", empMS: 1003, empCG: 410, jobMS: 3087, jobCG: 840 },
  { month: "Jun", empMS: 1022, empCG: 436, jobMS: 2709, jobCG: 366 },
  { month: "Jul", empMS: 1223, empCG: 575, jobMS: 3023, jobCG: 583 },
  { month: "Ago", empMS: 1074, empCG: 437, jobMS: 2718, jobCG: 645 },
  { month: "Set", empMS: 1058, empCG: 454, jobMS: 1379, jobCG: 565 },
  { month: "Out", empMS: 1131, empCG: 319, jobMS: 880, jobCG: -76 },
  { month: "Nov", empMS: 917, empCG: 442, jobMS: -941, jobCG: 123 },
  { month: "Dez", empMS: 847, empCG: 328, jobMS: 19756, jobCG: 4240 },
];

export default function EconomicSection() {
  return (
    <section className="economic-section">
      <div className="economic-grid">
        {/* === CARD DE DADOS === */}
        <div className="economic-card info-card">
          <h3 className="economic-title">Desenvolvimento Econômico</h3>
          <p className="economic-period">Acumulado: Jan/2025 - Dez/2025</p>

          <a
            className="economic-item"
            href="https://www.semadesc.ms.gov.br/wp-content/uploads/2025/04/Relatorio-Aberturas-e-Encerramentos-de-Empresas-Fevereiro-2025.pdf"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="economic-info">
              <span className="economic-icon">🏢</span>
              <span className="economic-label">Empresas Abertas</span>
            </div>
            <span className="economic-value">13.143</span>
          </a>

          <a
            className="economic-item"
            href="https://www.funtrab.ms.gov.br/mercado-de-trabalho-2023/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="economic-info">
              <span className="economic-icon">👥</span>
              <span className="economic-label">Empregos Formais (Saldo)</span>
            </div>
            <span className="economic-value">19.756 </span>
          </a>

          <a
            className="economic-item"
            href="https://www.campogrande.ms.gov.br/cgnoticias/noticia/campo-grande-fecha-2025-com-crescimento-economico-acima-da-media-nacional/"
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="economic-info">
              <span className="economic-icon">📈</span>
              <span className="economic-label">Crescimento Percentual</span>
            </div>
            <span className="economic-value">+5,2%</span>
          </a>

          <a
            className="economic-item"
            href="https://www.gov.br/secom/pt-br/assuntos/noticias-regionalizadas/numeros-do-novo-caged-em-2025/caged-em-2025/mato-grosso-do-sul-gerou-mais-de-19-7-mil-empregos-com-carteira-assinada-em-2025#:~:text=EMPREGO-,Mato%20Grosso%20do%20Sul%20gerou%20mais%20de%2019%2C7%20mil,com%20carteira%20assinada%20em%202025&text=O%20estado%20de%20Mato%20Grosso,ao%20longo%20dos%2012%20meses."
            target="_blank"
            rel="noopener noreferrer"
          >
            <div className="economic-info">
              <span className="economic-icon">🏆</span>
              <span className="economic-label">Posição Nacional</span>
            </div>
            <span className="economic-value">20º (Saldo) | 8º (Crescimento)</span>
          </a>
        </div>

        {/* === CARD DO GRÁFICO === */}
        <div className="economic-card chart-card">
          <div className="chart-header">
            <h3 className="economic-title">Visualização Econômica</h3>
            <p className="economic-subtitle">Comparativo de Indicadores — Mato Grosso do Sul e Campo Grande</p>
          </div>

          <div className="chart-container">
            <ResponsiveContainer width="100%" height="100%">
              <ComposedChart
                data={data}
                margin={{ top: 10, right: 20, left: 0, bottom: 10 }}
                barCategoryGap="20%"
                barGap={4}
              >
                <CartesianGrid strokeDasharray="3 3" stroke="#e5e7eb" />
                <XAxis dataKey="month" tick={{ fill: "#374151", fontSize: 11 }} />
                <YAxis tick={{ fill: "#374151", fontSize: 11 }} />
                <Tooltip
                  formatter={(value) => {
                    if (value === null || value === undefined) return "-";
                    return value.toLocaleString();
                  }}
                  contentStyle={{
                    backgroundColor: "#fff",
                    borderRadius: "8px",
                    border: "1px solid #e5e7eb",
                  }}
                />
                <Legend verticalAlign="top" align="center" wrapperStyle={{ paddingBottom: 8 }} />

                {/* Empresas Abertas MS (azul escuro) */}
                <Bar dataKey="empMS" name="Empresas Abertas MS" barSize={12} fill="#062a78" />

                {/* Empresas Abertas em CG (azul claro) */}
                <Bar dataKey="empCG" name="Empresas Abertas em CG" barSize={12} fill="#93c5fd" />

                {/* Empregos Formais MS (Saldo) - dark yellow, negative -> red per-cell */}
                <Bar dataKey="jobMS" name="Empregos Formais MS (Saldo)" barSize={12} fill="#EFBB07">
                  {data.map((entry, index) => (
                    <Cell
                      key={`jobMS-${index}`}
                      fill={entry.jobMS < 0 ? "#ef4444" : "#EFBB07"}
                    />
                  ))}
                </Bar>

                {/* Empregos Formais em CG (Saldo) - light yellow, negative -> red per-cell */}
                <Bar dataKey="jobCG" name="Empregos Formais em CG (Saldo)" barSize={12} fill="#f0d473">
                  {data.map((entry, index) => (
                    <Cell
                      key={`jobCG-${index}`}
                      fill={entry.jobCG < 0 ? "#ef4444" : "#f0d473"}
                    />
                  ))}
                </Bar>
              </ComposedChart>
            </ResponsiveContainer>
          </div>

          <div className="chart-footer">
            <p className="economic-source">
              Fonte:{" "}
              <a
                href="https://www.funtrab.ms.gov.br"
                target="_blank"
                rel="noopener noreferrer"
              >
                FUNTRAB / CAGED
              </a>{" "}
              — Jan/2026
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
