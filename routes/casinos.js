/* eslint-disable no-underscore-dangle */
const { Router } = require('express');
const { check, validationResult } = require('express-validator');
const User = require('../models/User');
const Casino = require('../models/Casino');

const router = Router();

const validationMiddleware = [check('email', 'Invalid email').isEmail()];

router.get('/', async (req, res) => {
  res.json({ message: 'Hi!' });
});

router.post('/sign-up', validationMiddleware, async (req, res) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        message: 'Validation error',
      });
    }

    const { email, name, browserId, ip } = req.body;

    let casino = await Casino.findOne({ name });
    if (!casino) {
      casino = new Casino({
        name,
      });
      await casino.save();
    }

    const user = await User.findOne({
      registeredOn: casino._id,
      $or: [{ email }, { browserId }],
    });
    if (user) {
      return res
        .status(400)
        .json({ user, message: 'This email has already been registered' });
    }
    const newUser = new User({
      email,
      ip,
      browserId,
      registeredOn: casino._id,
    });

    await newUser.save();
    res.status(201).json({ user: newUser });
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong' });
  }
});

router.get('/:name', async (req, res) => {
  try {
    const { name } = req.params;

    const casino = await Casino.findOne({ name });
    const users = await User.find({ registeredOn: casino._id });
    res.status(200).json({ users });
  } catch (error) {
    res.status(500).json({ error, message: 'Something went wrong' });
  }
});

module.exports = router;
