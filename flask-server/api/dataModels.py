class User:
    def __init__(self, id, name, age, gender, recent_searches):
        self.id = id
        self.name = name
        self.age = age
        self.gender = gender
        # self.likes = likes
        # self.dislikes = dislikes
        self.recent_searches = recent_searches

class Product:
    def __init__(self, id, name, category, disc_price, actual_price, disc_pct, rating, rating_count, description, img_link, link):
        self.id = id
        self.name = name
        self.category = category
        self.disc_price = disc_price
        self.actual_price = actual_price
        self.disc_pct = disc_pct
        self.rating = rating
        self.rating_count = rating_count
        self.description = description
        self.img_link = img_link
        self.link = link
