import SwaggerParser from "@apidevtools/swagger-parser";
import { exec } from "child_process";
import { OpenAPIV3 } from "openapi-types";
import { TEMPLATE_IMPORTS } from "src/generators/const/deps.const";
import { generateCodeFromOpenAPIDoc } from "src/generators/generateCodeFromOpenAPIDoc";
import { GenerateOptions } from "src/generators/types/options";
import { writeGenerateFileData } from "src/generators/utils/file.utils";
import { logError, logInfo, logSuccess } from "src/helpers/cli.helper";

export type GenerateParams = {
  excludeTags: string;
  monorepo: boolean;
  prettier: boolean;
  verbose: boolean;
} & Pick<
  GenerateOptions,
  | "input"
  | "output"
  | "tsNamespaces"
  | "splitByTags"
  | "defaultTag"
  | "removeOperationPrefixEndingWith"
  | "importPath"
  | "extractEnums"
  | "acl"
  | "checkAcl"
  | "standalone"
  | "baseUrl"
  | "branded"
  | "replaceOptionalWithNullish"
  | "infiniteQueries"
  | "axiosRequestConfig"
  | "mutationEffects"
  | "parseRequestParams"
>;

export async function generate({ input, excludeTags, monorepo, prettier, verbose, ...params }: GenerateParams) {
  const start = Date.now();

  if (verbose) {
    logInfo("Parsing OpenAPI spec...");
  }
  const openApiDoc = (await SwaggerParser.bundle(input)) as OpenAPIV3.Document;
  if (verbose) {
    logSuccess("Parsing finished.");
  }

  if (verbose) {
    logInfo("Generating code...");
  }
  const template = monorepo ? "monorepoTemplate" : "template";
  const filesData = generateCodeFromOpenAPIDoc(openApiDoc, {
    input,
    excludeTags: excludeTags.split(","),
    restClientImportPath: TEMPLATE_IMPORTS.appRestClient[template],
    errorHandlingImportPath: TEMPLATE_IMPORTS.errorHandling[template],
    queryTypesImportPath: TEMPLATE_IMPORTS.queryTypes[template],
    abilityContextImportPath: TEMPLATE_IMPORTS.abilityContext[template],
    abilityContextGenericAppAbilities: monorepo,
    ...params,
  });
  if (verbose) {
    logSuccess("Generation finished.");
  }

  if (verbose) {
    logInfo("Writing files...");
  }
  writeGenerateFileData(filesData);
  if (verbose) {
    logSuccess("Writing finished.");
  }

  if (prettier) {
    execPrettier({ output: params.output, verbose });
  }

  if (verbose) {
    logInfo(`TIME: ${Date.now() - start}ms`);
  }
}

function execPrettier({ output, verbose }: Pick<GenerateParams, "output" | "verbose">) {
  if (verbose) {
    logInfo("Running Prettier...");
  }
  const ignorePathArg = process.env.NODE_ENV === "production" ? "" : "--ignore-path .prettierignore";
  exec(`prettier --write ${output} ${ignorePathArg}`, (error) => {
    if (verbose) {
      if (error) {
        logError(error, "Prettier error");
      } else {
        logSuccess("Prettier finished.");
      }
    }
  });
}
