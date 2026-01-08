const validEmailRegex = /\S+@\S+\.\S+/;
const checkCharacter = /[A-Z]/;
const checkNumeric = /[0-9]/;
const isCharacterPresent = /[^A-Za-z0-9]/;

const utils = {
    isEmailValid: (email) => validEmailRegex.test(email),
    calculateStrongPAssword: (password) => {
      let score = 0;
      if (!password) {
        return {
          label: "None",
          textColor: "bg-gray-300",
        };
      }
      if (
        password.length > 5
      ) {
        score += 1;
      }
      if(checkCharacter.test(password)) {
        score += 1
      }

      if(checkNumeric.test(password)) {
        score += 1
      }

      if(isCharacterPresent.test(password)) {
        score += 1
      }
    
      if (score >= 4) {
        return {
          label: "Strong",
          textColor: "bg-green-800",
        };
      }
    
      if (score >= 2) {
        return {
          label: "Weak",
          textColor: "text-yellow-400",
        };
      }
      return {
        label: "Poor",
        textColor: "text-red-500",
      };
    }
}