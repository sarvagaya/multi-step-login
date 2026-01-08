const displayPasswordComp = (_, allData) => {
  const { isPasswordStrong } = utils;
  const isPasswordMatch =
    allData?.password && allData?.confirmPassword
      ? allData.password === allData.confirmPassword
      : true;
  return `
        <div class="space-y-6">
                        <div class="space-y-2">
                            <label class="text-sm font-bold text-black">Password</label>
                            <input type="password" id="password" value="${
                              allData.password || ""
                            }" class="w-full p-4 bg-slate-50 border rounded-2xl">
                                <span class="text-xs font-black ${
                                  strength.textColor
                                }">${strength.label}</span>
                        </div>
                        <div class="space-y-2">
                            <label class="text-sm font-bold text-black">Confirm Password</label>
                            <input type="password" id="confirmPassword" value="${
                              allData.confirmPassword || ""
                            }" class="w-full p-4 border rounded-2xl">
                            ${
                              !isMatch
                                ? '<p class="text-xs text-red-500 font-bold">Passwords mismatch.</p>'
                                : ""
                            }
                        </div>
                    </div>
    `;
};

const displayReviewComponent = (_, allData) => {
  return `<div class="bg-white p-10 grid grid-cols-2 gap-6">
        <div><p class="text-sm font-black">Username</p><p class="font-bold text-lg">${
          allData.username || "—"
        }</p></div>
        <div><p class="text-sm font-black">Email</p><p class="font-bold text-lg">${
          allData.email || "—"
        }</p></div>
        <div><p class="text-sm font-black">Location</p><p class="font-bold text-lg">${
          allData.state || "—"
        }</p></div>
        <div><p class="text-sm font-black">Company</p><p class="font-bold text-lg">${
          allData.companyName || "—"
        }</p></div>
    </div>`;
};

const commVerification = (val) => {
    return `
    <div class="space-y-6">
        <div class="space-y-2">
            <label class="text-sm font-bold text-black">Verification Code</label>
            <div class="flex flex-col gap-4">
                <input type="text" id="otp" maxlength="4" value="${val || ''}" 
                       class="w-full text-center text-4xl font-black p-6 rounded-3xl" 
                       placeholder="0000">
                <p class="text-xs text-black font-bold text-center">Enter 0000 to proceed to next step.</p>
            </div>
        </div>
    </div>
`;
}

const reusableUiComponents = {
    PasswordComponent: displayPasswordComp,
    ReviewComponent: displayReviewComponent,
    CommVerification: commVerification,
}