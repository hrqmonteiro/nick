import nextConnect from 'next-connect';
import multer from 'multer';
import { v4 as uuid } from 'uuid';
let fileName = '';

const upload = multer({
  storage: multer.diskStorage({
    destination: (req, file, cb) => {
      let path = process.cwd() + '/public/uploads/products/';
      cb(null, path);
    },
    filename: async (req, file, cb) => {
      let token = uuid();
      const ext = file.mimetype.split("/")[1];
      fileName = `${token}.${ext}`;
      cb(null, fileName);
    },
  }),
  limits: {
    fileSize: 1024 * 1024 * 5,
  },
}).array("theFiles[]", 5);


const apiRoute = nextConnect({
  onError(error, req, res: any) {
    res.json({
      status: false,
      data: [],
      oth: `Sorry something Happened! ${error.message}`,
    });
  },
  onNoMatch(req, res: any) {
    res.json({
      status: false,
      data: [],
      oth: `Method '${req.method}' Not Allowed`,
    });
  }
});


apiRoute.post(async (req: any, res) => {
  try {
    upload(req, res, function (err) {
      if (err) {
        return res.json({
          status: false,
          data: "File uploading faled."
        });
      } else {
        if (fileName != '') {
          return res.json({
            name: fileName
          });
        } else {
          return res.json({
            name: 'image.png'
          });
        }
      }
    });
  } catch (err) {
    return res.json({
      status: false,
      data: "File uploading faled."
    });
  }

});
export default apiRoute;
export const config = {
  api: {
    bodyParser: false,
  },
};