const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const config = require('config');
const auth = require('../middleware/auth');

const { body, validationResult } = require('express-validator');

// User Model
const User = require('../models/User');
const Attendant = require('../models/Attendant');

// @route   POST    api/auth
// @desc    Auth user & get token
// @access  Public
router.post('/', async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });

    if (!user) {
      const username = email;
      try {
        let attendant = await Attendant.findOne({ username });

        if (!attendant) {
          return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        if (password !== attendant.password) {
          return res.status(400).json({ msg: 'Invalid Credentials' });
        }

        const payload = {
          user: {
            id: attendant.user,
            attendantId: attendant._id,
            name: attendant.name,
            username: attendant.username,
          },
        };

        // Json web token generate
        jwt.sign(
          payload,
          config.get('jwtSecret'),
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            return res.json({ token });
          }
        );
      } catch (error) {
        console.error(error.message);
        res.status(500).send('Server Error Ndani');
      }
    }

    if (user) {
      // Verify password match
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        return res.status(400).json({ msg: 'Invalid Credentials' });
      }

      const payload = {
        user: {
          id: user.id,
          email: user.email,
          expiredAt: user.expiredAt,
        },
      };

      // Json web token generate
      jwt.sign(
        payload,
        config.get('jwtSecret'),
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ token });
        }
      );
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

// @route   GET    api/auth
// @desc    Get logged in user
// @access  Private
router.get('/', auth, async (req, res) => {
  try {
    if (req.user.name) {
      const attendant = await Attendant.findOne({
        user: req.user.id,
        username: req.user.username,
      }).select('-password');

      const users = await User.findById(req.user.id).select('-password');
      const { phone, business, tin,isAdmin, expiredAt } = users;
      const { _id, user, name, username, date } = attendant;
      const user1 = {
        _id,
        user,
        lastName: name,
        username,
        date,
        phone,
        business,
        isAdmin,
        tin,
        expiredAt,
      };
      // const collect = { ...attendant, ...user1 };
      res.json(user1);
      console.log(user1);
    } else {
      const user = await User.findById(req.user.id).select('-password');
      res.json(user);
    }
  } catch (error) {
    console.error(error.message);
    res.status(500).send('Server Error');
  }
});

module.exports = router;
