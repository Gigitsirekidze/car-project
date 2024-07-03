import { buildMessage, ValidateBy, ValidationArguments } from 'class-validator';

export const CustomValidator = (options?: any) =>
  ValidateBy(
    {
      name: 'CustomDecorator',
      validator: {
        validate(value: number): boolean {
          console.log('-----', value);

          return value < 500000;
        },
        defaultMessage: buildMessage(
          () => 'millage should be less than 500000',
        ),
      },
    },
    options,
  );
