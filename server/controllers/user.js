import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

// Load User model
import User from "../model/userSchema.js";
// Load input validation
import SignupValidation from "../validator/signup.js";
import SigninValidation from "../validator/signin.js";

//  ---------------------------------------- //signup method to add a new user//--------------------------- //

export const signup = async (req, res) => {
    const { firstName, lastName, email, password } = req.body;

    const { errors, isValid } = SignupValidation(req.body);

    try {
        if (!isValid) {
            res.status(404).json(errors);
        } else {
            await User.findOne({ email }).then(async (exist) => {
                if (exist) {
                    errors.email = "Email already in use";
                    res.status(404).json(errors);
                } else {
                    const hashedpassword = bcrypt.hashSync(password, 8);
                    const result = await User.create({
                        firstName,
                        lastName,
                        email,
                        password: hashedpassword,

                    });
                    res.status(201).json({ message: "user added with success" });
                }
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}
//  ---------------------------------------- //signin method to add a new user//--------------------------- //
export const signin = async (req, res) => {
    const { email, password } = req.body;
    const { errors, isValid } = SigninValidation(req.body);

    try {
        if (!isValid) {
            res.status(404).json(errors);
        } else {
            await User.findOne({ email }).then(async (user) => {
                if (!user) {
                    errors.email =
                        "Email does not exist ! please Enter the right Email or You can make account";
                    res.status(404).json(errors);
                }
                // Compare sent in password with found user hashed password
                const passwordMatch = bcrypt.compareSync(password, user.password);
                if (!passwordMatch) {
                    errors.password = "Wrong Password";
                    res.status(404).json(errors);
                } else {
                    // generating a token and storing it in a cookie
                    const token = jwt.sign({ _id: user._id, role: user.role }, "sooraj_DOING_GOOD", {
                        expiresIn: "8h",
                    });
                    const options = {
                        expires: new Date(Date.now() + 1000 * 60 * 60 * 24 * 30),
                        httpOnly: true,
                        sameSite: "lax",
                    };

                    const data = {
                        id: user._id,
                        role: user.role
                    }
                    // console.log(data);
                    // res.cookie("Authorization", token, options);
                    res.status(201).json({
                        token,
                        data,
                    });
                }
            });
        }
    } catch (error) {
        console.log(error.message);
    }
}


export const verifyToken = async (req, res) => {
    try {
        const token = req.body.token;
        const decoded = jwt.verify(token, "sooraj_DOING_GOOD")
        res.status(200).json(decoded)

    } catch (error) {
        return res.status(401).json({
            message: 'Auth Failed'
        });
    }

}

export const getUser = async (req, res) => {
    const id = req.params.id;
    console.log(id, "id vanno");
    try {
        const userdata = await User.findById(id);
        const data = {
            firstName: userdata.firstName,
            lastName: userdata.lastName,
            email: userdata.email,
            role: userdata.role
        }
        res.status(200).json(data)

    } catch (error) {

    }
}

export const getAllUsers = async (req, res) => {
    try {
        const users = await User.find({});
        console.log(users)
        const userData = users
            .filter(user => user.role !== 'admin')
            .map(user => ({
                id: user.id,
                firstName: user.firstName,
                lastName: user.lastName,
                email: user.email,
                role: user.role
            }));
        res.status(200).json(userData);
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}

export const deleteUser = async (req, res) => {
    const userId = req.params.id;
    console.log("hi",userId)

    try {
        // Find the user by ID
        const user = await User.findById(userId);
        console.log(user)

        if (!user) {
            return res.status(404).json({ error: 'User not found' });
        }

        // Check if the user has the "admin" role and skip deletion
        if (user.role === 'admin') {
            return res.status(403).json({ error: 'Cannot delete admin user' });
        }

        // If the user is not an admin, delete the user
        await User.findByIdAndDelete(userId);

        res.status(200).send({ message: 'User deleted successfully' }); // Respond with a 204 status code for a successful deletion
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
}



