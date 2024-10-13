#  SMARTTABLEPAYMENT (ARRANGE PAYMENT BETWEEN PARTICIPANT WITH MY BALANCE)
### A React-based application that allows users to spend or add funds to balance. Users can register, log in - add more info in thir profile.
### Recommended resolution on computer: 1920x1080
### Recommended resolution on phone: <600px

## Technologies **JavaScript
### **Client** **FrontEnd**
- **ReactJs** -**Vite** -**SPA** -**SQLight(dataBase)**  -**ErrorHandle** -**Global Spinner** -**Deploy(Firebase)** -**Testing(Jest)** -**Responsive** -**UI** -**Profile Pic upload at (https://cloudinary.com/)** 
### BackEnd
-**ExpressJs** -**REST** -**NoSQL(Auth)** -**SQLite3(DataBase)** -**Profile Pic upload at (https://cloudinary.com/)** -**express-validator** **nodemailer(Sending emails)**

## ✨ Features
### 🔐 Authentication
- **Register**: Fast registration only with UserName and Password. You can add additional info in the profile Users providing First Name, Last Name, attach profile Photo, - error messages are displayed if the values are not in the correct format.
- **Login**: Users can log in to their account after it has been created.
- **Logout**: Users can log out of their accounts after they have been logged in.

**Register:**
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/register.png)
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/regWelcome.png)


**Login:**
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/login.png)
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/Welcome.png)


### 📌 Header
- **Navigation Buttons**:
  - **Homes**: Redirects to the `Home` page.
  - **Profile**: Redirects to the `Profile` page. 
  - **Search Bar**: Allows users to `Search` for record anywhere in Table.
  - **Contact Us**: Redirects to the `Contact Us` page. User can reach me via email, phone. Fake radar location.
  - **User Authentication Buttons**:
    - **Log In**: Displays a login button if the user is not logged in.  
      - **Profile Details**: Redirects to profile details page.
      - **Log Out**: Allows users to log out.

**Header when not logged in:**
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/notLogin.png)


**Header when logged in:**
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/loginHeader.png)

### 🌟 Details
- View detailed information about payment - id, user, type, name, description amount, data, data modify entry

**Details Page:**
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/details.png)
**Edit Page:**
-if is owner of the entry:
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/edit.png)

**Sing for modified entry
- On "Controls" table show sign with "M"
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/modify.png)



### 📧 Contact Us
- **Send Emails**: Users can send emails by providing their name, email, subject, phone number (not required) and message. if the user has filled in their details on the profile page, they will automatically appear in the fields ready for sending a email.
- **Contact Information**: On the right side is displayed information about Owner of the site socials and location:
  - Phone number
  - Email
  - GitHub
  - LinkedIn
  - Facebook
  - Office address
- **Office Location Map**: A card is displayed showing the exact location of the office.

**Contact Us Page:**
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/contactUs.png)


### 👩‍🚀 User Profile
- **Profile Details**: Here you can see profile ID, User: email, Create Date User: (date), First Name, Last Name, Phone N, Biography (Optional for add). User can change details, and profile picture

**Contact Us Page:**
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/profile.png)

**Balance Amount:**
- **Light Red** when amount is less than 0.00
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/redAmount.png)

- **Light green** when amount is grader than 0.00
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/greenAmount.png)


## 🧪 Data for testing purposes
- **Users**:0
  - **Email:** test@email.com; **password:** test123!


## Error Handling
1.Warning!
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/warning.png)

2.Success
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/success.png)

3.Error
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/error.png)

4.Confirm modal
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/del.png)


## Responsive 
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/responsive.png)
![image](https://github.com/dimobs/front-back-end-app/blob/main/public/resMenu.png)



## 🚀 Getting Started

### 📋 Prerequisites
- Node.js and npm installed.

### 🛠 Installation
1. Clone the repository:
   ```sh
   git clone https://github.com/dimobs/front-back-end-app.git
   ```

2. Navigate to `client` folder, install dependencies and run the app:
   ```sh
   cd .\client\
   npm install
   npm start
   ```

3. Open new terminal and navigate to `server` folder **WITHOUT** shutting down the terminal where the app (the client) is running:
   ```sh
   cd .\server\
   node .\server.js or npm start
   ```

4. Open the URL generated in the first teminal (client) and enjoy! :))

---
Thank you for using myApp! If you have any questions or feedback, feel free to reach out!