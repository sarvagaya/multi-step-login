const reusableUiComponents = {
  PasswordComponent: (val, allData) => {
    const { calculateStrongPAssword } = utils;
    const passwordConfig = calculateStrongPAssword(allData.password);
    console.log("passwordConfig", passwordConfig);
    const isPasswordMatch =
      allData?.password && allData?.confirmPassword
        ? allData.password === allData.confirmPassword
        : true;
    console.log("valll", val);
    return `
          <div class="space-y-6">
                          <div class="space-y-2">
                              <label class="text-sm font-bold text-black">Password</label>
                              <input type="password" id="password" value="${
                                allData.password || ""
                              }" class="w-full p-4 bg-slate-50 border rounded-2xl">
                                  <span class="text-xs font-black ${
                                    passwordConfig.textColor
                                  }">${passwordConfig.label}</span>
                          </div>
                          <div class="space-y-2">
                              <label class="text-sm font-bold text-black">Confirm Password</label>
                              <input type="password" id="confirmPassword" value="${
                                allData.confirmPassword || ""
                              }" class="w-full p-4 border rounded-2xl">
                              ${
                                !isPasswordMatch
                                  ? '<p class="text-xs text-red-500 font-bold">Passwords mismatch.</p>'
                                  : ""
                              }
                          </div>
                      </div>
      `;
  },

  ReviewComponent: (val, allData) => {
    const entries = Object.entries(allData)
      .filter(
        ([key]) =>
          ![
            "password",
            "confirmPassword",
            "securityBlock",
            "reviewBlock",
            "commVerification",
          ].includes(key)
      )
      .map(([key, value]) => {
        const displayValue =
          value === true ? "Yes" : value === false ? "No" : value;

        return `
                <div>
                    <p class="text-xs text-gray-300 mb-1">${key}</p>
                    <p class="font-bold text-black text-lg">${
                      displayValue || "—"
                    }</p>
                </div>`;
      })
      .join("");

    return `
        <div class="bg-slate-50 p-8 md:p-10 grid grid-cols-1 md:grid-cols-2 gap-8 rounded-3xl border-2">
            ${
              entries ||
              '<p class="col-span-2 text-center text-slate-400">No data provided.</p>'
            }
        </div>`;
  },

  CommVerification: (val) => {
    return `
      <div class="space-y-6">
          <div class="space-y-2">
              <label class="text-sm font-bold text-black">Enter 0000 as verification code</label>
              <div class="flex flex-col gap-4">
                  <input type="text" id="commVerification" maxlength="4" value="${
                    val || ""
                  }" 
                                     class="w-full text-center text-4xl font-black p-6 rounded-3xl border focus:ring-4 focus:ring-blue-100 outline-none" 
                                     placeholder="0000">
              </div>
          </div>
      </div>
  `;
  },
};
