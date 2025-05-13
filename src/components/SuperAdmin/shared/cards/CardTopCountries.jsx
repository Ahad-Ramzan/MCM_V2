import React from 'react'

const colorClasses = ['organge', 'red', 'green', 'cyan']

const CardTopCountries = ({ top_4_brands }) => (
  <section className="ps-card ps-card--top-country">
    <div className="ps-card__header">
      <h4>Top Vendas</h4>
    </div>
    <div className="ps-card__content">
      <div className="row">
        {Array.isArray(top_4_brands) &&
          top_4_brands.map((item, index) => (
            <div className="col-6" key={index}>
              <figure className={colorClasses[index % colorClasses.length]}>
                <figcaption>{item.brand || 'Unknown'}</figcaption>
                <strong>{item.percentage}%</strong>
              </figure>
            </div>
          ))}
      </div>
      <img src="/img/map-and-bundle.png" alt="" />
      <p>We only started collecting region data from January 2015</p>
    </div>
  </section>
)

export default CardTopCountries
