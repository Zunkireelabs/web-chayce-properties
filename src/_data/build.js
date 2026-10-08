// Changes on every build so CSS/JS links get a fresh URL after each deploy
// (nginx caches static assets for 30 days as immutable).
module.exports = { version: Date.now().toString(36) };
