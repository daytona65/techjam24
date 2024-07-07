# Matchmaker - TikTok TechJam 2024 

## Objective: Enhancing Tailored Discovery on TikTok!
The scope of the task was to design a hyper-personalised card that would appear on users' For You Feed as they browse through content and would draw users to the TikTok Shop.

### What is it?
We designed a personalised For You Page card to showcase relevant TikTok Shop’s products based on how dating apps work. Much like how the discovery of potential matches is gamified in apps like Tinder, we have taken that concept and applied it to products on TikTok Shop instead!

Our solution features a recommendation algorithm that directly takes the users' indicated preferences from their interactions with our Matchmaker feature - namely swiping left to dislike, swiping right to like. Together with personalised data from the 'For You' algorithm and other real-time user interactions on the app, the algorithm would generate tailored product recommendations for each user and enhance the discovery of products in TikTok Shop.

### How it works
Matchmaker is a hyper-personalised card on your ‘For You’ page. Each day, you will have a limited number of likes (5) to get a shot at getting discounts for your favourite products!

Matchmaker pops up at a certain time of day or your first time of accessing TikTok for the day to alert you that your likes have refreshed and you can swipe a range of products.

### Allowed actions
1. Left Swipes - You are not interested in the product and would like to see the next product. The product card is discarded.

2. Right Swipes - You expend a ‘like’ to indicate interest in the product. Sometimes, a right swipe gets you a ‘Match’ and an exclusive discount code! Match or not, you will be directed to the product page on the Shop and prompted that the code is only valid for a short period of time if you did get a Match. This incentivises users to deliberate less and buy quickly.

3. Tap - Tapping on the product takes you to the product details page in TikTok Shop

4. Up and Down Swipes - Navigates between the previous and next video as per normal on the For You page.

5. Enter a search input on the search bar.


## How to run the code?

### 1. `git clone` the project

### 2. Set up Frontend client
- `cd client`
- Install dependencies: `npm i`
- `npm start` to run 

\* Note: Use Android Emulator only (because the API urls are configured differently for Android and IOS Emulators - 
Android IP: `http://10.0.2.2:5000`)

\** If error occurs, please check the name of `Feed.tsx` file. It gets auto converted to lowercase `feed.tsx` randomly (and we have yet to figure out why.. at least before the hackathon deadline). Simply rename the file and you are good to go!

### 3. Set up Backend server
- `cd flask-server`
- Install packages: `pip3 install -r requirements.txt`
- Set up your mongodb credentials in a `.env` file to include `ATLAS_URI` and `DB_NAME`
- Run the server: `python3 server.py`
- Call the endpoint `/upload` to populate the database

The complete available API routes are in the `server.py` file.

\* Note: the database is not public and the .env is not provided for obvious security reasons.. and we also have to whitelist your IP address for access to the database. Hence please reach out to us if you need to run a fully functional version of this application.

## Tech Stack
- Frontend: React-Native Expo
- Backend: Python Flask with pymongo
- Database: MongoDB
- Data processing & recommendation systems: nltk, sci-kit learn


## Attributions
Project done by `Group Yolo`, Singapore.

Group members:
- Nicholas Arlin Halim (NUS) - Group Leader
- Josephine Agatha Hemingway (NTU)