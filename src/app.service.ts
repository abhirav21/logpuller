import { Injectable } from '@nestjs/common';
import * as AWS from 'aws-sdk';
import * as moment from 'moment';
import { SearchLogsDto } from './dtos/search-logs.dto';
import { ConfigService } from './config';
const readline = require('readline');

@Injectable()
export class AppService {
  private s3;
  constructor(private readonly configService: ConfigService) {
    this.s3 = new AWS.S3({
      accessKeyId: this.configService.get('AWS_ACCESSKEY_ID'),
      secretAccessKey: this.configService.get('SECRET_ACCESS_KEY'),
    });
  }

  async searchLogs(searchLogsDto: SearchLogsDto) {
    const matchingLogFiles = await this.getLogFilesWithinWindow({
      from: searchLogsDto.from,
      to: searchLogsDto.to,
    });
    const promises = matchingLogFiles.map((logfile) => {
      return this.findInLogFile(logfile, searchLogsDto.searchKeyword);
    });
    const lines = await Promise.all(promises);
    return lines.flat();
  }

  async getLogFilesWithinWindow(
    searchLogsDto: SearchLogsDto,
  ): Promise<String[]> {
    return new Promise((res, rej) => {
      const fromDate = moment(searchLogsDto.from);
      const toDate = moment(searchLogsDto.to);
      var params = {
        Bucket: 'app-logs-bucket-devtron',
        Prefix: '',
      };
      const matchingLogFiles = [];

      this.s3.listObjectsV2(params, function (err, data) {
        if (err)
          console.error(err); // an error occurred
        else {
          for (let content of data.Contents) {
            let folder = content.Key.split('/')?.[0];
            let file = content.Key.split('/')?.[1]?.split('.')[0];
            if (folder && file) {
              const compareDate = moment(`${folder} ${file}:00:00`);
              if (compareDate.isBetween(fromDate, toDate)) {
                matchingLogFiles.push(content.Key);
              }
            }
          }
          res(matchingLogFiles);
        }
      });
    });
  }

  async findInLogFile(filename, searchKeyword) {
    return new Promise((resolve, reject) => {
      const linesToReturn = [];
      const params = {
        Bucket: 'app-logs-bucket-devtron',
        Key: filename,
      };
      // read file in a stream
      const s3ReadStream = this.s3.getObject(params).createReadStream();

      const rl = readline.createInterface({
        input: s3ReadStream,
        terminal: false,
      });

      rl.on('line', (line) => {
        //if keyword found append to return array
        if (line.includes(searchKeyword)) {
          linesToReturn.push(line);
        }
        console.log(`Line from file: ${line}`);
      });
      rl.on('error', () => {
        console.error('error');
      });
      rl.on('close', function () {
        console.log('closed');
        resolve(linesToReturn);
      });
    });
  }
}
