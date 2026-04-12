const router = require('express').Router();
const { getAllBugs, getStats, createBug, updateBug, deleteBug } = require('../controllers/bugController');
const { protect } = require('../middleware/authMiddleware');

router.get('/stats', protect, getStats);
router.get('/',      protect, getAllBugs);
router.post('/',     protect, createBug);
router.put('/:id',   protect, updateBug);
router.delete('/:id',protect, deleteBug);

module.exports = router;
