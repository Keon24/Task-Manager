import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import User from '../models/User.js';

export const register = async (req, res) => {
    try {
        const { firstName, lastName, email, password } = req.body;
        if (!firstName || !lastName || !email || !password) {
            return res.status(400).json({ msg: 'Please fill all the fields' });
        }
        if (typeof firstName !== 'string' || typeof lastName !== 'string' || typeof email !== 'string' || typeof password !== 'string') {
            return res.status(400).json({ msg: 'Please send string values only' });
        }

        if (password.length < 4) {
            return res.status(400).json({ msg: 'Password length must be at least 4 characters' });
        }

        if (!validateEmail(email)) {
            return res.status(400).json({ msg: 'Invalid Email' });
        }

        const user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'This email is already registered' });
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        await User.create({ firstName, lastName, email, password: hashedPassword });
        res.status(200).json({ msg: 'Congratulations!! Account has been created for you..' });
    } catch (err) {
        console.error(err);
        return res.status(500).json({ msg: 'Internal Server Error' });
    }
};

/* LOGGING IN */
export const login = async (req, res) => {
    try {
        const { email, password } = req.body;
        const user = await User.findOne({ email });
        if (!user) return res.status(400).json({ msg: 'User does not exist.' });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

        const token = jwt.sign({ id: user.id }, process.env.JWT_SECRET, { expiresIn: '1h' }); // Token expires in 1 hour

        const userWithoutPassword = { ...user.toObject(), password: undefined };

        res.status(200).json({ token, user: userWithoutPassword });
    } catch (err) {
        console.error(err);
        res.status(500).json({ error: err.message });
    }
};

// Function to validate email format
function validateEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}
