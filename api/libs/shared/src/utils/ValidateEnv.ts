import { ConfigService } from '@nestjs/config';

// Validate variable from env file is not undefine.

export const validateEnv = (args: string[], configServices: ConfigService) => {
  args.forEach((arg) => {
    if (!configServices.get(arg))
      throw new Error(`You must provider ${arg} in env file.`);
  });
  return args.map((arg) => configServices.get(arg));
};
