module.exports = {
  presets: [
    [
      '@babel/preset-env',
      { targets: { node: 'current' } }
    ],
    [
      '@babel/preset-react',
      { runtime: 'automatic' }
    ]
  ]
};

// Tells Babel how to convert your code into something Jest can understand.