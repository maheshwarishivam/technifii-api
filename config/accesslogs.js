module.exports.requestloggerfile = {
  // Turn logging on by default in development environment
  // and off for production, using the default format
  format: ':remote-addr - [:date[clf]] ":method :url" :status :response-time ms ":user-agent"',
  logLocation: 'rotateFile',
  fileLocation: 'logs/access-%DATE%.log',
  inDevelopment: true,
  inProduction: true,
  fileRotationOptions: {
    frequency: "daily",
    verbose: false,
    date_format: 'YYYYMMDD'
  }
};
