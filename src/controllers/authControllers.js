const authService = require("../services/authServices");

const register = async (req, res) => {
    try {
        const token = await authService.register(req.body);
        res.status(201).json({ token });
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
};

const login = async (req, res) => {
    try {
        const token = await authService.login(req.body.email, req.body.password);
        res.status(200).json({ token });
    } catch (error) {
        res.status(401).json({ error: error.message });
    }
};

module.exports = { register, login };
