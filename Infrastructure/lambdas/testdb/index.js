const {
  SecretsManagerClient,
  GetSecretValueCommand,
} = require("@aws-sdk/client-secrets-manager");
const { Client } = require("pg");

exports.handler = async (event) => {
  try {
    console.log("Fetching DB credentials from Secrets Manager...");
    // Fetch DB credentials from Secrets Manager
    const client = new SecretsManagerClient({ region: process.env.REGION });
    const secretData = await client.send(
      new GetSecretValueCommand({ SecretId: process.env.SECRET_ARN })
    );
    const credentials = JSON.parse(secretData.SecretString);

    console.log("Connecting to database...");
    // Connect to PostgreSQL
    const dbClient = new Client({
      host: "database-loadpoint.cluster-czu2qc0qyx83.eu-central-1.rds.amazonaws.com",
      database: "LoadPoint",
      user: credentials.username,
      password: credentials.password,
      port: 5432,
      ssl: { rejectUnauthorized: false },
    });

    await dbClient.connect();
    console.log("Successfully connected to the database.");
    const res = await dbClient.query("SELECT NOW() as current_time;");
    await dbClient.end();

    return {
      statusCode: 200,
      body: JSON.stringify({
        message: "Database Connected!",
        time: res.rows[0].current_time,
      }),
    };
  } catch (error) {
    console.error("Error connecting to DB:", error);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Database connection failed",
        details: error.message,
      }),
    };
  }
};
