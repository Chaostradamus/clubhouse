const pool = require('./pool');

// User queries
const getUserByUsername = async (username) => {
  const result = await pool.query('SELECT * FROM users WHERE username = $1', [username]);
  return result.rows[0];
};

const getUserById = async (id) => {
  const result = await pool.query('SELECT id, username, first_name, last_name, membership_status, is_admin FROM users WHERE id = $1', [id]);
  return result.rows[0];
};

const createUser = async (firstName, lastName, username, hashedPassword) => {
  const result = await pool.query(
    'INSERT INTO users (first_name, last_name, username, password) VALUES ($1, $2, $3, $4) RETURNING id',
    [firstName, lastName, username, hashedPassword]
  );
  return result.rows[0];
};

const updateMembershipStatus = async (userId) => {
  await pool.query('UPDATE users SET membership_status = true WHERE id = $1', [userId]);
};

const updateAdminStatus = async (userId) => {
  await pool.query('UPDATE users SET is_admin = true WHERE id = $1', [userId]);
};

// Message queries
const getAllMessages = async () => {
  const result = await pool.query(`
    SELECT messages.*, users.first_name, users.last_name, users.membership_status 
    FROM messages 
    JOIN users ON messages.user_id = users.id 
    ORDER BY messages.created_at DESC
  `);
  return result.rows;
};

const createMessage = async (title, text, userId) => {
  await pool.query(
    'INSERT INTO messages (title, text, user_id) VALUES ($1, $2, $3)',
    [title, text, userId]
  );
};

const deleteMessage = async (messageId) => {
  await pool.query('DELETE FROM messages WHERE id = $1', [messageId]);
};

module.exports = {
  getUserByUsername,
  getUserById,
  createUser,
  updateMembershipStatus,
  updateAdminStatus,
  getAllMessages,
  createMessage,
  deleteMessage
};