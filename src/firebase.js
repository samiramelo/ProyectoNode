require('dotenv').config()
const { getFirestore } = require('firebase-admin/firestore')
const admin = require('firebase-admin')

admin.initializeApp({
credential: admin.credential.cert(process.env.GOOGLE_APPLICATION_CREDENTCIALS),
})

const db = getFirestore()
module.exports = {
db
}