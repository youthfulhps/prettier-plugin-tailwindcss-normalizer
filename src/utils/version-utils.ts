let prettierVersion: number | null = null;
export function getPrettierMajorVersion(): number {
  if (prettierVersion !== null) {
    return prettierVersion;
  }

  try {
    const prettier = require("prettier");

    if (prettier.version) {
      const majorVersion = parseInt(prettier.version.split(".")[0]);
      prettierVersion = majorVersion;
      return majorVersion;
    }

    const prettierPackageJson = require("prettier/package.json");
    if (prettierPackageJson.version) {
      const majorVersion = parseInt(prettierPackageJson.version.split(".")[0]);
      prettierVersion = majorVersion;
      return majorVersion;
    }

    prettierVersion = 3;
    return 3;
  } catch (error) {
    prettierVersion = 3;
    return 3;
  }
}

export function isPrettierV2(): boolean {
  return getPrettierMajorVersion() === 2;
}

export function isPrettierV3Plus(): boolean {
  return getPrettierMajorVersion() >= 3;
}

export function loadParser(parserName: string) {
  const majorVersion = getPrettierMajorVersion();

  const pathsToTry = [];

  if (majorVersion >= 3) {
    pathsToTry.push(`prettier/plugins/${parserName}`);
    pathsToTry.push(`prettier/parser-${parserName}`);
  } else {
    pathsToTry.push(`prettier/parser-${parserName}`);
    pathsToTry.push(`prettier/plugins/${parserName}`);
  }

  let lastError: Error | null = null;

  for (const path of pathsToTry) {
    try {
      return require(path);
    } catch (error) {
      lastError = error as Error;
      continue;
    }
  }

  throw new Error(
    `Failed to load parser: ${parserName}. ` +
      `Prettier version: ${majorVersion}. ` +
      `Tried paths: ${pathsToTry.join(", ")}. ` +
      `Last error: ${lastError?.message}`
  );
}

export function getParserFromParsers(parsers: any, parserName: string) {
  if (!parsers) {
    return {};
  }

  if (!parsers[parserName]) {
    if (parserName === "angular" && Object.keys(parsers).length > 0) {
      const firstParser = Object.keys(parsers)[0];
      return parsers[firstParser];
    }

    return {};
  }

  return parsers[parserName];
}

export function safeLoadParser(parserName: string, specificParser?: string) {
  try {
    const parserModule = loadParser(parserName);
    const targetParser = specificParser || parserName;
    return getParserFromParsers(parserModule.parsers, targetParser);
  } catch (error) {
    return {};
  }
}
