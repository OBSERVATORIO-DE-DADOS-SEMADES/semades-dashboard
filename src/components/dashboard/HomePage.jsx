import React, { useState, useEffect, useRef } from 'react';
import '../../styles/HomePage.css';

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  const touchStartX = useRef(null);

  // Dados de exemplo para o carrossel de notícias
  const newsItems = [
    {
      id: 1,
      title: 'Parques e Áreas Verdes',
      description: 'Campo Grande é referência em gestão ambiental com seus belos parques urbanos e áreas de lazer.',
      image: '/imagens-cg/campo1.jpg',
      date: '20/01/2026',
    },
    {
      id: 2,
      title: 'Sustentabilidade e Reciclagem',
      description: 'Programa de coleta seletiva e gestão de resíduos para uma cidade mais limpa e sustentável.',
      image: '/imagens-cg/campo2.jpg',
      date: '18/01/2026',
    },
    {
      id: 3,
      title: 'Expansão Urbana Planejada',
      description: 'Desenvolvimento integrado que combina crescimento econômico com preservação ambiental.',
      image: '/imagens-cg/campo3.jpg',
      date: '15/01/2026',
    },
    {
      id: 4,
      title: 'Campo Grande em Crescimento',
      description: 'A capital do estado investe em infraestrutura moderna e qualidade de vida para seus cidadãos.',
      image: '/imagens-cg/campo4.jpg',
      date: '12/01/2026',
    },
    {
      id: 5,
      title: 'Inovação e Desenvolvimento',
      description: 'A SEMADES promove soluções inteligentes para o desenvolvimento sustentável de Campo Grande.',
      image: '/imagens-cg/campo5.jpg',
      date: '10/01/2026',
    },
  ];

  // Dados de exemplo para eventos/notas
  const events = [
    { date: new Date(2026, 0, 22), title: 'Reunião SEMADES', note: 'Planejamento 2026' },
    { date: new Date(2026, 0, 25), title: 'Publicação Relatório', note: 'Dados ambientais Q4' },
    { date: new Date(2026, 0, 28), title: 'Workshop', note: 'Capacitação equipe' },
  ];

  // Navegação do carrossel
  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % newsItems.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + newsItems.length) % newsItems.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // swipe handlers para mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e) => {
    if (touchStartX.current === null) return;
    const touchEndX = e.changedTouches[0].clientX;
    const diff = touchStartX.current - touchEndX;
    if (Math.abs(diff) > 50) {
      if (diff > 0) nextSlide();
      else prevSlide();
    }
    touchStartX.current = null;
  };

  // Autoplay do carrossel a cada 4 segundos
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % newsItems.length);
    }, 4000);

    return () => clearInterval(intervalId);
  }, [newsItems.length]);

  // Funções do calendário
  const getDaysInMonth = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const daysInMonth = lastDay.getDate();
    const startingDayOfWeek = firstDay.getDay();

    return { daysInMonth, startingDayOfWeek };
  };

  const hasEvent = (day) => {
    const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return events.some(event => 
      event.date.getDate() === day &&
      event.date.getMonth() === currentMonth.getMonth() &&
      event.date.getFullYear() === currentMonth.getFullYear()
    );
  };

  const getEventForDay = (day) => {
    const currentDate = new Date(currentMonth.getFullYear(), currentMonth.getMonth(), day);
    return events.find(event => 
      event.date.getDate() === day &&
      event.date.getMonth() === currentMonth.getMonth() &&
      event.date.getFullYear() === currentMonth.getFullYear()
    );
  };

  const previousMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() - 1));
  };

  const nextMonth = () => {
    setCurrentMonth(new Date(currentMonth.getFullYear(), currentMonth.getMonth() + 1));
  };

  const { daysInMonth, startingDayOfWeek } = getDaysInMonth(currentMonth);

  const monthNames = [
    'Janeiro', 'Fevereiro', 'Março', 'Abril', 'Maio', 'Junho',
    'Julho', 'Agosto', 'Setembro', 'Outubro', 'Novembro', 'Dezembro'
  ];

  return (
    <div className="homepage-container">
      {/* Seção de Carrossel de Notícias */}
      <section className="news-carousel-section">
        <h2 className="section-title">Últimas Notícias</h2>
        <div
          className="carousel-container"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          <button className="carousel-btn prev" onClick={prevSlide}>
            ‹
          </button>

          <div className="carousel-content">
            <div className="carousel-slide">
              <div className="news-image">
                {newsItems[currentSlide].image && (
                  <img 
                    src={newsItems[currentSlide].image} 
                    alt={newsItems[currentSlide].title}
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                )}
                <div className="news-image-placeholder" style={{ display: 'none' }}>
                  📰
                </div>
              </div>
              <div className="news-info">
                <span className="news-date">{newsItems[currentSlide].date}</span>
                <h3>{newsItems[currentSlide].title}</h3>
                <p>{newsItems[currentSlide].description}</p>
                <a
                  href="https://www.semadesc.ms.gov.br/noticias/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="read-more-btn"
                >
                  Ler mais
                </a>
              </div>
            </div>
          </div>

          <button className="carousel-btn next" onClick={nextSlide}>
            ›
          </button>
        </div>

        {/* Indicadores do carrossel */}
        <div className="carousel-indicators">
          {newsItems.map((_, index) => (
            <button
              key={index}
              className={`indicator ${index === currentSlide ? 'active' : ''}`}
              onClick={() => goToSlide(index)}
            />
          ))}
        </div>
      </section>

      {/* Seção de Calendário com Notas */}
      <section className="calendar-section">
        <h2 className="section-title">Calendário e Publicações</h2>
        <div className="calendar-container">
          {/* Calendário Principal */}
          <div className="calendar-main">
            <div className="calendar-header">
              <button className="month-nav-btn" onClick={previousMonth}>‹</button>
              <h3>{monthNames[currentMonth.getMonth()]} {currentMonth.getFullYear()}</h3>
              <button className="month-nav-btn" onClick={nextMonth}>›</button>
            </div>

            <div className="calendar-grid">
              <div className="calendar-day-header">Dom</div>
              <div className="calendar-day-header">Seg</div>
              <div className="calendar-day-header">Ter</div>
              <div className="calendar-day-header">Qua</div>
              <div className="calendar-day-header">Qui</div>
              <div className="calendar-day-header">Sex</div>
              <div className="calendar-day-header">Sáb</div>

              {/* Espaços vazios antes do primeiro dia */}
              {[...Array(startingDayOfWeek)].map((_, index) => (
                <div key={`empty-${index}`} className="calendar-day empty"></div>
              ))}

              {/* Dias do mês */}
              {[...Array(daysInMonth)].map((_, index) => {
                const day = index + 1;
                const hasEventMarker = hasEvent(day);
                const isToday = 
                  day === new Date().getDate() &&
                  currentMonth.getMonth() === new Date().getMonth() &&
                  currentMonth.getFullYear() === new Date().getFullYear();

                return (
                  <div
                    key={day}
                    className={`calendar-day ${hasEventMarker ? 'has-event' : ''} ${isToday ? 'today' : ''} ${selectedDate === day ? 'selected' : ''}`}
                    onClick={() => setSelectedDate(day)}
                  >
                    <span className="day-number">{day}</span>
                    {hasEventMarker && <span className="event-indicator">•</span>}
                  </div>
                );
              })}
            </div>
          </div>

          {/* Notas/Eventos - Lateral */}
          <div className="events-list">
            <h4>Eventos e Notas</h4>
            {selectedDate ? (
              <div className="selected-day-events">
                {getEventForDay(selectedDate) ? (
                  <div className="event-item">
                    <strong>{getEventForDay(selectedDate).title}</strong>
                    <p>{getEventForDay(selectedDate).note}</p>
                    <button className="attach-file-btn">📎 Adicionar Anexo</button>
                  </div>
                ) : (
                  <div className="no-events">
                    <p>Nenhum evento para {selectedDate}/{currentMonth.getMonth() + 1}</p>
                    <button className="add-note-btn">+ Adicionar Nota</button>
                  </div>
                )}
              </div>
            ) : (
              <div className="upcoming-events">
                {events
                  .filter(event => 
                    event.date.getMonth() === currentMonth.getMonth() &&
                    event.date.getFullYear() === currentMonth.getFullYear()
                  )
                  .sort((a, b) => a.date - b.date)
                  .map((event, index) => (
                    <div key={index} className="event-preview">
                      <span className="event-date">{event.date.getDate()}</span>
                      <div className="event-details">
                        <strong>{event.title}</strong>
                        <small>{event.note}</small>
                      </div>
                    </div>
                  ))}
              </div>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
