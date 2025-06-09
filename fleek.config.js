module.exports = {
  // Project configuration
  name: 'surreal-music-manager',
  
  // Build configuration
  build: {
    command: 'pnpm build',
    output: '.next',
    environment: {
      NODE_VERSION: '18'
    }
  },
  
  // Site configuration
  site: {
    framework: 'nextjs',
    buildCommand: 'pnpm build',
    publishDir: '.next',
    env: {
      SKIP_ENV_VALIDATION: 'true'
    }
  },
  
  // IPFS configuration
  ipfs: {
    addAll: true,
    hashAlg: 'sha2-256'
  }
}; 