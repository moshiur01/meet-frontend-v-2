# Project Name: Meet your doctor (Frontend)

## live Site Link: https://meet-your-doctor.vercel.app/

## Backend Repo Link: https://github.com/moshiur01/meet-your-doctor-backend-v2

## Project Description

- A Hybrid base doctor appointment booking system here a user can book, manage his appointment and get the prescribed medicine through online

## Demo Video

In order to get a quick idea of this project see the [Video](https://drive.google.com/file/d/1eGPNeBtmjS0rkFH0ekpErGQupr9I7jFF/view?usp=sharing)

### Features

- On the Home page, users can navigate one section to another section through the navigation bar. On the Home page, users can navigate to the services page, doctor section, review section, About Us section, Contact Us section.
- In the website the ui is dynamically render via user role. They user role are ` user, doctor, medicine vendor and admin`.
- user password are securely encrypted via jwt token
- User can't go to some route without login or admin permission witch is developed by react router.
- All the data are used in the website like user details, services, orders, reviews are hosted in the supabase.

<details>
  <summary>Home page Image</summary>
  <br>
  <img src="https://github.com/moshiur01/meet-your-doctor-frontend/blob/mainn/public/readmeImg/home-page.png" alt="Image Description">
</details>

### Functionality List

![https://github.com/moshiur01/meet-your-doctor-frontend/blob/mainn/public/readmeImg/image.png](https://github.com/moshiur01/meet-your-doctor-frontend/blob/mainn/public/readmeImg/image.png)

### search Functionality

user can search doctor by their name of by category.

![https://github.com/moshiur01/meet-your-doctor-frontend/blob/mainn/public/readmeImg/search-dcotor.png](https://github.com/moshiur01/meet-your-doctor-frontend/blob/mainn/public/readmeImg/search-dcotor.png)

### User Functionality

- Users can login or register to the website with an email and password.
- user can upload or change his photo. The photo is stored in the Cloudinary .
- Users can book their appointment after login.
- No user can see the doctors’s details without login as it is protected via private route.
- Users can only book a appointment after login.
- After login user can use the dashboard facility.
- In the dashboard, a user can see their booking status, post a review. On the home page, users can see their reviews.

<details>
  <summary>See Image</summary>
  <br>
  <img src="https://github.com/moshiur01/meet-your-doctor-frontend/blob/mainn/public/readmeImg/user-profile.png" alt="Image Description">
</details>

### Doctor Functionality

- doctors can login into their account by the credential provided by an admin.
- doctors can change or update their profile
- Doctor can see his appointment status and manage appointments.
- Doctor can add his time slot, service hour , education and qualifications.

<details>
  <summary>See Image</summary>
  <br>
  <img src="https://github.com/moshiur01/meet-your-doctor-frontend/blob/mainn/public/readmeImg/doctor-profile.png" alt="Image Description">
</details>

### Pharmaceutical Functionality

- Pharmaceutical vendor people can login into their account by the credential provided by an admin.
- They can see the patients prescribed medicine and can deliver to the user home via cash on delivery.
- They can manage their profile information.

<details>
  <summary>See Image</summary>
  <br>
  <img src="https://github.com/moshiur01/meet-your-doctor-frontend/blob/mainn/public/readmeImg/pharmaceutical-vendor-profile.png" alt="Image Description">
</details>

### Admin Functionality

- Admin facility is added to maintain the website. In the Dashboard An Admin can make another admin, manage orders, manage doctors, add doctors, manage users reviews, manage pharmaceutical vendors.

<details>
  <summary>See Image</summary>
  <br>
  <img src="https://github.com/moshiur01/meet-your-doctor-frontend/blob/mainn/public/readmeImg/admin-profile.png">
</details>
