const { shareAll, withModuleFederationPlugin } = require('@angular-architects/module-federation/webpack');

module.exports = withModuleFederationPlugin({

  name: 'host',

  // remotes: {
  //   'mfe1': 'mfe1@http://localhost:4201/remoteEntry.mjs',
  //   'mfe2': 'mfe2@http://localhost:4202/remoteEntry.mjs',
  // },

  exposes: {
    './Component': './projects/host/src/app/app.component.ts',
  },

  shared: {
    ...shareAll({ singleton: true, strictVersion: true, requiredVersion: 'auto' }),
  },

});
