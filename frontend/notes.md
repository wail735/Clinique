1- comment sa marche le processus de login/signup???

a- pour le signup:
export const signup = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    const userExists = await User.findOne({ email });
    if (userExists) {
      return res.status(400).json({ message: "cet email est deja utilisé" });
    }
    const profilePicture = req.file ? req.file.filename : "default-avatar.png";
    const user = await User.create({
      name,
      email,
      password,
      profilePicture,
    });
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

l'utilisateur click d'abord sur sign up et entre ses informations 
en va verifer d'abord si le user existe dans la base de données si oui en retourne un status false sinon en cree un nouveau utlisateur et generer un nouveau token pour ce user
ensuite en retourne un status true avec le token et le user 

b- pour le login:
l'utilisateur click d'abord sur login et entre ses informations 
en va verifer d'abord si le user existe dans la base de données si non en retourne un status false sinon on compare le mot de passe entre dans la base de données et le mot de passe entré par l'utilisateur si le mot de passe est correct on retourne un status true avec le token et le user sinon en retourne un status false





2- comment sa marche le processus de reset password???

a- pour le reset password request:
l'utilisateur click d'abord sur forgot password et entre son email 
en va verifer d'abord si le user existe dans la base de données si non en retourne un status false sinon en va genrer un token aleatoire pour ce user qui va un clé temporaire qui va expirer apres un certain temps; ensuite en va stoker le token dans le user et ensuite en va ajouter que le token valide seulement pour une heure;  en sauvegarde ensuite dans la base de donnée et envoi l'email avec la fonction senSingleEmail qui va prend l'email de l'utilisateur le sujet et le message qui contient le lien de reset password par exemple si le lien de FRONTEND_URL = http://localhost:5173 le user a un lien comme se exemple http://localhost:5173/reset-password/a83f92c71e4b9d



b- pour la fonction resetPassword:
en prend d'abord le token et le password de user par destructring de body const { token, password } = req.body; 
ensuite on va chercher le user qui a se token et qui est valide et il faut que le token ne soit pas expiré en verifier sa en utilisant le $gt (greater than ) comme sa   resetTokenExpiry: { $gt: Date.now() }
si le token n'est pas valide ou expiré on retourne un status false sinon changer le mot de pass et rendre le resetToken et resetTokenExpiry null pour que le user ne peut pas utiliser le meme lien deuxieme fois et en retourne un status true avec un message de success c'est sa le single-use reset token et enfin en sauvegarde dans la base de donnée



FORGOT PASSWORD
      ↓
Email
      ↓
Find User
      ↓
Generate Token
      ↓
Save Token + Expiry
      ↓
Send Email
      ↓
User clicks link
      ↓
New Password
      ↓
Send Token + Password
      ↓
Check Token + Expiry
      ↓
Change Password
      ↓
Delete Token
      ↓
Done



3- 