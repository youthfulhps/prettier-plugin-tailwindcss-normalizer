// Simplified version check logic since only v3 is supported
export function getPrettierMajorVersion(): number {
  return 3;
}

export function loadParser(parserName: string) {
  const pathsToTry = [
    `prettier/plugins/${parserName}`,
    `prettier/parser-${parserName}`,
  ];

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
