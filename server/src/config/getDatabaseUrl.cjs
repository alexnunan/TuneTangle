const getDatabaseUrl = (nodeEnv) => {
  return (
    {
      development: "postgres://postgres:postgres@localhost:5432/TuneTangle_development",
      test: "postgres://postgres:postgres@localhost:5432/TuneTangle_test",
      e2e: "postgres://postgres:postgres@localhost:5432/TuneTangle_e2e",
    }[nodeEnv] || process.env.DATABASE_URL
  );
};

module.exports = getDatabaseUrl;
