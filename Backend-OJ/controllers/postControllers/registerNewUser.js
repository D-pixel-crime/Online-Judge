export const registerNewUser = async (req, res) => {
  const { fullName, username, password, email } = req.body;
  try {
  } catch (error) {
    console.log(`Error registering new user: ${error}`.bgRed);
  }
};
