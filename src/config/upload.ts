import path from 'path'
import crypto from 'crypto'
import Muter from 'multer'

const tmpFolder = path.resolve(__dirname, '..', '..', 'tmp')
const multer = Muter({
  storage: Muter.diskStorage({
    destination: tmpFolder,
    filename(request, file, callback) {
      const fileHash = crypto.randomBytes(10).toString('hex')
      const fileName = `${fileHash}-${file.originalname}`

      return callback(null, fileName)
    },
  }),
  limits: {
    fileSize: 5 * 1024 * 1024, // no larger than 5mb, you can change as needed.
  },
})

export default {
  tmpFolder,
  multer,
}
