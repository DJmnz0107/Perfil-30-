const logoutController = {};

logoutController.logout = async (req, res) => {
    res.clearCookie("authToken")

    res.json({message:"Logged out successful"});
}

export default logoutController;