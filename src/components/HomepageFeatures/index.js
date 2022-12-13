import React from 'react';
import clsx from 'clsx';
import styles from './styles.module.css';

const FeatureList = [
  {
    title: 'Easy to Use',
    Svg: require('@site/static/img/easy.svg').default,
    description: (
      <>
        Designed from the ground up to be easy to learn, 
        for both newcomers and data modeling pros.
      </>
    ),
  },
  {
    title: 'Powerful Tools',
    Svg: require('@site/static/img/powerful.svg').default,
    description: (
      <>
        Import your existing models, or convert Concerto models to 14+ output formats.
      </>
    ),
  },
  {
    title: 'Built for the Web',
    Svg: require('@site/static/img/web.svg').default,
    description: (
      <>
        Import models from URLs. Lightweight browser compatible runtime.
      </>
    ),
  },
];

function Feature({Svg, title, description}) {
  return (
    <div className={clsx('col col--4')}>
      <div className="text--center">
        <Svg className={styles.featureSvg} role="img" />
      </div>
      <div className="text--center padding-horiz--md">
        <h3>{title}</h3>
        <p>{description}</p>
      </div>
    </div>
  );
}

export default function HomepageFeatures() {
  return (
    <section className={styles.features}>
      <div className="container">
        <div className="row">
          {FeatureList.map((props, idx) => (
            <Feature key={idx} {...props} />
          ))}
        </div>
      </div>
    </section>
  );
}
