import mongoose from "mongoose";

import config from "./config";
import crypto from "crypto";
import User from "./models/User";
import Photo from "./models/Photo";

const run = async () => {
  await mongoose.connect(config.db);
  const db = mongoose.connection;

  try {
    await db.dropCollection('users');
    await db.dropCollection('photos');
  } catch (e) {
    console.log('Collections were not present, skipping drop...');
  }

  const [Admin, Artem, David] = await User.create({
    username: 'admin@gmail.com',
    displayName: 'Admin',
    password: '12345',
    token: crypto.randomUUID(),
    role: 'admin'
  }, {
    username: 'artem1984@gmail.com',
    displayName: 'Artem',
    password: 'qwerty123',
    token: crypto.randomUUID(),
    avatar: 'fixtures/avatar.png',
  }, {
    username: 'david1999@gmail.com',
    displayName: 'David',
    password: 'a@123456',
    token: crypto.randomUUID(),
  });

  await Photo.create({
    title: 'Rope bridge',
    user: Admin._id,
    image: 'fixtures/bridge.jpeg',
  }, {
    title: 'Beautiful deer',
    user: Admin._id,
    image: 'fixtures/deer.jpeg',
  }, {
    title: 'Light forest',
    user: Artem._id,
    image: 'fixtures/forest.jpg',
  }, {
    title: 'Horse',
    user: Artem._id,
    image: 'fixtures/horse.jpeg',
  }, {
    title: 'Mountains',
    user: Artem._id,
    image: 'fixtures/mountains.jpeg',
  }, {
    title: 'Night forest',
    user: David._id,
    image: 'fixtures/forest-2.jpeg',
  }, {
    title: 'Rainbow',
    user: Artem._id,
    image: 'fixtures/rainbow.webp',
  }, {
    title: 'Mountain river',
    user: David._id,
    image: 'fixtures/river.jpeg',
  });

  await db.close();
}

run().catch(console.error);