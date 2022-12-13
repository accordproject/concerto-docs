import React from 'react';
import ComponentCreator from '@docusaurus/ComponentCreator';

export default [
  {
    path: '/markdown-page',
    component: ComponentCreator('/markdown-page', '301'),
    exact: true
  },
  {
    path: '/docs',
    component: ComponentCreator('/docs', '670'),
    routes: [
      {
        path: '/docs/api/model-api',
        component: ComponentCreator('/docs/api/model-api', '1d8'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/api/ref-concerto-js-api',
        component: ComponentCreator('/docs/api/ref-concerto-js-api', '902'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/code-generation',
        component: ComponentCreator('/docs/category/code-generation', '99d'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/migration',
        component: ComponentCreator('/docs/category/migration', '270'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/model-inference',
        component: ComponentCreator('/docs/category/model-inference', '990'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/specification',
        component: ComponentCreator('/docs/category/specification', '8ff'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/category/using-the-api',
        component: ComponentCreator('/docs/category/using-the-api', 'd53'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-avro',
        component: ComponentCreator('/docs/codegen/codegen-avro', '8fc'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-csharp',
        component: ComponentCreator('/docs/codegen/codegen-csharp', '458'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-golang',
        component: ComponentCreator('/docs/codegen/codegen-golang', '037'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-graphql',
        component: ComponentCreator('/docs/codegen/codegen-graphql', '818'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-java',
        component: ComponentCreator('/docs/codegen/codegen-java', '4ea'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-jsonschema',
        component: ComponentCreator('/docs/codegen/codegen-jsonschema', '387'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-markdown',
        component: ComponentCreator('/docs/codegen/codegen-markdown', 'c6a'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-mermaid',
        component: ComponentCreator('/docs/codegen/codegen-mermaid', '040'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-odata',
        component: ComponentCreator('/docs/codegen/codegen-odata', 'f83'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-openapi',
        component: ComponentCreator('/docs/codegen/codegen-openapi', '31e'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-plantuml',
        component: ComponentCreator('/docs/codegen/codegen-plantuml', '05f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-protobuf',
        component: ComponentCreator('/docs/codegen/codegen-protobuf', '6b5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-typescript',
        component: ComponentCreator('/docs/codegen/codegen-typescript', '249'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/codegen/codegen-xmlschema',
        component: ComponentCreator('/docs/codegen/codegen-xmlschema', 'e47'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/import/infer-jsonschema',
        component: ComponentCreator('/docs/import/infer-jsonschema', 'c82'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/import/infer-openapi',
        component: ComponentCreator('/docs/import/infer-openapi', 'a95'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/intro',
        component: ComponentCreator('/docs/intro', 'aed'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/migration/ref-migrate-concerto-0.82-1.0',
        component: ComponentCreator('/docs/migration/ref-migrate-concerto-0.82-1.0', 'c4b'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/migration/ref-migrate-concerto-1.0-2.0',
        component: ComponentCreator('/docs/migration/ref-migrate-concerto-1.0-2.0', 'bc2'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/migration/ref-migrate-concerto-2.0-3.0',
        component: ComponentCreator('/docs/migration/ref-migrate-concerto-2.0-3.0', '9b1'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/quick-start',
        component: ComponentCreator('/docs/quick-start', 'a57'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/ref-concerto-cli',
        component: ComponentCreator('/docs/ref-concerto-cli', '860'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/model-classes',
        component: ComponentCreator('/docs/specification/model-classes', '0e5'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/model-decorators',
        component: ComponentCreator('/docs/specification/model-decorators', 'cbb'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/model-enums',
        component: ComponentCreator('/docs/specification/model-enums', '718'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/model-imports',
        component: ComponentCreator('/docs/specification/model-imports', '2aa'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/model-metamodel',
        component: ComponentCreator('/docs/specification/model-metamodel', 'f93'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/model-namespaces',
        component: ComponentCreator('/docs/specification/model-namespaces', 'd21'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/model-properties',
        component: ComponentCreator('/docs/specification/model-properties', '693'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/model-relationships',
        component: ComponentCreator('/docs/specification/model-relationships', 'aad'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/specification/model-vocabulary',
        component: ComponentCreator('/docs/specification/model-vocabulary', '26f'),
        exact: true,
        sidebar: "tutorialSidebar"
      },
      {
        path: '/docs/why-concerto',
        component: ComponentCreator('/docs/why-concerto', '02e'),
        exact: true,
        sidebar: "tutorialSidebar"
      }
    ]
  },
  {
    path: '/',
    component: ComponentCreator('/', '7f5'),
    exact: true
  },
  {
    path: '*',
    component: ComponentCreator('*'),
  },
];
