import { GenerateFile, Import } from "../types/generate";

export const APP_REST_CLIENT_NAME = "AppRestClient";

export const QUERY_OPTIONS_TYPES = {
  query: "AppQueryOptions",
  infiniteQuery: "AppInfiniteQueryOptions",
  mutation: "AppMutationOptions",
};

// Template
export const TEMPLATE_DATA_FILE_PATH = "src/data";
export const TEMPLATE_DATA_TS_PATH = "@/data";

export const TEMPLATE_IMPORTS: Record<string, { template: string; monorepoTemplate: string }> = {
  appRestClient: {
    template: "@/util/rest/clients/app-rest-client",
    monorepoTemplate: "@/clients/app-rest-client",
  },
  queryTypes: {
    template: "@/types/react-query",
    monorepoTemplate: "@povio/utils/types/react-query",
  },
  errorHandling: {
    template: "@/util/vendor/error-handling",
    monorepoTemplate: "@povio/utils/vendor/error-handling",
  },
};

export const ERROR_HANDLERS = {
  ErrorHandler: "ErrorHandler",
  SharedErrorHandler: "SharedErrorHandler",
};
export const ERROR_HANDLING_IMPORT: Import = {
  bindings: [ERROR_HANDLERS.ErrorHandler, ERROR_HANDLERS.SharedErrorHandler],
  from: "@/util/vendor/error-handling",
};

// Standalone
export enum StandaloneAssetEnum {
  ReactQueryTypes = "reactQueryTypes",
  RestClient = "restClient",
  RestInterceptor = "restInterceptor",
}
export const STANDALONE_ASSETS: Record<StandaloneAssetEnum, GenerateFile> = {
  [StandaloneAssetEnum.ReactQueryTypes]: { fileName: "react-query.types", extension: "ts" },
  [StandaloneAssetEnum.RestClient]: { fileName: "rest-client", extension: "ts" },
  [StandaloneAssetEnum.RestInterceptor]: { fileName: "rest-interceptor", extension: "ts" },
};

export const STANDALONE_APP_REST_CLIENT_FILE: GenerateFile = { fileName: "app-rest-client", extension: "ts" };

// QueryModules
export const QUERY_MODULE_ENUM = "QueryModule";
export const QUERY_MODULES_FILE: GenerateFile = { fileName: "queryModules", extension: "ts" };

// QueryConfig
export const QUERY_CONFIG_FILE: GenerateFile = { fileName: "queryConfig.context", extension: "tsx" };

// MutationEffects
export const MUTATION_EFFECTS = {
  optionsType: "MutationEffectsOptions",
  hookName: "useMutationEffects",
  runFunctionName: "runMutationEffects",
};
export const MUTATION_EFFECTS_FILE: GenerateFile = { fileName: "useMutationEffects", extension: "ts" };

// ZodExtended
export const ZOD_EXTENDED = {
  name: "zod",
  properties: {
    sortingString: "sortingString",
    parse: "parse",
  },
};
export const ZOD_EXTENDED_FILE: GenerateFile = { fileName: "zod", extension: "ts" };
