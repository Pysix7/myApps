const User = require("../model/user");

exports.getAllUsers = async (req, res, next) => {
    try {
        const users = await User.find().select('username email');
        if (users && !users.length > 0) {
            const err = new Error("no users!");
            err.statusCode = 404;
            throw err;
        }
        const userRecords = users.map((user) => {
            return {
                username: user.username,
                email: user.email,
                id: user._id
            };
        })
        res.status(200).json([...userRecords]);
    } catch (err) {
        next(err);
    }
}

exports.getUser = async (req, res, next) => {
    try {
        const { userId } = req.params;
        const user = await User.findById(userId).select('username email');

        if (!user) {
            const err = new Error("User not Found!");
            err.statusCode = 404;
            throw err;
        }

        res.status(200).json({
            username: user.username,
            email: user.email,
            id: user._id
        });
    } catch (err) {
        next(err);
    }
}