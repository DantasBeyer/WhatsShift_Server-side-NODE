const UserProfile = require('../models/UserProfile');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const Joi = require('joi');

// Atualize o esquema de validação para incluir o campo name
const schema = Joi.object({
  username: Joi.string().min(3).required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
  phone: Joi.string().min(10).required(),
  name: Joi.string().min(1).required(), // Adicione a validação do campo name
});

const register = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  const { username, email, password, phone, name } = req.body; // Inclua o campo name
  try {
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUserProfile = new UserProfile({ username, email, password: hashedPassword, phone, name });
    await newUserProfile.save();
    res.status(201).json(newUserProfile);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserProfile.findOne({ email });
    if (!user) return res.status(404).json({ error: 'User not found' });

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) return res.status(400).json({ error: 'Invalid credentials' });

    const token = jwt.sign({ id: user._id }, process.env.SECRET, { expiresIn: '1h' });
    res.json({ token });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

const updateUser = async (req, res) => {
  const { error } = schema.validate(req.body);
  if (error) return res.status(400).json({ error: error.details[0].message });

  try {
    const user = await UserProfile.findByIdAndUpdate(req.user.id, req.body, { new: true });
    res.status(200).json(user);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

module.exports = { register, login, updateUser };
