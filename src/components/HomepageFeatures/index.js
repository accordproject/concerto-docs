import React from 'react';
import clsx from 'clsx';
import useBaseUrl from '@docusaurus/useBaseUrl';
import useDocusaurusContext from '@docusaurus/useDocusaurusContext';
import GitHubButton from 'react-github-btn';
import Tabs from '@theme/Tabs';
import TabItem from '@theme/TabItem';
import CodeBlock from '@theme/CodeBlock';

import { Mermaid } from '../mermaid';
import samples from '../samples';

import styles from './styles.module.css';

function HomeCallToAction() {
  return (
    <>
      <ActionButton
        type="primary"
        href={useBaseUrl('/docs/intro')}
        target="_self">
        Learn More
      </ActionButton>
      <ActionButton
        type="secondary"
        href={useBaseUrl('/docs/tutorials/quick-start')}
        target="_self">
        Quick Start Tutorial
      </ActionButton>
    </>
  );
}

function HomepageHeader() {
  const {siteConfig} = useDocusaurusContext();

  return (
    <Section background="dark" className="HeaderHero">
        <div className="socialLinks">
        <TwitterButton accountName="accordhq" />
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

function CodeSamples(){
  return (
    <Tabs>
      <TabItem value="uml" label="UML" default>
        <Mermaid chart={samples.mermaidUml} />
      </TabItem>
      <TabItem value="typescript" label="TypeScript">
        <CodeBlock language="typescript" theme="dark">{samples.typescript}</CodeBlock>
      </TabItem>
      <TabItem value="jsonSchema" label="JSON Schema">
        <CodeBlock language="json">{samples.jsonSchema}</CodeBlock>
      </TabItem>
    </Tabs>
  )
}

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
    <a className={`ActionButton ${type}`} href={href} target={target}>
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

function TwitterButton({accountName}) {
  return (
    <a
      href={`https://twitter.com/intent/follow?screen_name=${accountName}&region=follow_link`}
      className="twitter-follow-button">
      <div className="icon" />
      Follow @{accountName}
    </a>
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
      <TwoColumns
        reverse
        columnOne={
          <TextColumn
            title="Platform Neutral, but Runtime Compatible"
            text={textContent.languageConversion}
          />
        }
        columnTwo={<CodeSamples/>}
      />
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
            <p>Run this</p>
            <div className="terminal">
              <code>npm i -g @accordproject/concerto-cli</code>
            </div>
          </li>
          <li>
            <p>Read these</p>
            <ActionButton
              type="primary"
              href={useBaseUrl('/docs/tutorials/quick-start')}
              target="_self">
              Quick Start Tutorial
            </ActionButton>
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
