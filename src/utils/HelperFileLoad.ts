import { Request } from 'express';
import { v4 as uuidv4 } from 'uuid';

const publicPath = './public';
let path: string = publicPath;

export class HelperFileLoad {
  static set path(_path: string) {
    path = publicPath + _path;
  }

  public static customFileName(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    const originalName = file.originalname.split('.');
    const fileExtension = originalName.at(-1);

    cb(null, `${uuidv4()}.${fileExtension}`);
  }

  public static destinationPath(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error | null, filename: string) => void,
  ) {
    cb(null, path);
  }

  public static typeFileFilter(
    req: Request,
    file: Express.Multer.File,
    cb: (error: Error, acceptFile: boolean) => void,
  ) {
    const originalName = file.originalname.split('.');
    const fileExtension = originalName.at(-1);
    const types = ['png', 'jpeg', 'jpg', 'gif'];
    if (types.includes(fileExtension)) cb(null, true);
    else return cb(new Error('Тип файла некорректен'), false);
  }
}
