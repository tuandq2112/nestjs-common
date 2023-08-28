import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import {
  WinstonModuleOptions,
  WinstonModuleOptionsFactory,
} from 'nest-winston';
import { createLogger, format, transports } from 'winston';
import 'winston-daily-rotate-file';
import { FileInfo } from '../storage/file.info';
import { FileService } from '../storage/file.service';

@Injectable()
export class WinstonServiceConfig implements WinstonModuleOptionsFactory {
  constructor(
    private readonly configService: ConfigService,
    private readonly fileService: FileService,
  ) {}
  async createWinstonModuleOptions(): Promise<WinstonModuleOptions> {
    const fileConfig = this.configService.get<any>('file');

    const logDir = fileConfig.winstonDir;
    const isExistLogFolder: boolean = await this.fileService.isExist(logDir);
    if (isExistLogFolder) {
      this.fileService.mkdir(logDir);
    }
    const fileInfo: FileInfo = await this.fileService.getFileInfo(logDir);
    const logger = createLogger({
      format: format.combine(
        format.timestamp({
          format: 'YYYY-MM-DD HH:mm:ss',
        }),
        format.printf(
          ({ timestamp, level, message }) =>
            `${timestamp} ${level}: ${message}`,
        ),
        format.colorize(), // Add colorization to logs
      ),

      transports: [
        // debug log setting
        new transports.DailyRotateFile({
          level: 'debug',
          datePattern: 'YYYY-MM-DD',
          dirname: fileInfo.absolutePath + '/debug', // log file /logs/debug/*.log in save
          filename: `%DATE%.log`,
          maxFiles: 30, // 30 Days saved
          json: false,
          zippedArchive: true,
        }),
        // error log setting
        new transports.DailyRotateFile({
          level: 'error',
          datePattern: 'YYYY-MM-DD',
          dirname: fileInfo.absolutePath + '/error', // log file /logs/error/*.log in save
          filename: `%DATE%.log`,
          maxFiles: 30, // 30 Days saved
          handleExceptions: true,
          json: false,
          zippedArchive: true,
        }),
      ],
    });
    logger.add(
      new transports.Console({
        format: format.combine(format.splat(), format.colorize()),
      }),
    );
    return logger;
  }
}
