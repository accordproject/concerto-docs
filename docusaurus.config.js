// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/github');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Concerto',
  tagline: 'Data Modeling Language and Tools',
  url: 'https://concerto.accordproject.org',
  baseUrl: '/',
  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: 'img/favicon.png',

  // GitHub pages deployment config.
  // If you aren't using GitHub pages, you don't need these.
  organizationName: 'accordproject', // Usually your GitHub org/user name.
  projectName: 'concerto', // Usually your repo name.

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },
  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          // Please change this to your repo.
          // Remove this to remove the "edit this page" links.
          editUrl:
            'https://github.com/accordproject/concerto-docs/blob/main/',
        },
        theme: {
          customCss: require.resolve('./src/css/custom.css'),
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      navbar: {
        title: 'Concerto',
        logo: {
          alt: 'Concerto Logo',
          src: 'img/logo_light.png', // Default logo for light mode
          srcDark: 'img/logo_dark.png', // Logo for dark mode
        },
        items: [
          {
            type: 'doc',
            docId: 'intro',
            position: 'left',
            label: 'Documentation',
          },
          {
            type: 'doc',
            docId: 'contributing',
            position: 'right',
            label: 'Contribute!',
          },
          {
            href: 'https://github.com/accordproject/concerto',
            label: 'GitHub',
            position: 'right',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'Documentation',
            items: [
              {
                label: 'Introduction',
                to: '/docs/intro',
              },
              {
                label: 'Contribute!',
                to: '/docs/contributing',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Stack Overflow',
                href: 'https://stackoverflow.com/questions/tagged/concerto',
              },
              {
                label: 'Discord',
                href: 'https://discord.gg/Zm99SKhhtA',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/accordproject',
              },
            ],
          },
          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://accordproject.org/news',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/accordproject/concerto',
              },
            ],
          },
        ],
        copyright: `Copyright © ${new Date().getFullYear()} Accord Project. Built with Docusaurus.`,
      },
      prism: {
        theme: darkCodeTheme,
        darkTheme: darkCodeTheme,
        additionalLanguages: ['csharp']
      },
      algolia: {
        appId: "NMKG3P775K",
        apiKey: "ca1a2245aa4632ef8f6fd820d72c2cd6",
        indexName: "concerto-accordproject",
        algoliaOptions: {} // Optional, if provided by Algolia
      },    
    }),
};

module.exports = config;
