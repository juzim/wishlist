# WISHLIST - self-hosted present-aggregator

This started as personal project to learn [react](https://facebook.github.io/react/), [node.js](https://nodejs.org) and [express](http://expressjs.com/). While usable, it is still mostly a work in progress.
Also, everything is in German.


In WISHLIST groups (families, friends, co-workers etc) can collect wishes for themselves and others. For each user only the wishes are visible that are either not for him or added by himself.

## Installation
1. Clone the repository
2. Install node and the dependencies with npm install
3. Build the project with [gulp](http://gulpjs.com/)
4. Setup config file for production (copy and adapt default.json)
5. Run export NODE_ENV=production bin/www (you might want to use [forever](https://github.com/foreverjs/forever) for this)
6. You can access the wishlist on your-ip:3000

## Adding users
Users have to be added manually for now. The schema is:
```
{
  "name": "NAME",
  "key": "UNIQUE KEY",
  "email": "guess_what@email.computer",
  "isAdmin": TRUE OR FALSE,
  "group": ANY NUMBER,
  "imageUrl": "USERNAME.jpg",
}
```

"name"      <- the users name
"key"       <- a unique key which acts as the password so make it long (what could go wrong)
"isAdmin"   <- admins can edit and delete all wishes
"group"     <- each user can only belong to one group and can't see wishes or users from other groups
"imageUrl"  <- put a file with the same name in public/images/user

Note: admins still cannot see wishes for themselves that were added by another user.

## Todo:
- write better readme, add screenshots
- so much clean-up
- mobile-friendly layout
- better security (atm only a pass-phrase is used and no brute-force detection is implemented)
- multiple language support (at least english)
- admin pages to manage users and wishes
- better support for multiple groups

## Dev
1-3 from normal installation
5. Setup config file for dev (copy and adapt default.json)
6. Run export NODE_ENV=dev bin/www (you might want to use [forever](https://github.com/foreverjs/forever) for this)
7. You can access the wishlist on your-ip:3000
