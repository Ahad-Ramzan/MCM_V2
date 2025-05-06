import React from 'react';

const CardStatics = () => (
    <section className="ps-card ps-card--statics">
        <div className="ps-card__header">
            <h4>Estatisticas</h4>
            <div className="ps-card__sortby">
                <i className="icon-calendar-empty"></i>
                <div className="form-group--select">
                    <select className="form-control">
                        <option value="1">Ultimos 30 dias</option>
                        <option value="2">Ultimos 90 dias</option>
                        <option value="3">Ultimos 180 dias</option>
                    </select>
                    <i className="icon-chevron-down"></i>
                </div>
            </div>
        </div>
        <div className="ps-card__content">
            <div className="ps-block--stat yellow">
                <div className="ps-block__left">
                    <span>
                        <i className="icon-cart"></i>
                    </span>
                </div>
                <div className="ps-block__content">
                    <p>Encomendas</p>
                    <h4>
                        254
                        <small className="asc">
                            <i className="icon-arrow-up"></i>
                            <span>12,5%</span>
                        </small>
                    </h4>
                </div>
            </div>
            <div className="ps-block--stat pink">
                <div className="ps-block__left">
                    <span>
                        <i className="icon-cart"></i>
                    </span>
                </div>
                <div className="ps-block__content">
                    <p>Rendimento</p>
                    <h4>
                        1.234€
                        <small className="asc">
                            <i className="icon-arrow-up"></i>
                            <span>7.1%</span>
                        </small>
                    </h4>
                </div>
            </div>
            <div className="ps-block--stat green">
                <div className="ps-block__left">
                    <span>
                        <i className="icon-cart"></i>
                    </span>
                </div>
                <div className="ps-block__content">
                    <p>Ganhos</p>
                    <h4>
                        1.234€
                        <small className="desc">
                            <i className="icon-arrow-down"></i>
                            <span>0.5%</span>
                        </small>
                    </h4>
                </div>
            </div>
        </div>
    </section>
);

export default CardStatics;
