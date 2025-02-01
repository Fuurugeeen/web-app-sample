require("dotenv").config();
const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");

const app = express();
app.use(cors());
app.use(express.json());

// PostgreSQL 接続設定
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});

// データベース接続テスト
app.get("/api", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Hello from Express & Docker!", time: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.get("/api/user", async (req, res) => {
  try {
    const result = await pool.query("SELECT NOW()");
    res.json({ message: "Hello from Express & Docker!", time: result.rows[0] });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

app.post("/api/user", async (req, res) => {
  try {
    const { name, email } = req.body;
    const result = await pool.query(
      "INSERT INTO users (name) VALUES ($1) RETURNING *",
      [name]
    );
    res.json(result.rows[0]);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Database connection failed" });
  }
});

const PORT = process.env.PORT || 5001;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});