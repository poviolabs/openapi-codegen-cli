import { GenerateType } from "./generate";

interface ZodGenerateOptions {
  schemaSuffix: string;
  enumSuffix: string;
  withImplicitRequiredProps?: boolean;
  withDefaultValues?: boolean;
  withDescription?: boolean;
  allReadonly?: boolean;
  strictObjects?: boolean;
  extractEnums?: boolean;
  replaceOptionalWithNullish?: boolean;
}

interface EndpointsGenerateOptions {
  restClientImportPath: string;
  errorHandlingImportPath: string;
  withDeprecatedEndpoints?: boolean;
  removeOperationPrefixEndingWith?: string;
  parseRequestParams?: boolean;
}

interface QueriesGenerateOptions {
  queryTypesImportPath: string;
  axiosRequestConfig?: boolean;
  infiniteQueries?: boolean;
  mutationEffects?: boolean;
}

interface GenerateConfig {
  outputFileNameSuffix: string;
  namespaceSuffix: string;
}

interface BaseGenerateOptions {
  input: string;
  output: string;
  splitByTags: boolean;
  defaultTag: string;
  excludeTags: string[];
  excludePathRegex: string;
  excludeRedundantZodSchemas: boolean;
  tsNamespaces: boolean;
  importPath: "ts" | "relative" | "absolute";
  configs: Record<GenerateType, GenerateConfig>;
  standalone: boolean;
  baseUrl: string;
}

export type GenerateOptions = BaseGenerateOptions &
  ZodGenerateOptions &
  EndpointsGenerateOptions &
  QueriesGenerateOptions;
