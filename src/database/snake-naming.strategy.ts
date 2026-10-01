import { DefaultNamingStrategy } from 'typeorm';

export class SnakeNamingStrategy extends DefaultNamingStrategy {
  columnName(
    propertyName: string,
    customName: string | undefined,
    embeddedPrefixes: string[],
  ): string {
    const name = customName ?? propertyName;
    const fullName = embeddedPrefixes.length
      ? `${embeddedPrefixes.join('_')}_${name}`
      : name;

    return fullName.replace(/[A-Z]/g, (letter) => `_${letter.toLowerCase()}`);
  }
}