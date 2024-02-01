import * as dotenv from 'dotenv';
import * as fs from 'fs';

export class ConfigService {
  private readonly envConfig: { [key: string]: string };
  private ENVS: Array<string> = ['DEV', 'PROD', 'UAT'];
  constructor(filePath: string) {
    try {
      this.envConfig = dotenv.parse(fs.readFileSync(filePath));
    } catch (err) {
      console.warn(`.env file parsing error`, err);
      this.envConfig = {};
    }
  }

  get(key: string): string {
    return this.ENVS.includes(process.env.NODE_ENV)
      ? process.env[key]
      : this.envConfig[key];
  }

  isEnv(env: string) {
    return this.envConfig.APP_ENV === env;
  }
}
