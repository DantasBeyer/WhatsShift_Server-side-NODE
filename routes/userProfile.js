const router = require("express").Router();
let UserProfile = require("../models/UserProfile");
const express = require("express");
const { register, login } = require("../controllers/userCOntroller");

router.post("/register", register);
router.post("/login", login);

// Rota para obter o perfil do usuário
router.route("/:id").get((req, res) => {
  UserProfile.findById(req.params.id)
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Rota para adicionar um novo perfil de usuário
router.route("/add").post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const phone = req.body.phone;

  const newUserProfile = new UserProfile({
    name,
    email,
    phone,
  });

  newUserProfile
    .save()
    .then(() => res.json("User profile added!"))
    .catch((err) => res.status(400).json("Error: " + err));
});

// Rota para atualizar o perfil do usuário
router.route("/update/:id").post((req, res) => {
  UserProfile.findById(req.params.id)
    .then((user) => {
      user.name = req.body.name;
      user.email = req.body.email;
      user.phone = req.body.phone;

      user
        .save()
        .then(() => res.json("User profile updated!"))
        .catch((err) => res.status(400).json("Error: " + err));
    })
    .catch((err) => res.status(400).json("Error: " + err));
});

module.exports = router;
