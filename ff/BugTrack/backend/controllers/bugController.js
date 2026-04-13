const Bug = require('../models/Bug');

// GET /api/bugs
const getAllBugs = async (req, res) => {
  try {
    const bugs = await Bug.find().populate('reportedBy', 'name email role').populate('assignedTo', 'name email').sort('-createdAt');
    res.json(bugs);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// GET /api/bugs/stats
const getStats = async (req, res) => {
  try {
    const [total, open, inProgress, resolved, critical, major, minor] = await Promise.all([
      Bug.countDocuments(),
      Bug.countDocuments({ status: 'Open' }),
      Bug.countDocuments({ status: 'In Progress' }),
      Bug.countDocuments({ status: 'Resolved' }),
      Bug.countDocuments({ severity: 'Critical' }),
      Bug.countDocuments({ severity: 'Major' }),
      Bug.countDocuments({ severity: 'Minor' }),
    ]);
    res.json({ total, open, inProgress, resolved, critical, major, minor });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// POST /api/bugs
const createBug = async (req, res) => {
  try {
    const { title, description, severity, project, assignedTo } = req.body;
    const bug = await Bug.create({ title, description, severity, project, assignedTo: assignedTo || null, reportedBy: req.user._id });
    await bug.populate('reportedBy', 'name email');
    res.status(201).json(bug);
  } catch (err) { res.status(500).json({ message: err.message }); }
};

// PUT /api/bugs/:id
// PUT /api/bugs/:id
const updateBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });

    bug.title = req.body.title || bug.title;
    bug.description = req.body.description || bug.description;
    bug.severity = req.body.severity || bug.severity;
    bug.status = req.body.status || bug.status;
    bug.project = req.body.project || bug.project;

    // ⭐ IMPORTANT FIX
    if (req.body.assignedTo !== undefined) {
      bug.assignedTo = req.body.assignedTo || null;
    }

    await bug.save();

    await bug.populate('reportedBy', 'name email role');
    await bug.populate('assignedTo', 'name email');

    res.json(bug);

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// DELETE /api/bugs/:id
const deleteBug = async (req, res) => {
  try {
    const bug = await Bug.findById(req.params.id);
    if (!bug) return res.status(404).json({ message: 'Bug not found' });
    await bug.deleteOne();
    res.json({ message: 'Bug deleted' });
  } catch (err) { res.status(500).json({ message: err.message }); }
};

module.exports = { getAllBugs, getStats, createBug, updateBug, deleteBug };
