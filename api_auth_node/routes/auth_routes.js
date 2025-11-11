import express from 'express';
import User from '../models/User.js';
import dotenv from 'dotenv';

dotenv.config();

const router = express.Router();

//  Cadastro de usuorio

// para testar
// {
//   "username": "Roberto",
//   "email": "roberto@test.com",
//   "password": "123456"
// }
router.post('/cadastro', async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // Verifica se jo existe usuorio com o mesmo e-mail
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: 'E-mail já cadastrado' });
    }

    // Cria novo usuorio
    const newUser = new User({
      username,
      email,
      password,
    });

    await newUser.save();

    res.status(201).json({ message: 'Usuário cadastrado com sucesso' });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao tentar cadastrar usuário' });
  }
});



//  Login via usuorio e senha

// para testar

// {
//   "email": "roberto@test.com",
//   "password": "123456"
// }

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body;
    // Procura o usuorio
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'E-mail não encontrado' });

    console.log("Teste 1", user);

    // Verifica senha
    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Senha inválida' });

    console.log("Teste 2", user);

    // Gera token JWT
    const token = user.generateAuthToken();

    console.log("Teste 3", user);

    res.json({ user, token });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Erro ao fazer login' });
  }
});


router.get('/lista-usuarios', async (req, res) => {
    try {
        const users = await User.find({}, '-password'); // Exclui o campo de senha
        res.status(200).json(users);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Nenhum usuário cadastrado' });
    }
});


export default router;
