const validEmailRegex = /\S+@\S+\.\S+/;
const checkCharacter = /[A-Z]/;
const checkNumeric = /[0-9]/;
const isCharacterPresent = /[^A-Za-z0-9]/;

const utils = {
    isEmailValid: (email) => validEmailRegex.test(email),
    calculateStrongPAssword: (password) => {
      let strongCount = 0;
      if (!password) {
        return {
          label: "None",
          textColor: "bg-gray-300",
        };
      }
      if (
        password.length > 5
      ) {
        strongCount += 1;
      }
      if(checkCharacter.test(password)) {
        strongCount += 1
      }

      if(checkNumeric.test(password)) {
        strongCount += 1
      }

      if(isCharacterPresent.test(password)) {
        strongCount += 1
      }
    
      if (strongCount >= 4) {
        return {
          label: "Strong",
          textColor: "bg-green-800",
        };
      }
    
      if (strongCount >= 2) {
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