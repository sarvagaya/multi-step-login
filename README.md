# multi-step-login

## Steps to run
1. Install live server
2. Go to index.html and run the server.

## Design and Architecture

## Design
### Design was taken from google to visualise how the multi step form should look like.

## Architecture
1. Index.html: This is the root file that is handling the skeleton of the page and the multiple scripts that are playing their independent role in the form generation.
2. Used tailwind to make the form look more appealing.
3. utils.js: This file is handling the core logic for password strenght and also to check if the email provided by the user is a valid email or not.
4. components.js: This script holds all the ui components that cn be used multiple times at multiple places in future. Thsi file includes PasswordComponent, ReviewComponent, CommVerification. PasswordComponent is handling the UI for letting the user know whether the password entered by them is passing all thr validations that we have put at our end. Eg: Password length, must contain alphabets, numeric etc. 
ReviewComponent: This component is being displayed at the very end where user is seeing the review screen to check if all the details enterd are correct or not and these fields are non editable here.
CommVerification: This is just a simple input filed which is being used as a simulator to when user receives the otp on their email. To pass this step, just enter 0000 as the otp and we are good to go.
5. config.js: This script is the face of the form fields that are being generated via our script.js. This contains all the steps that user needs to complete so that the data can be consumed by our backend. We used config so that in future if a need arises for new entry block, frontend won't be required to accomodate those fields. currently we are only supporting email, date, password, select, checkbox and custom components under the type: custom.
6. script.js: This script is the backbone of our code. This handles all the necessary logic to display the form fields dynamically, to update the form fields, to handle a global state. Here we are using IIFE as a precautionary mesaure s that dta can be encapsulated and won't be accessed by the user outside. Only variables provided in the return will be accesed and all the functions and variables invoked inside it will remian hidden buy the outside world.

# How the data is being preserved
USed a global state in the script file under the name state and we are maintaining the form steps under the name currentStep, and userEnetredData under the name data.
Since the state we are maintainign is global in the script file, we are able to retain the data very easily and since the we have created the functo called createFormelement, we are able to display the form elements are easily map the respective data to the fields easily.
Same is happening for back button by dcreasing the current step to -1 by check if the current step is greated than 0.

# Screenshots
<img width="1210" height="558" alt="image" src="https://github.com/user-attachments/assets/3174a977-b5d4-4b63-a09c-63f0391b6d3d" />
<img width="1223" height="690" alt="image" src="https://github.com/user-attachments/assets/5938f642-e225-46fd-82f8-21ccb0a3b511" />
<img width="1200" height="465" alt="image" src="https://github.com/user-attachments/assets/57ef4efb-bbda-47c7-88df-ac226131c4d1" />
<img width="1210" height="532" alt="image" src="https://github.com/user-attachments/assets/10c153cf-b673-41ed-b994-66fb8f924f04" />
<img width="1227" height="583" alt="image" src="https://github.com/user-attachments/assets/fe1073c0-7a0e-4626-be99-df83db60a4c3" />
<img width="1212" height="630" alt="image" src="https://github.com/user-attachments/assets/10ad7d72-0c8b-4076-873f-702966af6f03" />
<img width="1428" height="635" alt="image" src="https://github.com/user-attachments/assets/9ef1eeb9-31d7-4217-8bc6-b978bca10155" />




