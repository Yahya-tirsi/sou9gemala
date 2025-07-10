import { useState } from "react";
// import { useDispatch } from "react-redux";

const PersonalInfo = ({ onNext }) => {
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
//   const dispatch = useDispatch();

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      alert("Les mots de passe ne correspondent pas");
      return;
    }
    onNext({ phone, password });
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-md">
      <h1 className="text-xl font-semibold mb-4">Informations personnelles</h1>
      <p className="mb-4">
        Configurez votre mot de passe et fournissez votre numéro de téléphone
      </p>

      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-gray-700 mb-2">
            Numéro de téléphone *
          </label>
          <div className="flex">
            <select className="p-2 border border-gray-300 rounded-l bg-gray-100">
              <option>+212</option>
              {/* Add other country codes as needed */}
            </select>
            <input
              type="tel"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="flex-1 p-2 border border-gray-300 rounded-r"
              required
            />
          </div>
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 mb-2">Mot de passe *</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
        </div>

        <div className="mb-6">
          <label className="block text-gray-700 mb-2">
            Confirmez le mot de passe *
          </label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            className="w-full p-2 border border-gray-300 rounded"
            required
          />
          <p className="text-sm text-gray-600 mt-1">
            Le mot de passe doit contenir au moins 8 caractères contenant une
            majuscule, une lettre inférieure, un nombre et un caractère spécial.
          </p>
        </div>

        <button
          type="submit"
          className="w-full bg-orange-500 text-white py-2 px-4 rounded hover:bg-orange-600"
        >
          SUIVANT
        </button>
      </form>
    </div>
  );
};

export default PersonalInfo;
