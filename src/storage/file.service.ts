import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as fs from 'fs';
import { basename, join } from 'path';
import { FileInfo } from './file.info';

@Injectable()
export class FileService {
  public rootLocation: string;
  public fileLocation: string;
  constructor(private readonly configService: ConfigService) {
    this.rootLocation = process.cwd();
    const fileRootDir = this.configService.get<string>('FILE_ROOT_DIR');
    this.fileLocation = fileRootDir;
    this.mkdir(this.fileLocation);
  }

  async readFile(relativePath: string): Promise<string> {
    try {
      const absolutePath = join(this.rootLocation, relativePath);

      return await fs.promises.readFile(absolutePath, 'utf-8');
    } catch (error) {
      return null;
    }
  }

  async writeFile(relativePath: string, data: string): Promise<boolean> {
    try {
      const absolutePath = join(this.rootLocation, relativePath);

      await fs.promises.writeFile(absolutePath, 'utf-8');
      return true;
    } catch (error) {
      return false;
    }
  }

  async mkdir(relativePath: string): Promise<FileInfo | false> {
    try {
      const absolutePath = join(this.rootLocation, relativePath);
      const directoryName = basename(absolutePath);
      await fs.promises.mkdir(absolutePath);
      const fileInfo: FileInfo = {
        relativePath,
        absolutePath,
        name: directoryName,
      };
      return fileInfo;
    } catch (error) {
      return false;
    }
  }

  async isExist(relativePath: string): Promise<boolean> {
    try {
      const absolutePath = join(this.rootLocation, relativePath);

      await fs.promises.access(absolutePath, fs.constants.F_OK);
      return true;
    } catch (error) {
      return false;
    }
  }

  async getFileInfo(relativePath: string): Promise<FileInfo> {
    try {
      const absolutePath = join(this.rootLocation, relativePath);
      const directoryName = basename(absolutePath);
      const fileInfo: FileInfo = {
        relativePath,
        absolutePath,
        name: directoryName,
      };
      return fileInfo;
    } catch (error) {
      throw error;
    }
  }
}
