const COMPONENT_BASE_PATH = '../packages/components'
const TEMPLATE_BASE_PATH = 'templates/component'

module.exports = (plop) => {
  plop.setActionType('install-deps', () => {
    // eslint-disable-next-line @typescript-eslint/no-var-requires
    require('child_process').execSync('yarn install', { stdio: 'inherit' })
  })

  plop.setGenerator('component', {
    description: 'Generate React UI Component module',
    prompts: [
      {
        type: 'input',
        name: 'name',
        message: "What's your component module name?",
        validate: (value) => {
          if (!value) {
            return 'Component module name is required!'
          }

          return true
        },
      },
    ],
    actions: [
      {
        type: 'addMany',
        destination: `${COMPONENT_BASE_PATH}/{{ kebabCase name }}`,
        base: `${TEMPLATE_BASE_PATH}`,
        templateFiles: `${TEMPLATE_BASE_PATH}/*`,
        globOptions: {
          dot: true,
        },
      },
      {
        type: 'add',
        path: `${COMPONENT_BASE_PATH}/{{ kebabCase name }}/src/index.tsx`,
        templateFile: `${TEMPLATE_BASE_PATH}/src/index.tsx.hbs`,
      },
      {
        type: 'add',
        path: `${COMPONENT_BASE_PATH}/{{ kebabCase name }}/src/styles/style.scss`,
        templateFile: `${TEMPLATE_BASE_PATH}/src/styles/style.scss.hbs`,
      },
      {
        type: 'add',
        path: `${COMPONENT_BASE_PATH}/{{ kebabCase name }}/stories/{{ pascalCase name }}.stories.tsx`,
        templateFile: `${TEMPLATE_BASE_PATH}/stories/component.stories.tsx.hbs`,
      },
      {
        type: 'install-deps',
        verbose: true,
      },
    ],
  })
}
