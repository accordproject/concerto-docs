import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import GitHubButton from 'react-github-btn';
import CodeBlock from '@theme/CodeBlock';

import styles from './styles.module.css';

const PLAYGROUND_URL = 'https://concerto-playground.accordproject.org';

const startPaths = [
  {
    title: 'Try the Playground',
    description: 'Write a model and see it compile live — no install.',
    href: PLAYGROUND_URL,
    target: '_blank',
    featured: true,
  },
  {
    title: 'Learn the language',
    description: 'Start with the basics of modeling in Concerto.',
    href: '/docs/design/specification/model-introduction',
    target: '_self',
  },
  {
    title: 'Use the SDK',
    description: 'Parse, validate and generate code from TypeScript.',
    href: '/docs/category/using-the-api',
    target: '_self',
  },
  {
    title: 'Use the CLI',
    description: 'Validate and compile models from your terminal.',
    href: '/docs/tutorials/quick-start',
    target: '_self',
  },
];

function PathCard({title, description, href, target, featured}) {
  const resolvedHref = useBaseUrl(href);
  return (
    <a
      className={`PathCard ${featured ? 'featured' : ''}`}
      href={resolvedHref}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
      {featured && <span className="PathCard-badge">Recommended</span>}
      <h3 className="PathCard-title">{title}</h3>
      <p className="PathCard-description">{description}</p>
    </a>
  );
}

function HomeCallToAction() {
  return (
    <div className="PathChooser">
      {startPaths.map((path, idx) => (
        <PathCard key={idx} {...path} />
      ))}
    </div>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Section background="dark" className="HeaderHero">
        <div className="socialLinks">
        <GitHubStarButton />
      </div>
      <div className="container">
        <h1 className="title">{siteConfig.title}</h1>
        <p className="tagline">{siteConfig.tagline}</p>
        <div className="buttons">
          <HomeCallToAction />
        </div>
      </div>

    </Section>
  );
}

const textContent = {
  schemasForPeople: `
Business and product teams are the domain experts, and we believe that they should own domain models too.
  <br/><br/>
Popular schema languages are designed to be machine readable, but are not accessible for non-technical people.
  <br/><br/>
Concerto strives for the expressiveness of UML, but with compatibility to modern technology stacks.
  `,
  languageConversion: `
Concerto's code generation capabilities let you use models across multiple platforms. Supported targets include: 
<a href="/docs/reference/codegen/codegen-avro">Apache Avro</a>,
<a href="/docs/reference/codegen/codegen-csharp">C# (.NET)</a>,
<a href="/docs/reference/codegen/codegen-golang">Go</a>,
<a href="/docs/reference/codegen/codegen-graphql">GraphQL</a>,
<a href="/docs/reference/codegen/codegen-java">Java</a>,
<a href="/docs/reference/codegen/codegen-jsonschema">JSON Schema</a>,
<a href="/docs/reference/codegen/codegen-markdown">Markdown</a>,
<a href="/docs/reference/codegen/codegen-mermaid">Mermaid UML</a>,
<a href="/docs/reference/codegen/codegen-odata">OData (EDM)</a>,
<a href="/docs/reference/codegen/codegen-openapi">OpenAPI</a>,
<a href="/docs/reference/codegen/codegen-plantuml">PlantUML</a>,
<a href="/docs/reference/codegen/codegen-protobuf">Protocol Buffers</a>,
<a href="/docs/reference/codegen/codegen-rust">Rust</a>,
<a href="/docs/reference/codegen/codegen-typescript">TypeScript</a>,
<a href="/docs/reference/codegen/codegen-xmlschema">XML Schema</a>,
& custom formats.
<br /><br />
Bootstrap your models from existing <a href="/docs/reference/import/infer-openapi">OpenAPI specifications</a>, <a href="/docs/reference/import/infer-jsonschema">JSON Schema</a> models, or <a href="https://finchbot.net">natural language text</a> such as agreements. 
    `,
  codeExample: `  concept Address {
    o String street
    o String city
    o String postCode
    o Country country
  }
 
  concept Person identified by name  {
    o String name
    o Address address optional
    @description("Height (cm)")
    o Double height range=[0.0,]
    o DateTime dateOfBirth 
  }

  enum Country {
    o UK
    o USA
    o FRANCE
    o GERMANY
    o JAPAN
  }
   `,
};

/*Adjust the Svg property with current files*/
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

function Heading({text}) {
  return <h2 className="Heading">{text}</h2>;
}

function ActionButton({href, type = 'primary', target, children}) {
  return (
    <a
      className={`ActionButton ${type}`}
      href={href}
      target={target}
      rel={target === '_blank' ? 'noopener noreferrer' : undefined}>
      {children}
    </a>
  );
}

function TextColumn({title, text, moreContent}) {
  return (
    <>
      <Heading text={title} />
      <div dangerouslySetInnerHTML={{__html: text}} />
      {moreContent}
    </>
  );
}

function GitHubStarButton() {
  return (
    <div className="github-button">
      <GitHubButton
        href="https://github.com/accordproject/concerto"
        data-icon="octicon-star"
        data-size="large"
        aria-label="Star accordproject/concerto on GitHub">
        Star
      </GitHubButton>
    </div>
  );
}

export function Section({
  element = 'section',
  children,
  className,
  background = 'light',
}) {
  const El = element;
  return (
    <El
      className={
        className
          ? `Section ${className} ${background}`
          : `Section ${background}`
      }>
      {children}
    </El>
  );
}

function TwoColumns({columnOne, columnTwo, reverse}) {
  return (
    <div className={`TwoColumns ${reverse ? 'reverse' : ''}`}>
      <div className={`column first ${reverse ? 'right' : 'left'}`}>
        {columnOne}
      </div>
      <div className={`column last ${reverse ? 'left' : 'right'}`}>
        {columnTwo}
      </div>
    </div>
  );
}

function SchemasPeople() {
  return (
    <Section className="SchemasPeople" background="tint">
      <TwoColumns
        columnOne={
          <TextColumn
          title="Schemas, for People too"
          text={textContent.schemasForPeople}
          />
        }
        columnTwo={
          <CodeBlock language="cs">{textContent.codeExample}</CodeBlock>
        }
      />
    </Section>
  );
}

function CrossPlatform() {
  return (
    <Section className="CrossPlatform" background="light">
      <div className="content">
        <TextColumn
          title="Platform Neutral, but Runtime Compatible"
          text={textContent.languageConversion}
        />
      </div>
    </Section>
  );
}

function PlaygroundSection() {
  return (
    <Section className="Playground" background="tint">
      <div className="content">
        <Heading text="Try Concerto in your browser" />
        <p className="Playground-lead">
          No install required. Write a <code>.cto</code> model and watch it
          compile live to TypeScript, Java, Go, JSON Schema, GraphQL, Protobuf
          and more — everything runs client-side in your browser.
        </p>
        <div className="Playground-window">
          <div className="Playground-chrome">
            <span className="Playground-dots" />
            <span className="Playground-url">concerto-playground.accordproject.org</span>
          </div>
          <iframe
            className="Playground-frame"
            src={PLAYGROUND_URL}
            title="Concerto Playground"
            loading="lazy"
          />
        </div>
        <div className="Playground-cta">
          <ActionButton type="primary" href={PLAYGROUND_URL} target="_blank">
            Open full Playground ↗
          </ActionButton>
        </div>
      </div>
    </Section>
  );
}

function GetStarted() {
  return (
    <Section className="GetStarted" background="dark">
      <div className="content">
        <Heading text="Give it a try" />
        <ol className="steps">
          <li>
            <p>No install needed — open the Playground</p>
            <ActionButton type="primary" href={PLAYGROUND_URL} target="_blank">
              Launch the Playground ↗
            </ActionButton>
          </li>
          <li>
            <p>Ready to build? Install the CLI</p>
            <div className="terminal">
              <code>npm i -g @accordproject/concerto-cli</code>
            </div>
          </li>
          <li>
            <p>Read these</p>
            <div className="GetStarted-links">
              <ActionButton
                type="secondary"
                href={useBaseUrl('/docs/tutorials/quick-start')}
                target="_self">
                Quick Start Tutorial
              </ActionButton>
              <ActionButton
                type="secondary"
                href="https://concerto.accordproject.org/docs/category/using-the-api"
                target="_self">
                SDK Reference
              </ActionButton>
            </div>
          </li>
        </ol>
      </div>
    </Section>
  );
}

export default function HomepageFeatures() {
  return (
    <>
      <HomepageHeader />
      <main>
        <PlaygroundSection />
        <Section className={styles.features}>
          <div className="container">
            <div className="row">
              {FeatureList.map((props, idx) => (
                <Feature key={idx} {...props} />
              ))}
            </div>
          </div>
        </Section>
        <SchemasPeople />
        <CrossPlatform />
        <GetStarted />
      </main>
    </>
  );
}
