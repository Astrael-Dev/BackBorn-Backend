import express from 'express';
import { authenticateToken } from '../middlewares/authMiddleware.js';
import db from '../database/db.js';

const router = express.Router();

// Route pour récupérer le profil complet de l'utilisateur connecté
router.get('/me', authenticateToken, (req, res) => {
  db.get(
    'SELECT id, username, email, profile_picture, created_at FROM users WHERE id = ?',
    [req.user.id],
    (err, user) => {
      if (err) return res.status(500).json({ error: 'Database error' });
      if (!user) return res.status(404).json({ error: 'User not found' });

      // Ajoute l'URL complète si une image existe
      if (user.profile_picture) {
        user.profile_picture = `${req.protocol}://${req.get('host')}${user.profile_picture}`;
      }
      res.json({ user });
    }
  );
});

// ...autres routes existantes...
export default router;